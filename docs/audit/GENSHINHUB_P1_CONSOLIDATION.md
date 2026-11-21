# GenshinHub P1 review consolidation

## Authoritative workflow

The two existing Admin weapon screens read the same candidate table. The separate `WeaponTierRanking` mutations and the two staged importer apply loops could create a conflicting publication independently of that table. Both screens remain. **WeaponTierReview is the authority for candidate decisions and rights. WeaponTierRank is the public projection.** The actionable screen opens D2_REVISED and the FROZEN tab remains available as historical evidence. The projection screen remains read-only.

The D2 importer now submits only the reviewed candidate ID, batch hash, record hash and review version. It also binds the write to the expected database. Frozen apply is disabled and its historical inspection and planning paths remain. The old rank mutations preserve their GraphQL shape and return an explicit retirement error after authentication.

## Publication and dossier safeguards

- Candidate rights confirmation, tier-change confirmation and decisions now commit with their candidate audit entries. The public write revalidates the verified freeze and revised source, the exact persisted decision and its audit, rights grounds and audit, and separate tier confirmation and audit where required.
- Publication advances the exact candidate version with compare-and-swap. It materializes the independent rank, the rank audit, and the candidate publication audit in a single PostgreSQL transaction. A conflicting previously materialized rank key aborts without overwriting it. Publication audit history is retained and a published candidate is locked against editing.
- Favonius Greatsword and Staff of Homa remain blocked by revised evidence gaps. The two tier decreases require confirmation on their own revised candidate IDs. No frozen decision, rights confirmation, or tier confirmation is carried forward.
- Character Review now prepares the revised dossier with its current checksum in the original Admin screen. Rights verification and approval require the exact revised evidence, explanation and tier for tracked 7.2 dossiers. Raiden C0 and previously excluded records remain blocked. Old pending character drafts can be prepared again from the current dossier.
- Public character and weapon tier queries default to 7.2. The public Tier List explicitly requests 7.2, and nested weapon ranks use the same default. No ranking, rights or Admin-session data was changed in development.

## Files changed

- Weapon candidate and publication wiring in `backend/src/graphql/modules/weaponTierReview/weaponTierReview.{service,sources,schema,resolvers}.ts`, the existing review integration test, and `weaponPublication.integration.test.ts`.
- Rank retirement and default version in `backend/src/graphql/modules/weaponTierRanking/weaponTierRanking.{service,resolvers,graphql.test}.ts`, `weaponTierDataloader.test.ts`, and `backend/src/graphql/dataloaders/index.ts`.
- Revised Character wiring in `backend/src/graphql/modules/characterTierRanking/characterTierRanking.service.ts`, `backend/src/graphql/modules/phaseD3/versionedReview.ts`, the existing Character review page, and `frontend/components/admin/CharacterTierReviewClient.tsx`.
- Importers in `backend/scripts/phaseD3/import-approved-d3.cjs`, its planner test, and `backend/scripts/weapon-tier-independent/import-approved.cjs`.
- Existing weapon review pages and projection label, and `frontend/app/[locale]/tierlist/page.tsx`.
- Release contexts in both Dockerfiles, root `.dockerignore`, `README.md`, and `GUIDE.md`. Build from repository root with `docker build -f backend/Dockerfile .` or `docker build -f frontend/Dockerfile .`. Both Dockerfiles explicitly copy the required dossier files. A deployment configured with an app subdirectory as build context must use the repository root for these Dockerfiles.

## Verification

| Check | Result |
|---|---|
| TypeScript | Backend and frontend no-emit checks passed. |
| Fresh isolated PostgreSQL bootstrap | All five unchanged migrations applied from an empty database. This was verified for the publication fixture and existing review suite databases. |
| Atomic publication and revised Character test | 2/2 passed. Covered unauthorized actions, retired mutations, frozen and stale inputs, evidence and tier blockers, rollback on audit failure, two concurrent publication requests, positive 7.2 GraphQL, revised Xiangling C6, and blocked Raiden C0. |
| Existing isolated review integrations | 16/16 passed, including frozen checksum history, new-version separation, evidence, rights, separate confirmations and audit. |
| Character, Weapon, D1 and D3 regressions | 50/50 passed. |
| D2 importer and freeze regressions | 18/18 passed. |

| Isolated browser, HTTP and importer | Passed configured Admin login, all three review routes, anonymous Admin denial, a published 7.2 weapon rendered from PostgreSQL through HTTP GraphQL, and D2 CLI publishing a second explicitly confirmed synthetic fixture without replaying the first. |
| Release artifact layout | Passed a staged runtime check with freshly compiled backend code in production mode and the release dossier paths. The staged frontend served the existing Admin routes from copies of the required artifacts. |
| Full Docker image builds | Blocked. The backend Docker build reached npm/Prisma dependency installation and failed on npm registry DNS resolution (`EAI_AGAIN`). The frontend image build was outside the completed image checks. |

The sequential suites finished with **86 tests passed and zero failures**. Browser, CLI and artifact layout checks ran separately. Early verification attempts caught test harness issues with a TypeScript import, a scalar GraphQL selection and login-page hydration timing. Those checks passed after rerun.

## Development integrity

Read-only inspection confirmed all five migration checksums still match. Counts remain 131 characters, 279 weapons, 63 artifact sets, 862 materials and 127 character builds. Mitya’s two builds and default selection remain intact. The development CharacterTierRanking, WeaponTierRank, WeaponTierReview and weapon audit tables remain empty. No schema migration was needed. All write tests used isolated databases.

## Remaining blockers and readiness

**Real Admin review can begin in a correctly configured local environment** using the revised queues. The three evidence blockers and two weapon tier-confirmation requirements still apply. The existing development services have no Admin credentials configured. Release-image usage remains blocked until both Docker images are built and smoke-tested with registry access.

Historical materialized rank collisions will fail closed and need explicit reconciliation if encountered in another environment. No real ranking approvals, imports, or rights verifications were run. The isolated test services were stopped after verification.
