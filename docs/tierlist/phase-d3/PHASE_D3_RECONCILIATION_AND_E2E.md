# Phase D3 — Reconciliation and Positive-Path E2E

**Status:** `IMPLEMENTED — SINGLE AUTHORITATIVE APPROVAL STATE — ISOLATED POSITIVE E2E PASS`
**Date:** 2026-11-20
**Scope:** reconcile the Phase D2 revised character/weapon dossiers into the existing Admin review workflow, keep frozen lineage immutable, and prove the complete `Admin decision → PostgreSQL → GraphQL → public Tier List` path on a disposable database.

> **Fixture disclaimer.** Every decision, rights verification, tier confirmation and ranking row created by the E2E described here is a clearly marked synthetic test fixture (`[D3-E2E-TEST-FIXTURE]`) on a brand-new disposable PostgreSQL database. Runtime Admin credentials are generated at start and never logged. **These approvals are not real content-approval evidence.** No development/production ranking was written; the development database was verified empty of ranking/review rows before and after. No freeze manifest, frozen artifact, D2 artifact or applied migration was edited. No commit, push, merge or deploy was performed.

---

## 1. Scope, inputs and non-goals

Ingested read-only inputs:

- `docs/tierlist/phase-d2/CHARACTER_REVISED_DRAFT.json` (9 records; 6 separately listed excluded drafts)
- `docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json` (14 records)
- `docs/tierlist/phase-d2/CHARACTER_DIFF.md`, `WEAPON_DIFF.md`
- `docs/tierlist/phase-d2/FINAL_ADMIN_REVIEW.md`, `VALIDATION_RESULTS.md`

Non-goals honoured: no rebuild from scratch; no third approval system; no alternate approval path; no auto-approve; no real ranking import; no freeze-manifest mutation; no UI redesign; no edit to the B3.3-owned shared importer.

---

## 2. Version mapping and checksum lineage

| Layer | Version / value | Role |
|---|---|---|
| B3.1 frozen batch | `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e` | Immutable source batch; unchanged. |
| B3.1 freeze manifest | `30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a` | Per-record SHA-256 anchors; unchanged and re-verified (`ok: true`, `issues: []`). |
| B3.1 decision sheet | `a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9` | Consumed by the existing B3.2 workflow. |
| D2 Character artifact | `1177ecd1536703d83167e0e09d30aa145deb10a66f9e3440839dd450756d896e` | 9 revised records; 9/9 `newChecksum` recomputed and matched. |
| D2 Weapon artifact | `eae26ea26b737d8e1cbe6cdabcc340c13575e47af0737a91e6662749b7460185` | 14 revised records; 14/14 `newChecksum` recomputed and matched. |

Rules enforced on every source load and every guarded mutation:

- D2 checksums are the **active decision targets**; frozen B3.1/B2 checksums are `sourceChecksum` lineage only. Supplying a frozen checksum to a D2 mutation is rejected as `SUPERSEDED_VERSION`; a row bound to an older checksum is rejected as `SUPERSEDED_REVIEW_VERSION`.
- D2 Weapon candidates use fresh `${stableCandidateId}::D2` identities. No approval, rights flag, tier confirmation or evidence acknowledgement is inherited from the frozen row.
- Character authoritative state remains `CharacterTierRanking.approvalStatus`; weapon authoritative state remains the B3.2 `WeaponTierReview` row. `phaseD3/versionedReview.ts` is a read-only preview bridge, never an approval system.
- No new enum or migration: `REQUEST_CHANGES` maps to the existing `NEEDS_REVIEW` status.

---

## 3. Count reconciliation (derived, never hardcoded)

All figures below are recomputed from the artifacts at test time by `frontend/scripts/run-phase-d3-positive-e2e.py` (preflight step `D2 count reconciliation (derived)`); the report does not trust a literal count from a document.

