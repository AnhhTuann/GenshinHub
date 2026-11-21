# A02 final Character Build review

**REVIEW_READY.** Three C0 candidates, zero development stages, approvals, or imports. The review package is `character-build-catalog-7.2-r3-a02`. It supersedes the frozen A02 R2 batch `07c4298b06cc15b03ad354499559477068a170ef88795ea5d882f232b160192d`.

**A02 R3 batch SHA-256** `38b2f279e6e23699bfbcd46cb4de94b5106ad242b22dc96354754b5954aefc34`

| Candidate | Existing default (v1) | Baseline SHA-256 | R3 candidate SHA-256 |
|---|---|---|---|
| `albedo:1` | `legacy-albedo` | `54078ff392c9436610c6e6a99aaa8f5efb2e677f69bbedad4edd758636da307f` | `a23feb828657d1ba053aca5fd53b5bd3a60813de382dfc271877c2b800cefd20` |
| `baizhu:1` | `legacy-baizhu` | `726a8ea9b5111b46cac430cdc2ee5c10fe62745ab09dc777ec803ab5c0b3ad50` | `6c75ee5fc2b1c5fabc88700b2eb36ea2f9ad37453e52781c825fb436e156ff4c` |
| `beidou:1` | `legacy-beidou` | `82b2f122809b75b777ecef2bfc2a0063a535bd26f2be8841ab4ce3871049e1c1` | `1f0da966b7c3756c5c1d8c9d6c12ad569fd9229b423a33064908edb94bb6b6f7` |

[Exact development → R3 field preview](READY_BATCHES.json) · [R2 → R3 field diffs and payloads](REVISED_CANDIDATES.json) · [Frozen R2 candidates](A02_ORIGINAL.json) · [Legacy row IDs and dispositions](A02_PRESERVATION_ANALYSIS.json) · [Read-only dry-run records](IMPORT_DRY_RUN.json)

## Gameplay and active collections

| Character | Teams | Weapons | Artifact options |
|---|---:|---:|---:|
| Albedo | 1 → 1 experimental | 3 → 4 | 1 → 3 |
| Baizhu | 0 → 1 experimental | 2 → 3 | 1 placeholder → 2 |
| Beidou | 0 → 1 experimental | 2 → 4 | 1 placeholder → 2 |

- **Albedo.** Corrected Harbinger of Dawn to an obtainable F2P R5 option if owned, with CRIT Rate only above 90% HP. Uraku requires nearby party Geo damage for its stronger bonus, and craftable Flute helps meet DEF requirements. The proposal retains Primordial Jade Cutter as an owned CRIT stat stick. Azurelight and Amenoma remain in the legacy archive and leave the active shortlist because their ATK and Energy effects do little for the default off-field Skill role. DEF sands, Geo DMG goblet, CRIT circlet and CRIT/DEF substats support DEF-scaling Blossoms. Skill leads talent investment. Golden Troupe and Husk remain primary options. Archaic Petra remains situational in teams that can create and collect the matching shard, with no assumed benefit from its four-piece buff in the Itto/Gorou/Zhongli mono-Geo roster. The old `sdasd` roster uses four valid IDs but lacks a supported build plan. Its rows go to the archive. The replacement is experimental and assumes no two-character Hexerei team bonus. [Genshin-Builds Albedo](https://genshin-builds.com/en/character/albedo) · [KQM Albedo](https://keqingmains.com/q/albedo-quickguide/)
- **Baizhu.** Keep ER first for the 80-Energy Burst, then consider HP Sands. Use an HP goblet. The circlet can favor HP for the reaction buff, Healing Bonus for sustain, or CRIT Rate for Favonius. Prototype Amber restores personal Energy and heals the party after Burst. Favonius Codex is retained under its canonical ID and requires an on-field CRIT hit. Jadefall’s Splendor remains the premium Energy and HP option. The Widsith leaves the active shortlist because its offensive proc does little for this role. Burst and Skill remain the useful talents. Deepwood is conditional on coverage and holder assignment, and Noblesse is a situational ATK alternative where Nahida holds Deepwood. The Cyno/Nahida/Xingqiu roster remains experimental with explicit Energy and new-wave Dendro caveats. [Genshin-Builds Baizhu](https://genshin-builds.com/en/character/baizhu) · [KQM Baizhu](https://keqingmains.com/q/baizhu-quickguide/)
- **Beidou.** Keep ER Sands when required for Burst and add ATK% once Energy needs are met. Electro DMG goblet, CRIT circlet, and ER to requirement followed by CRIT and ATK remain appropriate. Burst leads talent investment. Stormbreaker snapshots eligible stats and needs normal or charged attack hits to discharge. Raiden Burst attacks cannot drive it. Wolf’s Gravestone R1 and craftable Prototype Archaic R5 are retained under canonical IDs. Serpent Spine assumes stack upkeep, and Favonius requires on-field CRIT. Emblem and a mixed Burst/ATK set remain. Sucrose drives the experimental Fischl/Xingqiu roster, whose sustain is limited at Beidou C0. [Genshin-Builds Beidou](https://genshin-builds.com/en/character/beidou) · [KQM Beidou](https://keqingmains.com/beidou/)

All linked sources were accessed on 2026-11-20. The installed `genshin-db@5.2.15` and live catalog verified weapon and artifact IDs, weapon types, set effects, and the character IDs. Every proposed roster and Albedo’s archived roster has four distinct catalog IDs including the build owner. No team alias resolution is needed.

## Preservation and authorization

The version-guarded Admin update stages a pending patch. The existing approval transaction replaces each of the three explicitly supplied active arrays. For all three candidates, isolated tests verified that first approval moved every original recommendation row and ID into its immutable, non-default, non-public `baseline-<character>` build. Albedo’s original team and its member rows survive intact there. The legacy artifact placeholders for Baizhu and Beidou are likewise archived. The existing active default IDs are preserved.

A future development write requires explicit authorization of the exact three candidate ID/checksum pairs and this batch checksum. Before any authorized execution, repeat the version/fingerprint and no-pending checks, validate a fresh backup, and stage and review the exact payload through the existing authenticated Admin mutations. Any changed payload or baseline stops execution.

## Verification

- The isolated `genshinhub_test_build_final_review_a02r3` database applied all five migrations. The existing GraphQL lifecycle assertions were run with an A02-scoped fixture and archive checks. They passed authorization, checksum preflight, concurrent staging conflict, rejection, stale replay, exact archival preservation, explicit team replacement/removal/restoration, audit integrity, default uniqueness, public GraphQL, and archive recovery. Seven approvals occurred solely in this fixture, including three exact candidate publications.
- Full and single-candidate dry runs passed using the existing final-review selector with `--batch A02`. The command takes a fresh read-only inventory JSON as its first argument. Before and after development snapshots matched byte for byte for all three A02 characters and Mitya.
- All three isolated Character Detail pages returned HTTP 200 and displayed their default build, expected notes, weapon, artifact and team. No uncaught page error occurred. The temporary Next.js server logged an aborted navigation request and returned 401 for a guest session probe.
- The reviewed A01 backup and pre-write snapshot were copied byte for byte into the Git-ignored, non-public `backend/backups/a01/` directory. Directory mode is `0700` and file mode is `0600`. Backup SHA-256 is `97da5594147307301847044af5985d92cd9e66a215d74380e5fd4fd7bac04831`. A01 candidate records and published builds were outside this review.
