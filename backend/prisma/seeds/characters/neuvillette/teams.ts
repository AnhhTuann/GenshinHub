export const teams = [
  {
    name: 'Neuvillette Electro-Charged Team #2',
    rank: 'SS',
    description: 'An Electro-Charged team featuring Neuvillette as the main DPS, with Furina providing off-field Hydro, Kazuha grouping and buffs, and Kuki Shinobu triggering Electro-Charged reactions and healing.',
    members: [
      {
        characterId: 'neuvillette',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Deals high Hydro damage and drives Electro-Charged.',
        weapons: [ 'Tome of the Eternal Flow', 'Sacrificial Jade' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.',
        weapons: [ 'Freedom-Sworn', "Xiphos' Moonlight" ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'kuki-shinobu',
        role: 'Support',
        roleDesc: 'Electro Support. Provides healing and triggers Electro-Charged reactions.',
        weapons: [ 'Key of Khaj-Nisut', 'Iron Sting' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'Elemental Mastery', 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Neuvillette Vaporize #1',
    rank: 'SS',
    description: "A powerful Vaporize team centered around Neuvillette's charged attacks, with Xiangling providing off-field Pyro application, Kazuha offering crowd control and resistance shred, and Bennett healing and boosting ATK.",
    members: [
      {
        characterId: 'neuvillette',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Deals high continuous Hydro damage and triggers Vaporize.',
        weapons: [ 'Tome of the Eternal Flow', 'Sacrificial Jade' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Pyro Sub DPS. Deals high Pyro damage off-field with Pyronado.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides healing and massive ATK buff.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds Pyro and Hydro resistances, and buffs elemental DMG.',
        weapons: [ 'Freedom-Sworn', "Xiphos' Moonlight" ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Neuvillette Hypercarry Team #1',
    rank: 'SS',
    description: 'Neuvillette hypercarry team utilizing Bloom reactions from Hydro and Dendro applications. Hydro application from Neuvillette and Furina reacts with Dendro from Baizhu to create Bloom cores. Kazuha provides Elemental Mastery buff and Anemo resistance shred via Viridescent Venerer.',
    members: [
      {
        characterId: 'neuvillette',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Deals massive Hydro damage with Charged Attacks.',
        weapons: [ 'Tome of the Eternal Flow', 'Sacrificial Jade' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.',
        weapons: [ 'Freedom-Sworn', "Xiphos' Moonlight" ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'baizhu',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides healing, shields, and buffs Bloom reaction damage.',
        weapons: [ "Jadefall's Splendor", 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge', 'CRIT DMG', 'CRIT Rate' ]
      }
    ]
  },
  {
    name: 'Neuvillette Hyperbloom',
    rank: 'SS',
    description: "A powerful Hyperbloom team leveraging Neuvillette's continuous Hydro application with Nahida's Dendro application to create Bloom cores, then triggering Hyperbloom with Raiden Shogun's Electro. Furina provides additional off-field Hydro application and party-wide DMG buffs.",
    members: [
      {
        characterId: 'neuvillette',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Deals high continuous Hydro damage with Charged Attacks.',
        weapons: [ 'Tome of the Eternal Flow', 'Sacrificial Jade' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Triggers Hyperbloom reactions with Elemental Skill.',
        weapons: [ "Dragon's Bane" ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies Dendro off-field and shares EM.',
        weapons: [ 'A Thousand Floating Dreams', 'Sacrificial Fragments' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'Elemental Mastery',
          'CRIT DMG',
          'CRIT Rate',
          'ATK%',
          'Energy Recharge'
        ]
      }
    ]
  },
  {
    name: 'Neuvillette Electro-Charged Team #1',
    rank: 'SS',
    description: "An Electro-Charged team combining Neuvillette's Hydro application and off-field Electro from Yae Miko and Raiden Shogun, with Kazuha providing grouping and buffs.",
    members: [
      {
        characterId: 'neuvillette',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Drives Electro-Charged reactions with Charged Attacks.',
        weapons: [ 'Tome of the Eternal Flow', 'Sacrificial Jade' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Buffs Burst DMG and triggers off-field Electro attacks.',
        weapons: [ "Dragon's Bane" ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'yae-miko',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Deals continuous off-field Electro damage with turrets.',
        weapons: [ "Kagura's Verity", 'The Widsith' ],
        artifacts: [ "2pc Thundering Fury + 2pc Gladiator's Finale" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.',
        weapons: [ 'Freedom-Sworn', "Xiphos' Moonlight" ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  }
];
