# A01 final Character Build review

2026-11-20 · Scope `bennett:1`, `fischl:1`, `xiangling:1`

**REVIEW_READY with a preservation policy. ADMIN_APPROVED 0. IMPORTED 0.** This package asks for review of exactly three R3 patches. Bennett and Xiangling change build metadata and stat recommendations while leaving the existing team, weapon and artifact collections in place. Fischl receives an explicit canonical equipment replacement and one new experimental team.

## Authorization target

| Candidate | Existing build and version | R2 checksum | R3 checksum |
|---|---|---|---|
| `bennett:1` | `legacy-bennett` v1 | `6e94ecbffb40fa65c7ddb251430d151127ec55c78f9af3ff1a08852e666f07eb` | `6c5527ba0bf9fc768bb41db2e2313ddd277fa3c85824f56c19b99e9bbced5744` |
| `fischl:1` | `legacy-fischl` v1 | `92483f765e9bbb0a0ca1caab7f3347f60431da958e98a8a39b1117e80cd6f703` | `1207015e89a97db353d5331a1b0ad8dc7b21e48e3b0226fd0dc54a8c93759744` |
| `xiangling:1` | `legacy-xiangling` v1 | `8b217db9e2b920e674bcb00f0de81648a871373e016fbb24d028ef1eb1b2847e` | `774f141372764dccc0ea67ea042012939be490d80d1b152d901eee875fc62056` |

- R2 batch checksum `1acfde1c57701c09a90574eab83c969abbd0554bf73e39c1cb083377e418ae36`
- R3 batch checksum `0cddce86d77d542f15cbc6ad59a9282591b5db1033efa70c6728e27f31f58ae1`

A fresh read-only development snapshot matched the original candidate baselines, including versions, full build fingerprints, default flags, and audit status. The original R2 candidates and manifest are frozen in `A01_ORIGINAL.json`. The successor candidates carry their old hashes and require a fresh decision. A02–A04 were outside this revision.

[Current batch manifest](READY_BATCHES.json) · [Exact R2 → R3 fields](REVISED_CANDIDATES.json) · [Original A01](A01_ORIGINAL.json) · [Team and equipment preservation analysis](A01_PRESERVATION_ANALYSIS.json)

## Bennett · C0 Support

Energy Recharge Sands stays first. HP% Sands is conditional on already meeting the rotation’s Energy needs. HP goblet and Healing Bonus circlet are sustain options, with CRIT Rate circlet when relying on Favonius. Burst > Skill > Normal Attack remains. Fantastic Voyage’s ATK bonus uses innate character Base ATK plus sword Base ATK. Artifact ATK% affects Bennett’s own damage and does not increase this bonus. The active character must be above 70% HP to receive the C0 buff.

| Shortlisted sword | ID | Base ATK at 90 | Refinement and condition |
|---|---|---:|---|
| Aquila Favonia | 11501 | 674 | R1, wish. Favor when ER is already covered. |
| Skyward Blade | 11502 | 608 | R1, wish. ER and high base ATK. |
| Sapwood Blade | 11417 | 565 | R1, craftable F2P. ER and solid base ATK without requiring the leaf to supply the buff. |
| Favonius Sword | 11401 | 454 | R1, wish. A critical hit while Bennett is on field gives a chance at particles, subject to its 12-second cooldown. Plan CRIT and confirm the actual proc. |

