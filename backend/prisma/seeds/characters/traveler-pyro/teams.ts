export const teams = [
  {
    name: 'Traveler Pyro Vaporize Team',
    rank: 'S',
    description: 'A premium Vaporize team featuring Mavuika as the primary on-field Pyro DPS, Furina for off-field Hydro application and DMG buffs, Xilonen for healing and RES shred, and Pyro Traveler for Pyro resonance and off-field support.',
    members: [
      {
        characterId: 'mavuika',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.',
        weapons: [ 'Arianrhod', 'Earth Shaker' ],
        artifacts: [ '4pc Obsidian Codex' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS / Buffer',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.',
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'HP%', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support / Healer',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'Energy Recharge', 'DEF', 'CRIT Rate' ]
      },
      {
        characterId: 'traveler-pyro',
        role: 'Support',
        roleDesc: 'Pyro Support. Enables Pyro resonance, helps keep Pyro/Hydro aura, and buffs the team with Instructor/Scroll.',
        weapons: [ 'Favonius Sword', 'Sacrificial Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Traveler Pyro Burning Team',
    rank: 'S',
    description: 'A Burning-focused team where Kinich deals high Dendro damage on-field, Emilie acts as an off-field Dendro Sub DPS, Bennett provides massive ATK buffs and healing, and Pyro Traveler applies consistent off-field Pyro.',
    members: [
      {
        characterId: 'kinich',
        role: 'Main DPS',
        roleDesc: 'On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.',
        weapons: [ 'Fang of the Mountain King', 'Earth Shaker' ],
        artifacts: [ '4pc Obsidian Codex' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'emilie',
        role: 'Sub DPS',
        roleDesc: 'Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.',
        weapons: [ 'Lumidouce Elegy', 'Deathmatch' ],
        artifacts: [ '4pc Unfinished Reverie' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Healer/Buffer. Provides massive ATK buff and consistent healing via Elemental Burst.',
        weapons: [ 'Mistsplitter Reforged', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%' ]
      },
      {
        characterId: 'traveler-pyro',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides Pyro resonance, off-field Pyro application, and team buffs via Scroll of the Hero set.',
        weapons: [ 'Favonius Sword', 'Peak Patrol Song' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%' ]
      }
    ]
  }
];
