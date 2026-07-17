"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Neuvillette Furina Vape-Freeze',
        rank: 'SS',
        description: "Charlotte provides healing and Cryo applicaton for Freeze, enabling Furina's Fanfare stacks and Neuvillette's Vaporize reactions.\n" +
            '\n' +
            "Neuvillette's Charged Attack damage is amplified by Furina's DMG% buff from her Burst, Kazuha's Elemental DMG% buff and Anemo RES Shred from Viridescent Venerer, and Charlotte's healing enables Furina's Fanfare stacks while providing Cryo for Freeze.\n" +
            '\n' +
            'Team composition: Neuvillette (Hydro Main DPS), Furina (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Charlotte (Cryo Support)',
        members: [
            {
                characterId: 'neuvillette',
                role: 'Hydro Main DPS',
                roleDesc: 'Primary damage dealer. DMG is maximized by team buffs.',
                weapons: ['Tome of the Eternal Flow', 'Sacrificial Jade'],
                artifacts: ['Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Hydro Sub DPS',
                roleDesc: "Provides DMG% buff via Burst. Skill burns allies' HP, which is restored by Charlotte.",
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Anemo Support',
                roleDesc: 'Groups enemies, provides Anemo RES Shred and Hydro DMG% buff.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'charlotte',
                role: 'Cryo Support',
                roleDesc: 'Healer via Burst. Also applies Cryo for Freeze.',
                weapons: ['Favonius Codex'],
                artifacts: ['Maiden Beloved', "Gladiator's Finale"],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            }
        ]
    },
    {
        name: 'Charlotte Neuviltte-Core Team #2',
        rank: 'SS',
        description: "Charlotte is a Healer in the team. Neuvillette's DMG is maximized by the combination of other 3 teammates.\n" +
            '\n' +
            "Furina's Burst buffs Neuvillette's damage via HP fluctuation, while Lynette provides Viridescent Venerer shred and grouping, and Charlotte heals and enables Freeze reactions.\n" +
            '\n' +
            'Team composition: Neuvillette (Hydro Main DPS), Furina (Hydro Sub DPS), Lynette (Anemo Support), Charlotte (Cryo Support)',
        members: [
            {
                characterId: 'neuvillette',
                role: 'Hydro Main DPS',
                roleDesc: 'Main DPS, maximizes damage with team support.',
                weapons: ['Tome of the Eternal Flow', 'Sacrificial Jade'],
                artifacts: ['Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Hydro Sub DPS',
                roleDesc: 'Sub DPS, provides DMG buff via HP changes from her Skill and Burst.',
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'lynette',
                role: 'Anemo Support',
                roleDesc: 'Support, groups enemies (C1), taunts with Burst, provides ATK buff and Anemo RES shred via Viridescent Venerer.',
                weapons: ['Favonius Sword'],
                artifacts: ['Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'charlotte',
                role: 'Cryo Support',
                roleDesc: 'Healer, protects team with Burst, provides Cryo for Freeze.',
                weapons: ['Favonius Codex'],
                artifacts: ['Maiden Beloved', "Gladiator's Finale"],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            }
        ]
    },
    {
        name: 'Charlotte Permafrost Team #1',
        rank: 'SS',
        description: 'A Freeze team with Wriothesley as main DPS, Furina providing off-field Hydro, Kazuha for grouping and buffs, and Charlotte for healing and additional Cryo.\n' +
            '\n' +
            "Wriothesley's Cryo damage reacts with Hydro from Furina to trigger Freeze, while Kazuha provides grouping and damage buffs, and Charlotte heals and contributes Cryo for freezing.\n" +
            '\n' +
            'Team composition: Wriothesley (Cryo Main DPS), Furina (Hydro Sub DPS), Kaedehara Kazuha (Anemo Support), Charlotte (Cryo Support)',
        members: [
            {
                characterId: 'wriothesley',
                role: 'Cryo Main DPS',
                roleDesc: 'Inflicts damage through normal and charged attacks. His Cryo damage triggers Freeze with Hydro.',
                weapons: ['Cashflow Supervision', 'The Widsith'],
                artifacts: ['Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Hydro Sub DPS',
                roleDesc: "Elemental Skill provides continuous off-field Hydro for Freeze. Elemental Burst increases DMG based on allies' HP changes.",
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Anemo Support',
                roleDesc: 'Groups enemies, provides crowd control, DMG buff, and reduces enemy Elemental RES.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'charlotte',
                role: 'Cryo Support',
                roleDesc: 'Elemental Burst provides healing and Cryo DMG for Freeze.',
                weapons: ['Favonius Codex'],
                artifacts: ['Maiden Beloved', "Gladiator's Finale"],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            }
        ]
    },
    {
        name: 'Charlotte Superconduct Team #1',
        rank: 'S',
        description: "Charlotte is a Healer in the team. Eula's Elemental Burst is maximized by Superconduct and aid of teammates.\n" +
            '\n' +
            "Maximize Eula's Elemental Burst damage using Superconduct and DMG bonuses from Raiden Shogun's Elemental Skill and Furina's Elemental Burst.\n" +
            '\n' +
            'Team composition: Eula (Cryo Main DPS), Furina (Hydro Sub DPS), Raiden Shogun (Electro Sub DPS), Charlotte (Cryo Support)',
        members: [
            {
                characterId: 'eula',
                role: 'Cryo Main DPS',
                roleDesc: "Eula's Elemental Burst is the core of this team, which is maximized under the effect of Superconduct, DMG Bonus from Raiden Shogun's Elemental Skill and DMG Bonus from Furina.",
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Hydro Sub DPS',
                roleDesc: "Furina's Elemental Burst can provide DMG increase based on the change of HP of Furina's allies. This can be achieved as Furina's Elemental Skill can burn allies HP and the HP lost is restored by the Healer.",
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'raiden-shogun',
                role: 'Electro Sub DPS',
                roleDesc: "Raiden Shogun provides Electro attachment for triggering Superconduct to maximize Eula's Elemental Burst damage, and deals on-field DMG during Eula's cooldown. Her Elemental Skill increases teammates' Elemental Burst DMG, and her Elemental Burst boosts team Energy Recharge.",
                weapons: ['Engulfing Lightning', '"The Catch"'],
                artifacts: ['Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'charlotte',
                role: 'Cryo Support',
                roleDesc: "Charlotte's Elemental Burst provides healing and protection. She can also apply Cryo for Freeze.",
                weapons: ['Favonius Codex'],
                artifacts: ['Maiden Beloved', "Gladiator's Finale"],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            }
        ]
    }
];
