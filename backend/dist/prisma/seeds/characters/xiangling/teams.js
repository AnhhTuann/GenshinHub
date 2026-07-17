"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Xiangling Melting Team #1',
        rank: 'S',
        description: "Xiangling is a Sub DPS in the team. Ganyu provides elemental Cryo damage. Cryo element attachments to trigger Melt which maximizes Ganyu's damage.",
        members: [
            {
                characterId: 'ganyu',
                role: 'Main DPS',
                roleDesc: "Ganyu's Charged Attack can trigger the Melt reaction.",
                weapons: ["Amos' Bow", 'Hamayumi'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: "Xiangling's Burst provides huge amount of DMG.",
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: "Zhongli's shield provides safe environment for team members, and decrease 20% of whole enemy's resistance.",
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides massive ATK buff and healing to other members.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Overload Team #2',
        rank: 'S',
        description: "Xiangling is the Sub DPS in the team. Keqing and Beidou deals Electro DMG which reacts with Pyro attachment from Xiangling to trigger Overload. Overload reaction triggered by Keqing/Beidou's Electro and Xiangling's Pyro.",
        members: [
            {
                characterId: 'keqing',
                role: 'Main DPS',
                roleDesc: 'Keqing mainly uses Heavy Attack to deal DMG. Keqing provides Electro attachment to trigger Overload.',
                weapons: ['Mistsplitter Reforged', 'The Flute'],
                artifacts: ["2pc Gladiator's Finale + 2pc Shimenawa's Reminiscence"],
                substats: ['HP%', 'Energy Recharge', 'ATK%', 'CRIT DMG']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: "Xiangling's Burst provides massive Pyro DMG, and distributes Pyro application for Overload.",
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'beidou',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS. Deals off-field Electro damage and provides damage reduction.',
                weapons: ["Wolf's Gravestone", 'Rainlasher'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides massive ATK buff and healing to other members.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Vaporize Team #3',
        rank: 'S',
        description: "Xiangling is the Main DPS. The team maximizes Vaporization DMG using Bennett's C6 bonus, Xiangling and Bennett enable consistent Vaporize triggers.",
        members: [
            {
                characterId: 'xiangling',
                role: 'Main DPS',
                roleDesc: "Xiangling's Burst provides huge DMG, and continuous Pyro application to trigger Vaporize.",
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, DMG amplified by Vaporize in this team.',
                weapons: ['Sacrificial Sword'],
                artifacts: [
                    '4pc Noblesse Oblige',
                    "2pc Heart of Depth + 2pc Gladiator's Finale"
                ],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Sucrose groups enemies, applies Swirl reaction, provides DMG buff, reduces enemy Pyro resistance.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides huge ATK buff and healing to the team.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Vaporize Team #1',
        rank: 'S',
        description: "Xiangling is a Sub DPS. The Vaporize DMG of the team is maintained by Kazuha's bonus, Xiangling and Bennett allow consistent Vaporize triggers. Minimize Vaporize damage using Bennett/C6 bonus, with Xiangling and Bennett enabling consistent Pyro application.",
        members: [
            {
                characterId: 'tartaglia',
                role: 'Main DPS',
                roleDesc: 'Tartaglia is the main DPS, his DMG is amplified by Vaporize.',
                weapons: ['Polar Star', 'Rust'],
                artifacts: ['Heart of Depth', "Heart of Depth + 2pc Gladiator's Finale"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: "Xiangling's Burst provides huge DMG and continuous Pyro application to trigger vaporize.",
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: 'Kazuha groups enemies, applies Swirl reaction, provides DMG buff, and reduces enemy Pyro resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides huge ATK buff and healing to the team.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Overload Team #1',
        rank: 'S',
        description: "A powerful overload team leveraging Electro DMG buffs from Kujou Sara (C6) and Pyro application from Xiangling to trigger Overload. Maintain Electro DMG with Kujou Sara's C6 CRIT DMG buff for Raiden Shogun, while Xiangling provides continuous Pyro attachment to trigger bigger Overload.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS, deals massive Electro DMG and restores energy.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, Burst provides massive Pyro DMG, and distributes Pyro application for Overload and extra target.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, provides Electro DMG bonus and energy.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Healer/Support, Burst provides massive ATK buff and healing to the team.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Vaporize Team #2',
        rank: 'S',
        description: "The Vaporization DMG of whole team is maintained by Kazuha's bonus. Xiangling and Bennett allow triggers for bigger Vaporize all the time. Kokomi on-field triggers Vaporize with Xiangling's Pyro, buffed by Kazuha's DMG bonus and Pyro shield, and Bennett's ATK buff.",
        members: [
            {
                characterId: 'sangonomiya-kokomi',
                role: 'Main DPS',
                roleDesc: 'Main DPS, her DMG reacts with Pyro to trigger Vaporize.',
                weapons: ['Everlasting Moonglow', 'Prototype Amber'],
                artifacts: ['Ocean-Hued Clam'],
                substats: [
                    'HP%',
                    'Healing Bonus',
                    'Energy Recharge',
                    'Elemental Mastery'
                ]
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, Burst provides massive Pyro DMG and continuous aura for Vaporize.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Support, Burst provides huge ATK buff and healing to other members.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: 'Support, groups enemies, provides Elemental Mastery / DMG buff, reduces enemy Pyro/Hydro resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Raiden Overload Vaporize',
        rank: 'SS',
        description: "An SS tier team using Raiden Shogun's Energy restoration and Burst damage amplification, Xiangling and Xingqiu provide continuous off-field Pyro and Hydro for Overload and Electro-Charged, while Bennett buffs and heals.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS, deals massive Electro DMG and restores energy.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, Burst provides continuous Pyro application for Vaporize, Overload, and Electro-Charged.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, Burst provides continuous Hydro application for Vaporize and Electro-Charged.',
                weapons: ['Primordial Jade Cutter', 'Sacrificial Sword'],
                artifacts: [
                    '4pc Noblesse Oblige',
                    "2pc Heart of Depth + 2pc Gladiator's Finale"
                ],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Support, Burst provides massive ATK buff and healing to the team.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Xiangling Pure Pyro Team',
        rank: 'S',
        description: "Xiangling is a Sub DPS in the team. The team only plays Pyro DMG. Main focus is on pure Pyro damage, using Klee's raw damage against Pyro affected enemies, with Xiangling providing off-field Pyro application, Kazuha providing Anemo grouping and Pyro damage bonus, and Bennett providing ATK buff and healing.",
        members: [
            {
                characterId: 'klee',
                role: 'Main DPS',
                roleDesc: 'Main DPS, deals massive Pyro damage on-field.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ['Lavawalker'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Sub DPS, Burst provides huge amount of DMG.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Healer/Support, has Elemental Burst provides massive ATK buff and healing to other members.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: "Support, can swirl the team by grouping enemies together, applying Swirl reaction, reduces enemies' resistance and buffs Pyro DMG of members.",
                weapons: ['Favonius Sword', 'Iron Sting'],
                artifacts: ['Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    }
];
