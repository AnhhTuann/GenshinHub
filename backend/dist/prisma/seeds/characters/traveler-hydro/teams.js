"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Traveler Hydro F2P Vaporize Team',
        rank: 'S',
        description: "A budget/F2P Vaporize team where Hydro Traveler triggers Vaporize reactions on their Elemental Skill and Burst, supported by Xiangling's Pyro application, Bennett's ATK buffs, and Sucrose's Elemental Mastery sharing.",
        members: [
            {
                characterId: 'traveler-hydro',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Triggers Vaporize reactions on their Skill and Burst hits on-field.',
                weapons: ['Favonius Sword', 'Fleuve Cendre Ferryman'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals high off-field Pyro damage and applies Pyro to enable constant Vaporize reactions.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Anemo Support. Swirls Hydro/Pyro to shred enemy resistances and shares Elemental Mastery with the team.',
                weapons: [
                    'Sacrificial Fragments',
                    'Thrilling Tales of Dragon Slayers'
                ],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides a massive ATK buff and continuous healing from his Burst.',
                weapons: ['Mistsplitter Reforged', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'Energy Recharge', 'HP', 'ATK%']
            }
        ]
    },
    {
        name: 'Traveler Hydro Bloom Team',
        rank: 'S',
        description: "A classic Nilou Bloom team utilizing Hydro Traveler's continuous off-field Hydro application from their Burst, enhanced by Nilou's Bountiful Cores, Nahida's high Dendro application, and Baizhu's shielding/healing.",
        members: [
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Applies continuous Dendro off-field and shares Elemental Mastery with the active character.',
                weapons: ['A Thousand Floating Dreams', 'Sacrificial Fragments'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'Elemental Mastery',
                    'CRIT Rate',
                    'CRIT DMG',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'traveler-hydro',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application from Burst to trigger Bloom reactions.',
                weapons: ['Favonius Sword', 'Fleuve Cendre Ferryman'],
                artifacts: ['4pc Instructor'],
                substats: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'baizhu',
                role: 'Support',
                roleDesc: 'Dendro Support/Healer. Provides shielding, continuous healing, and boosts Bloom reaction damage.',
                weapons: ["Jadefall's Splendor", 'Prototype Amber'],
                artifacts: ['4pc Deepwood Memories'],
                substats: ['HP%', 'Energy Recharge', 'HP']
            },
            {
                characterId: 'nilou',
                role: 'Support',
                roleDesc: 'Hydro Support. Boosts Bloom reaction damage via Bountiful Cores based on her max HP.',
                weapons: ['Key of Khaj-Nisut', "The Dockhand's Assistant"],
                artifacts: ['2pc Tenacity of the Millelith', "2pc Vourukasha's Glow"],
                substats: ['HP%', 'HP', 'Elemental Mastery', 'Energy Recharge']
            }
        ]
    }
];
