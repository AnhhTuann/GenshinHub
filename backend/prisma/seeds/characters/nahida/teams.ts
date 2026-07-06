export const teams = [
  {
    name: 'Nahida Catalyze Team #3',
    rank: 'S',
    description: "Nahida is the Main DPS with maximized Elemental Mastery to boost her DMG and Catalyze reactions. Beidou and Fischl provide off-field Electro for Aggravate reactions. Zhongli's shield offers safety and can use Archaic Petra for bonus DMG.",
    members: [
      {
        characterId: 'nahida',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Deals high on-field Dendro damage and drives Catalyze.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'beidou',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Provides off-field Electro damage and damage reduction via Burst.',
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Applies off-field Electro continuously.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Shield Support. Strong shield protection, can buff Geo/Electro with Archaic Petra.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Archaic Petra' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Nahida Overload-Catalyze Team',
    rank: 'S',
    description: "Nahida is the Main DPS. Raiden Shogun and Thoma provide continuous Electro and Pyro attachment. Nahida's Normal Attacks trigger Overload, Spread, and Aggravate. Use Nahida's Skill to apply Dendro, then Electro/Pyro from Raiden and Thoma trigger Overload, Spread, and Aggravate. Kuki triggers Hyperbloom from Dendro cores, maximizing reaction damage.",
    members: [
      {
        characterId: 'nahida',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Applies Dendro with Skill and drives reactions using Normal Attacks.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Triggers Quicken and Aggravate reactions.',
        weapons: [ "Dragon's Bane" ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'kuki-shinobu',
        role: 'Support',
        roleDesc: 'Electro Support. Heals and triggers Hyperbloom from Dendro cores.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [ 'Elemental Mastery', 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'thoma',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides shield and triggers Burning/Burgeon/Overload reactions.',
        weapons: [ 'Kitain Cross Spear' ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Energy Recharge', 'Elemental Mastery', 'HP%' ]
      }
    ]
  },
  {
    name: 'Nahida Hyperbloom Team #2',
    rank: 'S',
    description: 'Razor triggers multiple reactions (Overloaded, Electro-Charged, Superconduct, Aggravate, Hyperbloom) with his Burst while Nahida applies Dendro, Xingqiu applies Hydro, and Bennett provides ATK buff and healing.',
    members: [
      {
        characterId: 'razor',
        role: 'Main DPS',
        roleDesc: 'Electro Main DPS. Drives multiple reactions on-field using Burst.',
        weapons: [ 'Serpent Spine', "Wolf's Gravestone" ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [ 'Energy Recharge', 'Elemental Mastery', 'HP%' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies Dendro off-field to create Bloom cores.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application to create Bloom cores.',
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Pyro Support. Provides ATK buff, healing, and Pyro application for Overload/Burgeon.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Nahida Catalyze Team #2',
    rank: 'S',
    description: "Nahida (Dendro) application with Cyno (Electro) for high damage. Zhongli provides shielding and ATK buff. Maximize team damage through Catalyze reactions. Nahida's Tri-Karma Purification benefits from two Electro characters, reducing its trigger interval.",
    members: [
      {
        characterId: 'cyno',
        role: 'Main DPS',
        roleDesc: 'Electro Main DPS. Drives Aggravate reactions on-field during Burst.',
        weapons: [ 'Staff of the Scarlet Sands', 'Deathmatch' ],
        artifacts: [ '4pc Thundering Fury' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Deals off-field Electro damage for Catalyze.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies Dendro off-field and shares EM with the active character.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Shield Support. Provides shield and RES shred.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Nahida Bloom Team',
    rank: 'SS',
    description: "Primary Dendro applicator as Elemental Mastery. Nilou triggers bountiful blooms. Nahida's Elemental Skill applies Dendro to trigger Bloom, Yelan/Xingqiu applies Hydro, and Kokomi triggers healing.",
    members: [
      {
        characterId: 'nahida',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Continuous Dendro application on-field.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'nilou',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Replaces Bloom cores with Bountiful Cores for instant massive damage.',
        weapons: [ 'Key of Khaj-Nisut', "The Dockhand's Assistant" ],
        artifacts: [ "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow" ],
        substats: [ 'HP%', 'HP', 'Energy Recharge', 'CRIT DMG' ]
      },
      {
        characterId: 'kokomi',
        role: 'Support',
        roleDesc: 'Hydro Support. Heals the team and applies Hydro off-field.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'traveler',
        role: 'Support',
        roleDesc: 'Dendro Support. Provides Dendro Resonance and off-field Dendro application.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [ 'Energy Recharge', 'Elemental Mastery', 'HP%' ]
      }
    ]
  },
  {
    name: 'Nahida Hyperbloom Team #1',
    rank: 'SS',
    description: "Hyperbloom team with Nahida applying Dendro, Kokomi creating Dendro cores, Raiden Shogun triggering Hyperbloom, and Kazuha providing support and Elemental RES shred. Raiden Shogun's Elemental Skill triggers Hyperbloom on Dendro Cores created by Nahida and Kokomi. Kazuha groups enemies and buffs team DMG.",
    members: [
      {
        characterId: 'kokomi',
        role: 'Main DPS',
        roleDesc: 'Hydro Main DPS. Applies Hydro on-field, triggers Bloom, and heals the team.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'HP', 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Applies off-field Dendro to create Bloom cores.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Electro trigger. Triggers Hyperbloom on Dendro cores off-field.',
        weapons: [ "Dragon's Bane" ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, shreds Hydro/Electro resistance, and buffs team damage.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Nahida Melt Team',
    rank: 'S',
    description: 'Nahida applies Dendro to trigger Burning with Pyro from Bennett, then Ganyu/Rosaria Melt on burning enemies for massive damage.',
    members: [
      {
        characterId: 'ganyu',
        role: 'Main DPS',
        roleDesc: 'Cryo Main DPS. Triggers Melt on burning targets.',
        weapons: [ "Hunter's Path", 'Hamayumi' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: 'Dendro Sub DPS. Maintains Burning status on enemies via Tri-Karma Purification.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Shield Support. Protects Ganyu during Charged Attacks.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Pyro Support. Applies Pyro to trigger Burning, heals, and buffs ATK.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Nahida Catalyze Team #1',
    rank: 'SS',
    description: 'Nahida maximizes Elemental Mastery for personal DMG and Catalyze. Two Electro characters provide off-field Electro for Aggravate reactions, and two Dendro units reduce Tri-Karma Purification interval.',
    members: [
      {
        characterId: 'nahida',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Maximizes EM for personal damage and Catalyze reactions.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Applies off-field Electro continuously.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'yae-miko',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Provides off-field Electro damage for Aggravate.',
        weapons: [ "Kagura's Verity", 'The Widsith' ],
        artifacts: [ '2pc Golden Troupe + 2pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Shield Support. Provides shield and Geo Resonance.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Archaic Petra' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Nahida Rainbow Hyperbloom Team',
    rank: 'SS',
    description: "A versatile team that uses Nahida's Dendro with Yelan's Hydro to create Bloom cores, then triggers Hyperbloom with Kuki Shinobu's Electro or Burgeon with Thoma's Pyro. Nahida applies Dendro with her Skill while Yelan provides off-field Hydro to create Bloom cores. Kuki (high Elemental Mastery) or Thoma then trigger Hyperbloom or Burgeon for massive damage.",
    members: [
      {
        characterId: 'nahida',
        role: 'Main DPS',
        roleDesc: 'Dendro Main DPS. Applies Dendro and triggers reactions on-field.',
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'ATK%',
          'Energy Recharge'
        ]
      },
      {
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro and increases active character damage.',
        weapons: [ 'Aqua Simulacra', 'Favonius Warbow' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'HP%', 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'kuki-shinobu',
        role: 'Support',
        roleDesc: 'Electro Support. Heals the team and triggers Hyperbloom.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [ 'Elemental Mastery', 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'thoma',
        role: 'Support',
        roleDesc: 'Pyro Support. Triggers Burgeon reactions on Dendro cores.',
        weapons: [ 'Kitain Cross Spear' ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Energy Recharge', 'Elemental Mastery', 'HP%' ]
      }
    ]
  }
];
