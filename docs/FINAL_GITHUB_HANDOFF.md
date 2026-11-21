# Final GitHub handoff

## Status

`PASS_WITH_DOCUMENTED_SOURCE_LIMITATIONS`

The DEVELOPMENT database and rendered frontend are consistent for all 131 characters, including the five named verification cases: Mitya, Xingqiu, Bennett, Alyosha, and Aino. No production database was touched, no Admin approvals were fabricated, and Tier List data was verified unchanged against an isolated restore of the pre-change dump.

## Branch and commits

- Target branch: `feat/balanced-fantasy-motion` on `AnhhTuann/GenshinHub`
- Base HEAD before handoff: `441bf3ce11783764c661a1f01a1426ed30102310`
- No merge to `main` and no production deploy was performed.

This handoff is delivered as separate Conventional Commits covering:

1. verified DEVELOPMENT correction evidence (`docs(character-builds)`),
2. guarded DB replay tooling (`chore(db)`),
3. replay regression tests (`test(db)`),
4. DB maintenance/rollback procedure (`docs(database)`), and
5. final GitHub handoff documentation (`docs(release)`).

No GraphQL or frontend source correction was required: the observed issues were either already corrected in the DEVELOPMENT data, source limitations, or documented baseline failures. No test was weakened.

The final verified remote SHA is reported in the delivery message and can be rechecked with:

```bash
git ls-remote https://github.com/AnhhTuann/GenshinHub.git refs/heads/feat/balanced-fantasy-motion
```

## What was verified

- Five named characters: field-by-field comparison of PostgreSQL, GraphQL, live v7.2 source evidence, rendered English/Vietnamese DOM, build switching, equipment, stats, talents, teams, defaults, and provenance.
- Catalog: 131 identities, 347 builds, 131 valid defaults, 691 audits, no invalid default weapon/artifact/teammate references.
- Protected data: Tier List and Admin-owned data digests identical to the isolated pre-change baseline.
- GraphQL: all 131 identities, 0 reference failures.
- Browser: 262/262 rendered routes, 10/10 targeted five-character DOM checks, 10/10 targeted interactive switch/restore checks.
- Replay: dry-run idempotence, conflict refusal, environment guards, backup, apply, post-apply verification, and rollback.

Full details: `docs/character-builds/FINAL_DEVELOPMENT_VERIFICATION.md`.
Replay procedure: `docs/database/CHARACTER_BUILDS_REPLAY_RUNBOOK.md`.

## Known limitations and baseline failures

Retained and documented, not silently changed:

- Six identities without a curated reference page and two Traveler variants with no published builds.
- Source team comparison limited to the first three curated compositions; additional Xingqiu/Alyosha source teams were inspected but not silently imported.
- Mitya's unmappable `traveler_cryo` source team and three-member source row.
- Aino's duplicated source talent token, de-duplicated to `Burst, Skill`.
- Bennett's `CRIT` source token normalized to canonical `CRIT Rate`.
- Bennett/Xiangling historical `null` team review statuses preserved.
- Alyosha rotations remain explicitly labeled `EXPERIMENTAL` in both locales.
- Documented baseline test failures were not modified: catalog A01/final-review, ranking count assertions with a pre-existing row, the outdated two-Mitya-build assertion, stale weapon-publication test DB reuse, compiled `backend/dist` tests, D3 positive E2E locale/name harness, and B3.3 blocked cross-phase work.

## Working tree policy

Committed:

- replay tool and unit tests,
- verification report, replay runbook, and this handoff.

Excluded:

- `docs/character-builds/FINAL_131_REFERENCE_*` source-derived dossiers,
- operator-owned manifest and applied-change journal,
- database dumps and backups,
- browser DOM/artifact directories and profiles,
- environment files, credentials, generated build output, and third-party bulk reference text.

## Production

No production migration or replay was executed. The replay tool blocks production by design. If release approval is granted later, use the exact release dependency documented in `docs/database/CHARACTER_BUILDS_REPLAY_RUNBOOK.md`; do not bypass the guard.
