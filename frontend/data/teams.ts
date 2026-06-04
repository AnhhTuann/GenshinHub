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
  ]
};
