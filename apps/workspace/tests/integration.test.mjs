import test from 'node:test';
import assert from 'node:assert/strict';

// Local Sites sign-in fixture only. Never target a remote environment.
const origin = 'http://localhost:3000';
const endpoint = origin + '/api/workspace';
async function call(data, auth = true, extra = {}) {
  const response = await fetch(endpoint, {
    method: data ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      Origin: origin,
      ...(auth ? { Cookie: '__sites_local_auth=1' } : {}),
      ...extra,
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  const raw = await response.text();
  return {
    status: response.status,
    body: response.headers.get('content-type')?.includes('json')
      ? JSON.parse(raw)
      : { error: raw },
  };
}
test('local D1 API: identity, persistence, CAS, atomic imports and guards', async () => {
  assert.equal((await call()).status, 200);
  assert.equal((await call(undefined, false)).status, 401);
  assert.equal(
    (
      await call(undefined, false, {
        'oai-authenticated-user-id': 'forged',
        'oai-authenticated-user-email': 'forged@example.test',
      })
    ).status,
    401,
  );
  const created = await call({ action: 'demo', domain: 'telecom' });
  assert.equal(created.status, 201);
  const c = created.body.request;
  assert.equal(c.synthetic, true);
  assert.equal(c.proposals[0].status, 'pending');
  const blocked = await call({
    action: 'packet',
    id: c.id,
    revision: c.revision,
    stage: 'api',
  });
  assert.equal(blocked.status, 400);
  const source = {
    action: 'source',
    id: c.id,
    revision: c.revision,
    kind: 'text',
    name: 'Synthetic test source',
  };
  const updates = await Promise.all([
    call({ ...source, content: 'Concurrent synthetic update A' }),
    call({ ...source, content: 'Concurrent synthetic update B' }),
  ]);
  assert.deepEqual(
    updates.map((r) => r.status).sort((a, b) => a - b),
    [200, 409],
  );
  const winner = updates.find((r) => r.status === 200).body.request;
  assert.equal(winner.revision, c.revision + 1);
  assert.equal(winner.sources.length, c.sources.length + 1);
  const duplicate = await call({
    ...source,
    revision: winner.revision,
    content: winner.sources.at(-1).content,
  });
  assert.equal(duplicate.status, 400);
  const staleApproval = await call({
    action: 'approveProposal',
    id: c.id,
    revision: winner.revision,
    proposalId: c.proposals[0].id,
    proposalRevision: 1,
  });
  assert.equal(staleApproval.status, 400);
  const exported = await call({
    action: 'export',
    id: c.id,
    revision: winner.revision,
  });
  assert.equal(exported.status, 200);
  assert.match(exported.body.download, /\[DRAFT\]/);
  assert.equal(
    (
      await call({
        action: 'export',
        id: c.id,
        revision: winner.revision,
        final: true,
      })
    ).status,
    400,
  );
  const persisted = await fetch(endpoint + '?id=' + c.id, {
    headers: { Cookie: '__sites_local_auth=1' },
  }).then((r) => r.json());
  assert.equal(persisted.request.revision, winner.revision);
  assert.equal(persisted.request.sources.length, winner.sources.length);
  assert.ok(
    [400, 403].includes(
      (
        await call(
          {
            action: 'source',
            id: c.id,
            revision: winner.revision,
            name: 'Rejected cross origin',
            kind: 'text',
            content: 'Should never save',
          },
          true,
          { Origin: 'https://evil.example' },
        )
      ).status,
    ),
  );
});
