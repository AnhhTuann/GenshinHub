# GenshinHub full project audit

2026-11-20 · Repository snapshot at `62bc18c` plus the active working tree

## A. Executive summary

**PARTIALLY RUNNING.** The local website and GraphQL API are live. Catalog pages backed by server-side GraphQL render successfully. Browser-side GraphQL from port 3010 fails the configured CORS check, affecting Materials. Admin login redirects work and authenticated Admin review is unavailable with the current local credentials configuration. Public character and weapon tiers are empty and the website displays DATA PENDING.

The main pre-publication blockers are character rights metadata accepted through generic input, a conditional Admin JWT configuration bypass, independent materialized weapon approval, split version handling in character review, and missing review artifacts in the default container layouts. The audit used read queries against development PostgreSQL, preserved existing rankings and source, and left the development servers running.

## B. Actual project architecture

- Next.js 15.5.19 App Router, React 19.2.7, TypeScript 5.9.3, next-intl and a GraphQL fetch wrapper under `frontend/lib/graphql/`. Server-rendered catalog pages query the backend while routes such as Materials fetch from the browser. The Admin proxy is a Next.js route.
- Express 5 and Apollo Server 5.5.1, GraphQL 16.14.1, TypeScript 6.0.3, request-scoped DataLoaders, Prisma CLI and Client 5.10.0. Modules are assembled in `backend/src/graphql/index.ts`.
- PostgreSQL 15.20 development container, with `genshin-db` 5.2.15 feeding catalog enrichment and sync. Git tracks 2,350 WebP files under `frontend/public`. Asset routes and deployment mounts also support persistent local storage.
- Separate Expo 56.0.12 / React Native 0.85.3 mobile client. The root package provides data/asset utilities. Backend, frontend and mobile have individual manifests and locks. Node used for this audit was 20.20.2.
- Deployment has backend/frontend Dockerfiles, VPS Compose and systemd paths, GitHub Actions and CircleCI. No deployment was attempted.

## C. Git working tree

Initial and pre-report inventories each showed 93 modified tracked files, one deleted tracked file, and 232 untracked files using `git status --porcelain -uall`. `git diff --stat` reported 94 paths, 6,252 additions and 4,299 removals. `git diff --check`, the staged diff and `git ls-files -u` were clean. The deleted file was `frontend/components/characters/server/CharacterOverview.tsx`. No remaining frontend source references were found. The ten-commit history starts with `62bc18c`, `dd0d5dd`, `f58453a`, `250e3ff`, and `cb515d7`. Git does not identify the author of individual uncommitted edits.

Concurrent work intersects in `backend/prisma/schema.prisma`, `backend/src/graphql/index.ts`, Admin navigation, the tier list, and generated output. Five migration directories and key workflow modules, source artifacts and tests are untracked. The checked-in dist tree contains 683 tracked files. The current dist GraphQL index omits `weaponTierReview` and `phaseD3` although the TypeScript source registers both. Untracked Python bytecode and the modified tracked frontend tsbuildinfo add noise. Source-mode runtime and no-emit checks were chosen to avoid rewriting generated files.

## D. Database integrity

Development identity was independently confirmed in a transaction with `transaction_read_only=on`: host mapping `127.0.0.1:5434`, Docker container `genshinhub-postgres`, database `genshinhub`, schema `public`, internal port 5432. The repository Compose file maps 5433, which is occupied by a different project on this machine.

| Relation | Rows |
|---|---:|
| Character | 131 |
| Weapon | 279 |
| ArtifactSet | 63 |
| Material | 862 |
| CharacterBuild | 127 |
| CharacterBuildAudit | 127 |
| CharacterTierRanking | 0 |
| WeaponTierRank / WeaponTierAudit | 0 / 0 |
| WeaponTierReview / WeaponTierReviewAudit | 0 / 0 |

All five migration SQL hashes match their recorded SHA-256. All rows are finished and none rolled back. In database started order their applied-step counts are character tier 0, weapon tier 1, legacy baseline 0, Multi-Build 0, weapon review 1. The zero-step entries and ordering are consistent with a reconciled history. Prisma status is up to date and live-to-datamodel diff reported no difference. Fresh bootstrap was outside the executed checks.

