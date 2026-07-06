export const teams = [
  {
    name: 'Aloy Melt Team #1',
    rank: 'A',
    description: 'Aloy serves as the main DPS, maximizing damage through Melt reactions enabled by Xiangling.\n' +
      "Aloy's Cryo attacks are melted by Pyro from Xiangling's Burst. Kazuha provides grouping, Elemental DMG Bonus, and RES shred. Diona offers shielding and Cryo battery.",
    members: [
      {
        characterId: 'aloy',
        role: 'Main DPS',
        roleDesc: 'Main DPS. Uses Melt to amplify damage.',
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: "Xiangling's Burst provides massive Pyro damage and continuous application for Melt.",
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ 'Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: "Diona's shield provides safety and her Burst heals and helps battery Aloy's Burst.",
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ 'Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Kazuha groups enemies, provides Elemental DMG Bonus, and reduces enemy RES with Anemo swirls.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Aloy Melt Team #2',
    rank: 'A',
    description: "Aloy's Cryo attacks trigger Melt with Xiangling's Pyro for high damage.\n" +
      "Aloy's Cryo attachment reacts with Pyro from Xiangling to trigger Melting, maximizing Aloy's DMG.",
    members: [
      {
        characterId: 'aloy',
        role: 'Main DPS',
        roleDesc: 'Main DPS. Uses Melt to amplify damage.',
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: "Provides continuous Pyro via Burst for Aloy's Melt.",
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ 'Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'chongyun',
        role: 'Sub DPS',
        roleDesc: "C2 reduces Aloy's Burst CD. Provides backstage Cryo DMG.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer', 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Burst provides ATK buff and healing to the team.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Aloy Permafrost Team #1',
    rank: 'BB',
    description: "In this team, Kokomi's Skill applies Hydro every 2s, enabling Freeze with Ayaka and Aloy. Kazuha groups enemies and boosts Cryo damage. Aloy acts as a sub-DPS with her Burst.\n" +
      "Constantly apply Hydro via Kokomi's Skill and Cryo via Ayaka and Aloy to maintain permanent Freeze. Kazuha groups enemies and enhances Cryo damage.",
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Main DPS',
        roleDesc: 'Her Burst deals massive damage and applies Cryo for Freeze.',
        weapons: [ 'Mistsplitter Reforged', 'Amenoma Kageuchi' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'aloy',
        role: 'Sub DPS',
        roleDesc: 'Provides Cryo off-field damage and enables Freeze with Kokomi.',
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Support',
        roleDesc: 'Her Skill applies Hydro every 2s, triggering Tenacity of the Millelith. She uses Thrilling Tales to buff Ayaka.',
        weapons: [ 'Everlasting Moonglow', 'Thrilling Tales of Dragon Slayers' ],
        artifacts: [ 'Tenacity of the Millelith' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, reduces Anemo RES, and boosts party Cryo damage.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Aloy Permafrost Team #2',
    rank: 'A',
    description: "A Freeze team built around Aloy as the main Cryo DPS, supported by Xingqiu's Hydro application and Chongyun's cooldown reduction, with Jean providing healing and resistance shred via Viridescent Venerer.\n" +
      "Aloy's Cryo DMG reacts with Xingqiu's Hydro to trigger Freeze. Chongyun (C2+) reduces Aloy's Burst cooldown and provides off-field Cryo, while Jean uses Viridescent Venerer to lower enemy resistance and heal.",
    members: [
      {
        characterId: 'aloy',
        role: 'Main DPS',
        roleDesc: "Main DPS. Cryo DMG reacts with Xingqiu's Hydro to trigger Freeze.",
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Elemental Burst applies Hydro continuously to enable Freeze.',
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'chongyun',
        role: 'Sub DPS',
        roleDesc: "Sub DPS. At C2, Elemental Skill reduces Aloy's Burst cooldown. Provides off-field Cryo DMG.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer', 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'jean',
        role: 'Support',
        roleDesc: 'Healer/Support. Uses Viridescent Venerer to reduce enemy Anemo resistance and heal the team.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Aloy Permafrost Freeze',
    rank: 'A',
    description: 'A freeze composition featuring Aloy as the main Cryo DPS, supported by Mona for Hydro application, Venti for crowd control, and Diona for shielding and healing.\n' +
      "Aloy's Cryo DMG reacts with Hydro from Mona to trigger Freeze, locking down enemies while Venti groups them and Diona provides survivability.",
    members: [
      {
        characterId: 'aloy',
        role: 'Main DPS',
        roleDesc: "Aloy's Cryo DMG reacts with Hydro from Mona to trigger Freeze.",
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'mona',
        role: 'Sub DPS',
        roleDesc: 'Mona applies Hydro and boosts DMG with her Burst.',
        weapons: [
          'Skyward Atlas',
          'Favonius Codex',
          'Thrilling Tales of Dragon Slayers'
        ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'venti',
        role: 'Sub DPS',
        roleDesc: 'Venti groups enemies and spreads Hydro with his Burst.',
        weapons: [ 'Elegy for the End', 'Rust' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: 'Diona provides shield, healing, and helps battery.',
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ 'Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Aloy Melt Team #3',
    rank: 'A',
    description: 'Klee serves as the main DPS, triggering Melt with Cryo applied by Aloy. Sucrose boosts Elemental Mastery, and Bennett provides ATK buff and healing.',
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: 'Provides continuous Pyro DMG for Melting reactions.',
        weapons: [ 'Lost Prayer to the Sacred Winds', 'The Widsith' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'aloy',
        role: 'Sub DPS',
        roleDesc: 'Provides Cryo attachment for Klee to trigger Melting from off-field.',
        weapons: [ "Amos' Bow", 'Rust' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'sucrose',
        role: 'Sub DPS',
        roleDesc: 'Provides Elemental Mastery bonus to increase Melting DMG.',
        weapons: [ 'Sacrificial Fragments', 'Mappa Mare' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Elemental Burst provides huge ATK buff and healing.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
