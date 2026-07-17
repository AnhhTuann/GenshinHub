"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Yanfei Vaporize Team #5',
        rank: 'A',
        description: 'Focuses on Yanfei as main DPS triggering Vaporize reactions, with Xiangling providing off-field Pyro application, Kazuha for grouping, elemental buff/shred, and Bennett for ATK buff and healing.',
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main DPS driving the Pyro attacks.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Provides off-field Pyro damage and resonance.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies and boosts Elemental DMG.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK buff and healing support.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Yanfei Vaporize Team #3',
        rank: 'A',
        description: "A Vaporize team centered on Yanfei's Pyro damage, supported by Xingqiu's Hydro application, and Geo resonance from Albedo and Zhongli. Yanfei's Pyro DMG is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Albedo and Zhongli provide Geo resonance and shield, while Albedo can boost DMG with Archaic Petra.",
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
                roleDesc: 'Off-field Hydro support.',
                weapons: ['Primordial Jade Cutter', 'Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'albedo',
                role: 'Sub DPS',
                roleDesc: 'Geo resonance and off-field DMG support.',
                weapons: ['Cinnabar Spindle', 'Harbinger of Dawn'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['DEF%', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'DEF']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield and Geo resonance support.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Yanfei Melt Team #2',
        rank: 'A',
        description: "A Melt team where Yanfei serves as the on-field driver, triggering Melt reactions with off-field Cryo application from Ayaka and Diona. Yanfei triggers Melt reactions by applying Pyro to enemies affected by Cryo from Ayaka's Burst and Diona's Skill/Burst. Sucrose buffs Elemental Mastery and reduces Cryo resistance with Viridescent Venerer.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'On-field driver triggering Melt.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'ayaka',
                role: 'Sub DPS',
                roleDesc: 'Provides powerful off-field Cryo application via Burst.',
                weapons: ['Mistsplitter Reforged', 'Amenoma Kageuchi'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: 'Shield and healing support.',
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Provides Elemental Mastery buffs and groups enemies.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Yanfei Vaporize Team #4',
        rank: 'A',
        description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main DPS triggering Vaporize.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous off-field Hydro application to trigger Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
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
        name: 'Yanfei Vaporize',
        rank: 'S',
        description: "Yanfei's Pyro damage is amplified by Vaporize reactions enabled by Xingqiu's consistent off-field Hydro application, while Kazuha provides crowd control and Elemental DMG buffs, and Zhongli shields and buffs ATK.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main Pyro DPS triggering Vaporize on Hydro-affected enemies.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Applies Hydro continuously with his Raincutter Burst.',
                weapons: ['Primordial Jade Cutter', 'Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Provides shield and buffs team ATK with Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, decreases Pyro resistance, and buffs Elemental DMG.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Yanfei Vaporize & Burgeon',
        rank: 'S',
        description: "Yanfei drives Vaporize and Burgeon reactions with Yelan's off-field Hydro and Nahida's Dendro application, while Zhongli provides shielding and ATK buff.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main Pyro DPS driving Vaporize and Burgeon.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: "Applies Hydro off-field and increases on-field character's damage.",
                weapons: ['Aqua Simulacra', 'The Stringless'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['HP%', 'CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Applies Dendro continuously and shares Elemental Mastery.',
                weapons: ['A Thousand Floating Dreams', 'Sacrificial Fragments'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'Elemental Mastery',
                    'CRIT DMG',
                    'CRIT Rate',
                    'ATK%',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Provides a strong shield, shred resistance, and buffs ATK via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Yanfei Vaporize Team #2',
        rank: 'A',
        description: "A team focuses on triggering Vaporize with Yanfei as the main DPS, supported by Xingqiu's Hydro application, Venti's crowd control, and Zhongli's shielding. Use Xingqiu's Burst to apply Hydro, then trigger Vaporize with Yanfei's charged attacks. Venti groups enemies and spreads Hydro/Pyro, while Zhongli shields and buffs ATK.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Triggers Vaporize with charged attacks.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Enables Vaporize with off-field Hydro attacks.',
                weapons: ['Primordial Jade Cutter', 'Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'venti',
                role: 'Support',
                roleDesc: 'Provides crowd control, groups enemies, and shreds elemental resistance.',
                weapons: ['Elegy for the End', 'The Stringless'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shields and buffs team ATK.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Yanfei Melt Team #1',
        rank: 'A',
        description: "Yanfei serves as the primary DPS, with her damage amplified by Melt reactions. Trigger Melt on enemies affected by Ganyu's Burst and skill application, while Kazuha provides grouping and elemental shred, and Diona offers shielding and energy for Ganyu.",
        members: [
            {
                characterId: 'yanfei',
                role: 'Main DPS',
                roleDesc: 'Main DPS triggering Melt reactions.',
                weapons: ['Lost Prayer to the Sacred Winds', 'The Widsith'],
                artifacts: ["4pc Wanderer's Troupe"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'ganyu',
                role: 'Sub DPS',
                roleDesc: 'Applies Cryo consistently off-field via Burst.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: 'Provides shields, healing, and acts as a battery for Ganyu.',
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, provides Anemo Swirl to reduce Cryo resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    }
];
