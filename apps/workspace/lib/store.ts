import { env } from 'cloudflare:workers';
import type { Case } from './workflow';

function db() {
  if (!env.DB) throw new Error('Veritabanı bağlantısı henüz hazır değil.');
  return env.DB;
}
export async function listCases(owner: string) {
  const rows = await db()
    .prepare(
      'SELECT state FROM requests WHERE owner_id = ? ORDER BY updated_at DESC',
    )
    .bind(owner)
    .all<{ state: string }>();
  return rows.results.map((row) => {
    const c = JSON.parse(row.state) as Case;
    return {
      id: c.id,
      title: c.title,
      domain: c.domain,
      synthetic: c.synthetic,
      updatedAt: c.updatedAt,
      revision: c.revision,
      sourceCount: c.sources.length,
      questionCount: c.questions.filter((q) => !q.answer).length,
      pendingCount: c.proposals.filter((p) => p.status === 'pending').length,
    };
  });
}
export async function loadCase(
  owner: string,
  id: string,
): Promise<Case | null> {
  const row = await db()
    .prepare('SELECT state FROM requests WHERE id = ? AND owner_id = ?')
    .bind(id, owner)
    .first<{ state: string }>();
  return row ? JSON.parse(row.state) : null;
}
export async function insertCase(owner: string, c: Case) {
  const row = await db()
    .prepare('SELECT COUNT(*) AS count FROM requests WHERE owner_id = ?')
    .bind(owner)
    .first<{ count: number }>();
  if ((row?.count || 0) >= 100)
    throw new Error('Çalışma alanı başına 100 talep sınırı.');
  await db()
    .prepare(
      'INSERT INTO requests (id,owner_id,revision,state,updated_at) VALUES (?,?,?,?,?)',
    )
    .bind(c.id, owner, c.revision, JSON.stringify(c), c.updatedAt)
    .run();
}
export async function saveCase(owner: string, c: Case, expected: number) {
  const serialized = JSON.stringify({ ...c, revision: expected + 1 });
  if (new TextEncoder().encode(serialized).length > 1500000)
    throw new Error(
      'Talep boyutu sınırı aşıldı. Yeni talep açın veya daha küçük kaynak kullanın.',
    );
  const result = await db()
    .prepare(
      'UPDATE requests SET revision = ?, state = ?, updated_at = ? WHERE id = ? AND owner_id = ? AND revision = ?',
    )
    .bind(expected + 1, serialized, c.updatedAt, c.id, owner, expected)
    .run();
  if (result.meta.changes !== 1)
    throw new Error(
      'CONFLICT: Başka bir sekme talebi değiştirdi. Yenileyin; değişikliğiniz kaydedilmedi.',
    );
  c.revision = expected + 1;
}
