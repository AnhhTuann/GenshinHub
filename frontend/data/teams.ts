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
  ]
};