There are 16 validated FKs, 22 primary-key constraints and 75 indexes, 35 unique. The three build child tables have zero NULL build associations. The database enforces the partial unique default index. All 126 profiled characters have exactly one default, and five characters have no profile. All 127 builds have an audit row. The status split is 125 LEGACY_IMPORT and two APPROVED. Mitya owns both approved builds, C0 Off-Field Support / Sub DPS (default) and C0 On-Field Main DPS (secondary), both version 1. GraphQL independently returned both. The optional review-to-catalog relationship is a scalar in `WeaponTierReview`; the current orphan check is vacuously clean because there are no review rows.

## E. Backend and GraphQL

The live schema started and resolved character, weapon, artifact, material, character build and public tier queries. `character` and `weapon` use service methods and request-local loaders. Character build changes use a character lock inside a transaction, caller version checks, and same-transaction audit writes in `character-build-admin.ts:213`. Published profiles use APPROVED / LEGACY_IMPORT in `dataloaders/index.ts:32`; that build policy is separate from ranking publication.

Catalog list services use whole-collection reads. Tier services accept filtering and clamp limits but expose no cursor and can truncate a larger result set. Backend TypeScript passed. GraphQL startup validates integration of the registered schema in source, but production dist, mobile and every Apollo resolver branch were outside live coverage. Remaining weakness areas include broad `any` types, error masking based on message substrings in `src/index.ts`, and unstructured administrative error messages.

## F. Admin review workflows

| Stage | Implementation and behavior |
|---|---|
| Candidate UI | `frontend/app/[locale]/admin/weapon-tier-review/page.tsx` writes decisions, rights and changed-tier confirmation. Defaults to FROZEN and switches to D2_REVISED. `WeaponRankingReviewClient.tsx` reads the same D2 queue and audit and presents a second view. |
| Authorization | Browser uses `frontend/app/api/admin/graphql/route.ts`. Next verifies the Admin cookie and injects the backend key. `backend/src/index.ts` verifies the key and attaches a server-derived principal. The services use `requireAdminActor`. |
| Candidate decision | `weaponTierReview.resolvers.ts` → `weaponTierReview.service.ts:374` (`decide`). Candidate, batch and record checksum must match the selected source. Integer CAS, rights grounds, evidence acknowledgment, evidence blockers and changed-tier confirmation gate approval. D2 candidate IDs carry a separate suffix. |
| Audit and eligibility | Candidate rows live in `WeaponTierReview`, with audit events in `WeaponTierReviewAudit`. The queue returns computed `importEligible`. Writes and audit inserts are separate calls. |
| Import | `backend/scripts/weapon-tier-independent/import-approved.cjs` reads FROZEN. `backend/scripts/phaseD3/import-approved-d3.cjs` reads D2_REVISED. Both consume the DB-backed Admin queue, use staged rank write / rights / approval calls, and use local artifacts for validation. Frozen and revised actions can refer to the same eventual rank key. |
| Materialized rank | `weaponTierRanking.resolvers.ts` → `weaponTierRanking.service.ts`. Direct admin upsert, rights, approval, rejection and audit target `WeaponTierRank` / `WeaponTierAudit`, separate from candidate state. |
| Publication | `weaponTierRanks` and nested weapon ranks use APPROVED, INDEPENDENT and rights true. `frontend/app/[locale]/tierlist/page.tsx` joins ranks with live weapon IDs and renders the weapon tab. |

There are two sets of approval operations. The two Admin screens share candidate state, while materialized rank mutations operate on separate rows. Frozen and revised candidate decisions may differ by design. Rank decisions can contradict the corresponding candidate, because rank approval does not check candidate eligibility, source version, or authoritative checksum lineage. Rank approval insists on the rank’s rights flag, but direct rank verification can set that flag independently of verified candidate rights. Rank upsert preserves existing rights metadata across a content edit. Candidate mutations reject stale batch/record hashes. At rank approval, caller checksum is optional and compared with the row’s source checksum when given. Content rehash does not establish that the row is the current approved candidate revision.

