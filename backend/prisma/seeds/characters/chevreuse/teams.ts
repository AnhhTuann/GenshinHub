export const teams = [
  {
    name: 'Chevreuse Overload Team #1',
    rank: 'SS',
    description: "Maximize team DMG with Chevreuse's Overload RES shred and ATK buff. Cyno drives with infused Electro attacks, Xiangling provides off-field Pyro DMG, and Bennett offers ATK buff and healing.",
    members: [
      {
        characterId: 'cyno',
        role: 'Main DPS',
        roleDesc: 'Main DPS. Runs standard normal ATK with Electro DMG. Maximize stats for continuous combat.',
        weapons: [ 'Staff of the Scarlet Sands', 'Staff of Homa' ],
        artifacts: [ '4pc Gilded Dreams' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'ATK%',
          'Energy Recharge',
          'Elemental Mastery'
        ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'ATK%',
          'Energy Recharge',
          'Elemental Mastery'
        ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Support/Healer. Bennett provides huge ATK buff and healing.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
        weapons: [ 'Favonius Lance', 'Black Tassel' ],
        artifacts: [ '4pc Song of Days Past' ],
        substats: [ 'HP%', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Chevreuse Overload Team #2',
    rank: 'SS',
    description: "Maximize team DMG by using Chevreuse's passive to reduce element resistance when Overload is triggered, while Bennett provides ATK buff and healing. Raiden Shogun's Elemental Skill boosts Energy Recharge and Elemental Burst DMG of teammates, and she coordinates with Xiangling's Pyro element to trigger Overload.",
    members: [
      {
        characterId: 'raiden-shogun',
        role: 'Main DPS',
        roleDesc: "Main DPS. Runs on-field Electro attacks, fills team's energy with energy restoration. Triggers Overload with coordinated Pyro.",
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'xiangling',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [
          'CRIT DMG',
          'CRIT Rate',
          'ATK%',
          'Energy Recharge',
          'Elemental Mastery'
        ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
        weapons: [ 'Favonius Lance', 'Black Tassel' ],
        artifacts: [ '4pc Song of Days Past' ],
        substats: [ 'HP%', 'Energy Recharge' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Support/Healer. Bennett provides huge ATK buff and healing.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      }
    ]
  },
  {
    name: 'Chevreuse Overload Team #3',
    rank: 'SS',
    description: "Chevreuse is a Support/Healer in the team. The team's DMG is maximized by Chevreuse. Chevreuse's passive reduces Pyro and Electro RES when Overload is triggered, maximizing team DMG. Her Skill provides an ATK buff to Pyro and Electro characters based on her Max HP.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Yoimiya is the main DPS, her DMG is amplified by Chevreuse in this team.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Sub DPS. Triggers Electro attacks to enable Overload.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Support/Healer. Bennett provides huge ATK buff and healing.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'Energy Recharge', 'HP%' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
        weapons: [ 'Favonius Lance', 'Black Tassel' ],
        artifacts: [ '4pc Song of Days Past' ],
        substats: [ 'HP%', 'Energy Recharge' ]
      }
    ]
  }
];
