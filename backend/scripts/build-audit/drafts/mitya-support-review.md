# Mitya C0 Steady State Support

**PENDING_REVIEW · 2026-11-20 · Genshin Impact 7.2.** Character ID `mitya` (game ID `10000136`). This is a Tap Skill, off-field support build. Recommendations are original selections cross-checked against existing `genshin-db@5.2.15` talent and item data and the two independent guides below. “High” means the mechanic is supported by game data. “Medium” means practical value depends on the lineup or rotation. Every row remains pending maintainer review.

| Recommendation | ID | Rationale and condition | Confidence · review |
|---|---|---|---|
| Thrilling Tales of Dragon Slayers R5 | `14302` | Switch directly from Mitya to the ATK-scaling carry. R5 gives that character 48% ATK for 10s, with a 20s cooldown. Budget 3-star wish weapon. Confirm the desired carry receives the buff. [Game data][data] · [Icy Veins build][iv] | High mechanic, medium uptime · Pending |
| Wandering Evenstar R1 | `14416` | EM contributes to Mitya's kit. It also supplies a smaller periodic team ATK buff while Mitya is off-field, allowing flexible switch order. Requires ownership of the limited-wish weapon. [Game data][data] · [GameWith build][gw] | High mechanic · Pending |
| Fruit of Fulfillment R1 | `14417` | Craftable option if Mitya personally triggers reactions often enough to maintain EM stacks. Its ER is secondary here. The ATK trade-off and actual stack uptime depend on reaction ownership. [Game data][data] | Medium fit · Pending |
| Favonius Codex R1 | `14401` | Use if the team needs particles and Mitya can land a critical hit while active. Off-field Core hits cannot proc Favonius. At R1 the proc is conditional even after a crit, so don't count on a proc every rotation. [Game data][data] · [KQM mechanics][fav] | High mechanic, medium proc reliability · Pending |
| Heart of the Furnace 4pc | `15048` | The off-field Core can activate the team's Stellar Glimmer reaction damage bonus. Equip one copy per team and confirm eligible hits in the rotation. [Game data][data] · [GameWith build][gw] | High mechanic, medium uptime · Pending |
| Tenacity of the Millelith 4pc | `15017` | Use if another teammate carries Furnace or team ATK and shield strength are more valuable. Skill hits can refresh the 3s buff from off-field. Actual uptime depends on Core hits, target access and beacon supply. [Game data][data] · [Icy Veins build][iv] · [GameWith build][gw] | High mechanic, medium uptime · Pending |
| Sands / Goblet / Circlet | `mitya` | EM / EM / EM. Consider CRIT Rate circlet if Favonius needs more reliable on-field crits. The Stellar Jubilee base reaction bonus caps at 500 EM for +14%. EM beyond that still affects Skill damage and Evenstar's buff. [Game data][data] · [GameWith build][gw] | High mechanic · Pending |
| Substats | `mitya` | EM first as a support default, then CRIT Rate and CRIT DMG for Core damage, with extra CRIT Rate useful for Favonius. ER is optional for this Tap Skill rotation. Only set an ER target if planning a regular Burst and measuring it with the actual lineup, particle catches and Favonius procs. [Game data][data] · [Icy Veins build][iv] · [GameWith build][gw] | High distinction, medium exact stat order · Pending |
| Talents | `mitya` | Skill first because its damage coefficients scale the Steady State Core. Burst second only if used for damage. Its three beacons and 60-energy cost stay fixed across talent levels. Normal Attack can remain at base level. The team EM per held beacon comes from the passive. [Game data][data] · [Icy Veins build][iv] · [GameWith build][gw] | High · Pending |
| Wriothesley / Mitya / Fischl / Diona | `wriothesley`, `mitya`, `fischl`, `diona` | Wriothesley drives Cryo, Fischl supplies Oz's off-field Electro, Diona shields/heals and Mitya converts the party's Superconduct into Stellar-Conduct. Use Diona → Fischl → Mitya tap Skill → Wriothesley as a starting sequence, especially with Thrilling Tales. Diona's EM buff assumes C6 and its HP/field conditions. Exact aura ownership, Fischl A4 behavior, buff uptime and performance for this four-slot lineup remain untested. [Game data][data] · [Icy Veins teams][iv-team] · [GameWith teams][gw-team] | Medium lineup · Pending |

## Changes from the previous draft

- **Burst priority and ER.** Skill replaces Burst as first talent. EM replaces ER as the default sands and substat priority. Icy Veins discusses a Support rotation without a required Burst. GameWith's 120–170% range is for an off-field setup that uses Burst. It is not a tested target for this lineup. The draft assumes C0 and does not budget C1 energy refunds.
- **Weapons.** Added Thrilling Tales and Evenstar for team ATK support. Kept Fruit and Favonius as conditional alternatives. Removed Prototype Amber (`14406`). At R1 it refunds 12 energy and heals after Burst, but the build does not schedule Burst every rotation and Diona already covers sustain. The healing and refund are valid if a future Burst-oriented variant needs them. [Game data][data]
- **Artifacts.** Replaced Noblesse Oblige (`15007`) with eligible off-field options. Noblesse needs a Burst for its 12s team ATK buff and does not stack with another Noblesse carrier. If Diona already wears it, Mitya can carry Furnace or Tenacity. Removed Wanderer's Troupe (`15003`) + Emblem of Severed Fate (`15020`): the flat EM/ER fallback is valid but gives up a team buff and emphasizes ER for a rotation where Burst is optional. [Game data][data]
- **Team.** Kept the four members. Both guides support the broader Mitya–Wriothesley pairing or the relevant Cryo/Electro roles. Neither is evidence for the exact lineup's rotation or ranking. This draft assigns roles and no tier.

The existing schema represents one build and lists item alternatives without their detailed conditions. This review record contains those conditions. Use the existing CLI only after explicit approval.

[data]: https://github.com/theBowja/genshin-db
[iv]: https://www.icy-veins.com/genshin-impact/mitya-guide-best-builds
[iv-team]: https://www.icy-veins.com/genshin-impact/mitya-team-guide
[gw]: https://gamewith.net/genshin-impact/article/show/76475
[gw-team]: https://gamewith.net/genshin-impact/article/show/78076
[fav]: https://keqingmains.com/q/mona-quickguide/
