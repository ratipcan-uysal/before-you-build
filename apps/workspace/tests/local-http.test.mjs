// Requires npm run local:start; does not invoke a model or use real documents.
import test from 'node:test';
import assert from 'node:assert/strict';
import { get as httpGet } from 'node:http';
const origin = process.env.BYB_TEST_URL || 'http://127.0.0.1:4317';
test('local bridge enforces host/origin/session, persists records and keeps PM gates', async () => {
  assert.equal(new URL(origin).hostname, '127.0.0.1');
  const root = await fetch(origin);
  assert.equal(root.status, 200);
  const cookie = root.headers.get('set-cookie').split(';')[0];
  const headers = {
    cookie,
    Origin: origin,
    'X-BYB-Local': '1',
    'Content-Type': 'application/json',
  };
  const get = (h = {}) => fetch(origin + '/api/workspace', { headers: h });
  assert.equal((await get()).status, 401);
  assert.equal((await get({ cookie })).status, 401);
  assert.equal(
    (await get({ ...headers, Origin: 'https://attacker.example' })).status,
    403,
  );
  assert.equal(
    (await get({ ...headers, 'Sec-Fetch-Site': 'cross-site' })).status,
    403,
  );
  // fetch normalizes Host; use HTTP directly to actually send the forged host.
  const fakeHost = await new Promise((resolve, reject) => {
    httpGet(
      origin + '/api/workspace',
      { headers: { ...headers, Host: 'attacker.example' } },
      (r) => {
        r.resume();
        resolve(r.statusCode);
      },
    ).on('error', reject);
  });
  assert.equal(fakeHost, 403);
  assert.equal(
    (
      await fetch(origin + '/api/agent', {
        method: 'OPTIONS',
        headers: { Origin: 'https://attacker.example' },
      })
    ).headers.get('access-control-allow-origin'),
    null,
  );
  const post = (data) =>
    fetch(origin + '/api/workspace', {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
  let response = await post({
    action: 'create',
    title: 'KURGUSAL · Yerel HTTP testi',
    domain: 'Test',
    context: 'Synthetic test only',
    surfaces: ['web'],
  });
  assert.equal(response.status, 201);
  let { request: c } = await response.json();
  response = await post({
    action: 'source',
    id: c.id,
    revision: c.revision,
    kind: 'text',
    name: 'Kurgusal kaynak',
    content: 'Sadece test içeriği. Onay içermiyor.',
  });
  assert.equal(response.status, 200);
  ({ request: c } = await response.json());
  const result = await fetch(origin + '/api/agent', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      action: 'start',
      id: c.id,
      revision: c.revision,
      stage: 'api',
      provider: 'codex',
      model: 'fixture',
      consent: true,
    }),
  });
  assert.equal(result.status, 400);
  assert.match((await result.json()).error, /readiness|güncel/i);
  response = await post({
    action: 'export',
    id: c.id,
    revision: c.revision,
    final: true,
  });
  assert.equal(response.status, 400);
  const parallel = await Promise.all(
    [1, 2].map((i) =>
      post({
        action: 'question',
        id: c.id,
        revision: c.revision,
        text: 'Kurgusal soru ' + i,
        area: 'Test',
        blocks: 'start',
        evidence: [],
      }),
    ),
  );
  assert.deepEqual(
    parallel.map((r) => r.status).sort((a, b) => a - b),
    [200, 409],
  );
  const saved = await fetch(origin + '/api/workspace?id=' + c.id, { headers });
  c = (await saved.json()).request;
  assert.equal(c.questions.length, 1);
  assert.equal(c.proposals.length, 0);
  assert.equal(c.artifacts.length, 0);
});
