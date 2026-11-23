# Final release hardening

Base `main` was `e307ad4e09ff8ee9f197163fe245e150bce9045f`. GitHub's effective rules for `main` showed restricted deletions, blocked force pushes, and required Pull Requests with zero approving reviews and conversation resolution. No required status-check rule was returned. The branch prepared for review is `fix/final-release-hardening`. The original workspace and its four local dossiers were preserved.

## Changes

- Historical comparisons now use read-only archived inputs. All four A01 and final-review failures were resolved without changing historical assertions or evidence. The fifth original regeneration case explicitly reports `EVIDENCE_BLOCKED`.
- Reset mail requires validated settings and encrypted SMTP. Missing or failed SMTP verification no longer rejects server startup. Captured EN/VI mail and token expiration were tested. Live SMTP remains blocked on external configuration.
- Traveler with no stored per-level stats now shows a localized unavailable state. Stored data continue to drive the other level and ascension tabs.
- The game-data detector rejects malformed and unsupported package indexes. The scheduled check has a dedicated read-only credential prerequisite and a bounded runtime.
- The review harnesses now wait for streamed page content, test request-changes and stale versions, and avoid logging process arguments on a fixture failure.

## Local evidence and release boundary

A fresh PostgreSQL backup restored successfully to a disposable database. The dump SHA-256 is `8ad4693ec00cb1cea18d46be0d7cf7f6d5f7da935b91dbffa77258df0af5ab01`. All 15 protected development-table digests matched, including character builds, review and approval history, Tier List tables and user and Admin accounts. Counts remained 131 identities, 347 builds, and 131 public defaults. No sync writes were needed. Production was not accessed or deployed.

| Suite | Reproduction command or evidence |
|---|---|
| Backend auth / frontend auth | `npm run test:auth` in each package. 21 backend and 10 frontend passed. Backend used `AUTH_TEST_DATABASE_URL` pointing to an isolated local database. |
| Prisma and builds | `npx prisma validate`, `npx prisma migrate status`, backend `npm run build`, frontend `npm ci && npm run build`, `npx tsc --noEmit --incremental false`, and `npm run lint`. Local logs use the `/tmp/gh-hardening-` prefix. |
| Migrations, import, and publication guards | `node --test scripts/weapon-tier-independent/{admin-review,import-guard,migration-integrity}.test.cjs scripts/phaseD3/import-d3.test.cjs`. 38 passed. |
| Sync | `npm run sync:validate` twice, `npm run sync:e2e` on the disposable restore, `npm run test:sync:source`, `npm run test:sync:version`, and `npm run test:mats`. Two isolated `--sync` runs were no-ops. `node scripts/sync/interruption.test.cjs` verified SIGTERM rollback. |
| Assets and replay | `npm run test:assets` passed 41 checks. `node scripts/character-builds/replay-corrections.test.cjs` passed 10. |
| Browser, Admin and history | See the separate browser, Admin, and historical reports for exact scope and blocked cases. |

The delivery response records the PR and final verified remote SHA. A merge is subject to the ruleset and regression results.

Counted verification recorded 526 passes across cases and browser scenarios, no unresolved failing product assertions, and five blocked cases or external gates. The blocked count includes the missing original comparison fixture, two explicit legacy B3.3 policy gates, live SMTP, and hosted scheduler database configuration. The original missing-fixture command exits nonzero by design. Coverage gaps outside the executed inventory remain documented separately.
