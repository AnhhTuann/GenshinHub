"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Crimson Vaporize Shield',
        rank: 'S',
        description: "A Vaporize team featuring Yanfei as main DPS, Xingqiu applying Hydro, Sucrose boosting Elemental Mastery, and Thoma providing shields. Yanfei triggers Vaporize on enemies affected by Hydro from Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Thoma provides a shield for protection.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main Pyro DPS.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Applies Hydro off-field to trigger Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Provides Elemental Mastery buffs and groups enemies.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Provides shields to protect the team.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Thoma Burgeon Team #1',
        rank: 'S',
        description: "Thoma provides shield and triggers Burgeon with his Burst. Hydro from Ayato and Yelan combine with Dendro from Nahida to generate Dendro Cores, then Thoma's Pyro triggers Burgeon for massive AoE damage. Use Hydro from Ayato and Yelan with Dendro from Nahida to produce Dendro Cores, then Thoma's Pyro application via Burst triggers Burgeon for massive AoE damage.",
        members: [
            {
                characterId: 'ayato',
                role: 'Main DPS',
                roleDesc: "With Thoma's shield in place, Ayato's Normal Attacks deal off-field Hydro/Pyro DMG and activate cores to trigger Burgeon.",
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ['4pc Heart of Depth'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous off-field Hydro attacks that react with Dendro to create Cores.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['HP%', 'Energy Recharge', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Sustains off-field Dendro DMG on targets up to 8 enemies and triggers reactions. Burst buffers EM based on team diversity.',
                weapons: ['A Thousand Floating Dreams', 'Solar Pearl'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'Elemental Mastery',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Provides shield for safety, triggers Burgeon with his Burst.',
                weapons: ['Calamity Queller', 'Kitain Cross Spear'],
                artifacts: ['4pc Flower of Paradise Lost'],
                substats: ['Energy Recharge', 'Elemental Mastery', 'HP%']
            }
        ]
    },
    {
        name: 'Thoma Vaporize Team',
        rank: 'S',
        description: "Thoma's shield provides survivability for Hu Tao, while Xingqiu applies Hydro for Hu Tao's Vaporize. Kazuha provides grouping, DMG buff, and resistance shred. Thoma's shield provides survivability for Hu Tao to trigger Vaporize.",
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Hu Tao is the main DPS, her DMG is amplified by Vaporize.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Raincutter applies Hydro continuously.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Provides shield for safety, HP scaling shield strength.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Provides crowd control, groups enemies, and buffs DMG.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Thoma Vaporize Team #2',
        rank: 'A',
        description: "A Hu Tao Vaporize team with Thoma providing shields, Bennett for ATK buff and healing, and Xingqiu for Hydro application. Thoma shields Hu Tao for survivability, Bennett provides ATK buff and healing, Xingqiu applies Hydro for Hu Tao's Vaporize reactions.",
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Pyro main DPS.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Hydro sub DPS.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Shield support.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Provides ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Thoma Vaporize Melt Team',
        rank: 'S',
        description: "Thoma is the Support in the team, Thoma's Skill and Burst are maintained by stacking Max HP, helping Hu Tao maximize her survivability. Hu Tao triggers Vaporize with Xingqiu's Hydro application, while Chongyun provides occasional Melt reactions. Thoma's shield enables Hu Tao to play aggressively.",
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Pyro main DPS, triggers reactions.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery']
            },
            {
                characterId: 'chongyun',
                role: 'Sub DPS',
                roleDesc: 'Provides occasional Melt opportunities via Cryo fields.',
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['2pc Noblesse Oblige', '2pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Hydro sub DPS.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Shield support.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Thoma Superconduct Team #2',
        rank: 'A',
        description: "A team centered around Eula's physical damage, boosted by Superconduct, Thoma's shield and Tenacity of the Millelith buff. Trigger Superconduct to reduce Physical RES, amplifying Eula's Physical Burst. Thoma provides shields and ATK buff via Tenacity of the Millelith.",
        members: [
            {
                characterId: 'eula',
                role: 'Main DPS',
                roleDesc: 'Eula is the main physical DPS.',
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['4pc Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'fischl',
                role: 'Sub DPS',
                roleDesc: 'Provides off-field Electro application to trigger Superconduct.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Thundering Fury'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'chongyun',
                role: 'Sub DPS',
                roleDesc: 'Acts as Cryo battery and speed buff support.',
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Shield support.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Thoma Superconduct Team #1',
        rank: 'A',
        description: "Eula's Burst is the main damage source, boosted by Superconduct, Raiden Shogun's Skill, and Tenacity of the Millelith. Thoma's shield ensures safe execution. Trigger Superconduct to reduce Physical RES for Eula's physical damage. Raiden provides energy and Burst DMG boost. Thoma shields the team.",
        members: [
            {
                characterId: 'eula',
                role: 'Main DPS',
                roleDesc: "Eula's physical damage is boosted by Superconduct.",
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['4pc Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'raiden-shogun',
                role: 'Sub DPS',
                roleDesc: 'Provides Electro for Superconduct, boosts energy and Burst DMG.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%']
            },
            {
                characterId: 'rosaria',
                role: 'Sub DPS',
                roleDesc: 'Cryo Sub DPS, acts as battery and buffs CRIT Rate.',
                weapons: ['Skyward Spine', 'Favonius Lance'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Shield support.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Thoma Burgeon Team #2',
        rank: 'S',
        description: "Thoma is the Support, Dendro from Nahida reacts with Hydro from Xingqiu and Yelan to trigger Bloom, then Thoma's Pyro triggers Burgeon. Generate Dendro cores with Nahida's Dendro and Hydro from Xingqiu/Yelan, then trigger Burgeon with Thoma's Pyro.",
        members: [
            {
                characterId: 'nahida',
                role: 'Main DPS',
                roleDesc: 'Nahida mainly drives DMG, uses Elemental Skill linking up to 8 enemies, sharing EM under triggering reactions. Shares EM and infuses Dendro.',
                weapons: ['A Thousand Floating Dreams', 'Solar Pearl'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'Elemental Mastery',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Yelan provides continuous off-field Hydro attacks.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['HP%', 'Energy Recharge', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Raincutter continuously applies Hydro to enemies, reacting with Dendro to trigger Bloom.',
                weapons: ['Sapwood Blade'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Triggers Burgeon safety via Burst, EM scaling Burgeon DMG. Shield durability scales with HP.',
                weapons: ['Favonius Lance'],
                artifacts: ['4pc Flower of Paradise Lost'],
                substats: ['Energy Recharge', 'Elemental Mastery', 'HP%']
            }
        ]
    }
];
