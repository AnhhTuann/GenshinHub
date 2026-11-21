# GenshinHub 7.2 character and build audit

The live catalog contains **131 identities and 219 CharacterBuild records**. The matrix covers every identity, 131 active or legacy-public builds, and 88 archives. Two team-ID corrections were staged. Sandrone’s avatar was corrected losslessly. Approved content and defaults were preserved.

## Coverage and findings

- **128 buildable identities** have a curated comparison. Generic Traveler has no specified combat form. Manekin and Manekina are special-mode identities stored under legacy IDs. Elemental Traveler variants were reviewed separately.
- **130 reference identities matched** through the index and exact API ID. There are 128 usable primary build responses and two matched entries without a build. Generic Traveler had no matching indexed page. The API supplied no patch version. Seven individual pages checked separately displayed 7.2. The API exposes the primary curated build. Community usage was excluded. [Reference catalog](https://genshin-builds.com/en/characters)
- **78 keep unchanged, 10 valid alternatives, 42 with confirmed errors, and five missing builds.** Retained builds combine live structure checks with earlier reviewed payload evidence where available. All 91 previously verified import payloads still match their audited build fields. Error counts can overlap with keep or alternative counts when the issue is in a separate field. This audit did not simulate every rotation.
- **45 identities have open evidence or correction review.** The matrix identifies the exact status of each. It includes roles, approval/default flags, weapons and their pinned refinement data, active artifact bonuses, slot stats and talents, team IDs, pinned identity and combat sources, and local asset headers. The public API sorts weapon recommendations by rank before stored order, so rarity-like legacy rank values do not establish editorial priority.

## Mitya and Xingqiu

**Mitya.** Both approved builds and the Support / Sub DPS default were preserved. The pinned Burst costs 60 Energy. The on-field build has Normal-first priorities and largely aligns with the primary curated equipment and EM options. The off-field build uses Skill-first priorities with different ER and team assumptions. The primary API response does not verify the support-tab ordering. Beacon use and Electro/Cryo party conditions matter to both. Lost Prayer stacks over time while on field in combat, so the reference’s movement-based explanation was excluded. [Mitya reference](https://genshin-builds.com/en/character/mitya)

**Xingqiu.** Keep the C0 Hydro Sub DPS build as a valid alternative. Its 80-Energy Burst requires active-character Normal Attack inputs. ER Sands, Hydro Goblet, CRIT Circlet and Burst-first priority fit the intended use. Emblem suits the ER case, and Noblesse plus Heart of Depth activates only the two-piece Burst and Hydro bonuses. Sacrificial Sword R1 has a 40% reset chance per eligible damaging Skill hit and a 30-second cooldown. Treat it as an ER option without budgeting a second Skill every rotation. Favonius depends on on-field CRIT and particle routing. Fleuve is a viable ER alternative. ATK Sands is conditional on meeting Energy requirements. The local Hu Tao double-Hydro team has a different ER context from the generic reference team. [Curated Xingqiu build](https://genshin-builds.com/en/character/xingqiu) · [KQM Xingqiu Energy guidance](https://keqingmains.com/q/xingqiu-quickguide/)

## Held corrections

Alyosha, Odette, Valeriy, Vesna and Vodyanitsa have reference-supported role candidates and existing independent drafts. Their specific rotations remain unverified. No duplicate empty profiles were created. Vodyanitsa’s reference lists 24% ATK for R5 Thrilling Tales, but pinned R5 gives 48%. The 24% value is R1. [Alyosha](https://genshin-builds.com/en/character/alyosha) · [Odette](https://genshin-builds.com/en/character/odette) · [Valeriy](https://genshin-builds.com/en/character/valeriy) · [Vesna](https://genshin-builds.com/en/character/vesna) · [Vodyanitsa](https://genshin-builds.com/en/character/vodyanitsa)

The corrections file includes seven exact ascension-stat tables for missing data. The existing Stats Admin mutation schedules a full seed export and rolling backup cleanup, and the non-destructive sync protects stats. Those writes were held. Aether’s max-stat comparison with the generic and elemental Traveler records is recorded as a model mismatch. The audit did not substitute its values into the elemental variants.

[Complete matrix](FINAL_131_CHARACTER_MATRIX.json) · [Exact correction records](FINAL_131_CORRECTIONS.json) · [Cleanup findings](FINAL_131_TEST_CLEANUP.md) · [Execution result](FINAL_131_EXECUTION_RESULT.md)