| Bucket | Count | Derivation |
|---|---:|---|
| Character revised records | 9 | `CHARACTER_REVISED_DRAFT.records.length` |
| Weapon revised records | 14 | `WEAPON_REVISED_DRAFT.records.length` |
| In-scope revised records | 23 | 9 + 14 |
| Excluded Character drafts | 6 | `excludedUnchangedDrafts.length`; untouched |
| Substantive D2 records | 29 | 23 revised + 6 excluded |
| D1 raw plan rows | 30 | 29 substantive + 1 synthetic blocked marker |
| Review-ready records | 20 | 12 Weapon + 8 Character; status not starting with `NEEDS_` |
| Evidence-blocked records | 3 | 2 Weapon + 1 Character; `missingEvidence` or `blockedEvidence.present === false` |
| Importable in source artifacts | 0 | `importEligibleNow` is false for every D2 record |

**Why 30 vs 29:** `backend/scripts/phaseD1/review-preparation.ts` emits a skip tombstone with `recordId: BLOCKED-${candidateId}` for the frozen `independent-12401-SUB_DPS-R1` evidence blocker. That tombstone is the 30th row of the raw D1 plan; it is never prepared, never reviewable and never imported. The 29 substantive records are the 23 revised drafts plus the 6 excluded Character drafts. The D3 report counts 23 in-scope records because the excluded drafts stay excluded.

Status distribution (from the artifacts):

| Scope | Status | Count |
|---|---|---:|
| Character | REVISED_PENDING_ADMIN_REVIEW | 1 |
| Character | REVISION_READY_FOR_ADMIN_REVIEW | 6 |
| Character | NEEDS_MORE_COMPARATIVE_EVIDENCE | 1 |
| Character | VERIFIED_NO_CONTENT_CHANGE | 1 |
| Weapon | REVISED_PENDING_ADMIN_REVIEW | 9 |
| Weapon | REVISION_READY_FOR_ADMIN_REVIEW | 1 |
| Weapon | NEEDS_MORE_EVIDENCE | 1 |
| Weapon | NEEDS_MORE_COMPARATIVE_EVIDENCE | 1 |
| Weapon | MANDATORY_TIER_RE_REVIEW_PENDING | 2 |

---

## 4. Changed fields, evidence blockers and confidence

- 22/23 records carry substantive revised content (8 Character + all 14 Weapon). `CHAR-TIER-B2-07` (Nahida C0 SUPPORT) is `VERIFIED_NO_CONTENT_CHANGE`; its new checksum is a new artifact version, not a content change.
- All 23 records expose candidate ID, previous/current version, target ID, role, constellation/refinement, proposed tier, explanation, evidence, gameplay assumptions, confidence, version diff, current checksum, review status and rights status to the Admin UI.
- Character tier values are unchanged in all 9 records; only `independent-14302-SUPPORT-R5` and `independent-14402-SUB_DPS-R1` change Weapon tier.
- `independent-12401-SUB_DPS-R1` — `NEEDS_MORE_EVIDENCE`, `LOW` confidence; six missing fields: `critRateAssumptions`, `passiveProcConditions`, `rotation`, `fieldTimeRequirements`, `energyGenerationAssumptions`, `rubricJustification`.
- `independent-13501-MAIN_DPS-R1` — `NEEDS_MORE_COMPARATIVE_EVIDENCE`; missing comparative Polearm Main DPS, HP-to-ATK conversion examples, scaling-team configurations and SS-vs-S rubric rationale.
- `CHAR-TIER-B2-06` (Raiden C0) — `NEEDS_MORE_COMPARATIVE_EVIDENCE`; stays paused.
- The authoritative queue now surfaces D2 revision evidence blockers in `blockedReason` as `D2_EVIDENCE_INCOMPLETE:...` even before a review row exists; the Admin UI renders this blocker and the row is never import eligible. Frozen-version Group B supplement semantics are unchanged.

---

## 5. One authoritative approval state

