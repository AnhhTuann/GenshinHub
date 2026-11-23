# Complete Character Build review and consolidated approval package

Package `character-build-catalog-7.2-r4-final-all` · frozen 2026-11-20 · authorization REVIEW_READY_CONSOLIDATED_AUTHORIZATION_NONE

This is the single review package for work item #2. It covers every remaining draft, records the genuinely unresolved entries, and stops at one explicit authorization gate before any real development write.

## 1–7. Coverage and disposition

| Measure | Count |
| --- | ---: |
| 1. Catalog characters inspected | 131 |
| 2. Existing approved builds in development | 5 (A01 R3: 3; Mitya: 2) |
| 3. Remaining candidate builds after A01 | 130 |
| 4. Independently verified build candidates | 91 |
| 5. REVIEW_READY and eligible | 91 |
| 6. NEEDS_MORE_EVIDENCE | 33 |
| 7. BLOCKED | 11 (6 candidate drafts + 5 non-buildable catalog identities) |

Total CharacterBuild rows in the read-only snapshot: 128. Existing defaults: 126. A01 was imported at version 3 and is excluded unchanged; Mitya’s two approved builds and default are protected.

## 8–11. Corrections

| Area | Consolidated R4 corrections | Earlier frozen R2/R3 corrections |
| --- | ---: | ---: |
| 8. Weapons | 0 | 4 |
| 9. Artifacts | 24 | 3 |
| 10. Teams (explicit role assignments and scope) | 82 | 6 |
| 11. Stats and Talents | 0 | 1 |
| Metadata (duplicate constellation labels) | 3 | 0 |

Every R4 correction applies to a demonstrable, sourced mistake or to an explicit team-role/evidence clarification. R1 and all earlier frozen payloads remain unchanged. The exact before/after fields are in `FINAL_ALL_BUILDS_DIFFS.json`.

Corrections in this run:

