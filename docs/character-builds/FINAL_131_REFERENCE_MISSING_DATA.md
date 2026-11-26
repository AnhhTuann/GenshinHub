# FINAL 131 REFERENCE MISSING / UNVERIFIABLE DATA

Generated: 2026-11-21T08:42:33.798Z

This report lists data that could **not** be verified, added or imported without fabrication. It is not a list of defects in the corrected builds.

## 1. Missing supported fields remaining (6)

| Identity | Status | Detail |
|---|---|---|
| `traveler` | NO_REFERENCE_AVAILABLE | Index has no generic Traveler page; local legacy default retains `NOT_VERIFIED` artifact row. |
| `traveler-boy` (`manekin`) | NO_REFERENCE_AVAILABLE | Page exists but publishes 0 curated builds and 0 teams; local legacy default retained. |
| `traveler-girl` (`manekina`) | NO_REFERENCE_AVAILABLE | Page exists but publishes 0 curated builds and 0 teams; local legacy default retained. |
| `danica` | NO_REFERENCE_AVAILABLE | Beta roster entry (2026-11-02), no published page, explicitly "names and values subject to change". |
| `anastasya` | NO_REFERENCE_AVAILABLE | Beta roster entry (2026-11-02), no published page, explicitly "names and values subject to change". |
| `traveler_cryo` | EVIDENCE_BLOCKED | Released 2026-08-12 with a v7.2 page (2 builds, 5 teams), but the source provides no canonical local Character ID, portrait/splash assets or base HP/ATK/DEF tables. Creating a local identity from guide data alone would be fabrication. |

## 2. Unverifiable source-field categories (4)

1. **Team rotations and combat timings.** 243 source-attributed teams were imported with canonical member IDs and source role labels. Rotation text was not independently measured, so every new team is marked `EXPERIMENTAL` with an explicit note.
2. **Skill, passive and constellation prose.** All 131 source pages expose kit text (skills/passives/constellations), but the local Character schema has no corresponding fields and the text is third-party editorial copy. It was inspected, not imported or reproduced.
3. **Pages without team data (8).** `manekin, manekina, traveler_dendro, traveler_electro, traveler_geo, traveler_hydro, traveler_pyro, traveler_anemo`. No teams were invented for these identities.
4. **Pages without curated build data (2).** `manekin, manekina`. These correspond to the local `traveler-boy` / `traveler-girl` identities; their legacy defaults were left intact.

## 3. Generic / non-canonical source artifact IDs skipped

The following source stat-combination tokens were not imported as artifact sets:

`80elementalmastery_set`, `18atk_set`, `15healingbonus_set`, `20hp_set`, `15hydrodmg_set`, `20energyrecharge_set`, `25physicaldmg_set`, `and5_physical_dmg_set`, `15anemodmg_set`, `and_15_anemo_dmg_set`.

## 4. Remaining legacy placeholders

11 obsolete `NOT_VERIFIED` artifact rows in retained legacy builds were replaced with sets from the verified current default. The 3 rows that remain are the no-guide Traveler defaults listed in section 1.

## 5. Explicitly not done

- No production database, deployment, Tier List, weapon-tier review or admin approval was touched.
- No commit, push, `git reset`, `git stash` or `git clean` was performed.
- No fabricated weapon/artifact/team ID, refinement, talent rotation, measured damage figure or verdict was introduced.
