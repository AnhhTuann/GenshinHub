export const teams = [
  {
    name: 'Nicole Burning Team #1',
    rank: 'S',
    description: 'Burning team with Kinich as on-field Clorindo DPS. Durin and Nicole apply Pyro off-field, reducing enemy Pyro and Dendro RES via Burning. Iansan provides mobile ADC buff.',
    members: [
      {
        characterId: 'kinich',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Deals high Dendro damage.',
        weapons: [ 'Fang of the Mountain King', 'Serpent Spine' ],
        artifacts: [ '4pc Obsidian Codex' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'ATK%', 'ATK' ]
      },
      {
        characterId: 'nicole',
        role: 'Support',
        roleDesc: 'Pyro Support. Shield and teamwide ATK% buff via Skill.',
        weapons: [ "Angelos' Heptades", 'Flowing Purity' ],
        artifacts: [ '4pc Celestial Gift' ],
        substats: [ 'ATK%', 'ATK' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: 'Pyro Support. Off-field Pyro support.',
        weapons: [ 'Mints-Arts', 'Wolf-Fang' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'iansan',
        role: 'Support',
        roleDesc: "Electro Support. Buffs active character's ATK.",
        weapons: [ 'Symphony of Signets', 'Favonius Lance' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Nicole Pyro Team #2',
    rank: 'SS',
    description: "A high-tier team featuring Varka as main DPS with Anemo and converted elemental damage, supported by Prune's buffs, Nicole's shield, and Durin's off-field Pyro and RES shred.",
    members: [
      {
        characterId: 'varka',
        role: 'Main DPS',
        roleDesc: 'Main DPS. After Skill, enters mixed damage mode with normal/charged attacks.',
        weapons: [ 'Game of the Mighty Wolf', 'Serpent Spine' ],
        artifacts: [ "4pc Gladiator's Destiny" ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'ATK%', 'ATK' ]
      },
      {
        characterId: 'nicole',
        role: 'Support',
        roleDesc: 'Pyro Support. Shields and buffs team ATK based on maximum stats.',
        weapons: [ "Angelos' Heptades", 'Flowing Purity' ],
        artifacts: [ '4pc Celestial Gift' ],
        substats: [ 'ATK%', 'ATK' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: 'Pyro Support. Off-field Pyro support (Pyro RES shred) or damage dealer.',
        weapons: [ 'Mistsplitter Reforged', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'prune',
        role: 'Support',
        roleDesc: 'Anemo Support. Provides Anemo support and buffs.',
        weapons: [ "Angelos' Heptades", 'Oathsworn Eye' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'ATK%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Venti Hazard Anemo Storm',
    rank: 'S',
    description: "Anemo team centered around Venti's Stormeye and Swirl reactions. Faruzan boosts Anemo DMG, Durin applies off-field Pyro and reduces RES, and Nicole provides shields and ADC buffs.",
    members: [
      {
        characterId: 'venti',
        role: 'Main DPS',
        roleDesc: 'Anemo Main DPS. Summons a stormeye with Burst that pulls enemies and deals continuous Anemo damage.',
        weapons: [ 'The Daybreak Chronicles', 'Rust' ],
        artifacts: [ '4pc Desert Pavilion Chronicle' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'faruzan',
        role: 'Support',
        roleDesc: 'Anemo Support. Applies Anemo RES decrease and DMG bonus.',
        weapons: [ 'Elegy for the End', 'Favonius Warbow' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'nicole',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides shield and teamwide ATK% buff via Skill.',
        weapons: [ "Angelos' Heptades", 'Flowing Purity' ],
        artifacts: [ '4pc Celestial Gift' ],
        substats: [ 'ATK%', 'ATK' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: 'Pyro Support. Off-field Pyro support.',
        weapons: [ 'Mistsplitter Reforged', 'Wolf-Fang' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Nicole Pyro Team #1',
    rank: 'SS',
    description: "A team built around Varka as a mixed damage main DPS, with Anemo and converted elemental attacks, supported by Prune's buffs and ADC buffs, Nicole's shielding and ADC boosts, and Bennett's ATK buff and healing.",
    members: [
      {
        characterId: 'varka',
        role: 'Main DPS',
        roleDesc: 'Anemo Main DPS. Enters mixed damage mode after using Skill, dealing Anemo and converted elemental damage.',
        weapons: [ 'Game of the Mighty Wolf', 'Serpent Spine' ],
        artifacts: [ "4pc Gladiator's Destiny" ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'ATK%', 'ATK' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Pyro Support. Restores health, provides huge ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge' ]
      },
      {
        characterId: 'prune',
        role: 'Support',
        roleDesc: 'Anemo Support. Provides Pyro stand and ADC buffs via Pyro attacks.',
        weapons: [ "Angelos' Heptades", 'Oathsworn Eye' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'nicole',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides shields and teamwide ATK% buffs, synergizing with Celestial Gift set.',
        weapons: [ "Angelos' Heptades", 'Flowing Purity' ],
        artifacts: [ '4pc Celestial Gift' ],
        substats: [ 'ATK%', 'ATK' ]
      }
    ]
  },
  {
    name: 'Nicole Anemo Team #1',
    rank: 'S',
    description: "A high-tier team centered around Venti's Anemo damage and Nicole's support for Heaven characters. This team leverages element-synergies.",
    members: [
      {
        characterId: 'venti',
        role: 'Main DPS',
        roleDesc: 'Anemo Main DPS. Summons a Stormeye with Burst that pulls enemies and deals continuous Anemo DMG.',
        weapons: [ 'The First Great Magic', 'Fading Twilight' ],
        artifacts: [ '4pc Desert Pavilion Chronicle' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'nicole',
        role: 'Support',
        roleDesc: 'Pyro Support. Shields and buffs team ADC via Skill.',
        weapons: [ "Angelos' Heptades", 'Flowing Purity' ],
        artifacts: [ '4pc Celestial Gift' ],
        substats: [ 'ATK%', 'ATK' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: 'Pyro Support. Off-field Pyro support.',
        weapons: [ 'Mistsplitter Reforged', 'Favonius Sword' ],
        artifacts: [ '4pc Crimson Witch of Flames' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'prune',
        role: 'Support',
        roleDesc: 'Anemo Support. Another Anemo support for teamwide ADC buffs.',
        weapons: [ "Angelos' Heptades", 'Oathsworn Eye' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'ATK%', 'Energy Recharge' ]
      }
    ]
  }
];
