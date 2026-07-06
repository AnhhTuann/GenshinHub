export const teams = [
  {
    name: 'Eula Physical Team #1',
    rank: 'SS',
    description: "Eula's Burst is maximized by Mika's ATK buff, Physical DMG bonus, and Rosaria's Physical RES reduction. Bennett provides healing and further ATK buff.\n" +
      "Maximize Eula's Burst damage with Mika's Physical DMG and ATK SPD buffs, Rosaria's Physical RES shred (at C6), and Bennett's ATK buff.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: "Eula's Burst is the team's primary damage source.",
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'mika',
        role: 'Support',
        roleDesc: "Mika's Skill increases Attack SPD and Physical DMG for Eula.",
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '4pc Ocean-Hued Clam' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'rosaria',
        role: 'Sub DPS',
        roleDesc: 'Rosaria provides Cryo battery and reduces Physical RES at C6.',
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '2pc Blizzard Strayer + 2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Burst provides massive ATK buff and healing.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Eula Superconduct Team #1',
    rank: 'S',
    description: 'Eula leads a Superconduct team where her Burst is maximized by Superconduct and buffs from Raiden Shogun and Zhongli.\n' +
      "Eula's Elemental Burst deals massive Physical DMG, boosted by Superconduct (from Raiden) and ATK buffs from Zhongli's Tenacity of the Millelith set.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: 'Main source of damage. Burst nuke requires Superconduct and buffs from teammates.',
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Provides Electro for Superconduct, boosts Burst DMG and Energy Recharge via Skill and Burst.',
        weapons: [ 'Engulfing Lightning', '"The Catch"' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'rosaria',
        role: 'Sub DPS',
        roleDesc: "Off-field Burst DMG, cryo battery for Eula. At C6 reduces Physical RES, amplifying Eula's damage.",
        weapons: [ 'Skyward Spine', 'Favonius Lance' ],
        artifacts: [ '2pc Blizzard Strayer + 2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Provides shield for safe gameplay and activates Tenacity of the Millelith to buff team ATK.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Eula Superconduct Team #3',
    rank: 'S',
    description: 'Eula Superconduct team with Beidou and Chongyun for Superconduct, and Zhongli for shielding and ATK buff.\n' +
      "Use Superconduct reactions between Cryo and Electro to reduce Physical RES, boosting Eula's Burst damage. Zhongli's shield and Tenacity of the Millelith provide ATK buffs and safety.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: "Eula's Burst is maximized by Superconduct and aid of teammates.",
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'beidou',
        role: 'Sub DPS',
        roleDesc: "Beidou's Burst provides continuous Electro DMG to trigger Superconduct.",
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '2pc Thundering Fury + 2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'chongyun',
        role: 'Sub DPS',
        roleDesc: "Chongyun's Skill (C2) lowers Eula's Burst CD and provides Cryo DMG.",
        weapons: [ "Wolf's Gravestone", 'Serpent Spine' ],
        artifacts: [ '2pc Blizzard Strayer + 2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: "Zhongli's shield provides safe environment and ATK buff via Tenacity of the Millelith.",
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Eula Superconduct Team #4',
    rank: 'S',
    description: "Eula is a Main DPS in the team. Eula's Elemental Burst is maximized by Superconduct and aid of teammates.\n" +
      "Superconduct reduces enemy Physical RES, boosting Eula's Burst. Raiden Shogun provides Electro application and energy, while Bennett and Diona offer ATK buff and shielding.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: 'Elemental Burst maximized by Superconduct and ATK buffs from Bennett and Noblesse Oblige.',
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Provides Electro for Superconduct, boosts team Energy Recharge and Burst DMG via Elemental Skill.',
        weapons: [ 'Engulfing Lightning', '"The Catch"' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Elemental Burst provides huge ATK buff and healing.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: 'Provides shield and acts as a battery for Eula.',
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ '4pc Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Eula Superconduct',
    rank: 'S',
    description: "Eula is a Main DPS in the team. Eula's Elemental Burst is maximized by Superconduct and aid of teammates.\n" +
      "Superconduct reduces Physical RES, boosting Eula's Physical DMG. Fischl provides off-field Electro for reactions, while Bennett and Diona support with ATK buff, healing, and shields.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: "Eula's Elemental Burst is the core of this team, which is maximized under the effect of Superconduct, ATK Bonus from Bennett and Set Bonus of Noblesse Oblige.",
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: "Fischl's Elemental Skill can provide continuous Electro DMG even at backstage, which works with Cryo-infused Attacks of Eula to trigger Superconduct.",
        weapons: [ 'The Stringless', 'Skyward Harp' ],
        artifacts: [ '4pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: "Diona's shield provides safe environment for team members. Diona acts as the battery of Eula.",
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ '4pc Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Eula Superconduct Team #6',
    rank: 'S',
    description: "Eula is a Main DPS in the team. Eula's Elemental Burst is maximized by Superconduct and aid of teammates.\n" +
      "Superconduct reduces Physical RES, boosting Eula's Physical Burst damage. Bennett provides ATK buff and healing, Diona shields and batteries Eula, Beidou applies off-field Electro for Superconduct.",
    members: [
      {
        characterId: 'eula',
        role: 'Main DPS',
        roleDesc: "Eula's Elemental Burst is the core of this team, which is maximized under the effect of Superconduct, ATK Bonus from Bennett and Set Bonus of Noblesse Oblige.",
        weapons: [ 'Song of Broken Pines', 'Serpent Spine' ],
        artifacts: [ '4pc Pale Flame' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'beidou',
        role: 'Sub DPS',
        roleDesc: "Beidou's Elemental Burst can provide continuous Electro DMG even at backstage, which works with Cryo-infused Attacks of Eula to trigger Superconduct.",
        weapons: [ 'Skyward Pride', 'Serpent Spine' ],
        artifacts: [ '2pc Thundering Fury + 2pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: "Diona's shield provides safe environment for team members. Diona acts as the battery of Eula.",
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ '4pc Maiden Beloved' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
