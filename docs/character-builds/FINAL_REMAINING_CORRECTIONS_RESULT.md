# GenshinHub 7.2 remaining Character corrections

Applied 10 weapon corrections and 11 artifact corrections across 15 development builds. Every equipment correction was read back from PostgreSQL. 10 of the 32 previously flagged error identities had their recorded data errors cleared. 44 of 44 identities still have an evidence or protected-revision gap, including draft rotation gaps on some corrected characters.

## Applied changes

| Character | Correction |
|---|---|
| Candace | Thương Diệu → Favonius Lance<br>Thánh Di Vật Đề Cử → Mix 2-Piece Tenacity of the Millelith & 2-Piece Vourukasha's Glow |
| Iansan | Chương Nhạc Lang Thang → Favonius Lance<br>Điển Tích Tây Phong → Prototype Starglitter |
| Illuga | Chương Nhạc Lang Thang → Favonius Lance<br>Điển Tích Tây Phong → Prototype Starglitter |
| Kachina | Thương Diệu → Footprint of the Rainbow<br>Thánh Di Vật Đề Cử → Husk of Opulent Dreams |
| Lohen | Chương Nhạc Lang Thang → Favonius Lance<br>Điển Tích Tây Phong → "The Catch" |
| Sandrone | Chương Nhạc Lang Thang → Katsuragikiri Nagamasa<br>Điển Tích Tây Phong → Favonius Greatsword |
| Barbara | Thánh Di Vật Đề Cử → Maiden Beloved |
| Dahlia | Thánh Di Vật Đề Cử → Mix 2-Piece Tenacity of the Millelith & 2-Piece Vourukasha's Glow |
| Dori | Thánh Di Vật Đề Cử → Maiden Beloved |
| Lan Yan | Thánh Di Vật Đề Cử → Viridescent Venerer |
| Layla | Thánh Di Vật Đề Cử → Tenacity of the Millelith |
| Lynette | Thánh Di Vật Đề Cử → Viridescent Venerer |
| Sayu | Thánh Di Vật Đề Cử → Viridescent Venerer |
| Traveler (Anemo) | Thánh Di Vật Đề Cử → Viridescent Venerer |
| Nicole | Mix 2 bộ Tấn Công / Hiệu Quả Nạp → Mix 2-Piece Gladiator's Finale & 2-Piece Emblem of Severed Fate |

Equipment options were checked against the installed `genshin-db@5.2.15` mechanics and live catalog. Favonius recommendations remain conditional on eligible on-field CRIT hits. Artifact resistance shred assumes a compatible aura and an on-field Swirl by the wearer. Existing equipment positions were retained. No comparative ranking, universal ER target, or team uptime was inferred from these corrections. Artifact recommendations use catalog set labels because the current model has no artifact-set ID column. The before/after file records corresponding canonical IDs and exact row metadata.

