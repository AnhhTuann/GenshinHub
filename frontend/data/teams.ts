export interface TeamMemberDetail {
  characterId: string;
  role: string;      // "Main DPS", "Sub DPS", "Support", etc.
  roleDesc: string;  // Description of what the character does in this team
  weapons: string[];
  artifacts: string[];
  substats: string[];
}

export interface DetailedTeam {
  name: string;
  rank: "SS" | "S" | "A" | "B";
  description: string;
  members: TeamMemberDetail[];
}

export const detailedTeamsData: Record<string, DetailedTeam[]> = {
  "nilou": [
    {
      name: "Nilou's Bountiful Bloom",
      rank: "A",
      description: "A Hydro-Dendro team built around Nilou's passive, which turns Bloom cores into Bountiful Cores that explode faster and deal large AoE Dendro damage. Barbara drives on-field, applying Hydro and healing, while Collei and Traveler (Dendro) provide off-field Dendro application.\n\nNilou's passive transforms Bloom cores into Bountiful Cores when the team consists only of Hydro and Dendro characters, resulting in faster explosions and larger AoE damage.\n\nTeam composition: Barbara (Hydro Main DPS), Nilou (Hydro Sub DPS), Collei (Dendro Sub DPS), Traveler (Dendro) (Dendro Support)",
      members: [
        {
          characterId: "barbara",
          role: "Main DPS",
          roleDesc: "Acts as the on-field driver. Elemental Skill applies Hydro to nearby enemies and heals the party continuously.",
          weapons: ["Sacrificial Fragments"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Provides Hydro for Bloom reactions. Her passive enables Bountiful Cores, which explode faster and deal larger AoE Dendro damage.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "collei",
          role: "Sub DPS",
          roleDesc: "Provides off-field Dendro application for triggering Bloom.",
          weapons: ["Elegy for the End", "Sacrificial Bow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "traveler-dendro",
          role: "Support",
          roleDesc: "Provides off-field Dendro application for triggering Bloom.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
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
          weapons: ["Everlasting Moonglow", "Sacrificial Fragments"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Nilou is the Sub DPS in this team. She provides Hydro for triggering Bloom. Through her passive, if the team only consists of Dendro and Hydro characters, the cores become Bountiful Cores, which burst quicker and deal larger AoE DMG.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Nahida mainly deals DMG with her Elemental Skill, which connects up to 8 enemies and deals Dendro DMG while triggering reactions. Her Elemental Burst buffs her Skill based on teammates' elements. With two Hydro characters, the duration of her Burst is increased.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "collei",
          role: "Sub DPS",
          roleDesc: "Collei provides Dendro off-field for triggering Bloom.",
          weapons: ["Elegy for the End", "Sacrificial Bow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
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
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Off-field <element type='hydro'>Hydro</element> application via Burst. Skill provides interruption resistance and damage reduction.",
          weapons: ["Xiphos' Moonlight"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Enables Bountiful Cores via passive when team has only <element type='dendro'>Dendro</element> and <element type='hydro'>Hydro</element>. Provides <element type='hydro'>Hydro</element> application for Bloom.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "yaoyao",
          role: "Support",
          roleDesc: "Healer and <element type='dendro'>Dendro</element> resonance. Uses Tenacity of the Millelith to boost team ATK and provide a safe environment.",
          weapons: ["Staff of Homa", "Dialogues of the Desert Sages"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT Rate", "HP%", "Energy Recharge"]
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
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Yelan continuously applies Hydro to enemies, reacting with Dendro to trigger Bloom.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Nilou provides Hydro for triggering Bloom. Her passive transforms normal cores into Bountiful Cores that burst quicker and deal larger AoE damage.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Baizhu provides both Shield and Healing to protect the team. The DMG of Bloom is increased based on his Max HP via his passive talent.",
          weapons: ["Jadefall's Splendor", "Prototype Amber", "Favonius Codex"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["CRIT Rate", "HP%", "Energy Recharge"]
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
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "Elemental Mastery"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Support",
          roleDesc: "Her Elemental Skill's attacks trigger Hydro every two seconds for triggering elemental reactions.",
          weapons: ["Everlasting Moonglow", "Sacrificial Fragments"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Mainly deals DMG via Elemental Skill, connecting 8 enemies and dealing Dendro DMG while triggering reactions. Elemental Burst buffs Elemental Skill based on teammates' elements.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Transforms Bloom into Lunar Bloom, which deals higher damage and can crit. Elemental Skill accumulates stacks to boost Lunar Bloom DMG. Reduces enemies' Dendro and Hydro RES, and increases team's Lunar Bloom damage based on her Elemental Mastery.",
          weapons: ["Nightweaver's Glass", "Wandering Evenstar"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
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
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "His Burst continuously applies Hydro to enemies.",
          weapons: ["Xiphos' Moonlight"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Her Skill marks up to 8 enemies with Dendro and triggers reactions. Burst enhances her Skill based on team elements.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Converts Bloom into Lunar Bloom that can crit. Her Skill stacks boost Lunar Bloom DMG. Also reduces enemies' Dendro and Hydro RES and gains Lunar Bloom bonus from Elemental Mastery.",
          weapons: ["Nightweaver's Glass", "Wandering Evenstar"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
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
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Attacks <element type='hydro'>Hydro</element> to enemies continuously with her Skill and Burst.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides off-field <element type='hydro'>Hydro</element> application and DMG increase via Burst based on HP changes.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Heals and <element type='anemo'>Anemo</element> support that reduces enemy RES with <set>Viridescent Venerer</set> and heals the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Energy Recharge", "CRIT Rate", "ATK%"]
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
          weapons: ["Key of Khaj-Nisut", "Wolf-Fang"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT Rate", "CRIT DMG", "HP%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Provides a shield based on Elemental Mastery. Her skill summons a creature that deals AoE Cryo damage and reduces enemies' Pyro and Hydro RES when Frozen or Melt is triggered.",
          weapons: ["Starcaller's Watch", "Sacrificial Fragments"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides continuous Hydro application via Skill. Her Burst grants DMG increase based on HP changes of allies, which is triggered by her skill's HP drain and healing from Escoffier.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "escoffier",
          role: "Support",
          roleDesc: "Summons a Cooking Mek that deals Cryo damage. Burst heals the team and lowers enemies' Cryo and Hydro RES, scaling with number of Cryo and Hydro characters.",
          weapons: ["Symphonist of Scents", "Favonius Lance"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
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
          weapons: ["Key of Khaj-Nisut", "Wolf-Fang"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Furina's Skill applies continuous Hydro off-field. Her Burst increases DMG based on HP changes of allies, which is fueled by her skill draining HP and a healer restoring it.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, applies crowd control, provides DMG buffs to teammates, and reduces elemental resistance of enemies.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Xiangling's Burst provides massive off-field Pyro damage to trigger Vaporize.",
          weapons: ["Engulfing Lightning", "Favonius Lance"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Energy Recharge", "CRIT Rate"]
        }
      ]
    }
  ],
  "kamisato-ayato": [
    {
      name: "Ayato Hyperbloom",
      rank: "SS",
      description: "A high-damage Hyperbloom team leveraging Ayato's continuous Hydro application, Nahida's Dendro, and Kuki's Electro to trigger Hyperbloom, with Kazuha providing grouping and buffs.\n\nAyato's Skill applies Hydro to enemies, which reacts with Dendro from Nahida to create Bloom cores. Kuki's Electro Skill then triggers Hyperbloom for massive damage. Kazuha groups enemies and reduces Anemo resistance with <set>Viridescent Venerer</set>.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Nahida (Dendro Sub DPS), Kaedehara Kazuha (Anemo Support), Kuki Shinobu (Electro Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Ayato is the Main DPS, his continuous Hydro attacks trigger reactions.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Nahida deals DMG via Skill connecting up to 8 enemies and triggering reactions. Her Burst buffs the Skill based on teammates' elements.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, applies crowd control, provides DMG buffs, and reduces Anemo resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "kuki-shinobu",
          role: "Support",
          roleDesc: "Kuki heals the team and triggers Hyperbloom with her Electro Skill. Maximize Elemental Mastery for high Hyperbloom damage.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Elemental Mastery", "HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Burgeon",
      rank: "SS",
      description: "A team that uses Hydro and Dendro to generate Bloom cores, then triggers Burgeon with Thoma's Burst.\n\nApply Dendro with Nahida and Hydro with Ayato and Yelan to create Bloom cores. Thoma's Burst triggers Burgeon on active character normal attacks.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Yelan (Hydro Sub DPS), Nahida (Dendro Sub DPS), Thoma (Pyro Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Main DPS using normal attacks to trigger Burgeon via Thoma's Burst.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Off-field Hydro application to generate Bloom cores.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Applies Dendro with Skill and buffs Burst duration via teammate elements.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Provides shield and triggers Burgeon via Burst. C6 boosts Ayato normal attack DMG.",
          weapons: ["Kitain Cross Spear", "Black Tassel"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        }
      ]
    },
    {
      name: "Ayato Pure Hydro Team",
      rank: "SS",
      description: "Ayato is a Main DPS in the team. His DMG is maximized by Support's Artifacts and ATK SPD buff from Yun Jin.\n\nKazuha reduces Hydro resistance with Swirl, while Zhongli and Yun Jin provide shields and ATK SPD buffs, allowing Ayato to deal continuous Hydro damage.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Kaedehara Kazuha (Anemo Support), Yun Jin (Geo Support), Zhongli (Geo Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Continuous Hydro DPS relying on Normal Attacks after supports set up.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, reduces Hydro resistance, and provides DMG buff.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "yun-jin",
          role: "Support",
          roleDesc: "Provides Normal ATK Bonus and ATK SPD buff to Ayato via Burst.",
          weapons: ["Kitain Cross Spear", "Favonius Lance"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a strong shield and increases team ATK with Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Vaporize #1",
      rank: "SS",
      description: "Ayato and Hu Tao maximize Normal ATK DMG through Vaporize and ATK SPD buff from Yun Jin.\n\nAyato's continuous <element type='hydro'>Hydro</element> attacks enable Vaporize for Hu Tao, while Yun Jin boosts Normal ATK DMG and SPD. Zhongli provides shield and ATK buff.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Hu Tao (Pyro Main DPS), Yun Jin (Geo Support), Zhongli (Geo Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Continuous <element type='hydro'>Hydro</element> attacks apply <element type='hydro'>Hydro</element> for Vaporize. Burst increases Hu Tao's ATK SPD.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Triggers Vaporize with <element type='pyro'>Pyro</element> application from Ayato. Switches to Ayato when Skill is on cooldown.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "yun-jin",
          role: "Support",
          roleDesc: "Provides Normal ATK Bonus and ATK SPD (C6) to both Ayato and Hu Tao.",
          weapons: ["Kitain Cross Spear", "Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield provides safe environment and ATK boost via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Vaporize Team #2",
      rank: "SS",
      description: "The Normal ATK DMG Output of Ayato and Yoimiya is maximized by Vaporization and ATK SPD buff from Yun Jin.\n\nAyato and Yoimiya alternate as on-field DPS, triggering Vaporize reactions. Yun Jin boosts their Normal ATK DMG and ATK SPD, while Zhongli provides shielding and ATK buff via Tenacity of the Millelith.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Yoimiya (Pyro Main DPS), Yun Jin (Geo Support), Zhongli (Geo Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Applies Hydro continuously with Normal Attacks to enable Vaporize. Elemental Burst increases Yoimiya's ATK SPD.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Deals Pyro DMG with Normal Attacks after Elemental Skill enabling Vaporize reactions.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yun-jin",
          role: "Support",
          roleDesc: "Provides Normal ATK Bonus and ATK SPD bonus (C6) to Ayato and Yoimiya.",
          weapons: ["Kitain Cross Spear", "Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a strong shield for safe field time and ATK buff to the team via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Permafrost",
      rank: "SS",
      description: "Ayato and Ayaka trigger Freeze with Hydro and Cryo while Kazuha groups enemies and Kokomi provides healing.\n\nAyaka applies Cryo off-field while Ayato and Kokomi provide consistent Hydro application to trigger Freeze. Kazuha groups enemies and buffs Cryo damage.\n\nTeam composition: Kamisato Ayaka (Cryo Sub DPS), Kamisato Ayato (Hydro Main DPS), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)",
      members: [
        {
          characterId: "kamisato-ayaka",
          role: "Sub DPS",
          roleDesc: "Deals high DMG with Burst and Skill, providing Cryo application to trigger Freeze.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Primary on-field DPS. Continuous Hydro attacks react with Cryo to Freeze. Burst increases Attack SPD of Ayaka.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies with Skill and Burst, provides Elemental DMG Bonus to team and reduces enemy resistance with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Support",
          roleDesc: "Healer and Hydro applicator. Skill triggers Tenacity of the Millelith to buff team ATK and sustain Freeze.",
          weapons: ["Everlasting Moonglow", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        }
      ]
    },
    {
      name: "Ayato Permafrost Team #2",
      rank: "SS",
      description: "A Freeze team where Ayato's <hydro>Hydro</hydro> attacks and Ganyu's <cryo>Cryo</cryo> Burst lock enemies in ice, while Venti groups them and Diona provides shield and energy.\n\nFreeze enemies using Ayato's Hydro application and Ganyu's Cryo Burst, grouped by Venti and protected by Diona.\n\nTeam composition: Ganyu (Cryo Sub DPS), Kamisato Ayato (Hydro Main DPS), Venti (Anemo Support), Diona (Cryo Support)",
      members: [
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Deals <cryo>Cryo</cryo> via Burst and Charged Attack. Provides <cryo>Cryo</cryo> for Freeze.",
          weapons: ["Hunter's Path", "Hamayumi"],
          artifacts: ["2pc Noblesse Oblige + 2pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Continuous <hydro>Hydro</hydro> attacks trigger Freeze with <cryo>Cryo</cryo>. Burst boosts team Attack SPD.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "venti",
          role: "Support",
          roleDesc: "Groups enemies with Burst and spreads <hydro>Hydro</hydro> for wider Freeze.",
          weapons: ["Elegy for the End", "Rust"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Shield provides safety and <cryo>Cryo</cryo> battery for Ganyu.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Maiden Beloved"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Electro-Charged Team #2",
      rank: "S",
      description: "Ayato drives Electro-Charged reactions with continuous Hydro application, while Fischl and Beidou provide off-field Electro. Jean (C2) heals, shreds resistance with Viridescent Venerer, and boosts attack speed.\n\nAyato's Hydro attacks react with Electro from Fischl and Beidou to trigger Electro-Charged, while Jean provides healing, Anemo RES shred, and attack speed buff at C2.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Fischl (Electro Sub DPS), Beidou (Electro Sub DPS), Jean (Anemo Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "Continuous Hydro attacks trigger Electro-Charged with off-field Electro.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Off-field Electro application via Skill to enable Electro-Charged. C6 is a significant upgrade.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "beidou",
          role: "Sub DPS",
          roleDesc: "Off-field Electro via Burst for consistent Electro-Charged.",
          weapons: ["Skyward Pride", "Serpent Spine"],
          artifacts: ["2pc Noblesse Oblige + 2pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Heals, shreds Electro and Hydro RES with Viridescent Venerer, and provides 15% attack speed at C2.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayato Pure Hydro Team #2",
      rank: "SS",
      description: "Ayato is a Main DPS. His damage is maximized by ATK SPD buff from Yun Jin and Jean.\n\nMaximize Ayato's damage using Yun Jin's Normal ATK buff and ATK SPD from C6 Yun Jin and C2 Jean. Jean also provides Viridescent Venerer shred for Hydro resistance.\n\nTeam composition: Kamisato Ayato (Hydro Main DPS), Furina (Hydro Sub DPS), Yun Jin (Geo Support), Jean (Anemo Support)",
      members: [
        {
          characterId: "kamisato-ayato",
          role: "Main DPS",
          roleDesc: "DMG maximized by ATK SPD buff from Yun Jin and Jean.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Nymph's Dream"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Elemental Burst provides DMG increase based on HP changes. Elemental Skill burns allies HP.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "yun-jin",
          role: "Support",
          roleDesc: "Provides Normal ATK Bonus and Normal ATK SPD Bonus (C6) to Ayato.",
          weapons: ["Kitain Cross Spear", "Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Healer, spreads element, reduces enemy RES. C2 gives 15% ATK SPD to all characters.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    }
  ],
  "sangonomiya-kokomi": [
    {
      name: "Kokomi Hyperbloom Team",
      rank: "SS",
      description: "A powerful Hyperbloom team with Kokomi on the on-field driver, Nahida for Dendro application, Raiden Shogun for triggering reactions, and Kazuha for grouping and buffs.\n\nKokomi drives the team with her Normal Attacks and Elemental Skill to create Dendro Cores, which are then triggered by Raiden Shogun's Elemental Skill to produce Hyperblooms. Nahida applies Dendro and boosts reactions, while Kazuha groups enemies and provides DMG buffs.\n\nTeam composition: Sangonomiya Kokomi (Hydro Main DPS), Nahida (Dendro Sub DPS), Raiden Shogun (Electro Sub DPS), Kaedehara Kazuha (Anemo Support)",
      members: [
        {
          characterId: "sangonomiya-kokomi",
          role: "Main DPS",
          roleDesc: "Main DPS and driver. continuous Hydro attacks react with Dendro to create Dendro Cores via Skill and Normal Attacks to trigger Hyperbloom.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Deals DMG via Elemental Skill which connects up to 8 enemies and deals Dendro DMG. Burst buffs Skill based on teammates' elements. With two Hydro characters, the duration of her Burst is increased.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Elemental Skill triggers Electro-Charged and activates Cores for Hyperbloom.",
          weapons: ["Dragon's Bane", "Kitain Cross Spear"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies with Skill and Burst, spreads elements, provides DMG buff. Reduces elemental RES with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        }
      ]
    },
    {
      name: "Kokomi Vaporize Team #1",
      rank: "SS",
      description: "Kokomi acts as a Sub DPS, applying Hydro to enable Vaporize for Hu Tao. Kazuha (C2) provides DMG bonus and resistance shred. Bennett offers ATK buff and healing.\n\nMaximizes Vaporize damage by using Kokomi's consistent Hydro application and Kazuha's DMG bonus and resistance shred, while Bennett provides ATK buff and healing to sustain the team.\n\nTeam composition: Hu Tao (Pyro Main DPS), Sangonomiya Kokomi (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Main DPS. HP changes amplify Vaporize damage. Uses Skill to convert HP to ATK.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Deals DMG, reacts with Pyro. Applies Hydro status with Skill and Burst as normal.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides Element DMG, reduces enemy resistance with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides massive ATK buff and healing through Burst.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Kokomi Pure Hydro Team",
      rank: "S",
      description: "A powerful Hydro focused team leveraging Kokomi's on-field presence and Kazuha's Hydro DMG bonus.\n\nMaximizes Hydro DMG with consistent Hydro application from Yelan and Xingqiu, amplified by Kazuha's DMG bonus and resistance shred.\n\nTeam composition: Sangonomiya Kokomi (Hydro Main DPS), Yelan (Hydro Sub DPS), Xingqiu (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support)",
      members: [
        {
          characterId: "sangonomiya-kokomi",
          role: "Main DPS",
          roleDesc: "Kokomi's Burst DMG scales with Max HP. Heals the team.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro application.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Deals DMG, continuously applies Hydro to enemies.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, reduces enemy Hydro RES with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        }
      ]
    },
    {
      name: "Kokomi Vaporize Team #2",
      rank: "SS",
      description: "A powerful team centered on Kokomi as Main DPS, maximizing Vaporize damage with Kazuha (C2) bonus, Xiangling and Kokomi enable consistent Vaporize triggers.\n\nKokomi's Hydro application, combined with Xiangling's Pyro, triggers consistent Vaporize. Kazuha boosts damage and shreds resistance, while Bennett provides ATK buff and healing.\n\nTeam composition: Sangonomiya Kokomi (Hydro Main DPS), Xiangling (Pyro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)",
      members: [
        {
          characterId: "sangonomiya-kokomi",
          role: "Main DPS",
          roleDesc: "Triggers Vaporize with Normal Attacks and Elemental Skill damage scales off Max HP.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Provides continuous Pyro application via Pyronado and Guoba, enabling Vaporize for Kokomi.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides Anemo resonance, buffs team damage, and reduces enemy resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides massive ATK buff and healing with Bennett Burst.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Kokomi Permafrost Team #1",
      rank: "S",
      description: "Ayaka and Shenhe apply Cryo, Kokomi applies Hydro to Freeze, Kazuha groups and buffs.\n\nUse Cryo from Ayaka and Shenhe with Kokomi's Hydro to trigger Freeze, while Kazuha provides crowd control, DMG buff, and resistance shred.\n\nTeam composition: Kamisato Ayaka (Cryo Main DPS), Shenhe (Cryo Sub DPS), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)",
      members: [
        {
          characterId: "kamisato-ayaka",
          role: "Main DPS",
          roleDesc: "Deals high Burst and Normal Attack DMG.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "shenhe",
          role: "Sub DPS",
          roleDesc: "Provides Cryo bonus to Ayaka and increases DMG of attacks.",
          weapons: ["Calamity Queller", "Favonius Lance"],
          artifacts: ["2pc Gladiator's Finale + 2pc Shimenawa's Reminiscence"],
          substats: ["ATK%", "Energy Recharge", "HP%", "CRIT Rate"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, reduces enemy resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Support",
          roleDesc: "Healer. Skill applies Hydro every 2s, triggers Tenacity of the Millelith.",
          weapons: ["Everlasting Moonglow", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        }
      ]
    },
    {
      name: "Kokomi Permafrost Team #2",
      rank: "A",
      description: "A permafrost team with Kokomi providing consistent Hydro application via her Skill enabling Ayaka and Rosaria to trigger Freeze, constantly. Kazuha groups enemies, applies crowd control, provides DMG buffs, and reduces enemy Anemo RES with Viridescent Venerer.\n\nKokomi's Skill applies Hydro every 2 seconds, which reacts with Cryo from Ayaka and Rosaria to trigger Freeze, locking down enemies. Kazuha amplifies damage and groups them.\n\nTeam composition: Kamisato Ayaka (Cryo Main DPS), Rosaria (Cryo Sub DPS), Sangonomiya Kokomi (Hydro Support), Kaedehara Kazuha (Anemo Support)",
      members: [
        {
          characterId: "kamisato-ayaka",
          role: "Main DPS",
          roleDesc: "Ayaka's high DMG attacks are key, providing Cryo and reacting with Hydro.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "rosaria",
          role: "Sub DPS",
          roleDesc: "Rosaria provides consistent particles with short cooldown Skill and generates Cryo application for Freeze.",
          weapons: ["Skyward Spine", "Favonius Lance"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Support",
          roleDesc: "Healer. Skill provides off-field Hydro application via Skill triggering Tenacity of the Millelith to buff the team.",
          weapons: ["Everlasting Moonglow", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, and reduces enemy resistance with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        }
      ]
    },
    {
      name: "Kokomi Electro-Charged Team",
      rank: "A",
      description: "Kokomi drives Electro-Charged reactions with Fischl and Beidou, while Kazuha provides elemental damage bonus, crowd control, VV shred and damage bonus.\n\nMaximize Electro-Charged damage using Kazuha's C2 bonus and consistent off-field Electro application from Fischl and Beidou.\n\nTeam composition: Sangonomiya Kokomi (Hydro Main DPS), Fischl (Electro Sub DPS), Beidou (Electro Sub DPS), Kaedehara Kazuha (Anemo Support)",
      members: [
        {
          characterId: "sangonomiya-kokomi",
          role: "Main DPS",
          roleDesc: "Main DPS and driver. Max HP Hydro damage triggers Electro-Charged with Electro.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Oz provides continuous off-field Electro application to trigger Electro-Charged.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "beidou",
          role: "Sub DPS",
          roleDesc: "Burst provides off-field Electro application to constantly trigger Electro-Charged.",
          weapons: ["Skyward Pride", "Serpent Spine"],
          artifacts: ["2pc Noblesse Oblige + 2pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, applies crowd control, provides DMG buff, reduces enemy resistance with Viridescent Venerer.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        }
      ]
    },
    {
      name: "Kokomi Vaporize Team #3",
      rank: "A",
      description: "Kokomi is a Sub DPS in the team. The Vaporize DMG of the whole team is maximized by Kazuha (C2)'s bonus, Yoimiya and Bennett allow the team to trigger Vaporize all the time.\n\nThis team maximizes Vaporize damage by combining Yoimiya's consistent Pyro application with Kokomi's Hydro application, while Kazuha provides DMG buffs and resistance shred, and Bennett provides ATK buff and healing.\n\nTeam composition: Yoimiya (Pyro Main DPS), Sangonomiya Kokomi (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Main DPS whose attacks trigger Vaporize consistently.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sangonomiya-kokomi",
          role: "Sub DPS",
          roleDesc: "Applies Hydro with Skill to enable Vaporize for Yoimiya, also heals based on HP.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "kaedehara-kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides Anemo buff, reduces enemy resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides massive ATK buff and healing with Bennett.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "sigewinne": [
    {
      name: "Sigewinne Pure Hydro",
      rank: "SS",
      description: "The team focuses on dealing Hydro damage, with Sigewinne providing healing and Elemental Skill damage buffs, while Yelan and Furina output damage and Kazuha provides grouping and resistance shred.",
      members: [
        {
          characterId: "yelan",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high on-field single-target Hydro damage with coordinated attacks from Burst.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Hydro DMG.",
          weapons: ["Xiphos' Moonlight", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge ramping damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "sigewinne",
          role: "Support",
          roleDesc: "Hydro Support. Provides team-wide healing via her Skill and buffs teammates' off-field Elemental Skill DMG.",
          weapons: ["Silvershower Heartstrings", "Recurve Bow"],
          artifacts: ["2pc Tenacity of the Millelith", "2pc Vourukasha's Glow"],
          substats: ["HP%", "HP"]
        }
      ]
    },
    {
      name: "Sigewinne For Fun",
      rank: "S",
      description: "A for-fun team where Traveler (Geo) and Zhongli's Geo construct resonance is the main DMG source, speeding up Sigewinne's passive. Sigewinne heals and boosts Skill DMG. Geo construct resonance between Traveler (Geo) and Zhongli triggers Sigewinne's passive talent for additional damage, while Furina provides off-field Hydro and DMG buffs.",
      members: [
        {
          characterId: "sigewinne",
          role: "Support",
          roleDesc: "Hydro Support. Restores team HP and buffs off-field Elemental Skill DMG.",
          weapons: ["Silvershower Heartstrings", "Recurve Bow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Supplies off-field Hydro attacks and massive damage buffs.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "traveler-geo",
          role: "Main DPS",
          roleDesc: "Geo Main DPS. Places Geo constructs that resonate with Zhongli's pillars to deal AoE Geo damage.",
          weapons: ["Primordial Jade Cutter", "Wolf-Fang"],
          artifacts: ["2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Geo Support. Creates a powerful shield, shreds enemy RES, and places resonating pillars.",
          weapons: ["Staff of Homa"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "HP%"]
        }
      ]
    },
    {
      name: "Sigewinne Bloom Team",
      rank: "SS",
      description: "Bloom team utilizing Nilou's passive to create Bountiful Cores for massive AoE Dendro damage, with Alhaitham as on-field driver, Furina providing off-field Hydro and damage buffs, and Sigewinne healing to sustain Furina's HP drain.",
      members: [
        {
          characterId: "alhaitham",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Infuses attacks with Dendro and triggers rapid Bloom reactions on-field.",
          weapons: ["Light of Foliar Incision", "Wolf-Fang"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Applies off-field Hydro and boosts team damage.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Enables Bountiful Cores with her passive, dealing high AoE Bloom damage.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith", "2pc Vourukasha's Glow"],
          substats: ["HP%", "Elemental Mastery", "HP"]
        },
        {
          characterId: "sigewinne",
          role: "Support",
          roleDesc: "Hydro Support. Provides continuous healing to sustain the team from Bloom and Furina's drain, and buffs Skill DMG.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP"]
        }
      ]
    }
  ],
  "mualani": [
    {
      name: "Mualani Vaporization Team #1",
      rank: "SS",
      description: "Mualani uses Skill to enter Nightsoul's Blessing, enhancing Normal Attack to Sharky Bite. Stacking Silver Momentum from Shark Bites at marked enemies. Xilonen provides element type<GeoElement> RES shred and healing. Xiangling applies element type<PyroElement> off-field for Vaporize. Zhongli offers strong shield for safe gameplay.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Enters Nightsoul's Blessing and deals high on-field Vaporize damage with Sharky Bites.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Shreds enemy elemental resistances and heals active team members.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals substantial off-field Pyro damage and triggers Vaporize reactions.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Geo Support. Provides a near-unbreakable shield and shreds enemy resistances.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mualani Witch's Eva Rite",
      rank: "SS",
      description: "A powerful Vaporize team centered around Mualani's enhanced attacks. Utilizes Mualani's Nightsoul Blessing state to trigger Vaporize reactions with off-field Hydro and Pyro application from Mona and Traveler (Pyro), while Sucrose provides resistance shred and EM share.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers powerful Vaporize reactions under Nightsoul's Blessing.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "mona",
          role: "Support",
          roleDesc: "Hydro Support. Boosts Mualani's damage via Omen and provides Hydro resonance.",
          weapons: ["Prototype Amber"],
          artifacts: ["4pc Instructor"],
          substats: ["Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Anemo Support. Swirls elements to reduce RES and shares Elemental Mastery with the team.",
          weapons: ["Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "traveler-pyro",
          role: "Support",
          roleDesc: "Pyro Support. Applies off-field Pyro and triggers Pyro resonance.",
          weapons: ["Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Energy Recharge"]
        }
      ]
    },
    {
      name: "Mualani Vaporize #3",
      rank: "S",
      description: "A high-damage Vaporize team centered on Mualani's enhanced attacks, supported by Xilonen's RES shred and Mavuika's off-field Pyro. Mualani stacks Silver Momentum from her enhanced state to unleash powerful Shark Bites, triggering Vaporize with Mavuika's off-field Pyro. Xilonen shreds enemy RES and heals, while Sucrose shreds enemy RES and provides EM.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Stacks Silver Momentum to unleash high-multiplier Sharky Bites.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Shreds enemy elemental resistances and heals active team members.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Sub DPS",
          roleDesc: "Anemo Sub DPS. Shreds RES, groups enemies, and shares Elemental Mastery.",
          weapons: ["A Thousand Floating Dreams", "Sacrificial Fragments"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals consistent off-field Pyro damage to enable constant Vaporize.",
          weapons: ["A Thousand Blazing Suns", "Sacrificial Greatsword"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        }
      ]
    },
    {
      name: "Mualani Vaporization Team #4",
      rank: "SS",
      description: "A top-tier team focusing on Mualani's Vaporize reactions with off-field Pyro from Mavuika, supported by Xilonen's RES shred and healing, and Citlali's shielding and Cryo application.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers massive Vaporize damage using nightsoul-empowered normal attacks.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Reduces enemy elemental resistance and provides reliable healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Support. Generates a shield and applies off-field Cryo for additional reaction potential.",
          weapons: ["Starcaller's Watch", "Sacrificial Fragments"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Infuses Pyro and triggers coordinated off-field Pyro attacks.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        }
      ]
    },
    {
      name: "Mualani Permafrost",
      rank: "S",
      description: "A permafrost team focusing on Cryo/Hydro reactions, with dual DPS Citlali and Mualani supported by Charlotte and Furina for healing and damage amplification.",
      members: [
        {
          characterId: "citlali",
          role: "Main DPS",
          roleDesc: "Cryo Main DPS. Deals consistent Cryo damage on-field and triggers Freeze.",
          weapons: ["Starcaller's Watch", "The Widsith"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers Freeze and deals high single-target Hydro damage.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "charlotte",
          role: "Support",
          roleDesc: "Cryo Support. Provides team-wide burst healing and additional off-field Cryo.",
          weapons: ["Favonius Codex"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["ATK%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and massive team-wide damage buffs.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mualani Burning/Vaporize",
      rank: "S",
      description: "A Vaporize team using Burning to maintain Pyro aura for Hydro. Mualani triggers Vaporize for high damage Shark Bites. Emilie increases Burning damage, while Xiangling and Collei provide consistent off-field Pyro.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Vaporizes her on-field hits against enemies affected by Burning.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Amplifies Burning reactions and deals consistent off-field Dendro damage.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Supplies off-field Pyro to maintain Burning aura with Dendro.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Support",
          roleDesc: "Pyro Support. Provides damage reduction, interruption resistance, and off-field Pyro.",
          weapons: ["Favonius Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mualani Vaporization Team #6",
      rank: "S",
      description: "A team focused on Mualani's enhanced Normal Attack in Nightsoul's Blessing, triggering Vaporize with Xiangling's off-field Pyro. Furina provides damage buff and additional Hydro, while Xilonen shreds enemy RES and sustains the team.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high on-field Vaporize damage.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Shreds enemy elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals substantial off-field Pyro damage to enable Vaporize.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mualani Vaporization Team #7",
      rank: "S",
      description: "Mualani triggers Vaporize with Xiangling's Pyro off-field, while Yelan provides additional Hydro and Citlali shields and reduces enemy resistance via Freeze or Melt reactions.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Vaporizes her on-field normal attacks.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Applies consistent Pyro off-field.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and damage buffs.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Support. Provides a shield and reduces resistance via Melt reactions.",
          weapons: ["Starcaller's Watch", "Favonius Codex"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        }
      ]
    },
    {
      name: "Mualani Vaporize Surf",
      rank: "S",
      description: "A high damage team focusing on Mualani's Vaporize reactions, with off-field Pyro from Xiangling, supported by Xilonen's RES shred and healing, and Chiori's Geo sub DPS.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Vaporizes her hits against enemies affected by Pyro.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "chiori",
          role: "Sub DPS",
          roleDesc: "Geo Sub DPS. Deals high off-field Geo damage via her dolls.",
          weapons: ["Uraku Misugiri", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "ATK%"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Shreds RES and provides team healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Applies off-field Pyro for Vaporize reactions.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    }
  ],
  "columbina": [
    {
      name: "Columbina Lunar Bloom Team #1",
      rank: "SS",
      description: "A team focused on Lunar-Bloom reactions, with Nefer as main DPS, Lauma as support, Yaoyao as healer, and Columbina as sub DPS/Support.",
      members: [
        {
          characterId: "nefer",
          role: "Main DPS",
          roleDesc: "Nefer's Skill allows her to enter the Shadow Dance state, replacing her Charged Attack with Phantasm Performance. All Bloom reactions triggered by Nefer are converted into Lunar-Bloom.",
          weapons: ["Reliquary of Truth", "Dawning Frost"],
          artifacts: ["4pc Night of the Sky's Unveiling"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Lauma transforms Bloom into Lunar-Bloom, which has higher damage and can crit. Her Skill accumulates Hymn of Eternal Rest to boost Lunar-Bloom damage. She reduces enemies' Dendro and Hydro RES, and increases team's Lunar-Bloom damage based on EM.",
          weapons: ["Nightweaver's Looking Glass", "Etherlight Spindlelute"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "yaoyao",
          role: "Support",
          roleDesc: "Yaoyao provides healing and shield. At C1, increases Dendro DMG of teammates.",
          weapons: ["Dialogues of the Desert Sages"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "columbina",
          role: "Sub DPS",
          roleDesc: "Columbina uses her Skill to provide continuous off-field AoE Hydro application or triggering Lunar reactions. Based on which Lunar reaction type occurs most frequently, she deals corresponding Lunar damage. Her Burst deploys an aura that buffs Lunar-Charged, Lunar Crystallize, and Lunar-Bloom.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Aubade of Morningstar and Moon"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Columbina Lunar Bloom Team #3",
      rank: "S",
      description: "A team built around Lunar Bloom reactions, with Nefer as the main trigger and Lauma, Nahida, and Columbina providing support and off-field applications. Utilize the Lunar Bloom reaction enhanced by Lauma and triggered by Nefer, with off-field Dendro from Nahida and Hydro from Columbina to deal high damage.",
      members: [
        {
          characterId: "nefer",
          role: "Main DPS",
          roleDesc: "Nefer's Skill allows her to enter the Shadow Dance state, replacing her Charged Attack with Phantasm Performance. All Bloom reactions triggered by Nefer are converted into Lunar-Bloom.",
          weapons: ["Reliquary of Truth", "Dawning Frost"],
          artifacts: ["4pc Night of the Sky's Unveiling"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Lauma transforms the traditional 'Bloom' reaction into 'Lunar Bloom', which has higher damage and can crit. Her elemental skill can accumulate layers of 'Hymn of Eternal Rest' in order to further boost the Lunar Bloom damage triggered by all teammates. She can also reduce enemies' Dendro and Hydro RES, and increase her own and the team's Lunar Bloom damage based on her EM.",
          weapons: ["Nightweaver's Looking Glass", "Etherlight Spindlelute"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Nahida mainly deals DMG by her Elemental Skill, which connects 8 enemies at maximum and deals Dendro DMG to them while triggering elemental reactions. The Elemental Burst of Nahida buffs her Elemental Skill depends on the Element of her teammates.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "columbina",
          role: "Sub DPS",
          roleDesc: "Columbina uses her Elemental Skill to provide continuous off-field, AoE Hydro application or triggering Lunar reactions. At the same time, based on which Lunar reaction type occurs most frequently in the team, she deals the corresponding type of direct Lunar damage. Her Elemental Burst deploys an aura, with her talent, she can grant buffs to all three Lunar reactions: Lunar-Charged, Lunar Crystallize, and Lunar-Bloom.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Aubade of Morningstar and Moon"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Columbina Lunar Bloom Team #4",
      rank: "SS",
      description: "A high-damage team focusing on Lunar Bloom reactions, utilizing Lauma's transformation and Columbina's buffs.",
      members: [
        {
          characterId: "nilou",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers Bountiful Cores with her passive, dealing rapid Bloom damage.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith", "2pc Vourukasha's Glow"],
          substats: ["HP%", "Elemental Mastery"]
        },
        {
          characterId: "columbina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs Dendro cores.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Aubade of Morningstar and Moon"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies high off-field Dendro and buffs team Elemental Mastery.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Dendro Support. Converts normal Blooms into Lunar Blooms to maximize reaction damage.",
          weapons: ["Nightcaster's Lasting Gaze", "Prototype Sparganium"],
          artifacts: ["4pc Gilded Dreams", "4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        }
      ]
    },
    {
      name: "Columbina Lunar Hyperbloom Team",
      rank: "SS",
      description: "A team that utilizes Lauma's Lunar Bloom transformation and Kuki Shinobu's Hyperbloom triggers.",
      members: [
        {
          characterId: "columbina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Coordinates off-field Hydro attacks and triggers initial Dendro cores.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Aubade of Morningstar and Moon"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "lauma",
          role: "Support",
          roleDesc: "Dendro Support. Supplies Dendro from off-field and converts blooms to Lunar Blooms.",
          weapons: ["Nightcaster's Lasting Gaze", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides high off-field single-target Hydro damage and ramping damage buff.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kuki-shinobu",
          role: "Support",
          roleDesc: "Electro Trigger & Healer. Activates Hyperbloom on Dendro cores with Electro pulses.",
          weapons: ["Key of Khaj-Nisut", "Xiphos' Moonlight"],
          artifacts: ["4pc Flower of Paradise Lost", "4pc Gilded Dreams"],
          substats: ["Elemental Mastery"]
        }
      ]
    },
    {
      name: "Columbina Lunar-Charged Team #1",
      rank: "SS",
      description: "A team that leverages the Lunar-Charged reaction, converting Electro-Charged into enhanced Lunar damage.",
      members: [
        {
          characterId: "flins",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Triggers Electro-Charged and infuses normal attacks with Electro.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "columbina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides consistent off-field Hydro to enable reaction and buffs team energy.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Shreds enemy elemental resistances and heals active team members.",
          weapons: ["Peak Patrol Song", "Flute of Ezpitzal"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "ineffa",
          role: "Support",
          roleDesc: "Electro Support. Enhances Electro-related reactions and boosts elemental damage of the party.",
          weapons: ["Fruitful Hook", "Lost Prayer to the Sacred Winds"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Columbina Lunar-Charged Team",
      rank: "SS",
      description: "A reaction-based team built around Columbina's Lunar reaction mechanics. Columbina triggers Lunar Charged, while Ineffa converts Electro Charged into Lunar Charged and boosts its damage. Chasca shreds resistance and Jahoda heals while increasing EM.",
      members: [
        {
          characterId: "columbina",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high on-field Hydro damage and triggers frequent Lunar Charged reactions.",
          weapons: ["Nocturne's Curtain Call", "Sacrificial Jade"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "chasca",
          role: "Sub DPS",
          roleDesc: "Anemo Sub DPS. Swirls elements, groups enemies, and shreds elemental RES.",
          weapons: ["Astral Vulture's Crimson Plumage", "Wandering Evenstar"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "jahoda",
          role: "Support",
          roleDesc: "Anemo Support/Healer. Provides continuous healing, swirls elements, and increases team EM.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "ineffa",
          role: "Support",
          roleDesc: "Electro Support. Converts standard Electro-Charged to Lunar-Charged, boosting its damage.",
          weapons: ["Fruitful Hook", "Lost Prayer to the Sacred Winds"],
          artifacts: ["4pc Silken Moon's Serenade"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        }
      ]
    }
  ],
  "gaming": [
    {
      name: "Gaming Melting Team #1",
      rank: "SS",
      description: "A high-damage Melt team centered on Gaming's plunging attacks, supported by Ganyu's off-field Cryo application, Layla's shield and Cryo application, and Xianyun's plunge buffs and healing.",
      members: [
        {
          characterId: "gaming",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. His Plunging Attack provides continuous high-multiplier Pyro DMG.",
          weapons: ["Serpent Spine", "Redhorn Stonethresher"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Cryo Sub DPS. Her Burst provides continuous off-field Cryo application to trigger Melt.",
          weapons: ["Hunter's Path", "Harp"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "layla",
          role: "Support",
          roleDesc: "Cryo Shield & Support. Provides a strong shield and additional Cryo application.",
          weapons: ["Primordial Jade Cutter", "Harbinger of Dawn"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
          weapons: ["Crane's Echoing Call", "Oathsworn Eye"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["ATK%", "ATK", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Gaming Pure Pyro Team",
      rank: "S",
      description: "A pure Pyro team centered on Gaming's plunging attacks, boosted by Xianyun, with Bennett and Xiangling providing buffs and off-field damage.",
      members: [
        {
          characterId: "gaming",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Plunging Attacks deal high consistent Pyro DMG.",
          weapons: ["Redhorn Stonethresher", "Serpent Spine"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro DMG via Pyronado and Gouba.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
          weapons: ["Crane's Echoing Call", "Oathsworn Eye"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["ATK%", "ATK", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Gaming Vaporize Team",
      rank: "SS",
      description: "Gaming is a Main DPS. His DMG is amplified by Vaporize with off-field Hydro and support buffs from Furina, Kazuha, and Xianyun.",
      members: [
        {
          characterId: "gaming",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Plunging Attacks trigger Vaporize reactions to deal massive DMG.",
          weapons: ["Redhorn Stonethresher", "Serpent Spine"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
          weapons: ["Crane's Echoing Call", "Oathsworn Eye"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["ATK%", "ATK", "Energy Recharge"]
        }
      ]
    }
  ],
  "arlecchino": [
    {
      name: "Arlecchino Melting Team #1",
      rank: "SS",
      description: "A high-damage Melt team centered on Arlecchino's Pyro attacks, supported by Citlali's shield and Cryo application for Melt reactions, while Xilonen shreds enemy RES and heals. Bennett offers a massive ATK buff and healing through his Burst.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Shield & Support. Provides shield and Cryo application for Melt reactions.",
          weapons: ["Starcaller's Watch", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Instructor"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Melting Team #2",
      rank: "SS",
      description: "A high-damage Melt team centered on Arlecchino's Pyro attacks, supported by Citlali's shield and Cryo application, Xilonen's RES shred and healing, and Kazuha's grouping and damage buffs.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Shield & Support. Provides shield and Cryo application for Melt reactions.",
          weapons: ["Starcaller's Watch", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Instructor"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.",
          weapons: ["Freedom-Sworn", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Arlecchino Vaporize Team #1",
      rank: "SS",
      description: "A top-tier team centered on element pyro + hydro = Vaporize reactions, leveraging Arlecchino's high Bond of Life scaling damage. Arlecchino triggers Vaporize with Yelan's off-field hydro/hydro application, while Xilonen shreds RES and Bennett provides massive ATK buffs and healing.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and enables Vaporize reactions.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Vaporize Team #2",
      rank: "SS",
      description: "Arlecchino is a Main DPS in the team. Leverage Arlecchino's Bond of Life to convert attacks to pyro/pyro element, enabling Vaporize reactions with Furina's element hydro/hydro application. Xilonen reduces enemy RES and heals, while Bennett provides ATK buff and additional healing.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Pure Pyro Team #1",
      rank: "SS",
      description: "A pure element pyro + pyro team focused on maximizing Arlecchino's damage through buffs and resistance shred from Kazuha, Xilonen, and Bennett. Utilizes Kazuha's grouping and RES shred to further reduce enemy resistance.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.",
          weapons: ["Freedom-Sworn", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Pure Pyro Team #2",
      rank: "SS",
      description: "Arlecchino Main DPS with Chiori sub DPS, Xilonen support, Bennett healer/buffer. Leverage Arlecchino's high Pyro damage with Bond of Life, supported by Bennett's ATK buff, Xilonen's RES shred and healing, and Chiori's off-field Geo damage.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "chiori",
          role: "Sub DPS",
          roleDesc: "Geo Sub DPS. Deals high off-field Geo damage via her dolls.",
          weapons: ["Uraku Misugiri", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "ATK%"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Overload Team #1",
      rank: "SS",
      description: "An Overload team with Arlecchino main DPS, Fischl for off-field Electro, Chevreuse for RES shred and healing, and Bennett for ATK buffs. Trigger Overload to reduce enemies' Pyro and Electro RES via Chevreuse's passive, and use ATK buffs from Chevreuse and Bennett to maximize Arlecchino's damage.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides continuous Electro application off-field, triggering reactions.",
          weapons: ["Aqua Simulacra", "Sacrificial Bow"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Arlecchino Overload Team #2",
      rank: "SS",
      description: "Arlecchino Overload team with Chevreuse to reduce Pyro/Electro RES, Mavuika for off-field Pyro, and Ororon for extra damage. Leverage Overload to trigger Chevreuse's RES shred and ATK buff, while Mavuika and Ororon deal off-field damage.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ororon",
          role: "Support",
          roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        }
      ]
    }
  ],
  "lyney": [
    {
      name: "Lyney Pure Pyro Team #1",
      rank: "SS",
      description: "A pure Pyro team that maximizes Lyney's passive ATK bonus from Pyro teammates. Kaedehara Kazuha swirls Pyro to reduce enemy resistance and groups them, while Xiangling deals off-field Pyro damage and Bennett provides massive ATK buff and healing.",
      members: [
        {
          characterId: "lyney",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. His Charged Attacks deal high single-target and AoE Pyro DMG, boosted by his passive for each Pyro ally.",
          weapons: ["The First Great Magic", "Song of Stillness"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals substantial off-field Pyro damage with Pyronado and Pyronado's Pyro application.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing to sustain Lyney's HP manipulation.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Lyney Pure Pyro Team #2",
      rank: "S",
      description: "An alternative mono-pyro team maximizing Lyney's passive. Lynette replaces Kazuha, providing grouping, taunt via Boffo Cat Box, and Pyro RES shred with Swirl, while Xiangling deals off-field damage and Bennett buffs ATK and heals.",
      members: [
        {
          characterId: "lyney",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Charged Attacks deal high Pyro DMG, boosted by Bennett and Xiangling.",
          weapons: ["The First Great Magic", "Song of Stillness"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro DMG and benefits from Pyro RES shred.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "lynette",
          role: "Support",
          roleDesc: "Anemo Support. Taunts enemies, swirls Pyro to reduce enemy resistance, and boosts team ATK after using Burst.",
          weapons: ["Freedom-Sworn", "Favonius Sword", "Sacrificial Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Lyney Pure Pyro Team #3",
      rank: "SS",
      description: "A defensive pure Pyro team featuring Dehya for damage reduction and interruption resistance. Kazuha swirls Pyro for RES shred and grouping, while Bennett provides ATK buffs and healing.",
      members: [
        {
          characterId: "lyney",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. His Charged Attacks deal high Pyro DMG, protected from interruption by Dehya.",
          weapons: ["The First Great Magic", "Song of Stillness"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS & Tank. Provides off-field Pyro application, damage reduction, and interruption resistance.",
          weapons: ["Favonius Greatsword", "Sacrificial Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Energy Recharge", "HP%", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ],
  "mavuika": [
    {
      name: "Mavuika Overload Team #1",
      rank: "SS",
      description: "An overload team featuring Mavuika as main DPS, with Ororon, Chevreuse, and Bennett providing support and healing. Leverage Chevreuse's passive to reduce enemy Pyro and Electro RES via Overload, while Ororon provides off-field damage and energy, and Bennett buffs ATK.",
      members: [
        {
          characterId: "mavuika",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Nightsoul state normal attacks and coordinated attacks via Elemental Burst.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "ororon",
          role: "Support",
          roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Mavuika Vaporization Team #1",
      rank: "SS",
      description: "A high-damage Vaporize team centered on Mavuika's empowered Burst. Mavuika's Burst is charged via Nightsoul points and normal attacks, then applies hydro-infused Pyro for massive DMG. Xilonen shreds enemy elemental RES and heals, Furina provides off-field hydro and buffs, enabling Mavuika to trigger Vaporize.",
      members: [
        {
          characterId: "mavuika",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Mavuika Burning",
      rank: "S",
      description: "A Burning team where Mavuika and Emilie maintain the Burning reaction, boosting Kinich's damage with constant Pyro and Dendro application. Sustain Burning with Mavuika's off-field Pyro and Emilie's Dendro, allowing Kinich to trigger powerful Nightsoul Cannon blasts.",
      members: [
        {
          characterId: "kinich",
          role: "Main DPS",
          roleDesc: "On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.",
          weapons: ["Fang of the Mountain King", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Applies consistent off-field Pyro and triggers Burning to enable Kinich.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "iansan",
          role: "Support",
          roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
          weapons: ["Calamity Queller", "Favonius Lance"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["HP%", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mavuika Vaporization Team #2",
      rank: "S",
      description: "Chasca acts as the Main DPS, with Furina and Mavuika applying Hydro and Pyro for Vaporize reactions. Bennett provides ATK buffs and healing. This team leverages Chasca's ability to adapt her damage based on teammates' elements, combining Furina's continuous Hydro application with Mavuika's off-field Pyro to enable frequent Vaporize reactions.",
      members: [
        {
          characterId: "chasca",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Adapts her damage based on teammates' elements to trigger reactions.",
          weapons: ["Astral Vulture's Crimson Plumage", "First Great Magic"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Enables Pyro element infusion and triggers Vaporize reactions.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Mavuika Vaporization",
      rank: "SS",
      description: "A top-tier Vaporize team featuring Mualani as main DPS, Mavuika as off-field Pyro applier, Xilonen for RES shred and healing, and Citlali for shielding and further resistance reduction via Melt reactions.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high on-field Vaporize damage.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Provides consistent off-field Pyro application to enable Vaporize.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.",
          weapons: ["Starcaller's Watch", "Sacrificial Fragments"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        }
      ]
    },
    {
      name: "Mavuika Overload Team #2",
      rank: "S",
      description: "Overload team featuring Varesa as Main DPS, Mavuika as Sub DPS, Chevreuse and Iansan providing support and healing. Shreds enemy resistance to Pyro and Electro after Overload, while Iansan provides a massive ATK buff, maximizing Varesa and Mavuika's damage.",
      members: [
        {
          characterId: "varesa",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Deals continuous Electro damage to trigger Overload reactions.",
          weapons: ["Tulaytullah's Remembrance", "The Widsith"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "iansan",
          role: "Support",
          roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
          weapons: ["Calamity Queller", "Favonius Lance"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["HP%", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mavuika Melt",
      rank: "SS",
      description: "A melt team leveraging Mavuika's high Pyro damage with Citlali's Cryo application and Furina's damage buffs, all supported by Bennett's ATK buff and healing. Trigger Melt by applying elements to enemies via Citlali, then use Mavuika's empowered Burst for massive Pyro damage. Furina provides Hydro, freeze, and Bennett heals and buffs ATK.",
      members: [
        {
          characterId: "mavuika",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals high on-field Melt damage with Citlali's Cryo application.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.",
          weapons: ["Starcaller's Watch", "Sacrificial Fragments"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Mavuika Overload Vanguard",
      rank: "S",
      description: "An Overload team centered around Mavuika's high burst damage, supported by Ororon's off-field attacks, Chevreuse's RES shred and ATK buff, and Iansan's ATK buff. Trigger Overload to activate Chevreuse's RES shred, boosting Mavuika's Pyro damage, while Ororon's Electro damage contributes. Iansan buffs ATK.",
      members: [
        {
          characterId: "mavuika",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "ororon",
          role: "Support",
          roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "iansan",
          role: "Support",
          roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
          weapons: ["Calamity Queller", "Favonius Lance"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["HP%", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Mavuika Overload",
      rank: "SS",
      description: "An Overload team with Chevreuse's RES shred and ATK buff, maximizing Clorinde and Mavuika's damage. Leverage Overload reactions to trigger Chevreuse's Pyro and Electro RES shred and ATK buff, while Ororon provides off-field Electro damage and energy.",
      members: [
        {
          characterId: "clorinde",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Infuses normal attacks with Electro and triggers reactions.",
          weapons: ["Absolution", "The Black Sword"],
          artifacts: ["4pc Fragment of Harmonic Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "mavuika",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.",
          weapons: ["A Thousand Blazing Suns", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ororon",
          role: "Support",
          roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Energy Recharge"]
        }
      ]
    }
  ],
  "traveler-pyro": [
    {
      name: "Traveler Pyro Burning Team",
      rank: "S",
      description: "A Burning-focused team where Kinich deals high Dendro damage on-field, Emilie acts as an off-field Dendro Sub DPS, Bennett provides massive ATK buffs and healing, and Pyro Traveler applies consistent off-field Pyro.",
      members: [
        {
          characterId: "kinich",
          role: "Main DPS",
          roleDesc: "On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.",
          weapons: ["Fang of the Mountain King", "Earth Shaker"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "traveler-pyro",
          role: "Support",
          roleDesc: "Pyro Support. Provides Pyro resonance, off-field Pyro application, and team buffs via Scroll of the Hero set.",
          weapons: ["Favonius Sword", "Peak Patrol Song"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Healer/Buffer. Provides massive ATK buff and consistent healing via Elemental Burst.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%"]
        }
      ]
    },
    {
      name: "Traveler Pyro Vaporize Team",
      rank: "S",
      description: "A premium Vaporize team featuring Mavuika as the primary on-field Pyro DPS, Furina for off-field Hydro application and DMG buffs, Xilonen for healing and RES shred, and Pyro Traveler for Pyro resonance and off-field support.",
      members: [
        {
          characterId: "mavuika",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
          weapons: ["Arianrhod", "Earth Shaker"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS / Buffer",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "traveler-pyro",
          role: "Support",
          roleDesc: "Pyro Support. Enables Pyro resonance, helps keep Pyro/Hydro aura, and buffs the team with Instructor/Scroll.",
          weapons: ["Favonius Sword", "Sacrificial Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "xilonen",
          role: "Support / Healer",
          roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "Energy Recharge", "DEF", "CRIT Rate"]
        }
      ]
    }
  ],
  "traveler-hydro": [
    {
      name: "Traveler Hydro Bloom Team",
      rank: "S",
      description: "A classic Nilou Bloom team utilizing Hydro Traveler's continuous off-field Hydro application from their Burst, enhanced by Nilou's Bountiful Cores, Nahida's high Dendro application, and Baizhu's shielding/healing.",
      members: [
        {
          characterId: "nilou",
          role: "Support",
          roleDesc: "Hydro Support. Boosts Bloom reaction damage via Bountiful Cores based on her max HP.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith", "2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies continuous Dendro off-field and shares Elemental Mastery with the active character.",
          weapons: ["A Thousand Floating Dreams", "Sacrificial Fragments"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT Rate", "CRIT DMG", "Energy Recharge"]
        },
        {
          characterId: "traveler-hydro",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application from Burst to trigger Bloom reactions.",
          weapons: ["Favonius Sword", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Instructor"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support/Healer. Provides shielding, continuous healing, and boosts Bloom reaction damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["HP%", "Energy Recharge", "HP"]
        }
      ]
    },
    {
      name: "Traveler Hydro F2P Vaporize Team",
      rank: "S",
      description: "A budget/F2P Vaporize team where Hydro Traveler triggers Vaporize reactions on their Elemental Skill and Burst, supported by Xiangling's Pyro application, Bennett's ATK buffs, and Sucrose's Elemental Mastery sharing.",
      members: [
        {
          characterId: "traveler-hydro",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers Vaporize reactions on their Skill and Burst hits on-field.",
          weapons: ["Favonius Sword", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage and applies Pyro to enable constant Vaporize reactions.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buffer & Healer. Provides a massive ATK buff and continuous healing from his Burst.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "Energy Recharge", "HP", "ATK%"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Anemo Support. Swirls Hydro/Pyro to shred enemy resistances and shares Elemental Mastery with the team.",
          weapons: ["Sacrificial Fragments", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge"]
        }
      ]
    }
  ],
  "durin": [
    {
      name: "Durin Anemo Team",
      rank: "SS",
      description: "An Anemo-Anemo-Pyro-Pyro team leveraging Venti's grouping, Faruzan's Anemo buffs, Durin's Pyro support and RES shred, and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "venti",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Provides crowd control and gather enemies.",
          weapons: ["The Stringless", "Favonius Warbow"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "faruzan",
          role: "Support",
          roleDesc: "Anemo Support. Buffs Anemo DMG and reduces resistance.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Energy Recharge", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Provides off-field Pyro DMG and reduces enemy RES.",
          weapons: ["Athame Artis", "Wolf-Fang"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Buffs ATK and provides healing.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Durin Gaming Team #1",
      rank: "SS",
      description: "A burning-focused team leveraging Durin's off-field Pyro support and Bennett's ATK buff to empower Kinich and Emilie's Dendro damage.",
      members: [
        {
          characterId: "kinich",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Deals massive Dendro damage through Nightsoul Burst.",
          weapons: ["Fang of the Mountain King", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Deals off-field Dendro damage boosted by Burning.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Applies Pyro off-field to maintain Burning and holds Deepwood Memories.",
          weapons: ["Athame Artis", "Wolf-Fang"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides massive ATK buff.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Durin Gaming Team #2",
      rank: "SS",
      description: "A powerful Burning team leveraging Durin's support to boost Kinich and Emilie's damage, while Xilonen provides Geo RES shred.",
      members: [
        {
          characterId: "kinich",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Deals massive Dendro damage.",
          weapons: ["Fang of the Mountain King", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Deals off-field Dendro damage.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Applies Pyro off-field and triggers Burning.",
          weapons: ["Athame Artis", "Wolf-Fang"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Geo Support. Reduces enemy elemental resistance and triggers Scroll buff.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["DEF%", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Durin Geo Team",
      rank: "S",
      description: "A team where Navia serves as the main DPS, supported by Albedo's off-field Geo damage, Durin's Pyro application, and Bennett's ATK buff.",
      members: [
        {
          characterId: "navia",
          role: "Main DPS",
          roleDesc: "Geo Main DPS. Deals explosive damage with Gunbrella.",
          weapons: ["Verdict", "Serpent Spine"],
          artifacts: ["4pc Nighttime Whispers in the Echoing Woods"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Geo Sub DPS. Pairs for Geo Resonance and deals off-field Geo damage.",
          weapons: ["Uraku Misugiri", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Applies Pyro off-field and triggers crystallize.",
          weapons: ["Athame Artis", "Wolf-Fang"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides massive ATK buff.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Durin Overload Team",
      rank: "S",
      description: "An overload team that maximizes Varka's plunge attacks through Chevreuse's RES shred and ATK buff, Durin's off-field Pyro support, and Ororon's Electro support.",
      members: [
        {
          characterId: "varka",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Performs plunge attacks to trigger swirl and deal damage.",
          weapons: ["Unbreakable: Durandarte", "The Bell"],
          artifacts: ["4pc A Day Carved From Rising Winds"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Provides off-field Pyro application for Overload.",
          weapons: ["Athame Artis", "Wolf-Fang"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro Support. Reduces enemy Pyro/Electro resistance and buffs ATK.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "ororon",
          role: "Support",
          roleDesc: "Electro Support. Triggers Scroll set buff and provides Electro support.",
          weapons: ["Astral Vulture's Crimson Plumage", "Favonius Warbow"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    }
  ],
  "hu-tao": [
    {
      name: "Hu Tao Vaporize",
      rank: "SS",
      description: "Hu Tao is the Pyro main DPS, with damage amplified by Vaporize reactions. Hu Tao triggers Vaporize on enemies affected by Xingqiu's Burst. Kazuha groups enemies and buffs Pyro DMG, while Zhongli provides a shield and ATK boost with Tenacity of the Millelith.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Main DPS, DMG amplified by Vaporize.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Elemental Burst applies Hydro continuously to enable Vaporize.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides Anemo Swirl to reduce resistance and buff Pyro DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a shield and ATK buff with Tenacity of the Millelith set.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Vaporize Team #2",
      rank: "SS",
      description: "Hu Tao is the main DPS, relying on Vaporize reactions. Yelan and Xingqiu apply Hydro off-field, while Zhongli provides shielding and ATK buffs. Continuously apply Hydro with Yelan and Xingqiu to enable Hu Tao's Vaporize, while Zhongli shields and buffs ATK via Tenacity of the Millelith.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao's DMG is amplified by Vaporize.",
          weapons: ["Staff of Homa", "Lithic Spear"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Yelan provides continuous Hydro off-field attacks that react with Pyro on enemies. Her Burst also increases Hu Tao's DMG via her passive talent.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Burst continuously applies Hydro to enemies.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Zhongli's shield provides a safe environment and increases ATK of the whole team with Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Vaporize Team #3",
      rank: "SS",
      description: "A Pyro-Hydro reaction team focusing on Hu Tao's Vaporize damage, supported by Geo resonance and shielding from Albedo and Zhongli. Hu Tao triggers Vaporize with Xingqiu's constant Hydro application, while Albedo and Zhongli provide Geo resonance and shield, and Albedo uses Archaic Petra to boost elemental DMG.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst can attach Hydro element to enemies continuously, and so react with Hu Tao's Pyro DMG to trigger Vaporization.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Albedo pairs with Zhongli to trigger resonance, and by using full set of Archaic Petra, picking up crystal can increase corresponding DMG of team members.",
          weapons: ["Cinnabar Spindle", "Harbinger of Dawn"],
          artifacts: ["4pc Archaic Petra"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge", "DEF"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Zhongli's shield provides safe environment for team members, and increase ATK of whole team by using full set of Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Dual-Carry Vaporize",
      rank: "SS",
      description: "Alternates between Hu Tao and Yoimiya as main DPS, both triggering Vaporize with Xingqiu's rain swords. Zhongli provides shielding and ATK boost. Two Pyro DPS characters take turns dealing Vaporize damage while Xingqiu applies Hydro off-field and Zhongli protects the team.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Deals massive Vaporize damage during Skill. Switches with Yoimiya after skill ends.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Provides sustained Pyro damage with Skill and triggers Vaporize. Switches with Hu Tao after skill ends.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Burst applies Hydro continuously to enable Vaporize for both Hu Tao and Yoimiya.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Strong shield protects the team. Tenacity of the Millelith boosts ATK when Skill hits enemies.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Vaporize Team #5",
      rank: "S",
      description: "A top-tier team focusing on Vaporize reactions with Hu Tao as the main DPS, supported by Xingqiu, Sucrose, and Bennett. Hu Tao's Pyro DMG is amplified by Vaporization with Xingqiu's continuous Hydro application, while Sucrose provides Elemental Mastery bonus and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Main DPS whose DMG is amplified by Vaporization.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Applies Hydro continuously via Burst to enable Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Sub DPS",
          roleDesc: "Provides Elemental Mastery bonus to increase Vaporize DMG.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Vaporize Team #4",
      rank: "S",
      description: "Hu Tao is a Main DPS in the team. Her DMG is amplified by Vaporize. Hu Tao's damage is amplified by Vaporize with Xingqiu's continuous Hydro application, Sucrose's Elemental Mastery boost, and Thoma's shield.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao's DMG is amplified by Vaporize.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst applies Hydro continuously to trigger Vaporize.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Sucrose provides Elemental Mastery bonus to increase Vaporize DMG.",
          weapons: ["Prototype Amber"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Thoma's shield provides a safe environment for team members.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Melt Team #1",
      rank: "SS",
      description: "Hu Tao is the main DPS, her DMG is amplified by Melt. Two Cryo characters provide resonance, increasing CRIT Rate against enemies affected by Cryo or Frozen. Hu Tao's Pyro attacks trigger Melt reactions against Cryo-applied enemies, boosted by Cryo resonance for extra CRIT Rate.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao's DMG is amplified by Melt.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Burst continuously applies Hydro to trigger Vaporize with Hu Tao and Freeze with Rosaria.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["2pc Heart of Depth + 2pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "rosaria",
          role: "Sub DPS",
          roleDesc: "Rosaria's Burst deals Cryo DMG and provides CRIT Rate share to party. Melt with Hu Tao and Freeze with Xingqiu.",
          weapons: ["Skyward Spine", "Favonius Lance"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Diona provides shield and healing. At C6 with Instructor, she boosts party Elemental Mastery by 320 (including Instructor bonus).",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Instructor"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Melt Team #2",
      rank: "S",
      description: "Hu Tao triggers Melt on Cryo-affected enemies for massive damage. Ayaka provides off-field Cryo application, Kazuha shreds resistance and buffs, Bennett heals and boosts ATK. Hu Tao triggers Melt on Cryo-affected enemies for massive single-target damage.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Main DPS whose damage is amplified by Melt.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "ayaka",
          role: "Sub DPS",
          roleDesc: "Sub DPS applying Cryo via Burst for Hu Tao to Melt.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["2pc Blizzard Strayer + 2pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "VV shred, crowd control, and elemental damage buffs.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Healing and massive ATK buff from Burst.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "raiden-shogun": [
    {
      name: "Raiden Shogun Electro Team",
      rank: "SS",
      description: "Raiden Shogun drives an electro charged team with high energy cost bursts, maximizing her own damage while providing energy and buffs.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Drives the team with high energy cost bursts, maximizing damage and energy refund.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides Electro CRIT DMG buff and ATK bonus for Raiden.",
          weapons: ["Elegy for the End", "Mouun's Moon"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, triggers Viridescent Venerer resistance shred, and buffs Electro DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Provides massive ATK buff and healing for the team.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Raiden Shogun National Team",
      rank: "SS",
      description: "Raiden Shogun acts as the Main DPS, utilizing her Elemental Burst which scales with energy consumed by teammates. Xiangling and Xingqiu provide high off-field bursts (80 energy) to maximize her damage, while Bennett supplies ATK buffs and healing.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS. Scales damage with team energy consumption and refills team energy.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides constant off-field Hydro application to enable Vaporize/Electro-Charged reactions.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals massive Pyro damage off-field with her Pyronado.",
          weapons: ["Primordial Jade Cutter", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and buffs ATK.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Raiden Shogun Overload Team",
      rank: "SS",
      description: "Raiden Shogun serves as Main DPS, with Kujou Sara providing ATK bonus and CRIT DMG boost for Electro. Xiangling offers continuous Pyro DMG, and Bennett heals and buffs ATK.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS. Drives the team with high energy cost bursts.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Buffs Electro CRIT DMG and ATK.",
          weapons: ["Elegy for the End", "Mouun's Moon"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Continuously applies Pyro off-field.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and buffs ATK.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Raiden Shogun Overload Team #2",
      rank: "SS",
      description: "Electro-Pyro overload team focusing on Raiden Shogun's Burst damage. Kujou Sara C6 provides CRIT DMG for Electro, Chevreuse shreds Pyro/Electro RES when Overload is triggered, while Bennett supplies huge ATK buffs and healing.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS. Deals massive Electro damage with Burst.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides ATK and Electro CRIT DMG buffs.",
          weapons: ["Elegy for the End", "Mouun's Moon"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Pyro Support. Shreds Pyro/Electro resistance and buffs team ATK%.",
          weapons: ["Staff of Homa", "Favonius Lance"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and buffs ATK.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Raiden Shogun Catalyze Team",
      rank: "S",
      description: "A variant of Raiden's team using Nahida for Aggravate reactions to boost Electro damage.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS. Triggers Aggravate reactions for enhanced Electro damage.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Buffs Electro CRIT DMG and ATK.",
          weapons: ["Elegy for the End", "Mouun's Moon"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies and shreds resistance.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares Elemental Mastery.",
          weapons: ["A Thousand Floating Dreams", "Prototype Amber"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Raiden Shogun Hyperbloom",
      rank: "SS",
      description: "Raiden Shogun is the Electro trigger in the Hyperbloom team, with Yelan providing Hydro application and DMG, Nahida applying Dendro, and Baizhu for healing and shields.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Electro trigger. Triggers Hyperbloom reactions on Dendro Cores with Elemental Skill.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Applies Hydro off-field and boosts active character damage.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and increases team Elemental Mastery.",
          weapons: ["A Thousand Floating Dreams", "Prototype Amber"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides shields, healing, and Hyperbloom reaction damage bonus.",
          weapons: ["Prototype Amber"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Raiden Shogun Double Core Team",
      rank: "S",
      description: "A team built around Raiden Shogun and Eula as dual carries. Superconduct enables Eula's physical Burst damage, while Raiden provides energy and burst buffs. Rosaria batteries Eula, and Bennett heals and buffs ATK.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Triggers Superconduct and refills team energy.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Physical Main DPS. Deals massive physical Burst damage.",
          weapons: ["Song of Broken Pines", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "rosaria",
          role: "Sub DPS",
          roleDesc: "Cryo Sub DPS. Batteries Eula and shares CRIT Rate.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and buffs ATK.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ],
  "zhongli": [
    {
      name: "Zhongli Catalyze Team",
      rank: "S",
      description: "Zhongli is a Shield Support. The Electro DMG of Keqing is maximized by Aggravate. Keqing and Fischl apply off-field Electro, while Traveler (Dendro) applies Dendro to trigger Quicken, resulting in Aggravate reactions that boost Keqing's Electro DMG. Zhongli provides a shield and reduces enemy resistance with Shred.",
      members: [
        {
          characterId: "keqing",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Multi-stage attacks trigger Aggravate reactions to trigger extra damage.",
          weapons: ["Mistsplitter Reforged", "Iron Sting"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides continuous off-field Electro damage to trigger Aggravate.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "traveler",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field via Burst to maintain Quicken status.",
          weapons: ["Favonius Sword"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides a safe environment, shield, and decreases enemy resistance with Shred.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Zhongli Xiao-Jean Team",
      rank: "SS",
      description: "Zhongli provides a safe environment with his shield. Xiao's Elemental Burst damage is maximized by teammates. Geo resonance from Zhongli and Albedo enhances shield strength and damage. Jean acts as a battery and healer, while Zhongli's shield and Tenacity of the Millelith buff ATK.",
      members: [
        {
          characterId: "xiao",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Unleashes continuous plunging attacks during Burst.",
          weapons: ["Primordial Jade Winged-Spear", "Deathmatch"],
          artifacts: ["4pc Vermillion Hereafter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Anemo Support. Heals the party and acts as a battery for Xiao.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Geo Sub DPS. Pairs with Zhongli for Geo Resonance and deals off-field Geo damage.",
          weapons: ["Cinnabar Spindle", "Harbinger of Dawn"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "DEF", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides a strong shield and ATK buff via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Zhongli Vaporize Team",
      rank: "SS",
      description: "A powerful team that maximizes Hu Tao's damage through Vaporize reactions, supported by Zhongli's shield and Kazuha's buffs. Hu Tao's Pyro damage is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Kazuha groups enemies, reduces Pyro RES, and provides Elemental Mastery buff. Zhongli provides a safe shield and ATK boost via Tenacity of the Millelith.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Vaporizes attacks on enemies affected by Hydro.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application to enable Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Pyro RES, and buffs elemental damage.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides strong shield and buffs ATK via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Zhongli Permafrost Team #1",
      rank: "S",
      description: "Zhongli acts as Shield Support in the team. Ganyu's Cryo is main DPS, with constant Hydro application from Mona to trigger Freezing. Ganyu's Cryo attacks combined with Mona's Hydro application keep enemies frozen, while Venti groups them and Zhongli provides a safe shield and ATK buff.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Cryo Main DPS. Deals massive AoE Cryo damage via Charged Attacks.",
          weapons: ["Amos' Bow", "Prototype Crescent"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "mona",
          role: "Support",
          roleDesc: "Hydro Support. Triggers Freeze and increases team damage via Omen.",
          weapons: ["Skyward Atlas", "Favonius Codex", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "venti",
          role: "Support",
          roleDesc: "Anemo Support. Gathers enemies and triggers Swirl reactions.",
          weapons: ["Elegy for the End"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides shield and team buffs.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayaka Permafrost Team",
      rank: "S",
      description: "A powerful team combining Ayaka as main Cryo DPS, with Mona applying Hydro, Kazuha grouping and shredding resistance, and Zhongli for shielding. Focuses on freezing enemies and dealing Freeze reactions.",
      members: [
        {
          characterId: "ayaka",
          role: "Main DPS",
          roleDesc: "Cryo Main DPS. Deals massive Cryo damage with Burst.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "mona",
          role: "Support",
          roleDesc: "Hydro Support. Applies Hydro off-field and increases team damage.",
          weapons: ["Skyward Atlas", "Favonius Codex", "Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Shreds resistance and provides elemental damage buffs.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides a safe shield for the team.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Zhongli Superconduct Team",
      rank: "S",
      description: "Zhongli acts as Shield Support in the team. Eula's physical damage is maximized by Superconduct and aid of teammates. The team revolves around Eula's high damage physical Burst, amplified by Superconduct (triggered by Fischl's Skill) and RES reduction from Zhongli's Tenacity of the Millelith, while Chongyun reduces cooldown with C2.",
      members: [
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Physical Main DPS. Unleashes massive physical damage via Burst.",
          weapons: ["Song of Broken Pines", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Applies off-field Electro to enable Superconduct.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chongyun",
          role: "Sub DPS",
          roleDesc: "Cryo Sub DPS. Provides Cryo application, reduces cooldowns, and increases ATK speed.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides strong shield and physical RES shred.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Zhongli Melt Team",
      rank: "S",
      description: "Zhongli acts as Support in the team. Ganyu provides Cryo, while Xiangling's Pyronado triggers Melt for Ganyu. Ganyu's Charge Attack applies Cryo, triggering Melt from Xiangling's Pyronado, while Zhongli's shield and Bennett's Burst provide safety and ATK buff.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Cryo Main DPS. Triggers Melt on Pyro-affected enemies.",
          weapons: ["Amos' Bow", "Hamayumi"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals massive Pyro damage off-field with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides massive ATK buff.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Offers shield and ATK buffs.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "nahida": [
    {
      name: "Nahida Overload-Catalyze Team",
      rank: "S",
      description: "Nahida is the Main DPS. Raiden Shogun and Thoma provide continuous Electro and Pyro attachment. Nahida's Normal Attacks trigger Overload, Spread, and Aggravate. Use Nahida's Skill to apply Dendro, then Electro/Pyro from Raiden and Thoma trigger Overload, Spread, and Aggravate. Kuki triggers Hyperbloom from Dendro cores, maximizing reaction damage.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Applies Dendro with Skill and drives reactions using Normal Attacks.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Triggers Quicken and Aggravate reactions.",
          weapons: ["Dragon's Bane"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kuki-shinobu",
          role: "Support",
          roleDesc: "Electro Support. Heals and triggers Hyperbloom from Dendro cores.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Elemental Mastery", "HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Pyro Support. Provides shield and triggers Burning/Burgeon/Overload reactions.",
          weapons: ["Kitain Cross Spear"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        }
      ]
    },
    {
      name: "Nahida Catalyze Team #1",
      rank: "SS",
      description: "Nahida maximizes Elemental Mastery for personal DMG and Catalyze. Two Electro characters provide off-field Electro for Aggravate reactions, and two Dendro units reduce Tri-Karma Purification interval.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Maximizes EM for personal damage and Catalyze reactions.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yae-miko",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides off-field Electro damage for Aggravate.",
          weapons: ["Kagura's Verity", "The Widsith"],
          artifacts: ["2pc Golden Troupe + 2pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Applies off-field Electro continuously.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides shield and Geo Resonance.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Archaic Petra"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Nahida Hyperbloom Team #1",
      rank: "SS",
      description: "Hyperbloom team with Nahida applying Dendro, Kokomi creating Dendro cores, Raiden Shogun triggering Hyperbloom, and Kazuha providing support and Elemental RES shred. Raiden Shogun's Elemental Skill triggers Hyperbloom on Dendro Cores created by Nahida and Kokomi. Kazuha groups enemies and buffs team DMG.",
      members: [
        {
          characterId: "kokomi",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Applies Hydro on-field, triggers Bloom, and heals the team.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies off-field Dendro to create Bloom cores.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Electro trigger. Triggers Hyperbloom on Dendro cores off-field.",
          weapons: ["Dragon's Bane"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Hydro/Electro resistance, and buffs team damage.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        }
      ]
    },
    {
      name: "Nahida Rainbow Hyperbloom Team",
      rank: "SS",
      description: "A versatile team that uses Nahida's Dendro with Yelan's Hydro to create Bloom cores, then triggers Hyperbloom with Kuki Shinobu's Electro or Burgeon with Thoma's Pyro. Nahida applies Dendro with her Skill while Yelan provides off-field Hydro to create Bloom cores. Kuki (high Elemental Mastery) or Thoma then trigger Hyperbloom or Burgeon for massive damage.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Applies Dendro and triggers reactions on-field.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro and increases active character damage.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Pyro Support. Triggers Burgeon reactions on Dendro cores.",
          weapons: ["Kitain Cross Spear"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        },
        {
          characterId: "kuki-shinobu",
          role: "Support",
          roleDesc: "Electro Support. Heals the team and triggers Hyperbloom.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Elemental Mastery", "HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Nahida Bloom Team",
      rank: "SS",
      description: "Primary Dendro applicator as Elemental Mastery. Nilou triggers bountiful blooms. Nahida's Elemental Skill applies Dendro to trigger Bloom, Yelan/Xingqiu applies Hydro, and Kokomi triggers healing.",
      members: [
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Replaces Bloom cores with Bountiful Cores for instant massive damage.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Energy Recharge", "CRIT DMG"]
        },
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Continuous Dendro application on-field.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "traveler",
          role: "Support",
          roleDesc: "Dendro Support. Provides Dendro Resonance and off-field Dendro application.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        },
        {
          characterId: "kokomi",
          role: "Support",
          roleDesc: "Hydro Support. Heals the team and applies Hydro off-field.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge", "ATK%"]
        }
      ]
    },
    {
      name: "Nahida Catalyze Team #2",
      rank: "S",
      description: "Nahida (Dendro) application with Cyno (Electro) for high damage. Zhongli provides shielding and ATK buff. Maximize team damage through Catalyze reactions. Nahida's Tri-Karma Purification benefits from two Electro characters, reducing its trigger interval.",
      members: [
        {
          characterId: "cyno",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Drives Aggravate reactions on-field during Burst.",
          weapons: ["Staff of the Scarlet Sands", "Deathmatch"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Deals off-field Electro damage for Catalyze.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM with the active character.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Provides shield and RES shred.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Nahida Catalyze Team #3",
      rank: "S",
      description: "Nahida is the Main DPS with maximized Elemental Mastery to boost her DMG and Catalyze reactions. Beidou and Fischl provide off-field Electro for Aggravate reactions. Zhongli's shield offers safety and can use Archaic Petra for bonus DMG.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Deals high on-field Dendro damage and drives Catalyze.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "beidou",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides off-field Electro damage and damage reduction via Burst.",
          weapons: ["Skyward Pride", "Serpent Spine"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Applies off-field Electro continuously.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Strong shield protection, can buff Geo/Electro with Archaic Petra.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Archaic Petra"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Nahida Melt Team",
      rank: "S",
      description: "Nahida applies Dendro to trigger Burning with Pyro from Bennett, then Ganyu/Rosaria Melt on burning enemies for massive damage.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Cryo Main DPS. Triggers Melt on burning targets.",
          weapons: ["Hunter's Path", "Hamayumi"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Maintains Burning status on enemies via Tri-Karma Purification.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield Support. Protects Ganyu during Charged Attacks.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Applies Pyro to trigger Burning, heals, and buffs ATK.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Nahida Hyperbloom Team #2",
      rank: "S",
      description: "Razor triggers multiple reactions (Overloaded, Electro-Charged, Superconduct, Aggravate, Hyperbloom) with his Burst while Nahida applies Dendro, Xingqiu applies Hydro, and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "razor",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Drives multiple reactions on-field using Burst.",
          weapons: ["Serpent Spine", "Wolf's Gravestone"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application to create Bloom cores.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field to create Bloom cores.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Provides ATK buff, healing, and Pyro application for Overload/Burgeon.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "kazuha": [
    {
      name: "Kazuha Pure Hydro Team #1",
      rank: "SS",
      description: "A high damage pure Hydro team that leverages Furina's DMG buffs, Kazuha's resistance shred and grouping, and Sigewinne's healing and Skill damage boost. Pure Hydro team focusing on high Hydro damage, with Furina providing DMG buffs, Kazuha reducing resistance and grouping, and Sigewinne healing and boosting Skill damage.",
      members: [
        {
          characterId: "yelan",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high damage from off-field and on-field with continuous Hydro attacks.",
          weapons: ["Aqua Simulacra"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and massive party-wide damage buffs.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Hydro resistance, and buffs Hydro damage.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "sigewinne",
          role: "Support",
          roleDesc: "Hydro Support. Provides healing and increases team Elemental Skill damage.",
          weapons: ["Silvershower Heartstring", "Favonius Warbow"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP"]
        }
      ]
    },
    {
      name: "Kazuha Aggravate Team",
      rank: "SS",
      description: "An aggressive Aggravate team leveraging Clorinde's rapid Electro attacks and Fischl's off-field Electro application, with Nahida providing Dendro for reaction triggers, and Kazuha grouping enemies and limiting damage via Anemo swirling and Viridescent Venerer resistance shred.",
      members: [
        {
          characterId: "clorinde",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Infuses Electro on Normal Attacks and deals fast damage.",
          weapons: ["Absolution", "The Black Sword"],
          artifacts: ["4pc Fragment of Harmonious Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Deals high off-field Electro damage.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Electro resistance, and buffs Electro damage.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        }
      ]
    },
    {
      name: "Kazuha Vaporize Team #1",
      rank: "SS",
      description: "A high-tier Vaporize team with Tartaglia as main DPS, utilizing Xiangling's off-field Pyro application, Kazuha's grouping and buffs, and Bennett's ATK boost and healing. Lilitse Child's Hydro attacks trigger Vaporize with Xiangling's Pyronado, while Kazuha provides Anemo swirl and elemental DMG buffs, and Bennett heals and boosts ATK.",
      members: [
        {
          characterId: "tartaglia",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals fast on-field AoE Hydro damage.",
          weapons: ["Polar Star"],
          artifacts: ["2pc Heart of Depth + 2pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high Pyro damage off-field with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Double swirls to buff both Hydro and Pyro damage, and shreds resistances.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Kazuha Pure Pyro",
      rank: "SS",
      description: "A powerful team centered on Arlecchino's Pyro damage, supported by Kazuha's crowd control and buffs, Bennett's ATK buff and healing, and Kazuha/Kashina grouping. Xiangling applies off-field Pyro, Arlecchino deals massive Pyro damage using her Bond of Life mechanics, Bennett supplies ATK buff and healing, while Kazuha gathers, groups and shreds RES.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals massive Pyro damage using Bond of Life mechanics.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonious Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Pyro resistance, and buffs Pyro damage.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "kachina",
          role: "Support",
          roleDesc: "Geo Support. Triggers crystallize and buffs team damage using Cinder City set.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["Energy Recharge", "DEF%", "DEF"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Provides healing and massive ATK buff.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Kazuha Vaporization Team #2",
      rank: "SS",
      description: "A potent Vaporize team featuring Klee as the main DPS, supported by Furina, Kazuha, and Bennett. Leverage Furina's off-field Hydro application and Kazuha's Anemo Swirl to enable Klee's Vaporize reactions, while Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals continuous Pyro damage and drives Vaporize reactions.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental damage.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides massive ATK buff.",
          weapons: ["Aquila Favonia", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ],
  "neuvillette": [
    {
      name: "Neuvillette Hyperbloom",
      rank: "SS",
      description: "A powerful Hyperbloom team leveraging Neuvillette's continuous Hydro application with Nahida's Dendro application to create Bloom cores, then triggering Hyperbloom with Raiden Shogun's Electro. Furina provides additional off-field Hydro application and party-wide DMG buffs.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high continuous Hydro damage with Charged Attacks.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Sacrificial Fragments"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Triggers Hyperbloom reactions with Elemental Skill.",
          weapons: ["Dragon's Bane"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        }
      ]
    },
    {
      name: "Neuvillette Vaporize #1",
      rank: "SS",
      description: "A powerful Vaporize team centered around Neuvillette's charged attacks, with Xiangling providing off-field Pyro application, Kazuha offering crowd control and resistance shred, and Bennett healing and boosting ATK.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high continuous Hydro damage and triggers Vaporize.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high Pyro damage off-field with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds Pyro and Hydro resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Provides healing and massive ATK buff.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Neuvillette Electro-Charged Team #1",
      rank: "SS",
      description: "An Electro-Charged team combining Neuvillette's Hydro application and off-field Electro from Yae Miko and Raiden Shogun, with Kazuha providing grouping and buffs.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Drives Electro-Charged reactions with Charged Attacks.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "yae-miko",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Deals continuous off-field Electro damage with turrets.",
          weapons: ["Kagura's Verity", "The Widsith"],
          artifacts: ["2pc Thundering Fury + 2pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Buffs Burst DMG and triggers off-field Electro attacks.",
          weapons: ["Dragon's Bane"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        }
      ]
    },
    {
      name: "Neuvillette Electro-Charged Team #2",
      rank: "SS",
      description: "An Electro-Charged team featuring Neuvillette as the main DPS, with Furina providing off-field Hydro, Kazuha grouping and buffs, and Kuki Shinobu triggering Electro-Charged reactions and healing.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high Hydro damage and drives Electro-Charged.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "kuki-shinobu",
          role: "Support",
          roleDesc: "Electro Support. Provides healing and triggers Electro-Charged reactions.",
          weapons: ["Key of Khaj-Nisut", "Iron Sting"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["Elemental Mastery", "HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Neuvillette Hypercarry Team #1",
      rank: "SS",
      description: "Neuvillette hypercarry team utilizing Bloom reactions from Hydro and Dendro applications. Hydro application from Neuvillette and Furina reacts with Dendro from Baizhu to create Bloom cores. Kazuha provides Elemental Mastery buff and Anemo resistance shred via Viridescent Venerer.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals massive Hydro damage with Charged Attacks.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing, shields, and buffs Bloom reaction damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge", "CRIT DMG", "CRIT Rate"]
        }
      ]
    }
  ],
  "furina": [
    {
      name: "Furina Aggravate-Hyperbloom Team",
      rank: "SS",
      description: "Clorinde drives Aggravate and Hyperbloom with Furina's off-field Hydro and Nahida's Dendro, while Baizhu provides healing and shields. Maximize Clorinde's Electro DMG through Aggravate and Hyperbloom, enabled by Furina's continuous Hydro application and Nahida's Dendro linking, with Baizhu sustaining the team.",
      members: [
        {
          characterId: "clorinde",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Infuses Electro on Normal Attacks and deals fast damage.",
          weapons: ["Absolution", "The Black Sword"],
          artifacts: ["4pc Fragment of Harmonious Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing and shields, and buffs Dendro reactions.",
          weapons: ["Prototype Amber", "Favonius Codex"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Bloom #1",
      rank: "SS",
      description: "Furina acts as Sub DPS in the team. Dendro from Baizhu reacts with Hydro from Neuvillette and Furina to trigger Bloom, producing Dendro Cores.",
      members: [
        {
          characterId: "neuvillette",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals massive Hydro damage with Charged Attacks.",
          weapons: ["Tome of the Eternal Flow", "Sacrificial Jade"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing, shields, and buffs Bloom reaction damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge", "CRIT DMG", "CRIT Rate"]
        }
      ]
    },
    {
      name: "Furina Vaporize",
      rank: "SS",
      description: "Hu Tao triggers Vaporize with off-field Hydro from Yelan and Furina, with Zhongli's shields and buffs, and Bennett's ATK boost. Leverage Furina and Yelan's off-field Hydro to enable Hu Tao's Vaporization, with Furina's Burst providing damage amplification and Zhongli's shield and Tenacity set boosting survivability and ATK.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals massive Vaporize damage using Charged Attacks.",
          weapons: ["Staff of Homa", "White Tassel"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Raiden-Core #1",
      rank: "SS",
      description: "Furina and Yelan provide continuous off-field Hydro application for Electro-Charged reactions, while Jean heals and shreds RES with Viridescent Venerer. Maximize Raiden Shogun's Elemental Burst damage using Yelan and Furina's off-field Hydro application and DMG buffs, while Jean enables Furina's buff stacks and provides healing.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Deals high Electro damage and restores energy for the team.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Anemo Support. Instantly heals the entire party and shreds resistances.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["ATK%", "ATK", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Bloom #2",
      rank: "SS",
      description: "Furina acts as an on-field driver, triggering Bloom with off-field Hydro from Nilou and Furina's Skill, while Nahida applies Dendro and Baizhu heals. Nilou's passive converts cores into Bountiful Cores for massive Rupture damage. Trigger Bloom to create Bountiful Cores via Nilou's passive, with Furina providing off-field Hydro and DMG buffs, Nahida enabling reactions, and Baizhu increasing Bloom DMG based on his Max HP.",
      members: [
        {
          characterId: "furina",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Drives reactions on-field with Hydro-infused attacks.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Enables Bountiful Cores and provides off-field Hydro application.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "HP", "Elemental Mastery", "CRIT DMG"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Sacrificial Fragments"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing and shields, and buffs Bloom reaction damage.",
          weapons: ["Prototype Amber", "Favonius Codex"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Vaporize #2",
      rank: "SS",
      description: "The Vaporize DMG of whole team is maximized by Kazuha's buffs, Xiangling and Bennett allow the team to trigger Vaporize all the time. Furina acts as field DPS trigger Vaporize with Xiangling's Pyro, while Kazuha provides DMG buffs and resistance shred, and Bennett heals and buffs ATK.",
      members: [
        {
          characterId: "furina",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers massive Vaporize damage with Elemental Skill.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Geo Team",
      rank: "SS",
      description: "Noelle's DMG is maximized by Gorou's DEF and elemental DMG/Geo CRIT DMG buffs. Furina provides DMG increase via her Burst while draining HP which is healed by the team.",
      members: [
        {
          characterId: "noelle",
          role: "Main DPS",
          roleDesc: "Geo Main DPS. Deals massive Geo damage on-field and heals the team.",
          weapons: ["Redhorn Stonethresher", "Whiteblind"],
          artifacts: ["4pc Marechaussee Hunter", "4pc Husk of Opulent Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Geo Sub DPS. Provides consistent off-field Geo damage.",
          weapons: ["Cinnabar Spindle", "Harbinger of Dawn"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "gorou",
          role: "Support",
          roleDesc: "Geo Support. Buffs team DEF, Geo DMG, and Geo CRIT DMG.",
          weapons: ["Favonius Warbow"],
          artifacts: ["4pc The Exile"],
          substats: ["DEF%", "DEF", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Support",
          roleDesc: "Hydro Support. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Furina Spread-Hyperbloom",
      rank: "SS",
      description: "A team utilizing Spread and Hyperbloom reactions, driven by Alhaitham, Yae Miko, and Furina. Continuous Spread and Hyperbloom reactions via Alhaitham's on-field Dendro, Yae Miko's off-field Electro, and Furina's off-field Hydro, with Baizhu providing healing and Spread DMG boost.",
      members: [
        {
          characterId: "alhaitham",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Deals high Dendro damage on-field and triggers reactions.",
          weapons: ["Light of Foliar Incision", "Iron Sting"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "yae-miko",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Provides off-field Electro application and high turret damage.",
          weapons: ["Kagura's Verity", "The Widsith"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing, shields, and buffs Dendro reaction damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["HP%", "HP", "Energy Recharge", "CRIT DMG", "CRIT Rate"]
        }
      ]
    },
    {
      name: "Furina Quickbloom Team",
      rank: "SS",
      description: "Furina Quickbloom Team is a high damage team focusing on Hyperbloom reactions. Furina's off-field Hydro enables Bloom cores, which Raiden Shogun detonates via her Skill for Hyperbloom. Emilie enhances Burning and provides Dendro, while Baizhu heals and boosts Hyperbloom damage based on his HP.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Electro Sub DPS. Triggers Hyperbloom reactions with Elemental Skill.",
          weapons: ["Dragon's Bane"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Deals high Dendro damage and supports Burning reactions.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing, shields, and buffs team damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ],
  "yelan": [
    {
      name: "Yelan Vaporization Team #1",
      rank: "SS",
      description: "Arlecchino and Yelan trigger Vaporize reactions. Zhongli provides shield and ATK buff, Bennett provides ATK buff and healing. Arlecchino's infused Pyro attacks paired with Yelan's off-field Hydro enable consistent Vaporize. Zhongli's shield and Tenacity of the Millelith boost ATK, while Bennett's Burst provides further ATK and healing.",
      members: [
        {
          characterId: "arlecchino",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals massive Pyro damage using Bond of Life mechanics.",
          weapons: ["Crimson Moon's Semblance", "Deathmatch"],
          artifacts: ["4pc Fragment of Harmonious Whimsy"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Provides healing and massive ATK buff.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Hu Tao Double Hydro Vap",
      rank: "SS",
      description: "Yelan Vaporization Team (D2) featuring Hu Tao as main DPS, Yelan and Xingqiu providing continuous off-field Hydro applications, and Zhongli for shield and ATK buff. Hu Tao's damage is amplified by Vaporization triggered by the constant off-field Hydro from Yelan and Xingqiu, while Zhongli's shield and Tenacity of the Millelith set ensure safe, uninterrupted damage.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS. Deals massive Vaporize damage using Charged Attacks.",
          weapons: ["Staff of Homa", "Ballad of the Fjords"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Support",
          roleDesc: "Hydro Support. Provides continuous off-field Hydro, damage reduction, and minor healing.",
          weapons: ["Staff of Homa", "Sacrificial Sword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.",
          weapons: ["Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yelan Wanderer Team #1",
      rank: "SS",
      description: "A Wanderer hypercarry team utilizing Yelan's off-field Hydro, Faruzan's Anemo support, and Thoma's shield and off-field Pyro application. Wanderer's Skill elevates his Pyro and Hydro infused NA to boost ATK and stamina. Faruzan shreds Anemo RES and gains CRIT bonus via Skill. Yelan provides off-field Hydro application. Thoma shields and applies Pyro for absorption.",
      members: [
        {
          characterId: "wanderer",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Deals high on-field wind damage and infuses elements.",
          weapons: ["Tulaytullah's Remembrance", "The Widsith"],
          artifacts: ["4pc Desert Pavilion Chronicle"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "faruzan",
          role: "Support",
          roleDesc: "Anemo Support. Shreds Anemo resistance, groups enemies, and buffs Anemo DMG.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Pyro Support. Provides stackable shield and off-field Pyro application.",
          weapons: ["Staff of Homa", "Kitain Cross Spear"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Yelan Quickbloom Team #1",
      rank: "SS",
      description: "An Electro Quickbloom team featuring Cyno as the main driver, Yelan for off-field Hydro, Nahida for Dendro application, and Baizhu for healing and survivability. Quickbloom team leveraging Cyno's Electro application to trigger Hyperbloom from Bloom cores generated by Nahida and Yelan's Hydro.",
      members: [
        {
          characterId: "cyno",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Deals high Electro damage during his Burst and triggers reactions.",
          weapons: ["Staff of the Scarlet Sands", "Ballad of the Fjords"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing, shields, and buffs Dendro reaction damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Yelan National Team #1",
      rank: "SS",
      description: "A powerful variation of the National Team that replaces Xingqiu with Yelan for higher personal damage, while maintaining the core synergy of Raiden Shogun enabling burst spam from Xiangling and Yelan, with Bennett providing ATK buff and healing.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Electro Main DPS. Deals high Electro damage and restores energy for the team.",
          weapons: ["Engulfing Lightning", "Favonius Lance"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Yelan Pure Vaporization Team #3",
      rank: "SS",
      description: "Yelan drives Vaporize with charged attacks, supported by Xiangling's off-field Pyro, Kazuha's Elemental DMG buff, and Bennett's ATK buff. Yelan uses charged attacks to trigger Vaporize consistently, while Xiangling provides Pyro application via her Burst, Kazuha groups enemies and increases team damage, and Bennett heals and buffs ATK.",
      members: [
        {
          characterId: "yelan",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Triggers massive Vaporize damage using Charged Attacks.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Yelan Blooming Team #1",
      rank: "SS",
      description: "This team generates powerful Bountiful Cores from Bloom reactions using Yelan's on-field driver, Nilou's passive, Nahida's Dendro, and Baizhu's healing/shields.",
      members: [
        {
          characterId: "yelan",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Drives reactions on-field with Hydro-infused attacks.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "nilou",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Enables Bountiful Cores and provides off-field Hydro application.",
          weapons: ["Key of Khaj-Nisut", "The Dockhand's Assistant"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["HP%", "Elemental Mastery"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.",
          weapons: ["A Thousand Floating Dreams", "Wandering Evenstar"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "baizhu",
          role: "Support",
          roleDesc: "Dendro Support. Provides healing and shields, and buffs team damage.",
          weapons: ["Jadefall's Splendor", "Prototype Amber"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Ocean-Hued Clam"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yelan Pure Hydro Team #2",
      rank: "SS",
      description: "Yelan Pure Hydro Team (Chuo). Yelan as the main DPS, supported by Furina, Kazuha, and Jean. Yelan's personal damage is amplified by Furina's DMG bonus and Kazuha's elemental damage buff and resistance shred, while Jean provides healing and Viridescent Venerer buff.",
      members: [
        {
          characterId: "yelan",
          role: "Main DPS",
          roleDesc: "Hydro Main DPS. Deals high Hydro damage on-field.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
          weapons: ["Splendor of Tranquil Waters", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
          weapons: ["Freedom-Sworn", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "jean",
          role: "Support",
          roleDesc: "Anemo Support. Instantly heals the entire party and shreds resistances.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["ATK%", "ATK", "Energy Recharge"]
        }
      ]
    }
  ],
  "xiangling": [
    {
      name: "Xiangling Vaporize Team #1",
      rank: "S",
      description: "Xiangling is a Sub DPS. The Vaporize DMG of the team is maintained by Kazuha's bonus, Xiangling and Bennett allow consistent Vaporize triggers. Minimize Vaporize damage using Bennett/C6 bonus, with Xiangling and Bennett enabling consistent Pyro application.",
      members: [
        {
          characterId: "tartaglia",
          role: "Main DPS",
          roleDesc: "Tartaglia is the main DPS, his DMG is amplified by Vaporize.",
          weapons: ["Polar Star", "Rust"],
          artifacts: ["4pc Heart of Depth", "2pc Heart of Depth + 2pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Xiangling's Burst provides huge DMG and continuous Pyro application to trigger vaporize.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, applies Swirl reaction, provides DMG buff, and reduces enemy Pyro resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing to the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Vaporize Team #2",
      rank: "S",
      description: "The Vaporization DMG of whole team is maintained by Kazuha's bonus. Xiangling and Bennett allow triggers for bigger Vaporize all the time. Kokomi on-field triggers Vaporize with Xiangling's Pyro, buffed by Kazuha's DMG bonus and Pyro shield, and Bennett's ATK buff.",
      members: [
        {
          characterId: "kokomi",
          role: "Main DPS",
          roleDesc: "Main DPS, her DMG reacts with Pyro to trigger Vaporize.",
          weapons: ["Everlasting Moonglow", "Prototype Amber"],
          artifacts: ["4pc Ocean-Hued Clam"],
          substats: ["HP%", "Healing Bonus", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS, Burst provides massive Pyro DMG and continuous aura for Vaporize.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Support, groups enemies, provides Elemental Mastery / DMG buff, reduces enemy Pyro/Hydro resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Support, Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Vaporize Team #3",
      rank: "S",
      description: "Xiangling is the Main DPS. The team maximizes Vaporization DMG using Bennett's C6 bonus, Xiangling and Bennett enable consistent Vaporize triggers.",
      members: [
        {
          characterId: "xiangling",
          role: "Main DPS",
          roleDesc: "Xiangling's Burst provides huge DMG, and continuous Pyro application to trigger Vaporize.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Sub DPS, DMG amplified by Vaporize in this team.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige", "2pc Heart of Depth + 2pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Sucrose groups enemies, applies Swirl reaction, provides DMG buff, reduces enemy Pyro resistance.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing to the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Overload Team #1",
      rank: "S",
      description: "A powerful overload team leveraging Electro DMG buffs from Kujou Sara (C6) and Pyro application from Xiangling to trigger Overload. Maintain Electro DMG with Kujou Sara's C6 CRIT DMG buff for Raiden Shogun, while Xiangling provides continuous Pyro attachment to trigger bigger Overload.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS, deals massive Electro DMG and restores energy.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Sub DPS, provides Electro DMG bonus and energy.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS, Burst provides massive Pyro DMG, and distributes Pyro application for Overload and extra target.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Healer/Support, Burst provides massive ATK buff and healing to the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Overload Team #2",
      rank: "S",
      description: "Xiangling is the Sub DPS in the team. Keqing and Beidou deals Electro DMG which reacts with Pyro attachment from Xiangling to trigger Overload. Overload reaction triggered by Keqing/Beidou's Electro and Xiangling's Pyro.",
      members: [
        {
          characterId: "keqing",
          role: "Main DPS",
          roleDesc: "Keqing mainly uses Heavy Attack to deal DMG. Keqing provides Electro attachment to trigger Overload.",
          weapons: ["Mistsplitter Reforged", "The Flute"],
          artifacts: ["2pc Gladiator's Finale + 2pc Shimenawa's Reminiscence"],
          substats: ["HP%", "Energy Recharge", "ATK%", "CRIT DMG"]
        },
        {
          characterId: "beidou",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Deals off-field Electro damage and provides damage reduction.",
          weapons: ["Wolf's Gravestone", "Rainlasher"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Xiangling's Burst provides massive Pyro DMG, and distributes Pyro application for Overload.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides massive ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Pure Pyro Team",
      rank: "S",
      description: "Xiangling is a Sub DPS in the team. The team only plays Pyro DMG. Main focus is on pure Pyro damage, using Klee's raw damage against Pyro affected enemies, with Xiangling providing off-field Pyro application, Kazuha providing Anemo grouping and Pyro damage bonus, and Bennett providing ATK buff and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Main DPS, deals massive Pyro damage on-field.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS, Burst provides huge amount of DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Support, can swirl the team by grouping enemies together, applying Swirl reaction, reduces enemies' resistance and buffs Pyro DMG of members.",
          weapons: ["Favonius Sword", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Healer/Support, has Elemental Burst provides massive ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xiangling Melting Team #1",
      rank: "S",
      description: "Xiangling is a Sub DPS in the team. Ganyu provides elemental Cryo damage. Cryo element attachments to trigger Melt which maximizes Ganyu's damage.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Ganyu's Charged Attack can trigger the Melt reaction.",
          weapons: ["Amos' Bow", "Hamayumi"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Xiangling's Burst provides huge amount of DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides massive ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Zhongli's shield provides safe environment for team members, and decrease 20% of whole enemy's resistance.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Raiden Overload Vaporize",
      rank: "SS",
      description: "An SS tier team using Raiden Shogun's Energy restoration and Burst damage amplification, Xiangling and Xingqiu provide continuous off-field Pyro and Hydro for Overload and Electro-Charged, while Bennett buffs and heals.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS, deals massive Electro DMG and restores energy.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Sub DPS, Burst provides continuous Hydro application for Vaporize and Electro-Charged.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige", "2pc Heart of Depth + 2pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS, Burst provides continuous Pyro application for Vaporize, Overload, and Electro-Charged.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Support, Burst provides massive ATK buff and healing to the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "amber": [
    {
      name: "Amber Vaporize Team",
      rank: "S",
      description: "The DMG of Amber is maximized by Vaporization. Maximize Amber's damage through Vaporize reactions by using Xingqiu's Hydro application, Kazuha's buffing and resistance shred, and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "amber",
          role: "Main DPS",
          roleDesc: "Amber is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst can attach Hydro element to enemies continuously, and so react with Amber's Pyro DMG to trigger Vaporization.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha can assist the team by grouping enemies together, applying Swirl control, provide DMG buff to teammates, and reduce Elemental Resistance of enemies.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Vaporize Amber",
      rank: "S",
      description: "Amber's damage is maximized by Vaporize, utilizing Xingqiu's consistent Hydro application and Kazuha's support, with Bennett providing ATK buff and healing. Amber's charged attacks trigger Vaporize with Xingqiu's Hydro application, while Kazuha provides grouping and damage buffs, and Bennett heals and boosts ATK.",
      members: [
        {
          characterId: "amber",
          role: "Main DPS",
          roleDesc: "Amber deals damage with Charged Attack to trigger Vaporize.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst applies Hydro continuously to enable Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies and provides Elemental Mastery buff and Anemo RES shred.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Elemental Burst provides ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Amber Melt Team",
      rank: "S",
      description: "The DMG of Ayaka is maximized by Melt. Maximize Ayaka's Melt damage by applying Pyro with Amber and Bennett while Zhongli provides shielding and ATK buffs.",
      members: [
        {
          characterId: "ayaka",
          role: "Main DPS",
          roleDesc: "Deals DMG by her Burst, and her Cryo DMG reacts with Pyro attachment from Amber's Skill to trigger Melt.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "amber",
          role: "Sub DPS",
          roleDesc: "Works with Ayaka to trigger Melt by her Skill.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides shield for safe environment and increases ATK of whole team using full set of Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "His Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Ayaka Melt",
      rank: "S",
      description: "The DMG of Ayaka is maximized by Melting. Ayaka's Cryo DMG reacts with Pyro from Amber's Skill to trigger Melt, while Zhongli provides shield and ATK buff, and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "ayaka",
          role: "Main DPS",
          roleDesc: "Ayaka deals DMG by her Burst, and her Cryo DMG reacts with Pyro attachment from Amber's Skill to trigger Melting.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "amber",
          role: "Sub DPS",
          roleDesc: "Amber is the Sub DPS, which works with Ayaka to trigger Melting.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Zhongli's shield provides safe environment for team members, and increases ATK of whole team by using full set of Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Amber Overload Team #1",
      rank: "S",
      description: "Amber's Pyro attachment reacts with Electro attachment from Raiden Shogun to trigger frequent Overload.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Raiden Shogun is the main DPS. The DMG of Elemental Burst depends on the energy consumed by team members using their Elemental Burst.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "amber",
          role: "Sub DPS",
          roleDesc: "Amber is the Sub DPS, which works with Raiden Shogun to trigger Overload.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha can assist the team by grouping enemies together, applying Swirl control, provide DMG buff to teammates, and reduce Elemental Resistance of enemies.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Raiden Overload",
      rank: "S",
      description: "The team triggers frequent Overload reactions between Raiden Shogun's Electro and Amber's Pyro. Kazuha groups enemies and buffs damage, while Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Raiden Shogun deals Burst damage scaling with team's energy consumption.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "amber",
          role: "Sub DPS",
          roleDesc: "Amber is the Sub DPS, works with Raiden Shogun to trigger Overload.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, applies swirled control, buffs team DMG, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett provides huge ATK and healing via Burst.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Amber's Reaction Overload",
      rank: "S",
      description: "Amber's Pyro triggers Overload with Fischl's Electro and Vaporization with Xingqiu's Hydro. Combines Pyro reactions: Overload from Amber and Fischl, and Vaporization from Amber and Xingqiu, supported by Bennett.",
      members: [
        {
          characterId: "amber",
          role: "Main DPS",
          roleDesc: "Main DPS triggering Overload with Fischl and Vaporization with Xingqiu.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Provides continuous Hydro application via Burst to enable Vaporization.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Off-field Electro via Skill for Overload. Oz provides a significant upgrade.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing via Burst.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "diluc": [
    {
      name: "Diluc Vaporize Team #1",
      rank: "S",
      description: "Diluc's Pyro DMG is amplified by Vaporization reactions triggered by Xingqiu's continuous Hydro application, supported by Kazuha's elemental damage buff and resistance shred, and Zhongli's shielding and ATK buff.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc's DMG is amplified by Vaporization.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst attaches Hydro continuously, enabling Vaporization with Diluc's Pyro.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a strong shield and increases team ATK with Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Vaporize Team #2",
      rank: "S",
      description: "Diluc's Pyro DMG is amplified by Vaporization triggered by Xingqiu's Hydro application. Venti groups enemies and spreads Hydro, while Zhongli provides shields and ATK buff via Tenacity of the Millelith.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc's DMG is amplified by Vaporization.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporization with Diluc.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "venti",
          role: "Sub DPS",
          roleDesc: "Elemental Burst groups enemies and spreads Hydro from Xingqiu.",
          weapons: ["Elegy for the End", "The Stringless"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield provides safety and ATK buff via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Vaporize Team #3",
      rank: "S",
      description: "Diluc is a Main DPS in the team. Diluc's DMG is amplified by Vaporization. Use Hydro from Xingqiu to enable Vaporize for Diluc. Albedo and Zhongli provide Geo resonance and shielding.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc's DMG is amplified by Vaporization.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst continuously applies Hydro to trigger Vaporization with Diluc.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Albedo pairs with Zhongli for Geo resonance. With Archaic Petra, picking up a crystallize shard boosts team's Pyro DMG.",
          weapons: ["Cinnabar Spindle", "Harbinger of Dawn"],
          artifacts: ["2pc Archaic Petra"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge", "DEF"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Zhongli's shield provides a safe environment and, with Tenacity of the Millelith, increases team ATK.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Vaporize Plunge",
      rank: "S",
      description: "A team that amplifies Diluc's plunging attacks with Xianyun, enabling consistent Vaporize reactions and high damage. Furina provides massive DMG bonuses via HP fluctuation, while Bennett supplies healing and ATK buffs.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc is the main DPS, his DMG is amplified by the Plunging Attack in this team.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Furina's Burst provides DMG increase based on HP changes of allies. Her Skill drains allies' HP, which is restored by the healer.",
          weapons: ["Splendor of Tranquil Waters", "Fleuve Cendre Ferryman"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Xianyun provides healing to team members and boosts Diluc's Plunging Attack damage.",
          weapons: ["Crane's Echoing Call", "Oathsworn Eye"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing to other members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Vaporize Team",
      rank: "S",
      description: "Diluc's DMG is amplified by Vaporization with Xingqiu's Hydro application, Sucrose provides Elemental Mastery buff, and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "DMG amplified by Vaporization.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Sub DPS",
          roleDesc: "Provides Elemental Mastery bonus to increase Vaporize DMG.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Elemental Burst provides huge ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Melt Team",
      rank: "S",
      description: "Diluc's damage is amplified by Melt reactions, with Ganyu providing off-field Cryo, Kazuha buffing and grouping, and Diona shielding and healing.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc's DMG is amplified by Melting.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Ganyu deals DMG mainly by Elemental Burst at backstage. Ganyu Cryo attachment reacts with Pyro attachment from Diluc to trigger Melt.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["2pc Blizzard Strayer", "2pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha can assist the team by grouping enemies together, applying crowd control, provide DMG buff to teammates and reduce Elemental Resistance of enemies.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Diona's shield provides safe environment for team members, and helps boost the recharge of Ganyu's Elemental Burst.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Maiden Beloved"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Diluc Melt Team #2",
      rank: "S",
      description: "Diluc is the main DPS, his DMG amplified by Melt. Ayaka provides off-field Cryo via Burst for consistent melts. Sucrose boosts team Elemental Mastery and shreds resistance. Diona shields, heals, and helps battery Ayaka.",
      members: [
        {
          characterId: "diluc",
          role: "Main DPS",
          roleDesc: "Diluc's DMG is amplified by Melt in this team.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ayaka",
          role: "Sub DPS",
          roleDesc: "Ayaka deals DMG mainly by Elemental Burst at backstage. Her Cryo attachment reacts with Pyro from Diluc to trigger Melt.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["2pc Blizzard Strayer", "2pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Sub DPS",
          roleDesc: "Sucrose provides Elemental Mastery bonus to team members, increasing the DMG of Melt.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Diona's shield provides a safe environment for team members and helps boost the recharge of Ayaka's Elemental Burst.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Maiden Beloved"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "klee": [
    {
      name: "Klee Vaporize Team",
      rank: "S",
      description: "A powerful Vaporize team built around Klee as the on-field Pyro Main DPS, with Xilonen providing consistent Hydro application and damage buffs, Furina applying off-field Hydro, and Bennett reducing enemy RES and sustaining the team.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, which triggers Vaporize with Furina's Hydro.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Provides elemental resistance shred and heals allies, while triggering Crystallize for Scroll set buffs.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro application and buffs the entire team's DMG through HP fluctuation.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a massive ATK buff and healing, and triggers Pyro resonance.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Vaporization Team #2",
      rank: "S",
      description: "Klee is a Main DPS in the team. Klee applies Pyro while Furina provides continuous Hydro application for Vaporize reactions. Kazuha enhances damage with swirled control, while Bennett provides healing and ATK buffs.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, triggering Vaporize with Furina's Hydro.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, swirls Pyro and Hydro for resistance shred and damage buffs.",
          weapons: ["Freedom-Sworn", "Xiphos' Moonlight"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing, triggering Pyro resonance.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Pyro-Overload",
      rank: "S",
      description: "A high damage Pyro team revolving around Klee's explosion attacks, supported by Xilonen's RES shred, Durin's off-field Pyro and RES reduction, and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's normal attacks, charged attacks, and Elemental Skill apply Pyro, which triggers Pyro reactions.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Provides elemental resistance shred and heals teammates.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Durin gains [Confirmation of Purity] or [Beacon of Rustication] via Skill and triggering Burn. The former provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
          weapons: ["Alatus Alva", "Wolf-Fang"],
          artifacts: ["2pc Noblesse Oblige", "2pc Flower of Paradise Lost"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Hazard Team",
      rank: "S",
      description: "A team leveraging the powerful synergy between Klee, Albedo, and Durin for enhanced damage and support. Bennett provides ATK buffs and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Pyro reactions.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Provides off-field Geo damage and Geo resonance, while boosting team's Elemental Mastery.",
          weapons: ["Uraku Misugiri", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "DEF"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
          weapons: ["Alatus Alva", "Wolf-Fang"],
          artifacts: ["2pc Noblesse Oblige", "2pc Flower of Paradise Lost"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Overload Team #1",
      rank: "S",
      description: "An explosive Overload team featuring Klee as the primary damage dealer, Fischl providing consistent Electro application, Durin for off-field Pyro and shred, and Bennett for ATK buffs and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Deals Pyro damage to trigger Overload with Fischl's Electro.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Provides off-field Electro damage via Oz to trigger Overload.",
          weapons: ["Aqua Simulacra", "Sacrificial Bow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
          weapons: ["Alatus Alva", "Wolf-Fang"],
          artifacts: ["2pc Noblesse Oblige", "2pc Flower of Paradise Lost"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Overload #2",
      rank: "S",
      description: "An overload team that maximizes Klee's Pyro damage with Chevreuse's RES shred and ATK buff, Fischl's off-field Electro, and Durin's support.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Deals Pyro damage to trigger Overload with Fischl.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Provides off-field Electro damage via Oz.",
          weapons: ["Aqua Simulacra", "Sacrificial Bow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
          weapons: ["Alatus Alva", "Wolf-Fang"],
          artifacts: ["2pc Noblesse Oblige", "2pc Flower of Paradise Lost"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Provides healing and buffs team ATK and Electro/Pyro shred when Overload is triggered.",
          weapons: ["Sumpwood of Songs", "Favonius Lance"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "CRIT Rate", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Klee Vaporization Team #3",
      rank: "S",
      description: "Klee Vaporization team with Citlali shield and Furina Hydro. Klee triggers Vaporize with Furina's off-field Hydro application, while Citlali shields and applies Cryo, and Bennett buffs ATK and heals.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's Pyro attacks trigger Vaporize with Furina's Hydro.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Provides shield and off-field Cryo application.",
          weapons: ["Starcaller's Watch", "Prototype Amber"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Vaporization Team #4",
      rank: "S",
      description: "This team features Melt reactions with Klee's Pyro and Citlali's Cryo, while Xilonen provides RES shred and Bennett provides ATK buff.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Deals Pyro damage to trigger Melt with Citlali's Cryo.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Provides off-field Cryo application and shield.",
          weapons: ["Starcaller's Watch", "Prototype Amber"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Provides elemental resistance shred and healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "The Alley Flash"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Klee Plunge Attack Team #1",
      rank: "S",
      description: "A plunge attack team focused on Klee's plunging attacks, supported by Furina's Hydro application and damage buff, Citlali's shield and off-field Cryo, and Xianyun's plunge attack buff and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Vaporize with Furina's Hydro.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Provides off-field Cryo application and shield.",
          weapons: ["Starcaller's Watch", "Prototype Amber"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "furina",
          role: "Sub DPS",
          roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
          weapons: ["Splendor of Tranquil Waters", "Favonius Sword"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Provides healing to team members and enables plunging attacks.",
          weapons: ["Crane's Echoing Call", "Favonius Codex"],
          artifacts: ["2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence"],
          substats: ["Energy Recharge", "ATK%"]
        }
      ]
    },
    {
      name: "Klee Plunge Attack Team #2",
      rank: "S",
      description: "A plunge attack team centered on Klee's enhanced plunges with support from Citlali, Xilonen, and Xianyun.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee's plunging attacks trigger Melt with Citlali's Cryo.",
          weapons: ["Cashflow Supervision", "The Widsith"],
          artifacts: ["4pc Marechaussee Hunter"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "citlali",
          role: "Support",
          roleDesc: "Provides off-field Cryo application and shield.",
          weapons: ["Starcaller's Watch", "Prototype Amber"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Elemental Mastery", "Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "xilonen",
          role: "Support",
          roleDesc: "Provides elemental resistance shred and healing.",
          weapons: ["Peak Patrol Song", "Favonius Sword"],
          artifacts: ["4pc Scroll of the Hero of Cinder City"],
          substats: ["CRIT DMG", "CRIT Rate", "DEF%", "Energy Recharge"]
        },
        {
          characterId: "xianyun",
          role: "Support",
          roleDesc: "Provides healing and enables plunging attacks.",
          weapons: ["Crane's Echoing Call", "Favonius Codex"],
          artifacts: ["2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence"],
          substats: ["Energy Recharge", "ATK%"]
        }
      ]
    }
  ],
  "bennett": [
    {
      name: "Bennett Vaporize Team #1",
      rank: "S",
      description: "Bennett provides huge ATK buff and healing, while Tartaglia's DMG is amplified by Vaporize. Tartaglia triggers Vaporize with Xiangling's Burst, while Kazuha provides crowd control and elemental damage bonus, and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "tartaglia",
          role: "Main DPS",
          roleDesc: "Main DPS, DMG amplified by Vaporize.",
          weapons: ["Polar Star", "Rust"],
          artifacts: ["4pc Heart of Depth"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Elemental Burst provides huge DMG and continuous Pyro for Vaporize.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, reduces enemy Element RES, buffs team DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Elemental Burst provides huge ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Thunder Team",
      rank: "S",
      description: "Bennett's Burst provides huge ATK buff and healing. Raiden Shogun's Burst DMG is maximized by Kujou Sara (C6)'s Electro CRIT DMG, Kazuha, and Bennett's ATK buff and resistance reduction.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "The main DPS. Boosts teammates' Energy Recharge with Burst and triggers Overload with Bennett.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kujou-sara",
          role: "Sub DPS",
          roleDesc: "Provides ATK buff to teammates. Her Burst boosts damage and Elemental Mastery.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, applies crowd control, provides DMG buff, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a massive ATK buff and healing to allies.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Vaporize Team #2",
      rank: "S",
      description: "Bennett provides huge ATK buff and healing, while Yoimiya triggers Vaporize with Xingqiu's Hydro application, and Kazuha groups enemies and buffs damage.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Yoimiya is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Xingqiu's Elemental Burst attaches Hydro element to enemies continuously, reacting with Yoimiya's Pyro DMG to trigger Vaporization.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides a huge ATK buff and heals team members.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Pure Pyro",
      rank: "S",
      description: "A powerful mono-element Pyro team that maximizes Klee and Xiangling's damage with Kazuha's crowd control support and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee is the main DPS, her DMG is amplified by Pyro in this team.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Provides a large amount of off-field Pyro DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides huge ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Vaporize Team #3",
      rank: "S",
      description: "Klee team focusing on Vaporize between Klee and Xingqiu, with Sucrose boosting Elemental Mastery and Bennett providing ATK buffs and healing.",
      members: [
        {
          characterId: "klee",
          role: "Main DPS",
          roleDesc: "Klee is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Lavawalker"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporize with Klee.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["2pc Noblesse Oblige", "2pc Heart of Depth"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery bonus to increase Vaporize DMG.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Superconduct Team",
      rank: "S",
      description: "A team focused on maximizing Eula's Burst damage via Superconduct, ATK buff from Bennett, and Diona's Cryo battery.",
      members: [
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Eula is the main DPS, her physical DMG is amplified by Superconduct.",
          weapons: ["Song of Broken Pines", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Electro damage via Oz.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Diona's shield provides safe environment for team members, and acts as a battery for Eula.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Maiden Beloved"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Hu Tao Vaporize with Bennett",
      rank: "S",
      description: "A powerful Vaporize team featuring Hu Tao as main DPS, with Xingqiu providing consistent Hydro application, Sucrose buffing Elemental Mastery, and Bennett providing ATK buff and healing.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["2pc Noblesse Oblige", "2pc Heart of Depth"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Bennett Vaporize Team",
      rank: "S",
      description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Yanfei is the main DPS, her DMG is amplified by Vaporization in this team.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["2pc Noblesse Oblige", "2pc Heart of Depth"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "yanfei": [
    {
      name: "Yanfei Vaporize & Burgeon",
      rank: "S",
      description: "Yanfei drives Vaporize and Burgeon reactions with Yelan's off-field Hydro and Nahida's Dendro application, while Zhongli provides shielding and ATK buff.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS driving Vaporize and Burgeon.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Applies Hydro off-field and increases on-field character's damage.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Applies Dendro continuously and shares Elemental Mastery.",
          weapons: ["A Thousand Floating Dreams", "Sacrificial Fragments"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a strong shield, shred resistance, and buffs ATK via Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Vaporize",
      rank: "S",
      description: "Yanfei's Pyro damage is amplified by Vaporize reactions enabled by Xingqiu's consistent off-field Hydro application, while Kazuha provides crowd control and Elemental DMG buffs, and Zhongli shields and buffs ATK.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS triggering Vaporize on Hydro-affected enemies.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Applies Hydro continuously with his Raincutter Burst.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, decreases Pyro resistance, and buffs Elemental DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides shield and buffs team ATK with Tenacity of the Millelith.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Vaporize Team #2",
      rank: "A",
      description: "A team focuses on triggering Vaporize with Yanfei as the main DPS, supported by Xingqiu's Hydro application, Venti's crowd control, and Zhongli's shielding. Use Xingqiu's Burst to apply Hydro, then trigger Vaporize with Yanfei's charged attacks. Venti groups enemies and spreads Hydro/Pyro, while Zhongli shields and buffs ATK.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Triggers Vaporize with charged attacks.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Enables Vaporize with off-field Hydro attacks.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "venti",
          role: "Support",
          roleDesc: "Provides crowd control, groups enemies, and shreds elemental resistance.",
          weapons: ["Elegy for the End", "The Stringless"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shields and buffs team ATK.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Vaporize Team #3",
      rank: "A",
      description: "A Vaporize team centered on Yanfei's Pyro damage, supported by Xingqiu's Hydro application, and Geo resonance from Albedo and Zhongli. Yanfei's Pyro DMG is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Albedo and Zhongli provide Geo resonance and shield, while Albedo can boost DMG with Archaic Petra.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Off-field Hydro support.",
          weapons: ["Primordial Jade Cutter", "Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "albedo",
          role: "Sub DPS",
          roleDesc: "Geo resonance and off-field DMG support.",
          weapons: ["Cinnabar Spindle", "Harbinger of Dawn"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["DEF%", "CRIT DMG", "CRIT Rate", "Energy Recharge", "DEF"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield and Geo resonance support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Vaporize Team #4",
      rank: "A",
      description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main DPS triggering Vaporize.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Vaporize Team #5",
      rank: "A",
      description: "Focuses on Yanfei as main DPS triggering Vaporize reactions, with Xiangling providing off-field Pyro application, Kazuha for grouping, elemental buff/shred, and Bennett for ATK buff and healing.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main DPS driving the Pyro attacks.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Provides off-field Pyro damage and resonance.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies and boosts Elemental DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK buff and healing support.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Melt Team #1",
      rank: "A",
      description: "Yanfei serves as the primary DPS, with her damage amplified by Melt reactions. Trigger Melt on enemies affected by Ganyu's Burst and skill application, while Kazuha provides grouping and elemental shred, and Diona offers shielding and energy for Ganyu.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main DPS triggering Melt reactions.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Applies Cryo consistently off-field via Burst.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides Anemo Swirl to reduce Cryo resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Provides shields, healing, and acts as a battery for Ganyu.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yanfei Melt Team #2",
      rank: "A",
      description: "A Melt team where Yanfei serves as the on-field driver, triggering Melt reactions with off-field Cryo application from Ayaka and Diona. Yanfei triggers Melt reactions by applying Pyro to enemies affected by Cryo from Ayaka's Burst and Diona's Skill/Burst. Sucrose buffs Elemental Mastery and reduces Cryo resistance with Viridescent Venerer.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "On-field driver triggering Melt.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "ayaka",
          role: "Sub DPS",
          roleDesc: "Provides powerful off-field Cryo application via Burst.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["4pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery buffs and groups enemies.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Shield and healing support.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "yoimiya": [
    {
      name: "Yoimiya Vaporize Team #1",
      rank: "SS",
      description: "Yoimiya is the main DPS, her DMG is amplified by Vaporization in this team. Yoimiya's Pyro damage is boosted by Vaporization reactions enabled by Xingqiu's Hydro application, while Yun Jin increases her Normal Attacks and Zhongli provides shielding and team ATK buff.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Main DPS driving the single-target Pyro damage.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Provides off-field Hydro application to enable Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yunjin",
          role: "Support",
          roleDesc: "Provides significant Normal Attack DMG and Speed buffs.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides a safe environment with shield and team ATK buff.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Vaporize Team #2",
      rank: "S",
      description: "The Normal/ATK DMG Output of Ayato and Yoimiya is maximized by Vaporize and Melt, while Yun Jin + Zhongli provides a safe environment and ATK increase through Tenacity of the Millelith. Maximizes Normal/ATK DMG of both Ayato and Yoimiya through Vaporize and Melt, with Yun Jin + Zhongli providing shield and ATK buff.",
      members: [
        {
          characterId: "ayato",
          role: "Main DPS",
          roleDesc: "Enables Vaporize and handles multi-target scenarios with his Hydro attacks.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Echoes of an Offering"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Pyro Main DPS, triggers Vaporize with her Normal Attacks.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yunjin",
          role: "Support",
          roleDesc: "Buffs Normal Attack DMG for both Ayato and Yoimiya.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Provides shields and buffs team ATK.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Vaporize Team #3",
      rank: "SS",
      description: "Yoimiya's Normal ATK DMG is maximized by Vaporization and ATK/SPD buff from Yun Jin.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS triggering Vaporize.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Off-field Hydro application and active character damage buff.",
          weapons: ["Aqua Simulacra", "The Stringless"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yunjin",
          role: "Support",
          roleDesc: "Buffs Normal Attack speed and damage.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Shield and team ATK buff support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Melt Team #1",
      rank: "S",
      description: "An Melt team that maximizes Yoimiya's damage through Melt reactions. Ganyu's Burst applies Cryo consistently, while Kazuha provides Elemental DMG Bonus, and resistance shred. Diona offers shielding and healing for safety. Utilize Ganyu's Elemental Burst to apply Cryo while Yoimiya triggers Melt with her Normal Attacks. Kazuha enhances team damage and controls enemies, while Diona provides support.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Triggers Melt with her Normal Attacks.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Applies Cryo consistently off-field via Burst.",
          weapons: ["Amos' Bow", "The Stringless"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Reduces Cryo and Pyro resistance, buffs Elemental DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "diona",
          role: "Support",
          roleDesc: "Shielding, healing, and battery support for Ganyu.",
          weapons: ["Sacrificial Bow", "Favonius Warbow"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Overload Team #1",
      rank: "S",
      description: "Yoimiya's on-field Pyro attacks trigger Overload reactions with Raiden Shogun's off-field Electro application. Kazuha provides crowd control and buffs, while Bennett heals and boosts ATK. Yoimiya's damage is boosted by Overload reactions enabled by Raiden Shogun's Skill, while Kazuha provides crowd control and buffs, and Bennett heals and boosts ATK.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Off-field Electro application and burst support.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Energy Recharge", "Elemental Mastery", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, decreases resistances, and buffs DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK Buff and healing support.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Melt Team #2",
      rank: "A",
      description: "A team focused on triggering Melt reactions with Yoimiya's powerful Normal Attacks. Maximize Yoimiya's damage by hitting Pyro attacks with Cryo application from Ganyu's Burst, with Venti grouping and Bennett buffing. Yoimiya is the main DPS, her DMG is amplified by Melt in this team.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Pyro main DPS triggering Melt.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "ganyu",
          role: "Sub DPS",
          roleDesc: "Constant off-field Cryo application with Burst.",
          weapons: ["Amos' Bow", "The Stringless"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "venti",
          role: "Support",
          roleDesc: "Groups enemies and spreads Cryo.",
          weapons: ["Skyward Harp", "Elegy for the End"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Overload Team #2",
      rank: "A",
      description: "Yoimiya rapid-fire Pyro attacks trigger Overload with Fischl's off-field Electro application, while Yun Jin and Zhongli provide buffs and protection. Yoimiya's Pyro attacks trigger Overload with Fischl's off-field Electro, while Yun Jin and Zhongli shield and buff.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS triggering Overload.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Off-field Electro application via Oz.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yunjin",
          role: "Support",
          roleDesc: "Normal Attack DMG and Speed buffs.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Husk of Opulent Dreams"],
          substats: ["DEF%", "DEF", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "zhongli",
          role: "Support",
          roleDesc: "Strong shield and ATK buffs.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Yoimiya Overload Team #3",
      rank: "S",
      description: "Frequent Overload reactions, amplified by Chevreuse's resistance shred and ATK buff, with Bennett support. Utilize Chevreuse's passive to reduce Pyro and Electro RES after Overload, while her Skill provides an ATK buff. Yoimiya's on-field Pyro attacks combine with Raiden Shogun's off-field Electro to trigger constant Overload.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "On-field driver triggering Overload.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Shreds Pyro/Electro resistance and buffs team ATK upon Overload.",
          weapons: ["Favonius Lance", "Black Tassel"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Constant off-field Electro application with her Skill.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "ATK buff and healing support.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "xinyan": [
    {
      name: "Xinyan Physical Team #1",
      rank: "A",
      description: "A physical team centered on Eula, with Cryo and Electro reactions to reduce physical resistance via Superconduct. Maximize Eula's physical damage by using Superconduct to reduce enemy physical resistance, while Xinyan provides shielding and Bennett provides ATK buff and healing.",
      members: [
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Eula's physical damage is boosted by Superconduct.",
          weapons: ["Skyward Pride", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "beidou",
          role: "Sub DPS",
          roleDesc: "Beidou's Burst provides continuous Electro DMG off-field to trigger Superconduct.",
          weapons: ["Skyward Pride", "Serpent Spine"],
          artifacts: ["2pc Thundering Fury", "2pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xinyan",
          role: "Support",
          roleDesc: "Xinyan's shield provides a safe environment for team members.",
          weapons: ["Wolf's Gravestone", "Whiteblind"],
          artifacts: ["2pc Crimson Witch of Flames", "2pc Retracing Bolide"],
          substats: ["Energy Recharge", "DEF%", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides huge ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xinyan Physical Team #2",
      rank: "A",
      description: "A physical team centered around Razor with Electro and Cryo for Superconduct. Xinyan provides shields, Qiqi heals and applies Cryo, and Bennett buffs ATK and heals. Razor's physical damage is maximized by triggering Superconduct to reduce enemy physical resistance. Xinyan provides a shield for safety, Qiqi applies Cryo off-field, and Bennett enhances ATK and healing.",
      members: [
        {
          characterId: "razor",
          role: "Main DPS",
          roleDesc: "Main physical DPS, C4 reduces enemy DEF with Elemental Skill.",
          weapons: ["Wolf's Gravestone", "Prototype Archaic"],
          artifacts: ["4pc Gladiator's Finale"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xinyan",
          role: "Support",
          roleDesc: "Provides a shield for safe play.",
          weapons: ["Wolf's Gravestone", "Whiteblind"],
          artifacts: ["2pc Crimson Witch of Flames", "2pc Retracing Bolide"],
          substats: ["Energy Recharge", "DEF%", "CRIT DMG", "CRIT Rate"]
        },
        {
          characterId: "qiqi",
          role: "Support",
          roleDesc: "Elemental Skill applies Cryo continuously and heals the team.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Maiden Beloved"],
          substats: ["ATK%", "Energy Recharge", "HP%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Elemental Burst provides a large ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Xinyan Overload",
      rank: "A",
      description: "Xinyan's Pyro attacks combine with Electro from Fischl to trigger frequent Overload reactions, dealing AoE Pyro DMG. Kazuha provides Anemo grouping and resistance shred, while Bennett offers ATK buffs and healing.",
      members: [
        {
          characterId: "xinyan",
          role: "Main DPS",
          roleDesc: "Xinyan's Skill reduces enemy DEF and provides a shield to boost DPS. Build with DEF% or ATK% to maximize shield strength and damage.",
          weapons: ["Wolf's Gravestone", "Whiteblind"],
          artifacts: ["4pc Retracing Bolide"],
          substats: ["DEF%", "ATK%", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Fischl's Skill provides continuous off-field Electro application to trigger Overload, significantly boosts damage.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, provides Anemo crowd control, DMG buffs, and reduces enemy Pyro and Electro resistance with Swirl.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Burst provides massive ATK buff and healing, enabling the team to deal more damage and survive.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "thoma": [
    {
      name: "Thoma Burgeon Team #1",
      rank: "S",
      description: "Thoma provides shield and triggers Burgeon with his Burst. Hydro from Ayato and Yelan combine with Dendro from Nahida to generate Dendro Cores, then Thoma's Pyro triggers Burgeon for massive AoE damage. Use Hydro from Ayato and Yelan with Dendro from Nahida to produce Dendro Cores, then Thoma's Pyro application via Burst triggers Burgeon for massive AoE damage.",
      members: [
        {
          characterId: "ayato",
          role: "Main DPS",
          roleDesc: "With Thoma's shield in place, Ayato's Normal Attacks deal off-field Hydro/Pyro DMG and activate cores to trigger Burgeon.",
          weapons: ["Haran Geppaku Futsu", "The Black Sword"],
          artifacts: ["4pc Heart of Depth"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Provides continuous off-field Hydro attacks that react with Dendro to create Cores.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "nahida",
          role: "Sub DPS",
          roleDesc: "Sustains off-field Dendro DMG on targets up to 8 enemies and triggers reactions. Burst buffers EM based on team diversity.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Provides shield for safety, triggers Burgeon with his Burst.",
          weapons: ["Calamity Queller", "Kitain Cross Spear"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        }
      ]
    },
    {
      name: "Thoma Burgeon Team #2",
      rank: "S",
      description: "Thoma is the Support, Dendro from Nahida reacts with Hydro from Xingqiu and Yelan to trigger Bloom, then Thoma's Pyro triggers Burgeon. Generate Dendro cores with Nahida's Dendro and Hydro from Xingqiu/Yelan, then trigger Burgeon with Thoma's Pyro.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Nahida mainly drives DMG, uses Elemental Skill linking up to 8 enemies, sharing EM under triggering reactions. Shares EM and infuses Dendro.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Raincutter continuously applies Hydro to enemies, reacting with Dendro to trigger Bloom.",
          weapons: ["Sapwood Blade"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "yelan",
          role: "Sub DPS",
          roleDesc: "Yelan provides continuous off-field Hydro attacks.",
          weapons: ["Aqua Simulacra", "Favonius Warbow"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["HP%", "Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Triggers Burgeon safety via Burst, EM scaling Burgeon DMG. Shield durability scales with HP.",
          weapons: ["Favonius Lance"],
          artifacts: ["4pc Flower of Paradise Lost"],
          substats: ["Energy Recharge", "Elemental Mastery", "HP%"]
        }
      ]
    },
    {
      name: "Thoma Vaporize Team",
      rank: "S",
      description: "Thoma's shield provides survivability for Hu Tao, while Xingqiu applies Hydro for Hu Tao's Vaporize. Kazuha provides grouping, DMG buff, and resistance shred. Thoma's shield provides survivability for Hu Tao to trigger Vaporize.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Hu Tao is the main DPS, her DMG is amplified by Vaporize.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Raincutter applies Hydro continuously.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Provides crowd control, groups enemies, and buffs DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Provides shield for safety, HP scaling shield strength.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Thoma Vaporize Melt Team",
      rank: "S",
      description: "Thoma is the Support in the team, Thoma's Skill and Burst are maintained by stacking Max HP, helping Hu Tao maximize her survivability. Hu Tao triggers Vaporize with Xingqiu's Hydro application, while Chongyun provides occasional Melt reactions. Thoma's shield enables Hu Tao to play aggressively.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Pyro main DPS, triggers reactions.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Hydro sub DPS.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chongyun",
          role: "Sub DPS",
          roleDesc: "Provides occasional Melt opportunities via Cryo fields.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["2pc Noblesse Oblige", "2pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Shield support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Thoma Vaporize Team #2",
      rank: "A",
      description: "A Hu Tao Vaporize team with Thoma providing shields, Bennett for ATK buff and healing, and Xingqiu for Hydro application. Thoma shields Hu Tao for survivability, Bennett provides ATK buff and healing, Xingqiu applies Hydro for Hu Tao's Vaporize reactions.",
      members: [
        {
          characterId: "hu-tao",
          role: "Main DPS",
          roleDesc: "Pyro main DPS.",
          weapons: ["Staff of Homa", "Deathmatch"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT DMG", "CRIT Rate", "HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Hydro sub DPS.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Provides ATK buff and healing.",
          weapons: ["Skyward Blade", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["HP%", "HP", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Shield support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Thoma Superconduct Team #1",
      rank: "A",
      description: "Eula's Burst is the main damage source, boosted by Superconduct, Raiden Shogun's Skill, and Tenacity of the Millelith. Thoma's shield ensures safe execution. Trigger Superconduct to reduce Physical RES for Eula's physical damage. Raiden provides energy and Burst DMG boost. Thoma shields the team.",
      members: [
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Eula's physical damage is boosted by Superconduct.",
          weapons: ["Song of Broken Pines", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Provides Electro for Superconduct, boosts energy and Burst DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"]
        },
        {
          characterId: "rosaria",
          role: "Sub DPS",
          roleDesc: "Cryo Sub DPS, acts as battery and buffs CRIT Rate.",
          weapons: ["Skyward Spine", "Favonius Lance"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Shield support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Thoma Superconduct Team #2",
      rank: "A",
      description: "A team centered around Eula's physical damage, boosted by Superconduct, Thoma's shield and Tenacity of the Millelith buff. Trigger Superconduct to reduce Physical RES, amplifying Eula's Physical Burst. Thoma provides shields and ATK buff via Tenacity of the Millelith.",
      members: [
        {
          characterId: "eula",
          role: "Main DPS",
          roleDesc: "Eula is the main physical DPS.",
          weapons: ["Song of Broken Pines", "Serpent Spine"],
          artifacts: ["4pc Pale Flame"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "fischl",
          role: "Sub DPS",
          roleDesc: "Provides off-field Electro application to trigger Superconduct.",
          weapons: ["Skyward Harp", "The Stringless"],
          artifacts: ["4pc Thundering Fury"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "chongyun",
          role: "Sub DPS",
          roleDesc: "Acts as Cryo battery and speed buff support.",
          weapons: ["Wolf's Gravestone", "Serpent Spine"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Shield support.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Crimson Vaporize Shield",
      rank: "S",
      description: "A Vaporize team featuring Yanfei as main DPS, Xingqiu applying Hydro, Sucrose boosting Elemental Mastery, and Thoma providing shields. Yanfei triggers Vaporize on enemies affected by Hydro from Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Thoma provides a shield for protection.",
      members: [
        {
          characterId: "yanfei",
          role: "Main DPS",
          roleDesc: "Main Pyro DPS.",
          weapons: ["Lost Prayer to the Sacred Winds", "The Widsith"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "Applies Hydro off-field to trigger Vaporize.",
          weapons: ["Sacrificial Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "sucrose",
          role: "Support",
          roleDesc: "Provides Elemental Mastery buffs and groups enemies.",
          weapons: ["Sacrificial Fragments", "Mappa Mare"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "thoma",
          role: "Support",
          roleDesc: "Provides shields to protect the team.",
          weapons: ["Staff of Homa", "Black Tassel"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "HP", "Energy Recharge"]
        }
      ]
    }
  ],
  "dehya": [
    {
      name: "Dehya Melting Team #1",
      rank: "S",
      description: "Dehya provides off-field Pyro to enable Burning for stable Melt. Nahida applies Dendro and boosts Melt damage, while Bennett heals and buffs ATK. Maximize Ganyu's Melt damage by using Dehya's coordinated Pyro attacks and Nahida's Dendro application to trigger Burning, providing consistent Pyro aura.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Deals DMG by Elemental Burst and Charged Attack, triggering Melt with Pyro from Dehya.",
          weapons: ["Hunter's Path", "Hamayumi"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Support",
          roleDesc: "Elemental Skill creates a field that unleashes coordinated Pyro attacks.",
          weapons: ["Favonius Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Energy Recharge", "HP%"]
        },
        {
          characterId: "nahida",
          role: "Support",
          roleDesc: "Elemental Skill connects up to 8 enemies, dealing Dendro DMG and triggering reactions. Elemental Burst provides stable EM based on teammates' elements. Burning provides stable Pyro source.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Elemental Mastery", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Elemental Burst provides huge ATK buff and healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Dehya Melt Team #2",
      rank: "S",
      description: "Ganyu's DMG is maximized by triggering Melt with Pyro from Dehya. Kazuha groups enemies and provides DMG buff, and Bennett provides ATK buff and healing. Ganyu triggers Melt with Pyro from Dehya's coordinated attacks, while Kazuha groups enemies and provides DMG buff, and Bennett boosts ATK and heals.",
      members: [
        {
          characterId: "ganyu",
          role: "Main DPS",
          roleDesc: "Deals DMG via Burst and Charged Attack. Her attacks trigger Melt with Pyro from Dehya.",
          weapons: ["Hunter's Path", "Hamayumi"],
          artifacts: ["4pc Wanderer's Troupe"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Sub DPS",
          roleDesc: "Skill creates a field that unleashes coordinated Pyro damage when allies attack, enabling Melt for Ganyu.",
          weapons: ["Favonius Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Energy Recharge", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, provides DMG buff, and reduces elemental resistance with Swirl.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Burst provides a large ATK buff and healing to teammates.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Dehya Melt Team #3",
      rank: "S",
      description: "Ayaka's high Elemental Burst damage is maximized by triggering Melt with Pyro from Dehya. Kazuha groups and buffs, while Bennett provides ATK buff and healing. Ayaka's high Burst damage is maximized by triggering Melt with Pyro applied by Dehya's coordinated attacks.",
      members: [
        {
          characterId: "ayaka",
          role: "Main DPS",
          roleDesc: "Ayaka's Elemental Burst deals high Cryo DMG which is maximized by Melting.",
          weapons: ["Mistsplitter Reforged", "Amenoma Kageuchi"],
          artifacts: ["2pc Noblesse Oblige", "2pc Blizzard Strayer"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Sub DPS",
          roleDesc: "Dehya's Elemental Skill creates a field that triggers coordinated attacks, providing Pyro for Melting.",
          weapons: ["Favonius Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Groups enemies, applies swirled elements, provides DMG buff and reduces resistances.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Elemental Burst provides huge ATK buff and healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Dehya Pure Pyro Team #1",
      rank: "S",
      description: "A mono-pyro team that focuses on maximizing Dehya's Elemental Burst damage with the support of Kazuha and Bennett. Maximize Dehya's Elemental Burst damage with Kazuha's Pyro DMG buff and resistance shred, and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "dehya",
          role: "Main DPS",
          roleDesc: "Dehya mainly deals DMG by her Elemental Burst. Her DMG is maximized by Kazuha and Bennett.",
          weapons: ["Beacon of the Reed Sea"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Xiangling's Elemental Burst provides huge amount of DMG off-field.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha assists the team by grouping enemies, applying crowd control, providing DMG buff, and reducing Pyro resistance of enemies.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Dehya Pure Pyro Team #2",
      rank: "S",
      description: "A team focused on maximizing Dehya's Elemental Burst damage with support from Kazuha, Mona, and Bennett. Maximize Dehya's Elemental Burst damage using Kazuha's DMG buff and resistance shred, Mona's Omen and DMG increase, and Bennett's ATK buff.",
      members: [
        {
          characterId: "dehya",
          role: "Main DPS",
          roleDesc: "Dehya deals DMG via her Elemental Burst. Her damage is amplified by Kazuha and Bennett.",
          weapons: ["Beacon of the Reed Sea"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "mona",
          role: "Support",
          roleDesc: "Mona's Elemental Burst increases team DMG and provides Elemental Mastery and ATK% for Dehya.",
          weapons: ["Thrilling Tales of Dragon Slayers"],
          artifacts: ["4pc Instructor"],
          substats: ["Energy Recharge", "CRIT Rate", "CRIT DMG"]
        },
        {
          characterId: "kazuha",
          role: "Support",
          roleDesc: "Kazuha groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Viridescent Venerer"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Bennett's Elemental Burst provides a huge ATK buff and healing to the team.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Dehya Burgeon Team",
      rank: "A",
      description: "A Burgeon team where Dehya triggers cores with her Skill. Nahida applies Dendro, Xingqiu applies Hydro, and Kuki Shinobu provides healing and triggers Hyperbloom/Burgeon. Dehya triggers Burgeon using her Skill on Bloom cores created by Nahida and Xingqiu. Kuki Shinobu provides healing and triggers Hyperbloom.",
      members: [
        {
          characterId: "nahida",
          role: "Main DPS",
          roleDesc: "Mainly deals DMG via Skill connecting up to 8 enemies, and dealing Dendro DMG while triggering reactions. Her Burst buffs her skill based on teammates' elements.",
          weapons: ["A Thousand Floating Dreams", "Solar Pearl"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["Elemental Mastery", "CRIT DMG", "CRIT Rate", "Energy Recharge"]
        },
        {
          characterId: "dehya",
          role: "Support",
          roleDesc: "Triggers Burgeon by using Skill to activate cores. Also mitigates damage for teammates.",
          weapons: ["Rainslasher"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["HP%", "Elemental Mastery"]
        },
        {
          characterId: "xingqiu",
          role: "Sub DPS",
          roleDesc: "His Burst continuously applies Hydro to enemies, reacting with Dendro from Nahida to produce Bloom cores.",
          weapons: ["Sapwood Blade"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "CRIT DMG", "CRIT Rate", "ATK%"]
        },
        {
          characterId: "shinobu",
          role: "Support",
          roleDesc: "Provides healing and triggers Hyperbloom by using Skill on Dendro Cores. Maximizing Elemental Mastery increases Hyperbloom DMG.",
          weapons: ["Freedom-Sworn", "Iron Sting"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["Elemental Mastery", "HP%", "HP", "Energy Recharge"]
        }
      ]
    },
    {
      name: "Dehya Vaporization Team #2",
      rank: "S",
      description: "A team that leverages Burning to enable Vaporize reactions, with two off-field Pyro supports boosting Mualani's damage. Use Burning (from Dendro/Emilie and Pyro supports) to set up constant Pyro aura for Mualani's Hydro attacks to trigger Vaporize, dealing massive damage.",
      members: [
        {
          characterId: "mualani",
          role: "Main DPS",
          roleDesc: "Uses Skill to enter Nightmind's Blessing, enhancing Normal Attacks to 'Shark Bite'. Gains 'Wave Momentum' on contact, firing 'Shark Missiles' at 3 stacks.",
          weapons: ["Surf's Up", "Sacrificial Jade"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["HP%", "CRIT DMG", "CRIT Rate", "Elemental Mastery", "Energy Recharge"]
        },
        {
          characterId: "emilie",
          role: "Sub DPS",
          roleDesc: "Summons 'Lumidouce Case' for intermittent Dendro damage. Burning state generates 'Scents' increasing range and damage. Burst further boosts scent damage.",
          weapons: ["Lumidouce Elegy", "Deathmatch"],
          artifacts: ["4pc Unfinished Reverie"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Off-field Burst provides massive Pyro damage and consistent Pyro application.",
          weapons: ["Engulfing Lightning", "Favonius Lance"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "dehya",
          role: "Support",
          roleDesc: "Creates a field via Skill that unleashes coordinated AoE Pyro attacks when enemies take damage.",
          weapons: ["Favonius Greatsword"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ],
  "nicole": [
    {
      name: "Nicole Pyro Team #1",
      rank: "SS",
      description: "A team built around Varka as a mixed damage main DPS, with Anemo and converted elemental attacks, supported by Prune's buffs and ADC buffs, Nicole's shielding and ADC boosts, and Bennett's ATK buff and healing.",
      members: [
        {
          characterId: "varka",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Enters mixed damage mode after using Skill, dealing Anemo and converted elemental damage.",
          weapons: ["Game of the Mighty Wolf", "Serpent Spine"],
          artifacts: ["4pc Gladiator's Destiny"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%", "ATK"]
        },
        {
          characterId: "prune",
          role: "Support",
          roleDesc: "Anemo Support. Provides Pyro stand and ADC buffs via Pyro attacks.",
          weapons: ["Angelos' Heptades", "Oathsworn Eye"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["ATK%", "Energy Recharge"]
        },
        {
          characterId: "nicole",
          role: "Support",
          roleDesc: "Pyro Support. Provides shields and teamwide ATK% buffs, synergizing with Celestial Gift set.",
          weapons: ["Angelos' Heptades", "Flowing Purity"],
          artifacts: ["4pc Celestial Gift"],
          substats: ["ATK%", "ATK"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Pyro Support. Restores health, provides huge ATK buff and healing.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge"]
        }
      ]
    },
    {
      name: "Nicole Pyro Team #2",
      rank: "SS",
      description: "A high-tier team featuring Varka as main DPS with Anemo and converted elemental damage, supported by Prune's buffs, Nicole's shield, and Durin's off-field Pyro and RES shred.",
      members: [
        {
          characterId: "varka",
          role: "Main DPS",
          roleDesc: "Main DPS. After Skill, enters mixed damage mode with normal/charged attacks.",
          weapons: ["Game of the Mighty Wolf", "Serpent Spine"],
          artifacts: ["4pc Gladiator's Destiny"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%", "ATK"]
        },
        {
          characterId: "prune",
          role: "Support",
          roleDesc: "Anemo Support. Provides Anemo support and buffs.",
          weapons: ["Angelos' Heptades", "Oathsworn Eye"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["ATK%", "Energy Recharge"]
        },
        {
          characterId: "nicole",
          role: "Support",
          roleDesc: "Pyro Support. Shields and buffs team ATK based on maximum stats.",
          weapons: ["Angelos' Heptades", "Flowing Purity"],
          artifacts: ["4pc Celestial Gift"],
          substats: ["ATK%", "ATK"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Off-field Pyro support (Pyro RES shred) or damage dealer.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        }
      ]
    },
    {
      name: "Nicole Anemo Team #1",
      rank: "S",
      description: "A high-tier team centered around Venti's Anemo damage and Nicole's support for Heaven characters. This team leverages element-synergies.",
      members: [
        {
          characterId: "venti",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Summons a Stormeye with Burst that pulls enemies and deals continuous Anemo DMG.",
          weapons: ["The First Great Magic", "Fading Twilight"],
          artifacts: ["4pc Desert Pavilion Chronicle"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "prune",
          role: "Support",
          roleDesc: "Anemo Support. Another Anemo support for teamwide ADC buffs.",
          weapons: ["Angelos' Heptades", "Oathsworn Eye"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["ATK%", "Energy Recharge"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Off-field Pyro support.",
          weapons: ["Mistsplitter Reforged", "Favonius Sword"],
          artifacts: ["4pc Crimson Witch of Flames"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "nicole",
          role: "Support",
          roleDesc: "Pyro Support. Shields and buffs team ADC via Skill.",
          weapons: ["Angelos' Heptades", "Flowing Purity"],
          artifacts: ["4pc Celestial Gift"],
          substats: ["ATK%", "ATK"]
        }
      ]
    },
    {
      name: "Venti Hazard Anemo Storm",
      rank: "S",
      description: "Anemo team centered around Venti's Stormeye and Swirl reactions. Faruzan boosts Anemo DMG, Durin applies off-field Pyro and reduces RES, and Nicole provides shields and ADC buffs.",
      members: [
        {
          characterId: "venti",
          role: "Main DPS",
          roleDesc: "Anemo Main DPS. Summons a stormeye with Burst that pulls enemies and deals continuous Anemo damage.",
          weapons: ["The Daybreak Chronicles", "Rust"],
          artifacts: ["4pc Desert Pavilion Chronicle"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "faruzan",
          role: "Support",
          roleDesc: "Anemo Support. Applies Anemo RES decrease and DMG bonus.",
          weapons: ["Elegy for the End", "Favonius Warbow"],
          artifacts: ["4pc Tenacity of the Millelith"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Off-field Pyro support.",
          weapons: ["Mistsplitter Reforged", "Wolf-Fang"],
          artifacts: ["4pc Golden Troupe"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "nicole",
          role: "Support",
          roleDesc: "Pyro Support. Provides shield and teamwide ATK% buff via Skill.",
          weapons: ["Angelos' Heptades", "Flowing Purity"],
          artifacts: ["4pc Celestial Gift"],
          substats: ["ATK%", "ATK"]
        }
      ]
    },
    {
      name: "Nicole Burning Team #1",
      rank: "S",
      description: "Burning team with Kinich as on-field Clorindo DPS. Durin and Nicole apply Pyro off-field, reducing enemy Pyro and Dendro RES via Burning. Iansan provides mobile ADC buff.",
      members: [
        {
          characterId: "kinich",
          role: "Main DPS",
          roleDesc: "Dendro Main DPS. Deals high Dendro damage.",
          weapons: ["Fang of the Mountain King", "Serpent Spine"],
          artifacts: ["4pc Obsidian Codex"],
          substats: ["CRIT Rate", "CRIT DMG", "ATK%", "ATK"]
        },
        {
          characterId: "iansan",
          role: "Support",
          roleDesc: "Electro Support. Buffs active character's ATK.",
          weapons: ["Symphony of Signets", "Favonius Lance"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "nicole",
          role: "Support",
          roleDesc: "Pyro Support. Shield and teamwide ATK% buff via Skill.",
          weapons: ["Angelos' Heptades", "Flowing Purity"],
          artifacts: ["4pc Celestial Gift"],
          substats: ["ATK%", "ATK"]
        },
        {
          characterId: "durin",
          role: "Support",
          roleDesc: "Pyro Support. Off-field Pyro support.",
          weapons: ["Mints-Arts", "Wolf-Fang"],
          artifacts: ["4pc Deepwood Memories"],
          substats: ["CRIT Rate", "CRIT DMG", "Energy Recharge", "ATK%"]
        }
      ]
    }
  ],
  "chevreuse": [
    {
      name: "Chevreuse Overload Team #1",
      rank: "SS",
      description: "Maximize team DMG with Chevreuse's Overload RES shred and ATK buff. Cyno drives with infused Electro attacks, Xiangling provides off-field Pyro DMG, and Bennett offers ATK buff and healing.",
      members: [
        {
          characterId: "cyno",
          role: "Main DPS",
          roleDesc: "Main DPS. Runs standard normal ATK with Electro DMG. Maximize stats for continuous combat.",
          weapons: ["Staff of the Scarlet Sands", "Staff of Homa"],
          artifacts: ["4pc Gilded Dreams"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
          weapons: ["Favonius Lance", "Black Tassel"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Chevreuse Overload Team #2",
      rank: "SS",
      description: "Maximize team DMG by using Chevreuse's passive to reduce element resistance when Overload is triggered, while Bennett provides ATK buff and healing. Raiden Shogun's Elemental Skill boosts Energy Recharge and Elemental Burst DMG of teammates, and she coordinates with Xiangling's Pyro element to trigger Overload.",
      members: [
        {
          characterId: "raiden-shogun",
          role: "Main DPS",
          roleDesc: "Main DPS. Runs on-field Electro attacks, fills team's energy with energy restoration. Triggers Overload with coordinated Pyro.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
          weapons: ["Favonius Lance", "Black Tassel"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "xiangling",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge", "Elemental Mastery"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    },
    {
      name: "Chevreuse Overload Team #3",
      rank: "SS",
      description: "Chevreuse is a Support/Healer in the team. The team's DMG is maximized by Chevreuse. Chevreuse's passive reduces Pyro and Electro RES when Overload is triggered, maximizing team DMG. Her Skill provides an ATK buff to Pyro and Electro characters based on her Max HP.",
      members: [
        {
          characterId: "yoimiya",
          role: "Main DPS",
          roleDesc: "Yoimiya is the main DPS, her DMG is amplified by Chevreuse in this team.",
          weapons: ["Thundering Pulse", "Rust"],
          artifacts: ["4pc Shimenawa's Reminiscence"],
          substats: ["CRIT DMG", "CRIT Rate", "ATK%", "Energy Recharge"]
        },
        {
          characterId: "chevreuse",
          role: "Support",
          roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
          weapons: ["Favonius Lance", "Black Tassel"],
          artifacts: ["4pc Song of Days Past"],
          substats: ["HP%", "Energy Recharge"]
        },
        {
          characterId: "raiden-shogun",
          role: "Sub DPS",
          roleDesc: "Sub DPS. Triggers Electro attacks to enable Overload.",
          weapons: ["Engulfing Lightning", "The Catch"],
          artifacts: ["4pc Emblem of Severed Fate"],
          substats: ["CRIT DMG", "CRIT Rate", "Energy Recharge", "ATK%"]
        },
        {
          characterId: "bennett",
          role: "Support",
          roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
          weapons: ["Aquila Favonia", "Favonius Sword"],
          artifacts: ["4pc Noblesse Oblige"],
          substats: ["Energy Recharge", "HP%"]
        }
      ]
    }
  ]
};
