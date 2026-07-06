export const teams = [
  {
    name: 'Xinyan Overload',
    rank: 'A',
    description: "Xinyan's Pyro attacks combine with Electro from Fischl to trigger frequent Overload reactions, dealing AoE Pyro DMG. Kazuha provides Anemo grouping and resistance shred, while Bennett offers ATK buffs and healing.",
    members: [
      {
        characterId: 'xinyan',
        role: 'Main DPS',
        roleDesc: "Xinyan's Skill reduces enemy DEF and provides a shield to boost DPS. Build with DEF% or ATK% to maximize shield strength and damage.",
        weapons: [ "Wolf's Gravestone", 'Whiteblind' ],
        artifacts: [ '4pc Retracing Bolide' ],
        substats: [ 'DEF%', 'ATK%', 'CRIT Rate', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: "Fischl's Skill provides continuous off-field Electro application to trigger Overload, significantly boosts damage.",
        weapons: [ 'Skyward Harp', 'The Stringless' ],
        artifacts: [ '4pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Burst provides massive ATK buff and healing, enabling the team to deal more damage and survive.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Kazuha groups enemies, provides Anemo crowd control, DMG buffs, and reduces enemy Pyro and Electro resistance with Swirl.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Xinyan Physical Team #2',
    rank: 'A',
    description: "A physical team centered around Razor with Electro and Cryo for Superconduct. Xinyan provides shields, Qiqi heals and applies Cryo, and Bennett buffs ATK and heals. Razor's physical damage is maximized by triggering Superconduct to reduce enemy physical resistance. Xinyan provides a shield for safety, Qiqi applies Cryo off-field, and Bennett enhances ATK and healing.",
    members: [
      {
        characterId: 'razor',
        role: 'Main DPS',
        roleDesc: 'Main physical DPS, C4 reduces enemy DEF with Elemental Skill.',
        weapons: [ "Wolf's Gravestone", 'Prototype Archaic' ],
        artifacts: [ "4pc Gladiator's Finale" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Elemental Burst provides a large ATK buff and healing.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'xinyan',
        role: 'Support',
        roleDesc: 'Provides a shield for safe play.',
        weapons: [ "Wolf's Gravestone", 'Whiteblind' ],
        artifacts: [ '2pc Crimson Witch of Flames', '2pc Retracing Bolide' ],
        substats: [ 'Energy Recharge', 'DEF%', 'CRIT DMG', 'CRIT Rate' ]
      },
      {
        characterId: 'qiqi',
        role: 'Support',
        roleDesc: 'Elemental Skill applies Cryo continuously and heals the team.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Maiden Beloved' ],
        substats: [ 'ATK%', 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Xinyan Physical Team #1',
    rank: 'A',
    description: "A physical team centered on Eula, with Cryo and Electro reactions to reduce physical resistance via Superconduct. Maximize Eula's physical damage by using Superconduct to reduce enemy physical resistance, while Xinyan provides shielding and Bennett provides ATK buff and healing.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: "Eula's physical damage is boosted by Superconduct.",
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'beidou',
        role: 'Sub DPS',
        roleDesc: "Beidou's Burst provides continuous Electro DMG off-field to trigger Superconduct.",
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '2pc Thundering Fury', '2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'xinyan',
        role: 'Support',
        roleDesc: "Xinyan's shield provides a safe environment for team members.",
        weapons: [ "Wolf's Gravestone", 'Whiteblind' ],
        artifacts: [ '2pc Crimson Witch of Flames', '2pc Retracing Bolide' ],
        substats: [ 'Energy Recharge', 'DEF%', 'CRIT DMG', 'CRIT Rate' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Burst provides huge ATK buff and healing.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