A pending or rejected **rank row** is filtered from public reads. An equivalent **candidate** can still be pending or rejected while a separately approved rank is public. There are no live examples because both tables are empty. The staged import sequence can leave partial state after failure and does not perform a final atomic candidate-version check with publication.

Retain the versioned `WeaponTierReview` candidate service, the interactive `weapon-tier-review` page and `WeaponTierRank` as the publication model. Move the useful projection into that page after confirming consumers. Bind a single transactional publication operation to an eligible candidate ID, revision, checksums and version. Retire standalone rank approval/rights entry points and the overlapping import apply paths only after checking automation and isolated regressions. Preserve the review audit lineage and keep FROZEN available for historical inspection.

## G. Tier data integrity

| Artifact | Read-only verification |
|---|---|
| Character D1 sheet | 15 source rankings, nine unique in scope, six excluded, zero importable. |
| Character D2 | Nine unique dossiers, no proposed tier changes, eight reviewable and one comparative evidence blocker. |
| Weapon freeze and D1 sheet | 14 unique candidate IDs, one Group B candidate, two changed tiers requiring review, zero importable. The freeze/guard suites exercised checksum validation. |
| Weapon D2 | 14 unique revised IDs in the artifact, two evidence blockers, two tier changes pending confirmation, zero approved, zero rights verified or importable. D3 versioned preview tests exercised original and revised hashes. |

Character review currently loads `PHASE_D_CHARACTER_APPROVAL_SHEET.json` plus `PHASE_B2_RANKING_DRAFTS.json` for actionable rows. `PhaseD3PreviewPanel` shows revised dossiers read-only. A reviewer can therefore act on the old dossier while viewing the new one. Xiangling C6 is a distinct record from C0. Furina SUB_DPS and SUPPORT are distinct. Zhongli is in the revised reviewable set. Raiden C0 carries the D2 comparative evidence blocker. Bennett C0/C6 and Fischl are excluded for rubric recalibration, and Mitya is excluded for unverified gameplay assumptions. Two approved Mitya builds do not constitute a ranking.

Weapon D2 keeps 12401 blocked for additional evidence and 13501 blocked for comparative evidence. Changes 14302 SS → S and 14402 S → A require explicit confirmation. 14406 and 15508 are revised pending review. No live decisions or drafts were persisted. Tests verified negative and mocked paths, not editorial truth.

## H. Security

Admin login sets an HttpOnly, SameSite Strict cookie with production Secure and 24-hour expiry. The Admin proxy rejected anonymous GraphQL with HTTP 401. Direct backend Admin authorization requires the server key. A shared key and configured actor attribute approvals to a shared principal. Cookie verification is repeated in middleware and proxy, with no explicit issuer, audience or role validation. SameSite provides a baseline cross-site defense. The proxy does not explicitly validate Origin and the login action has no targeted attempt throttle in the inspected code.

Two priority findings are static. No authentication bypass or approval payload was sent. The Next.js fallback signing key is a source constant whenever the frontend signing secret is absent, even if the proxy has a backend key. Separately, character upsert can persist client-supplied rights and audit metadata in its JSON evidence; approval then trusts the stored rights boolean and nonempty verifier. The generic rank input is therefore not a safe source of server-only review metadata. See IDs S1 and S2 below.

## I. Frontend

Playwright loaded English home, character list, Mitya, weapon list, weapon 15514, artifact list, artifact 15044, materials, tier list and the protected weapon review route at desktop 1440px/dark and mobile 390px/light browser preferences. There was no horizontal document overflow or broken decoded image among the sampled images. The first nine returned 200, and the protected route landed at Admin login with 200 after the redirect. No hydration exception appeared in these routes. The browser confirmed both emulated color preferences. At each viewport, the weapon tab displayed DATA PENDING and Mitya’s Main DPS build could be selected. No manual theme toggle was exercised.

