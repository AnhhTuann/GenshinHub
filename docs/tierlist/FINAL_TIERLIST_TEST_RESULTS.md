# Final Tier List Test Results

**Package SHA-256:** `de34074fe3eb7494737f4ed8a3bb5ef652cba9c39875165a5d0eadbf1b9e11c5`
**Eligible publication candidates: 0**

Codes below are process exit codes (`0` = pass). Raw logs are under `/tmp/opencode/tier-tests/`.

## 1. Static checks and reconciliation

| Check | Code | Evidence |
|---|---:|---|
| Deterministic reconciliation harness | 0 | `reconcile-final.log`; 23/23 checksums, artifact checksums, lineage, targets, roles/tiers/conditions; `issues: []` |
| Frozen-source verification | 0 | `freeze.log` |
| Prisma validate | 0 | `prisma-validate-final.log` |
| Prisma migrate status | 0 | `prisma-migrate-final.log` (no new/pending migration required) |
| Backend TypeScript | 0 | `backend-tsc-final.log` |
| Frontend TypeScript | 0 | `frontend-tsc-after-ui.log`, `frontend-tsc-after-charfix.log` |
| Reconciliation after all edits | 0 | `reconcile-final.log` |

## 2. Selected existing test scripts (14/14 passed)

`asset.test.ts`, `materialBackfill.test.ts`, `index.test.ts`, `characterTierRanking.graphql.test.ts`, `characterTierRanking.test.ts`, `migration.test.ts`, `phaseB25Review.test.ts`, `phaseB2Draft.test.ts`, `phaseC1Smoke.test.ts`, `db.integration.test.ts`, `migration.test.ts`, `weaponTierDataloader.test.ts`, `weaponTierRanking.graphql.test.ts`, `weaponTierRanking.test.ts` — all exit 0 (logs `ts-*.test.log`).

## 3. Isolated PostgreSQL lifecycle (all disposable DBs created and dropped)

| Step | Code |
|---|---:|
| Create 3 isolated databases (`...weapon_review`, `...weapon_publication`, `...tier_extra`) | 0 ×3 |
| `prisma migrate deploy` on each | 0 ×3 |
| `weaponTierReview.integration.test.ts` (review, rights, tier, decision, audit guards) | 0 |
| `weaponPublication.integration.test.ts` (publication, concurrency, invisibility) | 0 |
| Character + Weapon lifecycle and public GraphQL projection harness (24 checks) | 0 |
| Drop all 3 isolated databases | 0 ×3 |

The lifecycle harness verified: anonymous Admin access denied; fake actor rejected; pending/source-derived/evidence-blocked rows absent from public queries; rights proof hidden from public output; checksum/staleness/rights guards reject; `APPROVED + INDEPENDENT` 7.2 row visible with exact filters; immutable approved row; Weapon projection filters (weapon/role/tier/refinement/version) and hidden pending/rejected/blocked rows; cross-database identity assertions.

## 4. Browser verification

| Suite | Result |
|---|---|
| Public Tier List — desktop/mobile × light/dark × en/vi | 51/51 checks |
| Anonymous deep-link redirect to Admin login | 3/3 checks |
| Admin review UX — desktop/mobile × light/dark (weapon + character) | 40/40 checks (`admin-regression.json`) |
| Character review crash regression (post-fix) | no error boundary; records and evidence rendered |

Existing `run-phase-d3-positive-e2e.py`: 32 PASS / 1 FAIL. The single failure is a harness defect, not a product defect: the script builds its name map with `nameVi` (always preferred) but asserts against the English `/en/tierlist` page, which correctly renders `nameEn` (`TierWeaponCard.tsx:17`). All authoritative checks in that suite passed, including browser review, rights/tier decisions, import guards, audit trail, DB rows, public GraphQL visibility, and the post-condition. It was left unchanged (test-harness scope only).

## 5. Triage of non-Tier and superseded failures

- `db-before` / `db-after` (code 1): original probe serialized `BigInt` and threw. Superseded by `db-probe-final` (code 0). Final dev DB counts: `character=131`, `weapon=279`, `artifactSet=63`, `characterBuild=219`, `characterBuildAudit=319`, `characterTierRanking=0`, `weaponTierRank=0`, `weaponTierReview=0`, `weaponTierReviewAudit=0`, `weaponTierAudit=0`, `tierRank=0`. No Tier writes occurred; counts match the pre-review baseline.
- `catalog-a01.test.cjs` / `catalog-final-review.test.cjs` (code 1 even with `BUILD_AUDIT_INVENTORY` set): these are build-audit (Character Build) tests pinned to a frozen historical inventory snapshot. The current dev inventory has advanced past that snapshot (baseline version 3 versus expected 1; `ADMIN_MANAGED_HISTORY` versus `BASELINE_CHANGED`) after the already-authorized final build import. The failures are the tests' intended baseline-drift detection, not Tier regressions, and were not modified.
- `/api/auth/me` 401 console entries during Admin browser checks are the expected anonymous end-user auth probe, unrelated to the HttpOnly `admin_token` Admin session; Admin data and mutations worked throughout.

## 6. Release packaging

All eight source artifacts are present, checksum-bound in `FINAL_TIERLIST_REVIEW_MANIFEST.json`, and re-verified after every edit. The manifest is immutable: SHA-256 `de34074fe3eb7494737f4ed8a3bb5ef652cba9c39875165a5d0eadbf1b9e11c5`. No production writes, commits, pushes, deploys, destructive migrations, resets, stashes, or cleans were performed.
