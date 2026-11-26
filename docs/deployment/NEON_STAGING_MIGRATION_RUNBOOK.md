# Neon staging: safe migration-history backfill (2026-11-24)

Scope: **staging only**. No production branch, deployment or database was read from or written to.
No row was deleted, updated or overwritten. No Admin account or approval was created.

## 1. Pre-state (verified, not assumed)

Neon project `jolly-cell-95415947`, staging branch `br-hidden-frost-aouh1xm1`
(direct, non-pooler endpoint; credentials were read from the local authenticated Neon CLI profile
and never printed, logged or committed).

| Property | Value |
| --- | --- |
| Tables | 8: `ArtifactSet`, `Character`, `CharacterArtifact`, `CharacterTeam`, `CharacterWeapon`, `Material`, `TeamMember`, `Weapon` |
| `_prisma_migrations` | absent |
| Rows | Character 124, Weapon 246, ArtifactSet 61, Material 766, CharacterWeapon 540, CharacterArtifact 253, CharacterTeam 0, TeamMember 0 |
| Enums | none |

The staging schema is an **older partial catalog schema**, not the repo's legacy baseline:
- missing baseline columns (`Character.talentMats/sands/goblet/circlet/subStatsPriority`, `CharacterWeapon.constellation/order`, `CharacterArtifact.order/constellation`, `CharacterTeam.order`, `TeamMember.order`, `Weapon.role`);
- missing baseline tables (`TierRank`, `User`, `UserFavorite`, `UserWishlist`, `UserTeam`, `Otp`);
- missing baseline indexes and foreign keys;
- **extra** `CharacterArtifact.sands/goblet/circlet/subStatsPriority`, populated in 248 of 253 rows with real build data.

Because those four columns contain real data, a direct `prisma migrate diff --script` application was
**rejected**: it proposed `DROP COLUMN` on all four. No generated destructive diff was applied.

## 2. Recoverable backups / validation environment

Created with Neon's copy-on-write branching, using `--no-secrets` so no credentials appeared in output:

| Purpose | Branch name | Branch ID |
| --- | --- | --- |
| Recovery point (kept untouched) | `backup-before-migration-20261124` | `br-silent-truth-aoionhu0` |
| Rehearsal target | `migration-validation-20261124` | `br-ancient-sun-aocjp64w` |

Parent of both: `br-hidden-frost-aouh1xm1`.

## 3. Plan (validated before staging)

`backend/scripts/staging/reconcile-baseline-staging.sql` is additive and idempotent:
`ADD COLUMN IF NOT EXISTS`, `CREATE ... IF NOT EXISTS`, and guarded `ADD CONSTRAINT` blocks.
It has no `DROP`, `DELETE`, `TRUNCATE` or `UPDATE`. It deliberately keeps the four legacy
`CharacterArtifact` stat columns.

Order applied on the rehearsal branch:
1. run the reconciliation SQL;
2. `prisma migrate resolve --applied 20261120000000_legacy_baseline`;
3. `prisma migrate deploy` (six remaining migrations, in order).

Rehearsal result:
- 26 tables (25 Prisma models + `_prisma_migrations`), all 7 migrations recorded;
- every original row count unchanged; `Admin`, `User`, `AuthSession` all empty (no admin data created);
- 248/253 legacy artifact rows still populated in all four columns;
- `prisma migrate diff` residual = only the four intentionally retained legacy columns.

## 4. Applied to staging

The identical plan was applied to `br-hidden-frost-aouh1xm1`:

```
baseline reconciliation ......... Script executed successfully.
migrate resolve ................. Migration 20261120000000_legacy_baseline marked as applied.
migrate deploy .................. 6 migrations applied, "All migrations have been successfully applied."
migrate status .................. 7 migrations found; "Database schema is up to date!"
```

Migrations now recorded in staging, in order:
1. `20261120000000_legacy_baseline` (backfilled after additive reconciliation)
2. `20261120145000_add_character_builds`
3. `20261120151000_add_character_tier_rankings`
4. `20261120153500_add_weapon_tier_rankings`
5. `20261120160000_add_weapon_tier_review_workflow`
6. `20261121100452_add_database_backed_auth`
7. `20261121141000_add_maintenance_build_status`

Post-apply staging verification: 26 tables, the same counts as pre-state for every catalog table,
7 migrations recorded, `Admin = 0`, and the only schema drift is the four preserved legacy columns.

## 5. Intentional residual drift

`prisma migrate diff --from-url <staging> --to-schema-datamodel backend/prisma/schema.prisma`
still reports exactly:

```
[*] Changed the `CharacterArtifact` table
  [-] Removed column `circlet`
  [-] Removed column `goblet`
  [-] Removed column `sands`
  [-] Removed column `subStatsPriority`
```

This is expected and intentional: those columns hold real staging data and the repo's own
`add_character_builds` migration never dropped them either. Do not "fix" this by dropping them.
A future, explicitly authorized data-migration/release could copy the values into `CharacterBuild`
and then remove them; that is out of scope here.

## 6. Recovery

If a rollback is ever authorized, create a new branch from `backup-before-migration-20261124`
(or reset a disposable branch to it) and point the staging app at that endpoint. Do not reset or
overwrite the original staging branch without explicit owner approval.
