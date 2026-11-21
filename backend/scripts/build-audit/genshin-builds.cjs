const { createHash } = require('node:crypto');
const { setTimeout: sleep } = require('node:timers/promises');
const { normalize } = require('./audit.cjs');

async function lookupCharacter(sourceId) {
  if (!/^[a-z0-9_-]+$/.test(sourceId)) throw new Error('Expected an explicit Genshin-Builds character slug');
  const url = new URL('https://genshin-builds.com/api/genshin/character');
  url.search = new URLSearchParams({ id: sourceId, lang: 'english' });

  let response;
  for (let attempt = 0; attempt < 2; attempt++) {
    response = await fetch(url, { signal: AbortSignal.timeout(12000), redirect: 'error' });
    if (response.ok) break;
    const retryAfter = response.headers.get('retry-after');
    const delay = retryAfter === null ? 2000 : /^\d+$/.test(retryAfter)
      ? Number(retryAfter) * 1000 : Date.parse(retryAfter) - Date.now();
    if (attempt || ![429, 502, 503, 504].includes(response.status) ||
        !Number.isFinite(delay) || delay > 10000) {
      await response.body?.cancel();
      throw new Error(`Genshin-Builds returned HTTP ${response.status}`);
    }
    await response.body?.cancel();
    await sleep(Math.max(2000, delay));
  }
  if (!response.headers.get('content-type')?.includes('application/json')) {
    await response.body?.cancel();
    throw new Error('Genshin-Builds did not return JSON');
  }
  const body = await response.text();
  const payload = JSON.parse(body);
  return {
    data: normalize(payload, sourceId),
    provenance: {
      apiUrl: url.href,
      pageUrl: `https://genshin-builds.com/en/character/${sourceId}`,
      auditedAt: new Date().toISOString(),
      sourceVersion: typeof payload.version === 'string' ? payload.version : null,
      etag: response.headers.get('etag'),
      sha256: createHash('sha256').update(body).digest('hex'),
    },
  };
}

module.exports = { lookupCharacter };
