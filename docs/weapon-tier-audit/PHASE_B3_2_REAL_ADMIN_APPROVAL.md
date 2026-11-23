# Phase B3.2 — Real Admin Approval Workflow

> Status: **workflow implemented and tested — no real Admin decision exists yet; nothing imported.**
>
> Freeze verified: `ok = true`, `issues = []`, batch SHA-256
> `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`,
> manifest SHA-256 `30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a`.
> No frozen ranking, tier, explanation, assumption or checksum was changed.

## 1. Workflow implemented

A real, persistent Admin review workflow now exists in the existing Admin Dashboard and GraphQL API. It replaces JSON editing and fake approvals with explicit, auditable Admin actions.

**Backend** — new module `backend/src/graphql/modules/weaponTierReview/`:

- `adminWeaponTierReviewQueue`, `adminWeaponTierReview(candidateId)`, `adminWeaponTierReviewAudit(candidateId, limit)` queries.
- `adminDecideWeaponTierReview(...)` — accepts only `APPROVE`, `REQUEST_CHANGES`, `REJECT` (never `PENDING`, never auto-selected).
- `adminVerifyWeaponTierReviewRights(...)` — separate publish-rights confirmation with five grounds and a note.
- `adminConfirmWeaponTierChange(...)` — separate re-review confirmation for tier changes.
- New additive Prisma models `WeaponTierReview`, `WeaponTierReviewAudit` and enum `WeaponTierDecision`, applied by migration `20261120160000_add_weapon_tier_review_workflow` (schema only; creates **no** ranking row).
- Every API call re-runs the authoritative `freeze.verify()` from `freeze.cjs`, recomputing file, per-record and batch hashes before exposing or mutating state. Group B is derived from the checksum-verified dossier, not from the derived review-sheet grouping.

**Frontend** — `frontend/app/[locale]/admin/weapon-tier-review/page.tsx`, linked from the Admin sidebar as **Weapon Review**. It shows every required field (weapon ID/name, type, role, refinement, proposed/previous tier, assumptions, exact game facts, explanation, evidence, confidence, approval and batch checksum, rights status, decision, blocked reason, import eligibility) and exposes three explicit decision buttons, rights verification, tier confirmation, evidence acknowledgement/supplement and audit history. It uses the existing `fetchGraphQLAdmin` → `/api/admin/graphql` HttpOnly-cookie proxy; the admin password never reaches the browser.

No ranking row is created or edited by any review mutation. Import remains a separate, explicitly gated step.

## 2. 13 candidates pending

All 14 frozen candidates are exposed; 13 are Group A (`READY_FOR_ADMIN_REVIEW`) and individually reviewable. In the untouched dossier all 14 decisions remain `PENDING`; through the live workflow, a fresh queue returns `decision = PENDING` and `importEligible = false` for every candidate. The importer, when it reads the empty authoritative DB review queue, reports **14 blocked / 0 eligible / writeCount 0**. Nothing was approved by automation.

## 3. Favonius blocked

Favonius Greatsword `12401` (`independent-12401-SUB_DPS-R1`) is Group B / `NEEDS_MORE_EVIDENCE` with draft recommendation `REQUEST_CHANGES`. Its `APPROVE` path is blocked until **all six** missing fields are supplied with a server-derived actor and timestamp: `critRateAssumptions`, `passiveProcConditions`, `rotation`, `fieldTimeRequirements`, `energyGenerationAssumptions`, `rubricJustification`. Tests confirm that a one-field supplement is rejected (`GROUP_B_EVIDENCE_INCOMPLETE`) and that only a complete supplement permits `APPROVE`. The importer independently re-checks the same six fields plus `supplementedBy`/`supplementedAt`.

## 4. Two tier changes

The two tier re-reviews remain explicitly gated:

| Weapon | ID | Change |
|---|---|---|
| Thrilling Tales of Dragon Slayers | `14302` | SS → S |
| The Widsith | `14402` | S → A |

