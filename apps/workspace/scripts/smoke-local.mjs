// Explicit live test: uses the configured Codex account and consumes its usage.
// Creates only a clearly labelled synthetic request. Never loads user attachments.
import assert from 'node:assert/strict';
if (!process.argv.includes('--live'))
  throw new Error('Pass --live to authorize a real Codex run.');
const origin = process.env.BYB_TEST_URL || 'http://127.0.0.1:4317';
if (new URL(origin).hostname !== '127.0.0.1')
  throw new Error('Local tests only.');
const root = await fetch(origin);
assert.equal(root.status, 200);
const cookie = root.headers.get('set-cookie').split(';')[0];
async function api(path, data) {
  const response = await fetch(origin + path, {
    headers: {
      cookie,
      Origin: origin,
      'X-BYB-Local': '1',
      'Content-Type': 'application/json',
    },
    ...(data ? { method: 'POST', body: JSON.stringify(data) } : {}),
  });
  const body = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(body));
  return body;
}
const status = await api('/api/agent');
const codex = status.providers.find((p) => p.id === 'codex');
assert(codex.ready);
const model =
  status.settings.model ||
  codex.models.find((m) => m.isDefault)?.id ||
  codex.models[0].id;
let { request: c } = await api('/api/workspace', {
  action: 'create',
  title: 'KURGUSAL · Yerel Codex bağlantı testi',
  domain: 'Ürün geliştirme',
  context: 'TAMAMEN KURGUSAL TEST. Gerçek kurum veya onay yok.',
  surfaces: ['web'],
});
({ request: c } = await api('/api/workspace', {
  action: 'source',
  id: c.id,
  revision: c.revision,
  kind: 'text',
  name: 'Kurgusal fikir',
  content:
    'KURGUSAL FİKİR: Müşteri destek taleplerinin durumunu web ekranında görebilsin. Ayrıntılar henüz görüşülmedi.',
}));
let baselineQuestions = 0;
for (const stage of ['readiness', 'request']) {
  const result = await api('/api/agent', {
    action: 'start',
    id: c.id,
    revision: c.revision,
    stage,
    provider: 'codex',
    model,
    consent: true,
  });
  console.log('Started', stage, result.job.id, model);
  const deadline = Date.now() + 16 * 60 * 1000;
  let job;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 3000));
    job = (await api('/api/agent?id=' + c.id)).jobs.find(
      (j) => j.id === result.job.id,
    );
    if (job.status !== 'running') break;
  }
  console.log('Result', stage, job.status, job.message);
  assert.equal(job.status, 'succeeded');
  assert(job.threadId);
  assert.equal(
    job.skill,
    stage === 'readiness' ? 'readiness-score' : 'request-shaper',
  );
  ({ request: c } = await api('/api/workspace?id=' + c.id));
  if (stage === 'readiness') baselineQuestions = c.questions.length;
}
assert.equal(c.assessments.length, 1);
assert(c.artifacts.some((a) => a.kind === 'request' && a.status === 'draft'));
assert(c.artifacts.every((a) => !a.approvedBy));
assert(c.proposals.every((p) => p.status === 'pending'));
assert(c.questions.length - baselineQuestions <= 1);
console.log(
  'PASS: real skill execution, saved assessment, request draft, <=1 new shaping question, zero automatic approvals. Request:',
  c.id,
);
