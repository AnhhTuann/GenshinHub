# Phase D1 — Admin Review & Approved-Only Tier List Integration

**Date:** 2026-11-20  
**Status:** Implementation + verification complete. **No ranking has been approved.** All source decisions remain `PENDING`; publish-rights flags remain `false`; development database contains **zero** ranking rows.

---

## 1. Objective & scope

Phase D1 adds (a) a per-ranking Admin review UI for Character and Weapon tier rankings, (b) real approved-only GraphQL binding on the existing public Tier List pages, and (c) a guarded, dry-run-by-default review-preparation workflow fed by the frozen Phase B2/B3 dossiers.

Out of scope / untouched: Prisma migrations, Multi-Build, Character/Weapon Detail pages, existing Tier List visual design, the concurrent `backend/src/graphql/modules/weaponTierReview/` module, and all pre-existing uncommitted work. No tier value was changed to make the UI look populated.

---

## 2. Admin review UI

Two new authenticated Admin routes (both gated by the existing `admin_token` HttpOnly cookie middleware):

| Route | Dossier | Contents |
|---|---|---|
| `/admin/character-tier-review` | `PHASE_D_CHARACTER_APPROVAL_SHEET.json` + `PHASE_B2_RANKING_DRAFTS.json` | 9 `READY_FOR_ADMIN_REVIEW` rows + 6 excluded rows shown separately |
| `/admin/weapon-ranking-review` | `PHASE_D_WEAPON_APPROVAL_SHEET.json` + `independent-candidates.json` | 13 Group-A reviewable rows + 1 blocked row + 2 tier-change re-review notices |

Every row surfaces: draft/record ID, character/weapon name + ID, role, constellation or refinement, proposed tier, old tier → new tier diff, Vietnamese explanation, evidence corpus (`primaryEvidence`, `rubricScores`, `exactFacts`, `criteria`, `limitations`), gameplay assumptions, confidence, source name/URL/derivation, frozen checksum, rights status, expandable audit trail, and explicit `APPROVE` / `REQUEST_CHANGES` / `REJECT` controls. No actor input is rendered — the actor is derived server-side from the verified Admin session. `APPROVE` is disabled until rights are explicitly verified; tier-change rows additionally require an explicit "xác nhận đánh giá lại đổi bậc" checkbox.

Shared helper `tierReviewSecurity.ts` supplies `requireAdminActor`, stable canonical SHA-256, and content checksums that strip audit/rights metadata.

---

## 3. Character GraphQL integration (public)

`GET_CHARACTER_TIER_RANKINGS` (`frontend/lib/graphql/queries/tierReview.ts`) is fetched in `frontend/app/[locale]/tierlist/page.tsx`. The backend public resolver hard-filters `approvalStatus = APPROVED` **and** `derivation = INDEPENDENT`. Server rows are enriched with character metadata by ID; rows whose parent character is missing are dropped. There is **no** `Character.tier`, rarity, or Base-ATK fallback.

`TierListClient.tsx` now renders only approved rows:
- one character may produce multiple rows (per role and C0/C6) — `rankingId` is used as React key while `id` stays the character ID, preserving detail links (`/characters/{id}`);
- role, constellation (All/C0/C6), element, rarity, and search filters operate on ranking rows;
- explanation is shown in the card detail/tooltip and game version in the header;
- when no approved rows exist, a single honest `DATA PENDING` notice reports the entity count and states that no tier is fabricated.

SDL addition: `CharacterTierRanking.createdAt` / `updatedAt` are exposed as `String` so the Admin UI can pass `updatedAt` as the optimistic-concurrency token. The service converts the `lastReviewedDate` string to a Prisma `DateTime` before create/update.

---

## 4. Weapon GraphQL integration (public)

`GET_WEAPON_TIER_RANKS` is fetched alongside the character query. The backend public resolver and DataLoader hard-filter `APPROVED` + `INDEPENDENT` + `publishRightsVerified = true`. Rows are enriched by weapon ID; weapon type, role (MAIN_DPS/SUB_DPS/SUPPORT), refinement context R1–R5, tier, explanation, confidence and game version are preserved; detail links go to `/weapons/{id}`. A `visibility` notice and refinement dropdown were added. Empty state is honest when no approved rows exist.

