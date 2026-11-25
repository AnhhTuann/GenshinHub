import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import kvTagCache from "@opennextjs/cloudflare/overrides/tag-cache/kv-next-tag-cache";
import memoryQueue from "@opennextjs/cloudflare/overrides/queue/memory-queue";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { computeCacheKey } from "@opennextjs/cloudflare/overrides/internal";

type CacheType = "cache" | "fetch" | "composable";
type CacheEntry = { value?: any; lastModified?: number; shouldBypassTagCache?: boolean };
type KvEntry = CacheEntry & { deleted?: boolean };

function kvKey(key: string, cacheType: CacheType): string {
  const env = getCloudflareContext().env;
  return computeCacheKey(key, {
    prefix: env.NEXT_INC_CACHE_KV_PREFIX,
    buildId: process.env.OPEN_NEXT_BUILD_ID,
    cacheType,
  });
}

/**
 * Free-tier hybrid cache for Workers Free:
 * - Reads prerendered entries from Static Assets and reuses them through the
 *   regional Cache API, reducing repeated parsing of large cache entries.
 * - Uses Workers KV for post-deploy writes, including invalidation markers, so
 *   revalidatePath/revalidateTag still work without R2.
 * - KV writes are best-effort: exceeding the free daily quota must never break
 *   the response because the build-time Static Assets cache is always valid.
 * - Known blocker: Next.js still boots on each hit because cache interception
 *   breaks RSC hydration in this app, so CPU can still approach the 10 ms limit
 *   under sustained traffic (Cloudflare error 1102).
 */
const freeTierIncrementalCache = {
  get name() {
    return staticAssetsIncrementalCache.name;
  },

  async get(key: string, cacheType: CacheType): Promise<CacheEntry | null> {
    const env = getCloudflareContext().env;
    const kv = env.NEXT_INC_CACHE_KV;
    if (kv) {
      try {
        const entry = (await kv.get(kvKey(key, cacheType), "json")) as KvEntry | null;
        if (entry?.deleted === true) return null;
        if (entry && "value" in entry) return entry;
      } catch {
        // A KV read failure falls back to the build-time cache.
      }
    }

    try {
      return await staticAssetsIncrementalCache.get(key, cacheType);
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown, cacheType: CacheType): Promise<void> {
    const env = getCloudflareContext().env;
    const kv = env.NEXT_INC_CACHE_KV;
    if (!kv) return;
    try {
      await kv.put(kvKey(key, cacheType), JSON.stringify({
        value,
        lastModified: Date.now(),
        deleted: false,
      }));
    } catch {
      // Cache writes are best-effort on the free tier.
    }
  },

  async delete(key: string): Promise<void> {
    const env = getCloudflareContext().env;
    const kv = env.NEXT_INC_CACHE_KV;
    if (!kv) return;
    try {
      await kv.put(kvKey(key, "cache"), JSON.stringify({
        deleted: true,
        lastModified: Date.now(),
      }));
    } catch {
      // If KV is exhausted, the next deploy rebuilds the static cache.
    }
  },
};

/**
 * Zero-billing Cloudflare staging config:
 * - Hybrid Static Assets + Workers KV incremental cache avoids R2 entirely.
 * - KV tag cache keeps on-demand revalidation functional (eventual consistency
 *   is documented by the adapter; acceptable for this staging deployment).
 * - Local WebP files are served by Static Assets with immutable cache headers.
 * - Route preloading stays off to limit cold-start CPU on Workers Free.
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(freeTierIncrementalCache as any, {
    mode: "long-lived",
    shouldLazilyUpdateOnCacheHit: false,
    bypassTagCacheOnCacheHit: false,
  }),
  tagCache: kvTagCache,
  queue: memoryQueue,
  routePreloadingBehavior: "none",
  // Cache interception is disabled: it bypasses Next.js on ISR/SSG hits but
  // breaks client-side RSC hydration in this app (production console reports a
  // Server Components render error). The regional Cache API layer keeps hits
  // below the Workers Free CPU budget without changing response semantics.
  enableCacheInterception: false,
});
