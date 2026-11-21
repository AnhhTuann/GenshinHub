# Final DEVELOPMENT verification: v7.2 character-build reference corrections

Generated: 2026-11-21

Scope: DEVELOPMENT database only. No production database was read from or written to, no Admin approval was fabricated, and no Tier List data was changed. This document records verification evidence; it intentionally does not contain credentials, database dumps, browser artifacts, or bulk third-party guide text.

## 1. Environment and provenance

- Branch: `feat/balanced-fantasy-motion`
- Base HEAD before this handoff: `441bf3ce11783764c661a1f01a1426ed30102310`
- Development API: local GraphQL endpoint on `127.0.0.1:4000/graphql`
- Development frontend: production Next build served on `127.0.0.1:3002` (the earlier dev server on `3001` was only used for pre-final checks)
- Database URL was read from ignored `backend/.env` and never printed.
- Live source refresh for the five named characters: HTTP 200, `matchesCached: true`, v7.2.
- Operator-controlled manifest (not committed): SHA-256 `309dce1629675cd4d04d8782977a3521f72c98fe9babf31a6c2d5bc57adec783`, 128 records.

## 2. Five named characters

| Character | Default build | Roles / alternatives | Equipment and stats | Teams | Result |
|---|---|---|---|---|---|
| Mitya | `ref-v72-mitya` (MAINTENANCE), 1 default | `legacy-mitya` APPROVED `SUB_DPS/SUPPORT`; `approved-567e…` APPROVED `MAIN_DPS` preserved | 9 weapons, 8 artifact rows; EM/EM/CRIT main stats, CD/CR/EM/ER priority, NA/Burst/Skill | 1 source-attributed team; one source `traveler_cryo` team remains evidence-blocked | PASS |
| Xingqiu | `ref-v72-xingqiu` (MAINTENANCE), 1 default | `SUB_DPS` with legacy APPROVED alternative | 6 weapons, 5 artifact rows; ER/ATK% + Hydro + CRIT/CD, Burst-first priority | 3 curated teams verified; 2 additional source teams remain documented source material | PASS |
| Bennett | `maint-bennett-7.2-alias-r1` (MAINTENANCE), 1 default | `SUPPORT`; historical `legacy-bennett` APPROVED preserved | 16 canonical weapon IDs, 8 artifact rows; ER/HP% and CRIT normalization verified | 8 teams; canonical `kaedehara-kazuha`, no stale `kazuha`; legacy null team review statuses preserved | PASS |
| Alyosha | `dev-api-alyosha-7.2-r1` (MAINTENANCE), 1 default | newly imported `SUB_DPS` | 7 weapons, 8 artifact rows; ATK%/ER stats and talents verified | 3 teams, all `EXPERIMENTAL`, all rendered with rotation caveat in `en` and `vi` | PASS |
| Aino | `ref-v72-aino` (MAINTENANCE), 1 default | `SUPPORT`; legacy build retained | Favonius Greatsword / Silken Moon's Serenade / ER+EM / Burst-first regression confirmed | 3 teams, all valid refs | PASS |

Field-level checks compared PostgreSQL, GraphQL, the curated v7.2 source evidence, and rendered DOM: 67 checks across the five characters, 0 unresolved discrepancies. Detailed evidence is in local artifacts `five-field-verification.json`, `graphql-five.json`, `browser-five-report.json`, and `five-gaps.json` (not committed).

### Source limitations retained

- Source team comparison was limited to the first three curated compositions, matching the already applied v7.2 DEVELOPMENT corpus. Xingqiu and Alyosha have additional source teams that were inspected but were not silently added.
- Mitya's source contains one `traveler_cryo` composition that cannot be mapped to a verified local identity, plus one three-member team; neither was fabricated.
- Aino's source repeats the `Skill` talent token; the stored value is de-duplicated to `Burst, Skill`.
- Bennett's source token `CRIT` is normalized to the local canonical `CRIT Rate` label.
- Bennett and Xiangling legacy alias teams retain historical `null` team review status. This is preserved, not upgraded to verified.

## 3. Catalog and invariant checks

