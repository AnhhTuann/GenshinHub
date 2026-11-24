# Free hosting migration: Cloudflare Workers + Render + Neon

Branch: `deploy/cloudflare-render-free`. This branch contains all six completed
P1/staging commits (`85b64ba` … `9b992dd`) plus the Cloudflare/OpenNext
preparation. Portfolio and Pokédex projects are outside this migration.

## Target architecture

| Layer | Platform | Notes |
| --- | --- | --- |
| Frontend | Cloudflare Workers Free + OpenNext | Worker `genshinhub-frontend`, Static Assets from `.open-next/assets` |
| Backend | Render Free (Node.js, Apollo GraphQL, Prisma) | Blueprint `render.yaml`, service `genshinhub-api` |
| Database | Existing Neon Free | No reset, no destructive migration, no schema rewrite |
| Catalog assets | Cloudflare Static Assets | 2,350 pre-optimised WebP files, immutable cache headers |
| ISR / Data Cache | Cloudflare R2 Free | `genshinhub-frontend-opennext-cache`, no paid plan |

## Files added for the migration

- `render.yaml` — manual-deploy Render Free blueprint (`autoDeploy: false`).
- `frontend/wrangler.jsonc` — Worker, Static Assets, self-reference and R2 cache binding.
- `frontend/open-next.config.ts` — R2 incremental cache; route preloading disabled to limit cold-start CPU.
- `backend/src/utils/storageMode.ts` + guards in `backend/src/index.ts` and `backend/src/backupService.ts` — filesystem uploads/backups fail closed on stateless hosts.
- `.github/workflows/neon-pgdump.yml` — manual, free `pg_dump` to a private 7-day Actions artifact.
- `.gitignore` — excludes `.open-next/` and `.wrangler/`; build output can contain build-time environment values and must never be committed.

The earlier untracked `backend/wrangler.jsonc` was removed: it referenced a
non-existent `backend/src/worker.ts` and the backend target is Render Node.js,
not a Cloudflare Worker.

## Free-tier cost and performance decisions

- `next.config.ts` keeps `images.unoptimized: true`; every catalog image is already WebP, so no `/_next/image` transformations or Vercel-style image quota are needed.
- `frontend/public/_headers` gives `/assets/*`, `/_next/static/*` and the two root WebP files `Cache-Control: public, max-age=31536000, immutable` on Cloudflare Static Assets (Next.js `headers()` do not apply to static-asset responses). Asset filenames must change when their content changes; the sync workflow preserves versioned names.
- GraphQL reads use `next: { revalidate: 3600 }`; repeat SSR requests are served from the R2 incremental cache instead of re-querying Neon.
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

wrangler r2 bucket create genshinhub-frontend-opennext-cache
wrangler variable put BACKEND_URL https://genshinhub-api.onrender.com
wrangler variable put NEXT_PUBLIC_GRAPHQL_URL https://genshinhub-api.onrender.com/graphql
wrangler secret put REVALIDATE_SECRET   # value must match the build-time value

npx opennextjs-cloudflare build
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
- `wrangler tail genshinhub-frontend` and Render logs show no auth failures or cache-binding errors.

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
| Neon CLI (read-only) | Authenticated; `genshin-hub` project and `production` / `deploy-staging-2026-11-23` branches listed. No connection string was read or used, no branch was modified |
| `npx opennextjs-cloudflare build` | PASS against the running local backend (`http://127.0.0.1:4000`) |
| First build attempt against `https://genshinhub-api.onrender.com` | FAILED with GraphQL 404 during prerender — expected because the Render service does not exist yet |
| `npx wrangler deploy --dry-run` | PASS — 2,687 assets, 9.0 MiB Worker, R2/self-reference/assets bindings present |
| `wrangler dev --local` | `/` → 307; WebP → `Cache-Control: public, max-age=31536000, immutable`; same-origin `/api/graphql` → 200 |
| Live `https://genshinhub.onrender.com/health` and `/graphql` | 404 `x-render-routing: no-server` — no Render service is running |
| Browser E2E scripts | Not run: Playwright is not installed for Node or Python |
| Vercel project deletion | Not run and intentionally deferred: replacement is not verified |

The OpenNext artifact built here is a **verification artifact only**: its
baked endpoint is the local backend. It must be rebuilt with the verified
Render URL before any `wrangler deploy`.

## Blockers before live deployment

1. **Render access**: no API key, CLI session or dashboard session is available in this environment. The backend cannot be created, configured with `DATABASE_URL`, deployed or verified.
2. **Neon connection string for backups**: the repository only has a local `DATABASE_URL`; `NEON_DATABASE_URL` is not present as a GitHub secret.
3. **Browser E2E**: Playwright packages are absent, so the Python/Node browser suites cannot be executed locally.
4. **Vercel cleanup**: CLI auth exists, but the two GenshinHub projects must not be deleted until steps 1–3 and live checks pass. Portfolio, Pokédex and other projects are explicitly out of scope.
