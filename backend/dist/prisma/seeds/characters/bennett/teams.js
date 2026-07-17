"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Bennett Vaporize Team #3',
        rank: 'S',
        description: 'Klee team focusing on Vaporize between Klee and Xingqiu, with Sucrose boosting Elemental Mastery and Bennett providing ATK buffs and healing.',
        members: [
            {
                characterId: 'klee',
                role: 'Main DPS',
                roleDesc: 'Klee is the main DPS, her DMG is amplified by Vaporization in this team.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ['4pc Lavawalker'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst applies Hydro continuously to trigger Vaporize with Klee.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['2pc Noblesse Oblige', '2pc Heart of Depth'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Provides Elemental Mastery bonus to increase Vaporize DMG.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides a large ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Bennett Pure Pyro',
        rank: 'S',
        description: "A powerful mono-element Pyro team that maximizes Klee and Xiangling's damage with Kazuha's crowd control support and Bennett's ATK buff and healing.",
        members: [
            {
                characterId: 'klee',
                role: 'Main DPS',
                roleDesc: 'Klee is the main DPS, her DMG is amplified by Pyro in this team.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ['4pc Lavawalker'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Provides a large amount of off-field Pyro DMG.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides huge ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Bennett Thunder Team',
        rank: 'S',
        description: "Bennett's Burst provides huge ATK buff and healing. Raiden Shogun's Burst DMG is maximized by Kujou Sara (C6)'s Electro CRIT DMG, Kazuha, and Bennett's ATK buff and resistance reduction.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: "The main DPS. Boosts teammates' Energy Recharge with Burst and triggers Overload with Bennett.",
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Provides ATK buff to teammates. Her Burst boosts damage and Elemental Mastery.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides a massive ATK buff and healing to allies.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, applies crowd control, provides DMG buff, and reduces enemy Elemental Resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Hu Tao Vaporize with Bennett',
        rank: 'S',
        description: 'A powerful Vaporize team featuring Hu Tao as main DPS, with Xingqiu providing consistent Hydro application, Sucrose buffing Elemental Mastery, and Bennett providing ATK buff and healing.',
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Hu Tao is the main DPS, her DMG is amplified by Vaporization in this team.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous off-field Hydro application to trigger Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['2pc Noblesse Oblige', '2pc Heart of Depth'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides a large ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Bennett Vaporize Team #2',
        rank: 'S',
        description: "Bennett provides huge ATK buff and healing, while Yoimiya triggers Vaporize with Xingqiu's Hydro application, and Kazuha groups enemies and buffs damage.",
        members: [
            {
                characterId: 'yoimiya',
                role: 'Main DPS',
                roleDesc: 'Yoimiya is the main DPS, her DMG is amplified by Vaporization in this team.',
                weapons: ['Thundering Pulse', 'Rust'],
                artifacts: ["4pc Shimenawa's Reminiscence"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: "Xingqiu's Elemental Burst attaches Hydro element to enemies continuously, reacting with Yoimiya's Pyro DMG to trigger Vaporization.",
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides a huge ATK buff and heals team members.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Bennett Superconduct Team',
        rank: 'S',
        description: "A team focused on maximizing Eula's Burst damage via Superconduct, ATK buff from Bennett, and Diona's Cryo battery.",
        members: [
            {
                characterId: 'eula',
                role: 'Main DPS',
                roleDesc: 'Eula is the main DPS, her physical DMG is amplified by Superconduct.',
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['4pc Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'fischl',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous off-field Electro damage via Oz.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Thundering Fury'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: "Diona's shield provides safe environment for team members, and acts as a battery for Eula.",
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Maiden Beloved'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides a large ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Bennett Vaporize Team #1',
        rank: 'S',
        description: "Bennett provides huge ATK buff and healing, while Tartaglia's DMG is amplified by Vaporize. Tartaglia triggers Vaporize with Xiangling's Burst, while Kazuha provides crowd control and elemental damage bonus, and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: 'tartaglia',
                role: 'Main DPS',
                roleDesc: 'Main DPS, DMG amplified by Vaporize.',
                weapons: ['Polar Star', 'Rust'],
                artifacts: ['4pc Heart of Depth'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst provides huge DMG and continuous Pyro for Vaporize.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Elemental Burst provides huge ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, reduces enemy Element RES, buffs team DMG.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Bennett Vaporize Team',
        rank: 'S',
        description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Yanfei is the main DPS, her DMG is amplified by Vaporization in this team.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous off-field Hydro application to trigger Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['2pc Noblesse Oblige', '2pc Heart of Depth'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides a large ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    }
];
