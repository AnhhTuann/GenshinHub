export const teams = [
  {
    name: 'Diona Melt Team #1',
    rank: '1',
    description: "Hu Tao's damage is amplified by Melt. The Cryo resonance increases CRIT Rate by 15% against enemies affected by Cryo or Frozen.\n" +
      '\n' +
      "Use Hu Tao as the main DPS to trigger Melt reactions with Rosaria's Cryo application, while Xingqiu provides Vaporize and Freeze support. Diona provides shielding, healing, and Elemental Mastery boosts at C6 with Instructor set.\n" +
      '\n' +
      'Team composition: Hu Tao (Pyro Main DPS), Xingqiu (Hydro Sub DPS), Rosaria (Cryo Sub DPS), Diona (Cryo Support)',
    members: [
      {
        characterId: 'hu-tao',
        role: 'Pyro Main DPS',
        roleDesc: 'Main DPS whose Skill and Burst trigger Melt for amplified damage.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'xingqiu',
        role: 'Hydro Sub DPS',
        roleDesc: 'His Burst applies Hydro continuously to enable Vaporize with Hu Tao and Freeze with Rosaria.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'rosaria',
        role: 'Cryo Sub DPS',
        roleDesc: 'Her Burst applies Cryo for Melt and Freeze. Also grants nearby party members (excluding herself) 15% of her CRIT Rate as a buff for 10s after using Burst.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Provides shielding and healing. At C6, her Burst increases all party members' Elemental Mastery by 200. With 4-piece Instructor, triggering a reaction increases party Elemental Mastery by 120 for 8s.",
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  },
  {
    name: 'Diona Permafrost Team #1',
    rank: '2',
    description: "Diona is a Support in the team. Ayaka's Cryo DMG reacts with Hydro attachment from Kokomi to trigger Freezing.\n" +
      '\n' +
      "Ayaka's Cryo DMG reacts with Hydro from Kokomi to trigger Freezing, with Diona providing shield and Kazuha providing grouping and buffs.\n" +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Diona (Cryo Support), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Cryo Main DPS',
        roleDesc: 'Main DPS. Burst deals high Cryo DMG and enables Freezing.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Support. Shield provides safe environment and helps recharge Ayaka's Burst.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Anemo Support',
        roleDesc: 'Support. Groups enemies, provides DMG buff and reduces enemy Resistance.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'sangonomiya-kokomi',
        role: 'Hydro Support',
        roleDesc: 'Support/Healer. Skill triggers Hydro every 2s, enabling constant Freezing with Tenacity of the Millelith.',
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  },
  {
    name: 'Diona Permafrost',
    rank: '3',
    description: "Ayaka's Cryo DMG reacts with Hydro attachment from Mona to trigger Freeze.\n" +
      '\n' +
      "Ayaka's Cryo DMG reacts with Hydro from Mona to trigger Freezing, while Venti groups enemies and Diona provides shielding and healing.\n" +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Mona (Hydro Support), Diona (Cryo Support), Venti (Anemo Sub DPS)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Cryo Main DPS',
        roleDesc: "Ayaka's Elemental Burst deals high DMG and provides Cryo attachment for triggering Freeze.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'mona',
        role: 'Hydro Support',
        roleDesc: "Mona's Elemental Burst provides DMG increase and attaches Hydro to enemies with aid of Venti.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Diona's shield provides a safe environment and helps boost the recharge of Ayaka's Elemental Burst.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'venti',
        role: 'Anemo Sub DPS',
        roleDesc: "Venti's Elemental Burst groups enemies and applies crowd control, spreading Hydro from Mona.",
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  },
  {
    name: 'Diona Permafrost Team #3',
    rank: '4',
    description: 'A classic permafreeze team that locks enemies in Frozen while Ayaka deals massive Cryo damage.\n' +
      '\n' +
      "Ayaka's Cryo damage reacts with Hydro from Mona to trigger Freezing, while Kazuha groups enemies and provides damage buffs, and Diona shields and heals.\n" +
      '\n' +
      'Team composition: Kamisato Ayaka (Cryo Main DPS), Mona (Hydro Sub DPS), Diona (Cryo Support), Kaedehara Kazuha (Anemo Support)',
    members: [
      {
        characterId: 'kamisato-ayaka',
        role: 'Cryo Main DPS',
        roleDesc: "Ayaka's Burst deals high Cryo DMG and provides Cryo attachment for Freezing.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'mona',
        role: 'Hydro Sub DPS',
        roleDesc: "Mona's Burst provides DMG increase and she attaches Hydro to enemies with Kazuha's aid.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Diona's shield provides a safe environment and helps boost the recharge of Ayaka's Burst.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Anemo Support',
        roleDesc: 'Kazuha groups enemies, applies crowd control, provides DMG buffs and reduces Elemental RES of enemies.',
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  },
  {
    name: 'Diona Melt Team #2',
    rank: '5',
    description: "Diona is a Healer in the team. Klee's DMG is amplified by Melt.\n" +
      '\n' +
      "Klee's Pyro attacks trigger Melt with Ganyu's Cryo application from her Burst, while Kazuha groups enemies and buffs damage, and Diona shields and heals.\n" +
      '\n' +
      'Team composition: Klee (Pyro Main DPS), Ganyu (Cryo Sub DPS), Kaedehara Kazuha (Anemo Support), Diona (Cryo Support)',
    members: [
      {
        characterId: 'klee',
        role: 'Pyro Main DPS',
        roleDesc: 'Klee is the main DPS, her DMG is amplified by Melt in this team.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'ganyu',
        role: 'Cryo Sub DPS',
        roleDesc: 'Ganyu deals DMG mainly by Elemental Burst at backstage. Ganyu Cryo attachment reacts with Pyro attachment from Klee to trigger Melt.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'kaedehara-kazuha',
        role: 'Anemo Support',
        roleDesc: 'Kazuha can assist the team by grouping enemies together, applying crowd control, provide DMG buff to teammates and reduce Elemental Resistance of enemies.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Diona's shield provides safe environment for team members, and helps boost the recharge of Ganyu's Elemental Burst.",
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  },
  {
    name: 'Diona Melt Team #3',
    rank: '6',
    description: "Diona is a Healer in the team. Diluc's DMG is amplified by Melt.\n" +
      '\n' +
      "Diluc's Melt reactions are enabled by Ayaka's Cryo application, while Venti groups enemies and spreads Cryo, and Diona provides shield and healing.\n" +
      '\n' +
      'Team composition: Diluc (Pyro Main DPS), Kamisato Ayaka (Cryo Sub DPS), Venti (Anemo Sub DPS), Diona (Cryo Support)',
    members: [
      {
        characterId: 'diluc',
        role: 'Pyro Main DPS',
        roleDesc: 'Diluc is the main DPS, his DMG is amplified by the Melt in this team.',
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'kamisato-ayaka',
        role: 'Cryo Sub DPS',
        roleDesc: "Ayaka deals DMG mainly by Elemental Burst at backstage. Ayaka's Cryo attachment reacts with Pyro attachment from Diluc to trigger Melt.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'venti',
        role: 'Anemo Sub DPS',
        roleDesc: "Venti's Elemental Burst can group enemies together and apply crowd control, and he can help spread Cryo attachment from Ayaka to enemies nearby.",
        weapons: [],
        artifacts: [],
        substats: []
      },
      {
        characterId: 'diona',
        role: 'Cryo Support',
        roleDesc: "Diona's shield provides safe environment for team members, and help boost the recharge of Ayaka's Elemental Burst.",
        weapons: [],
        artifacts: [],
        substats: []
      }
    ]
  }
];
