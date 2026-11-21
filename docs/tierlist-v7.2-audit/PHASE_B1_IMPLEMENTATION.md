# Character Tier List Phase B1 — Implementation Report

**Decision implemented:** APPROVE ADDITIVE SCHEMA + INDEPENDENT GENSHINHUB RANKING.  \n**Not approved / not executed:** import or publication of the 292 `SOURCE_DERIVED` Genshin-Builds records.  \n**Target:** development PostgreSQL `127.0.0.1:5434/genshinhub`. Production untouched.

## 1. Schema đã triển khai

`backend/prisma/schema.prisma` now contains the approved additive tier-ranking infrastructure:

- Enums: `TierListRole`, `TierListTier`, `TierListConstellation`, `TierListApprovalStatus`, `TierListDerivation`.
- Model: `CharacterTierRanking` with Character FK, role, tier, constellation, game version, explanations, full provenance, derivation, approval status, review metadata and timestamps.
- Unique key: `@@unique([characterId, role, constellation, gameVersion])`.
- Indexes: character, role+tier, gameVersion+approvalStatus, derivation+approvalStatus.
- `Character.tierRankings` back-relation only.

Legacy fields remain untouched: `Character.tier`, `role`, `recommendedC`, `tierNoteEn/Vi`, `TierRank`, and existing Admin data.

Concurrent Multi-Build Prisma edits appeared in the working tree during execution. They were **not authored by this phase**, are **not applied to the database**, and were excluded from the generated SQL. The Phase B1 SQL was generated from `HEAD` schema plus only the approved ranking proposal.

## 2. Database migration status

- Migration file: `backend/prisma/migrations/20261120151000_add_character_tier_rankings/migration.sql`
- SQL SHA-256: `01e70c7b6d98984628d433f4312544ca3448cc3e398c017ba3de7c0ed578f498`
- Objects created: 5 enum types, `CharacterTierRanking`, 5 indexes, 1 FK. No `DROP`, `UPDATE`, `DELETE`, `TRUNCATE`, or alteration of `Character`/`TierRank`.
- The DB was non-empty with no migration baseline, so `prisma migrate deploy` initially returned `P3005`. The reviewed SQL was applied manually inside a single `BEGIN/COMMIT` transaction, then recorded with `prisma migrate resolve --applied 20261120151000_add_character_tier_rankings`.
- `npx prisma migrate status`: **Database schema is up to date!**
- `_prisma_migrations` now records the one applied Phase B1 migration.
- `backend/prisma/migrations/migration_lock.toml` was added (`provider = "postgresql"`).
- Prisma Client regenerated: `npx prisma generate` succeeded.

## 3. Backup và rollback reference

- Container verified: `genshinhub-postgres`, image `postgres:15-alpine`, port `127.0.0.1:5434->5432/tcp`.
- Pre-migration dump: `backend/backups/tierlist-b1/pre-b1-2026-11-20T08-09-22Z.dump`
- Dump SHA-256: `b8954450dcce8c78d8a0e6dc7911cc32b05972b829cb7609aba275b13acdd92b`
- Restore list: `backend/backups/tierlist-b1/pre-b1-2026-11-20T08-09-22Z.restore-list.txt` (90 entries)
- Restore capability verified by restoring into temporary DB `genshinhub_b1_verify_1795162173`, checking `131|0` (`Character|TierRank`) and dropping that temporary DB.
- Manual rollback SQL: `backend/prisma/migrations/20261120151000_add_character_tier_rankings/rollback.sql`
- Rollback sequence: apply `rollback.sql` to development only, then `npx prisma migrate resolve --rolled-back 20261120151000_add_character_tier_rankings`. Legacy data is not touched by rollback.

## 4. Legacy data integrity

- Pre-migration legacy checksum: `dc1a02c44cc7b2a4c3542518193c48f5`
- Post-migration/post-integration checksum: `dc1a02c44cc7b2a4c3542518193c48f5` — **unchanged**.
- Counts after migration: `Character = 131`, tiered `121`, `TierRank = 0`.
- The integration probe creates temporary ranking rows and rolls them back; final count is `CharacterTierRanking = 0`.
- No legacy Admin field was updated; no `Character` or `TierRank` row was deleted.

## 5. GraphQL verification

Added and wired through `backend/src/graphql/index.ts`:

- Enums and `CharacterTierRanking` type.
- Public `characterTierRankings(characterId, role, tier, constellation, gameVersion, limit)`.
- Admin-only `adminCharacterTierRankings(..., approvalStatus, derivation, limit)`.
- Admin-only `upsertCharacterTierRanking`, `approveCharacterTierRanking`, `rejectCharacterTierRanking`.

