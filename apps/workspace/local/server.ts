import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { localStore, lockWorkspace, OWNER } from './store.ts';
import { CodexProvider } from './codex.ts';
import { agentService } from './agent-service.ts';
import { workspaceHandlers } from '../lib/workspace-service.ts';
import { readBody, verifyOrigin } from '../lib/http.ts';
const app = fileURLToPath(new URL('../', import.meta.url));
const repo = resolve(app, '../..');
const port = Number(process.env.BYB_PORT || 4317);
if (!Number.isInteger(port) || port < 1024 || port > 65535)
  throw new Error('BYB_PORT geçersiz.');
const host = '127.0.0.1:' + port,
  origin = 'http://' + host;
const dataDirectory = resolve(
  process.env.BYB_DATA_DIR || join(app, '.local-data'),
);
const releaseLock = lockWorkspace(dataDirectory);
const store = (() => {
  try {
    return localStore(dataDirectory);
  } catch (error) {
    releaseLock();
    throw error;
  }
})();
const agents = agentService(store, [new CodexProvider(repo)], repo);
const workspace = workspaceHandlers(
  store,
  { userId: OWNER, displayName: 'Yerel PM' },
  { mode: 'local-agent', description: 'Yerel Codex bağlantısı' },
);
const cookie = Buffer.from(randomBytes(32)).toString('hex');
const publicDir = join(app, 'local-dist');
const server = createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  );
  const json = (body: unknown, status = 200) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  };
  try {
    // DNS rebinding, cross-origin requests, and embedded pages cannot operate this local bridge.
    if (req.headers.host !== host) {
      json({ error: 'Yerel kaynak doğrulaması başarısız.' }, 403);
      return;
    }
    const url = new URL(req.url || '/', origin);
    if (url.origin !== origin) {
      json({ error: 'Geçersiz adres.' }, 403);
      return;
    }
    if (url.pathname.startsWith('/api/')) {
      if (req.headers['sec-fetch-site'] === 'cross-site') {
        json({ error: 'Başka bir siteden erişim reddedildi.' }, 403);
        return;
      }
      if (
        !req.headers.cookie
          ?.split(';')
          .some((c) => c.trim() === 'byb_local=' + cookie) ||
        req.headers['x-byb-local'] !== '1'
      ) {
        json({ error: 'Yerel uygulamayı bu tarayıcıda yeniden açın.' }, 401);
        return;
      }
      if (req.headers.origin && req.headers.origin !== origin) {
        json({ error: 'Başka bir siteden erişim reddedildi.' }, 403);
        return;
      }
      if (!['GET', 'POST'].includes(req.method || '')) {
        json({ error: 'Desteklenmeyen yöntem.' }, 405);
        return;
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers))
        if (typeof value === 'string') headers.set(key, value);
      let body: Buffer | undefined;
      if (req.method === 'POST') {
        verifyOrigin(new Request(origin, { method: 'POST', headers }));
        if (Number(req.headers['content-length'] || 0) > 750000)
          throw new Error('İstek çok büyük.');
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 750000) throw new Error('İstek çok büyük.');
          chunks.push(chunk);
        }
        body = Buffer.concat(chunks);
      }
      const request = new Request(url, {
        method: req.method,
        headers,
        ...(body ? { body: new Uint8Array(body) } : {}),
      });
      if (url.pathname === '/api/workspace') {
        const response = await workspace[req.method as 'GET' | 'POST'](request);
        json(await response.json(), response.status);
        return;
      }
      if (url.pathname === '/api/agent' && req.method === 'GET') {
        const id = url.searchParams.get('id');
        json(id ? { jobs: store.jobs(id) } : await agents.status());
        return;
      }
      if (url.pathname === '/api/agent' && req.method === 'POST') {
        const data = await readBody(request);
        if (data.action === 'start') {
          json(await agents.start(data), 202);
          return;
        }
        if (data.action === 'cancel') {
          agents.cancel(data.jobId);
          json({ ok: true });
          return;
        }
        if (data.action === 'settings') {
          await agents.settings(data);
          json({ ok: true });
          return;
        }
      }
      json({ error: 'İşlem bulunamadı.' }, 404);
      return;
    }
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      json({ error: 'Yöntem desteklenmiyor.' }, 405);
      return;
    }
    const path = resolve(
      publicDir,
      '.' +
        decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname),
    );
    if (!path.startsWith(publicDir + sep)) {
      json({ error: 'Bulunamadı.' }, 404);
      return;
    }
    if (!(await stat(path)).isFile()) {
      json({ error: 'Bulunamadı.' }, 404);
      return;
    }
    if (url.pathname === '/')
      res.setHeader(
        'Set-Cookie',
        `byb_local=${cookie}; HttpOnly; SameSite=Strict; Path=/`,
      );
    const mime: Record<string, string> = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.svg': 'image/svg+xml',
      '.woff2': 'font/woff2',
    };
    res.setHeader(
      'Content-Type',
      mime[extname(path)] || 'application/octet-stream',
    );
    res.end(req.method === 'HEAD' ? undefined : await readFile(path));
  } catch (e) {
    const message = e instanceof Error ? e.message : 'İşlem tamamlanamadı.';
    json(
      {
        error: message.includes('ENOENT')
          ? 'Yerel arayüz bulunamadı. Önce npm run local:build çalıştırın.'
          : message,
      },
      message.startsWith('CONFLICT:') ? 409 : 400,
    );
  }
});
server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.on('error', () => {
  console.error('Yerel sunucu başlatılamadı. Port kullanımda olabilir.');
  agents.close();
  store.close();
  releaseLock();
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () =>
  console.log('Before You Build: ' + origin),
);
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  agents.close();
  server.close();
  // Allow cancellation results to reach SQLite before closing the database.
  for (let i = 0; i < 50 && agents.isActive(); i++)
    await new Promise((r) => setTimeout(r, 100));
  store.close();
  releaseLock();
}
process.on('SIGINT', () => void stop());
process.on('SIGTERM', () => void stop());
