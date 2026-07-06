export const teams = [
  {
    name: 'Amber Melt Team',
    rank: 'S',
    description: "The DMG of Ayaka is maximized by Melt. Maximize Ayaka's Melt damage by applying Pyro with Amber and Bennett while Zhongli provides shielding and ATK buffs.",
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Main DPS',
        roleDesc: "Deals DMG by her Burst, and her Cryo DMG reacts with Pyro attachment from Amber's Skill to trigger Melt.",
        weapons: [ 'Mistsplitter Reforged', 'Amenoma Kageuchi' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'amber',
        role: 'Sub DPS',
        roleDesc: 'Works with Ayaka to trigger Melt by her Skill.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Provides shield for safe environment and increases ATK of whole team using full set of Tenacity of the Millelith.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ 'Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'His Burst provides huge ATK buff and healing to other members.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: "Amber's Reaction Overload",
    rank: 'S',
    description: "Amber's Pyro triggers Overload with Fischl's Electro and Vaporization with Xingqiu's Hydro. Combines Pyro reactions: Overload from Amber and Fischl, and Vaporization from Amber and Xingqiu, supported by Bennett.",
    members: [
      {
        characterId: 'amber',
        role: 'Main DPS',
        roleDesc: 'Main DPS triggering Overload with Fischl and Vaporization with Xingqiu.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: 'Provides continuous Hydro application via Burst to enable Vaporization.',
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Off-field Electro via Skill for Overload. Oz provides a significant upgrade.',
        weapons: [ 'Skyward Harp', 'The Stringless' ],
        artifacts: [ 'Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing via Burst.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Raiden Overload',
    rank: 'S',
    description: "The team triggers frequent Overload reactions between Raiden Shogun's Electro and Amber's Pyro. Kazuha groups enemies and buffs damage, while Bennett provides ATK buff and healing.",
    members: [
      {
        characterId: 'raiden-shogun',
        role: 'Main DPS',
        roleDesc: "Raiden Shogun deals Burst damage scaling with team's energy consumption.",
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ 'Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'amber',
        role: 'Sub DPS',
        roleDesc: 'Amber is the Sub DPS, works with Raiden Shogun to trigger Overload.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Bennett provides huge ATK and healing via Burst.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Kazuha groups enemies, applies swirled control, buffs team DMG, and reduces enemy Elemental Resistance.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Vaporize Amber',
    rank: 'S',
    description: "Amber's damage is maximized by Vaporize, utilizing Xingqiu's consistent Hydro application and Kazuha's support, with Bennett providing ATK buff and healing. Amber's charged attacks trigger Vaporize with Xingqiu's Hydro application, while Kazuha provides grouping and damage buffs, and Bennett heals and boosts ATK.",
    members: [
      {
        characterId: 'amber',
        role: 'Main DPS',
        roleDesc: 'Amber deals damage with Charged Attack to trigger Vaporize.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: "Xingqiu's Elemental Burst applies Hydro continuously to enable Vaporize.",
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Kazuha groups enemies and provides Elemental Mastery buff and Anemo RES shred.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Elemental Burst provides ATK buff and healing.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
