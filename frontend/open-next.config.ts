import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

/**
 * Free-tier Cloudflare deployment:
 * - local WebP catalog assets are served by Static Assets with immutable cache
 *   headers (see next.config.ts), so no image transformation requests or bytes
 *   are spent on resizing;
 * - the R2 incremental cache keeps ISR/Data Cache entries out of the Worker and
 *   away from Neon, reducing CPU time, bandwidth and database connections;
 * - route preloading stays disabled because it increases cold-start CPU on the
 *   Workers Free plan.
 *
 * The R2 binding is declared in wrangler.jsonc and must exist before deploy.
 */
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  routePreloadingBehavior: "none",
});
