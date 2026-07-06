export const teams = [
  {
    name: 'Lyney Pure Pyro Team #2',
    rank: 'S',
    description: "An alternative mono-pyro team maximizing Lyney's passive. Lynette replaces Kazuha, providing grouping, taunt via Boffo Cat Box, and Pyro RES shred with Swirl, while Xiangling deals off-field damage and Bennett buffs ATK and heals.",
    members: [
      {
        characterId: 'lyney',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Charged Attacks deal high Pyro DMG, boosted by Bennett and Xiangling.',
        weapons: [ 'The First Great Magic', 'Song of Stillness' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Pyro Sub DPS. Deals high off-field Pyro DMG and benefits from Pyro RES shred.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and consistent healing.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'lynette',
        role: 'Support',
        roleDesc: 'Anemo Support. Taunts enemies, swirls Pyro to reduce enemy resistance, and boosts team ATK after using Burst.',
        weapons: [ 'Freedom-Sworn', 'Favonius Sword', 'Sacrificial Sword' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Lyney Pure Pyro Team #1',
    rank: 'SS',
    description: "A pure Pyro team that maximizes Lyney's passive ATK bonus from Pyro teammates. Kaedehara Kazuha swirls Pyro to reduce enemy resistance and groups them, while Xiangling deals off-field Pyro damage and Bennett provides massive ATK buff and healing.",
    members: [
      {
        characterId: 'lyney',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. His Charged Attacks deal high single-target and AoE Pyro DMG, boosted by his passive for each Pyro ally.',
        weapons: [ 'The First Great Magic', 'Song of Stillness' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: "Pyro Sub DPS. Deals substantial off-field Pyro damage with Pyronado and Pyronado's Pyro application.",
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing to sustain Lyney's HP manipulation.",
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Lyney Pure Pyro Team #3',
    rank: 'SS',
    description: 'A defensive pure Pyro team featuring Dehya for damage reduction and interruption resistance. Kazuha swirls Pyro for RES shred and grouping, while Bennett provides ATK buffs and healing.',
    members: [
      {
        characterId: 'lyney',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. His Charged Attacks deal high Pyro DMG, protected from interruption by Dehya.',
        weapons: [ 'The First Great Magic', 'Song of Stillness' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'dehya',
        role: 'Sub DPS',
        roleDesc: 'Pyro Sub DPS & Tank. Provides off-field Pyro application, damage reduction, and interruption resistance.',
        weapons: [ 'Favonius Greatsword', 'Sacrificial Greatsword' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'Energy Recharge', 'HP%', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and consistent healing.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge' ]
      }
    ]
  }
];
