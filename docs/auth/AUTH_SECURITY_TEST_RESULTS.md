# Authentication verification

## Local database

The development database was confirmed as PostgreSQL `genshinhub` on `127.0.0.1:5434`. Prisma reported seven applied migrations and a current schema. One active owner existed and there were no customer rows at inspection. This execution applied no development schema or business-data changes.

A fresh private custom-format PostgreSQL backup was restored successfully in a network-isolated container. The backup SHA-256 digest is `3e86edafb5fe3c0d7a0ab73248ab12c1c4f20f4dee00f3c128e225233e9a8e22`. Canonical row counts and digests matched between the restore and development for all compared tables.

| Table | Rows | Digest matched |
| --- | ---: | --- |
| Character | 131 | Yes |
| CharacterBuild | 347 | Yes |
| CharacterBuildAudit | 691 | Yes |
| CharacterWeapon | 1927 | Yes |
| CharacterArtifact | 1201 | Yes |
| CharacterTeam | 620 | Yes |
| TeamMember | 2478 | Yes |
| TierRank | 0 | Yes |
| CharacterTierRanking | 1 | Yes |
| WeaponTierRank | 0 | Yes |
| WeaponTierAudit | 0 | Yes |
| WeaponTierReview | 6 | Yes |
| WeaponTierReviewAudit | 12 | Yes |

## Authentication

The PostgreSQL integration suite used a newly created isolated test database, populated with test-only identities. The initial run passed 18 tests, including real backend HTTP and GraphQL requests. The frontend auth suite passed 10 tests, including browser origin rejection and the failed-revocation response. Prisma validation and the backend build passed. Reset delivery used test capture during integration. Production SMTP delivery remains unverified.

The checked-in source changes preserve the review and publish authorization checks. Test evidence for individual workflows is reported separately from source inspection.

The final isolated backend run passed 18 of 18, including concurrent reset consumption, expired sessions, rejection of customer-to-Admin login, rejection of unverified social identities, and rejection of an Admin mutation after logout. The weapon review, D3 import guard, and migration integrity regression suites passed 38 of 38 once run with local PostgreSQL access. The development GraphQL character catalog returned 131 distinct IDs.

Playwright verified the local host-preserving redirect, mobile Vietnamese Admin login and review route, and desktop English customer registration, profile refresh, logout, Remember Me, and Admin isolation. The first browser attempt exposed a framework redirect from `127.0.0.1` to `localhost`. The successful rerun verified the fix. Next.js completed its production build with unrelated lint warnings. A separate full click-through of every historical Admin workflow and all 131 character pages was outside these browser checks.

The final Playwright run also passed mobile Admin logout, customer access-denied messaging, and the reset page's missing-link state. The PostgreSQL HTTP test verified that an Admin session could no longer authorize a protected GraphQL mutation after logout. Synthetic test identities were removed from the isolated test database.

Three historical catalog suites were also exercised. The frozen A01 and final-review assertions failed against the current read-only catalog inventory. A01 expected version 1 where the existing catalog contained version 3, and the final review expected the old batch and history state. Those tests, their catalog helpers, and their tracked fixtures are unchanged from the starting commit. In the completion suite, the proposal traceability and dry-run checks passed. Its proposal regeneration check requires the original comparison fixture via `BUILD_AUDIT_COMPARISON`, which was unavailable in the run. These results are separate from the passing live 131-character GraphQL smoke check and the 13 matching database table digests.

## Final consolidated verification

All commands below ran against the DEVELOPMENT database or freshly created isolated databases. No production system, credential store, or deployment was accessed.

| Check | Result |
| --- | --- |
| Backend auth suite (`npm run test:auth`) | 18/18 passed |
| Frontend auth suite (`npm run test:auth`) | 10/10 passed |
| Backend/frontend builds and TypeScript checks | passed |
| `prisma validate` / `migrate status` | valid; 7 migrations, up to date |
| Public GraphQL catalog | 131 characters, 131 defaults, 259 public builds, 0 failures |
| Headless DOM validation, EN + VI | 262/262 routes passed |
| CDP validation (`CDP_CONC=1`) | 262/262 routes, 246/246 build switches restored, 0 failures |
| Isolated Phase-C Admin E2E | passed; anonymous and ordinary users denied, Admin login/dashboard/editor isolation, create/stage/approve/default/reload/reject/archive/history/concurrency, public 1440px and 390px dark/light, single/empty regressions |
| B3.3 Admin weapon-review E2E | 0 failures; 2 documented blocks |
| D3 positive import E2E | 37/37 passed; isolated DB only (3 ranks, 3 audits, 4 reviews, 17 review audits) |
| Build-audit core / tier-independent / character-rights | 27 tests (26 passed, 1 skipped), 74/74, 1/1 |
| Weapon publication integration with isolated DB | 2/2 passed |
| Protected data comparison | 13 table counts and digests identical before/after |
| Fresh migration audit | 7 migrations, generated client identical, empty schema diff |

The two B3.3 blocks are scope boundaries, not suppressed guard failures. (1) The Favonius D2 revision keeps its six evidence blockers immutable; supplement fields are persisted and audited, but `REVISION_EVIDENCE_INCOMPLETE` still prevents approval. The earlier FROZEN supplement path is no longer reachable from the read-only review UI. (2) The importer's `REVIEW_QUEUE` operation has no `sourceVersion` argument and reads the default FROZEN set, so D2-bound importability cannot be exercised by B3.3 without cross-phase D3 bridge changes. Every FROZEN exclusion guard, checksum binding, rights check, stale-version check, and concurrent-write test in scope still passed; no server-side guard was weakened.

Four `graphql-security` failures remain at their documented baseline: the phase-B2.5/B2/C1 tests assert zero ranking rows where the authoritative development snapshot has one, and the C1 smoke test asserts the stale two-build Mitya count. The catalog A01 and final-review tests, plus the final-all and final-review lifecycle integrations, also retain their pre-existing stale version/batch/build-count expectations. These assertions were left unchanged; the live catalog, protected-data digests, and full browser validations pass. Local SMTP is not configured, so production password-reset delivery cannot be claimed; the implementation fails closed with `AUTH_SMTP_NOT_CONFIGURED` and local testing used in-process mail capture only.
