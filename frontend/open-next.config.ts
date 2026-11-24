import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";
import kvTagCache from "@opennextjs/cloudflare/overrides/tag-cache/kv-next-tag-cache";

/**
 * Zero-billing Cloudflare staging config:
 * - Workers KV (free tier) caches ISR/Data Cache entries, avoiding repeated SSR
 *   work and repeated Neon queries without enabling R2 billing.
 * - KV tag cache keeps on-demand revalidation functional (eventual consistency
 *   is documented by the adapter; acceptable for this staging deployment).
 * - Local WebP files are served by Static Assets with immutable cache headers.
 * - Route preloading stays off to limit cold-start CPU on Workers Free.
 */
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  tagCache: kvTagCache,
  routePreloadingBehavior: "none",
});
