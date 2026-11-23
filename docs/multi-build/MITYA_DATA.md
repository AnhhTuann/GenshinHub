# Mitya build data — approval-backed facts only

Both source documents remain unchanged:

- Drafts: `backend/scripts/build-audit/drafts/mitya-main-dps.json`, `mitya-support-revised.json` (both still `PENDING_REVIEW`, as expected — approval lives in separate files).
- Approved: `backend/backups/build-audit/mitya-main-dps.approved.json` (`567e51a3…f3cd`), `mitya-support-revised.approved.json` (`263fd822…f2032`).

| Field | Main DPS (approved, not applied) | Support / Sub DPS (approved, applied) |
|---|---|---|
| Label | `C0 On-Field Main DPS` | `C0 Off-Field Support / Sub DPS` |
| Canonical playstyles | `MAIN_DPS` | `SUB_DPS`, `SUPPORT` |
| Weapons | 14525, 14521, 14502 | 14525, 14521, 14416, 14403, 14432, 14302 |
| Artifact options | 15026 / 15046 / 15003+15026 | 15017 / 15048 / 15003+15026 |
| Sands | Elemental Mastery | Elemental Mastery, Energy Recharge |
| Goblet | Elemental Mastery | Elemental Mastery |
| Circlet | CRIT Rate, CRIT DMG | CRIT Rate, CRIT DMG, Elemental Mastery |
| Substats | CRIT DMG, CRIT Rate, EM, ER | EM, CRIT Rate, CRIT DMG, ER |
| Talents | Normal Attack, Burst, Skill | Skill, Burst, Normal Attack |
| Teams | 2 | 3 |
| Mitya in team | 2× Main DPS (on-field) | 3× off-field (Sub DPS / Support) |
| Experimental team | none | 1 (Wriothesley / Mitya / Fischl / Diona) |
| Default after import | no | yes (preserve current live behaviour) |

## Rules to preserve

1. Do not edit either draft, either review note, or either approval block/checksum.
2. Do not copy any tier (including SS) or Best-in-slot claim into the build data; the drafts explicitly exclude that.
3. Keep `Wriothesley Cryo-Electro Support (EXPERIMENTAL DRAFT)` flagged experimental; its description says rotation and performance are untested and no tier is claimed.
4. Keep on-field and off-field lineups in their own builds; never merge them into one team list.
5. `Character.tier` and `Character.role` stay empty for Mitya — playstyle is build-scoped, not admin tier data.
6. The Main DPS import must be a second build with `isDefault = false`; the applied Support build must be verified as unchanged via checksum and dry-run.
