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
  ]
};