Materials shows its shell but its client-side request fails CORS at both sizes. Anonymous `/api/auth/me` requests account for repeated 401 resource messages. The public pending notice mentions `/admin/tier-review`, which has no page. The actual routes are `/en/admin/character-tier-review`, `/en/admin/weapon-tier-review` and `/en/admin/weapon-ranking-review`. There is a Materials list and no material detail route. The route tree also includes Teams, Banners, TCG, Showcase, Profile and account routes. These were inventoried only.

The public tier UI obtains both rank datasets with no explicit version bound, then takes the version label from the first rank. When multiple versions exist, the UI can mix them under one label. Character role and constellation filters and weapon role, type and refinement are wired. The page maps tier from approved rank rows, so no legacy tier fallback was observed there. Legacy `TierRank` is still used for ordering. Positive ranked UI coverage requires isolated fixtures. Public empty state was verified.

## J. Local runtime

| Service | Endpoint or session | Evidence |
|---|---|---|
| Next.js frontend | http://localhost:3010/en · session 52647, PID 13977 | Started with `cd frontend && npm run dev -- --hostname 127.0.0.1 --port 3010`. Port 3000 belongs to another Dockerized app. |
| Apollo backend | http://localhost:4000/graphql · session 47748, nodemon PID 13614 | Started with `cd backend && npm run dev`. `/health` returned HTTP 200 and GraphQL catalog queries returned the expected live counts. |
| PostgreSQL | `127.0.0.1:5434/genshinhub` | Existing Docker container was already running. |

Logs are `/tmp/genshinhub-audit-backend.log`, `/tmp/genshinhub-audit-frontend.log`, `/tmp/genshinhub-audit-smoke.log`, and `/tmp/genshinhub-audit-actions.log`. Startup scripts run Next.js and ts-node/nodemon. They have no migration/seed steps. Backend health is liveness-only. No dependency changes were needed. The frontend is bound to loopback. The backend binds using Express defaults and reports missing local JWT/password settings. To correct browser connectivity in the local launch configuration, restart the backend with `FRONTEND_URL=http://localhost:3010 npm run dev` from `backend/` and use the frontend URL above. Local CORS and auth configuration were preserved for audit.

## K. Tests

| Outcome | Command or scope | Evidence |
|---|---|---|
| PASS | Backend `./node_modules/.bin/prisma validate`, `./node_modules/.bin/prisma migrate status` | Valid schema and five applied migrations. Sandbox-only status attempt could not access loopback. |
| PASS | Backend `./node_modules/.bin/prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --exit-code` | No difference. |
| PASS | Backend and frontend, separately `./node_modules/.bin/tsc --noEmit --incremental false` | Both exited 0. |
| PASS after connectivity retry | Backend `node --test --test-concurrency=1 -r ts-node/register` with `scripts/sync/check-version.test.cjs`, `scripts/weapon-tier-independent/*.test.cjs`, `scripts/phaseD3/*.test.cjs`, and explicit tier tests listed below | 16 passing file-level outcomes and three initial DB-dependent failures in the network sandbox. All three reran as 28 passing cases with DB access. |
| PASS | Backend `node --test --test-concurrency=1 scripts/weapon-tier-independent/import-b32.test.cjs scripts/weapon-tier-independent/import-guard.test.cjs scripts/weapon-tier-independent/migration-integrity.test.cjs` | 28 passing, zero failures. Read-only SQL operations with planner decisions in memory. |
| PASS | Backend `node --test --test-concurrency=1 -r ts-node/register src/graphql/dataloaders/index.test.ts src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts src/graphql/modules/characterTierRanking/phaseB25Review.test.ts src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts src/graphql/modules/weaponTierRanking/db.integration.test.ts` | 22 passing, zero failures. Read-only development checks. |
| PASS / FAIL | `node /tmp/genshinhub-audit-smoke.cjs` | 18/20 route and viewport samples met functional smoke expectations. Materials data failed twice. Guest 401s tracked separately. |
| PASS | `node /tmp/genshinhub-audit-browser-actions.cjs` | Four interaction assertions passed after adapting the temporary audit script to the installed Playwright API. |
| PASS with warnings | Frontend `npm run lint` | Exit 0. Warnings include React Hook Form compiler compatibility, unused suppressions and raw image elements. |
| BLOCKED | Authenticated Admin inspection on the running development instance | The configured development processes have no Admin password. The unauthenticated redirect and proxy denial were verified. |
| NOT RUN | Admin positive E2E, candidate mutation integration, mutation-based tier tests, bootstrap, refresh/revalidation, deployment, mobile and write-path sync | These require isolated services and a disposable fixture database, or run source-generating/output-mutating tasks. No development writes were performed. |

