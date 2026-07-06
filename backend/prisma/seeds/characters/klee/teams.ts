export const teams = [
  {
    name: 'Klee Plunge Attack Team #1',
    rank: 'S',
    description: "A plunge attack team focused on Klee's plunging attacks, supported by Furina's Hydro application and damage buff, Citlali's shield and off-field Cryo, and Xianyun's plunge attack buff and healing.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Vaporize with Furina's Hydro.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Hydro application and team-wide DMG buff.',
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Provides off-field Cryo application and shield.',
        weapons: [ "Starcaller's Watch", 'Prototype Amber' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'xianyun',
        role: 'Support',
        roleDesc: 'Provides healing to team members and enables plunging attacks.',
        weapons: [ "Crane's Echoing Call", 'Favonius Codex' ],
        artifacts: [ "2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence" ],
        substats: [ 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Klee Vaporize Team',
    rank: 'S',
    description: 'A powerful Vaporize team built around Klee as the on-field Pyro Main DPS, with Xilonen providing consistent Hydro application and damage buffs, Furina applying off-field Hydro, and Bennett reducing enemy RES and sustaining the team.',
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, which triggers Vaporize with Furina's Hydro.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: "Provides continuous off-field Hydro application and buffs the entire team's DMG through HP fluctuation.",
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides a massive ATK buff and healing, and triggers Pyro resonance.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Provides elemental resistance shred and heals allies, while triggering Crystallize for Scroll set buffs.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Klee Plunge Attack Team #2',
    rank: 'S',
    description: "A plunge attack team centered on Klee's enhanced plunges with support from Citlali, Xilonen, and Xianyun.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's plunging attacks trigger Melt with Citlali's Cryo.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Provides off-field Cryo application and shield.',
        weapons: [ "Starcaller's Watch", 'Prototype Amber' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Provides elemental resistance shred and healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge' ]
      },
      {
        characterId: 'xianyun',
        role: 'Support',
        roleDesc: 'Provides healing and enables plunging attacks.',
        weapons: [ "Crane's Echoing Call", 'Favonius Codex' ],
        artifacts: [ "2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence" ],
        substats: [ 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Klee Vaporization Team #3',
    rank: 'S',
    description: "Klee Vaporization team with Citlali shield and Furina Hydro. Klee triggers Vaporize with Furina's off-field Hydro application, while Citlali shields and applies Cryo, and Bennett buffs ATK and heals.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's Pyro attacks trigger Vaporize with Furina's Hydro.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Hydro application and team-wide DMG buff.',
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Provides shield and off-field Cryo application.',
        weapons: [ "Starcaller's Watch", 'Prototype Amber' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      }
    ]
  },
  {
    name: 'Klee Vaporization Team #2',
    rank: 'S',
    description: 'Klee is a Main DPS in the team. Klee applies Pyro while Furina provides continuous Hydro application for Vaporize reactions. Kazuha enhances damage with swirled control, while Bennett provides healing and ATK buffs.',
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, triggering Vaporize with Furina's Hydro.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Hydro application and team-wide DMG buff.',
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, swirls Pyro and Hydro for resistance shred and damage buffs.',
        weapons: [ 'Freedom-Sworn', "Xiphos' Moonlight" ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'CRIT Rate' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing, triggering Pyro resonance.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Klee Pyro-Overload',
    rank: 'S',
    description: "A high damage Pyro team revolving around Klee's explosion attacks, supported by Xilonen's RES shred, Durin's off-field Pyro and RES reduction, and Bennett's ATK buff and healing.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's normal attacks, charged attacks, and Elemental Skill apply Pyro, which triggers Pyro reactions.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Lavawalker' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides a large ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: "Durin gains [Confirmation of Purity] or [Beacon of Rustication] via Skill and triggering Burn. The former provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
        weapons: [ 'Alatus Alva', 'Wolf-Fang' ],
        artifacts: [ '2pc Noblesse Oblige', '2pc Flower of Paradise Lost' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Provides elemental resistance shred and heals teammates.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Klee Vaporization Team #4',
    rank: 'S',
    description: "This team features Melt reactions with Klee's Pyro and Citlali's Cryo, while Xilonen provides RES shred and Bennett provides ATK buff.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Deals Pyro damage to trigger Melt with Citlali's Cryo.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Marechaussee Hunter' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Provides off-field Cryo application and shield.',
        weapons: [ "Starcaller's Watch", 'Prototype Amber' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Provides elemental resistance shred and healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Klee Overload #2',
    rank: 'S',
    description: "An overload team that maximizes Klee's Pyro damage with Chevreuse's RES shred and ATK buff, Fischl's off-field Electro, and Durin's support.",
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: 'Deals Pyro damage to trigger Overload with Fischl.',
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Lavawalker' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Electro damage via Oz.',
        weapons: [ 'Aqua Simulacra', 'Sacrificial Bow' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: 'Provides healing and buffs team ATK and Electro/Pyro shred when Overload is triggered.',
        weapons: [ 'Sumpwood of Songs', 'Favonius Lance' ],
        artifacts: [ '4pc Song of Days Past' ],
        substats: [ 'HP%', 'CRIT Rate', 'Energy Recharge' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
        weapons: [ 'Alatus Alva', 'Wolf-Fang' ],
        artifacts: [ '2pc Noblesse Oblige', '2pc Flower of Paradise Lost' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Klee Hazard Team',
    rank: 'S',
    description: 'A team leveraging the powerful synergy between Klee, Albedo, and Durin for enhanced damage and support. Bennett provides ATK buffs and healing.',
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Pyro reactions.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Lavawalker' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'albedo',
        role: 'Sub DPS',
        roleDesc: "Provides off-field Geo damage and Geo resonance, while boosting team's Elemental Mastery.",
        weapons: [ 'Uraku Misugiri', 'Wolf-Fang' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'DEF' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides a large ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
        weapons: [ 'Alatus Alva', 'Wolf-Fang' ],
        artifacts: [ '2pc Noblesse Oblige', '2pc Flower of Paradise Lost' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Klee Overload Team #1',
    rank: 'S',
    description: 'An explosive Overload team featuring Klee as the primary damage dealer, Fischl providing consistent Electro application, Durin for off-field Pyro and shred, and Bennett for ATK buffs and healing.',
    members: [
      {
        characterId: 'klee',
        role: 'Main DPS',
        roleDesc: "Deals Pyro damage to trigger Overload with Fischl's Electro.",
        weapons: [ 'Cashflow Supervision', 'The Widsith' ],
        artifacts: [ '4pc Lavawalker' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Electro damage via Oz to trigger Overload.',
        weapons: [ 'Aqua Simulacra', 'Sacrificial Bow' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'durin',
        role: 'Support',
        roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
        weapons: [ 'Alatus Alva', 'Wolf-Fang' ],
        artifacts: [ '2pc Noblesse Oblige', '2pc Flower of Paradise Lost' ],
        substats: [ 'CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%' ]
      }
    ]
  }
];