Verified with an executable schema:

- Public query hard-filters to `approvalStatus = APPROVED` **and** `derivation = INDEPENDENT`.
- Public query does not expose review-status filters.
- Admin query without admin context returns `Unauthorized`.
- Admin query with admin context can filter all statuses.

## 6. Admin protection

- All review queries and mutations reuse the server-side admin guard (`context.user.isAdmin` / `context.isAdmin`).
- `upsert` always creates/updates drafts as `PENDING_REVIEW`, clears review metadata, and cannot set approval directly.
- `approve` accepts only `INDEPENDENT` rows; `SOURCE_DERIVED_CANNOT_BE_APPROVED` otherwise.
- A `SOURCE_DERIVED` row cannot be relabelled `INDEPENDENT` (`SOURCE_DERIVED_DERIVATION_IMMUTABLE`).
- An `APPROVED` row cannot be modified by a research draft (`APPROVED_RANKING_IMMUTABLE`).
- Actor is derived from authenticated context, never from mutation arguments.
- Rejection reason and acting Admin are stored.

## 7. Number of approved rankings

**0**. No ranking was created, scored, or approved.

## 8. Number of pending rankings

**0**. The integration probe rows were deliberately rolled back. No draft/backfill was imported.

## 9. Source-derived records excluded

- All **292** Genshin-Builds-derived snapshot records remain research documentation only.
- **0** of them are in PostgreSQL.
- 2 `traveler_cryo` records remain `UNMATCHED` and excluded; no new Character was created.
- No derivation was converted from `SOURCE_DERIVED` to `INDEPENDENT`.

## 10. Tests passed

Commands run from `backend/` with `TS_NODE_COMPILER_OPTIONS='{"rootDir":"./src"}'`:

- `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.test.ts` — 13/13 pass.
- `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts` — 3/3 pass.
- `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/migration.test.ts` — 2/2 pass.
- `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.integration.test.ts` — 1/1 pass.
- `npx ts-node --transpile-only src/graphql/dataloaders/index.test.ts` — 1/1 pass (previous ordering regression still green).
- `npx prisma validate` — valid.
- `npx prisma migrate status` — up to date.
- `npx prisma generate` — succeeded.
- `npx tsc --noEmit` — no errors.

Not run: browser tests (no UI/CSS/animation change), `prisma db push`, `migrate dev`, production commands.

**ESLint:** backend has no ESLint config or TypeScript ESLint parser in `backend/package.json`; the mandated ESLint command could not be run meaningfully without introducing unrelated tooling. This remains a tooling gap, not a claimed pass.

## 11. Files changed

Created/modified by Phase B1:

- `backend/prisma/schema.prisma` — tier-ranking additions only; concurrent Multi-Build edits left intact.
- `backend/prisma/migrations/migration_lock.toml`
- `backend/prisma/migrations/20261120151000_add_character_tier_rankings/migration.sql`
- `backend/prisma/migrations/20261120151000_add_character_tier_rankings/rollback.sql`
- `backend/src/graphql/index.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.schema.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.resolvers.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.service.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.test.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts`
- `backend/src/graphql/modules/characterTierRanking/migration.test.ts`
- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.integration.test.ts`
- `backend/backups/tierlist-b1/*`
- `docs/tierlist-v7.2-audit/SCHEMA_PROPOSAL.md` — status updated to implemented.
- `docs/tierlist-v7.2-audit/APPROVAL_PACKAGE.md` — status updated to Phase B1 approved.
- `docs/tierlist-v7.2-audit/INDEPENDENT_RANKING_WORKFLOW.md`
- `docs/tierlist-v7.2-audit/PHASE_B1_IMPLEMENTATION.md`

Not committed, pushed, merged, or deployed.

## 12. Remaining BLOCKED

- No independent ranking batch has been approved; 0 rows exist. The evidence-ready candidate list is in `INDEPENDENT_RANKING_WORKFLOW.md`, with no tier values assigned.
- Genshin-Builds editorial content rights remain unverified; no import or republishing.
- 203 structural differences / 175 manual-review flags remain unresolved for future ranking decisions.
- `traveler_cryo` remains unmatched and excluded.
- 194 missing explanations remain `NEEDS_REVIEW`.
- Multi-Build schema edits in the working tree still have no migration and require their own approval; they were not applied here.
- Backend ESLint tooling is not configured.
- No frontend data-source switch, Tier List redesign, Weapon Tier, Character Build, commit, push, merge, or deploy was performed.
