# Multi-build development runbook

The additive schema is in [20261120_character_builds.sql](../../backend/prisma/development-migrations/20261120_character_builds.sql). This development migration is a reviewed SQL file executed explicitly on the verified local Docker database. It is outside Prisma's automatically deployed migration directory. No legacy column was dropped, renamed, or rewritten.

## Target and backup

- Docker local socket, container `genshinhub-postgres`, host `127.0.0.1:5434`, database `genshinhub`, schema `public`.
- Full PostgreSQL archive, checksum, archive listing and transaction snapshots live under `backend/backups/multi-build/phase-b.R15Bly/`.
- Restore drill database `genshinhub_multibuild_test_b49` was restored from the archive before the live migration. Migration, backfill and the first and repeated pilot import were verified there.
- The development baseline hash was `86f3d819157333b9ffa57df58e13501e6e81e9b1b572e4668024431364230ab5`. Exact comparisons strip only the newly added build ownership and team review fields. They compare complete character, weapon, artifact, team and member rows, including IDs and order.

## Development operations

The scoped [migration runner](../../backend/scripts/build-audit/multi-build.cjs) checks the URL and PostgreSQL server identity, verifies the approvals against the working drafts, takes a transaction lock and writes a private snapshot before changing data. Its backfill action is intended for the rollout window before any second build or Admin revision. Its Main DPS action deduplicates against the approval checksum and verifies all scoped fields on repeat. The retired single-build apply and rollback commands reject writes for characters with profiles.

The development backfill attached 1,143 existing recommendation and team rows to 126 profiles. The other five characters have no profile. Mitya's Support/Sub DPS profile is `legacy-mitya` and remains the default. Main DPS is a separate published profile keyed by its approval checksum.

## Roll back reads without deleting data

On the development API process only, set `CHARACTER_BUILD_READ_MODE=legacy` and restart that process. The build switcher then receives no public profiles, the older GraphQL fields read the original scoped children and scalar columns, and writes through the new Admin build editor pause. Keep the build-aware API code deployed because pre-multi-build binaries query shared child tables by character ID. When a legacy profile has been revised by an Admin, the original child records are retained in a hidden baseline. The legacy reader uses that baseline.

To hide Main DPS while preserving history, archive only its non-default profile through the Admin editor after checking the current version. A full database restore would replace subsequent development changes and requires separate reconciliation. A destructive schema rollback is outside this rollout.

## Admin workflow

Open **Admin → Characters → Builds**, then **Manage character builds**. Select a profile and a section. Weapons, artifacts and team members are edited with catalog IDs in the section JSON editor. Save for review, then approve or reject the staged revision. Published content stays visible until the revision is approved. Setting a default requires a published build. Archive removes a non-default, non-baseline build from public reads while retaining records and history. The existing authenticated Admin proxy protects the editor. The history stores the previous and proposed values for an approved edit.

The development UI sources user-facing build data from an uncached detail query. Both public GraphQL field sets and the Admin editor use build-specific ownership. Catalog and character hero data remain character-scoped.
