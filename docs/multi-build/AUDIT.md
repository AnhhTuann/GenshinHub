# Multi-build audit — Giai đoạn A (read-only)

**Date:** 2026-11-20
**Scope:** Prisma schema, GraphQL, Admin, Character Detail, build-audit pipeline, development PostgreSQL only.
**No database write, migration, UI change, commit, push, or deploy was performed in this phase.**

## Current storage model

`backend/prisma/schema.prisma` gives every `Character` exactly one build:

| Data | Location today |
|---|---|
| `bestWeapons` | `CharacterWeapon[]`, relation `characterId` |
| `bestArtifacts` | `CharacterArtifact[]`, relation `characterId` |
| `teams` + ordered `TeamMember[]` | `CharacterTeam[]`, relation `characterId`; members keep `order` |
| `sands`, `goblet`, `circlet`, `subStatsPriority`, `talentPriority` | scalar arrays on `Character` |
| `tier`, `role`, `recommendedC`, `tierNoteEn/Vi` | scalar Admin fields on `Character` (must stay untouched) |

Read-only development census: 131 characters, 126 with build data, 610 weapon rows, 279 artifact rows, 254 team rows and 1,016 member rows. There is no build identifier anywhere, so two playstyles inevitably collide.

## Mitya: exact current state

- `Character.id = mitya`: `tier`, `role`, `recommendedC` are all empty; no tier was invented.
- Live build = approved **Support/Sub DPS**: 6 weapons (order 0–5), 3 artifact options (order 0–2), 3 teams (order 0–2), 12 team members (order 0–3 per team).
- The third team is `Wriothesley Cryo-Electro Support (EXPERIMENTAL DRAFT)` and its description explicitly says untested / not verified meta. It must stay experimental.
- Dry-run of `mitya-support-revised.approved.json` against dev DB: `status: PREVIEW`, `changes: []`, `protectedFields: []` — confirms the live data is exactly that approved build.

## Approved drafts

Both draft files still correctly say `status: PENDING_REVIEW`; the approved records are separate files with approval blocks and checksums:

| Approved file | Checksum | Playstyle label | Weapons / artifacts / teams |
|---|---|---|---|
| `backend/backups/build-audit/mitya-main-dps.approved.json` | `567e51a3…f3cd` | `C0 On-Field Main DPS` | 3 / 3 / 2 |
| `backend/backups/build-audit/mitya-support-revised.approved.json` | `263fd822…f2032` | `C0 Off-Field Support / Sub DPS` | 6 / 3 / 3 |

Both pass `verifyApproval()` (checksum, reviewer, rights reference, timestamp). Neither draft nor approved file was modified. Audit log `apply-20ebb664-…-audit.json` records the single successful Mitya apply (Support/Sub DPS) at 07:23Z; no Main DPS apply exists.

## Why a second build cannot be applied today

Read-only dry-run of the Main DPS approved file against dev DB returns:

```
status: PREVIEW
changes: []
protectedFields:
  bestWeapons, bestArtifacts, teams, sands, circlet,
  subStatsPriority, talentPriority
```

`apply.cjs` deliberately refuses to overwrite populated Admin/build fields. Applying it would destroy the approved Support build, so it must remain an approved-but-unapplied file until multi-build exists.

## Code paths that assume one build

| Layer | Current assumption |
|---|---|
| `frontend/app/[locale]/characters/[id]/page.tsx` | Fetches `character` once and passes `character.bestWeapons`, `bestArtifacts`, `sands/goblet/circlet/subStatsPriority/talentPriority`, `teams` into five section components. |
| `frontend/components/character-sections/*`, `EditableMetaTeamsSection` | Receive `characterId` + data; reorder/remove mutations identify rows only by row ID, not by build. |
| `backend/src/graphql/modules/character/character.resolvers.ts` | `Character.bestWeapons/bestArtifacts/teams` resolve through DataLoaders keyed by `characterId`. |
| `backend/src/graphql/dataloaders/index.ts` | Loaders group by `characterId`; `teamMembersLoader` groups by team ID. |
| `backend/src/mutations.ts` | `addCharacterWeapon`, `addCharacterArtifact`, `addCharacterTeam` and all reorder/remove mutations take character/row IDs only. |
| `backend/scripts/build-audit/apply.cjs` | Writes one playstyle into the single character record; `plan()` protects any populated field. |
| `frontend/components/admin/AdminEditableBuild.tsx` | JSON editor writes a single build via `upsertCharacter`. |
| `README.md` of build-audit | Explicitly says one approved playstyle per character with the current schema; multiple profiles need a separate model and separate approval. |

## What was implemented in Giai đoạn A (no approval needed)

- `backend/scripts/build-audit/playstyle.cjs` — generic, character-agnostic label → canonical `MAIN_DPS / SUB_DPS / SUPPORT` mapping.
- `backend/scripts/build-audit/playstyle.test.cjs` — 4 passing tests, including both approved labels.
- `backend/scripts/build-audit/multi-build-preflight.cjs` — read-only; verifies approval checksums, derives playstyles, detects duplicate playstyles, and reports on-field vs off-field teams and experimental teams. It opens no DB connection and writes no file.
- `docs/multi-build/SCHEMA_DIFF.md`, `MIGRATION_PLAN.md`, `COMPATIBILITY.md`, `MITYA_DATA.md`.

Preflight result: `READY_FOR_SCHEMA_REVIEW`; Main DPS → `["MAIN_DPS"]`, Support/Sub DPS → `["SUB_DPS","SUPPORT"]`, 2 vs 0 on-field Mitya teams, 0 vs 3 off-field Mitya teams, 0 vs 1 experimental team.

## Blocking gate

The schema in `SCHEMA_DIFF.md` needs explicit Admin approval before any `prisma migrate`, `db push`, data backfill, GraphQL/UI implementation, or Mitya Main DPS import.