Noblesse is the general team ATK option, with one holder. Instructor is a lower-rarity alternative when Bennett triggers the reaction on field and the team can use EM. The Xiangling/Xingqiu/Sucrose example assumes Bennett funnels particles to Xiangling and Sucrose drives Xingqiu’s normal-attack triggers. The example remains in the notes and shortlist. Bennett’s eight active rosters stay untouched. [Genshin-Builds Bennett](https://genshin-builds.com/en/character/bennett) · [KQM Bennett Quick Guide](https://keqingmains.com/q/bennett-quickguide/) · [Bennett talent mechanics](https://library.keqingmains.com/bennett/)

## Fischl · C0 Sub DPS

ATK% Sands remains the off-field default. EM Sands is a conditional Aggravate alternative that competes with existing ATK/EM/CRIT substats and buffs. Electro goblet, CRIT circlet, off-field Golden Troupe and Skill > Burst > Normal Attack stay. Choose ER around the actual Skill/Burst Oz renewal cadence.

| Bow | ID | Refinement and condition |
|---|---|---|
| Polar Star | 15507 | R1, limited wish. Skill/Burst bonus applies without stacks. Distinct attack types earn independent timed ATK stacks. Set up useful stacks before the Oz snapshot, with no four-stack assumption. |
| The Stringless | 15402 | R1, wish. Its Skill/Burst passive and EM are useful for this Aggravate role. Existing option retained under its canonical ID. |
| Song of Stillness | 15425 | R1, craftable F2P. Fischl must receive healing. Get the buff before summoning or resummoning Oz. Healing that lands afterwards can refresh the weapon buff but does not retroactively refresh the existing Oz snapshot. |
| Alley Hunter | 15410 | R1, limited wish. Benefits from remaining off field. |
| Skyward Harp | 15501 | R1, standard wish. Existing option retained canonically as a situational CRIT stat stick. |

Keqing drives Electro application, Nahida maintains Dendro, Fischl contributes Oz and Aggravate follow-ups, and Yaoyao adds sustain and Dendro. This is a credible Quicken composition and remains **EXPERIMENTAL**. The Song of Stillness example requires Yaoyao to heal Fischl herself before Oz setup. A heal applied only to a different active teammate does not count, and Fischl’s C4 heal is outside scope. [Genshin-Builds Fischl](https://genshin-builds.com/en/character/fischl) · [KQM Fischl Quick Guide](https://keqingmains.com/q/fischl-quickguide/) · [KQM Keqing Quick Guide](https://keqingmains.com/q/keqing-quickguide/)

## Xiangling · C0 Sub DPS

The `sands` list and notes now agree. Use ER until the 80-Energy Pyronado is available each planned rotation. Then consider ATK% for direct Pyro or inconsistent Vaporize, or EM when Xiangling owns reactions consistently. Pyro goblet, CRIT circlet, and Burst > Skill > Normal Attack stay. Pyronado captures eligible stat buffs at cast, so set up Bennett first and funnel his Skill particles to Xiangling for the next rotation. Enemy-state-dependent bonuses are checked on hit.

| Shortlisted polearm | ID | Refinement and condition |
|---|---|---|
| The Catch | 13415 | R5, fishing F2P. ER plus Burst damage and Burst CRIT Rate, with no Energy refund from the passive. |
| Engulfing Lightning | 13509 | R1, limited wish. ER above 100% converts to ATK, and Burst temporarily grants more ER. |
| Favonius Lance | 13407 | R1, wish. CRIT and Xiangling’s field time are required for a proc. |
| Dragon’s Bane | 13401 | R1, wish. Damage passive depends on the enemy’s current Hydro or Pyro aura. Use once Energy is covered. |

Emblem remains the general Burst option, with the existing 2+2 mixes and Crimson Witch situational. The Bennett/Xingqiu/Sucrose Vaporize roster already exists in the legacy collection. The Melt, other Vaporize variations, Overvape and mono Pyro rosters remain active. [Genshin-Builds Xiangling](https://genshin-builds.com/en/character/xiangling) · [KQM Xiangling Guide](https://keqingmains.com/xiangling/) · [KQM Xiangling Quick Guide](https://keqingmains.com/q/xiangling-quickguide/)

The linked pages were accessed on 2026-11-20. IDs, Base ATK, raw item passives and talent mechanics were checked against the installed `genshin-db@5.2.15` and the live catalog. The text above is independently summarized.

## Legacy team and gear preservation

| Character | Teams | Weapons | Artifact options |
|---|---:|---:|---:|
| Bennett | 8 → 8 | 12 → 12 | 4 → 4 |
| Fischl | 0 → 1 experimental | 2 → 5 | 1 placeholder → 2 valid options |
| Xiangling | 8 → 8 | 19 → 19 | 5 → 5 |

The existing GraphQL resolver writes a **STAGED** audit at update time. The live recommendations remain unchanged until approval. For each supplied array, approval replaces the entire live collection in one transaction. An explicit empty array clears the collection. When a legacy revision first includes recommendation arrays, the resolver can archive the original child rows under an immutable baseline. Omitting all three arrays avoids replacement and reparenting, preserving the exact live child IDs and contents. Bennett’s and Xiangling’s patches omit all three. Fischl’s patch explicitly retains both valid prior bows under canonical IDs, replaces the non-set artifact placeholder with Golden Troupe and a valid 2+2, and adds the experimental roster. The frozen candidate supports before/after review. The older character-level CLI protects nonempty collections on apply, with a separate guarded rollback. It is outside this batch. Use the existing build-scoped GraphQL workflow.

### Bennett’s eight legacy teams

| Existing team | Editorial decision | Reason |
|---|---|---|
| Vaporize #3 | NEEDS_REVIEW | Klee can outrun Xingqiu’s Hydro. Check normal-attack triggers and reaction ownership. |
| Pure Pyro | UPDATE | Useful core. Resolve the historic `kazuha` alias to `kaedehara-kazuha` in a separately authorized team edit. |
| Thunder | UPDATE | Useful Electro buff core. Resolve the alias and distinguish Sara C6 from a C0 assumption. |
| Hu Tao Vaporize | NEEDS_REVIEW | Bennett’s healing can trade away Hu Tao’s below-half-HP effects. Check the specific rotation. |
| Vaporize #2 | UPDATE | Viable Yoimiya/Xingqiu core. Resolve the alias and check Pyro Swirl and interruption. |
| Superconduct | RETAIN | Fischl and Cryo enable Superconduct. Bennett C0 does not infuse Eula. |
| Vaporize #1 | UPDATE | Useful Tartaglia International core. Resolve the historic alias. |
| Vaporize | RETAIN | Yanfei normal attacks can drive Xingqiu before her charged attacks. |

### Xiangling’s eight legacy teams

| Existing team | Editorial decision | Reason |
|---|---|---|
| Melting #1 | RETAIN | Reverse Melt with Ganyu, Bennett battery and Zhongli protection. |
| Overload #2 | NEEDS_REVIEW | Possible quickswap. Check knockback and two-Burst Energy costs. |
| Vaporize #3 | RETAIN | The proposed Sucrose roster already exists. |
| Vaporize #1 | RETAIN | Tartaglia Hydro application supports Pyronado. |
| Overload #1 | NEEDS_REVIEW | Check timings and Sara constellation. No Hydro member is expected. |
| Vaporize #2 | RETAIN | Kokomi supplies Hydro and healing; align her driving window with Pyronado. |
| Raiden Overload Vaporize | RETAIN | Raiden drives and batteries. Hydro, Electro and Pyro allow Overvape. |
| Pure Pyro | RETAIN | Klee, Bennett and Anemo resistance support are coherent with Xiangling. |

No legacy team is proposed for removal. The four `UPDATE` findings document future alias corrections and remain outside the R3 write payload. All 31 Bennett and Xiangling weapon rows map by ID or localized name to catalog weapons. The shortlist leaves other legitimate weapons situational or legacy-retained. Their artifact options likewise remain, including niche Scroll/Deepwood assignments or mixed Burst sets. This review makes no blanket claim that every retained option is optimal.

## Verification and remaining boundary

- Prisma schema validation passed. Development migration status showed five applied migrations and an up-to-date schema. All five migrations also applied successfully in the fresh isolated database.
- Both scoped artifact tests passed. The second dry run matched the first byte for byte. The checks rejected mismatched checksums and stale build baselines.
- The HTTP GraphQL lifecycle test passed against `genshinhub_test_build_final_review_a01final20261120`. It verified authorization, staging, rejection, stale and concurrent edits, checksum guards, idempotent replay, audit history, rollback, the default-build constraint, and public output. Bennett and Xiangling retained every existing team and equipment row. The test exercised an explicit Fischl team update, an empty-array removal and restoration. Mitya’s isolated control builds were preserved. Seven approvals occurred in the isolated fixture.
- All three isolated Character Detail pages returned HTTP 200 and passed the browser assertions. The development-mode server logged one transient aborted request during navigation and a guest session check returned HTTP 401.
- Read-only development snapshots before and after matched byte for byte for the three target builds, their relationships and audit records, and the inspected catalog identities. `git diff --check` passed.

A01 is safe for **human approval of the exact R3 payload**, subject to a fresh checksum and baseline preflight. The unresolved Bennett aliases and experimental Fischl rotation remain documented. Development requires a separate explicit authorization naming the intended IDs and checksums. No real approval or import ran here.
