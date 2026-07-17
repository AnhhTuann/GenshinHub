"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Raiden Shogun Electro Team',
        rank: 'SS',
        description: 'Raiden Shogun drives an electro charged team with high energy cost bursts, maximizing her own damage while providing energy and buffs.',
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Electro Main DPS. Drives the team with high energy cost bursts, maximizing damage and energy refund.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Provides Electro CRIT DMG buff and ATK bonus for Raiden.',
                weapons: ['Elegy for the End', "Mouun's Moon"],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Provides massive ATK buff and healing for the team.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Groups enemies, triggers Viridescent Venerer resistance shred, and buffs Electro DMG.',
                weapons: ['Freedom-Sworn', "Xiphos' Moonlight"],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'Energy Recharge', 'CRIT Rate']
            }
        ]
    },
    {
        name: 'Raiden Shogun Catalyze Team',
        rank: 'S',
        description: "A variant of Raiden's team using Nahida for Aggravate reactions to boost Electro damage.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS. Triggers Aggravate reactions for enhanced Electro damage.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Applies Dendro off-field and shares Elemental Mastery.',
                weapons: ['A Thousand Floating Dreams', 'Prototype Amber'],
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
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Buffs Electro CRIT DMG and ATK.',
                weapons: ['Elegy for the End', "Mouun's Moon"],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Anemo Support. Groups enemies and shreds resistance.',
                weapons: ['Freedom-Sworn', "Xiphos' Moonlight"],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'Energy Recharge', 'CRIT Rate']
            }
        ]
    },
    {
        name: 'Raiden Shogun National Team',
        rank: 'SS',
        description: 'Raiden Shogun acts as the Main DPS, utilizing her Elemental Burst which scales with energy consumed by teammates. Xiangling and Xingqiu provide high off-field bursts (80 energy) to maximize her damage, while Bennett supplies ATK buffs and healing.',
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS. Scales damage with team energy consumption and refills team energy.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides constant off-field Hydro application to enable Vaporize/Electro-Charged reactions.',
                weapons: ['Primordial Jade Cutter', 'Sacrificial Sword'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals massive Pyro damage off-field with her Pyronado.',
                weapons: ['Primordial Jade Cutter', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge',
                    'ATK%'
                ]
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and buffs ATK.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Raiden Shogun Overload Team #2',
        rank: 'SS',
        description: "Electro-Pyro overload team focusing on Raiden Shogun's Burst damage. Kujou Sara C6 provides CRIT DMG for Electro, Chevreuse shreds Pyro/Electro RES when Overload is triggered, while Bennett supplies huge ATK buffs and healing.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS. Deals massive Electro damage with Burst.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Provides ATK and Electro CRIT DMG buffs.',
                weapons: ['Elegy for the End', "Mouun's Moon"],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and buffs ATK.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro Support. Shreds Pyro/Electro resistance and buffs team ATK%.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Raiden Shogun Double Core Team',
        rank: 'S',
        description: "A team built around Raiden Shogun and Eula as dual carries. Superconduct enables Eula's physical Burst damage, while Raiden provides energy and burst buffs. Rosaria batteries Eula, and Bennett heals and buffs ATK.",
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Electro Main DPS. Triggers Superconduct and refills team energy.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'eula',
                role: 'Main DPS',
                roleDesc: 'Physical Main DPS. Deals massive physical Burst damage.',
                weapons: ['Song of Broken Pines', 'Serpent Spine'],
                artifacts: ['4pc Pale Flame'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'rosaria',
                role: 'Sub DPS',
                roleDesc: 'Cryo Sub DPS. Batteries Eula and shares CRIT Rate.',
                weapons: ['Favonius Lance'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and buffs ATK.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Raiden Shogun Hyperbloom',
        rank: 'SS',
        description: 'Raiden Shogun is the Electro trigger in the Hyperbloom team, with Yelan providing Hydro application and DMG, Nahida applying Dendro, and Baizhu for healing and shields.',
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Electro trigger. Triggers Hyperbloom reactions on Dendro Cores with Elemental Skill.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Applies Dendro off-field and increases team Elemental Mastery.',
                weapons: ['A Thousand Floating Dreams', 'Prototype Amber'],
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
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Applies Hydro off-field and boosts active character damage.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'baizhu',
                role: 'Support',
                roleDesc: 'Dendro Support. Provides shields, healing, and Hyperbloom reaction damage bonus.',
                weapons: ['Prototype Amber'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Raiden Shogun Overload Team',
        rank: 'SS',
        description: 'Raiden Shogun serves as Main DPS, with Kujou Sara providing ATK bonus and CRIT DMG boost for Electro. Xiangling offers continuous Pyro DMG, and Bennett heals and buffs ATK.',
        members: [
            {
                characterId: 'raiden-shogun',
                role: 'Main DPS',
                roleDesc: 'Main DPS. Drives the team with high energy cost bursts.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Continuously applies Pyro off-field.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge',
                    'ATK%'
                ]
            },
            {
                characterId: 'kujou-sara',
                role: 'Sub DPS',
                roleDesc: 'Electro Sub DPS. Buffs Electro CRIT DMG and ATK.',
                weapons: ['Elegy for the End', "Mouun's Moon"],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Pyro Support. Heals and buffs ATK.',
                weapons: ['Aquila Favonia', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    }
];
