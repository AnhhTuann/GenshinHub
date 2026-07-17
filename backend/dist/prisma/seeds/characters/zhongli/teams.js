"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Zhongli Melt Team',
        rank: 'S',
        description: "Zhongli acts as Support in the team. Ganyu provides Cryo, while Xiangling's Pyronado triggers Melt for Ganyu. Ganyu's Charge Attack applies Cryo, triggering Melt from Xiangling's Pyronado, while Zhongli's shield and Bennett's Burst provide safety and ATK buff.",
        members: [
            {
                characterId: 'ganyu',
                role: 'Main DPS',
                roleDesc: 'Cryo Main DPS. Triggers Melt on Pyro-affected enemies.',
                weapons: ["Amos' Bow", 'Hamayumi'],
                artifacts: ["4pc Shimenawa's Reminiscence"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals massive Pyro damage off-field with Pyronado.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and provides massive ATK buff.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Offers shield and ATK buffs.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Zhongli Xiao-Jean Team',
        rank: 'SS',
        description: "Zhongli provides a safe environment with his shield. Xiao's Elemental Burst damage is maximized by teammates. Geo resonance from Zhongli and Albedo enhances shield strength and damage. Jean acts as a battery and healer, while Zhongli's shield and Tenacity of the Millelith buff ATK.",
        members: [
            {
                characterId: 'xiao',
                role: 'Main DPS',
                roleDesc: 'Anemo Main DPS. Unleashes continuous plunging attacks during Burst.',
                weapons: ['Primordial Jade Winged-Spear', 'Deathmatch'],
                artifacts: ['4pc Vermillion Hereafter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'albedo',
                role: 'Sub DPS',
                roleDesc: 'Geo Sub DPS. Pairs with Zhongli for Geo Resonance and deals off-field Geo damage.',
                weapons: ['Cinnabar Spindle', 'Harbinger of Dawn'],
                artifacts: ['4pc Husk of Opulent Dreams'],
                substats: ['CRIT DMG', 'CRIT Rate', 'DEF%', 'DEF', 'Energy Recharge']
            },
            {
                characterId: 'jean',
                role: 'Support',
                roleDesc: 'Anemo Support. Heals the party and acts as a battery for Xiao.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides a strong shield and ATK buff via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Zhongli Vaporize Team',
        rank: 'SS',
        description: "A powerful team that maximizes Hu Tao's damage through Vaporize reactions, supported by Zhongli's shield and Kazuha's buffs. Hu Tao's Pyro damage is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Kazuha groups enemies, reduces Pyro RES, and provides Elemental Mastery buff. Zhongli provides a safe shield and ATK boost via Tenacity of the Millelith.",
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Vaporizes attacks on enemies affected by Hydro.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro application to enable Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Groups enemies, shreds Pyro RES, and buffs elemental damage.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides strong shield and buffs ATK via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Zhongli Superconduct Team',
        rank: 'S',
        description: "Zhongli acts as Shield Support in the team. Eula's physical damage is maximized by Superconduct and aid of teammates. The team revolves around Eula's high damage physical Burst, amplified by Superconduct (triggered by Fischl's Skill) and RES reduction from Zhongli's Tenacity of the Millelith, while Chongyun reduces cooldown with C2.",
        members: [
            {
                characterId: 'eula',
                role: 'Main DPS',
                roleDesc: 'Physical Main DPS. Unleashes massive physical damage via Burst.',
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['4pc Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'fischl',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Applies off-field Electro to enable Superconduct.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'chongyun',
                role: 'Sub DPS',
                roleDesc: 'Cryo Sub DPS. Provides Cryo application, reduces cooldowns, and increases ATK speed.',
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides strong shield and physical RES shred.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayaka Permafrost Team',
        rank: 'S',
        description: 'A powerful team combining Ayaka as main Cryo DPS, with Mona applying Hydro, Kazuha grouping and shredding resistance, and Zhongli for shielding. Focuses on freezing enemies and dealing Freeze reactions.',
        members: [
            {
                characterId: 'ayaka',
                role: 'Main DPS',
                roleDesc: 'Cryo Main DPS. Deals massive Cryo damage with Burst.',
                weapons: ['Mistsplitter Reforged', 'Amenoma Kageuchi'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Shreds resistance and provides elemental damage buffs.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'mona',
                role: 'Support',
                roleDesc: 'Hydro Support. Applies Hydro off-field and increases team damage.',
                weapons: [
                    'Skyward Atlas',
                    'Favonius Codex',
                    'Thrilling Tales of Dragon Slayers'
                ],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides a safe shield for the team.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Zhongli Catalyze Team',
        rank: 'S',
        description: "Zhongli is a Shield Support. The Electro DMG of Keqing is maximized by Aggravate. Keqing and Fischl apply off-field Electro, while Traveler (Dendro) applies Dendro to trigger Quicken, resulting in Aggravate reactions that boost Keqing's Electro DMG. Zhongli provides a shield and reduces enemy resistance with Shred.",
        members: [
            {
                characterId: 'keqing',
                role: 'Main DPS',
                roleDesc: 'Electro Main DPS. Multi-stage attacks trigger Aggravate reactions to trigger extra damage.',
                weapons: ['Mistsplitter Reforged', 'Iron Sting'],
                artifacts: ['4pc Thundering Fury'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'ATK%',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'traveler',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Applies Dendro off-field via Burst to maintain Quicken status.',
                weapons: ['Favonius Sword'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['Energy Recharge', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'fischl',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Provides continuous off-field Electro damage to trigger Aggravate.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides a safe environment, shield, and decreases enemy resistance with Shred.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Deepwood Memories'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Zhongli Permafrost Team #1',
        rank: 'S',
        description: "Zhongli acts as Shield Support in the team. Ganyu's Cryo is main DPS, with constant Hydro application from Mona to trigger Freezing. Ganyu's Cryo attacks combined with Mona's Hydro application keep enemies frozen, while Venti groups them and Zhongli provides a safe shield and ATK buff.",
        members: [
            {
                characterId: 'ganyu',
                role: 'Main DPS',
                roleDesc: 'Cryo Main DPS. Deals massive AoE Cryo damage via Charged Attacks.',
                weapons: ["Amos' Bow", 'Prototype Crescent'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'venti',
                role: 'Support',
                roleDesc: 'Anemo Support. Gathers enemies and triggers Swirl reactions.',
                weapons: ['Elegy for the End'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield Support. Provides shield and team buffs.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'mona',
                role: 'Support',
                roleDesc: 'Hydro Support. Triggers Freeze and increases team damage via Omen.',
                weapons: [
                    'Skyward Atlas',
                    'Favonius Codex',
                    'Thrilling Tales of Dragon Slayers'
                ],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
            }
        ]
    }
];