| Content | Authoritative state | Reader / writer |
|---|---|---|
| Weapon D2 decision | `WeaponTierReview` row keyed `...::D2` (B3.2 service) | `adminDecideWeaponTierReview`, `adminVerifyWeaponTierReviewRights`, `adminConfirmWeaponTierChange`; importer reads `adminWeaponTierReviewQueue(sourceVersion: D2_REVISED)` |
| Character D2 decision | `CharacterTierRanking.approvalStatus` | Existing D1 character review mutations; D3 exposes read-only preview only |

Guards shared by every path:

- Admin authentication and server-derived `actor`/timestamp; no client actor input.
- OCC on `expectedVersion` / `updatedAt`; stale or already-decided rows are rejected.
- Checksum binding to the D2 artifact batch and per-record `newChecksum`.
- Rights, tier-change confirmation, evidence acknowledgement and `importEligible` are recomputed by the authoritative service; a stale `APPROVE` row cannot bypass the aggregate.
- `SOURCE_DERIVED` content can never become a ranking.
- The importer rejects bypass keys (`bypassAuth`, `skipAdminCheck`, `autoApprove`, `bypassRights`, `fakeActor`, `actorIsEvidence`, `approveAll`).

`REQUEST_CHANGES` maps to `NEEDS_REVIEW`; no new enum or approval table exists.

---

## 6. Admin UI integration (no redesign)

`frontend/app/[locale]/admin/weapon-tier-review/page.tsx` now has a `FROZEN` / `D2 Revised` toggle backed by the authoritative queue. The selected record renders: current and previous version, per-field version diff, source/current/batch checksum, role, refinement, previous → proposed tier, explanation, exact gameplay assumptions, game facts, evidence JSON, confidence, rights status, decision, decision reason, decision/rights/tier-confirmation actors and timestamps, audit history, and blocked reason. `WeaponRankingReviewClient.tsx` is a read-only projection of that state — the parallel approval path was removed. `PhaseD3PreviewPanel` is embedded in the character and weapon review pages as a read-only version/diff/checklist panel.

The browser E2E verified the real DOM for all of these: 14 D2 rows with `B3_1_FROZEN → D2_REVISED` labels, `SS → S` for 14302, diff panel, checksum block, evidence, rights and decision badges, and the `D2_EVIDENCE_INCOMPLETE` blocker on 12401.

---

## 7. Separate tier-change confirmation

| Candidate | Change | Confirmation |
|---|---|---|
| `independent-14302-SUPPORT-R5` (Thrilling Tales) | SS → S | Separate `adminConfirmWeaponTierChange` in the browser UI; required before `APPROVE`. |
| `independent-14402-SUB_DPS-R1` (The Widsith) | S → A | Separate `adminConfirmWeaponTierChange` via Admin API; required before `APPROVE`. |

Both confirmations are checksum-bound, server-derived, audited and independent of rights verification and decision recording. A non-tier-change candidate returns `NOT_A_TIER_CHANGE`. The E2E confirmed both candidates were `tierChangeConfirmed=true` before their `APPROVE` rows became import eligible, and a plain APPROVE (`independent-11401-SUPPORT-R1`) required no tier confirmation.

---

## 8. Importer design and isolation

Because the concurrent B3.3 writer owns `backend/scripts/weapon-tier-independent/import-approved.cjs`, D3 uses a separate self-contained consumer, `backend/scripts/phaseD3/import-approved-d3.cjs`. It is **not** an approval system: it reads decisions from the authoritative B3.2 database queue and only transcribes them.

Guards, in order:

