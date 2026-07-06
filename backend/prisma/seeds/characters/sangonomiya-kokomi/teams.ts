export const teams = [
  {
    name: 'Kokomi Electro-Charged Team',
    rank: 'A',
    description: 'Kokomi drives Electro-Charged reactions with Fischl and Beidou, while Kazuha provides elemental damage bonus, crowd control, VV shred and damage bonus.\n' +
      '\n' +
      "Maximize Electro-Charged damage using Kazuha's C2 bonus and consistent off-field Electro application from Fischl and Beidou.\n" +
      '\n' +
      'Team composition: Sangonomiya Kokomi (Hydro Main DPS), Fischl (Electro Sub DPS), Beidou (Electro Sub DPS), Kaedehara Kazuha (Anemo Support)',
    members: [
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Main DPS',
        roleDesc: 'Main DPS and driver. Max HP Hydro damage triggers Electro-Charged with Electro.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Oz provides continuous off-field Electro application to trigger Electro-Charged.',
        weapons: [ 'Skyward Harp', 'The Stringless' ],
        artifacts: [ '4pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'beidou',
        role: 'Sub DPS',
        roleDesc: 'Burst provides off-field Electro application to constantly trigger Electro-Charged.',
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '2pc Noblesse Oblige + 2pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, applies crowd control, provides DMG buff, reduces enemy resistance with Viridescent Venerer.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Vaporize Team #1',
    rank: 'SS',
    description: 'Kokomi acts as a Sub DPS, applying Hydro to enable Vaporize for Hu Tao. Kazuha (C2) provides DMG bonus and resistance shred. Bennett offers ATK buff and healing.\n' +
      '\n' +
      "Maximizes Vaporize damage by using Kokomi's consistent Hydro application and Kazuha's DMG bonus and resistance shred, while Bennett provides ATK buff and healing to sustain the team.\n" +
      '\n' +
      'Team composition: Hu Tao (Pyro Main DPS), Sangonomiya Kokomi (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)',
    members: [
      {
        characterId: 'hu-tao',
        role: 'Main DPS',
        roleDesc: 'Main DPS. HP changes amplify Vaporize damage. Uses Skill to convert HP to ATK.',
        weapons: [ 'Staff of Homa', 'Deathmatch' ],
        artifacts: [ '4pc Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery', 'ATK%' ]
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Deals DMG, reacts with Pyro. Applies Hydro status with Skill and Burst as normal.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides massive ATK buff and healing through Burst.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides Element DMG, reduces enemy resistance with Viridescent Venerer.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Hyperbloom Team',
    rank: 'SS',
    description: 'A powerful Hyperbloom team with Kokomi on the on-field driver, Nahida for Dendro application, Raiden Shogun for triggering reactions, and Kazuha for grouping and buffs.\n' +
      '\n' +
      "Kokomi drives the team with her Normal Attacks and Elemental Skill to create Dendro Cores, which are then triggered by Raiden Shogun's Elemental Skill to produce Hyperblooms. Nahida applies Dendro and boosts reactions, while Kazuha groups enemies and provides DMG buffs.\n" +
      '\n' +
      'Team composition: Sangonomiya Kokomi (Hydro Main DPS), Nahida (Dendro Sub DPS), Raiden Shogun (Electro Sub DPS), Kaedehara Kazuha (Anemo Support)',
    members: [
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Main DPS',
        roleDesc: 'Main DPS and driver. continuous Hydro attacks react with Dendro to create Dendro Cores via Skill and Normal Attacks to trigger Hyperbloom.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'Elemental Mastery', 'ATK%' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Elemental Skill triggers Electro-Charged and activates Cores for Hyperbloom.',
        weapons: [ "Dragon's Bane", 'Kitain Cross Spear' ],
        artifacts: [ '4pc Flower of Paradise Lost' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'nahida',
        role: 'Sub DPS',
        roleDesc: "Deals DMG via Elemental Skill which connects up to 8 enemies and deals Dendro DMG. Burst buffs Skill based on teammates' elements. With two Hydro characters, the duration of her Burst is increased.",
        weapons: [ 'A Thousand Floating Dreams', 'Solar Pearl' ],
        artifacts: [ '4pc Deepwood Memories' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'Elemental Mastery',
          'Energy Recharge',
          'ATK%'
        ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies with Skill and Burst, spreads elements, provides DMG buff. Reduces elemental RES with Viridescent Venerer.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Permafrost Team #1',
    rank: 'S',
    description: 'Ayaka and Shenhe apply Cryo, Kokomi applies Hydro to Freeze, Kazuha groups and buffs.\n' +
      '\n' +
      "Use Cryo from Ayaka and Shenhe with Kokomi's Hydro to trigger Freeze, while Kazuha provides crowd control, DMG buff, and resistance shred.\n" +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Shenhe (Cryo Sub DPS), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Main DPS',
        roleDesc: 'Deals high Burst and Normal Attack DMG.',
        weapons: [ 'Mistsplitter Reforged', 'Amenoma Kageuchi' ],
        artifacts: [ '4pc Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'shenhe',
        role: 'Sub DPS',
        roleDesc: 'Provides Cryo bonus to Ayaka and increases DMG of attacks.',
        weapons: [ 'Calamity Queller', 'Favonius Lance' ],
        artifacts: [ "2pc Gladiator's Finale + 2pc Shimenawa's Reminiscence" ],
        substats: [ 'ATK%', 'Energy Recharge', 'HP%', 'CRIT Rate' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides DMG buff, reduces enemy resistance.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Support',
        roleDesc: 'Healer. Skill applies Hydro every 2s, triggers Tenacity of the Millelith.',
        weapons: [ 'Everlasting Moonglow', 'Thrilling Tales of Dragon Slayers' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      }
    ]
  },
  {
    name: 'Kokomi Pure Hydro Team',
    rank: 'S',
    description: "A powerful Hydro focused team leveraging Kokomi's on-field presence and Kazuha's Hydro DMG bonus.\n" +
      '\n' +
      "Maximizes Hydro DMG with consistent Hydro application from Yelan and Xingqiu, amplified by Kazuha's DMG bonus and resistance shred.\n" +
      '\n' +
      'Team composition: Sangonomiya Kokomi (Hydro Main DPS), Yelan (Hydro Sub DPS), Xingqiu (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support)',
    members: [
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Main DPS',
        roleDesc: "Kokomi's Burst DMG scales with Max HP. Heals the team.",
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Provides continuous off-field Hydro application.',
        weapons: [ 'Aqua Simulacra', 'Favonius Warbow' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: 'Deals DMG, continuously applies Hydro to enemies.',
        weapons: [ 'Primordial Jade Cutter', 'Sacrificial Sword' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides DMG buff, reduces enemy Hydro RES with Viridescent Venerer.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Vaporize Team #2',
    rank: 'SS',
    description: 'A powerful team centered on Kokomi as Main DPS, maximizing Vaporize damage with Kazuha (C2) bonus, Xiangling and Kokomi enable consistent Vaporize triggers.\n' +
      '\n' +
      "Kokomi's Hydro application, combined with Xiangling's Pyro, triggers consistent Vaporize. Kazuha boosts damage and shreds resistance, while Bennett provides ATK buff and healing.\n" +
      '\n' +
      'Team composition: Sangonomiya Kokomi (Hydro Main DPS), Xiangling (Pyro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)',
    members: [
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Main DPS',
        roleDesc: 'Triggers Vaporize with Normal Attacks and Elemental Skill damage scales off Max HP.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Provides continuous Pyro application via Pyronado and Guoba, enabling Vaporize for Kokomi.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides massive ATK buff and healing with Bennett Burst.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides Anemo resonance, buffs team damage, and reduces enemy resistance.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Permafrost Team #2',
    rank: 'A',
    description: 'A permafrost team with Kokomi providing consistent Hydro application via her Skill enabling Ayaka and Rosaria to trigger Freeze, constantly. Kazuha groups enemies, applies crowd control, provides DMG buffs, and reduces enemy Anemo RES with Viridescent Venerer.\n' +
      '\n' +
      "Kokomi's Skill applies Hydro every 2 seconds, which reacts with Cryo from Ayaka and Rosaria to trigger Freeze, locking down enemies. Kazuha amplifies damage and groups them.\n" +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Rosaria (Cryo Sub DPS), Sangonomiya Kokomi (Hydro Support), Kaedehara Kazuha (Anemo Support)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Main DPS',
        roleDesc: "Ayaka's high DMG attacks are key, providing Cryo and reacting with Hydro.",
        weapons: [ 'Mistsplitter Reforged', 'Amenoma Kageuchi' ],
        artifacts: [ '4pc Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'rosaria',
        role: 'Sub DPS',
        roleDesc: 'Rosaria provides consistent particles with short cooldown Skill and generates Cryo application for Freeze.',
        weapons: [ 'Skyward Spine', 'Favonius Lance' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Support',
        roleDesc: 'Healer. Skill provides off-field Hydro application via Skill triggering Tenacity of the Millelith to buff the team.',
        weapons: [ 'Everlasting Moonglow', 'Thrilling Tales of Dragon Slayers' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides DMG buff, and reduces enemy resistance with Viridescent Venerer.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Kokomi Vaporize Team #3',
    rank: 'A',
    description: "Kokomi is a Sub DPS in the team. The Vaporize DMG of the whole team is maximized by Kazuha (C2)'s bonus, Yoimiya and Bennett allow the team to trigger Vaporize all the time.\n" +
      '\n' +
      "This team maximizes Vaporize damage by combining Yoimiya's consistent Pyro application with Kokomi's Hydro application, while Kazuha provides DMG buffs and resistance shred, and Bennett provides ATK buff and healing.\n" +
      '\n' +
      'Team composition: Yoimiya (Pyro Main DPS), Sangonomiya Kokomi (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Bennett (Pyro Support)',
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Main DPS whose attacks trigger Vaporize consistently.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Sub DPS',
        roleDesc: 'Applies Hydro with Skill to enable Vaporize for Yoimiya, also heals based on HP.',
        weapons: [ 'Everlasting Moonglow', 'Prototype Amber' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides massive ATK buff and healing with Bennett.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, provides Anemo buff, reduces enemy resistance.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  }
];
