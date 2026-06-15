"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nilou = void 0;
exports.nilou = {
    characterId: "nilou",
    tier: null,
    role: null,
    recommendedC: null,
    tierNoteEn: [],
    tierNoteVi: [],
    talentPriority: [
        "Skill",
        "Burst",
        "Normal Attack"
    ],
    signatureWeapons: [],
    teams: [
        {
            name: "Nilou's Bountiful Bloom",
            rank: "A",
            description: "A Hydro-Dendro team built around Nilou's passive, which turns Bloom cores into Bountiful Cores that explode faster and deal large AoE Dendro damage. Barbara drives on-field, applying Hydro and healing, while Collei and Traveler (Dendro) provide off-field Dendro application.\n\nNilou's passive transforms Bloom cores into Bountiful Cores when the team consists only of Hydro and Dendro characters, resulting in faster explosions and larger AoE damage.\n\nTeam composition: Barbara (Hydro Main DPS), Nilou (Hydro Sub DPS), Collei (Dendro Sub DPS), Traveler (Dendro) (Dendro Support)",
            members: [
                {
                    characterId: "barbara",
                    role: "Main DPS",
                    roleDesc: "Acts as the on-field driver. Elemental Skill applies Hydro to nearby enemies and heals the party continuously.",
                    weapons: [
                        "Sacrificial Fragments"
                    ],
                    artifacts: [
                        "4pc Flower of Paradise Lost"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nilou",
                    role: "Sub DPS",
                    roleDesc: "Provides Hydro for Bloom reactions. Her passive enables Bountiful Cores, which explode faster and deal larger AoE Dendro damage.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "collei",
                    role: "Sub DPS",
                    roleDesc: "Provides off-field Dendro application for triggering Bloom.",
                    weapons: [
                        "Elegy for the End",
                        "Sacrificial Bow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "traveler-dendro",
                    role: "Support",
                    roleDesc: "Provides off-field Dendro application for triggering Bloom.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Nilou Bloom Team #2",
            rank: "S",
            description: "A Bloom team utilizing Nilou's Bountiful Cores with Hydro and Dendro only. Kokomi on-field, Nahida and Collei off-field Dendro application.\n\nUtilize Nilou's passive to create Bountiful Cores from Bloom reactions, which explode faster and deal larger area damage. Kokomi provides sustained Hydro application while on-field, and Nahida and Collei apply Dendro off-field.\n\nTeam composition: Sangonomiya Kokomi (Hydro Main DPS), Nilou (Hydro Sub DPS), Nahida (Dendro Sub DPS), Collei (Dendro Sub DPS)",
            members: [
                {
                    characterId: "sangonomiya-kokomi",
                    role: "Main DPS",
                    roleDesc: "Kokomi is the Main DPS in this team, her continuous Hydro attacks react with Dendro to trigger Bloom.",
                    weapons: [
                        "Everlasting Moonglow",
                        "Sacrificial Fragments"
                    ],
                    artifacts: [
                        "4pc Flower of Paradise Lost"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nilou",
                    role: "Sub DPS",
                    roleDesc: "Nilou is the Sub DPS in this team. She provides Hydro for triggering Bloom. Through her passive, if the team only consists of Dendro and Hydro characters, the cores become Bountiful Cores, which burst quicker and deal larger AoE DMG.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Sub DPS",
                    roleDesc: "Nahida mainly deals DMG with her Elemental Skill, which connects up to 8 enemies and deals Dendro DMG while triggering reactions. Her Elemental Burst buffs her Skill based on teammates' elements. With two Hydro characters, the duration of her Burst is increased.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "collei",
                    role: "Sub DPS",
                    roleDesc: "Collei provides Dendro off-field for triggering Bloom.",
                    weapons: [
                        "Elegy for the End",
                        "Sacrificial Bow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Bountiful Bloom Overload",
            rank: "S",
            description: "A Nilou Bloom team that maximizes Bountiful Core damage with off-field Hydro and Dendro.\n\nNilou's passive creates Bountiful Cores that burst quickly and deal AoE Bloom damage when the team consists only of <element type='dendro'>Dendro</element> and <element type='hydro'>Hydro</element> characters. Xingqiu provides consistent off-field <element type='hydro'>Hydro</element> application via his Burst, while Nahida applies <element type='dendro'>Dendro</element> with her Skill and boosts EM. Yaoyao heals and provides <element type='dendro'>Dendro</element> resonance.\n\nTeam composition: Nahida (Dendro Main DPS), Xingqiu (Hydro Sub DPS), Nilou (Hydro Sub DPS), Yaoyao (Dendro Support)",
            members: [
                {
                    characterId: "nahida",
                    role: "Main DPS",
                    roleDesc: "Main damage dealer via Skill that marks up to 8 enemies and triggers reactions. Burst extends duration and buffs Skill based on teammates' elements.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "Off-field <element type='hydro'>Hydro</element> application via Burst. Skill provides interruption resistance and damage reduction.",
                    weapons: [
                        "Xiphos' Moonlight"
                    ],
                    artifacts: [
                        "4pc Flower of Paradise Lost"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "nilou",
                    role: "Sub DPS",
                    roleDesc: "Enables Bountiful Cores via passive when team has only <element type='dendro'>Dendro</element> and <element type='hydro'>Hydro</element>. Provides <element type='hydro'>Hydro</element> application for Bloom.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "yaoyao",
                    role: "Support",
                    roleDesc: "Healer and <element type='dendro'>Dendro</element> resonance. Uses Tenacity of the Millelith to boost team ATK and provide a safe environment.",
                    weapons: [
                        "Staff of Homa",
                        "Dialogues of the Desert Sages"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Nilou Bloom Team #4",
            rank: "S",
            description: "A powerful Bloom team that leverages Nilou's Bountiful Cores for devastating AoE damage. Nahida applies Dendro while Yelan and Nilou provide Hydro to trigger Bloom. Baizhu keeps the team alive with healing and shielding, also boosting Bloom damage.\n\nNilou's passive transforms normal Bloom cores into Bountiful Cores that explode faster and deal massive AoE damage when only Dendro and Hydro characters are in the party. Nahida applies Dendro off-field, while Yelan and Nilou apply Hydro to continuously generate cores.\n\nTeam composition: Nahida (Dendro Main DPS), Yelan (Hydro Sub DPS), Nilou (Hydro Sub DPS), Baizhu (Dendro Support)",
            members: [
                {
                    characterId: "nahida",
                    role: "Main DPS",
                    roleDesc: "Nahida mainly deals DMG via her Elemental Skill, which connects up to 8 enemies and deals Dendro DMG while triggering reactions. Her Elemental Burst buffs her Skill based on teammates' elements. With two Hydro characters, Burst duration is increased.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Yelan continuously applies Hydro to enemies, reacting with Dendro to trigger Bloom.",
                    weapons: [
                        "Aqua Simulacra",
                        "The Stringless"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "nilou",
                    role: "Sub DPS",
                    roleDesc: "Nilou provides Hydro for triggering Bloom. Her passive transforms normal cores into Bountiful Cores that burst quicker and deal larger AoE damage.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "baizhu",
                    role: "Support",
                    roleDesc: "Baizhu provides both Shield and Healing to protect the team. The DMG of Bloom is increased based on his Max HP via his passive talent.",
                    weapons: [
                        "Jadefall's Splendor",
                        "Prototype Amber",
                        "Favonius Codex"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Nilou Lunar Bloom",
            rank: "SS",
            description: "A Nilou Bloom team that transforms cores into Bountiful Cores with Lauma's Lunar Bloom for increased damage and crit capability.\n\nNilou enables Bountiful Cores with only Dendro and Hydro characters. Lauma's Lunar Bloom allows cores to crit and deal higher damage, while Kokomi provides consistent Hydro application and Nahida applies Dendro and buffs.\n\nTeam composition: Nilou (Hydro Main DPS), Sangonomiya Kokomi (Hydro Support), Nahida (Dendro Sub DPS), Lauma (Dendro Support)",
            members: [
                {
                    characterId: "nilou",
                    role: "Main DPS",
                    roleDesc: "Provides Hydro for Bloom. Through her passive, if team only has Dendro and Hydro, cores become Bountiful Cores, which burst quicker and deal larger AoE DMG.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "sangonomiya-kokomi",
                    role: "Support",
                    roleDesc: "Her Elemental Skill's attacks trigger Hydro every two seconds for triggering elemental reactions.",
                    weapons: [
                        "Everlasting Moonglow",
                        "Sacrificial Fragments"
                    ],
                    artifacts: [
                        "4pc Flower of Paradise Lost"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Sub DPS",
                    roleDesc: "Mainly deals DMG via Elemental Skill, connecting 8 enemies and dealing Dendro DMG while triggering reactions. Elemental Burst buffs Elemental Skill based on teammates' elements.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "ATK%"
                    ]
                },
                {
                    characterId: "lauma",
                    role: "Support",
                    roleDesc: "Transforms Bloom into Lunar Bloom, which deals higher damage and can crit. Elemental Skill accumulates stacks to boost Lunar Bloom DMG. Reduces enemies' Dendro and Hydro RES, and increases team's Lunar Bloom damage based on her Elemental Mastery.",
                    weapons: [
                        "Nightweaver's Glass",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Silken Moon's Serenade"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "ATK%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Lunar Bloom Nilou",
            rank: "SS",
            description: "A team that leverages Nilou's passive to create Bountiful Cores and Lauma's transformation into Lunar Bloom for massive AoE DMG.\n\nUse only Hydro and Dendro characters to trigger Bountiful Cores from Nilou's passive, which are then enhanced by Lauma into Lunar Bloom that can crit and deal higher damage.\n\nTeam composition: Nilou (Hydro Main DPS), Xingqiu (Hydro Sub DPS), Nahida (Dendro Sub DPS), Lauma (Dendro Support)",
            members: [
                {
                    characterId: "nilou",
                    role: "Main DPS",
                    roleDesc: "Provides Hydro for Bloom. Passive creates Bountiful Cores that explode faster and deal larger AoE DMG.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "His Burst continuously applies Hydro to enemies.",
                    weapons: [
                        "Xiphos' Moonlight"
                    ],
                    artifacts: [
                        "4pc Flower of Paradise Lost"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Sub DPS",
                    roleDesc: "Her Skill marks up to 8 enemies with Dendro and triggers reactions. Burst enhances her Skill based on team elements.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "ATK%"
                    ]
                },
                {
                    characterId: "lauma",
                    role: "Support",
                    roleDesc: "Converts Bloom into Lunar Bloom that can crit. Her Skill stacks boost Lunar Bloom DMG. Also reduces enemies' Dendro and Hydro RES and gains Lunar Bloom bonus from Elemental Mastery.",
                    weapons: [
                        "Nightweaver's Glass",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Silken Moon's Serenade"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "ATK%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Nilou Hydro Team #2",
            rank: "S",
            description: "Nilou as on-field hydro DPS with double off-field hydro from Yelan and Furina, supported by Jean for healing and <element type='anemo'>Anemo</element> resistance shred.\n\nThis team focuses on continuous <element type='hydro'>Hydro</element> application from multiple sources, allowing Nilou to deal damage with her high HP scaling, while Jean provides healing and resistance shred via <set>Viridescent Venerer</set>.\n\nTeam composition: Nilou (Hydro Main DPS), Yelan (Hydro Sub DPS), Furina (Hydro Sub DPS), Jean (Anemo Support)",
            members: [
                {
                    characterId: "nilou",
                    role: "Main DPS",
                    roleDesc: "Hydro main DPS using HP stacking for damage.",
                    weapons: [
                        "Splendor of Tranquil Waters",
                        "Wolf-Fang"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Attacks <element type='hydro'>Hydro</element> to enemies continuously with her Skill and Burst.",
                    weapons: [
                        "Aqua Simulacra",
                        "The Stringless"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "furina",
                    role: "Sub DPS",
                    roleDesc: "Provides off-field <element type='hydro'>Hydro</element> application and DMG increase via Burst based on HP changes.",
                    weapons: [
                        "Splendor of Tranquil Waters",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Golden Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "jean",
                    role: "Support",
                    roleDesc: "Heals and <element type='anemo'>Anemo</element> support that reduces enemy RES with <set>Viridescent Venerer</set> and heals the team.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Energy Recharge",
                        "CRIT Rate",
                        "ATK%"
                    ]
                }
            ]
        },
        {
            name: "Nilou Permafrost Team",
            rank: "S",
            description: "A Freeze team using Nilou as the on-field driver with Furina's off-field Hydro and Citlali's shield and resistance shred, while Escoffier provides healing and further RES reduction.\n\nFreeze enemies with constant Hydro from Nilou and Furina combined with Cryo from Citlali and Escoffier. Citlali reduces Pyro and Hydro RES when Frozen is triggered, while Escoffier lowers Cryo and Hydro RES. Furina buffs damage via HP fluctuation.\n\nTeam composition: Nilou (Hydro Main DPS), Citlali (Cryo Support), Furina (Hydro Sub DPS), Escoffier (Cryo Support)",
            members: [
                {
                    characterId: "nilou",
                    role: "Main DPS",
                    roleDesc: "Provides Hydro application to trigger Freeze. Uses Marechaussee Hunter to boost CRIT Rate with HP fluctuations from Furina.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "Wolf-Fang"
                    ],
                    artifacts: [
                        "4pc Marechaussee Hunter"
                    ],
                    substats: [
                        "CRIT Rate",
                        "CRIT DMG",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "citlali",
                    role: "Support",
                    roleDesc: "Provides a shield based on Elemental Mastery. Her skill summons a creature that deals AoE Cryo damage and reduces enemies' Pyro and Hydro RES when Frozen or Melt is triggered.",
                    weapons: [
                        "Starcaller's Watch",
                        "Sacrificial Fragments"
                    ],
                    artifacts: [
                        "4pc Scroll of the Hero of Cinder City"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "Energy Recharge",
                        "CRIT Rate",
                        "CRIT DMG"
                    ]
                },
                {
                    characterId: "furina",
                    role: "Sub DPS",
                    roleDesc: "Provides continuous Hydro application via Skill. Her Burst grants DMG increase based on HP changes of allies, which is triggered by her skill's HP drain and healing from Escoffier.",
                    weapons: [
                        "Splendor of Tranquil Waters",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Golden Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "escoffier",
                    role: "Support",
                    roleDesc: "Summons a Cooking Mek that deals Cryo damage. Burst heals the team and lowers enemies' Cryo and Hydro RES, scaling with number of Cryo and Hydro characters.",
                    weapons: [
                        "Symphonist of Scents",
                        "Favonius Lance"
                    ],
                    artifacts: [
                        "4pc Golden Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Nilou Vaporize",
            rank: "S",
            description: "Focus on triggering Vaporize reactions by applying Hydro with Nilou and Furina, then using Xiangling's Burst for massive off-field damage. Kazuha provides crowd control and elemental damage buffs.\n\nApply Hydro with Nilou and Furina, then use Xiangling's Pyro off-field Burst to trigger Vaporize. Kazuha groups enemies and res shreds to amplify damage.\n\nTeam composition: Nilou (Hydro Main DPS), Furina (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Xiangling (Pyro Sub DPS)",
            members: [
                {
                    characterId: "nilou",
                    role: "Main DPS",
                    roleDesc: "Nilou provides Hydro to trigger Vaporize. Build full HP to maximize her skill and Burst damage.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "Wolf-Fang"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "furina",
                    role: "Sub DPS",
                    roleDesc: "Furina's Skill applies continuous Hydro off-field. Her Burst increases DMG based on HP changes of allies, which is fueled by her skill draining HP and a healer restoring it.",
                    weapons: [
                        "Splendor of Tranquil Waters",
                        "Wolf-Fang"
                    ],
                    artifacts: [
                        "4pc Golden Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kaedehara-kazuha",
                    role: "Support",
                    roleDesc: "Kazuha groups enemies, applies crowd control, provides DMG buffs to teammates, and reduces elemental resistance of enemies.",
                    weapons: [
                        "Freedom-Sworn",
                        "Xiphos' Moonlight"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "Energy Recharge",
                        "CRIT Rate"
                    ]
                },
                {
                    characterId: "xiangling",
                    role: "Sub DPS",
                    roleDesc: "Xiangling's Burst provides massive off-field Pyro damage to trigger Vaporize.",
                    weapons: [
                        "Engulfing Lightning",
                        "Favonius Lance"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "Energy Recharge",
                        "CRIT Rate"
                    ]
                }
            ]
        }
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: "Chìa Khóa Khaj-Nisut",
            nameEn: "Key of Khaj-Nisut",
            subStat: "HP%",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Vũ khí trấn phái. Tăng lượng lớn HP% và chuyển đổi giới hạn HP thành Tinh Thông Nguyên Tố cho đồng đội.",
            passiveDescEn: "Signature sword; provides massive HP% boost and converts max HP to team Elemental Mastery.",
            iconUrl: "/images/weapons/UI_EquipIcon_Sword_Deshret.png"
        },
        {
            rank: 2,
            nameVi: "Ánh Trăng Xiphos",
            nameEn: "Xiphos' Moonlight",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Dòng phụ Tinh Thông Nguyên Tố; nội tại chuyển đổi Tinh Thông thành Hiệu Quả Nạp cho bản thân và cả đội.",
            passiveDescEn: "Elemental Mastery substat; passive converts EM to Energy Recharge for the equipping character and team.",
            iconUrl: "/images/weapons/UI_EquipIcon_Sword_Pleroma.png"
        },
        {
            rank: 3,
            nameVi: "Kiếm Bến Tàu",
            nameEn: "The Dockhand's Assistant",
            subStat: "HP%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí 4 sao tăng HP% giúp tối ưu hóa lượng máu tối đa cho Nilou.",
            passiveDescEn: "4-star sword providing HP% substat to help maximize Nilou's HP.",
            iconUrl: "/images/weapons/UI_EquipIcon_Sword_Mechanic.png"
        },
        {
            rank: 4,
            nameVi: "Tây Phong Kiếm",
            nameEn: "Favonius Sword",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Cung cấp Hiệu Quả Nạp cao giúp đáp ứng nhu cầu năng lượng và sinh hạt khi bạo kích.",
            passiveDescEn: "High Energy Recharge helps meet Burst cost, and passive generates particles on CRIT.",
            iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png"
        },
        {
            rank: 5,
            nameVi: "Kiếm Tế Lễ",
            nameEn: "Sacrificial Sword",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Cho phép làm mới hồi chiêu kỹ năng nguyên tố, hữu ích để thực hiện vũ điệu hai lần.",
            passiveDescEn: "Allows resetting Skill cooldown, useful to double trigger her dance steps.",
            iconUrl: "/images/weapons/UI_EquipIcon_Sword_Fossil.png"
        }
    ],
    bestArtifacts: [
        {
            setNameVi: "Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc",
            setNameEn: "Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc",
            pieces: 2,
            sands: [
                "HP%"
            ],
            goblet: [
                "HP%"
            ],
            circlet: [
                "HP%"
            ],
            subStatsPriority: [
                "HP%",
                "HP",
                "Elemental Mastery",
                "Energy Recharge"
            ]
        },
        {
            setNameVi: "Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc",
            setNameEn: "Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc",
            pieces: 2,
            sands: [
                "HP%"
            ],
            goblet: [
                "HP%"
            ],
            circlet: [
                "HP%"
            ],
            subStatsPriority: [
                "HP%",
                "HP",
                "Elemental Mastery",
                "Energy Recharge"
            ]
        },
        {
            setNameVi: "Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc",
            setNameEn: "Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc",
            pieces: 2,
            sands: [
                "HP%"
            ],
            goblet: [
                "HP%"
            ],
            circlet: [
                "HP%"
            ],
            subStatsPriority: [
                "HP%",
                "HP",
                "Elemental Mastery",
                "Energy Recharge"
            ]
        },
        {
            setNameVi: "Ký Ức Rừng Sâu",
            setNameEn: "Deepwood Memories",
            pieces: 4,
            sands: [
                "HP%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "HP%",
                "Tinh Thông Nguyên Tố"
            ],
            circlet: [
                "HP%",
                "Tinh Thông Nguyên Tố"
            ],
            subStatsPriority: [
                "HP%",
                "Elemental Mastery",
                "HP",
                "Energy Recharge"
            ]
        },
        {
            setNameVi: "Thiên Nham Vững Chắc",
            setNameEn: "Tenacity of the Millelith",
            pieces: 4,
            sands: [
                "HP%"
            ],
            goblet: [
                "HP%"
            ],
            circlet: [
                "HP%"
            ],
            subStatsPriority: [
                "HP%",
                "HP",
                "Elemental Mastery",
                "Energy Recharge"
            ]
        }
    ]
};