1. `D3_IMPORT_DATABASE_URL` may only target `genshinhub_*test*` / `genshinhub_*e2e*` on `127.0.0.1` or `localhost`; `current_database()` is asserted before any write.
2. Test apply additionally requires `ALLOW_TEST_IMPORT=1`; dev/prod apply requires `ALLOW_DEV_IMPORT=1` and a real `pg_dump` backup (isolated disposable DB may use `D3_SKIP_BACKUP=1`).
3. D2 artifact and every selected record checksum are recomputed; FROZEN or superseded checksums are rejected.
4. Partial selection is explicit (`--weapon-ids` / `--only`); unselected rows are `skipped: NOT_SELECTED`.
5. For each selected row: `APPROVE` decision, real server actor, ISO decided time, reason, evidence acknowledgement, five rights grounds with matching checksums, separate tier re-review where needed, authoritative `importEligible=true`, no `SOURCE_DERIVED`, no bypass key, weapon exists and has no conflicting legacy `tier`/`role`.
6. Dry-run before apply; post-import checks cover both public and admin GraphQL, approved/independent/rights-verified state, duplicates and unapproved leakage.
7. The ranking row's rights flag is set only through the dedicated CAS-guarded `verifyWeaponTierRights` mutation, transcribing the already-verified authoritative review state; client upsert cannot set it.

Isolation test suite: `backend/scripts/phaseD3/import-d3.test.cjs` — **11/11 pass**. The B3.3-owned shared importer remains byte-for-byte unchanged by D3.

---

## 9. Isolated E2E environment

Runner: `frontend/scripts/run-phase-d3-positive-e2e.py` (Playwright + Python).

- Fresh database `genshinhub_d3_e2e_*` created and dropped through PrismaClient against the `postgres` maintenance DB; `current_database()` asserted before every mutation phase.
- All 5 Prisma migrations deployed from zero; schema parity with development confirmed by `prisma migrate diff`.
- 279 weapon catalogue rows copied **read-only** from development into the isolated DB so public Tier List cards can resolve names and detail links. No development write.
- Dedicated backend on port `4124`, frontend on `3124`; random runtime `ADMIN_PASSWORD` / JWT secrets; `ADMIN_ACTOR_ID` removed so the actor is server-derived.
- Preflight asserted: isolated DB empty of rankings/reviews; 14 D2 rows with live checksums matching the recomputed artifact; blockers ineligible; development DB still `ranks=0, audits=0, reviews=0`.
- Frontend cache cannot mask results: the frontend is restarted after import and the public page is reloaded.

---

## 10. Positive path: Admin decision → authoritative DB → guarded import

Synthetic review subset:

| Candidate | Path | Decision |
|---|---|---|
| `independent-14302-SUPPORT-R5` | Browser UI: rights (5 grounds) + separate tier confirm + APPROVE | APPROVE (imported) |
| `independent-11401-SUPPORT-R1` | Admin API: rights + APPROVE | APPROVE (imported) |
| `independent-14402-SUB_DPS-R1` | Admin API: rights + separate tier confirm + APPROVE | APPROVE (imported) |
| `independent-11512-MAIN_DPS-R1` | No action | PENDING (invisible) |
| `independent-12502-SUPPORT-R1` | Admin API: rights + REJECT | REJECT (invisible) |
| `independent-12401-SUB_DPS-R1`, `independent-13501-MAIN_DPS-R1` | Evidence blocked; excluded from review | never eligible |

Browser checks included: anonymous deep link redirected to Admin login; runtime credentials accepted with HttpOnly `admin_token`; D2 toggle; APPROVE blocked with `RIGHTS_NOT_VERIFIED` before rights verification; audit history with the server-derived actor; decision persisted after full reload; blocker displayed for 12401.

Guard results: exactly the three clean approved rows were `importEligible=true`; PENDING, REJECT and both evidence-blocked rows were ineligible. Audit trails for every approved row contained `REVIEW_CREATED`, `RIGHTS_VERIFIED`, `DECISION_RECORDED` with the same server-derived actor.

Guarded partial apply wrote exactly the three selected candidates (`writeCount=3`), with `eligible=3`, blocked/skipped rows excluded, and reported target `127.0.0.1:5434/<isolated DB>`.

---

## 11. PostgreSQL → public GraphQL → Tier List verification

