# Weapon Tier List — audit & draft summary (DATA ONLY, NOT APPLIED)

**Date:** 2026-11-20
**Branch:** `feat/balanced-fantasy-motion`
**Database:** development PostgreSQL container `genshinhub-postgres` only. No production connection. Zero writes.

## Required status labels

| Label | State | Evidence |
|---|---|---|
| `SOURCE REVIEWED` | YES | Genshin-Builds weapons page parsed from embedded structured props (`weaponsMap`, `tierlist` for 5 types × 3 roles). Raw props and HTML checksums in this directory. |
| `DATA MATCHED` | YES | 220 distinct source weapon names → genshin-db 5.2.15; 198 distinct local `Weapon.id` matched; 0 UNMATCHED, 0 rarity/type mismatches. All 9 required test IDs verified. |
| `RIGHTS VERIFIED` | NO | See `RIGHTS_REVIEW.md`. No license for republication of the site's editorial table; only independent draft data. |
| `DRAFT READY` | YES | 296 records, source snapshot, mapping, validation, diff, schema proposal and tests are written. |
| `APPROVED` | NO | No Admin approval. |
| `DATABASE APPLIED` | NO | `Weapon` remains 279 rows / 0 tiered / 0 role; `TierRank` remains 0 rows. |
| `GRAPHQL VERIFIED` | NO | No schema/DB change; no new GraphQL field exists yet. |
| `FRONTEND VERIFIED` | NO | No UI or data-binding change was made. Weapon tab still shows `DATA PENDING`. |

## What the source actually contains

- 5 weapon types, 3 roles (`Main DPS`, `Sub DPS`, `Support`), **5 labelled tiers only**: `SS, S, A, B, C` (keys `0..4`).
- A sixth structured key `5` has **no tier label** in the rendered page. Its 30 cells were recorded as `SOURCE_MISSING`/unranked and **excluded** — no tier was invented, and no leftover weapon was dumped into `D`.
- The page publishes **no game version** and **no refinement assumption**. Therefore every record has `gameVersion = null` (`SOURCE_MISSING`) and `refinementAssumption = UNSPECIFIED`. No R1/R5 default was applied.
- GameWith cross-check title confirms **7.2**, but it is a different source and was not merged into the snapshot.

## Development DB baseline

| Metric | Value |
|---|---|
| `Weapon` records | 279 |
| Weapons with tier | 0 |
| Weapons with role | 0 |
| `TierRank` rows | 0 (display config only) |
| `CharacterWeapon` rows | 610 / 194 distinct raw refs |
| `WeaponTierRank`-style model | none exists |

Current fallback `frontend/data/tierlist.ts` contains hard-coded weapon tiers; these are display fallbacks, not editorial rankings. Admin data (`Weapon.tier`, `Weapon.role`) is empty, so there is no Admin ranking to overwrite. The Admin tier-list page writes exactly those two general fields and cannot store per-role tiers, refinement, explanation, version or review status.

## Snapshot numbers

- 296 ranked cells: `SWORD` 64, `CLAYMORE` 53, `POLEARM` 57, `BOW` 60, `CATALYST` 62.
- Roles: `MAIN_DPS` 131, `SUB_DPS` 111, `SUPPORT` 54.
- Tiers: `SS` 56, `S` 61, `A` 80, `B` 66, `C` 33. **`D` = 0** (never invented).
- 198 distinct verified local weapons; 89 weapons appear in more than one role.
- 38 records have newly authored, role-specific Vietnamese explanations (`PENDING_REVIEW`).
- 254 records lack sufficient character/build-specific evidence → `explanationVi = null`, `NEEDS_REVIEW`.
- 4 cells are `DISPUTED` because source publishes two tiers for one weapon+role.
- 296 records carry `SOURCE_MISSING` because the page has no game version.

## ID mapping and internal recommendations

- All 9 required test cases verified: Light of Foliar Incision `11512`, Summit Shaper `11504`, Xiphos' Moonlight `11418`, Favonius Sword `11401`, Sacrificial Sword `11403`, Thrilling Tales of Dragon Slayers `14302`, Staff of Homa `13501`, Aqua Simulacra `15508`, The Widsith `14402`.
- `CharacterWeapon.weaponId` is inconsistent: only 6 rows use a numeric `Weapon.id`; 573 rows store a Vietnamese slug and 31 rows do not resolve to any weapon. Unique slug matches were resolved only for context, never as a ranking input. 236 draft records now carry approved-character context; no count-based tiering was used.

## Source conflicts

`prospectors_drill` / local `13427` (Prospector's Drill) appears in both `A` and `B` for `MAIN_DPS` and `SUB_DPS`. All four cells are `SOURCE_CONFLICT` + `DISPUTED` and must be excluded from any apply until Admin resolves the discrepancy. The accompanying `DUPLICATE_RANKING` validation warnings are the same conflict expressed as duplicate logical keys.

## Diff summary

`diff-report.csv` / `.md` use the required columns. Status counts (non-exclusive):

`NEW=296`, `SOURCE_MISSING=296`, `EXPLANATION_MISSING=258`, `NEEDS_REVIEW=254`, `SOURCE_CONFLICT=4`, `DISPUTED=4`. `ADMIN_CONFLICT=0` because no current Admin weapon tier exists.

## Blocking items

1. Rights decision: independent draft (current state) vs written reuse permission.
2. Admin decision on the additive schema in `SCHEMA_PROPOSAL.md`.
3. Resolution of all `DISPUTED`, `NEEDS_REVIEW`, `SOURCE_MISSING` and `EXPLANATION_MISSING` rows.
4. Decision whether a weapon page without published version/refinement may be stored with explicit `SOURCE_MISSING`/`UNSPECIFIED` markers.
5. Explicit approval, then dev-DB snapshot, dry-run and scoped apply. No apply has been performed.

## Files

- `source-raw.json`, `source-en.html` — raw source with checksums.
- `source.json` — normalized grid, 296 ranked + 30 excluded cells.
- `id-mapping.json`, `current-db.json` — mapping and rollback snapshot.
- `snapshot-weapon-tier.draft.json` — 296 unreviewed records.
- `validation-report.json`, `diff-report.csv/.md`, `diff-summary.json`.
- `SCHEMA_PROPOSAL.md`, `RIGHTS_REVIEW.md`, `README.md`.
- Pipeline: `backend/scripts/weapon-tier-audit/`.