The Admin weapon page uses the hardened `weaponTierRanking` workflow (`upsertWeaponTierRank`, `verifyWeaponTierRights`, `approveWeaponTierRank`, `requestChangesWeaponTierRank`, `rejectWeaponTierRank`, audit query). The concurrent `weaponTierReview` module is neither imported nor modified.

---

## 5. Security validation

| Control | Evidence |
|---|---|
| Real Admin session only | Unauthenticated `/admin/*` → 307 redirect to `/admin/login` (E2E, both viewports). Admin GraphQL proxy verifies HttpOnly `admin_token` and forwards `x-admin-key` from server env. |
| Actor from auth context, never JSON | `requireAdminActor` accepts only `context.adminActor`/`user.id` from verified context; rejects `admin`, `admin-key`, `system`, `automation`, empty, and non-admin contexts (`ADMIN_ACTOR_REQUIRED` / `Unauthorized`). `backend/src/index.ts` derives `adminActor` from `ADMIN_ACTOR_ID` or a hash of the verified admin key — never a literal key name. |
| No auth bypass | Public users calling admin list/upsert are rejected in DB integration test. No client mutation sends an actor field. |
| Checksum before approval | Upsert stores content checksum + frozen artifact SHA; approval recomputes and compares (`CHECKSUM_MISMATCH`). Post-review content drift → `CONTENT_CHANGED_AFTER_REVIEW`. |
| Block content changes after review | `APPROVED_RANKING_IMMUTABLE`, `SOURCE_DERIVED_DERIVATION_IMMUTABLE`, `REVIEWED_RANKING_IMMUTABLE` + required `resubmitReason`/CAS. |
| SOURCE_DERIVED / publish conditions | `SOURCE_DERIVED_CANNOT_BE_APPROVED` and `RIGHTS_NOT_VERIFIED` / `PUBLISH_RIGHTS_NOT_VERIFIED` block approval. `publishRightsVerified` is not client-settable on weapon upsert. |
| Audit log | Character audit stored in `evidence.auditLog` via `appendCharacterAudit`; weapon audit in `WeaponTierAudit`. Both queryable by Admin only. |
| Optimistic concurrency | All decision mutations accept `expectedUpdatedAt`; stale token → `CONCURRENT_MODIFICATION`. |
| Test isolation | All writes target `genshinhub_d1_tier_test` after `current_database()` assertion; dev DB verified 0 ranking rows and unchanged migration set. |

---

## 6. Approval workflow & guarded preparation

`backend/scripts/phaseD1/review-preparation.ts` reads only frozen dossiers:
- **Default = DRY RUN**, prints per-record classification, zero network/DB writes.
- `--apply` requires `ALLOW_TEST_DB_IMPORT=1` **and** `current_database() = genshinhub_d1_tier_test` **and** 4 expected migrations.
- Only `PENDING_REVIEW` drafts are created (character derivation `INDEPENDENT`, weapon rights flag omitted/false). It never approves, rejects, or verifies rights.

Verification run: dry-run classified **22 records to prepare** (9 character + 13 weapon) and **8 skipped** (6 character excluded + 1 weapon blocked + 1 duplicate blocked marker). Apply wrote 22 PENDING rows (verified `0` approved, `0` rights-verified), then all were deleted to restore the pristine test DB (`0|0|0`). No write touched development.

Final decisions remain a human action in the Admin UI: rights verification → approve/request-changes/reject, one ranking at a time, with reason and CAS token. `REQUEST_CHANGES` maps to the existing `NEEDS_REVIEW` enum (no new migration).

---

## 7. PostgreSQL test results

Isolated DB identity: `genshinhub_d1_tier_test | Character=131 | Weapon=279 | CharacterTierRanking=0 | WeaponTierRank=0 | migrations=4` (verified before and after).

`backend/scripts/phaseD1/d1-db-integration.ts` (hard-pinned test DB, cleanup in `finally`):
- `D1_DB_INTEGRATION_PASS characterRows=3 weaponRows=1`
- `D1_DB_CLEANUP characterRows=0 weaponRows=0`
- Covered: admin/public authorization, independent character draft, pending invisible publicly, rights guard, checksum mismatch, stale CAS, happy-path approval + public visibility, role/constellation filters, approved immutability, audit log, `SOURCE_DERIVED` exclusion, `REQUEST_CHANGES` + `REJECT`, weapon client-rights-flag rejection, weapon rights/checksum/CAS guards, weapon type/refinement filters, empty state.

---

## 8. Frontend verification

