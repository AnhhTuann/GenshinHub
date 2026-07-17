"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Sigewinne For Fun',
        rank: 'S',
        description: "A for-fun team where Traveler (Geo) and Zhongli's Geo construct resonance is the main DMG source, speeding up Sigewinne's passive. Sigewinne heals and boosts Skill DMG. Geo construct resonance between Traveler (Geo) and Zhongli triggers Sigewinne's passive talent for additional damage, while Furina provides off-field Hydro and DMG buffs.",
        members: [
            {
                characterId: 'traveler-geo',
                role: 'Main DPS',
                roleDesc: "Geo Main DPS. Places Geo constructs that resonate with Zhongli's pillars to deal AoE Geo damage.",
                weapons: ['Primordial Jade Cutter', 'Wolf-Fang'],
                artifacts: ["2pc Gladiator's Finale", "2pc Shimenawa's Reminiscence"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Supplies off-field Hydro attacks and massive damage buffs.',
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'sigewinne',
                role: 'Support',
                roleDesc: 'Hydro Support. Restores team HP and buffs off-field Elemental Skill DMG.',
                weapons: ['Silvershower Heartstrings', 'Recurve Bow'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Geo Support. Creates a powerful shield, shreds enemy RES, and places resonating pillars.',
                weapons: ['Staff of Homa'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%']
            }
        ]
    },
    {
        name: 'Sigewinne Bloom Team',
        rank: 'SS',
        description: "Bloom team utilizing Nilou's passive to create Bountiful Cores for massive AoE Dendro damage, with Alhaitham as on-field driver, Furina providing off-field Hydro and damage buffs, and Sigewinne healing to sustain Furina's HP drain.",
        members: [
            {
                characterId: 'alhaitham',
                role: 'Main DPS',
                roleDesc: 'Dendro Main DPS. Infuses attacks with Dendro and triggers rapid Bloom reactions on-field.',
                weapons: ['Light of Foliar Incision', 'Wolf-Fang'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge',
                    'ATK%'
                ]
            },
            {
                characterId: 'nilou',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Enables Bountiful Cores with her passive, dealing high AoE Bloom damage.',
                weapons: ['Key of Khaj-Nisut', "The Dockhand's Assistant"],
                artifacts: ['2pc Tenacity of the Millelith', "2pc Vourukasha's Glow"],
                substats: ['HP%', 'Elemental Mastery', 'HP']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Applies off-field Hydro and boosts team damage.',
                weapons: ['Splendor of Tranquil Waters', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'sigewinne',
                role: 'Support',
                roleDesc: "Hydro Support. Provides continuous healing to sustain the team from Bloom and Furina's drain, and buffs Skill DMG.",
                weapons: ['Elegy for the End', 'Favonius Warbow'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP']
            }
        ]
    },
    {
        name: 'Sigewinne Pure Hydro',
        rank: 'SS',
        description: 'The team focuses on dealing Hydro damage, with Sigewinne providing healing and Elemental Skill damage buffs, while Yelan and Furina output damage and Kazuha provides grouping and resistance shred.',
        members: [
            {
                characterId: 'yelan',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Deals high on-field single-target Hydro damage with coordinated attacks from Burst.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and huge ramping damage buffs to the team.',
                weapons: ['Splendor of Tranquil Waters', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Hydro DMG.',
                weapons: ["Xiphos' Moonlight", 'Favonius Sword'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: [
                    'Elemental Mastery',
                    'Energy Recharge',
                    'CRIT DMG',
                    'CRIT Rate'
                ]
            },
            {
                characterId: 'sigewinne',
                role: 'Support',
                roleDesc: "Hydro Support. Provides team-wide healing via her Skill and buffs teammates' off-field Elemental Skill DMG.",
                weapons: ['Silvershower Heartstrings', 'Recurve Bow'],
                artifacts: ['2pc Tenacity of the Millelith', "2pc Vourukasha's Glow"],
                substats: ['HP%', 'HP']
            }
        ]
    }
];
