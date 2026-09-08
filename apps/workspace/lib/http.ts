export function verifyOrigin(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json'))
    throw new Error('JSON içerik türü gerekli.');
  const origin = request.headers.get('origin');
  if (
    !origin ||
    new URL(origin).origin !== new URL(request.url).origin ||
    request.headers.get('sec-fetch-site') === 'cross-site'
  )
    throw new Error('Kaynak doğrulaması başarısız.');
}
export async function readBody(request: Request) {
  const max = 750000;
  if (Number(request.headers.get('content-length') || 0) > max)
    throw new Error('İstek çok büyük.');
  const reader = request.body?.getReader();
  if (!reader) throw new Error('İstek gövdesi boş.');
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) {
      await reader.cancel();
      throw new Error('İstek çok büyük.');
    }
    chunks.push(value);
  }
  const combined = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }
  const parsed = JSON.parse(
    new TextDecoder('utf-8', { fatal: true }).decode(combined),
  );
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed))
    throw new Error('Geçerli JSON nesnesi gerekli.');
  return parsed;
}
