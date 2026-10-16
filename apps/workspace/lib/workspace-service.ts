import {
  newCase,
  addSource,
  addProposal,
  addQuestion,
  answerQuestion,
  decideProposal,
  reviseProposal,
  startRun,
  approveArtifact,
  exportMarkdown,
} from './workflow.ts';
import { agentPacket } from './packets.ts';
import { createDemo } from './demo.ts';
import { readBody, verifyOrigin } from './http.ts';
import type { Stage } from './workflow.ts';

import type { Case } from './workflow.ts';
import { applyAgentResult } from './agent-result.ts';
export type WorkspaceStore = {
  listCases(this: void, owner: string): Promise<unknown[]>;
  loadCase(this: void, owner: string, id: string): Promise<Case | null>;
  insertCase(this: void, owner: string, c: Case): Promise<void>;
  saveCase(this: void, owner: string, c: Case, expected: number): Promise<void>;
};
export function workspaceHandlers(
  store: WorkspaceStore,
  user: { userId: string; displayName: string },
  engine = { mode: 'agent-packet', description: 'Manuel ajan paketi' },
) {
  const { listCases, loadCase, insertCase, saveCase } = store;
  const json = (body: unknown, status = 200) =>
    Response.json(body, {
      status,
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  async function GET(request: Request) {
    try {
      const id = new URL(request.url).searchParams.get('id');
      if (id) {
        const c = await loadCase(user.userId, id);
        return c
          ? json({ request: c })
          : json({ error: 'Talep bulunamadı.' }, 404);
      }
      return json({
        requests: await listCases(user.userId),
        user: { name: user.displayName },
        engine,
      });
    } catch {
      return json(
        {
          error:
            'Kayıtlar okunamadı. Veritabanı bağlantısını ve migration kurulumunu kontrol edin.',
        },
        503,
      );
    }
  }

  async function POST(request: Request) {
    try {
      verifyOrigin(request);
      const data = await readBody(request);
      if (data.action === 'create' || data.action === 'demo') {
        const c =
          data.action === 'demo'
            ? await createDemo(user.userId, data.domain)
            : newCase(data.title, data.domain, data.context, data.surfaces);
        await insertCase(user.userId, c);
        return json({ request: c }, 201);
      }
      if (typeof data.id !== 'string')
        return json({ error: 'Talep kimliği gerekli.' }, 400);
      const c = await loadCase(user.userId, data.id);
      if (!c) return json({ error: 'Talep bulunamadı.' }, 404);
      if (!Number.isInteger(data.revision) || c.revision !== data.revision)
        return json(
          { error: 'Talep değişti. Yenileyin; değişikliğiniz kaydedilmedi.' },
          409,
        );
      let download: string | undefined, filename: string | undefined;
      switch (data.action) {
        case 'source':
          if (!['text', 'vtt'].includes(data.kind))
            throw new Error('Yalnız metin veya VTT destekleniyor.');
          await addSource(c, user.userId, data.name, data.content, data.kind);
          break;
        case 'proposal':
          addProposal(c, user.userId, data);
          break;
        case 'question':
          addQuestion(c, user.userId, data);
          break;
        case 'answer':
          await answerQuestion(c, user.userId, data.questionId, data.answer);
          break;
        case 'approveProposal':
        case 'rejectProposal':
          decideProposal(
            c,
            user.userId,
            data.proposalId,
            data.proposalRevision,
            data.action === 'approveProposal',
          );
          break;
        case 'reviseProposal':
          reviseProposal(c, user.userId, data.proposalId, data);
          break;
        case 'approveArtifact':
          approveArtifact(c, user.userId, data.artifactId);
          break;
        case 'packet': {
          const run = startRun(c, user.userId, data.stage as Stage);
          download = agentPacket(c, run);
          filename = 'byb-' + run.stage + '-' + run.id.slice(0, 8) + '.md';
          break;
        }
        case 'result': {
          const result =
            typeof data.result === 'string'
              ? JSON.parse(data.result)
              : data.result;
          if (!result || typeof result !== 'object')
            throw new Error('Geçerli ajan sonuç JSON dosyası gerekli.');
          applyAgentResult(c, user.userId, result);
          break;
        }
        case 'export':
          download = exportMarkdown(c, data.final === true);
          filename = data.final
            ? 'implementation-handoff.md'
            : 'draft-workspace.md';
          return json({ request: c, download, filename });
        default:
          throw new Error('Desteklenmeyen işlem.');
      }
      await saveCase(user.userId, c, data.revision);
      return json({ request: c, download, filename });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'İşlem tamamlanamadı.';
      return json(
        { error: message },
        message.startsWith('CONFLICT:') ? 409 : 400,
      );
    }
  }

  return { GET, POST };
}
