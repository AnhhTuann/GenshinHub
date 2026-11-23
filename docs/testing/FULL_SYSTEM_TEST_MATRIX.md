# Full system test matrix

| Area | Status | Evidence and remaining scope |
|---|---|---|
| Customer auth and session security | PASS | 18 PostgreSQL-backed backend and 10 frontend tests. Registration, normalized duplicates, invalid credentials, Remember Me, expiry, revocation, reset replay and concurrent consumption, CSRF, and role isolation. Fresh merged-build English desktop browser registration, refresh, logout, and Remember Me passed. |
| SMTP delivery | NOT_TESTED | Captured test mail passed. Live SMTP configuration remains unverified. |
| Admin credentials and authorization | PASS | PostgreSQL and GraphQL tests verified role checks, invalid password, disabled identity, protected mutation, and revoked session. Fresh merged-build Vietnamese mobile login, protected review navigation, and logout passed. |
| Admin review workflows | PARTIAL | Disposable Admin viewed a live queue and candidate details, staged synthetic builds, approved and rejected revisions, and verified stale-version and server actor audit checks. Thirty-eight review, import, and migration checks passed. Full review UI click-through and live weapon request-changes/publish were outside the executed flow. |
| Character inventory and page rendering | PASS | 131 distinct GraphQL rows and defaults, plus 262 rendered character headings across English and Vietnamese. Aino default was `ref-v72-aino`. Mitya, Xingqiu, Bennett, Alyosha, and Traveler variants were covered by inventory-driven traversal. |
| Character interactive workflows | PARTIAL | Search, no-results, keyboard activation of the element filter, detail navigation, and Mitya alternate build switching passed in English and Vietnamese on desktop and mobile. Sort, all filters, every detail tab and stat breakpoint, and exhaustive keyboard and accessibility flows were not independently exercised. |
| Weapons, artifacts, materials and teams | PARTIAL | Live GraphQL returned 279 weapons, 63 sets, and 862 materials. Module routes rendered in four locale/viewport combinations. Fixture GraphQL verified weapon and artifact detail and material visibility. Full item-by-item interactions and pagination were not tested. |
| Tier List | PARTIAL | Both locale routes and protected data digests passed. Exhaustive filter interactions and publication were not exercised. |
| Prisma and build system | PASS | Prisma validation and migration status passed with seven applied migrations. Backend build and frontend build passed. |
| Game data sync | PASS | Real dry-run twice on development, real zero-change apply twice on an isolated restore, and 34 synthetic checks. No development writes. |
| WebP and persistent storage | PASS | Forty-one asset cases exercised conversion, bounded retries, fallback, replacement failure, and atomic writes. Existing runtime asset serving was checked during browser verification. |
| Backup, database integrity, and replay | PASS | Fresh backup and isolated restore, matching digests across 15 compared development tables, and ten replay unit tests. |
| Scheduled hosted workflow | BLOCKED | Local workflow checks and CLI execution were available. Hosted schedule execution and database-secret targeting could not be verified. |
| Historical catalog suites | FAIL | Two A01 failures and two final-review failures reproduce against the immutable historical expectations. A01 expected version 1 where the retained live catalog is at version 3. The fifth failure is the completion regeneration case, which lacks the original comparison fixture. The active catalog GraphQL and browser checks passed. |
| Unsupported upstream schema and broad failure injection | NOT_TESTED | Invalid payload and network asset failures were tested; an unsupported package schema and actual process termination were not injected. |

Matrix totals are 7 PASS, 4 PARTIAL, 1 FAIL, 1 BLOCKED, and 2 NOT_TESTED. Historical failures were rerun to distinguish fixture drift from an active catalog defect. Frozen evidence and approvals were preserved.

An initial Vietnamese pass against an older local process raised React hydration errors. All four locale and viewport combinations passed without page errors on the fresh merged build. The complete all-roster pass verified rendered identity headings. It did not exercise every interactive control on every character.
