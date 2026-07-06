export const teams = [
  {
    name: 'Yoimiya Melt Team #1',
    rank: 'S',
    description: "An Melt team that maximizes Yoimiya's damage through Melt reactions. Ganyu's Burst applies Cryo consistently, while Kazuha provides Elemental DMG Bonus, and resistance shred. Diona offers shielding and healing for safety. Utilize Ganyu's Elemental Burst to apply Cryo while Yoimiya triggers Melt with her Normal Attacks. Kazuha enhances team damage and controls enemies, while Diona provides support.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Triggers Melt with her Normal Attacks.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'ganyu',
        role: 'Sub DPS',
        roleDesc: 'Applies Cryo consistently off-field via Burst.',
        weapons: [ "Amos' Bow", 'The Stringless' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'diona',
        role: 'Support',
        roleDesc: 'Shielding, healing, and battery support for Ganyu.',
        weapons: [ 'Sacrificial Bow', 'Favonius Warbow' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Reduces Cryo and Pyro resistance, buffs Elemental DMG.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      }
    ]
  },
  {
    name: 'Yoimiya Vaporize Team #2',
    rank: 'S',
    description: 'The Normal/ATK DMG Output of Ayato and Yoimiya is maximized by Vaporize and Melt, while Yun Jin + Zhongli provides a safe environment and ATK increase through Tenacity of the Millelith. Maximizes Normal/ATK DMG of both Ayato and Yoimiya through Vaporize and Melt, with Yun Jin + Zhongli providing shield and ATK buff.',
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Pyro Main DPS, triggers Vaporize with her Normal Attacks.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'ayato',
        role: 'Main DPS',
        roleDesc: 'Enables Vaporize and handles multi-target scenarios with his Hydro attacks.',
        weapons: [ 'Haran Geppaku Futsu', 'The Black Sword' ],
        artifacts: [ '4pc Echoes of an Offering' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Provides shields and buffs team ATK.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'yunjin',
        role: 'Support',
        roleDesc: 'Buffs Normal Attack DMG for both Ayato and Yoimiya.',
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '4pc Husk of Opulent Dreams' ],
        substats: [ 'DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Overload Team #3',
    rank: 'S',
    description: "Frequent Overload reactions, amplified by Chevreuse's resistance shred and ATK buff, with Bennett support. Utilize Chevreuse's passive to reduce Pyro and Electro RES after Overload, while her Skill provides an ATK buff. Yoimiya's on-field Pyro attacks combine with Raiden Shogun's off-field Electro to trigger constant Overload.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'On-field driver triggering Overload.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Constant off-field Electro application with her Skill.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'Elemental Mastery', 'Energy Recharge', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK buff and healing support.',
        weapons: [ 'Aquila Favonia', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'chevreuse',
        role: 'Support',
        roleDesc: 'Shreds Pyro/Electro resistance and buffs team ATK upon Overload.',
        weapons: [ 'Favonius Lance', 'Black Tassel' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Vaporize Team #1',
    rank: 'SS',
    description: "Yoimiya is the main DPS, her DMG is amplified by Vaporization in this team. Yoimiya's Pyro damage is boosted by Vaporization reactions enabled by Xingqiu's Hydro application, while Yun Jin increases her Normal Attacks and Zhongli provides shielding and team ATK buff.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Main DPS driving the single-target Pyro damage.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery' ]
      },
      {
        characterId: 'xingqiu',
        role: 'Sub DPS',
        roleDesc: 'Provides off-field Hydro application to enable Vaporize.',
        weapons: [ 'Sacrificial Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Provides a safe environment with shield and team ATK buff.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'yunjin',
        role: 'Support',
        roleDesc: 'Provides significant Normal Attack DMG and Speed buffs.',
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '4pc Husk of Opulent Dreams' ],
        substats: [ 'DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Overload Team #2',
    rank: 'A',
    description: "Yoimiya rapid-fire Pyro attacks trigger Overload with Fischl's off-field Electro application, while Yun Jin and Zhongli provide buffs and protection. Yoimiya's Pyro attacks trigger Overload with Fischl's off-field Electro, while Yun Jin and Zhongli shield and buff.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Main Pyro DPS triggering Overload.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'fischl',
        role: 'Sub DPS',
        roleDesc: 'Off-field Electro application via Oz.',
        weapons: [ 'Skyward Harp', 'The Stringless' ],
        artifacts: [ '4pc Thundering Fury' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Strong shield and ATK buffs.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'yunjin',
        role: 'Support',
        roleDesc: 'Normal Attack DMG and Speed buffs.',
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '4pc Husk of Opulent Dreams' ],
        substats: [ 'DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Vaporize Team #3',
    rank: 'SS',
    description: "Yoimiya's Normal ATK DMG is maximized by Vaporization and ATK/SPD buff from Yun Jin.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Main Pyro DPS triggering Vaporize.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'yelan',
        role: 'Sub DPS',
        roleDesc: 'Off-field Hydro application and active character damage buff.',
        weapons: [ 'Aqua Simulacra', 'The Stringless' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [ 'HP%', 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'zhongli',
        role: 'Support',
        roleDesc: 'Shield and team ATK buff support.',
        weapons: [ 'Staff of Homa', 'Black Tassel' ],
        artifacts: [ '4pc Tenacity of the Millelith' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      },
      {
        characterId: 'yunjin',
        role: 'Support',
        roleDesc: 'Buffs Normal Attack speed and damage.',
        weapons: [ 'Favonius Lance' ],
        artifacts: [ '4pc Husk of Opulent Dreams' ],
        substats: [ 'DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Overload Team #1',
    rank: 'S',
    description: "Yoimiya's on-field Pyro attacks trigger Overload reactions with Raiden Shogun's off-field Electro application. Kazuha provides crowd control and buffs, while Bennett heals and boosts ATK. Yoimiya's damage is boosted by Overload reactions enabled by Raiden Shogun's Skill, while Kazuha provides crowd control and buffs, and Bennett heals and boosts ATK.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Main Pyro DPS.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'raiden-shogun',
        role: 'Sub DPS',
        roleDesc: 'Off-field Electro application and burst support.',
        weapons: [ 'Engulfing Lightning', 'The Catch' ],
        artifacts: [ '4pc Emblem of Severed Fate' ],
        substats: [
          'Energy Recharge',
          'Elemental Mastery',
          'CRIT Rate',
          'CRIT DMG'
        ]
      },
      {
        characterId: 'kazuha',
        role: 'Support',
        roleDesc: 'Groups enemies, decreases resistances, and buffs DMG.',
        weapons: [ 'Freedom-Sworn', 'Iron Sting' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'ATK Buff and healing support.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  },
  {
    name: 'Yoimiya Melt Team #2',
    rank: 'A',
    description: "A team focused on triggering Melt reactions with Yoimiya's powerful Normal Attacks. Maximize Yoimiya's damage by hitting Pyro attacks with Cryo application from Ganyu's Burst, with Venti grouping and Bennett buffing. Yoimiya is the main DPS, her DMG is amplified by Melt in this team.",
    members: [
      {
        characterId: 'yoimiya',
        role: 'Main DPS',
        roleDesc: 'Pyro main DPS triggering Melt.',
        weapons: [ 'Thundering Pulse', 'Rust' ],
        artifacts: [ "4pc Shimenawa's Reminiscence" ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'ganyu',
        role: 'Sub DPS',
        roleDesc: 'Constant off-field Cryo application with Burst.',
        weapons: [ "Amos' Bow", 'The Stringless' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge' ]
      },
      {
        characterId: 'venti',
        role: 'Support',
        roleDesc: 'Groups enemies and spreads Cryo.',
        weapons: [ 'Skyward Harp', 'Elegy for the End' ],
        artifacts: [ '4pc Viridescent Venerer' ],
        substats: [ 'Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%' ]
      },
      {
        characterId: 'bennett',
        role: 'Support',
        roleDesc: 'Provides ATK buff and healing.',
        weapons: [ 'Skyward Blade', 'Favonius Sword' ],
        artifacts: [ '4pc Noblesse Oblige' ],
        substats: [ 'HP%', 'HP', 'Energy Recharge' ]
      }
    ]
  }
];