The explicit backend tier files in the first suite were `tierReviewSecurity.d1.test.ts`, `phaseD3/versionedReview.test.ts`, and under `characterTierRanking/` and `weaponTierRanking/` their corresponding service test, GraphQL test and `migration.test.ts`, plus `weaponTierRanking/weaponTierDataloader.test.ts`. All are under `backend/src/graphql/modules`. Logs for the three sequential test batches are `/tmp/genshinhub-audit-tests.log`, `/tmp/genshinhub-audit-db-tests.log` and `/tmp/genshinhub-audit-integration.log`. Final totals are 16 passing file-level outcomes, 50 passing backend cases measured separately, and 22 passing browser checks with two failing Materials checks. Three initial sandbox-dependent file failures passed on retry.

## L. Duplicate or cleanup candidates

1. Retire the overlapping candidate projection and duplicate importer apply loops after introducing a single publication boundary. Keep audit and reviewed-version lineage. See F.
2. Resolve legacy `TierRank` ordering and legacy catalog tier field consumers before removing their fields. Existing catalog editing and ordering consumers still matter.
3. Make releases compile TypeScript and package review artifacts. Reconsider tracking `backend/dist`, `frontend/tsconfig.tsbuildinfo` and Python bytecode after confirming VPS and CI entry points.
4. Replace fixed migration-count and zero-rank assumptions in regression suites with isolated fixture expectations. Keep migration checksum coverage.
5. Review frontend `sync:assets` (`scripts/sync-new-assets.js` absent), Next lint deprecation, and codegen freshness. Generated schema was not rewritten. Duplicate reports with dated migration assumptions should link to a single runbook after reconciling evidence.
6. Check dependency usage and dead exports with release builds in an isolated copy before removal. Manifest-level inspection alone does not establish that a dependency is unused.

## M. Prioritized findings

