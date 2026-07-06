export const teams = [
  {
    name: 'Furina Vaporize',
    rank: 'SS',
    description: "Hu Tao triggers Vaporize with off-field Hydro from Yelan and Furina, with Zhongli's shields and buffs, and Bennett's ATK boost. Leverage Furina and Yelan's off-field Hydro to enable Hu Tao's Vaporization, with Furina's Burst providing damage amplification and Zhongli's shield and Tenacity set boosting survivability and ATK.",
    members: [
      {
        characterId: 'hu-tao',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Deals massive Vaporize damage using Charged Attacks.',
        weapons: [ 'Staff of Homa', 'White Tassel' ],
        artifacts: [ '4pc Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery' ]
      },
      {
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
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
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Furina Spread-Hyperbloom',
    rank: 'SS',
    description: "A team utilizing Spread and Hyperbloom reactions, driven by Alhaitham, Yae Miko, and Furina. Continuous Spread and Hyperbloom reactions via Alhaitham's on-field Dendro, Yae Miko's off-field Electro, and Furina's off-field Hydro, with Baizhu providing healing and Spread DMG boost.",
    members: [
      {
        characterId: 'alhaitham',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Deals high Dendro damage on-field and triggers reactions.',
        weapons: [ 'Light of Foliar Incision', 'Iron Sting' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'yae-miko',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Provides off-field Electro application and high turret damage.',
        weapons: [ "Kagura's Verity", 'The Widsith' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
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
        characterId: 'baizhu',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides healing, shields, and buffs Dendro reaction damage.',
        weapons: [ "Jadefall's Splendor", 'Prototype Amber' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge', 'CRIT DMG', 'CRIT Rate' ]
      }
    ]
  },
  {
    name: 'Furina Quickbloom Team',
    rank: 'SS',
    description: "Furina Quickbloom Team is a high damage team focusing on Hyperbloom reactions. Furina's off-field Hydro enables Bloom cores, which Raiden Shogun detonates via her Skill for Hyperbloom. Emilie enhances Burning and provides Dendro, while Baizhu heals and boosts Hyperbloom damage based on his HP.",
    members: [
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Triggers Hyperbloom reactions with Elemental Skill.',
        weapons: [ "Dragon's Bane" ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'emilie',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Deals high Dendro damage and supports Burning reactions.',
        weapons: [ 'Lumidouce Elegy', 'Deathmatch' ],
        artifacts: [ '4pc Unfinished Reverie' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
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
        characterId: 'baizhu',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides healing, shields, and buffs team damage.',
        weapons: [ "Jadefall's Splendor", 'Prototype Amber' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Furina Vaporize #2',
    rank: 'SS',
    description: "The Vaporize DMG of whole team is maximized by Kazuha's buffs, Xiangling and Bennett allow the team to trigger Vaporize all the time. Furina acts as field DPS trigger Vaporize with Xiangling's Pyro, while Kazuha provides DMG buffs and resistance shred, and Bennett heals and buffs ATK.",
    members: [
      {
        characterId: 'furina',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Triggers massive Vaporize damage with Elemental Skill.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Pyro Support. Heals and provides a massive ATK buff.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Furina Raiden-Core #1',
    rank: 'SS',
    description: "Furina and Yelan provide continuous off-field Hydro application for Electro-Charged reactions, while Jean heals and shreds RES with Viridescent Venerer. Maximize Raiden Shogun's Elemental Burst damage using Yelan and Furina's off-field Hydro application and DMG buffs, while Jean enables Furina's buff stacks and provides healing.",
    members: [
      {
        characterId: 'raiden-shogun',
        role: 'Main DPS',
        roleDesc: 'Electro Main DPS. Deals high Electro damage and restores energy for the team.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
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
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'jean',
        role: 'Support',
        roleDesc: 'Anemo Support. Instantly heals the entire party and shreds resistances.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'ATK%', 'ATK', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Furina Aggravate-Hyperbloom Team',
    rank: 'SS',
    description: "Clorinde drives Aggravate and Hyperbloom with Furina's off-field Hydro and Nahida's Dendro, while Baizhu provides healing and shields. Maximize Clorinde's Electro DMG through Aggravate and Hyperbloom, enabled by Furina's continuous Hydro application and Nahida's Dendro linking, with Baizhu sustaining the team.",
    members: [
      {
        characterId: 'clorinde',
        role: 'Main DPS',
        roleDesc: 'Electro Main DPS. Infuses Electro on Normal Attacks and deals fast damage.',
        weapons: [ 'Absolution', 'The Black Sword' ],
        artifacts: [ '4pc Fragment of Harmonious Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application and party-wide DMG buffs.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies Dendro off-field and shares EM.',
        weapons: [ 'A Thousand Floating Dreams', 'Wandering Evenstar' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'Elemental Mastery',
          'CRIT DMG',
          'CRIT Rate',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'baizhu',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides healing and shields, and buffs Dendro reactions.',
        weapons: [ 'Prototype Amber', 'Favonius Codex' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Furina Bloom #1',
    rank: 'SS',
    description: 'Furina acts as Sub DPS in the team. Dendro from Baizhu reacts with Hydro from Neuvillette and Furina to trigger Bloom, producing Dendro Cores.',
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
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
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
    name: 'Furina Geo Team',
    rank: 'SS',
    description: "Noelle's DMG is maximized by Gorou's DEF and elemental DMG/Geo CRIT DMG buffs. Furina provides DMG increase via her Burst while draining HP which is healed by the team.",
    members: [
      {
        characterId: 'noelle',
        role: 'Main DPS',
        roleDesc: 'Geo Main DPS. Deals massive Geo damage on-field and heals the team.',
        weapons: [ 'Redhorn Stonethresher', 'Whiteblind' ],
        artifacts: [ '4pc Marechaussee Hunter', '4pc Husk of Opulent Dreams' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge' ]
      },
      {
        characterId: 'albedo',
        role: 'Sub DPS',
        roleDesc: 'Geo Sub DPS. Provides consistent off-field Geo damage.',
        weapons: [ 'Cinnabar Spindle', 'Harbinger of Dawn' ],
        artifacts: [ '4pc Husk of Opulent Dreams' ],
        substats: [ 'DEF%', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      },
      {
        characterId: 'gorou',
        role: 'Support',
        roleDesc: 'Geo Support. Buffs team DEF, Geo DMG, and Geo CRIT DMG.',
        weapons: [ 'Favonius Warbow' ],
        artifacts: [ '4pc The Exile' ],
        substats: [ 'DEF%', 'DEF', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Support',
        roleDesc: 'Hydro Support. Provides off-field Hydro damage and party-wide DMG buffs.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Furina Bloom #2',
    rank: 'SS',
    description: "Furina acts as an on-field driver, triggering Bloom with off-field Hydro from Nilou and Furina's Skill, while Nahida applies Dendro and Baizhu heals. Nilou's passive converts cores into Bountiful Cores for massive Rupture damage. Trigger Bloom to create Bountiful Cores via Nilou's passive, with Furina providing off-field Hydro and DMG buffs, Nahida enabling reactions, and Baizhu increasing Bloom DMG based on his Max HP.",
    members: [
      {
        characterId: 'furina',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Drives reactions on-field with Hydro-infused attacks.',
        weapons: [ 'Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.',
        weapons: [ 'A Thousand Floating Dreams', 'Sacrificial Fragments' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'nilou',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Enables Bountiful Cores and provides off-field Hydro application.',
        weapons: [ 'Key of Khaj-Nisut', "The Dockhand's Assistant" ],
        artifacts: [ "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow" ],
        substats: [ 'HP%', 'HP', 'Elemental Mastery', 'CRIT DMG' ]
      },
      {
        characterId: 'baizhu',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides healing and shields, and buffs Bloom reaction damage.',
        weapons: [ 'Prototype Amber', 'Favonius Codex' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
