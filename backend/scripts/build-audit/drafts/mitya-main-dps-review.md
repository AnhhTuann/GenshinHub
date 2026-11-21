# Mitya C0 On-Field Main DPS

**PENDING_REVIEW · 2026-11-20 · Genshin Impact 7.2.** Local character ID `mitya` (game ID `10000136`). This draft is the on-field Main DPS playstyle only: Mitya holds Elemental Skill to create the Overloaded Detection Core and spends Gradient Beacons with his special Charged Attack. Recommendations are original selections checked against `genshin-db@5.2.15` mechanics and the structured build/team data exposed at [Genshin-Builds][gb]; the GameWith role comparison at [GameWith][gw] was used only to confirm that Tap Skill is the off-field playstyle. No external tier, popularity percentage, or guide prose was imported.

| Recommendation | ID | Rationale and condition | Confidence · review |
|---|---|---|---|
| Starsealed Edict R1 | `14525` | Signature weapon. Its CRIT DMG and EM-related bonuses match a CRIT/EM-scaling on-field reaction driver. Limited 5-star; R1 assumed. | High mechanics · Pending |
| Reliquary of Truth R1 | `14521` | Raw CRIT DMG and EM support the same scaling; some passive effects are not fully used. Limited 5-star; R1 assumed. | High stat fit · Pending |
| Lost Prayer to the Sacred Winds R1 | `14502` | CRIT Rate plus stacking Elemental DMG Bonus supports extended on-field uptime; movement-based stacking suits the beacon playstyle. Standard 5-star; R1 assumed. | Medium-high · Pending |
| Gilded Dreams 4pc | `15026` | EM 2pc plus reaction-triggered EM for differing-element teammates directly amplifies Stellar-Conduct. In the listed teams, Odette is Cryo while Sucrose/Yae/Valeriy are not Electro, so the 4pc has usable uptime; Mitya must trigger a reaction. | High with reaction condition · Pending |
| Disenchantment in Deep Shadow 4pc | `15046` | Stellar-Conduct DMG Bonus and additional CRIT Rate against affected enemies are aligned with the on-field role. 2pc ATK is a weaker part of the set. | High · Pending |
| Wanderer's Troupe 2 + Gilded Dreams 2 | `15003`, `15026` | Flat EM from two 2pc bonuses; no reaction requirement. Use as a temporary/emergency setup until a complete 4pc set is available. | Medium placeholder · Pending |
| Sands / Goblet / Circlet | `mitya` | EM / EM / CRIT Rate or CRIT DMG. Mitya's passive adds up to 20% CRIT Rate in combat, so avoid over-capping CRIT Rate before combat. No ER main stat in this role; ER is a lower substat priority because on-field Mitya catches his own particles. | High · Pending |
| Substats | `mitya` | CRIT DMG and CRIT Rate first, then EM, then ER. This matches the structured Main DPS priority and the independent mechanic that personal Charged Attack damage is the dominant damage source. GameWith expresses CRIT Rate ≈ CRIT DMG, which is treated as equivalent ordering, not a separate build. | High · Pending |
| Talents | `mitya` | Normal Attack first because the special Charged Attack scales with it; Burst second for its AoE hit and beacons; Skill last for this playstyle. C0 assumed. | High · Pending |
| Mitya / Odette / Sucrose / Valeriy | `mitya`, `odette`, `sucrose`, `valeriy` | Mitya Main DPS; Odette Sub DPS; Sucrose Support; Valeriy Support. All slots C0 or lower in the source data. Odette converts party-triggered Superconduct; Sucrose provides VV resistance reduction and EM sharing; Valeriy shields. Artifact overlap: Odette = Heart of the Furnace, Sucrose = VV, Valeriy = Gladiator + Shimenawa; Mitya's DPS sets do not compete with those unique support slots. | High lineup identity, medium local performance evidence · Pending |
| Mitya / Odette / Yae Miko / Valeriy | `mitya`, `odette`, `yae-miko`, `valeriy` | Mitya Main DPS; Odette Sub DPS; Yae Miko Sub DPS; Valeriy Support. All slots C0 or lower in the source data. Yae Miko adds off-field Electro and particles, lowering Mitya's ER need. Artifact overlap: Odette = Heart of the Furnace, Yae Miko = Disenchantment, Valeriy = Gladiator + Shimenawa; Mitya can still use Gilded Dreams or the 2+2 EM placeholder. | High lineup identity, medium local performance evidence · Pending |

Deliberately excluded: the Sandrone/Mitya/Odette/Alyosha and Cyno/Mitya/Odette/Alyosha lineups. The source assigns Mitya **Sub DPS** in both, so they are in the separate Support/Sub DPS draft. No external tier such as SS was copied into Admin `tier`.

[gb]: https://genshin-builds.com/en/character/mitya
[gw]: https://gamewith.net/genshin-impact/article/show/76475
