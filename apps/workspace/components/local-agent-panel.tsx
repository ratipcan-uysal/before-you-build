'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { STAGES } from '@/lib/workflow';
import type { Case, Stage } from '@/lib/workflow';
import type { Job, ProviderStatus } from '@/local/types';

async function call<T = Record<string, unknown>>(
  path: string,
  data?: unknown,
): Promise<T> {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json', 'X-BYB-Local': '1' },
    ...(data ? { method: 'POST', body: JSON.stringify(data) } : {}),
  });
  const result = (await response.json()) as T & { error?: string };
  if (!response.ok)
    throw new Error(result.error || 'Yerel AI bağlantısı yanıt vermedi.');
  return result;
}
export function LocalAgentPanel({
  current,
  stage,
  onClose,
  onUpdate,
}: {
  current: Case | null;
  stage: Stage | null;
  onClose: () => void;
  onUpdate: (c: Case) => void;
}) {
  const [providers, setProviders] = useState<ProviderStatus[]>([]);
  const [provider, setProvider] = useState('codex'),
    [model, setModel] = useState('');
  const [busy, setBusy] = useState(false),
    [error, setError] = useState(''),
    [notice, setNotice] = useState('');
  const [consent, setConsent] = useState(false),
    [jobs, setJobs] = useState<Job[]>([]);
  const seen = useRef(new Set<string>());
  const currentId = current?.id;
  const refresh = useCallback(async () => {
    setBusy(true);
    setError('');
    try {
      const data = (await call('/api/agent')) as {
        providers: ProviderStatus[];
        settings: { provider: string; model: string };
      };
      setProviders(data.providers);
      setProvider(data.settings.provider);
      const selected = data.providers.find(
        (p) => p.id === data.settings.provider,
      );
      setModel(
        data.settings.model ||
          selected?.models.find((m) => m.isDefault)?.id ||
          selected?.models[0]?.id ||
          '',
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    // Initial connection discovery; no product state is derived in this effect.
    // oxlint-disable-next-line react/react-compiler
    void refresh();
  }, [refresh]);
  useEffect(() => {
    if (!currentId) return;
    let cancelled = false,
      inflight = false;
    const poll = async () => {
      if (inflight) return;
      inflight = true;
      try {
        const data = (await call(
          '/api/agent?id=' + encodeURIComponent(currentId),
        )) as { jobs: Job[] };
        if (cancelled) return;
        setJobs(data.jobs);
        const completed = data.jobs.filter(
          (j) => j.status !== 'running' && !seen.current.has(j.id),
        );
        if (completed.length) {
          for (const j of completed) seen.current.add(j.id);
          const fresh = await call<{ request: Case }>(
            '/api/workspace?id=' + encodeURIComponent(currentId),
          );
          if (!cancelled && fresh.request) onUpdate(fresh.request);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        inflight = false;
      }
    };
    void poll();
    const timer = setInterval(() => void poll(), 3000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [currentId, onUpdate]);
  const selected = providers.find((p) => p.id === provider);
  const last = currentId ? jobs.find((j) => j.caseId === currentId) : undefined;
  const start = async () => {
    if (!current || !stage) return;
    setBusy(true);
    setError('');
    try {
      const result = await call<{ job: Job; request: Case }>('/api/agent', {
        action: 'start',
        id: current.id,
        revision: current.revision,
        stage,
        provider,
        model,
        consent,
      });
      setJobs((old) => [result.job, ...old]);
      onUpdate(result.request);
      setConsent(false);
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <section className="local-agent-panel">
      <details>
        <summary>
          Yerel AI bağlantısı · {selected?.name || 'Codex'} ·{' '}
          {busy
            ? 'Kontrol ediliyor'
            : selected?.ready
              ? 'Hazır'
              : 'Kurulum gerekli'}
        </summary>
        <div className="local-agent-controls">
          <label className="form-field">
            AI bağlantısı
            <NativeSelect
              value={provider}
              onChange={(e) => {
                setProvider(e.target.value);
                setModel('');
                setNotice('');
              }}
            >
              {providers.map((p) => (
                <NativeSelectOption key={p.id} value={p.id} disabled={!p.ready}>
                  {p.name}
                  {!p.ready ? ' · kullanılamıyor' : ''}
                </NativeSelectOption>
              ))}
              {!providers.length && (
                <NativeSelectOption value="codex">Codex</NativeSelectOption>
              )}
            </NativeSelect>
          </label>
          <label className="form-field">
            Model
            <NativeSelect
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                setNotice('');
              }}
            >
              <NativeSelectOption value="">Model seçin</NativeSelectOption>
              {selected?.models.map((m) => (
                <NativeSelectOption key={m.id} value={m.id}>
                  {m.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </label>
          <Button
            variant="outline"
            disabled={busy || !model || !selected?.ready}
            onClick={async () => {
              setBusy(true);
              setError('');
              try {
                await call('/api/agent', {
                  action: 'settings',
                  provider,
                  model,
                });
                setNotice('Varsayılan bağlantı ve model kaydedildi.');
              } catch (e) {
                setError((e as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            Varsayılan olarak kaydet
          </Button>
          <Button
            variant="outline"
            disabled={busy}
            onClick={() => void refresh()}
          >
            Bağlantıyı yenile
          </Button>
        </div>
        <p>{selected?.detail || 'Codex CLI ve oturum kontrol ediliyor.'}</p>
        <p className="muted">
          Claude bağlantısı henüz uygulanmadı. Bu sürüm Codex kullanır. Kayıtlar
          bu bilgisayardadır; analiz içeriği seçilen model sağlayıcısına
          gönderilir.
        </p>
        {notice && <output>{notice}</output>}
      </details>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      {last && (
        <div className="local-run-status" aria-live="polite">
          <strong>
            {STAGES.find((s) => s.id === last.stage)?.title} ·{' '}
            {last.status === 'running'
              ? 'Çalışıyor'
              : last.status === 'succeeded'
                ? 'Tamamlandı'
                : last.status === 'stale'
                  ? 'Kaynaklar değişti'
                  : last.status === 'cancelled'
                    ? 'İptal edildi'
                    : 'Tamamlanamadı'}
          </strong>
          <p>{last.message}</p>
          <small>
            {last.provider} · {last.model}
          </small>
          {last.status === 'running' && (
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  await call('/api/agent', {
                    action: 'cancel',
                    jobId: last.id,
                  });
                } catch (e) {
                  setError((e as Error).message);
                }
              }}
            >
              Çalışmayı durdur
            </Button>
          )}
          <details>
            <summary>Çalışma kaydı</summary>
            <p>
              Skill: {last.skill || 'Workspace uzantısı'} · Kaynak sürümü:{' '}
              {last.epoch}
            </p>
            <p>Oturum: {last.threadId || 'Henüz açılmadı'}</p>
            <p className="mono">Skill SHA-256: {last.skillHash}</p>
          </details>
        </div>
      )}
      <Dialog
        open={!!stage}
        onOpenChange={(open) => {
          if (!open) {
            setConsent(false);
            onClose();
          }
        }}
      >
        <DialogContent className="workspace-dialog">
          <DialogHeader>
            <DialogTitle>
              {STAGES.find((s) => s.id === stage)?.title}
            </DialogTitle>
            <DialogDescription>
              Kaynaklara dayalı analiz başlatılır. Sonuçlar otomatik onaylanmaz.
            </DialogDescription>
          </DialogHeader>
          <p>
            {current?.title} · {provider} / {model || 'Model seçilmedi'}
          </p>
          <p>
            {current?.sources.length || 0} kaynak, mevcut dokümanlar, sorular ve
            karar kayıtları analize dahil edilir. Codex dosyaları değiştiremez;
            dış bağlantılar ve MCP bu analizde kapalıdır.
          </p>
          <label className="check-row" htmlFor="analysis-consent">
            <Checkbox
              id="analysis-consent"
              checked={consent}
              onCheckedChange={(v) => setConsent(v === true)}
            />
            <span>
              Bu talebin içeriğinin seçilen model sağlayıcısına gönderilmesini
              onaylıyorum.
            </span>
          </label>
          {!selected?.ready || !model ? (
            <p>
              Önce sayfanın üstündeki Yerel AI bağlantısından kurulumu
              tamamlayın ve model seçin.
            </p>
          ) : null}
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <Button
            disabled={
              busy ||
              !consent ||
              !model ||
              !selected?.ready ||
              last?.status === 'running'
            }
            onClick={() => void start()}
          >
            {busy ? 'Başlatılıyor…' : 'Analizi başlat'}
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}
