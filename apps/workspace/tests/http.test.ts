import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyOrigin, readBody } from '../lib/http.ts';
function req(
  body: string,
  origin = 'https://workspace.test',
  headers: Record<string, string> = {},
) {
  return new Request('https://workspace.test/api/workspace', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin, ...headers },
    body,
  });
}
test('mutation requires same-origin JSON', () => {
  verifyOrigin(req('{}'));
  for (const r of [
    req('{}', 'https://evil.test'),
    req('{}', 'http://workspace.test'),
    req('{}', ''),
    req('{}', 'https://workspace.test', { 'content-type': 'text/plain' }),
    req('{}', 'https://workspace.test', { 'sec-fetch-site': 'cross-site' }),
  ])
    assert.throws(() => verifyOrigin(r));
});
test('body parser rejects malformed, array, null and oversized payloads', async () => {
  assert.deepEqual(await readBody(req('{"action":"test"}')), {
    action: 'test',
  });
  for (const body of [
    'no json',
    'null',
    '[]',
    '"string"',
    '{"x":"' + 'x'.repeat(750001) + '"}',
  ])
    await assert.rejects(readBody(req(body)));
});
