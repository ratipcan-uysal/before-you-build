import { createHash, randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { STAGES, startRun } from '../lib/workflow.ts';
import type { Stage } from '../lib/workflow.ts';
import { agentPacket } from '../lib/packets.ts';
import { applyAgentResult } from '../lib/agent-result.ts';
import type { AgentResult } from '../lib/agent-result.ts';
import { OWNER } from './store.ts';
import type { LocalStore } from './store.ts';
import type { AgentProvider, Job } from './types.ts';
import { agentOutputSchema } from './output-schema.ts';
const hash = (value: string) =>
  createHash('sha256').update(value).digest('hex');

export function agentService(
  store: LocalStore,
  providers: AgentProvider[],
  repo: string,
) {
  const active = new Map<string, AbortController>();
  const preparing = new Set<string>();
  async function status() {
    const available = await Promise.all(providers.map((p) => p.status()));
    return {
      providers: [
        ...available,
        {
          id: 'claude',
          name: 'Claude',
          ready: false,
          models: [],
          detail:
            'Henüz bağlı değil. Claude adaptörü sonraki adım; API veya kurumsal erişim gerektirir. Claude aboneliğini otomatik kullanmaz.',
        },
      ],
      settings: store.settings(),
    };
  }
  async function start(data: {
    id: string;
    revision: number;
    stage: Stage;
    provider: string;
    model: string;
    consent: boolean;
  }) {
    if (data.consent !== true)
      throw new Error(
        'Bu talebin kaynaklarının seçilen modele gönderilmesini onaylayın.',
      );
    if (
      preparing.has(data.id) ||
      store.jobs(data.id).some((j) => j.status === 'running')
    )
      throw new Error('Bu talep için bir analiz zaten çalışıyor.');
    preparing.add(data.id);
    try {
      const provider = providers.find((p) => p.id === data.provider);
      if (!provider) throw new Error('Bu AI bağlantısı henüz desteklenmiyor.');
      const c = await store.loadCase(OWNER, data.id);
      if (!c) throw new Error('Talep bulunamadı.');
      if (c.revision !== data.revision)
        throw new Error('CONFLICT: Talep değişti. Yenileyin.');
      const run = startRun(c, OWNER, data.stage); // Check stage gates before contacting provider.
      const available = await provider.status();
      if (!available.ready) throw new Error(available.detail);
      if (!available.models.some((m) => m.id === data.model))
        throw new Error('Seçtiğiniz model bu bağlantıda kullanılamıyor.');
      const skill = STAGES.find((s) => s.id === data.stage)!.skill;
      const skillPath = skill
        ? join(repo, 'skills', skill, 'SKILL.md')
        : undefined;
      const prompt = agentPacket(c, run);
      if (Buffer.byteLength(prompt) > 1200000)
        throw new Error(
          'Analiz bağlamı çok büyük. Kaynakları daha küçük taleplere ayırın.',
        );
      const job: Job = {
        id: randomUUID(),
        caseId: c.id,
        runId: run.id,
        stage: run.stage,
        provider: provider.id,
        model: data.model,
        skill,
        skillHash: hash(
          skillPath ? await readFile(skillPath, 'utf8') : 'workspace-extension',
        ),
        inputHash: hash(prompt),
        revision: c.revision + 1,
        epoch: c.epoch,
        status: 'running',
        message: 'Codex bağlantısı kuruluyor.',
        createdAt: new Date().toISOString(),
      };
      await store.saveCase(OWNER, c, data.revision);
      store.putJob(job);
      const controller = new AbortController();
      active.set(job.id, controller);
      const timeout = setTimeout(() => controller.abort(), 15 * 60 * 1000);
      void (async () => {
        try {
          const raw = await provider.run({
            prompt,
            skill,
            skillPath,
            model: data.model,
            signal: controller.signal,
            outputSchema: agentOutputSchema(run.stage, run.id),
            onProgress(message, threadId) {
              job.message = message;
              job.threadId = threadId;
              store.putJob(job);
            },
          });
          if (controller.signal.aborted)
            throw new Error('Çalışma iptal edildi veya süre sınırına ulaştı.');
          const current = await store.loadCase(OWNER, c.id);
          if (!current || current.revision !== job.revision) {
            job.status = 'stale';
            job.message =
              'Analiz sürerken talep değişti. Eski sonuç uygulanmadı; güncel kaynaklarla yeniden çalıştırın.';
          } else {
            const result = JSON.parse(raw) as AgentResult;
            if (result.runId !== run.id)
              throw new Error('Ajan yanlış çalışma kimliği döndürdü.');
            if (result.review) result.review.independentContext = true; // Fresh runtime thread, not a model assertion.
            applyAgentResult(current, provider.id + '/' + data.model, result);
            await store.saveCase(OWNER, current, job.revision);
            job.status = 'succeeded';
            job.message =
              'Analiz kaydedildi. Öneriler ve dokümanlar PM onayı bekler.';
          }
        } catch (e) {
          job.status = controller.signal.aborted ? 'cancelled' : 'failed';
          job.message = controller.signal.aborted
            ? 'Çalışma iptal edildi veya 15 dakikalık süre sınırına ulaştı. Sonuç uygulanmadı.'
            : e instanceof Error
              ? e.message
              : 'Analiz tamamlanamadı.';
        } finally {
          clearTimeout(timeout);
          active.delete(job.id);
          job.finishedAt = new Date().toISOString();
          store.putJob(job);
        }
      })();
      return { job, request: c };
    } finally {
      preparing.delete(data.id);
    }
  }
  return {
    status,
    start,
    cancel(id: string) {
      const controller = active.get(id);
      if (!controller) throw new Error('Çalışan analiz bulunamadı.');
      controller.abort();
    },
    async settings(value: { provider: string; model: string }) {
      const provider = providers.find((p) => p.id === value.provider);
      const state = await provider?.status();
      if (!state?.ready || !state.models.some((m) => m.id === value.model))
        throw new Error('Geçerli bir bağlantı ve model seçin.');
      store.saveSettings(value);
    },
    close() {
      for (const c of active.values()) c.abort();
      for (const p of providers) p.close();
    },
    isActive() {
      return active.size > 0;
    },
  };
}