- `alhaitham:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `arataki-itto:1` · artifacts — 2+2 Husk/Archaic Petra rationale credited inactive four-piece Husk stacks and Archaic Petra shard pickup. (genshin-db@5.2.15 sets 15021 and 15014: only DEF +30% and Geo DMG +15% apply.)
- `arataki-itto:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `arlecchino:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `charlotte:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `chasca:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `chevreuse:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `chiori:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `chongyun:1` · artifacts — Reverse-Melt 2+2 used Crimson Witch, whose 2pc is Pyro DMG and whose reaction bonuses are 4pc-only. (genshin-db@5.2.15 set 15006 2pc = Pyro DMG +15%, 4pc = Melt bonuses; Chongyun is Cryo. KQM https://keqingmains.com/q/chongyun-quickguide/)
- `chongyun:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `clorinde:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `collei:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `dehya:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `dehya:2` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `diluc:1` · artifacts — 2+2 Crimson Witch/Gladiator rationale credited an inactive four-piece reaction bonus. (genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.)
- `diluc:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `diona:1` · artifacts — 2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects. (genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.)
- `diona:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `emilie:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `escoffier:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `eula:1` · artifacts — 2+2 Pale Flame/Bloodstained rationale credited inactive Pale Flame four-piece Skill-hit stacks. (genshin-db@5.2.15 sets 15018 and 15008: only Physical DMG +25% twice applies.)
- `eula:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `faruzan:1` · metadata — Duplicate "C0 C0" in the build name. (proposed-builds.json patch.name for the affected candidates.)
- `faruzan:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `furina:1` · artifacts — 2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects. (genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.)
- `furina:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `gaming:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `ganyu:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `gorou:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `hu-tao:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `jean:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kaedehara-kazuha:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kamisato-ayaka:1` · artifacts — 2+2 Blizzard/Gladiator rationale credited inactive four-piece CRIT against Cryo/Frozen targets. (genshin-db@5.2.15 sets 14001 and 15001: only Cryo DMG +15% and ATK +18% apply.)
- `kamisato-ayaka:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kamisato-ayato:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `keqing:1` · artifacts — 2+2 Thundering Fury/Gladiator rationale credited inactive four-piece reaction damage and Skill cooldown reduction. (genshin-db@5.2.15 sets 15005 and 15001: only Electro DMG +15% and ATK +18% apply.)
- `keqing:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kinich:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kuki-shinobu:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `mavuika:1` · artifacts — Fragment of Harmonic Whimsy 4pc requires Bond of Life changes, which Mavuika’s Fighting Spirit kit does not use. (genshin-db@5.2.15 set 15035 4pc = Bond of Life DMG stacks; Mavuika kit and candidate notes use Fighting Spirit instead.)
- `mavuika:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `mona:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `mualani:1` · artifacts — Wanderer’s Troupe 4pc boosts Charged Attack DMG, but Sharky’s Bites are Normal Attack DMG. (genshin-db@5.2.15 set 15003 4pc = Charged Attack DMG +35%; Mualani skill: Bites deal Normal Attack DMG. KQM https://keqingmains.com/q/mualani-quickguide/)
- `mualani:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `nahida:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `navia:1` · artifacts — 2+2 Gladiator/Archaic Petra rationale credited inactive four-piece Normal Attack and shard-pickup effects. (genshin-db@5.2.15 sets 15001 and 15014: only ATK +18% and Geo DMG +15% apply.)
- `navia:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `raiden-shogun:1` · metadata — Duplicate "C0 C0" in the build name. (proposed-builds.json raiden-shogun:1 patch.name.)
- `raiden-shogun:1` · artifacts — 2+2 Noblesse/Gladiator rationale credited inactive four-piece effects. (genshin-db@5.2.15 sets 15007 and 15001: only the two-piece Burst DMG +20% and ATK +18% apply.)
- `raiden-shogun:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `rosaria:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `sangonomiya-kokomi:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `shenhe:1` · artifacts — 2+2 Gladiator/Shimenawa rationale credited inactive four-piece Normal Attack effects. (genshin-db@5.2.15 sets 15001 and 15019: only ATK +18% twice applies.)
- `shenhe:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `thoma:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `thoma:2` · artifacts — 2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects. (genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.)
- `thoma:2` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `tighnari:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `venti:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `wanderer:1` · artifacts — 2+2 Deepwood/Viridescent rationale credited inactive four-piece Dendro shred and Swirl effects, and Dendro DMG does not help an Anemo carry. (genshin-db@5.2.15 sets 15025, 15002 and 15001: use ATK +18% and Anemo DMG +15% two-piece effects instead.)
- `wanderer:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `xingqiu:1` · artifacts — 2+2 Noblesse/Heart of Depth rationale credited inactive four-piece effects. (genshin-db@5.2.15 sets 15007 and 15016: only Burst DMG +20% and Hydro DMG +15% apply.)
- `xingqiu:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yae-miko:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yaoyao:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yoimiya:1` · artifacts — 2+2 Crimson Witch/Gladiator rationale credited inactive four-piece effects; Gladiator 4pc is melee-only and Yoimiya uses a bow. (genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.)
- `yoimiya:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yun-jin:1` · artifacts — 2+2 Husk/Emblem rationale credited inactive four-piece Curiosity stacks and ER-scaled Burst bonus. (genshin-db@5.2.15 sets 15021 and 15020: only DEF +30% and ER +20% apply.)
- `yun-jin:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `cyno:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `flins:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `freminet:1` · artifacts — 2+2 Pale Flame/Bloodstained rationale credited inactive Pale Flame four-piece Skill-hit stacks. (genshin-db@5.2.15 sets 15018 and 15008: only Physical DMG +25% twice applies.)
- `freminet:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `ifa:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `ineffa:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kaeya:1` · artifacts — 2+2 Noblesse/Blizzard rationale credited inactive four-piece team ATK and Frozen CRIT effects. (genshin-db@5.2.15 sets 15007 and 14001: only Burst DMG +20% and Cryo DMG +15% apply.)
- `kaeya:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `klee:1` · artifacts — Frozen R2 2+2 Crimson Witch/Gladiator option credits an inactive four-piece reaction bonus. (genshin-db@5.2.15 sets 15006 and 15001: only Pyro DMG +15% and ATK +18% apply.)
- `klee:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `kujou-sara:1` · metadata — Duplicate "C0 C0" in the build name. (proposed-builds.json patch.name for the affected candidates.)
- `kujou-sara:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `lauma:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `lisa:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `lyney:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `mika:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `momoka:1` · artifacts — 2+2 Tenacity/Vourukasha rationale credited inactive four-piece party ATK and Skill/Burst effects. (genshin-db@5.2.15 sets 15017 and 15030: only HP +20% twice applies.)
- `momoka:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `nefer:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `ningguang:1` · artifacts — Both Archaic Petra 2+2 options credited the inactive four-piece shard-pickup bonus; the Gladiator/Noblesse lines also credited inactive four-piece effects. (genshin-db@5.2.15 sets 15014, 15001 and 15007: only Geo DMG +15%, ATK +18% and Burst DMG +20% apply.)
- `ningguang:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `noelle:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `ororon:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `qiqi:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `razor:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `sethos:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `shikanoin-heizou:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `sigewinne:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `skirk:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `tartaglia:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `traveler-dendro:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `traveler-geo:1` · artifacts — 2+2 Archaic Petra/Noblesse rationale credited inactive four-piece shard-pickup and team ATK effects. (genshin-db@5.2.15 sets 15014 and 15007: only Geo DMG +15% and Burst DMG +20% apply.)
- `traveler-geo:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `wriothesley:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `xianyun:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `xiao:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `xilonen:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yanfei:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `yumemizu:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)
- `zibai:1` · teams — Assign an explicit job to all four roster members and record the elemental and Energy scope. (recommendation-evidence.tsv role context; installed genshin-db@5.2.15; Genshin-Builds comparison captured 2026-11-20)

