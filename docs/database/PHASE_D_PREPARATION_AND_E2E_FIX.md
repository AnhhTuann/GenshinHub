# Phase D Preparation — E2E Locator Fix, Regression Stability and Approval Sheets

**Status: PASS for preparation. STOP before database write — no Admin approval exists yet.**

This document does not redo Phase C1/C2. It closes the remaining original-script defect from
`docs/database/PHASE_C2_ADMIN_E2E_AND_REGRESSION.md`, re-verifies stability, and prepares both
Phase D approval workflows. No ranking was inserted, approved or published.

---

## 1. Original E2E script defect — root cause and fix

File: `frontend/scripts/test-admin-multi-build.py`

Prior failing locator (line 161):

```python
selector = page.get_by_label('Build', exact=True)
```

Evidence gathered from the live isolated Admin UI:

| Observation | Earlier failing state | Current state |
|---|---|---|
| Build `<select>` | `<select class="...">` — **no `aria-label`** | `<select aria-label="Build" class="...">` |
| Wrapping `<label>` text | `Build C0 Off-Field Support / Sub DPS (APPROVED)C0 On-Field Main DPS (APPROVED)` | same label text, but control now has explicit `aria-label` |
| Playwright accessible snapshot | no exact name `Build` | `- combobox "Build": - option ... - option ...` |
| `get_by_label('Build', exact=True)` | matched 0 controls / 0 options | matched 1 `SELECT` / 2 options |

Root cause: without `aria-label`, the implicit label's accessible name included every option string, so an exact label lookup could not identify the control reliably. The app's data and DOM options were always correct; this was a locator/a11y binding defect, not a Multi-Build business-logic bug.

A concurrent agent added `aria-label="Build"` to `CharacterBuildManager.tsx` during Phase C2. I did **not** overwrite that uncommitted component change. I made the test locator semantic and independent of the wrapping label text:

```python
# Semantic locator: the combobox exposes aria-label="Build". Using its role avoids
# depending on the wrapping <label>, whose text also contains every option name.
selector = page.get_by_role('combobox', name='Build', exact=True)
```

No assertion was removed, skipped, shortened or weakened. No business logic changed. The UI was not redesigned.

Traceability: script SHA-256 before edit `a3acc17313ea158a48d7e70d6c723d23e9ea7ff7892c9638b29922b0a1a5a36d`, after edit `81b3d30996ccfd35453d2d2dc61821f502a2895cb042e1127f703752102917e0`.

## 2. Original repository script — PASS

The **repository file itself** was run, not a `/tmp` copy:

- Isolated DB: `genshinhub_c2_e2e_7895d984`, restored from a development dump; isolated backend port `4124`, frontend port `3124`.
- Admin password, JWT secrets generated at runtime; nothing hardcoded, printed or logged.
- Real browser login via `/en/admin/login`; `admin_token` verified as HttpOnly; proxy forwards `x-admin-key` to backend.
- `CONCURRENT_EDIT=0`: watched-file fingerprint `ea0757769116bd531d1746d3ea81adc9d866af4feadeba0b1ff7f9fbb2719801` was identical before and after.
- `E2E_EXIT=0`.

Passing stages, exactly as printed by the original script:

1. `Anonymous and authenticated normal user denied`
2. `Admin login, dashboard navigation and editor isolation passed`
3. `Admin browser create/stage/approve/default/reload/reject/archive/history and concurrency passed`
4. Public 1440px dark / light and 390px dark / light: switching, default, team order, assets, hydration, overflow
5. `Public single and empty build regressions passed`

This covers create, edit/stage, approve, default switch + reload, optimistic concurrency, reject, archive, history, authorization, and Mitya public regression. The throwaway DB was dropped; ports and own processes were released. Development DB was never the test target.

## 3. Regression stability — PASS

All commands ran sequentially. No parallel browser/build runs.

| Check | Result |
|---|---|
| `prisma migrate status` | PASS — 4 migrations, up to date |
| `prisma validate` | PASS |
| Backend `tsc --noEmit` | PASS |
| Frontend `tsc --noEmit` | PASS |
| Character Multi-Build / build-audit | 13/13 testcases PASS |
| Character Tier suite | 38/38 testcases PASS |
| Weapon Tier suite | 32/32 testcases PASS |
| Weapon audit + independent suite | 46/46 testcases PASS, including approval `9/9` |
| Total | **24/24 test files, 138/138 testcases PASS, 0 FAIL** |
| `node scripts/weapon-tier-independent/freeze.cjs --verify` | `"ok": true`, `issues: []` |

Watched-file fingerprint before and after the full suite: `cd01939138faaa7a84cff6d11151487c4df72877761246958663b52c232b493e`, so **`CONCURRENT_EDIT=0`**. If any watched file changes later, the correct status is `CONCURRENT_EDIT`, not a code-failure conclusion.

## 4. Development database integrity — PASS, read-only

Checked before and after the suite; identical both times.

