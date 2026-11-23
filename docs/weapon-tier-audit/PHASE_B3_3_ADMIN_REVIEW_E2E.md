# Phase B3.3 — Admin Weapon Tier Review: Real Browser E2E Verification

**Date:** 2026-11-20
**Baseline:** B3.2 (`docs/weapon-tier-audit/PHASE_B3_2_REAL_ADMIN_APPROVAL.md`) — treated as the reference implementation, not redone.
**Git HEAD at start:** `62bc18c9a25ed481c725afcaefe057336c412b1f`
**Runner:** `frontend/scripts/run-phase-b33-admin-e2e.py` (self-contained, isolated)
**Runtime:** real Google Chrome `/opt/google/chrome/chrome` via Playwright (`/tmp/opencode/b33-venv/bin/python`)
**Result:** **47 PASS / 0 FAIL / 1 BLOCKED / 0 NOT RUN (in-scope)** — see §15.

> **Fixture disclaimer.** Every decision created by this run was made on an isolated test database by an automated browser/API client and is explicitly tagged `[B3.3-TEST-FIXTURE]`. **These are technical test fixtures, NOT real Admin approvals, NOT real rights verification, and NOT a human decision about any weapon's tier.** No ranking row was written to any database.

---

## 1. Scope, environment and safety boundary — PASS