The remaining R4 changes are systematic team-role assignments derived from the versioned independent role contexts in `recommendation-evidence.tsv`, with elemental/Energy scope recorded in each lineup description.

## 12. Preserved legacy recommendations

Nine previously reviewed candidates keep their exact checksums from `REVISED_CANDIDATES.json` (A02–A04). A01 builds are untouched at version 3. For every revision that supplies `weapons`, `artifacts` or `teams`, approval moves the original child rows to the immutable, non-default, non-public `baseline-<character>` build; omitted arrays are copied back to the active build. No historical row is deleted, and CharacterBuildAudit history is appended rather than rewritten. Character-level admin recommendations and Tier Rankings are outside the write payload.

## 13. Complete candidate ID / version / checksum manifest

Ordered manifest checksum (`SHA-256 over JSON.stringify(ordered [{candidateId,version,checksum}])`): `e53479a44866447690d10980ebea83ed714109eaf4839a9ae29e1e5870016365`

| Candidate | Character | Role | Version | SHA-256 | Baseline |
| --- | --- | --- | --- | --- | --- |
| `albedo:1` | `albedo` | SUB_DPS | `character-build-catalog-7.2-r3-a02` | `a23feb828657d1ba053aca5fd53b5bd3a60813de382dfc271877c2b800cefd20` | `legacy-albedo@v1` |
| `alhaitham:1` | `alhaitham` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `dfd039170488be2b293e02582b6f040b8273f84c968d68c0a039e76ab222467e` | `legacy-alhaitham@v1` |
| `arataki-itto:1` | `arataki-itto` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `6548d742a65f76c515cdec733180c81a3fe24775f71e374891cddf56473928f2` | `legacy-arataki-itto@v1` |
| `arlecchino:1` | `arlecchino` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `a71465096744d0d03cf0676970a74a4fb700e83e6efac2fff3412251826f83c5` | `legacy-arlecchino@v1` |
| `baizhu:1` | `baizhu` | SUPPORT | `character-build-catalog-7.2-r3-a02` | `6c75ee5fc2b1c5fabc88700b2eb36ea2f9ad37453e52781c825fb436e156ff4c` | `legacy-baizhu@v1` |
| `beidou:1` | `beidou` | SUB_DPS | `character-build-catalog-7.2-r3-a02` | `1f0da966b7c3756c5c1d8c9d6c12ad569fd9229b423a33064908edb94bb6b6f7` | `legacy-beidou@v1` |
| `charlotte:1` | `charlotte` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `c658733797839e51b64ca24f2422d91b02abdf21c56eadcc508022d285860f72` | `legacy-charlotte@v1` |
| `chasca:1` | `chasca` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `4e51057b12e55bcad635d0264d7ac2ad291b4aab08321af6d352d34ad0ac289b` | `legacy-chasca@v1` |
| `chevreuse:1` | `chevreuse` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `c50b61da910f123e706f43914c3ca16686fb331faf041eeb86139d1490ed16a0` | `legacy-chevreuse@v1` |
| `chiori:1` | `chiori` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `3e95142855b2040f877685fd6bf5d5a81d3be524322c1bf1d298284a65cde623` | `legacy-chiori@v1` |
| `chongyun:1` | `chongyun` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `6c328da7269b4f027acc1ec88cf181a2464c5ef875cf1ada3304bfe969d0cb88` | `legacy-chongyun@v1` |
| `clorinde:1` | `clorinde` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `49d94fa871117ef4de1c1493df9871cc02c31ffb0dce4135211f9886c4a9f908` | `legacy-clorinde@v1` |
| `collei:1` | `collei` | SUB_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `38148acd8103b362328ada1ffa81ae1c82ff95cc7c2a47fe05f31ba4e6252b41` | `legacy-collei@v1` |
| `cyno:1` | `cyno` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `e76c45268fcc836ef13bfca3a44417021340b0781b9524f4b4320e77cbb90ca3` | `legacy-cyno@v1` |
| `dehya:1` | `dehya` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `ce4426a2b7aad195c4dce147697c9125f333829675ae84d1f2999fff53410570` | `legacy-dehya@v1` |
| `dehya:2` | `dehya` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `5aa07c6c779350c90c5d3494af2c97d7ec83803de979e6a1528d5d6f54917cbd` | new separate build |
| `diluc:1` | `diluc` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `dc41f4cfc8b48a0fc91013802d904b10d20c645634290a63348213f563acd363` | `legacy-diluc@v1` |
| `diona:1` | `diona` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `a38aa90e43d9746efe225b785447ff060f64a58e4b2a19618e6cab19aabfcd1d` | `legacy-diona@v1` |
| `emilie:1` | `emilie` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `8f0b3360a543dc3f94a9525afb41f5cbf29121e483bf7c7a973c8acdab41ad8e` | `legacy-emilie@v1` |
| `escoffier:1` | `escoffier` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `3d9b50c5e0c115817b168f70b28972b2ebaeb340c624d577c60b2ab15566dfe1` | `legacy-escoffier@v1` |
| `eula:1` | `eula` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `f68f81ff49d07e3c94889f379305099e51d33a9d50568e26edecaebcf69c238e` | `legacy-eula@v1` |
| `faruzan:1` | `faruzan` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `0cafac0028236ca6a56a915c34c98f8d2f6cc34fe0bdf9536dd88ac9f5054cf7` | `legacy-faruzan@v1` |
| `flins:1` | `flins` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `2e217b8be78dc692fa290e5f8b445301e22015ab566387944441afbe5c1f48f2` | `legacy-flins@v1` |
| `freminet:1` | `freminet` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `76ec92c43e3104a01607fb8d3c402bbdf0ba58d87c2c920b3441fe3d9629825f` | `legacy-freminet@v1` |
| `furina:1` | `furina` | SUB_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `a884571710ff96ec511a5c321c7e86416002667a505cd7072af32a91aae4614a` | `legacy-furina@v1` |
| `gaming:1` | `gaming` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `a51abd18e8e45bbb7e4b9d3d23f0ec7e6e9f82fb980d0e787d8af3d2366addfc` | `legacy-gaming@v1` |
| `ganyu:1` | `ganyu` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `616936217460697986fc2c2dfe6e1b26d300de1db117d04fd5d873a3ff5f97f1` | `legacy-ganyu@v1` |
| `ganyu:2` | `ganyu` | MAIN_DPS | `character-build-catalog-7.2-r2` | `1f3daa1c3186ac3a15277c431c605ca19ebb58a2631456e646b94ed257130265` | new separate build |
| `gorou:1` | `gorou` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `2dc8c2f88625340586f753207386c6ad95e89268c12d682653079539244d2d60` | `legacy-gorou@v1` |
| `hu-tao:1` | `hu-tao` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `3e3379e1b89bc3160a1b98c5ca00d1487f2ce5f12949cbb0a5a26a5cbb2415bd` | `legacy-hu-tao@v1` |
| `ifa:1` | `ifa` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `926d2ec3a6579ced6b1ddd1e3f4d44bb6bb56acb785634a76d271192b8b887fd` | `legacy-ifa@v1` |
| `ineffa:1` | `ineffa` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `73d96797538d728fb5ebb41c101450e52e9207265b48efa51571d59e47b2a7ca` | `legacy-ineffa@v1` |
| `jean:1` | `jean` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `0571466e3fa75d9f5dd933c06f85b90194a20ac1e21a77d447ca688b5ab42f3f` | `legacy-jean@v1` |
| `kaedehara-kazuha:1` | `kaedehara-kazuha` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `80aec5f799953f1bd05f781abae73271a0631292aa25142555da9f75b4bbfb4f` | `legacy-kaedehara-kazuha@v1` |
| `kaeya:1` | `kaeya` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `efd9ed7c0356f4d0f5499b71d5ed9e10574fa157892fc7b04050f0baa97221b4` | `legacy-kaeya@v1` |
| `kamisato-ayaka:1` | `kamisato-ayaka` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `5d26a508098c47aea9c5e20d7077eae641bf1495a79f4106273aa1ea4e5144b0` | `legacy-kamisato-ayaka@v1` |
| `kamisato-ayato:1` | `kamisato-ayato` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `d00837952c0112e2a5c16cee9628e344be595af9ab3a28c8ca7db06917a5d67c` | `legacy-kamisato-ayato@v1` |
| `keqing:1` | `keqing` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `1ae419157f2ef6def6e3bc88b70d63000d79bfc0a7df35755a759ca181cccc9b` | `legacy-keqing@v1` |
| `kinich:1` | `kinich` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `e0741d33936c73014e9c24a79ccc49d4f3c6a27f4c27d8dd1a242290981e0a59` | `legacy-kinich@v1` |
| `klee:1` | `klee` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `edada7d7e10e5e2e3de8a50795ae74ecbe2b21e47feedec2de5bb81d005da2bc` | `legacy-klee@v1` |
| `kujou-sara:1` | `kujou-sara` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `b56b7852bc336b301619587f48c942673b4a3ac27dc6dcfbd5c9a25e39a0301f` | `legacy-kujou-sara@v1` |
| `kuki-shinobu:1` | `kuki-shinobu` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `16d4ee1cd1c8844813a4edf38921e167f5555a9793753c711b02727ed8ff31d4` | `legacy-kuki-shinobu@v1` |
| `lauma:1` | `lauma` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `89cad38b55cfe6f6b5ae3965585fe9aad1bb91909f611373055cf26487816926` | `legacy-lauma@v1` |
| `lisa:1` | `lisa` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `809c152998dc4d512612e12a3d3875cb0a03a24a8c021635ccee82b64b2dd93a` | `legacy-lisa@v1` |
| `lyney:1` | `lyney` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `faff27a93c08e96ada73e6d6566ded1e1d053e6b22474d9ece4784650f00ef46` | `legacy-lyney@v1` |
| `mavuika:1` | `mavuika` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `6f2e3fce372e599f20206b8b78a475fff39d2c8a5b3a4bc3df241bd0f17a715b` | `legacy-mavuika@v1` |
| `mika:1` | `mika` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `86639c96dfda1b27b3093972165dc578ed01c01d6f10f683ab61cd1b70478336` | `legacy-mika@v1` |
| `momoka:1` | `momoka` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `cc97a0d2467414a5184485aeed576c227411abeac5befe4fc758cf028974adff` | `legacy-momoka@v1` |
| `mona:1` | `mona` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `4e54e8b3d766584627dc8ba49ac8c896513a3a1ff9cd760501aabe22d119c000` | `legacy-mona@v1` |
| `mualani:1` | `mualani` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `1eaad92136bf770512479981617b2cb216cf3a320b47637ef4061a4639683447` | `legacy-mualani@v1` |
| `nahida:1` | `nahida` | SUB_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `26acd40a946087a45f313b60c26386c0d64e6d432ae00431be25816541a24b66` | `legacy-nahida@v1` |
| `navia:1` | `navia` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `0a42b98f2e50c3cd2f0d366ed958b2b96f251bb4ea3f679b142c7b3d4f0b69eb` | `legacy-navia@v1` |
| `nefer:1` | `nefer` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `c0274a104125ea6afc19c176c65c768d562ce2ab07f37ffa1439ae2c65b7f004` | `legacy-nefer@v1` |
| `ningguang:1` | `ningguang` | SUB_DPS+MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `89ae382790f50e185534d66a540c1cab1951533a4c2de7f5cda315b8ea194fe2` | `legacy-ningguang@v1` |
| `noelle:1` | `noelle` | MAIN_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `fff76dde319bdb62b616cb742705dd978803ce886f5d45e8601483f3ac325481` | `legacy-noelle@v1` |
| `ororon:1` | `ororon` | SUB_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `0edb59e7db50b34cab94ea44f76110774bc4cab9836495d513eb0638b7cee1c9` | `legacy-ororon@v1` |
| `qiqi:1` | `qiqi` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `2a46446ab74718a2cd4a13d7a3dba29df10a483ddc581a6a6b99409ce6f55140` | `legacy-qiqi@v1` |
| `raiden-shogun:1` | `raiden-shogun` | MAIN_DPS+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `9b6f38bd1ee608976c94d86551bc7c67f1adf01dc3204bdd1a87dcce5621dc2a` | `legacy-raiden-shogun@v1` |
| `raiden-shogun:2` | `raiden-shogun` | SUB_DPS | `character-build-catalog-7.2-r2` | `c8954331c8a123a6c16c34191aa11bb15e501f66797793dee4583524f186aeb5` | new separate build |
| `razor:1` | `razor` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `d9df582ebd3b15bd5f219d29382caed3905861b810fe24cfd843efa4127a932f` | `legacy-razor@v1` |
| `rosaria:1` | `rosaria` | SUB_DPS+SUPPORT | `character-build-catalog-7.2-r4-final-all` | `ed05da930c41d5e2c92487b4af4f596e7f73da3ab6915aba8b5d5e3187654fd0` | `legacy-rosaria@v1` |
| `sangonomiya-kokomi:1` | `sangonomiya-kokomi` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `139759d8c1b9d686741528a3565d62e32579aca29c9abadb5b599d2f1eb04eea` | `legacy-sangonomiya-kokomi@v1` |
| `sethos:1` | `sethos` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `03c828a39cec2ccfafd0be48b2281c94f7bb555cf4e24172240594ea8dec26ae` | `legacy-sethos@v1` |
| `shenhe:1` | `shenhe` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `d1fb063116bc9d6e4b5066362c0566d91ef103ac0120fe58222793ab8fb7fca8` | `legacy-shenhe@v1` |
| `shikanoin-heizou:1` | `shikanoin-heizou` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `ffba3d116d66a28e6e02e67e88e7818abdd3158c6d616f644f5b105a0cb43ac8` | `legacy-shikanoin-heizou@v1` |
| `sigewinne:1` | `sigewinne` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `a33afe7cfd05832d43ca60590d071f4e775a2f8a0ba5509d555ca59dbba8775b` | `legacy-sigewinne@v1` |
| `skirk:1` | `skirk` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `6210afbb3bb587536465cd45973b7a6ce35b892b887e33356df4cb7b0f383677` | `legacy-skirk@v1` |
| `sucrose:1` | `sucrose` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r2` | `52e22b811c2fb6e04aa22891b7e309bd00e1f1d148d89ca24dab0f73821c21d0` | `legacy-sucrose@v1` |
| `tartaglia:1` | `tartaglia` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `d068feac75c110529aa11a08072013f170d78983a997730b50b0f4e3ab780e14` | `legacy-tartaglia@v1` |
| `thoma:1` | `thoma` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `5b6a937b2794119d64d3c3ab4e0d055b2cea1fbb2ef844fd237f5322fd4bd45f` | `legacy-thoma@v1` |
| `thoma:2` | `thoma` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `646b7688b713422b4be0eab43eafa5103f06de8542b5b4534a8608efa6fb8af0` | new separate build |
| `tighnari:1` | `tighnari` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `16ddf6a3d8b720552b818b160f1b36870a294374dda152a9a96f3d8c7d3f542e` | `legacy-tighnari@v1` |
| `traveler-dendro:1` | `traveler-dendro` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `9974c1244f43e0982ce4f9760c3011ac9859ca3c8fb8180dfc8d0cc98ff456dc` | `legacy-traveler-dendro@v1` |
| `traveler-geo:1` | `traveler-geo` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `2befcdf7a55de2b3a29d2dc919ca645dbc22cad8be683d90905d72f760caa373` | `legacy-traveler-geo@v1` |
| `varesa:1` | `varesa` | MAIN_DPS | `character-build-catalog-7.2-r2` | `40a836e36441636afab8747636c4aa5f7bc2e4452a87c28435b147f1f8410f84` | `legacy-varesa@v1` |
| `venti:1` | `venti` | SUPPORT+SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `960604a027b22f4f8c739a9608231c307107beb0ee7d397c06106a9ef826853b` | `legacy-venti@v1` |
| `wanderer:1` | `wanderer` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `3d23b873ed396ef05bf53a5666cccec7e8b3b336bed56637d6e7d605a9699dda` | `legacy-wanderer@v1` |
| `wriothesley:1` | `wriothesley` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `0dc0cbc4a8a4713ea99acb500872c2e7b198c195b7d4b3c5aaa93712b504ee63` | `legacy-wriothesley@v1` |
| `xianyun:1` | `xianyun` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `c49f98b6d08fcb624f3cc64badda6a1415a923346219439e04d379721260b9c1` | `legacy-xianyun@v1` |
| `xiao:1` | `xiao` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `70bb288616ab1fde2b732f23edacc7c4bdd7654724cc2ada276a0afe66a9074d` | `legacy-xiao@v1` |
| `xilonen:1` | `xilonen` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `ce31b0e2c2837fc87bc8ec57237612b2d75c0537fdd4feb52ff946468b2f2e36` | `legacy-xilonen@v1` |
| `xingqiu:1` | `xingqiu` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `a22b200941d570e29da222977b7d5c6f9a539f01301dc0f2e8ba2888dda9ab4c` | `legacy-xingqiu@v1` |
| `yae-miko:1` | `yae-miko` | SUB_DPS | `character-build-catalog-7.2-r4-final-all` | `8d8a37c26c26292ad3e24d14a4caba7ab351f5a96d6e9e133466a22a3d57d3c3` | `legacy-yae-miko@v1` |
| `yanfei:1` | `yanfei` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `f309c03b10611c872c4e7f216b8b79c5ab40d3ce16c5f7cdf8107eadc5b1fe38` | `legacy-yanfei@v1` |
| `yaoyao:1` | `yaoyao` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `c4e3314f0cc2937f87fe268a0ad1098c0b02f0d78d1a3ba735b4211e73ebe720` | `legacy-yaoyao@v1` |
| `yelan:1` | `yelan` | SUB_DPS | `character-build-catalog-7.2-r2` | `e5b2bdf37df5cf9aae69f4a7a395348e0c1c69caf6e690edd065ab0496f7ae8e` | `legacy-yelan@v1` |
| `yoimiya:1` | `yoimiya` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `80efd32785b30413c9a7537e83911ca925942220d29cb0d6327827f663dbc11a` | `legacy-yoimiya@v1` |
| `yumemizu:1` | `yumemizu` | SUPPORT+MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `9ad9cf1327e8c7c676c5e41fdb4964595494a4a259ed9388e4f81eee2bb3f42b` | `legacy-yumemizu@v1` |
| `yun-jin:1` | `yun-jin` | SUPPORT | `character-build-catalog-7.2-r4-final-all` | `0ef1bd599b2914268ef3568b5cdc32490a15d62fee81fe584b2c66b39eeb1f79` | `legacy-yun-jin@v1` |
| `zhongli:1` | `zhongli` | SUPPORT | `character-build-catalog-7.2-r2` | `9bae40b0ea84b658ae89b3a46645ab2fcfad33a2faca781d3639f6f7aa3841a1` | `legacy-zhongli@v1` |
| `zibai:1` | `zibai` | MAIN_DPS | `character-build-catalog-7.2-r4-final-all` | `0f7b28d9099f2e6a3630fbc2300b331883d043f5dd5c36855d3220b02069577a` | `legacy-zibai@v1` |

The full payload, provenance, field diffs and GraphQL operation for each row are in `FINAL_ALL_BUILDS_MANIFEST.json`.

## 14. Isolated PostgreSQL import test results

Executed against `genshinhub_test_build_final_all_r4b` with all 91 candidates (not a three-character sample). Published 91, archived 87 legacy recommendation sets, created 4 separate builds. Real development approvals: 0.

- PASS — full-set checksum and baseline verification
- PASS — anonymous and wrong-key denial
- PASS — tampered payload detection
- PASS — concurrent stage conflict
- PASS — idempotent replay guard
- PASS — exact pending patch
- PASS — staging leaves live rows and GraphQL unchanged
- PASS — approval audit and exact patch
- PASS — explicit collection replacement
- PASS — legacy archive preservation
- PASS — new alternate is non-default
- PASS — default uniqueness
- PASS — rejection preserves published content
- PASS — archive read-only
- PASS — Mitya and unrelated builds unchanged
- PASS — public Character Detail GraphQL output

## 15. Development database before authorization

All planning and validation used a read-only snapshot (`current_database()=genshinhub`, `transaction_read_only=on`) with inventory checksum `a05db225b6a1b43a476946027f9300094a37bec4314e0ac903d51576a5f54ef3`. A fresh read-only inventory regenerated after all analysis produced the identical digest, confirming no development write. A separate live read-only check confirmed 128 CharacterBuild rows, 0 pending stages, 5 approved builds (A01 at version 3 and both Mitya builds), and all defaults intact. No development mutation was called by this work item. Development identity, A01 versions, defaults, Mitya, unrelated builds, Tier Rankings and audit history remain unchanged.

## 16–17. Consolidated approval request

**Exactly 91 candidates are eligible for approval and import.** The user may authorize the immutable ordered set `character-build-catalog-7.2-r4-final-all` with overall SHA-256 `e53479a44866447690d10980ebea83ed714109eaf4839a9ae29e1e5870016365` in one step. Any changed payload, changed baseline, pending stage or database identity drift stops the corresponding candidate; no substitution is permitted.

After authorization only: recalculate all checksums, revalidate every live baseline, confirm the development database identity, verify authenticated Admin access, create and restore-test a fresh backup, then stage and approve the exact payloads through the existing Admin GraphQL workflow in bounded transactions with checkpoints. Stop safely on conflict or failure, verify every imported build and verify unrelated records.

## 18. Genuinely unresolved characters

| Character / candidate | State | Reason |
| --- | --- | --- |
| `aino:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `aloy:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `alyosha:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `amber:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `barbara:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `candace:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `citlali:1` | NEEDS_MORE_EVIDENCE | Model Cryo application versus Arlecchino attack timing and the assigned Scroll holder. |
| `dahlia:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `dori:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `kachina:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `layla:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `mavuika:2` | NEEDS_MORE_EVIDENCE | Check Mualani bite timing and Pyro application after Xilonen takes Scroll. |
| `neuvillette:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `nilou:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `odette:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `sangonomiya-kokomi:2` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `valeriy:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `vesna:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `vodyanitsa:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `columbina:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `durin:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `iansan:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `illuga:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `jahoda:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `kaveh:1` | NEEDS_MORE_EVIDENCE | Specific rotation evidence remains open. |
| `lanyan:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `lynette:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `sayu:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `traveler-anemo:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `traveler-electro:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `traveler-hydro:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `traveler-pyro:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `xinyan:1` | NEEDS_MORE_EVIDENCE | No supported team rotation or explicit team omission sign-off. |
| `linnea` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `lohen` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `nicole` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `prune` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `sandrone` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `varka` | BLOCKED | Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified. |
| `traveler` | BLOCKED | Generic Traveler has no specified combat form; no build was fabricated. |
| `traveler-boy` | BLOCKED | Element-specific variants are reviewed separately; the generic identity has no supported build context. |
| `traveler-girl` | BLOCKED | Element-specific variants are reviewed separately; the generic identity has no supported build context. |
| `manekin` | BLOCKED | No independent conventional talent build is available in the local game package. |
| `manekina` | BLOCKED | No independent conventional talent build is available in the local game package. |

Generic Traveler and both Manekin records receive no fabricated builds. Mitya is protected. Work item #3 (Tier List) is out of scope.
