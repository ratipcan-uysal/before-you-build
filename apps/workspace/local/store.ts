import { DatabaseSync } from 'node:sqlite';
import {
  chmodSync,
  mkdirSync,
  openSync,
  closeSync,
  readFileSync,
  writeFileSync,
  unlinkSync,
} from 'node:fs';
import { join } from 'node:path';
import type { Case } from '../lib/workflow.ts';
import type { Job } from './types.ts';
export const OWNER = 'local-pm';

// Serialize launch and stale-lock recovery before touching any request records.
export function lockWorkspace(directory: string) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const path = join(directory, 'runtime.lock');
  const guardPath = join(directory, 'launch.lock');
  let guard: number;
  try {
    guard = openSync(guardPath, 'wx', 0o600);
  } catch {
    throw new Error(
      'Çalışma klasörü açılıyor veya önceki başlatma yarıda kaldı. Kayıtlar değiştirilmedi.',
    );
  }
  try {
    let fd: number;
    try {
      fd = openSync(path, 'wx', 0o600);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'EEXIST') throw e;
      const pid = Number(readFileSync(path, 'utf8'));
      if (!Number.isInteger(pid) || pid < 1)
        throw new Error(
          'Yerel çalışma kilidi okunamadı; kayıtlar değiştirilmedi.',
        );
      let alive = true;
      try {
        process.kill(pid, 0);
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ESRCH') alive = false;
        else
          throw new Error(
            'Çalışma klasörü başka bir süreç tarafından kullanılıyor.',
          );
      }
      if (alive)
        throw new Error(
          'Bu çalışma klasörü zaten açık. Önce diğer yerel uygulamayı kapatın.',
        );
      // The exclusive launch guard prevents two stale-lock recoveries racing.
      unlinkSync(path);
      fd = openSync(path, 'wx', 0o600);
    }
    try {
      writeFileSync(fd, String(process.pid));
    } finally {
      closeSync(fd);
    }
    let released = false;
    return () => {
      if (!released) {
        released = true;
        unlinkSync(path);
      }
    };
  } finally {
    closeSync(guard);
    unlinkSync(guardPath);
  }
}

export function localStore(directory: string) {
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  const file = join(directory, 'workspace.sqlite');
  const db = new DatabaseSync(file);
  chmodSync(file, 0o600);
  db.exec('PRAGMA journal_mode=WAL');
  db.exec('PRAGMA busy_timeout=5000');
  // Separate local database; never opens or migrates the hosted D1 database.
  db.exec(
    'CREATE TABLE IF NOT EXISTS requests (id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, revision INTEGER NOT NULL, state TEXT NOT NULL, updated_at TEXT NOT NULL)',
  );
  db.exec(
    'CREATE INDEX IF NOT EXISTS idx_local_requests_owner_updated ON requests(owner_id, updated_at)',
  );
  db.exec(
    'CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, case_id TEXT NOT NULL, state TEXT NOT NULL)',
  );
  db.exec('CREATE INDEX IF NOT EXISTS idx_local_jobs_case ON jobs(case_id)');
  db.exec(
    'CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL)',
  );
  function jobs(caseId?: string): Job[] {
    const rows = caseId
      ? db.prepare('SELECT state FROM jobs WHERE case_id = ?').all(caseId)
      : db.prepare('SELECT state FROM jobs').all();
    return rows
      .map((r) => JSON.parse(String(r.state)) as Job)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  function putJob(job: Job) {
    db.prepare(
      'INSERT INTO jobs(id,case_id,state) VALUES(?,?,?) ON CONFLICT(id) DO UPDATE SET state=excluded.state',
    ).run(job.id, job.caseId, JSON.stringify(job));
  }
  for (const job of jobs())
    if (job.status === 'running') {
      putJob({
        ...job,
        status: 'failed',
        message:
          'Uygulama çalışma sırasında kapandı. Yeniden başlatın; otomatik tekrar yapılmadı.',
        finishedAt: new Date().toISOString(),
      });
    }
  const store = {
    async listCases(owner: string) {
      return db
        .prepare(
          'SELECT state FROM requests WHERE owner_id = ? ORDER BY updated_at DESC',
        )
        .all(owner)
        .map((row) => {
          const c = JSON.parse(String(row.state)) as Case;
          return {
            id: c.id,
            title: c.title,
            domain: c.domain,
            synthetic: c.synthetic,
            updatedAt: c.updatedAt,
            revision: c.revision,
            sourceCount: c.sources.length,
            questionCount: c.questions.filter((q) => !q.answer).length,
            pendingCount: c.proposals.filter((p) => p.status === 'pending')
              .length,
          };
        });
    },
    async loadCase(owner: string, id: string): Promise<Case | null> {
      const row = db
        .prepare('SELECT state FROM requests WHERE owner_id = ? AND id = ?')
        .get(owner, id);
      return row ? JSON.parse(String(row.state)) : null;
    },
    async insertCase(owner: string, c: Case) {
      const count = db
        .prepare('SELECT COUNT(*) AS n FROM requests WHERE owner_id = ?')
        .get(owner);
      if (Number(count?.n) >= 100)
        throw new Error('Çalışma alanı başına 100 talep sınırı.');
      db.prepare(
        'INSERT INTO requests(id,owner_id,revision,state,updated_at) VALUES(?,?,?,?,?)',
      ).run(c.id, owner, c.revision, JSON.stringify(c), c.updatedAt);
    },
    async saveCase(owner: string, c: Case, expected: number) {
      const state = JSON.stringify({ ...c, revision: expected + 1 });
      if (Buffer.byteLength(state) > 1500000)
        throw new Error('Talep boyutu sınırı aşıldı.');
      const result = db
        .prepare(
          'UPDATE requests SET revision=?,state=?,updated_at=? WHERE id=? AND owner_id=? AND revision=?',
        )
        .run(expected + 1, state, c.updatedAt, c.id, owner, expected);
      if (result.changes !== 1)
        throw new Error('CONFLICT: Talep değişti. Yenileyip tekrar deneyin.');
      c.revision = expected + 1;
    },
    jobs,
    putJob,
    settings() {
      const row = db
        .prepare('SELECT value FROM settings WHERE key=?')
        .get('agent');
      return row
        ? (JSON.parse(String(row.value)) as { provider: string; model: string })
        : { provider: 'codex', model: '' };
    },
    saveSettings(value: { provider: string; model: string }) {
      db.prepare(
        'INSERT INTO settings(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',
      ).run('agent', JSON.stringify(value));
    },
    close() {
      db.close();
    },
  };
  return store;
}
export type LocalStore = ReturnType<typeof localStore>;
