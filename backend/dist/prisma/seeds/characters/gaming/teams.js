"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Gaming Pure Pyro Team',
        rank: 'S',
        description: "A pure Pyro team centered on Gaming's plunging attacks, boosted by Xianyun, with Bennett and Xiangling providing buffs and off-field damage.",
        members: [
            {
                characterId: 'gaming',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Plunging Attacks deal high consistent Pyro DMG.',
                weapons: ['Redhorn Stonethresher', 'Serpent Spine'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals high off-field Pyro DMG via Pyronado and Gouba.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xianyun',
                role: 'Support',
                roleDesc: 'Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.',
                weapons: ["Crane's Echoing Call", 'Oathsworn Eye'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['ATK%', 'ATK', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
                weapons: ['Mistsplitter Reforged', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Gaming Vaporize Team',
        rank: 'SS',
        description: 'Gaming is a Main DPS. His DMG is amplified by Vaporize with off-field Hydro and support buffs from Furina, Kazuha, and Xianyun.',
        members: [
            {
                characterId: 'gaming',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Plunging Attacks trigger Vaporize reactions to deal massive DMG.',
                weapons: ['Redhorn Stonethresher', 'Serpent Spine'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.',
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'Energy Recharge']
            },
            {
                characterId: 'xianyun',
                role: 'Support',
                roleDesc: 'Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.',
                weapons: ["Crane's Echoing Call", 'Oathsworn Eye'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['ATK%', 'ATK', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Gaming Melting Team #1',
        rank: 'SS',
        description: "A high-damage Melt team centered on Gaming's plunging attacks, supported by Ganyu's off-field Cryo application, Layla's shield and Cryo application, and Xianyun's plunge buffs and healing.",
        members: [
            {
                characterId: 'gaming',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. His Plunging Attack provides continuous high-multiplier Pyro DMG.',
                weapons: ['Serpent Spine', 'Redhorn Stonethresher'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'ganyu',
                role: 'Sub DPS',
                roleDesc: 'Cryo Sub DPS. Her Burst provides continuous off-field Cryo application to trigger Melt.',
                weapons: ["Hunter's Path", 'Harp'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xianyun',
                role: 'Support',
                roleDesc: 'Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.',
                weapons: ["Crane's Echoing Call", 'Oathsworn Eye'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['ATK%', 'ATK', 'Energy Recharge']
            },
            {
                characterId: 'layla',
                role: 'Support',
                roleDesc: 'Cryo Shield & Support. Provides a strong shield and additional Cryo application.',
                weapons: ['Primordial Jade Cutter', 'Harbinger of Dawn'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'CRIT Rate', 'CRIT DMG']
            }
        ]
    }
];
