import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { CodexProvider, CodexRpc } from '../local/codex.ts';
const repo = fileURLToPath(new URL('../../../', import.meta.url));
const fixture = fileURLToPath(
  new URL('./fixtures/codex-rpc.mjs', import.meta.url),
);
const skillPath = repo + 'skills/readiness-score/SKILL.md';
function provider(mode: string) {
  return new CodexProvider(
    repo,
    (cwd) =>
      new CodexRpc(
        cwd,
        spawn(process.execPath, [fixture, mode, skillPath], {
          stdio: ['pipe', 'pipe', 'pipe'],
        }),
      ),
  );
}
test('protocol invokes discovered namespaced skill in a fresh readonly context and collects only final result', async () => {
  const p = provider('success');
  let thread = '';
  const output = await p.run({
    prompt: 'Synthetic fixture',
    skill: 'readiness-score',
    skillPath,
    model: 'fixture',
    signal: new AbortController().signal,
    onProgress: (_message, id) => {
      thread = id || '';
    },
  });
  assert.deepEqual(JSON.parse(output), { runId: 'fixture-run' });
  assert.equal(thread, 'new-thread');
  assert.equal(p.clients.size, 0);
});
test('process exit and permission requests fail closed', async () => {
  for (const mode of ['exit', 'permission']) {
    const p = provider(mode);
    await assert.rejects(
      p.run({
        prompt: 'Fixture',
        skill: 'readiness-score',
        skillPath,
        model: 'fixture',
        signal: new AbortController().signal,
        onProgress: () => {},
      }),
    );
    assert.equal(p.clients.size, 0);
  }
});
test('cancellation terminates the running agent', async () => {
  const p = provider('wait'),
    controller = new AbortController();
  await assert.rejects(
    p.run({
      prompt: 'Fixture',
      skill: 'readiness-score',
      skillPath,
      model: 'fixture',
      signal: controller.signal,
      onProgress: () => {
        setTimeout(() => controller.abort(), 20);
      },
    }),
    /iptal/,
  );
  assert.equal(p.clients.size, 0);
});
test('inherited MCP servers are explicitly disabled before a turn; failed isolation blocks the run', async () => {
  for (const mode of ['inherited', 'stubborn']) {
    const restarts: string[][] = [];
    const p = new CodexProvider(repo, (cwd, disabled = []) => {
      restarts.push(disabled);
      return new CodexRpc(
        cwd,
        spawn(
          process.execPath,
          [fixture, mode, skillPath, JSON.stringify(disabled)],
          { stdio: ['pipe', 'pipe', 'pipe'] },
        ),
      );
    });
    const run = p.run({
      prompt: 'Fixture',
      skill: 'readiness-score',
      skillPath,
      model: 'fixture',
      signal: new AbortController().signal,
      onProgress: () => {},
    });
    if (mode === 'stubborn') await assert.rejects(run, /MCP/);
    else await run;
    assert.deepEqual(restarts, [[], ['company-mcp']]);
    assert.equal(p.clients.size, 0);
  }
});
