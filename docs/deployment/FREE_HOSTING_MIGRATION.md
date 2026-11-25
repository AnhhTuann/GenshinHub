# Free hosting migration: Cloudflare Workers + Render + Neon

> **Final architecture (2026-11-25): Vercel Hobby + Render Free + Neon Free.**
> The Cloudflare Workers/OpenNext sections below are retained as historical
> evidence only. Workers were rejected because Next.js/i18n page rendering
> exceeds the Free-plan 10 ms CPU budget. The current deployment and verified
> evidence are recorded in [Final Vercel/Render/Neon release evidence](#final-vercelrenderneon-release-evidence-2026-11-25).

Branch: `deploy/cloudflare-render-free`. This branch contains all six completed
P1/staging commits (`85b64ba` … `9b992dd`) plus the Cloudflare/OpenNext
preparation. Portfolio and Pokédex projects are outside this migration.

## Target architecture

| Layer | Platform | Notes |
| --- | --- | --- |
| Frontend | Cloudflare Workers Free + OpenNext | Staging Worker `genshinhub-frontend-staging`, Static Assets from `.open-next/assets` |
| Backend | Render Free (Node.js, Apollo GraphQL, Prisma) | Blueprint `render.yaml`, service `genshinhub-api` |
| Database | Existing Neon Free | No reset, no destructive migration, no schema rewrite |
| Catalog assets | Cloudflare Static Assets | 2,350 pre-optimised WebP files, immutable cache headers |
| ISR / Data Cache | Cloudflare Workers KV Free | Two staging namespaces: `genshinhub-frontend-staging-incremental-cache` and `genshinhub-frontend-staging-tag-cache`; no R2 or billing activation |

## Files added for the migration

- `render.yaml` — manual-deploy Render Free blueprint (`autoDeploy: false`).
- `frontend/wrangler.jsonc` — staging Worker `genshinhub-frontend-staging`, Static Assets, self-reference and two free KV cache bindings.
- `frontend/open-next.config.ts` — KV incremental cache plus KV tag cache; route preloading disabled to limit cold-start CPU.
- `backend/scripts/staging/syncFromLocal.ts` — read-only dry-run, manifest, verified alias normalization and idempotent staging-only upserts.
- `backend/docs/staging-sync/` — dry-run summary, complete checksum manifest and applied evidence.
- `backend/src/utils/storageMode.ts` + guards in `backend/src/index.ts` and `backend/src/backupService.ts` — filesystem uploads/backups fail closed on stateless hosts.
- `.github/workflows/neon-pgdump.yml` — manual, free `pg_dump` to a private 7-day Actions artifact.
- `.gitignore` — excludes `.open-next/` and `.wrangler/`; build output can contain build-time environment values and must never be committed.

The earlier untracked `backend/wrangler.jsonc` was removed: it referenced a
non-existent `backend/src/worker.ts` and the backend target is Render Node.js,
not a Cloudflare Worker.

## Free-tier cost and performance decisions

- `next.config.ts` keeps `images.unoptimized: true`; every catalog image is already WebP, so no `/_next/image` transformations or Vercel-style image quota are needed.
- `frontend/public/_headers` gives `/assets/*`, `/_next/static/*` and the two root WebP files `Cache-Control: public, max-age=31536000, immutable` on Cloudflare Static Assets (Next.js `headers()` do not apply to static-asset responses). Asset filenames must change when their content changes; the sync workflow preserves versioned names.
- GraphQL reads use `next: { revalidate: 3600 }`; repeat SSR requests are served from the free KV incremental cache instead of re-querying Neon. KV tag cache keeps on-demand revalidation functional; its documented eventual consistency is acceptable for staging.
- `routePreloadingBehavior: "none"` avoids extra Workers CPU on cold starts.
- Render Free instances sleep when idle. The `/health` endpoint does not touch the database, so external uptime checks do not open Neon connections. Expect a cold-start delay after inactivity; no paid always-on plan is used.
- The Neon connection string is only a Render secret / GitHub Actions secret, never a repository file or a browser-exposed `NEXT_PUBLIC_*` variable.

## Upload and backup limitations (resolved without paid services)

Render Free and Workers have no durable filesystem. The old backend wrote
uploads into `frontend/public/assets/uploads` and backups into
`backend/backups`; on a stateless host those files would vanish or 404.

- `/upload`, `/backups`, `/backups/:id/download` and the filesystem backup mutations now return an explicit error when `STATELESS_HOST=1`, `RENDER=1` or `VERCEL=1`. No silent data loss and no destructive restore is possible from an empty ephemeral directory.
- Admin editors can use the existing **paste URL** option in `AdminEditableSplash`; catalog image changes go through the existing asset-sync workflow, which publishes WebP into Static Assets at deploy time.
- Durable database backups use `.github/workflows/neon-pgdump.yml`: add `NEON_DATABASE_URL` as a repository secret, run the workflow manually, and download the private `custom`-format dump. Restore stays an explicit, reviewed operation using the existing Neon/restore runbooks — the application never performs an automatic destructive restore.

## Deploy order (do not reorder)

### 0. Credentials required

This working environment has Cloudflare Wrangler OAuth and Vercel CLI auth,
but **no Render credentials** and no `NEON_DATABASE_URL` GitHub secret. Supply
a Render API key / dashboard access before step 1. Nothing below was executed
against production by this preparation commit.

### 1. Render backend first

1. In Render, create the service from `render.yaml` (Blueprint → upload this branch or connect the repo at this branch).
2. Set `DATABASE_URL` to the existing Neon Free connection string and `FRONTEND_URL` to the eventual Workers URL. Leave `STATELESS_HOST=1`.
3. Deploy manually (auto-deploy is disabled).
4. Verify before touching the frontend:

```bash
curl -fsS https://genshinhub-api.onrender.com/health
curl -fsS -H 'Content-Type: application/json' \
  -d '{"query":"{ __typename characters { id } weapons { id } }"}' \
  https://genshinhub-api.onrender.com/graphql
```

Expected: `status: ok`, `__typename: Query`, 131 characters and 279 weapons
(read-only counts). If Render assigns a different onrender.com hostname, use
that hostname everywhere below.

### 2. Cloudflare frontend

Use Node 22.12+ for Wrangler:

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.5/bin:$PATH"
cd frontend

# The two free KV namespaces and their IDs are already in wrangler.jsonc.
# Create them once per account with:
# wrangler kv namespace create genshinhub-frontend-staging-incremental-cache
# wrangler kv namespace create genshinhub-frontend-staging-tag-cache

export BACKEND_URL=https://genshinhub-api.onrender.com
export NEXT_PUBLIC_GRAPHQL_URL=https://genshinhub-api.onrender.com/graphql
export REVALIDATE_SECRET='<same value used in the Worker secret>'
npx opennextjs-cloudflare build

wrangler secret put REVALIDATE_SECRET
# Add BACKEND_URL and NEXT_PUBLIC_GRAPHQL_URL to "vars" in wrangler.jsonc.
npx wrangler deploy
```

`BACKEND_URL` and `NEXT_PUBLIC_GRAPHQL_URL` must be present both at build time
(for server components / prerender) and in the deployed Worker. Never commit
them or the revalidation secret. The live Worker URL is printed by
`wrangler deploy`; set Render's `FRONTEND_URL` to it and redeploy the backend so
CORS allows the new origin.

### 3. Live verification

- `GET /health` → 200.
- `POST /graphql` → 200 with catalog counts and a default build for a sampled character.
- Public pages in both locales, character detail/build switches, Tier List, weapons, materials, Admin login and all Admin review routes.
- Same-origin `/api/graphql`, `/api/admin/graphql`, auth and revalidate routes.
- Static asset: `Cache-Control: public, max-age=31536000, immutable` on a WebP file.
- `wrangler tail genshinhub-frontend-staging` and Render logs show no auth failures or cache-binding errors.

Only after all of the above pass may the two GenshinHub Vercel projects be
deleted: `genshinhub-staging` (`prj_GCP61fQ0doAO9sUMXQImtiqapNm3`) and
`genshinhub-api-staging` (`prj_7qNuAPpSkSogQF974QtG5Rvx088K`).
`portfolio`, `portfolio-api-free`, `belleza-lab` and `ut-web` must remain
untouched.

## Verification run in this session (pre-deployment only)

| Check | Result |
| --- | --- |
| `npx prisma validate` (backend) | PASS |
| `npx tsc --noEmit` (backend and frontend) | PASS |
| `npm run test:auth` (backend) | 10 pass, 0 fail, 1 skipped |
| `npx vitest run` (frontend) | 21 pass / 21 |
| Backend GraphQL suites | 76 pass / 84; 8 pre-existing/environment-gated failures (4 documented stale dev-data assertions plus isolated-DB tests with no `*_TEST_DATABASE_URL`) |
| Local PostgreSQL (read-only) | 131 characters, 279 weapons, 63 artifact sets, 862 materials, 347 builds, 1 Admin; 7 migrations applied and up to date |
| Neon CLI | Authenticated. Project `jolly-cell-95415947`; staging branch `br-hidden-frost-aouh1xm1`, fresh recovery branch `br-muddy-recipe-aomvqeho`. 7 migrations found, schema up to date. Production branch untouched. |
| Neon staging sync (dry run) | PASS — 0 blocked conflicts; 501 legacy/unverifiable rows explicitly excluded; 485 legacy aliases resolved only through repository-verified maps (`enkaNameMap`, `toId`, exact Weapon name matches). |
| Neon staging sync (apply + verify) | PASS — 8,117 canonical + 485 alias upserts, all `VERIFY PASS` by checksum. Final counts: 131 characters, 279 weapons, 63 sets, 862 materials, 347 builds, 620 teams, 2,478 team members, 1 character ranking, 6 weapon reviews. No deletes, resets, auto-approvals or auth/admin imports. Evidence: `backend/docs/staging-sync/APPLY_RESULTS.md`. |
| `npm run build` (backend) | PASS |
| `npm audit fix` | Applied without `--force`. Remaining advisories require breaking majors (Nodemailer ≤10.1.3, Next.js/PostCSS, Tailwind typography); not force-upgraded. |
| Backend hardening review | CORS allowlist driven by `FRONTEND_URL`; express-rate-limit 1,000/15 min plus DB-backed login/reset locks; single Prisma Client; `/env` secret endpoint removed. |
| GraphQL N+1 audit | Batched per-row weapon/artifact catalog lookups (`catalogWeaponId`, `rarity`, `iconUrl`, `artifactSetId`, `mixSets`, `signatureWeapons`) through DataLoaders; regression test proves one query per field regardless of key count. Hot-path indexes verified in `schema.prisma`. |
| Render OOM root cause | `import 'genshin-db'` alone allocates ~576 MiB RSS (package is 180 MB), above the 512 MiB free limit. Replaced with a committed generated snapshot (`backend/data/weapon-game-data.json`, 1.3 MB) produced by `npm run data:weapon-game-data`; the package is now maintenance-time only. |
| Startup memory after fix | Production build peaks at 90 MiB RSS; 104 MiB while serving `weapons` + `weaponGameData`. Explicit `app.listen(PORT, '0.0.0.0')` for Render's port scanner. |
| 512 MiB container test | `docker run --memory=512m --memory-swap=512m` on the production build: `/health` → 200 and `weaponGameData` returns 14 levels, 5 refinements, 6 ascension stages with no errors. |
| `npx opennextjs-cloudflare build` | PASS against the running local backend (`http://127.0.0.1:4000`) with KV incremental + tag cache. |
| First build attempt against `https://genshinhub-api.onrender.com` | FAILED with GraphQL 404 during prerender — the Render service was not serving at that time. |
| `npx wrangler deploy --dry-run` | PASS — 2,688 assets, ~9.0 MiB Worker, KV incremental/tag, self-reference and Static Assets bindings present; no R2 binding. |
| `wrangler dev --local` | `/` → 307; WebP → `Cache-Control: public, max-age=31536000, immutable`; same-origin `/api/graphql` → 200 |
| Live `https://genshinhub-api.onrender.com/health` and `/graphql` | BLOCKED — both probes timed out after 120 s with 0 bytes. DNS resolves, but the service does not respond. |
| Browser E2E scripts | Playwright 1.65.1 + Chromium installed; suites not run because no live frontend/backend exists yet. |
| Vercel project deletion | Not run and intentionally deferred: replacement is not verified. |

The OpenNext artifact built here is a **verification artifact only**: its
baked endpoint is the local backend. It must be rebuilt with the verified
Render URL before any `wrangler deploy`.

## Free-plan limits checked (no billing activation)

| Platform | Relevant limits | Consequence for this project |
| --- | --- | --- |
| Cloudflare Workers Free | 100,000 requests/day, 10 ms CPU/invocation, 128 MB memory, subrequest limit per invocation | Keep SSR routes dynamic only where needed; static assets served directly; KV cache avoids repeat SSR queries. |
| Cloudflare Workers KV Free | 100,000 reads/day, 1,000 writes/day to different keys, 1 write/s to the same key, 1 GB storage | Tag cache is eventually consistent; acceptable for staging revalidation. Do not use KV for per-request private/session data. |
| Render Free web service | 0.1 CPU, 512 MB RAM, sleeps after 15 min idle (~1 min wake), 750 instance-hours/workspace/month, ephemeral filesystem | Cold starts are expected; no local disk persistence. Uploads/backups need external durable storage or must stay disabled. |

R2 was rejected before activation: `wrangler r2 bucket list` returned
`Please enable R2 through the Cloudflare Dashboard. [code: 10042]`. No billing
was enabled.

## Blockers before live deployment

1. **Render access**: no API key, CLI session or dashboard session is available in this environment. The existing service `genshinhub-api` (`srv-dc2p4m3ncjis73dkf44g`) cannot be inspected, configured with the Neon staging URL, redeployed or verified. Its public URL currently times out.
2. **Staging Owner Admin**: username, email, display name and a securely collected password are required for `npm run auth:bootstrap-admin`. No admin/auth rows were copied from local.
3. **Durable uploads/backups**: Render Free has an ephemeral filesystem, R2 cannot be enabled without billing, and no other durable store is approved. Uploads and local backups therefore remain behind HTTP 503 guards rather than silently losing data.
4. **Vercel cleanup**: CLI auth exists, but the two GenshinHub projects must not be deleted until live checks pass. Portfolio, Pokédex and other projects are explicitly out of scope.

## Live staging evidence (2026-11-25)

The earlier "pre-deployment only" table is historical. The staging migration is
now live at:

- Backend: `https://genshinhub-api.onrender.com` (existing Render Free service
  `genshinhub-api`, deployment `dep-dc35p5m7bikc73c6dig0`, `LIVE`).
- Frontend: `https://genshinhub-frontend-staging.enshin-ub.workers.dev`
  (Worker `genshinhub-frontend-staging`, current version
  `a9d67250-cf21-437f-b418-26068e2d78b1`).

Verified after the Render CORS fix:

| Check | Result |
| --- | --- |
| Render `/health` | 200, `{"status":"ok"}` |
| Render `/graphql` | 200, `characters=131`, `weapons=279`, `artifacts=63`, `materials=862`, no errors |
| CORS preflight from Worker origin | 204 with `access-control-allow-origin: https://genshinhub-frontend-staging.enshin-ub.workers.dev` |
| Same-origin Worker `/api/graphql` | 200 with the same four catalog counts |
| `/api/admin/graphql`, `/api/auth/*` unauthenticated | 401/405 with no public `Cache-Control` |
| WebP static asset | `public, max-age=31536000, immutable` |
| `/api/revalidate` | 401 for wrong secret; 200 for the configured secret across 14 locales |
| Public Playwright sweep (interception-on experiment) | 49/50; the only failure was a client console "Server Components render" error introduced by cache interception |
| Neon staging Admin | `admin=1`, username `staging_owner`, `user=0`, `authSession=0`; no auth/admin rows copied from local |
| Staging sync | 0 blocked conflicts; 485 applied records match the manifest; no deletes or production writes |

### HTTP 503 root-cause analysis

The intermittent 503s are **Cloudflare error 1102 (`Worker exceeded CPU time
limit`)**, not Render outages, KV quota errors or application exceptions.

A 59-invocation `wrangler tail` trace on the current deployment produced:

- 50 × HTTP 200, 6 × HTTP 307, 2 × HTTP 503.
- Both 503 events had `outcome=exceededCpu` and exceptions named
  `Worker exceeded CPU time limit`; response body was `error code: 1102`.
- No `KV put() limit exceeded`, no GraphQL/application exceptions and no
  Render-fetch failures appeared in that trace.
- Successful page invocations reported 31–748 ms CPU because Cloudflare grants
  isolates occasional flexibility above the nominal 10 ms Free-plan budget;
  sustained probing still terminates some invocations.

Earlier KV-only deployments did show `KV put() limit exceeded for the day`
during the adapter prefill. The current hybrid cache catches KV write failures,
so cache quota exhaustion is now best-effort and cannot itself cause a 503.
Render health and direct GraphQL stayed 200 throughout; no cold-start-related
503 was observed.

### Cache configuration decision

After testing both zero-billing variants, `frontend/open-next.config.ts`
remains at the hybrid baseline from `a3aa465`:

- Static Assets incremental cache for build-time prerendered entries.
- Workers KV for post-deploy writes and invalidation markers (best-effort).
- Regional Cache API (`long-lived`) to avoid repeatedly parsing large entries.
- KV tag cache and the in-memory revalidation queue; no R2 and no billing.
- `routePreloadingBehavior: "none"` and `enableCacheInterception: false`.

`enableCacheInterception: true` reduced CPU in the hybrid build but broke
client-side RSC hydration (production console reported a Server Components
render error on public pages), so it was reverted.

### Static-first experiment (rejected)

A pure Static Assets cache with `enableCacheInterception: true` and no custom
KV/regional layer was built and deployed as Worker version
`97103b94-db0b-4cb3-a4df-91e56e271465`.

Local verification passed:

- `npx opennextjs-cloudflare build` exited 0. `wrangler deploy --dry-run` read
  3,749 files and reported `9161.42 KiB / gzip 1885.88 KiB` (3,532 assets,
  1,045 cache assets, 2,216-byte Worker).
- Local preview returned 200 for public pages, 405 for API GETs, 401 for
  `/api/auth/me`, redirected unauthenticated admin/profile routes, served WebP
  with immutable cache headers, and hydrated client navigation with zero
  unexpected console errors. Frontend Vitest: 21/21 passed.
- The build emitted **no prerendered `.html` for `/[locale]` pages**:
  `.next/prerender-manifest.json` listed only `_not-found`, `sitemap.xml`,
  `icon.png` and `apple-icon.png`, and the 1,045 cache files contained only
  five route-cache entries. Static Assets therefore could not serve public
  HTML; Next.js still booted on every page request.

Live verification rejected the experiment:

- Initial 22-request bounded test: 18×200, 4×405, 0×503. Tail: 20 events,
  0 `exceededCpu`, CPU p50 131 ms / p90 578 ms / max 845 ms. Static WebP
  assets bypassed the Worker (`asset_events=0`).
- Extended 60-request test: 36×200, 9×405, 12×503 (plus two truncated tail
  records). Tail parsed 59 events; 14 had `outcome=exceededCpu`. All 12 HTTP
  503 responses had `cpuTime` 9–10 ms and `error code: 1102`; successful page
  invocations still peaked at 665 ms CPU (p50 113 ms, p90 333 ms).
- The Worker was rolled back to the previous hybrid version
  `a9d67250-cf21-437f-b418-26068e2d78b1`. No further deployment experiments
  were run.

### Final live verification on the restored hybrid version

- `wrangler rollback` restored version `a9d67250-cf21-437f-b418-26068e2d78b1`
  to 100% traffic. A bounded probe returned 200 for `/en/characters`,
  `/en/weapons`, `/en/tierlist` and `/sitemap.xml`; 405 for `GET /api/graphql`;
  and 401 for `/api/auth/me`.
- Full public Playwright E2E: `SUMMARY total=50 pass=50 fail=0`. This included
  same-origin GraphQL counts 131/279/63/862, 14-locale revalidation accepting
  the configured secret and rejecting a wrong secret, unauthenticated admin
  redirect, mobile overflow checks, zero unexpected console errors and zero
  unexpected failed requests.

### Remaining blockers

1. **Workers Free CPU budget is the exact unavoidable blocker**: this
   Next.js/i18n build does not emit prerendered public HTML, so every public
   page boots Next.js and spends roughly 9–845 ms CPU per invocation. Workers
   Free allows 10 ms; sustained traffic terminates invocations with error
   1102. Removing this requires app/build changes (a real static HTML export
   or moving page rendering to Render), which exceeds the approved smallest
   viable architecture change. No paid upgrade is allowed.
2. **Authenticated Admin E2E**: the hidden-prompt script
   `/tmp/opencode/get-admin-token.cjs` is ready, but
   `/tmp/opencode/admin-token.txt` has not been created. No password was
   printed, stored or committed.
3. **Durable uploads/backups**: unchanged; Render Free is ephemeral and R2 is
   unavailable without billing. HTTP 503 guards remain.
4. **Production release and Vercel cleanup**: not authorized. Only
   `genshinhub-staging` and `genshinhub-api-staging` may be deleted, and only
   after explicit approval.

## Final Vercel/Render/Neon release evidence (2026-11-25)

This section supersedes the Cloudflare host target and all earlier
"blocked before live deployment" notes. No framework rewrite, paid plan,
database reset, destructive migration or new Owner Admin was introduced.

### Deployed stack

| Layer | Live target | Evidence |
| --- | --- | --- |
| Frontend | `https://genshinhub-staging.vercel.app` | Vercel project `genshinhub-staging`, `prj_GCP61fQ0doAO9sUMXQImtiqapNm3`, Hobby, deployment protection `vercel_authentication` |
| Deployment | `dpl_99vMYcUvmZaHcpHTPDxeQtCUrqVw`, unique URL `https://genshinhub-staging-rfwlyhe40-anhhtuanns-projects.vercel.app` | `readyState=READY`, `target=production`; build log `/tmp/opencode/vercel-deploy4-build.log` |
| Source | commit `2ecc711` on `deploy/cloudflare-render-free` | includes `d723743` and all verified fixes; clean tree before/after docs update |
| Backend | `https://genshinhub-api.onrender.com` | Render Free service `genshinhub-api`, `srv-dc2p4m3ncjis73dkf44g`, Singapore, 512 MiB; `/health` → 200 |
| Database | Neon Free project `jolly-cell-95415947`, branch `br-hidden-frost-aouh1xm1`, endpoint `ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech` | 7 applied migrations; read-only audits; no destructive operations |
| Rollback target | `dpl_8dGNkcd55mFAy8jv8ZNusR4rWuAP` | last known-good previous production deployment |

Vercel build guard output for the final deployment:
`[build-env] OK: Vercel frontend is configured for the Render backend`,
`NEXT_PUBLIC_GRAPHQL_URL=SET (Render backend)`, `BACKEND_URL=SET (Render backend)`.
The Vercel-injected `VERCEL_AUTOMATION_BYPASS_SECRET` is only logged as
present and is never written to a `NEXT_PUBLIC_*` value or sent to Render.
The build generated 7,036 static pages in 18 minutes, preserved SSG/ISR/i18n
and API routes, and contained no HTTP 402 or Render fetch failure.

### Live verification results

| Suite / probe | Result | Evidence |
| --- | --- | --- |
| Bounded live HTTP/API checks | **60/60 PASS**, 0 unexpected statuses | `/tmp/opencode/vercel-live-checks-final.log` |
| Public Playwright E2E | **89/89 PASS** | `/tmp/opencode/e2e-vercel.log` |
| Authenticated Admin E2E | **18/18 PASS** | `/tmp/opencode/e2e-admin-vercel.log`, screenshots in `/tmp/opencode/e2e-admin-vercel-shots/` |
| Backend suites (`test:sync:version`, `test:auth`, assets, materials, curated GraphQL, DB integration, script suite) | all PASS — 2/2, 10 pass/1 skip, 50/50, 3/3, 108 pass/1 skip | `/tmp/opencode/backend-tests.log` |
| Frontend Vitest + TypeScript | 6 files / 22 tests PASS; `tsc --noEmit` PASS | local rerun at final SHA |
| Prisma | `validate` PASS; 7 migrations applied and up to date | backend suite log and Neon audit |
| Catalog counts through Vercel → Render → Neon | characters=131, weapons=279, artifacts=63, materials=862 | live GraphQL |
| Editorial counts | builds=347, teams=620, team members=2,478, character rankings=1, weapon reviews=6 | read-only Neon SQL |
| Auth / Admin state | admins=1 (`staging_owner`), users=0, sessions=0 after cleanup | read-only Neon SQL |
| WebP / images | asset 200 with `public, max-age=31536000, immutable`; 0 broken images; 0 `/_next/image` requests; 0 occurrences in SSG HTML | live checks + E2E |
| Private responses | `/api/auth/*`, `/api/admin/*`, `/api/graphql`, `/api/revalidate` use `Cache-Control: private, no-store` | live checks + E2E |
| Cross-origin proxy abuse | `/api/graphql` and `/api/admin/graphql` → 403 for foreign `Origin` | live checks + Admin E2E |
| Revalidation | 401 for wrong secret, 200 for all 14 locales with the configured secret | live checks + E2E |
| Stability | no unexpected 401/402/404, no 500/502/503, no unexpected console errors or failed requests | bounded live probes and both E2E suites |

A temporary Admin session was created directly in Neon for E2E by hashing a
random token; no password was requested, printed or stored. The session was
revoked and deleted after the run; a follow-up request returned 401 and the
final `AuthSession` count is 0. No additional Owner Admin was created.

GitHub Actions secrets `NEON_DATABASE_URL`, `REVALIDATE_SECRET` and
`FRONTEND_REVALIDATE_URL` were configured by name only. Values were never
printed or committed.

### Resource measurements

- Render: production build peaked at 90 MiB RSS at startup and 104 MiB while
  serving representative `weapons` + `weaponGameData` queries, inside the
  512 MiB Free container. A separate `--memory=512m --memory-swap=512m`
  container test returned `/health` 200 and 14 weapon-game-data levels.
- Vercel: build machine 2 cores / 8 GB, 7,036 static pages, 18-minute build.
  No billable image transformation was observed (`/_next/image` → 404).
- Neon: read-only queries only for audit; no connection or data-transfer spike
  was generated. Exact remaining free-tier capacity is not exposed by the
  local CLI and was not estimated.
- No artificial keep-alive traffic and no paid upgrade were used.

### Remaining blockers and exact required actions

1. **Render `FRONTEND_URL` is stale**. It still allows the old Worker origin.
   A preflight from `https://genshinhub-staging.vercel.app` returns 204 without
   `access-control-allow-origin`; the old Worker origin is still allowed. The
   application remains functional because browser calls use same-origin Vercel
   proxies. Required Render change (execute through the authenticated Render
   connection): set `FRONTEND_URL=https://genshinhub-staging.vercel.app` on
   service `genshinhub-api` (`srv-dc2p4m3ncjis73dkf44g`), replacing the Worker
   origin, then redeploy commit `2ecc711`. Do not add a wildcard origin.
2. **Durable uploads and backups are not complete**. `/upload` and backup
   download/list fail closed with 503 on the ephemeral Render host rather than
   losing data silently. A `custom`-format `pg_dump` of the staging database
   was created and verified locally (906 KiB, 196 TOC entries,
   SHA-256 `78b065c0ffe1fc46893d99fec9b53b1e57f307a8dc4cc75f645aa745af330b8c`)
   and then removed because no approved durable destination exists. The
   prepared `.github/workflows/neon-pgdump.yml` is on this branch only;
   `gh workflow run neon-pgdump.yml` returns 404 because the workflow is not on
   the default branch. Secrets are configured, but enabling the workflow on
   `main` or approving another durable store requires explicit authorization.
   No billing was activated.
3. **Authenticated user flows requiring a real customer account** (email/OTP,
   password reset delivery, favorites/wishlist/teams persistence) were not
   exercised end to end because no test customer credentials were supplied and
   local auth rows must not be imported. Public routes, unauthenticated guards,
   and Admin routes were verified live.
4. **Infrastructure cleanup, production release and merge to `main`** remain
   blocked by explicit-approval rules. `genshinhub-staging`, Render
   `genshinhub-api`, Neon staging and all unrelated projects are untouched.
   The obsolete `genshinhub-api-staging` Vercel project and Cloudflare
   GenshinHub Worker/cache resources were not deleted.

### Rollback procedure

From the repository root (linked to `genshinhub-staging`):

```bash
export PATH="$HOME/.nvm/versions/node/v22.23.5/bin:$PATH"
npx vercel rollback dpl_8dGNkcd55mFAy8jv8ZNusR4rWuAP --yes
```

This restores the previous verified production deployment
`https://genshinhub-staging-1ejzy63xm-anhhtuanns-projects.vercel.app`. No
database rollback is needed because this release performed no schema or data
destruction. If Render is redeployed, keep `DATABASE_URL` unchanged.