`adminConfirmWeaponTierChange` must be called separately for each; `APPROVE` is rejected with `TIER_CHANGE_NOT_CONFIRMED` until then. The importer treats a tier-changed row as ineligible unless the persisted `tierChangeConfirmed` is true. No other candidate is a tier change.

## 5. Rights workflow

All 14 frozen records carry `publishRightsVerified = false`. The **only** way to set the review-level rights flag is `adminVerifyWeaponTierReviewRights`, which requires five separately asserted grounds (`independentRanking`, `originalExplanation`, `noGenshinBuildsEditorialCopy`, `gameFactsAttributionCorrect`, `evidenceValid`) plus a note, and stores `rightsVerifiedBy`, `rightsVerifiedAt` and the full `rightsBasis` (including `recordSha256` and `batchSha256`). `APPROVE` is rejected with `RIGHTS_NOT_VERIFIED` until this is done. The importer re-validates the stored grounds, verifier, note and checksum binding (`RIGHTS_BASIS_INCOMPLETE` / `RIGHTS_BASIS_CHECKSUM_MISMATCH`) and carries the basis into `rightsNote` — it never flips the flag on its own.

## 6. Auth / audit actor

Authorization and identity are always derived from the verified backend auth context (`x-admin-key` checked against `ADMIN_PASSWORD`, or the Admin JWT cookie through the frontend proxy). The service uses the existing `requireAdminActor` helper, which refuses unauthenticated contexts and fake literals such as `admin`, `admin-key`, `system`, `automation`, `test`. With only a shared `ADMIN_PASSWORD` and no `ADMIN_ACTOR_ID`, the recorded identity is the verifiable Admin principal `admin-<sha256(key).slice(0,12)>`, **not** a fabricated person. Client-supplied actor fields are ignored (`toDecisionRecord` tests prove an injected `adminActor`/`actor`/`bypassAuth` is dropped).

Every mutation writes a server timestamp (`new Date()`) and a server-side audit row (`WeaponTierReviewAudit`: `REVIEW_CREATED`, `EVIDENCE_SUPPLEMENTED`, `DECISION_RECORDED`, `DECISION_CHANGED`, `RIGHTS_VERIFIED`, `TIER_CHANGE_CONFIRMED`). `expectedVersion` is enforced with `updateMany(... where: { id, version })`; stale versions fail with `CONCURRENT_MODIFICATION`, and a second Admin cannot overwrite another's decision (`ADMIN_CONFLICT`).

## 7. Partial import test

The importer `backend/scripts/weapon-tier-independent/import-approved.cjs` now reads the **authoritative DB-backed review queue** via `adminWeaponTierReviewQueue` using a real Admin key (required even for dry run); the JSON decision template is no longer read. It keeps all guards: freeze + decision-sheet verification, per-record and batch checksum binding, Admin decision, rights grounds, tier re-review, development-DB check, `pg_dump` backup, dry-run by default, `--only` / `--weapon-ids` subset selection, five classification counts, post-import public/admin GraphQL verification. It never creates review approvals and only maps `derivation: INDEPENDENT`, excluding `SOURCE_DERIVED`.

`scripts/weapon-tier-independent/import-b32.test.cjs` proves: all-PENDING DB queue → 14 blocked / 0 writes; fully decided queue → 14 eligible; `--only <candidate>` → 1 eligible, 13 skipped, `writeCount 1`; incomplete/mismatched rights grounds block; Group B stays blocked; `REQUEST_CHANGES`/`REJECT` are skipped; no Admin key fails closed.

## 8. Tests

All suites were executed **sequentially** (17 suites, B3.1 plus B3.2):

