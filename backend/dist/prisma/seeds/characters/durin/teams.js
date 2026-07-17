"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Durin Anemo Team',
        rank: 'SS',
        description: "An Anemo-Anemo-Pyro-Pyro team leveraging Venti's grouping, Faruzan's Anemo buffs, Durin's Pyro support and RES shred, and Bennett's ATK buff and healing.",
        members: [
            {
                characterId: 'venti',
                role: 'Main DPS',
                roleDesc: 'Anemo Main DPS. Provides crowd control and gather enemies.',
                weapons: ['The Stringless', 'Favonius Warbow'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: [
                    'Elemental Mastery',
                    'CRIT Rate',
                    'CRIT DMG',
                    'ATK%',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'durin',
                role: 'Support',
                roleDesc: 'Pyro Support. Provides off-field Pyro DMG and reduces enemy RES.',
                weapons: ['Athame Artis', 'Wolf-Fang'],
                artifacts: ['4pc Gilded Dreams'],
                substats: ['CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Buffs ATK and provides healing.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'faruzan',
                role: 'Support',
                roleDesc: 'Anemo Support. Buffs Anemo DMG and reduces resistance.',
                weapons: ['Elegy for the End', 'Favonius Warbow'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['Energy Recharge', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Durin Overload Team',
        rank: 'S',
        description: "An overload team that maximizes Varka's plunge attacks through Chevreuse's RES shred and ATK buff, Durin's off-field Pyro support, and Ororon's Electro support.",
        members: [
            {
                characterId: 'varka',
                role: 'Main DPS',
                roleDesc: 'Anemo Main DPS. Performs plunge attacks to trigger swirl and deal damage.',
                weapons: ['Unbreakable: Durandarte', 'The Bell'],
                artifacts: ['4pc A Day Carved From Rising Winds'],
                substats: ['CRIT Rate', 'CRIT DMG', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro Support. Reduces enemy Pyro/Electro resistance and buffs ATK.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'ororon',
                role: 'Support',
                roleDesc: 'Electro Support. Triggers Scroll set buff and provides Electro support.',
                weapons: ["Astral Vulture's Crimson Plumage", 'Favonius Warbow'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'durin',
                role: 'Support',
                roleDesc: 'Pyro Support. Provides off-field Pyro application for Overload.',
                weapons: ['Athame Artis', 'Wolf-Fang'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%']
            }
        ]
    },
    {
        name: 'Durin Gaming Team #1',
        rank: 'SS',
        description: "A burning-focused team leveraging Durin's off-field Pyro support and Bennett's ATK buff to empower Kinich and Emilie's Dendro damage.",
        members: [
            {
                characterId: 'kinich',
                role: 'Main DPS',
                roleDesc: 'Dendro Main DPS. Deals massive Dendro damage through Nightsoul Burst.',
                weapons: ['Fang of the Mountain King', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'emilie',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Deals off-field Dendro damage boosted by Burning.',
                weapons: ['Lumidouce Elegy', 'Deathmatch'],
                artifacts: ['4pc Unfinished Reverie'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'durin',
                role: 'Support',
                roleDesc: 'Pyro Support. Applies Pyro off-field to maintain Burning and holds Deepwood Memories.',
                weapons: ['Athame Artis', 'Wolf-Fang'],
                artifacts: ['4pc Deepwood Memories'],
                substats: ['CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and provides massive ATK buff.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Durin Geo Team',
        rank: 'S',
        description: "A team where Navia serves as the main DPS, supported by Albedo's off-field Geo damage, Durin's Pyro application, and Bennett's ATK buff.",
        members: [
            {
                characterId: 'navia',
                role: 'Main DPS',
                roleDesc: 'Geo Main DPS. Deals explosive damage with Gunbrella.',
                weapons: ['Verdict', 'Serpent Spine'],
                artifacts: ['4pc Nighttime Whispers in the Echoing Woods'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'albedo',
                role: 'Sub DPS',
                roleDesc: 'Geo Sub DPS. Pairs for Geo Resonance and deals off-field Geo damage.',
                weapons: ['Uraku Misugiri', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge']
            },
            {
                characterId: 'durin',
                role: 'Support',
                roleDesc: 'Pyro Support. Applies Pyro off-field and triggers crystallize.',
                weapons: ['Athame Artis', 'Wolf-Fang'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and provides massive ATK buff.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Durin Gaming Team #2',
        rank: 'SS',
        description: "A powerful Burning team leveraging Durin's support to boost Kinich and Emilie's damage, while Xilonen provides Geo RES shred.",
        members: [
            {
                characterId: 'kinich',
                role: 'Main DPS',
                roleDesc: 'Dendro Main DPS. Deals massive Dendro damage.',
                weapons: ['Fang of the Mountain King', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'emilie',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Deals off-field Dendro damage.',
                weapons: ['Lumidouce Elegy', 'Deathmatch'],
                artifacts: ['4pc Unfinished Reverie'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'durin',
                role: 'Support',
                roleDesc: 'Pyro Support. Applies Pyro off-field and triggers Burning.',
                weapons: ['Athame Artis', 'Wolf-Fang'],
                artifacts: ['4pc Deepwood Memories'],
                substats: ['CRIT Rate', 'CRIT DMG', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Reduces enemy elemental resistance and triggers Scroll buff.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    }
];
