# Successor changes

> A01’s R3 package supersedes its historical R2 payload below. [Current A01 review](A01_FINAL_REVIEW.md).

Frozen R1 drafts remain in place. The checksum shown for R2 supersedes the corresponding R1 review target.

## albedo:1

- R1 `44a84b35bc41b66dc53c67fcf102936f9e3048c896473d845029a87d85481c5f`
- R2 `146d014a45bb6355852df038d8e4d9c612ce9be981aa5235e97c2f70f28f2c74`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Off-field Geo Skill","description":"Transient Blossoms scale with DEF and count as Skill damage. Harbinger needs more than 90% HP. Geo resonance and Gorou support skill damage.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"albedo","role":"SUB_DPS"},{"characterId":"arataki-itto","role":"TEAMMATE"},{"characterId":"gorou","role":"TEAMMATE"},{"characterId":"zhongli","role":"TEAMMATE"}]}]` → `[{"name":"Off-field Geo Skill","description":"Transient Blossoms scale with DEF and count as Skill damage. Harbinger needs more than 90% HP. Geo resonance and Gorou support skill damage.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"albedo","role":"SUB_DPS","roleDesc":"off-field Geo Skill damage"},{"characterId":"arataki-itto","role":"MAIN_DPS","roleDesc":"on-field charged Geo damage"},{"characterId":"gorou","role":"SUPPORT","roleDesc":"DEF and Geo buffs"},{"characterId":"zhongli","role":"SUPPORT","roleDesc":"shield and nearby resistance reduction"}]}]`

## baizhu:1

- R1 `82a58d11ea98de882b4475907f65910ed7f8d2a5d8ee9a0536b1b378f3361fb5`
- R2 `172b7d99b90b16f58c9f2887627433064534615c3a5208b52bf04162eeff58c8`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Burst healer and Dendro support","description":"HP scales healing and passive reaction support. Prototype Amber refunds energy after Burst, and another Deepwood holder frees the set slot.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"baizhu","role":"SUPPORT"},{"characterId":"cyno","role":"TEAMMATE"},{"characterId":"nahida","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"}]}]` → `[{"name":"Burst healer and Dendro support","description":"HP scales healing and passive reaction support. Prototype Amber refunds energy after Burst, and another Deepwood holder frees the set slot.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"baizhu","role":"SUPPORT","roleDesc":"healing and Dendro sustain"},{"characterId":"cyno","role":"MAIN_DPS","roleDesc":"long-field Electro carry"},{"characterId":"nahida","role":"SUB_DPS","roleDesc":"off-field Dendro marking"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"Hydro via normal-attack triggers"}]}]`

## beidou:1

- R1 `d5e248012b4afe89971f7520cf98f56d761c119a1da7674ba0556500bc2eaec3`
- R2 `4fa4d2e24a8f016ea6c8ed28166e9cbedd4535665788d47396d7b23b49b266f7`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Off-field multi-target Electro","description":"Stormbreaker excels with targets to bounce between and needs a driver and Electro battery. Raiden Burst hits do not drive Stormbreaker.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"beidou","role":"SUB_DPS"},{"characterId":"sucrose","role":"TEAMMATE"},{"characterId":"fischl","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"}]}]` → `[{"name":"Off-field multi-target Electro","description":"Stormbreaker excels with targets to bounce between and needs a driver and Electro battery. Raiden Burst hits do not drive Stormbreaker.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"beidou","role":"SUB_DPS","roleDesc":"off-field Stormbreaker"},{"characterId":"sucrose","role":"SUPPORT","roleDesc":"on-field Swirl driver"},{"characterId":"fischl","role":"SUB_DPS","roleDesc":"Oz and Electro battery"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"off-field Hydro"}]}]`

## bennett:1

- R1 `3d0f1dcf45b0359ad502e7627382aa49b586e003045cd093ec7f342acda3569d`
- R2 `6e94ecbffb40fa65c7ddb251430d151127ec55c78f9af3ff1a08852e666f07eb`
- stats — The generic healing circlet does not meet the Favonius proc condition reliably. Include a conditional CRIT Rate alternative and clarify the C0 threshold.
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `notesEn` — `"The buff uses character and weapon base ATK. C0 HP condition matters. ER precedes base ATK when it is needed to Burst each rotation."` → `"The buff uses character and weapon base ATK. C0 HP condition matters. ER precedes base ATK when it is needed to Burst each rotation. At C0 the active character needs above 70% HP for the ATK buff. Use a CRIT Rate circlet when relying on Favonius and do not count its particles without an on-field proc."`
- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `circlet` — `["Healing Bonus"]` → `["Healing Bonus","CRIT Rate"]`
- `teams` — `[{"name":"Burst buffer and heal","description":"The buff uses character and weapon base ATK. C0 HP condition matters. ER precedes base ATK when it is needed to Burst each rotation.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"bennett","role":"SUPPORT"},{"characterId":"xiangling","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"},{"characterId":"sucrose","role":"TEAMMATE"}]}]` → `[{"name":"Burst buffer and heal","description":"The buff uses character and weapon base ATK. C0 HP condition matters. ER precedes base ATK when it is needed to Burst each rotation.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"bennett","role":"SUPPORT","roleDesc":"ATK buff, healing and Pyro particles"},{"characterId":"xiangling","role":"SUB_DPS","roleDesc":"off-field Pyronado"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"Hydro via normal-attack triggers"},{"characterId":"sucrose","role":"SUPPORT","roleDesc":"on-field driver and resistance shred"}]}]`

## chasca:1

- R1 `ff2f1b22f6a4926b30f5588dbdebae76553e1fafee07b429ba2df137f3dbc69d`
- R2 `90040cdbb541d19499d19404fae1e28cbd124aea589e5c12a7fe2feab6d76a15`
- weapons — Song of Stillness requires the wielder to receive healing; the roster can supply it via Bennett, but the passive is not assumed if a rotation misses that healing.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`

## citlali:1

- R1 `ea7263e4ff0f61cd8abe7945508c2e4441afb7abf0986526f2dc7ee6398f0eaf`
- R2 `5e26e84258918672c9be71ba65975c36cfd2a17508424ffc4f11a5c97a74835b`
- artifacts — The named Xilonen lineup should explicitly assign the only Scroll effect; Citlali can use the EM mix while Xilonen holds Scroll.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `artifacts` — `[{"setIds":["15037"],"constellation":"C0"},{"setIds":["15026","15003"],"constellation":"C0"}]` → `[{"setIds":["15026","15003"],"constellation":"C0"},{"setIds":["15037"],"constellation":"C0"}]`

## fischl:1

- R1 `a6d6fc9cf2a91f993fd2b190ba49865c2470a88265565d53b090ddeab8603f7b`
- R2 `92483f765e9bbb0a0ca1caab7f3347f60431da958e98a8a39b1117e80cd6f703`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Off-field Oz in Aggravate","description":"Oz damage follows Skill talent. Alternate Skill and Burst to refresh Oz. Use Polar Star only with a rotation that establishes useful stacks.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"fischl","role":"SUB_DPS"},{"characterId":"keqing","role":"TEAMMATE"},{"characterId":"nahida","role":"TEAMMATE"},{"characterId":"yaoyao","role":"TEAMMATE"}]}]` → `[{"name":"Off-field Oz in Aggravate","description":"Oz damage follows Skill talent. Alternate Skill and Burst to refresh Oz. Use Polar Star only with a rotation that establishes useful stacks.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"fischl","role":"SUB_DPS","roleDesc":"off-field Oz and Aggravate follow-up"},{"characterId":"keqing","role":"MAIN_DPS","roleDesc":"quick-swap Electro attacker"},{"characterId":"nahida","role":"SUB_DPS","roleDesc":"ongoing Dendro application"},{"characterId":"yaoyao","role":"SUPPORT","roleDesc":"healing and Dendro application"}]}]`

## ganyu:2

- R1 `f9d9a78a9253bbdc47ed9fc76f74daa57781a69927d171f65cdf0da24d3c5405`
- R2 `1f3daa1c3186ac3a15277c431c605ca19ebb58a2631456e646b94ed257130265`
- artifacts — Remove Shimenawa from this Hamayumi-compatible shortlist because Skill consumes Energy and prevents the full-Energy passive.
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `artifacts` — `[{"setIds":["15003"],"constellation":"C0"},{"setIds":["15019"],"constellation":"C0"}]` → `[{"setIds":["15003"],"constellation":"C0"},{"setIds":["15003","14001"],"constellation":"C0"}]`
- `teams` — `[{"name":"Reverse Melt charged carry","description":"Maintain Pyro aura and protect charged shots. Limit Burst if its hits steal Melt. Hamayumi wants full Energy, which conflicts with Shimenawa's consumption.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"ganyu","role":"MAIN_DPS"},{"characterId":"xiangling","role":"TEAMMATE"},{"characterId":"bennett","role":"TEAMMATE"},{"characterId":"zhongli","role":"TEAMMATE"}]}]` → `[{"name":"Reverse Melt charged carry","description":"Maintain Pyro aura and protect charged shots. Limit Burst if its hits steal Melt. Hamayumi wants full Energy, which conflicts with Shimenawa's consumption.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"ganyu","role":"MAIN_DPS","roleDesc":"charged-shot reverse Melt"},{"characterId":"xiangling","role":"SUB_DPS","roleDesc":"off-field Pyro aura"},{"characterId":"bennett","role":"SUPPORT","roleDesc":"buff, heal and Pyro battery"},{"characterId":"zhongli","role":"SUPPORT","roleDesc":"shield and interruption protection"}]}]`

## mavuika:2

- R1 `0dfbb1f22828412631f0e26a2cf08cb26d171c2ffb69208e435a015973b351d4`
- R2 `c3907bce68c5dc2fa8c30fe3f9b588cf16b156d501c48f234ce0d2984f51f6d7`
- artifacts — The listed Xilonen lineup already has a natural Scroll holder. Set a non-overlapping Skill set first.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `artifacts` — `[{"setIds":["15037"],"constellation":"C0"},{"setIds":["15032"],"constellation":"C0"}]` → `[{"setIds":["15032"],"constellation":"C0"},{"setIds":["15037"],"constellation":"C0"}]`

## raiden-shogun:2

- R1 `9d9fc7a3951d19d0c1adce59b1236c8857ca343a21cbf12f9616a77250bc6074`
- R2 `c8954331c8a123a6c16c34191aa11bb15e501f66797793dee4583524f186aeb5`
- talents — Character level and EM drive transformative reaction damage. Remove a ranked Burst and Normal Attack recommendation for the dedicated trigger role.
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `notesEn` — `"Skill triggers cores off field when a damageable target is hit. Her Burst is optional for this role. Shields can prevent coordinated Skill triggers."` → `"Skill triggers cores off field when a damageable target is hit. Her Burst is optional for this role. Shields can prevent coordinated Skill triggers. Raise Raiden to level 90 first. Skill ranks help its utility, while the reaction itself does not scale with talent level."`
- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `talentPriority` — `["Skill","Burst","Normal Attack"]` → `["Skill"]`
- `teams` — `[{"name":"Off-field Hyperbloom trigger","description":"Skill triggers cores off field when a damageable target is hit. Her Burst is optional for this role. Shields can prevent coordinated Skill triggers.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"raiden-shogun","role":"SUB_DPS"},{"characterId":"nahida","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"},{"characterId":"sangonomiya-kokomi","role":"TEAMMATE"}]}]` → `[{"name":"Off-field Hyperbloom trigger","description":"Skill triggers cores off field when a damageable target is hit. Her Burst is optional for this role. Shields can prevent coordinated Skill triggers.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"raiden-shogun","role":"SUB_DPS","roleDesc":"off-field Hyperbloom trigger"},{"characterId":"nahida","role":"SUPPORT","roleDesc":"Dendro application"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"off-field Hydro"},{"characterId":"sangonomiya-kokomi","role":"SUPPORT","roleDesc":"Hydro sustain and normal-attack driver"}]}]`

## sucrose:1

- R1 `db746157c4213b4f3e957deea37d982bd0772afec1aaa33964f40f56a1937ee4`
- R2 `52e22b811c2fb6e04aa22891b7e309bd00e1f1d148d89ca24dab0f73821c21d0`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Swirl driver and EM share","description":"Level and EM drive Swirl. On-field elemental reactions trigger Viridescent. Sacrificial Fragments adds Skill casts and Thrilling Tales trades EM for a targeted buff.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"sucrose","role":"SUPPORT"},{"characterId":"fischl","role":"TEAMMATE"},{"characterId":"beidou","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"}]}]` → `[{"name":"Swirl driver and EM share","description":"Level and EM drive Swirl. On-field elemental reactions trigger Viridescent. Sacrificial Fragments adds Skill casts and Thrilling Tales trades EM for a targeted buff.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"sucrose","role":"SUPPORT","roleDesc":"on-field Swirl driver"},{"characterId":"fischl","role":"SUB_DPS","roleDesc":"Oz and Electro battery"},{"characterId":"beidou","role":"SUB_DPS","roleDesc":"multi-target Stormbreaker damage"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"Hydro and defensive utility"}]}]`

## xiangling:1

- R1 `e392185a2378353735d194e4f69349c244c5484864ec32b142e8005bb4acb311`
- R2 `8b217db9e2b920e674bcb00f0de81648a871373e016fbb24d028ef1eb1b2847e`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Off-field Vaporize Burst","description":"80-energy Pyronado rewards funneling and snapshots relevant buffs. ER Sands is the safe starting option, and ATK or EM may win once Energy is covered.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"xiangling","role":"SUB_DPS"},{"characterId":"bennett","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"},{"characterId":"sucrose","role":"TEAMMATE"}]}]` → `[{"name":"Off-field Vaporize Burst","description":"80-energy Pyronado rewards funneling and snapshots relevant buffs. ER Sands is the safe starting option, and ATK or EM may win once Energy is covered.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"xiangling","role":"SUB_DPS","roleDesc":"off-field Pyro and Vaporize trigger"},{"characterId":"bennett","role":"SUPPORT","roleDesc":"ATK buff, healing and Pyro battery"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"off-field Hydro"},{"characterId":"sucrose","role":"SUPPORT","roleDesc":"on-field Swirl driver"}]}]`

## yelan:1

- R1 `804b2432284bad6f47c2853748b7fad8448ccc03a0e63a416e1c4869e5cf5bc6`
- R2 `e5b2bdf37df5cf9aae69f4a7a395348e0c1c69caf6e690edd065ab0496f7ae8e`
- weapons — Slingshot refinement does not improve its CRIT Rate or Exquisite Throw.
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `weapons` — `[{"weaponId":"15508","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"15401","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"15304","isF2P":false,"refinement":5,"constellation":"C0"}]` → `[{"weaponId":"15508","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"15401","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"15304","isF2P":false,"refinement":1,"constellation":"C0"}]`
- `teams` — `[{"name":"Off-field HP Hydro damage","description":"Burst relies on normal-attack triggers. Favonius is the energy option. Slingshot is primarily a CRIT stat stick for this role.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"yelan","role":"SUB_DPS"},{"characterId":"hu-tao","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"},{"characterId":"zhongli","role":"TEAMMATE"}]}]` → `[{"name":"Off-field HP Hydro damage","description":"Burst relies on normal-attack triggers. Favonius is the energy option. Slingshot is primarily a CRIT stat stick for this role.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"yelan","role":"SUB_DPS","roleDesc":"off-field Hydro and HP-scaled Burst"},{"characterId":"hu-tao","role":"MAIN_DPS","roleDesc":"Pyro carry weaving normal attacks"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"off-field Hydro and Hydro battery"},{"characterId":"zhongli","role":"SUPPORT","roleDesc":"shield and interruption protection"}]}]`

## zhongli:1

- R1 `640a895e0a862096fbd0873713df9fcd3303ccd33734559e5ecf8d0dbd4197ae`
- R2 `9bae40b0ea84b658ae89b3a46645ab2fcfad33a2faca781d3639f6f7aa3841a1`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"HP shield support","description":"Use held Skill for the HP shield and universal nearby resistance reduction. Tenacity depends on pillar contact, and Burst is optional in strict shield rotations.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"zhongli","role":"SUPPORT"},{"characterId":"hu-tao","role":"TEAMMATE"},{"characterId":"xingqiu","role":"TEAMMATE"},{"characterId":"yelan","role":"TEAMMATE"}]}]` → `[{"name":"HP shield support","description":"Use held Skill for the HP shield and universal nearby resistance reduction. Tenacity depends on pillar contact, and Burst is optional in strict shield rotations.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"zhongli","role":"SUPPORT","roleDesc":"shield and resistance reduction"},{"characterId":"hu-tao","role":"MAIN_DPS","roleDesc":"Pyro Vape carry"},{"characterId":"xingqiu","role":"SUB_DPS","roleDesc":"off-field Hydro and resistance to interruption"},{"characterId":"yelan","role":"SUB_DPS","roleDesc":"off-field Hydro and damage buff"}]}]`

## iansan:1

- R1 `cf1282d20e360bcfd13db31a7460c2327ca4cb243448a5920ac85c83270d187f`
- R2 `c712701ccbe71b0912e7d9fa758375394cc7cadc4d11bf153fd64ce002bf198f`
- weapons — Rightful Reward refunds Energy when the wearer is healed; the draft lacks a lineup to establish that condition.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `weapons` — `[{"weaponId":"13407","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"13425","isF2P":true,"refinement":1,"constellation":"C0"},{"weaponId":"13402","isF2P":true,"refinement":1,"constellation":"C0"}]` → `[{"weaponId":"13407","isF2P":false,"refinement":1,"constellation":"C0"},{"weaponId":"13402","isF2P":true,"refinement":1,"constellation":"C0"}]`

## klee:1

- R1 `c8c2744093f99ab7d4445899ce96e204733e939c0efadf3ec6922dad6cfc9406`
- R2 `a340f150b4ed3510a115989e3584aca6eb1ab843682058bf642f021aa62bc01c`
- weapons — Mono Pyro does not guarantee useful damage from The Widsith EM song. Preserve the option but disclose its inactive outcome in this archetype.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`

## varesa:1

- R1 `87cac81c8465450f80745d9fc2f11a06aae4673e5626989106d01b8eb7a5a39a`
- R2 `40a836e36441636afab8747636c4aa5f7bc2e4452a87c28435b147f1f8410f84`
- teams — Make the named team rotation reviewable by assigning each member’s actual job.

- `source` — `"character-build-catalog-7.2-r1"` → `"character-build-catalog-7.2-r2"`
- `teams` — `[{"name":"Electro plunge carry","description":"Normal talent governs plunge scaling. Xianyun enables the plunge support package and Furina wants team healing.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"varesa","role":"MAIN_DPS"},{"characterId":"iansan","role":"TEAMMATE"},{"characterId":"xianyun","role":"TEAMMATE"},{"characterId":"furina","role":"TEAMMATE"}]}]` → `[{"name":"Electro plunge carry","description":"Normal talent governs plunge scaling. Xianyun enables the plunge support package and Furina wants team healing.","reviewStatus":"EXPERIMENTAL","members":[{"characterId":"varesa","role":"MAIN_DPS","roleDesc":"on-field plunge and Burst"},{"characterId":"iansan","role":"SUPPORT","roleDesc":"movement-sensitive ATK buff"},{"characterId":"xianyun","role":"SUPPORT","roleDesc":"plunge support and team healing"},{"characterId":"furina","role":"SUB_DPS","roleDesc":"off-field Hydro and Fanfare"}]}]`