| Item | Value / status |
|---|---|
| Isolated DB | `genshinhub_b33_e2e_195d6e99` (URL derived from `backend/.env` by replacing only the path) |
| Backend / frontend | `127.0.0.1:4114` / `127.0.0.1:3114` |
| Development servers | `:4000` / `:3002` left running and untouched — **PASS** |
| Credentials | Random `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, `USER_JWT_SECRET` generated per run; never logged; `ADMIN_ACTOR_ID` unset |
| Expected actor | `admin-<sha256(key).slice(0,12)>` (server-derived shared-key principal), e.g. `admin-c67058c95caf` |
| `current_database()` | Asserted before every mutation phase — **PASS** |
| Freeze re-verification | `ok: true`, `issues: []`, batch `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`, 14 records — **PASS** |
| Writes outside test DB | None. No dev/production ranking writes — **PASS** |
| Commit / push / merge / deploy | None — **PASS** |
| D1/D2/D3 concurrent work | Not overwritten; only in-scope defects repaired (§14) |

## 2. Isolated database and migration bootstrap — PASS

- Fresh DB created from zero; all **5 migrations** applied.
- `prisma validate`, `prisma generate`, `prisma migrate status`, `prisma migrate diff` (dev vs test) and a Prisma Client probe all succeeded.
- `prisma migrate diff` dev→test returned `-- This is an empty migration.` (schemas identical).
- Pre-condition and post-condition confirmed `WeaponTierRank = 0` and `WeaponTierAudit = 0` on the test DB.
- Development DB probed before and after: `{db: 'genshinhub', ranks: 0, audits: 0, reviews: 0}` — unchanged.

## 3. Admin login, session and sidebar — PASS

- Anonymous deep link to `/en/admin/weapon-tier-review` redirected to the Admin login page by middleware.
- Login waited for React hydration (`__reactProps$`) before typing, then submitted via Enter.
- Runtime credentials accepted; an HttpOnly `admin_token` cookie was set.
- Sidebar "Weapon Review" link opened the review queue in the real browser.

## 4. Review queue: 14 candidates / 13 Group A / 1 Group B — PASS

- Queue stats rendered: **14 total / 13 Group A / 1 Group B / 14 pending / 0 approved**.
- Row badges were verified against the real DOM (rows render `weaponId`; the runner extracted the internal candidate ID via `candidate_id.split("-")[1]`).
- Empty-detail prompt and a loading skeleton (queue response delayed) were both observed — **PASS**.

## 5. All 14 detail panels — PASS

Every candidate was selected in the browser and its panel rendered explanation, gameplay assumptions, exact game facts, evidence and checksum blocks. Detail rendering adapted to the D3 version bridge labels (`Current checksum` / `Source checksum` in addition to the B3.1 `Approval checksum`) without losing information.

## 6. Rights verification gates — PASS

- APPROVE before rights verification surfaced `RIGHTS_NOT_VERIFIED`; the decision stayed `PENDING` and remained not import eligible.
- All **five** rights grounds are required by the UI (`independentRanking`, `originalExplanation`, `noGenshinBuildsEditorialCopy`, `gameFactsAttributionCorrect`, `evidenceValid`) plus a note; the server derives `rightsVerifiedBy` from the auth context.
- Rights verification was audited as `RIGHTS_VERIFIED`; the rights-false fixture (`independent-12502-SUPPORT-R1`) was deliberately left untouched and remained `PENDING` with `rightsVerified=false`.

## 7. Decision workflow: APPROVE / REQUEST_CHANGES / REJECT — PASS

- Short reasons (<10 chars) were rejected client-side without any mutation.
- `APPROVE` (`independent-11401-SUPPORT-R1`) succeeded after rights; `REVIEW_CREATED`, `RIGHTS_VERIFIED` and `DECISION_RECORDED` were all present in the audit trail.
- The decision survived a full page reload — **PASS**.
- `REQUEST_CHANGES` (`independent-11403-SUB_DPS-R5`) and `REJECT` (`independent-11418-SUPPORT-R1`) stored their reasons, were audited, and were not import eligible.
- Public GraphQL `weaponTierRanks` remained `[]` throughout — **PASS**.

## 8. Group B six-field evidence block — PASS

- `independent-12401-SUB_DPS-R1` (Favonius Greatsword) APPROVE was blocked with **0** and with **1 of 6** supplementary fields.
- With all six synthetic fields supplied (fixture only), APPROVE succeeded and `EVIDENCE_SUPPLEMENTED` was audited.
- The importer separately proved that an incomplete Group B supplement cannot be selected (§13).

## 9. Tier re-review confirmation — PASS

- `independent-14302-SUPPORT-R5` (SS→S) and `independent-14402-SUB_DPS-R1` (S→A) each rejected APPROVE until a separate confirmation was recorded.
- Confirmation was audited (`TIER_CHANGE_CONFIRMED`), then approval succeeded in both cases.

## 10. Audit trail, actor derivation and persistence — PASS

- Audit history is ordered; every action carries a server-derived actor — **PASS**.
- Client-supplied actor fields are ignored/rejected: GraphQL rejects an unknown `decidedBy` argument, and an injected `actor`/`adminActor`/`bypassAuth` is dropped.
- A different Admin principal could not overwrite an existing decision; stale version writes were rejected (§11).
- All identity fields are the verifiable shared-key principal, never a fabricated person.

## 11. Security: auth, checksums, concurrency, proxy — PASS

| Check | Status |
|---|---|
| Anonymous Admin GraphQL query → `Unauthorized: Admin access required.` | PASS |
| Invalid Admin key rejected | PASS |
| Record and batch checksums both enforced (`CHECKSUM_MISMATCH`, `BATCH_CHECKSUM_MISMATCH`) | PASS |
| Superseded-source checksum rejected | PASS |
| Stale `expectedVersion` → `CONCURRENT_MODIFICATION`; 1 winner, 1 loser, single audit record | PASS |
| Public GraphQL exposes no test ranking | PASS |
| Admin proxy rejects anonymous and forged-cookie requests (`Admin token required`) | PASS |
| Admin key absent from browser console and request headers; browser only calls the same-origin proxy | PASS |

## 12. Responsive layout, themes, hydration, overflow — PASS

- Desktop **1440px**, dark and light themes: no horizontal overflow.
- Mobile **390px**: drawer navigation and detail panel usable; `document.scrollWidth <= clientWidth + 1`.
- No hydration mismatch or React console errors.

## 13. Importer guarded dry-runs and exclusions — PASS (APPLY: NOT RUN)

- `--apply` was **never** invoked on development or production. **NOT RUN by design** (`pg_dump` unavailable in this environment; a backup is mandatory before APPLY).
- Dry-run without `ADMIN_KEY` fails closed with `DB_DECISIONS_REQUIRE_ADMIN_KEY`.
- Full dry-run: `mode=DRY_RUN`, `decisionSource=database`, `writeCount == eligible`, planned operations all `derivation=INDEPENDENT` and `publishRightsVerified=true`.
- Excluded from eligibility: `REQUEST_CHANGES`, `REJECT`, `PENDING`, rights-false, incomplete Group B, `SOURCE_DERIVED`, checksum/freeze mismatch, fake actors, missing evidence acknowledgement, unconfirmed tier change. No guard was weakened.
- `import-guard.test.cjs` (15/15) covers `SOURCE_DERIVED` and `CHECKSUM_MISMATCH`.
- **BLOCKED — cross-phase D3, out of B3.3 scope:** the importer's `REVIEW_QUEUE` currently has no `sourceVersion` argument and reads the default `FROZEN` queue, so the authoritative `D2_REVISED` rows (`::D2` ids, own batch checksum) are never queried and D2 importability cannot be exercised. B3.3 did **not** modify the importer to work around this.
- Post-condition: test DB `WeaponTierRank = 0`, `WeaponTierAudit = 0` — no dry-run wrote anything.

## 14. Defects found and fixed — PASS

All fixes are minimal and limited to the review workflow; no B1/B2/B3/B3.1/B3.2 implementation was redone.

1. **First-decision version contract (product defect).** `ensureRow()` rejected `expectedVersion: 0`, so the first decision on a candidate with no persisted row always failed with `CONCURRENT_MODIFICATION`. Fixed to accept `0`, create the row at `version: 0`, enforce creation races via the `P2002` unique guard, and reject only negative tokens (`< 0`) at mutation entry. File: `backend/src/graphql/modules/weaponTierReview/weaponTierReview.service.ts`.
2. **Stale version after a rejected mutation (UI defect).** `runMutation()` refetched only on success, so a rejected mutation that had still created the row (`REVIEW_CREATED`) left the client at `expectedVersion: 0` and blocked every follow-up action. Fixed to refetch queue and audit in `finally`. File: `frontend/app/[locale]/admin/weapon-tier-review/page.tsx`.
3. **Integration tests for the v0 contract.** Updated `weaponTierReview.integration.test.ts` with first-mutation-at-v0, stale-version and cross-principal cases (16 tests pass).
4. **Broken regression test from concurrent D3 work.** The D3 agent removed the `loadD2Bridge` export from `import-approved.cjs` while leaving `import-guard.test.cjs` importing it. Repaired the test to bind the frozen manifest checksum, restoring **15/15**; no importer guard was changed.
5. **Runner hardening (harness only).** Hydration wait before login, weapon-ID row selectors, non-zero importer exit tolerated for empty dry-runs, D2 checksum labels, versioned `<details>` selectors, and adaptive D2-bridge reporting. No product behavior changed.

## 15. Regression suite and final status — PASS

Every command below was run after all fixes; all passed:

- `prisma validate`, `prisma generate`, `prisma migrate status`, `backend tsc --noEmit`, `frontend tsc --noEmit`
- `pipeline`, `tier-map`, `independent`, `freeze`, `game-facts`, `approval`, `admin-review`, `import-b32`, `import-guard`, `migration-integrity` (10 script suites)
- `weaponTierReview.integration` (16), `phaseD3/versionedReview`, `weaponTierRanking`, `weaponTierRanking.graphql`, `weaponTierRanking.migration`, `weaponTierDataloader`
- Full browser E2E: **47 PASS / 0 FAIL / 1 BLOCKED**
- Freeze still `ok: true`, `issues: []`, batch unchanged
- Final dev DB: `{db: 'genshinhub', ranks: 0, audits: 0, reviews: 0}`
- Final test DB: `{db: 'genshinhub_b33_e2e_195d6e99', ranks: 0, audits: 0, reviews: 7, reviewAudit: 24}` (review/audit fixtures only)

**Status summary**

| Area | Status |
|---|---|
| B3.2 review workflow (browser + API + audit + security) | **PASS** |
| Responsive / themes / hydration / overflow | **PASS** |
| All regression suites | **PASS** |
| Guarded importer dry-runs and exclusion guards | **PASS** |
| Importer APPLY | **NOT RUN** (policy + no backup tool) |
| D2_REVISED importer bridge (cross-phase D3) | **BLOCKED** |
| Real Admin human approvals / real rights verification | **NOT RUN** (fixtures only) |
| Production / development writes, commit, push, deploy | **NOT RUN / none performed** |

**Conclusion:** The B3.2 Admin Weapon Tier Review workflow is verified end-to-end in a real browser on an isolated database. No in-scope E2E assertion failed. The single BLOCKED item is a cross-phase D3 importer bridge gap outside B3.3 scope and was reported, not patched. All test decisions remain fixture-only and no ranking was ever imported.
