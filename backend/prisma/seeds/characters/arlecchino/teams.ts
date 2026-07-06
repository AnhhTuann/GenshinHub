export const teams = [
  {
    name: 'Arlecchino Vaporize Team #2',
    rank: 'SS',
    description: "Arlecchino is a Main DPS in the team. Leverage Arlecchino's Bond of Life to convert attacks to pyro/pyro element, enabling Vaporize reactions with Furina's element hydro/hydro application. Xilonen reduces enemy RES and heals, while Bennett provides ATK buff and additional healing.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'furina',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.',
        weapons: [ 'Splendor of Tranquil Waters', 'Favonius Sword' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Arlecchino Vaporize Team #1',
    rank: 'SS',
    description: "A top-tier team centered on element pyro + hydro = Vaporize reactions, leveraging Arlecchino's high Bond of Life scaling damage. Arlecchino triggers Vaporize with Yelan's off-field hydro/hydro application, while Xilonen shreds RES and Bennett provides massive ATK buffs and healing.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and enables Vaporize reactions.',
        weapons: [ 'Aqua Simulacra', 'Favonius Warbow' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Arlecchino Overload Team #2',
    rank: 'SS',
    description: "Arlecchino Overload team with Chevreuse to reduce Pyro/Electro RES, Mavuika for off-field Pyro, and Ororon for extra damage. Leverage Overload to trigger Chevreuse's RES shred and ATK buff, while Mavuika and Ororon deal off-field damage.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'mavuika',
        role: 'Sub DPS',
        roleDesc: 'Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.',
        weapons: [ 'A Thousand Blazing Suns', 'Serpent Spine' ],
        artifacts: [ '4pc Obsidian Codex' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'ororon',
        role: 'Support',
        roleDesc: 'Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.',
        weapons: [ 'Elegy for the End', 'Favonius Warbow' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
        weapons: [ 'Staff of Homa', 'Favonius Lance' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Arlecchino Melting Team #1',
    rank: 'SS',
    description: "A high-damage Melt team centered on Arlecchino's Pyro attacks, supported by Citlali's shield and Cryo application for Melt reactions, while Xilonen shreds enemy RES and heals. Bennett offers a massive ATK buff and healing through his Burst.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Cryo Shield & Support. Provides shield and Cryo application for Melt reactions.',
        weapons: [ "Starcaller's Watch", 'Thrilling Tales of Dragon Slayers' ],
        artifacts: [ '4pc Instructor' ],
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
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Arlecchino Pure Pyro Team #1',
    rank: 'SS',
    description: "A pure element pyro + pyro team focused on maximizing Arlecchino's damage through buffs and resistance shred from Kazuha, Xilonen, and Bennett. Utilizes Kazuha's grouping and RES shred to further reduce enemy resistance.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.',
        weapons: [ 'Freedom-Sworn', 'Favonius Sword' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Arlecchino Pure Pyro Team #2',
    rank: 'SS',
    description: "Arlecchino Main DPS with Chiori sub DPS, Xilonen support, Bennett healer/buffer. Leverage Arlecchino's high Pyro damage with Bond of Life, supported by Bennett's ATK buff, Xilonen's RES shred and healing, and Chiori's off-field Geo damage.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'chiori',
        role: 'Sub DPS',
        roleDesc: 'Geo Sub DPS. Deals high off-field Geo damage via her dolls.',
        weapons: [ 'Uraku Misugiri', 'Wolf-Fang' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'ATK%' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ '4pc Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Arlecchino Melting Team #2',
    rank: 'SS',
    description: "A high-damage Melt team centered on Arlecchino's Pyro attacks, supported by Citlali's shield and Cryo application, Xilonen's RES shred and healing, and Kazuha's grouping and damage buffs.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ 'Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'xilonen',
        role: 'Support',
        roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
        weapons: [ 'Peak Patrol Song', 'Favonius Sword' ],
        artifacts: [ 'Scroll of the Hero of Cinder City' ],
        substats: [ 'DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'citlali',
        role: 'Support',
        roleDesc: 'Cryo Shield & Support. Provides shield and Cryo application for Melt reactions.',
        weapons: [ "Starcaller's Watch", 'Thrilling Tales of Dragon Slayers' ],
        artifacts: [ 'Instructor' ],
        substats: [
          'Elemental Mastery',
          'Energy Recharge',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.',
        weapons: [ 'Freedom-Sworn', 'Favonius Sword' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Arlecchino Overload Team #1',
    rank: 'SS',
    description: "An Overload team with Arlecchino main DPS, Fischl for off-field Electro, Chevreuse for RES shred and healing, and Bennett for ATK buffs. Trigger Overload to reduce enemies' Pyro and Electro RES via Chevreuse's passive, and use ATK buffs from Chevreuse and Bennett to maximize Arlecchino's damage.",
    members: [
      {
        characterId: 'arlecchino',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS. Infuses attacks with Pyro based on Bond of Life scaling.',
        weapons: [ "Crimson Moon's Semblance", 'Deathmatch' ],
        artifacts: [ '4pc Fragment of Harmonic Whimsy' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Electro Sub DPS. Provides continuous Electro application off-field, triggering reactions.',
        weapons: [ 'Aqua Simulacra', 'Sacrificial Bow' ],
        artifacts: [ '4pc Golden Troupe' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
        weapons: [ 'Mistsplitter Reforged', 'The Alley Flash' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
        weapons: [ 'Staff of Homa', 'Favonius Lance' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'Energy Recharge' ]
      }
    ]
  }
];