| Suite | Result |
|---|---|
| `weaponTierRanking.test.ts` (service) | 17/17 |
| `weaponTierRanking.graphql.test.ts` | 5/5 |
| `weaponTierRanking/migration.test.ts` | 5/5 |
| `weaponTierRanking/db.integration.test.ts` | 3/3 |
| `weaponTierDataloader.test.ts` | 2/2 |
| `dataloaders/index.test.ts` | 1/1 |
| **`weaponTierReview.integration.test.ts` (new)** | **12/12** |
| `weapon-tier-audit/tier-map.test.cjs` | 4/4 |
| `weapon-tier-audit/pipeline.test.cjs` | 5/5 |
| `game-facts.test.cjs` | 5/5 |
| `independent.test.cjs` | 6/6 |
| `approval.test.cjs` | 9/9 |
| `freeze.test.cjs` | 7/7 |
| `import-guard.test.cjs` | 15/15 |
| **`import-b32.test.cjs` (new)** | **9/9** |
| `migration-integrity.test.cjs` | 4/4 |
| `admin-review.test.cjs` | 8/8 |

**Total: 117 tests executed sequentially, 117 passed, 0 failed.** The new workflow tests ran against the dedicated isolated database `genshinhub_b32_review_test_97c1` on `127.0.0.1:5434`, with a guard asserting `current_database()` equals that name and that `WeaponTierRank`/`WeaponTierAudit` are empty before and after. No test fixture was used to create a real development ranking.

`prisma validate`, `prisma migrate status` (5 migrations, schema up to date), `tsc --noEmit` and `node --check` on all B3.2 scripts pass. `freeze.cjs --verify` still reports `ok: true`, `issues: []`. Public GraphQL `weaponTierRanks` returns `[]`; an admin query without a key returns `Unauthorized: Admin access required.` No authenticated live Admin GraphQL call could be exercised because no Admin key exists in this environment; guard and actor behaviour is covered by the passing executable-schema and service tests.

## 9. Files changed

**New (B3.2):**

- `backend/prisma/migrations/20261120160000_add_weapon_tier_review_workflow/migration.sql`
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.service.ts`
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.schema.ts`
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.resolvers.ts`
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.integration.test.ts`
- `backend/scripts/weapon-tier-independent/import-b32.test.cjs`
- `frontend/app/[locale]/admin/weapon-tier-review/page.tsx`

**Modified (B3.2):**

- `backend/prisma/schema.prisma` — added the three review models/enum (no existing model or applied migration changed)
- `backend/src/graphql/index.ts` — registered the new typeDefs/resolvers
- `backend/scripts/weapon-tier-independent/import-approved.cjs` — DB-backed decision consumption and rights-basis verification
- `backend/scripts/weapon-tier-independent/import-guard.test.cjs` — migration count 4 → 5
- `backend/scripts/weapon-tier-independent/migration-integrity.test.cjs` — migration list includes the B3.2 schema
- `frontend/app/[locale]/admin/AdminLayoutClient.tsx` — added the Weapon Review sidebar link

Untouched by design: all 14 frozen rankings/tiers/explanations/checksums, `admin-review-sheet.json`, `freeze-manifest.json`, `admin-decisions.input.json`, `PHASE_B3_1_FINAL_ADMIN_REVIEW.md`, the 296 `SOURCE_DERIVED` rows, Character Tier List data, and all previously applied migrations.

## 10. Remaining user decisions

No ranking has been imported and no real approval has been cast. Before any import, an authenticated Admin must, through the new UI/GraphQL:

1. Cast one explicit decision (`APPROVE` / `REQUEST_CHANGES` / `REJECT`) for each of the 13 Group A candidates; leave `12401` as `REQUEST_CHANGES` until its six evidence fields are supplied.
2. Separately verify publishing rights for every candidate to be imported, with the five grounds and a note.
3. Separately confirm the `14302` SS → S and `14402` S → A tier changes.
4. Acknowledge gameplay evidence for each candidate (and supplement Group B).
5. Choose the optional subset via `--only` / `--weapon-ids`; all 14 are never required.
6. Only then run `--apply` with `ALLOW_DEV_IMPORT=1` and a real `ADMIN_KEY` against the development database; a backup and post-import GraphQL verification are automatic.

Live authenticated Admin GraphQL was not exercised here (no key in this environment). All other behaviour is covered by the 117 sequential tests. No commit, push, merge, deploy, production write, ranking import, reset/stash/clean, or edit to an applied migration was performed.