| Metric | Value |
|---|---:|
| Migrations | 4, finished, no rollback |
| `Character` | 131 |
| `Weapon` | 279 |
| `CharacterBuild` | 127 |
| `CharacterBuildAudit` | 127 |
| `CharacterTierRanking` | 0 |
| `WeaponTierRank` | 0 |
| `WeaponTierAudit` | 0 |
| `User` | 0 |
| Mitya builds / default | 2 / exactly 1 (`legacy-mitya`) |

Legacy data hashes unchanged from C1/C2: `Character e74a910f1cb98e6b6d24479d551b31bd`, `Weapon db501ef988e195945bbaf91d24843ee4`, `CharacterWeapon 602cddce885e7b79b149aa393370b561`, `CharacterArtifact 6bf1b946b2a70b5b254c9b19631af92d`, `CharacterTeam 7b977c85b5497a4bc10af0388fb21323`.

No production connection was opened. No migration, ranking, audit or build row in development was written.

## 5. Character Tier Phase D — approval sheet ready

Generated files:

- `docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.md`
- `docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json`

Source: `PHASE_B2_RANKING_DRAFTS.json`, batch `phase-b2-independent-001`, SHA-256 `7b102da59c3fe3c75f084363de5a989e2561c1816cb68737e228f967cc0afc2c`.

| Category | Count | In Phase D sheet |
|---|---:|---|
| READY_FOR_ADMIN_REVIEW | 9 | **yes — decision columns PENDING** |
| NEEDS_MORE_EVIDENCE | 2 | no |
| RUBRIC_RECALIBRATION | 3 | no |
| GAMEPLAY_ASSUMPTION_UNVERIFIED | 1 | no |
| Total independent drafts | 15 | no insert performed |

The sheet keeps Xiangling C0/C6 and Furina SUB_DPS/SUPPORT as separate records. Every row carries a per-record SHA-256 and empty decision fields (`adminActor`, `decidedAt`, `reason` = `null`; rights not verified). Current import eligibility: **0/9**.

## 6. Weapon Tier Phase D — approval sheet ready

Generated files:

- `docs/weapon-tier-independent/PHASE_D_WEAPON_APPROVAL_SHEET.md`
- `docs/weapon-tier-independent/PHASE_D_WEAPON_APPROVAL_SHEET.json`

Freeze verification:

- freeze script `--verify`: `ok=true`, no issues;
- batch SHA-256 `e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e`;
- decision-sheet SHA-256 `a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9`, matching freeze manifest;
- all frozen input file hashes and 14 per-record hashes match.

| Group | Count | Status |
|---|---:|---|
| A — reviewable candidates | 13 | all `PENDING` |
| B — Favonius Greatsword | 1 | `NEEDS_MORE_EVIDENCE`, blocked |
| Mandatory tier re-review | 2 | Thrilling Tales `SS→S`, The Widsith `S→A`; not confirmed |
| `publishRightsVerified = true` | 0 | flag stays false until a human verifies rights |

All 14 rows require explicit Admin decision, real actor, timestamp, reason, rights verification and evidence acknowledgement. Current import eligibility: **0/14**. `SOURCE_DERIVED` / 296 research records remain excluded.

## 7. Next implementation — hard gate

This phase stops before any database write. Phase D may start only after a real Admin session approves each individual record:

1. Verify source/per-record checksums again.
2. Cast one explicit decision per record in an authenticated Admin context; server derives actor and audit entries.
3. For weapons, also verify rights and confirm the two tier changes separately.
4. Insert only approved rows through the backend Admin GraphQL mutation with audit logging.
5. Verify PostgreSQL, public GraphQL and the existing Tier List; do not show pending rows; do not create tiers for unapproved characters/weapons.
6. Never import all 15/14 drafts, never import `SOURCE_DERIVED`, never self-approve, never flip rights automatically.

Without approval: **BLOCKED for database write**; all preparation above is complete.

## 8. Files changed in this phase

Modified by me:

- `frontend/scripts/test-admin-multi-build.py` — semantic locator only.
- this report.

Created by me:

- `docs/tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.md` / `.json`
- `docs/weapon-tier-independent/PHASE_D_WEAPON_APPROVAL_SHEET.md` / `.json`
- `docs/database/PHASE_D_PREPARATION_AND_E2E_FIX.md`

Not overwritten: concurrent uncommitted work including `CharacterBuildManager.tsx`, weapon-tier scripts/artifacts and other agents' files. No reset, stash, clean, commit, push, merge or deploy.

## 9. NOT RUN / remaining blockers

- **NOT RUN:** production checks, production build, seed/backfill on a fresh DB, ESLint (backend tooling gap), any browser suite other than the original Admin E2E.
- **BLOCKED:** database write, ranking publication and rights verification until a real Admin approves individual records.
- External agents may still modify weapon-tier artifacts; re-run the `CONCURRENT_EDIT` checks and the 24-file suite if their hashes change.