| ID / severity | Evidence and path | Impact | Recommended fix and dependencies |
|---|---|---|---|
| S1 / P0 conditional | `frontend/lib/adminAuth.ts:6`, `frontend/middleware.ts:6`, `frontend/app/api/admin/graphql/route.ts:17`, upload route also uses the fallback. Next verifies with a predictable signing key when its secret is absent. | If the frontend proxy has the real shared backend key, misconfiguration can permit unauthorized Admin actions. Current local Admin key is absent; deployed configuration was outside scope. | Fail closed for missing signing config, apply one verifier with claims and explicit algorithm, validate frontend release configuration as well as backend. |
| S2 / P0 workflow bypass | `backend/src/graphql/modules/characterTierRanking/characterTierRanking.service.ts:202` persists incoming evidence with review fields. `assertApprovable` around 275 trusts rights fields from that JSON, and checksum projection deliberately excludes those fields. | A caller with authenticated generic Admin write access can bypass the separate rights verification step or supply fabricated audit history. | Strip server-owned metadata at the boundary and persist rights and audit from trusted state bound to the reviewed hash. Test forgery and missing rights in isolation. |
| W1 / P1 | `weaponTierRanking.service.ts:212–285,334–353` implements direct rights/approval without candidate linkage and carries existing rights through content updates. Both importers use separate upsert, rights and approval requests. | Candidate and public rank can diverge. A content edit can inherit rights and a retry can encounter partial state. | Bind publication and audit to the candidate and version in one transaction. Depends on lineage data, one canonical version policy and dealing with any legal already-published records. |
| W2 / P1 | `weaponTierReview.service.ts:220–254,423–433` and `weaponTierRanking.service.ts:243–284` persist state before audit. | Audit failure or interleaving can leave persisted decisions without matching history. | Make writes and audit atomic. Test failure and concurrency on disposable PostgreSQL. |
| C1 / P1 | `frontend/app/[locale]/admin/character-tier-review/page.tsx` loads D1/B2 for actions and D2 in an adjacent read-only panel. Expected checksum/time are optional in the ranking mutation service. | Active review can accept older evidence. Optional tokens reduce protection against stale reviewer intent. | Make version/hash mandatory for review and use one pinned read/write source for each character revision. |
| D1 / P1 | `backend/dist/src/graphql/index.js` lacks candidate review and D3 wiring. Backend Dockerfile copies backend artifacts; frontend standalone Dockerfile copies app output/assets. Both review implementations resolve root docs (source paths around `versionedReview.ts:141` and `weaponTierReview.sources.ts:77`). | Source dev can pass while an image or VPS built from stale dist or missing JSON fails Admin review. | Generate dist for releases, explicitly package required artifacts, test immutable image end to end. Depends on selecting build context and capturing untracked canonical inputs. |
| R1 / P1 | `backend/src/index.ts` CORS allowlist uses one `FRONTEND_URL`, and `frontend/app/[locale]/materials/page.tsx` issues browser-side GraphQL. Loopback preflight for :3010 lacks the allow-origin header. | Materials data fails in the running local application and other direct browser requests can be affected. | Align launch origin with the chosen port. Prove browser requests and preflight in development configuration. |
| T1 / P1 before multi-version import | `frontend/app/[locale]/tierlist/page.tsx:37` does not scope rank queries by version. `TierListClient.tsx:172` derives a single label from the first row. | Future independently approved versions can be mixed, mislabeled or truncated. | Explicitly select a version and test multi-version datasets. Preserve refinement and constellation semantics. |
| Q1 / P2 | `.github/workflows/ci.yml` has a limited test lane. DB suites hardcode an empty-rank snapshot and, in `migration-integrity.test.cjs`, exact migration names. | CI can miss workflow regressions and fixtures age as valid data is published. | Build one isolated review test lane with separate backend/frontend ports and safe fixture config. |
| U1 / P2 | `TierListClient.tsx:51,87` displays nonexistent review URL. Public guest session probe produces 401 console noise. | Misleading operator guidance and harder console triage. | Update guidance to actual protected routes and make anonymous session behavior intentional. |
| G1 / P2 | Untracked migrations and workflow artifacts, tracked dist and tsbuildinfo. | Partial commits and review ambiguity. | Inventory intended files together and enforce generated-file policy after consumer check. |
| B1 / OK | DB checks, C1 regression and Mitya selector smoke. | The two existing approved builds coexist and exactly one is default. | Preserve the migration and relationship constraints. |
| T2 / OK | Public filters in both ranking services and weapon DataLoader, plus live empty queries. | No private ranking data was observed in the public tier experience. | Retain these filters and add positive isolated coverage before real publication. |

## N. Recommended execution plan

1. **Must fix now.** Close both P0 paths. Align local CORS origin when ready to change launch config. Make release packaging deterministic and validate Admin artifact availability.
2. **Before real ranking import.** Adopt one candidate-to-publication boundary, require reviewed versions and checksums, reset rights on substantive content changes, and make publication and audit atomic. Make revised character dossiers actionable through the same versioned path. Pin public tier queries to the intended game version. Run isolated Admin, concurrent update, positive publish, rejection and retry tests.
3. **Can fix later.** Remove superseded review surfaces and legacy ordering consumers once usage is proven. Improve test fixtures, generated-file policy, pagination, guest console noise and pending copy.
4. **Already verified.** Five local migration hashes and schema alignment, live catalog counts, Mitya’s two builds and default constraint, empty ranking tables and public DATA PENDING. Reuse these checks for regression coverage.