- Database: exactly 3 ranking rows, each `APPROVED`, `INDEPENDENT`, `publishRightsVerified=true`, correct D2 `role`/`tier`/refinement and `sourceChecksum` equal to the D2 `approvalChecksum`.
- Public GraphQL `weaponTierRanks`: exactly those 3 rows with correct tier/role; PENDING, REJECTED and evidence-blocked weapons absent.
- Public `/en/tierlist`: approved weapons rendered with detail links `/weapons/<id>`; no link or name for invisible fixtures.
- Reload after frontend restart preserved the public binding.

<!-- D3_E2E_RESULTS -->

---

## 12. Regression evidence

All commands were run in the required order with no weakened assertions:

| # | Check | Result |
|---|---|---|
| 1 | `cd backend && npx prisma validate` | PASS — schema valid |
| 2 | `cd backend && npx prisma migrate status` | PASS — 5 migrations, up to date |
| 3 | `cd backend && npx tsc --noEmit` | PASS — exit 0 |
| 4 | `cd frontend && npx tsc --noEmit` | PASS — exit 0 |
| 5 | Character Tier suites (`node --test ... characterTierRanking/*.test.ts`) | 37/37 PASS |
| 6 | Weapon Tier suites (`... weaponTierRanking/*.test.ts`) | 32/32 PASS |
| 7 | B3.2 workflow integration (`... weaponTierReview.integration.test.ts`) | 16/16 PASS |
| 8 | D1 integration + D2 preview + review security | 10/10 PASS |
| 9 | D2 checksum + partial import suites (`node --test scripts/weapon-tier-independent/*.test.cjs`) | 63/63 PASS |
| 10 | D3 importer guards (`node --test scripts/phaseD3/import-d3.test.cjs`) | 11/11 PASS |
| 11 | Playwright positive E2E (`frontend/scripts/run-phase-d3-positive-e2e.py`) | see section 11 and the machine log `/tmp/opencode/d3-positive-e2e-results.json` |

Consolidated command output: `/tmp/opencode/d3-regression-evidence.log` (all listed commands exited `0`).

TS suites use `TS_NODE_COMPILER_OPTIONS='{"rootDir":"."}' node --test --require ts-node/register/transpile-only` to avoid the pre-existing circular-import TDZ seen with `npx tsx --test` on the B3.2 integration file.

---

## 13. Changed files, limitations and remaining human actions

Backend:

- `src/graphql/modules/weaponTierReview/weaponTierReview.service.ts` — D2 evidence blocker surfaced in `blockedReason`; otherwise authoritative state unchanged.
- `src/graphql/modules/phaseD3/` — read-only version preview bridge, schema, resolvers and 5 passing tests.
- `src/graphql/modules/tierReviewSecurity.ts`, `tierReviewSecurity.d1.test.ts` — shared guards and D1 tests.
- `scripts/phaseD3/import-approved-d3.cjs`, `scripts/phaseD3/import-d3.test.cjs` — guarded D3 importer and its isolation/guard tests.

Frontend:

- `app/[locale]/admin/weapon-tier-review/page.tsx` — authoritative version toggle, diff/checksum/blocker panels.
- `components/admin/WeaponRankingReviewClient.tsx` — read-only projection of authoritative state; parallel approval path removed.
- `components/admin/PhaseD3PreviewPanel.tsx` — read-only version preview on character and weapon review pages.
- `scripts/run-phase-d3-positive-e2e.py` — isolated positive-path runner.

Unchanged: freeze manifest, frozen/decision artifacts, D2 artifacts, shared B3.3 importer, applied migrations.

Limitations / pending real actions:

- All D2 decisions remain `PENDING` in the real environment; the E2E approvals are disposable fixtures. A human Admin must still verify rights and decide each real candidate in the authoritative UI.
- Thrilling Tales SS→S and The Widsith S→A still require real, separate human tier re-review confirmations.
- The three evidence-blocked records must be repaired and re-checksummed through a new D2+ revision, not edited in place.
- No real import was executed; no production/VPS write or deployment occurred.
