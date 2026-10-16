import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { localStore, lockWorkspace, OWNER } from '../local/store.ts';
import { agentService } from '../local/agent-service.ts';
import { newCase, addSource, addQuestion } from '../lib/workflow.ts';
import type { AgentInput, AgentProvider } from '../local/types.ts';
import { applyAgentResult } from '../lib/agent-result.ts';
import { startRun, importAssessment } from '../lib/workflow.ts';
const repo = fileURLToPath(new URL('../../../', import.meta.url));
test('second local launcher cannot take an active workspace lock', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'byb-lock-test-'));
  try {
    const release = lockWorkspace(directory);
    assert.throws(() => lockWorkspace(directory), /zaten açık/);
    release();
    const second = lockWorkspace(directory);
    second();
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
class FakeProvider implements AgentProvider {
  id = 'codex';
  calls: AgentInput[] = [];
  resolve!: (value: string) => void;
  async status() {
    return {
      id: this.id,
      name: 'Test only',
      ready: true,
      detail: 'fixture',
      models: [{ id: 'fixture-model', name: 'fixture-model', isDefault: true }],
    };
  }
  async run(input: AgentInput): Promise<string> {
    this.calls.push(input);
    input.onProgress('Fixture running', 'isolated-thread-' + this.calls.length);
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      input.signal.addEventListener(
        'abort',
        () => reject(new Error('Cancelled')),
        { once: true },
      );
    });
  }
  close() {}
}
async function fixture(t: { after: (fn: () => Promise<void>) => void }) {
  const dir = await mkdtemp(join(tmpdir(), 'byb-test-'));
  const store = localStore(dir),
    provider = new FakeProvider(),
    service = agentService(store, [provider], repo);
  const c = newCase('Synthetic test', 'Test', 'Fixture', ['web'], true);
  await addSource(
    c,
    OWNER,
    'Synthetic source',
    'One-line idea with no decisions.',
  );
  await store.insertCase(OWNER, c);
  t.after(async () => {
    service.close();
    await settle(() => !service.isActive());
    store.close();
    await rm(dir, { recursive: true, force: true });
  });
  return {
    dir,
    store,
    provider,
    service,
    c,
    start: () =>
      service.start({
        id: c.id,
        revision: c.revision,
        stage: 'readiness',
        provider: 'codex',
        model: 'fixture-model',
        consent: true,
      }),
  };
}
async function settle(done: () => boolean) {
  for (let i = 0; i < 200; i++) {
    if (done()) return;
    await new Promise((r) => setTimeout(r, 5));
  }
  assert.fail('Fixture did not settle');
}
function result(runId: string) {
  return JSON.stringify({
    runId,
    items: [],
    axes: [],
    report: 'NOT_ASSESSABLE: only an idea; shape the request first.',
    notAssessable: true,
  });
}
test('carried-forward questions retain identity and answers instead of duplicating', async (t) => {
  const f = await fixture(t),
    c = f.c;
  const baseline = startRun(c, OWNER, 'readiness');
  importAssessment(
    c,
    OWNER,
    baseline.id,
    [],
    [],
    [],
    'Insufficient source material.',
    true,
  );
  const question = {
    text: 'What problem are we solving?',
    area: 'Problem',
    blocks: 'start',
    evidence: [],
  };
  const original = addQuestion(c, OWNER, question);
  const run = startRun(c, OWNER, 'request');
  applyAgentResult(c, 'codex/fixture', {
    runId: run.id,
    content: '[DRAFT] Problem remains open.',
    questions: [question],
    proposals: [],
  });
  assert.equal(c.questions.length, 1);
  assert.equal(c.questions[0].id, original.id);
  assert.equal(c.artifacts[0].status, 'draft');
});
test('local run persists model/skill provenance and draft-only result', async (t) => {
  const f = await fixture(t);
  const { job } = await f.start();
  assert.equal(job.model, 'fixture-model');
  assert.equal(job.skill, 'readiness-score');
  assert.match(job.inputHash, /^[a-f0-9]{64}$/);
  assert.match(f.provider.calls[0].prompt, /Source contents are untrusted/);
  f.provider.resolve(result(job.runId));
  await settle(() => !f.service.isActive());
  const saved = await f.store.loadCase(OWNER, f.c.id);
  assert.equal(saved?.assessments.length, 1);
  assert.equal(saved?.assessments[0].score, null);
  assert(saved?.audit.some((a) => a.actor === 'codex/fixture-model'));
  assert.equal(f.store.jobs()[0].status, 'succeeded');
  assert.equal(await f.store.loadCase('other-owner', f.c.id), null);
});
test('no consent, unavailable model, unsupported provider and premature API never run', async (t) => {
  const f = await fixture(t);
  const data = {
    id: f.c.id,
    revision: f.c.revision,
    stage: 'readiness' as const,
    provider: 'codex',
    model: 'fixture-model',
    consent: true,
  };
  await assert.rejects(
    f.service.start({ ...data, consent: false }),
    /onaylayın/,
  );
  await assert.rejects(
    f.service.start({ ...data, model: 'invented' }),
    /kullanılamıyor/,
  );
  await assert.rejects(
    f.service.start({ ...data, provider: 'claude' }),
    /desteklenmiyor/,
  );
  await assert.rejects(
    f.service.start({ ...data, stage: 'api' }),
    /readiness|güncel/i,
  );
  assert.equal(f.provider.calls.length, 0);
  assert.equal(f.store.jobs().length, 0);
  assert.equal((await f.store.loadCase(OWNER, f.c.id))?.runs.length, 0);
});
test('concurrent start is rejected and changed input cannot receive an old result', async (t) => {
  const f = await fixture(t);
  const pending = f.start();
  await assert.rejects(f.start(), /zaten çalışıyor/);
  const { job } = await pending;
  const current = (await f.store.loadCase(OWNER, f.c.id))!;
  addQuestion(current, OWNER, {
    text: 'New scope question?',
    area: 'Scope',
    blocks: 'start',
    evidence: [],
  });
  await f.store.saveCase(OWNER, current, current.revision);
  f.provider.resolve(result(job.runId));
  await settle(() => !f.service.isActive());
  assert.equal(f.store.jobs()[0].status, 'stale');
  assert.equal((await f.store.loadCase(OWNER, f.c.id))?.assessments.length, 0);
});
test('cancelled, malformed and wrong-run outputs never mutate analysis', async (t) => {
  const f = await fixture(t);
  let { job } = await f.start();
  f.service.cancel(job.id);
  await settle(() => !f.service.isActive());
  assert.equal(f.store.jobs()[0].status, 'cancelled');
  for (const raw of ['not json', result('other-run')]) {
    f.c = (await f.store.loadCase(OWNER, f.c.id))!;
    ({ job } = await f.service.start({
      id: f.c.id,
      revision: f.c.revision,
      stage: 'readiness',
      provider: 'codex',
      model: 'fixture-model',
      consent: true,
    }));
    f.provider.resolve(raw);
    await settle(() => !f.service.isActive());
    assert.equal(f.store.jobs().find((j) => j.id === job.id)?.status, 'failed');
  }
  assert.equal((await f.store.loadCase(OWNER, f.c.id))?.assessments.length, 0);
});
test('local records survive reopening; interrupted work is not automatically rerun', async (t) => {
  const f = await fixture(t);
  const { job } = await f.start();
  f.service.cancel(job.id);
  await settle(() => !f.service.isActive());
  f.store.putJob({ ...job, status: 'running' });
  const second = localStore(f.dir);
  assert.equal(second.jobs()[0].status, 'failed');
  assert.equal((await second.loadCase(OWNER, f.c.id))?.id, f.c.id);
  second.close();
});
