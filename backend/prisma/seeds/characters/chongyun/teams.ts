export const teams = [
  {
    name: 'Chongyun Permafrost Team',
    rank: 'SS',
    description: "Ayaka and Chongyun trigger Freeze with Xingqiu's Hydro application. Jean heals and reduces enemy Anemo RES using Viridescent Venerer.\n" +
      '\n' +
      'Ayaka and Chongyun apply Cryo while Xingqiu off-field Hydro application triggers Freeze, locking enemies in place. Jean provides healing and RES shred.\n' +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Chongyun (Cryo Sub DPS), Xingqiu (Hydro Sub DPS), Jean (Anemo Support)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Cryo Main DPS',
        roleDesc: "Deals damage primarily through her Elemental Burst. Her Cryo DMG reacts with Xingqiu's Hydro to trigger Freeze.",
        weapons: [ 'Mistsplitter Reforged', 'Amenoma Kageuchi' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'chongyun',
        role: 'Cryo Sub DPS',
        roleDesc: "His Elemental Skill (requires C2) reduces cooldowns for Ayaka's Elemental Burst. Provides off-field Cryo DMG and helps trigger Freeze.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Hydro Sub DPS',
        roleDesc: "His Elemental Burst applies Hydro continuously, enabling Freeze with the team's Cryo attacks.",
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ 'Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'jean',
        role: 'Anemo Support',
        roleDesc: 'Heals the team and reduces enemy Anemo RES with Viridescent Venerer.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Chongyun Superconduct Team',
    rank: 'S',
    description: "Keqing's DMG is amplified by Superconduct in this team. Chongyun is a Sub DPS.\n" +
      '\n' +
      "Use Chongyun's Cryo application to trigger Superconduct, reducing enemy physical resistance and boosting Keqing's physical damage.\n" +
      '\n' +
      'Team composition: Keqing (Electro Main DPS), Chongyun (Cryo Sub DPS), Diona (Cryo Support), Jean (Anemo Support)',
    members: [
      {
        characterId: 'keqing',
        role: 'Electro Main DPS',
        roleDesc: "Keqing's Heavy Attack DMG is maximized by Superconduct with the aid of Chongyun.",
        weapons: [ 'Mistsplitter Reforged', 'The Black Sword' ],
        artifacts: [ 'Thundering Fury', "Gladiator's Finale" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'chongyun',
        role: 'Cryo Sub DPS',
        roleDesc: "Chongyun's Elemental Skill (requires C2) lowers CDs of Keqing's Elemental Burst. And He provides Cryo DMG at backstage.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Diona's shield provides safe environment for team members, and help boost the recharge of Chongyun's Elemental Burst.",
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ 'Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'jean',
        role: 'Anemo Support',
        roleDesc: 'Jean is a Healer. Jean can assist the team by reduce Anemo Resistance of enemies.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Chongyun Swirl Team',
    rank: 'S',
    description: "A Xiao hypercarry team with Chongyun's CD reduction and Cryo damage, Zhongli's shield, and Jean's battery and healing.\n" +
      '\n' +
      "Xiao's plunge attacks with Chongyun's C2 lowering his Burst CD, Cryo sub-DPS from Chongyun, protected by Zhongli's shield and Jean's healing and battery.\n" +
      '\n' +
      'Team composition: Xiao (Anemo Main DPS), Chongyun (Cryo Sub DPS), Zhongli (Geo Support), Jean (Anemo Support)',
    members: [
      {
        characterId: 'xiao',
        role: 'Anemo Main DPS',
        roleDesc: 'Plunge Attack deals wide AOE Anemo DMG. Elemental Burst enables consecutive plunges.',
        weapons: [ 'Primordial Jade Winged-Spear', 'Deathmatch' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'chongyun',
        role: 'Cryo Sub DPS',
        roleDesc: "Elemental Skill (C2) lowers Xiao's Elemental Burst CD. Provides off-field Cryo DMG.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Geo Support',
        roleDesc: 'Shield provides safe environment. Tenacity of the Millelith set increases ATK.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ 'Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'jean',
        role: 'Anemo Support',
        roleDesc: 'Healer and battery for Xiao. C4 can lower Anemo resistance.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ 'Viridescent Venerer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Chongyun Melting Team',
    rank: 'S',
    description: 'Chongyun enables Melt reactions for Diluc, while Zhongli and Albedo provide shielding, resonance, and damage buffs.\n' +
      '\n' +
      "Use Chongyun's Cryo field to convert Diluc's attacks to Melt-triggering hits, combined with Zhongli's shield and Albedo's off-field damage and Archaic Petra buff.\n" +
      '\n' +
      'Team composition: Diluc (Pyro Main DPS), Chongyun (Cryo Sub DPS), Albedo (Geo Sub DPS), Zhongli (Geo Support)',
    members: [
      {
        characterId: 'diluc',
        role: 'Pyro Main DPS',
        roleDesc: 'Diluc is the main DPS, his DMG is amplified by the Melt reaction in this team.',
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Crimson Witch of Flames' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'chongyun',
        role: 'Cryo Sub DPS',
        roleDesc: "Chongyun's Elemental Skill (requires C2) lowers CDs of Diluc's Elemental Burst. He provides Cryo DMG at backstage.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ 'Blizzard Strayer' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'albedo',
        role: 'Geo Sub DPS',
        roleDesc: 'Albedo pairs with Zhongli to trigger Crystallize resonance, and by using full set of Archaic Petra, picking up crystal can increase corresponding DMG of team members.',
        weapons: [ 'Cinnabar Spindle', 'Harbinger of Dawn' ],
        artifacts: [ 'Archaic Petra' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge', 'DEF' ]
      },
      {
        characterId: 'zhongli',
        role: 'Geo Support',
        roleDesc: "Zhongli's shield provides safe environment for team members, and increase ATK of whole team by using full set of Tenacity of the Millelith.",
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ 'Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
