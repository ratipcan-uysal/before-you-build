import { createInterface } from 'node:readline';
const mode = process.argv[2],
  skillPath = process.argv[3];
const send = (m) => process.stdout.write(JSON.stringify(m) + '\n');
createInterface({ input: process.stdin }).on('line', (line) => {
  const m = JSON.parse(line);
  if (!m.id) return;
  if (m.method === 'initialize') {
    send({ id: m.id, result: {} });
    return;
  }
  if (m.method === 'config/read') {
    const disabled = JSON.parse(process.argv[4] || '[]');
    const servers = ['inherited', 'stubborn'].includes(mode)
      ? {
          'company-mcp': {
            enabled: mode === 'stubborn' || !disabled.includes('company-mcp'),
          },
        }
      : {};
    send({
      id: m.id,
      result: {
        config: {
          mcp_servers: servers,
          features: {
            shell_tool: false,
            apply_patch_freeform: false,
            apps: false,
            plugins: false,
            js_repl: false,
          },
          web_search: 'disabled',
        },
      },
    });
    return;
  }
  if (m.method === 'skills/list') {
    send({
      id: m.id,
      result: {
        data: [
          {
            skills: [
              {
                name: 'before-you-build:readiness-score',
                path: skillPath,
                enabled: true,
              },
            ],
          },
        ],
      },
    });
    return;
  }
  if (m.method === 'thread/start') {
    if (m.params.sandbox !== 'read-only' || !m.params.ephemeral)
      process.exit(3);
    send({
      id: m.id,
      result: {
        thread: { id: 'new-thread' },
        model: 'fixture',
        sandbox: { type: 'readOnly' },
      },
    });
    return;
  }
  if (m.method === 'turn/start') {
    const skill = m.params.input.find((i) => i.type === 'skill');
    if (
      skill?.name !== 'before-you-build:readiness-score' ||
      !m.params.input[0].text.startsWith('$before-you-build:readiness-score')
    )
      process.exit(4);
    if (mode === 'exit') process.exit(7);
    send({ id: m.id, result: { turn: { id: 'turn-1' } } });
    if (mode === 'permission') {
      send({
        id: 99,
        method: 'item/commandExecution/requestApproval',
        params: { threadId: 'new-thread' },
      });
      return;
    }
    if (mode === 'wait') return;
    send({
      method: 'item/completed',
      params: {
        threadId: 'new-thread',
        item: { type: 'agentMessage', phase: 'commentary', text: 'Not final' },
      },
    });
    send({
      method: 'item/completed',
      params: {
        threadId: 'other-thread',
        item: { type: 'agentMessage', text: 'Wrong thread' },
      },
    });
    send({
      method: 'item/completed',
      params: {
        threadId: 'new-thread',
        item: {
          type: 'agentMessage',
          phase: 'final_answer',
          text: JSON.stringify({ resultJson: '{"runId":"fixture-run"}' }),
        },
      },
    });
    send({
      method: 'turn/completed',
      params: { threadId: 'new-thread', turn: { status: 'completed' } },
    });
  }
});
