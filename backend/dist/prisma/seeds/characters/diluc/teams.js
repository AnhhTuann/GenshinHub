"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Diluc Melt Team #2',
        rank: 'S',
        description: 'Diluc is the main DPS, his DMG amplified by Melt. Ayaka provides off-field Cryo via Burst for consistent melts. Sucrose boosts team Elemental Mastery and shreds resistance. Diona shields, heals, and helps battery Ayaka.',
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: "Diluc's DMG is amplified by Melt in this team.",
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'sucrose',
                role: 'Sub DPS',
                roleDesc: 'Sucrose provides Elemental Mastery bonus to team members, increasing the DMG of Melt.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'ayaka',
                role: 'Sub DPS',
                roleDesc: 'Ayaka deals DMG mainly by Elemental Burst at backstage. Her Cryo attachment reacts with Pyro from Diluc to trigger Melt.',
                weapons: ['Mistsplitter Reforged', 'Amenoma Kageuchi'],
                artifacts: ['2pc Blizzard Strayer', '2pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: "Diona's shield provides a safe environment for team members and helps boost the recharge of Ayaka's Elemental Burst.",
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Maiden Beloved'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Diluc Vaporize Team #1',
        rank: 'S',
        description: "Diluc's Pyro DMG is amplified by Vaporization reactions triggered by Xingqiu's continuous Hydro application, supported by Kazuha's elemental damage buff and resistance shred, and Zhongli's shielding and ATK buff.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: "Xingqiu's Elemental Burst attaches Hydro continuously, enabling Vaporization with Diluc's Pyro.",
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Provides a strong shield and increases team ATK with Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Diluc Vaporize Plunge',
        rank: 'S',
        description: "A team that amplifies Diluc's plunging attacks with Xianyun, enabling consistent Vaporize reactions and high damage. Furina provides massive DMG bonuses via HP fluctuation, while Bennett supplies healing and ATK buffs.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: 'Diluc is the main DPS, his DMG is amplified by the Plunging Attack in this team.',
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: "Furina's Burst provides DMG increase based on HP changes of allies. Her Skill drains allies' HP, which is restored by the healer.",
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'xianyun',
                role: 'Support',
                roleDesc: "Xianyun provides healing to team members and boosts Diluc's Plunging Attack damage.",
                weapons: ["Crane's Echoing Call", 'Oathsworn Eye'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: "Bennett's Burst provides huge ATK buff and healing to other members.",
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Diluc Melt Team',
        rank: 'S',
        description: "Diluc's damage is amplified by Melt reactions, with Ganyu providing off-field Cryo, Kazuha buffing and grouping, and Diona shielding and healing.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: "Diluc's DMG is amplified by Melting.",
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'ganyu',
                role: 'Sub DPS',
                roleDesc: 'Ganyu deals DMG mainly by Elemental Burst at backstage. Ganyu Cryo attachment reacts with Pyro attachment from Diluc to trigger Melt.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['2pc Blizzard Strayer', '2pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kazuha',
                role: 'Support',
                roleDesc: 'Kazuha can assist the team by grouping enemies together, applying crowd control, provide DMG buff to teammates and reduce Elemental Resistance of enemies.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: "Diona's shield provides safe environment for team members, and helps boost the recharge of Ganyu's Elemental Burst.",
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Maiden Beloved'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Diluc Vaporize Team #3',
        rank: 'S',
        description: "Diluc is a Main DPS in the team. Diluc's DMG is amplified by Vaporization. Use Hydro from Xingqiu to enable Vaporize for Diluc. Albedo and Zhongli provide Geo resonance and shielding.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: "Xingqiu's Elemental Burst continuously applies Hydro to trigger Vaporization with Diluc.",
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'albedo',
                role: 'Sub DPS',
                roleDesc: "Albedo pairs with Zhongli for Geo resonance. With Archaic Petra, picking up a crystallize shard boosts team's Pyro DMG.",
                weapons: ['Cinnabar Spindle', 'Harbinger of Dawn'],
                artifacts: ['2pc Archaic Petra'],
                substats: ['CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge', 'DEF']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: "Zhongli's shield provides a safe environment and, with Tenacity of the Millelith, increases team ATK.",
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Diluc Vaporize Team #2',
        rank: 'S',
        description: "Diluc's Pyro DMG is amplified by Vaporization triggered by Xingqiu's Hydro application. Venti groups enemies and spreads Hydro, while Zhongli provides shields and ATK buff via Tenacity of the Millelith.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'venti',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst groups enemies and spreads Hydro from Xingqiu.',
                weapons: ['Elegy for the End', 'The Stringless'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst applies Hydro continuously to trigger Vaporization with Diluc.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield provides safety and ATK buff via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Diluc Vaporize Team',
        rank: 'S',
        description: "Diluc's DMG is amplified by Vaporization with Xingqiu's Hydro application, Sucrose provides Elemental Mastery buff, and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: 'diluc',
                role: 'Main DPS',
                roleDesc: 'DMG amplified by Vaporization.',
                weapons: ["Wolf's Gravestone", 'Serpent Spine'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'sucrose',
                role: 'Sub DPS',
                roleDesc: 'Provides Elemental Mastery bonus to increase Vaporize DMG.',
                weapons: ['Sacrificial Fragments', 'Mappa Mare'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'xingqiu',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst applies Hydro continuously to trigger Vaporize.',
                weapons: ['Sacrificial Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Elemental Burst provides huge ATK buff and healing.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    }
];