Playwright (Python venv at `/tmp/opencode/playwright-venv`, Chrome `/usr/bin/google-chrome-stable`), frontend dev server on `127.0.0.1:3100`:

**`E2E_PASS=54/54`** across desktop 1440×900 and mobile 390×844. Checks: public `vi`/`en` tierlist honest pending notice; no legacy "development PostgreSQL" source text; no fabricated Favonius/Thrilling Tales/Widsith/character cards; unauthenticated Admin redirect to login; authenticated Admin review pages render 9 ready / 6 excluded, 13 reviewable / 1 blocked, `SS → S` and `S → A` highlights, checksum display, and no actor inputs. Screenshots + machine results: `docs/tierlist/e2e/`.

TypeScript: `frontend npx tsc --noEmit` clean; `backend npx tsc --noEmit` clean. Frontend `npm run lint`: no findings in Phase D1 files (only pre-existing warnings in unrelated `materials`, `weapons`, `profile`, `Navbar`). Backend ESLint remains a tooling gap (no config) — reported, not invented. `git diff --check`: clean.

---

## 9. Counts & decisions

| Metric | Value |
|---|---|
| Real APPROVED rankings (public) | **0** |
| Pending Admin decisions (character) | 9 ready + 6 excluded (15 source drafts) |
| Pending Admin decisions (weapon) | 13 reviewable + 1 blocked (14 candidates) |
| Tier changes awaiting explicit re-review | 2 — Thrilling Tales `SS → S` (`independent-14302-SUPPORT-R5`), The Widsith `S → A` (`independent-14402-SUB_DPS-R1`) |
| Blocked weapon | 1 — Favonius Greatsword (`independent-12401-SUB_DPS-R1`, `NEEDS_MORE_EVIDENCE`) |
| Rights flags verified | 0 (all `false`) |
| Backend tests passed | **51/51** (incl. 4 new D1 security tests) |
| DB integration | PASS (3 char + 1 weapon to verify, cleaned) |
| E2E checks passed | **54/54** (2 viewports) |

### Pending Admin decisions (must be made per ranking in the UI)

- Character: 9 `READY_FOR_ADMIN_REVIEW` drafts — Xiangling C0/C6, Furina SUB_DPS/SUPPORT, Neuvillette, Raiden Shogun, Nahida, Zhongli, Yelan. 6 excluded rows require evidence/rubric correction before they can be prepared.
- Weapon: 13 Group-A candidates; explicit rights verification required for each. Favonius Greatsword stays blocked pending evidence. Both tier changes require an explicit old→new re-review confirmation.

No approval, rejection, rights verification, batch import, or production write was performed by this work.

---

## 10. Files changed (Phase D1)

**Backend**
- `src/graphql/modules/tierReviewSecurity.ts` (new)
- `src/graphql/modules/tierReviewSecurity.d1.test.ts` (new)
- `src/graphql/modules/characterTierRanking/` (schema/resolvers/service hardened; `createdAt`/`updatedAt`; `lastReviewedDate` normalisation)
- `src/graphql/modules/weaponTierRanking/` (schema/resolvers/service hardened; CAS, checksum, rights guard)
- `src/graphql/dataloaders/index.ts`, `src/graphql/index.ts`, `src/index.ts` (adminActor context, approved-only loaders)
- `scripts/phaseD1/d1-db-integration.ts` (new)
- `scripts/phaseD1/review-preparation.ts` (new)

**Frontend**
- `lib/graphql/queries/tierReview.ts` (new), `lib/graphql.ts` (barrel)
- `app/[locale]/tierlist/page.tsx`, `app/[locale]/tierlist/TierListClient.tsx` (approved-only binding, filters, empty state)
- `components/tierlist/types.ts`, `components/tierlist/CharacterTierBoard.tsx` (multi-row keys)
- `app/[locale]/admin/character-tier-review/page.tsx` (new), `components/admin/CharacterTierReviewClient.tsx` (new)
- `app/[locale]/admin/weapon-ranking-review/page.tsx` (new), `components/admin/WeaponRankingReviewClient.tsx` (new)
- `app/[locale]/admin/AdminLayoutClient.tsx` (nav entries)

**Docs / evidence**
- `docs/tierlist/PHASE_D1_ADMIN_REVIEW_INTEGRATION.md` (this report)
- `docs/tierlist/e2e/` (screenshots + `results.json`)

All changes remain uncommitted. No migration, seed, or applied-migration file was edited. Development database was never written.