Comparison pages checked for the class conflicts include [Candace](https://genshin-builds.com/en/character/candace), [Iansan](https://genshin-builds.com/en/character/iansan), [Illuga](https://genshin-builds.com/en/character/illuga), [Kachina](https://genshin-builds.com/en/character/kachina), [Lohen](https://genshin-builds.com/en/character/lohen), and [Sandrone](https://genshin-builds.com/en/character/sandrone). Kachina’s page displayed 7.1 and was used for comparison only. The replacement choices use the pinned local kit and weapon data.

## Remaining gaps

- Bennett’s four exact teammate aliases and 12 weapon aliases, plus Xiangling’s 19 weapon aliases, remain on checksum-bound approved defaults. The equipment and team rows are attached to the live build ID. A separate revision cannot become the visible default through the existing review rules while leaving that approved default intact. The matrix preserves the exact proposed values and current checksums.
- Six Traveler stat tables remain held. The generic Aether record provides a different scope, and the inspected variant pages did not provide a compatible per-level replacement.
- Unresolved artifact rows are listed with their actual labels and role-specific questions in the matrix. Existing alternatives such as Xingqiu’s Energy-dependent build were preserved.
- **Alyosha**. Measure Alyosha’s particle yield and collection in the recurring 70-Energy rotation. Verify which buffs and healing cover Mitya’s active window. Choose the sole Noblesse carrier if Valeriy also has this option.
- **Odette**. Verify repeatable special-Skill timing, Cryo Swirl conversion and the double’s Cryo application with the draft’s Hydro and double-Anemo lineup. Check Favonius CRIT or Finale’s healing clearance, and attribute the reaction to its real owner.
- **Valeriy**. Verify a repeatable swap-back window to consume Momentum, the actual number of allied Electro hits and who receives the directive. Check shield coverage and distinguish Stellar-Conduct and ordinary coefficients.
- **Vesna**. Verify the order and number of Essence builders and spenders under the draft team’s Cryo aura and healing windows. Check Finale’s Bond of Life clearance and whether burst cadence is feasible. No verified number of rotations or damage ranking is assumed.
- **Vodyanitsa**. Verify off-field Skill hit timing for Tenacity, the actual 20s Thrilling Tales cooldown alignment, the intended recipient, and whether to skip Burst outside Prototype Amber rotations. The draft’s Shenhe slot supports Odette’s Cryo output; it is not assumed to buff Vesna’s Anemo damage.

Pinned Thrilling Tales of Dragon Slayers R5 grants the next character 48% ATK for 10 seconds, with a 20-second cooldown. The 24% value is R1. The Vodyanitsa draft preserves this value while staying unpublished.

## Validation

- Development identity PostgreSQL `127.0.0.1:5434/genshinhub`. Fresh backup restored in network-isolated PostgreSQL. All 22 application-table digests matched the pre-write state. Backup SHA-256 `23abc6285587a4d8ea8ee32cb31ddaf8e8c7572eae423048d646a50ff2607346`.
- Only the four expected tables changed. The 51 committed row writes comprise 21 equipment rows, 15 build revision increments, and 15 truthful maintenance events. All 369 prior audits matched their original digest, the 15 new events matched live revisions, and every PostgreSQL foreign-key constraint was validated.
- Exact normalized inventory comparison confirmed 219 total builds, 96 approved payloads, 126 defaults, and 88 rejected or archived builds. Their counts, protected contents, existing stages, and unrelated recommendations matched the baseline. Tier List and migration table digests matched. Production was never accessed.
- GraphQL PASS. Queried all 131 local Character details, visible builds and default IDs, and checked the missing-character response. All 21 changes also matched localized equipment values and canonical artifact links.
- Browser PASS. 44 localized checks passed. The checks covered English desktop and Vietnamese mobile for each changed character, plus the requested comparison pages.
- Development frontend `http://127.0.0.1:3001/en` and GraphQL `http://127.0.0.1:4000/graphql`.

## Execution summary

```text
CATALOG: 131
PREVIOUS_REMAINING_ERROR_IDENTITIES: 32
ERROR_IDENTITIES_RESOLVED_THIS_RUN: 10
ERROR_IDENTITIES_STILL_REMAINING: 22
PREVIOUS_OPEN_IDENTITIES: 44
OPEN_IDENTITIES_RESOLVED_THIS_RUN: 0
OPEN_IDENTITIES_STILL_REMAINING: 44
BENNETT_ALIASES_CORRECTED: 0/4
MISSING_BUILDS_COMPLETED: 0/5
WEAPON_CORRECTIONS_APPLIED: 10
ARTIFACT_CORRECTIONS_APPLIED: 11
MAIN_STAT_CORRECTIONS_APPLIED: 0
SUBSTAT_CORRECTIONS_APPLIED: 0
TALENT_CORRECTIONS_APPLIED: 0
TEAM_CORRECTIONS_APPLIED: 0
CHARACTER_FACT_CORRECTIONS_APPLIED: 0
BACKUP_RESTORE: PASS
DATABASE_INTEGRITY: PASS
GRAPHQL: PASS
BROWSER: PASS
EXISTING_VALID_BUILDS_PRESERVED: YES
ADMIN_HISTORY_PRESERVED: YES
TIER_LIST_UNCHANGED: YES
PRODUCTION_NOT_ACCESSED: YES
FINAL_STATUS: COMPLETE_WITH_EVIDENCE_GAPS
```
