import { getChatGPTUser } from '@/app/chatgpt-auth';
import { listCases, loadCase, insertCase, saveCase } from '@/lib/store';
import {
  newCase,
  addSource,
  addProposal,
  addQuestion,
  answerQuestion,
  decideProposal,
  reviseProposal,
  startRun,
  importArtifact,
  approveArtifact,
  importAssessment,
  exportMarkdown,
} from '@/lib/workflow';
import { agentPacket, RUBRIC } from '@/lib/packets';
import { createDemo } from '@/lib/demo';
import { readBody, verifyOrigin } from '@/lib/http';
import type { Stage } from '@/lib/workflow';

export const dynamic = 'force-dynamic';
const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });

export async function GET(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return json({ error: 'Çalışma alanı için oturum açın.' }, 401);
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
      engine: {
        mode: 'agent-packet',
        description:
          'Ajan çalışma paketi: mevcut LLM oturumunu kullanır. Otomatik AI bağlantısı kurulmadı.',
      },
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

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return json({ error: 'Oturum açmanız gerekiyor.' }, 401);
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
        const run = c.runs.find((r) => r.id === result.runId);
        if (!run) throw new Error('Bu talebe ait çalışma paketi bulunamadı.');
        if (run.stage === 'readiness')
          importAssessment(
            c,
            user.userId,
            result.runId,
            result.items,
            RUBRIC,
            result.axes,
            result.report,
            result.notAssessable === true,
          );
        else {
          importArtifact(
            c,
            user.userId,
            result.runId,
            result.content,
            result.review,
          );
          if (
            !Array.isArray(result.questions || []) ||
            !Array.isArray(result.proposals || []) ||
            (result.questions?.length || 0) > 100 ||
            (result.proposals?.length || 0) > 50
          )
            throw new Error('Ajan sonuç listeleri geçersiz.');
          for (const q of result.questions || [])
            addQuestion(c, user.userId, q);
          for (const p of result.proposals || [])
            addProposal(c, user.userId, p);
        }
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
