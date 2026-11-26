# Staging verification results (2026-11-24)

All commands ran locally or against the Neon **staging** branch. No production system was contacted.
No assertion, guard or fixture was weakened to obtain a pass.

## Tests

| Suite | Command | Result |
| --- | --- | --- |
| Backend auth | `npm run test:auth` (backend) | 9 pass, 0 fail, 1 skipped |
| Frontend auth | `npm run test:auth` (frontend) | 10 pass / 10 |
| Frontend all vitest | `npx vitest run` | 16 pass / 16 (includes 6 new bypass tests) |
| Backend GraphQL modules | `node -r ts-node/register --test` over `src/graphql/**/*.test.ts` | 95 pass / 99 |
| Backend typecheck | `npx tsc --noEmit` | clean |
| Frontend typecheck | `npx tsc --noEmit` | clean |
| Frontend production build | `npm run build` | succeeded |

### Four documented baseline GraphQL failures (unchanged, not weakened)

1. `Phase B2.5 still writes nothing to development database` — expected 0 ranking rows, actual 1.
2. `Phase B2 character IDs exist in the development database (read-only)` — same pre-existing row.
3. `Phase C1 GraphQL smoke: Mitya still has two builds and one default` — expected 2, actual 3.
4. `Phase C1 database remains write-free for rankings` — same pre-existing row.

These are stale development-data assertions documented in `docs/auth/AUTH_SECURITY_TEST_RESULTS.md`.
They were present before this work and are deliberately left untouched.

Two further suites initially failed with `Invalid URL` because required isolated-DB variables were
unset, and then with duplicate IDs because reused fixture DBs were pre-populated. After pointing
them at a freshly migrated local fixture DB (`genshinhub_test_weapon_publication_vrfy20261124`)
they passed. Those were environment issues, not code changes.

## Live GraphQL catalog (local backend, current source)

```
characters .................. 131
weapons ..................... 279
artifacts ................... 63
tierRanks ................... 0
characterTierRankings ....... 0   (public = approved + independent only)
weaponTierRanks ............. 0   (public = approved + verified rights only)
sample kamisato-ayaka ....... teams 3, bestWeapons 6, bestArtifacts 4
failures .................... 0
```

Covers Characters, Weapons, Artifacts, Teams and Tier List query paths.

## Neon staging database

See `docs/deployment/NEON_STAGING_MIGRATION_RUNBOOK.md`. Summary: 7 migrations recorded,
26 tables, all pre-existing row counts preserved, `Admin = 0`, no data reset, no admin created.

## Vercel 401

See `docs/deployment/VERCEL_DEPLOYMENT_PROTECTION.md`. The 401 was reproduced with a real request;
the source fix and its 6 unit tests pass, but the live 200 confirmation is **BLOCKED** because
`VERCEL_TOKEN` is absent from the local environment.

## Not runnable in this environment

- Headless DOM (262 routes) / CDP (262 routes, 246 build switches) regressions: no Playwright
  package is installed (`playwright` missing for both Node and Python). Prior evidence remains in
  `docs/auth/AUTH_SECURITY_TEST_RESULTS.md`; no new claim is made here.
- Python Admin E2E runners under `frontend/scripts/`: same Playwright blocker.
- Vercel env/deploy verification: missing `VERCEL_TOKEN`.