- Identities: 131
- Builds: 347; defaults: 131; one valid default per identity
- Build statuses: `APPROVED=96`, `LEGACY_IMPORT=35`, `REJECTED=88`, `MAINTENANCE=128`
- Audits: 691
- No invalid default weapon, artifact-set, or teammate references.
- No replay-written approvals: `approvalsWritten: 0` in every replay report.
- Tier/Admin protected data compared against an isolated restore of the pre-change dump with identical digests; `unchanged: true`.
- GraphQL across all 131 identities: 131 defaults, 259 public builds, 0 reference failures.
- Rendered pages: 262/262 (`en` + `vi`, all 131 identities) passed against the production build.
- Targeted five-character rendered DOM: 10/10 passed.
- Interactive build-switch checks for the five characters: 10/10 passed; 8 multi-build routes switched and restored correctly with no JS exceptions.

## 4. Replay tool verification

- Two consecutive DEVELOPMENT dry-runs: `CREATE=0`, `SET_DEFAULT=0`, `SKIP=128`.
- DEVELOPMENT apply with a fresh backup: no-op, `postApplyVerified: true`, `approvalsWritten: 0`.
- Rollback from that backup restored the same state; a subsequent dry-run again reported 128 skips.
- Conflict guard: a tampered manifest was refused (`1 target builds differ…; refusing to overwrite`).
- Environment guards:
  - `--env=production` is blocked outright.
  - `--env=staging` requires `STAGING_DATABASE_URL`, `--allow-staging`, and a staging-shaped database name.
  - Development is restricted to `127.0.0.1:5434/genshinhub`.
- Unit tests: `node --test scripts/character-builds/replay-corrections.test.cjs` — 10 pass, 0 fail.

## 5. Validation matrix

| Check | Result |
|---|---|
| `prisma validate` | PASS |
| `prisma migrate status` | PASS; 6 migrations, schema up to date |
| Backend `tsc --noEmit` | PASS |
| Backend `npm run build` | PASS |
| Frontend `tsc --noEmit` | PASS |
| Frontend `npm run lint` | PASS (existing warnings only) |
| Frontend `npm run build` | PASS |
| Frontend Admin Vitest | 5/5 PASS |
| Replay unit tests | 10/10 PASS |
| Build-audit core suite | 26 pass, 0 fail, 1 skipped |
| Independent tier suite | 74/74 PASS |
| Character rights integration | 1/1 PASS |
| Weapon publication integration (fresh isolated DB) | 2/2 PASS |
| GraphQL 131 identities | PASS, 0 failures |
| Rendered DOM 131 identities × 2 locales | 262/262 PASS |
| Five-character targeted DOM and interaction | 20/20 PASS |

## 6. Classified baseline failures (not regressions, tests not weakened)

- `backend/scripts/build-audit/catalog-a01.test.cjs` and `catalog-final-review.test.cjs`: known documented baseline failures; unchanged by this handoff.
- `phaseB25Review`, `phaseB2Draft`, and `phaseC1Smoke` rank-count assertions expect zero `characterTierRanking` rows, but the pre-change DEVELOPMENT dump already contained one row and protected-data digests are identical before and after. Not introduced here.
- `phaseC1Smoke` also hard-codes exactly two Mitya builds. The intended v7.2 reference correction intentionally preserves the two historical APPROVED role builds plus one corrected default, so the current count is three with one default. The assertion was deliberately left unchanged.
- Reusing a stale weapon-publication test database causes duplicate-key failures; the same tests pass 2/2 against a freshly created isolated database. No production data was involved.
- Compiled `backend/dist` tests, documented Tier draft row-count failures, D3 positive E2E locale/name harness bug, and B3.3 blocked cross-phase item remain documented baseline limitations.

No test was edited or weakened to accommodate these findings.

## 7. Conclusion

Status: `PASS_WITH_DOCUMENTED_SOURCE_LIMITATIONS`.

The DEVELOPMENT database, GraphQL surface, and rendered English/Vietnamese pages are consistent for all five named characters and the full 131-character catalog. The replay procedure is idempotent, backed up, conflict-safe, environment-scoped, and approval-free. Production migration was not executed; see `docs/database/CHARACTER_BUILDS_REPLAY_RUNBOOK.md` for the exact release dependency.
