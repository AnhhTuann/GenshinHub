# GenshinHub critical stabilization

## Admin JWT

Admin login, middleware and both Admin proxies previously fell back to a predictable signing key. They now share one Admin session helper. Missing or blank `ADMIN_JWT_SECRET` disables session issuance and verification. Verification requires HS256, the GenshinHub issuer, the Admin audience, expiry, issue time, and the Admin role. The login action checks the configured password before setting the existing HttpOnly, SameSite Strict cookie. The proxy still obtains the backend key from server configuration, and the backend continues to authorize the request with its own key check.

Deployments using the old cookie format require a fresh login. Public routing remains available when Admin auth is disabled.

## Character ranking rights

The generic ranking upsert accepted client-supplied rights flags and audit entries. It now strips reserved metadata, appends an audit event with the server principal and time, and preserves the audit history already stored on the row. A draft upsert clears prior rights verification. The dedicated rights operation records the verifier, timestamp, basis and a server-authenticated proof bound to the ranking ID and content checksum. It uses the existing backend `ADMIN_JWT_SECRET` and keeps the proof out of GraphQL results. Old pending rights metadata does not confer approval eligibility. Older drafts require fresh rights verification, and stale content must be resubmitted.

Approval requires a pending independent draft, the caller’s current version and checksum, a matching recomputed content checksum, and valid rights provenance. The approval update uses the same row version and status that were checked. The ranking resolver emits an ISO `updatedAt` so the Admin UI can round-trip the version token. The approval and audit entry are written together in one row update. Rejected records require an explicit resubmission and another verification. Rotating the backend secret invalidates rights proofs on drafts awaiting approval. Existing approved records are undisturbed.

## Materials CORS

Materials fetches GraphQL in the browser. The Next.js server on port 3010 was outside the backend’s origin allowlist, so the browser stopped the request at preflight. Express now adds the exact `http://localhost:3010` and `http://127.0.0.1:3010` origins in development. The existing production origin configuration, methods and credential behavior are preserved.

## Files changed

| Area | Files |
|---|---|
| Admin sessions | `frontend/lib/adminSession.ts`, `frontend/lib/adminAuth.ts`, `frontend/middleware.ts`, `frontend/app/api/admin/graphql/route.ts`, `frontend/app/api/admin/upload/route.ts` |
| Character rights | `backend/src/graphql/modules/characterTierRanking/characterTierRanking.service.ts`, `backend/src/graphql/modules/characterTierRanking/characterTierRanking.resolvers.ts`, `backend/src/graphql/modules/tierReviewSecurity.ts`, `frontend/components/admin/CharacterTierReviewClient.tsx` |
| CORS | `backend/src/index.ts` |
| Tests | `frontend/lib/adminAuth.test.ts`, `frontend/lib/adminSession.test.ts`, `backend/src/graphql/modules/characterTierRanking/characterRights.integration.test.ts`, `backend/src/graphql/modules/characterTierRanking/characterTierRanking.test.ts` |
| Report | `docs/audit/GENSHINHUB_CRITICAL_FIXES.md` |

## Verification

The pre-fix PostgreSQL regression failed because upsert persisted a supplied rights flag. The post-fix test ran GraphQL against a separate local database, `genshinhub_test_character_rights_critical20261120`, after checking its actual name. It verifies rejection of forged metadata and legacy rights flags, unauthorized verification, stale versions, incorrect checksums, missing version, and rejected status. It also verifies audit preservation and successful approval after authenticated re-verification of a synthetic ranking. The disposable database was left in place.

Five Admin session and login tests passed. They cover missing configuration, invalid signatures, malformed tokens, a signed user-role token, and a correctly configured Admin login. The development frontend has no configured Admin credentials. Its protected redirect and anonymous proxy behavior are covered separately from the configured login tests.

| Check | Result |
|---|---|
| Backend and frontend TypeScript | Both passed with `tsc --noEmit --incremental false`. |
| Prisma | `prisma validate` and read-only `prisma migrate status` passed. Five migrations are applied. |
| Frontend Admin tests | `vitest run lib/adminSession.test.ts lib/adminAuth.test.ts` passed 5/5. |
| Isolated Character Rights GraphQL/PostgreSQL | `node --test -r ts-node/register src/graphql/modules/characterTierRanking/characterRights.integration.test.ts` passed 1/1 with the isolated database selected by `CHARACTER_RIGHTS_TEST_DATABASE_URL`. |
| Character and Weapon Tier authorization and security | 44/44 passed across character service/GraphQL, weapon service/GraphQL/DataLoader, and shared D1 security tests. |
| Existing B2, B2.5, C1 and D3 regressions | 24/24 passed. This includes public tier emptiness, Mitya’s two builds and one default, and revised weapon checksum and import guard coverage. |
| Browser and preflight | The intended origins returned HTTP 204 with matching origin headers and no credential header. An unlisted origin received no allow-origin header. At 1440px and 390px, Materials received HTTP 200 with 862 records and rendered catalog content. The homepage, character and weapon lists and details, both DATA PENDING tier tabs, and the protected Admin redirect passed at both sizes. The anonymous GraphQL proxy returned 401 and direct backend Admin GraphQL denied the unauthenticated query. |

The sequential regression finished with 74 passing automated tests and zero failures. The browser checks ran separately with a single Chromium instance and sequential pages. Authenticated browser login against development was outside coverage. Valid configured login was exercised by the server-action test.

## Development database and runtime

Read-only verification confirmed PostgreSQL 15.20 at `127.0.0.1:5434/genshinhub`, schema `public`. All five migration checksums match. Catalog counts remain 131 characters, 279 weapons, 63 artifact sets, 862 materials and 127 character builds. Character rankings, weapon rankings, weapon candidate reviews and their audit counts remain zero. No development data or migration files changed.

The existing Next.js and nodemon processes picked up the changes through their watchers and remain running.

- Frontend at [http://localhost:3010/en](http://localhost:3010/en).
- Materials at [http://localhost:3010/en/materials](http://localhost:3010/en/materials).
- Backend at [http://localhost:4000/graphql](http://localhost:4000/graphql), with HTTP 200 from `/health`.

## Remaining weapon P1 and next step

Retain `weaponTierReview` as the authoritative candidate service for FROZEN and D2_REVISED decisions. Keep `weaponTierRanking` as the published read model. The frozen and D3 importers currently stage separate rank upsert, rights and approval calls. The direct rank approval API can bypass candidate eligibility, and separate audit writes create room for incomplete history.

The next implementation should replace both apply sequences and standalone rank approval with one transaction that rechecks candidate state, version, required evidence, rights, and checksum immediately before materializing the rank and audit entries. Preserve existing audit history and the two versioned dossiers. Run replay, cancellation, concurrency and audit failure tests on isolated fixtures before retiring the overlapping code. No weapon workflow changed in this stabilization.
