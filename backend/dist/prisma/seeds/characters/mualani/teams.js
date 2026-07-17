"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: "Mualani Witch's Eva Rite",
        rank: 'SS',
        description: "A powerful Vaporize team centered around Mualani's enhanced attacks. Utilizes Mualani's Nightsoul Blessing state to trigger Vaporize reactions with off-field Hydro and Pyro application from Mona and Traveler (Pyro), while Sucrose provides resistance shred and EM share.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: "Hydro Main DPS. Triggers powerful Vaporize reactions under Nightsoul's Blessing.",
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'sucrose',
                role: 'Support',
                roleDesc: 'Anemo Support. Swirls elements to reduce RES and shares Elemental Mastery with the team.',
                weapons: ['Thrilling Tales of Dragon Slayers'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'Energy Recharge']
            },
            {
                characterId: 'traveler-pyro',
                role: 'Support',
                roleDesc: 'Pyro Support. Applies off-field Pyro and triggers Pyro resonance.',
                weapons: ['Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['Energy Recharge']
            },
            {
                characterId: 'mona',
                role: 'Support',
                roleDesc: "Hydro Support. Boosts Mualani's damage via Omen and provides Hydro resonance.",
                weapons: ['Prototype Amber'],
                artifacts: ['4pc Instructor'],
                substats: ['Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Burning/Vaporize',
        rank: 'S',
        description: 'A Vaporize team using Burning to maintain Pyro aura for Hydro. Mualani triggers Vaporize for high damage Shark Bites. Emilie increases Burning damage, while Xiangling and Collei provide consistent off-field Pyro.',
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Vaporizes her on-field hits against enemies affected by Burning.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'emilie',
                role: 'Sub DPS',
                roleDesc: 'Dendro Sub DPS. Amplifies Burning reactions and deals consistent off-field Dendro damage.',
                weapons: ['Lumidouce Elegy', 'Deathmatch'],
                artifacts: ['4pc Unfinished Reverie'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Supplies off-field Pyro to maintain Burning aura with Dendro.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'dehya',
                role: 'Support',
                roleDesc: 'Pyro Support. Provides damage reduction, interruption resistance, and off-field Pyro.',
                weapons: ['Favonius Greatsword'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Permafrost',
        rank: 'S',
        description: 'A permafrost team focusing on Cryo/Hydro reactions, with dual DPS Citlali and Mualani supported by Charlotte and Furina for healing and damage amplification.',
        members: [
            {
                characterId: 'citlali',
                role: 'Main DPS',
                roleDesc: 'Cryo Main DPS. Deals consistent Cryo damage on-field and triggers Freeze.',
                weapons: ["Starcaller's Watch", 'The Widsith'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Triggers Freeze and deals high single-target Hydro damage.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and massive team-wide damage buffs.',
                weapons: ['Splendor of Tranquil Waters', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'charlotte',
                role: 'Support',
                roleDesc: 'Cryo Support. Provides team-wide burst healing and additional off-field Cryo.',
                weapons: ['Favonius Codex'],
                artifacts: ['4pc Song of Days Past'],
                substats: ['ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Vaporization Team #4',
        rank: 'SS',
        description: "A top-tier team focusing on Mualani's Vaporize reactions with off-field Pyro from Mavuika, supported by Xilonen's RES shred and healing, and Citlali's shielding and Cryo application.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Triggers massive Vaporize damage using nightsoul-empowered normal attacks.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Infuses Pyro and triggers coordinated off-field Pyro attacks.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'ATK%',
                    'Energy Recharge',
                    'Elemental Mastery'
                ]
            },
            {
                characterId: 'citlali',
                role: 'Support',
                roleDesc: 'Cryo Support. Generates a shield and applies off-field Cryo for additional reaction potential.',
                weapons: ["Starcaller's Watch", 'Sacrificial Fragments'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: [
                    'Elemental Mastery',
                    'Energy Recharge',
                    'CRIT Rate',
                    'CRIT DMG'
                ]
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Reduces enemy elemental resistance and provides reliable healing.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Vaporize Surf',
        rank: 'S',
        description: "A high damage team focusing on Mualani's Vaporize reactions, with off-field Pyro from Xiangling, supported by Xilonen's RES shred and healing, and Chiori's Geo sub DPS.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Vaporizes her hits against enemies affected by Pyro.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'chiori',
                role: 'Sub DPS',
                roleDesc: 'Geo Sub DPS. Deals high off-field Geo damage via her dolls.',
                weapons: ['Uraku Misugiri', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'DEF%', 'ATK%']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Applies off-field Pyro for Vaporize reactions.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Shreds RES and provides team healing.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Vaporization Team #7',
        rank: 'S',
        description: "Mualani triggers Vaporize with Xiangling's Pyro off-field, while Yelan provides additional Hydro and Citlali shields and reduces enemy resistance via Freeze or Melt reactions.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Vaporizes her on-field normal attacks.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and damage buffs.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Applies consistent Pyro off-field.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'citlali',
                role: 'Support',
                roleDesc: 'Cryo Support. Provides a shield and reduces resistance via Melt reactions.',
                weapons: ["Starcaller's Watch", 'Favonius Codex'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: [
                    'Elemental Mastery',
                    'Energy Recharge',
                    'CRIT Rate',
                    'CRIT DMG'
                ]
            }
        ]
    },
    {
        name: 'Mualani Vaporize #3',
        rank: 'S',
        description: "A high-damage Vaporize team centered on Mualani's enhanced attacks, supported by Xilonen's RES shred and Mavuika's off-field Pyro. Mualani stacks Silver Momentum from her enhanced state to unleash powerful Shark Bites, triggering Vaporize with Mavuika's off-field Pyro. Xilonen shreds enemy RES and heals, while Sucrose shreds enemy RES and provides EM.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Stacks Silver Momentum to unleash high-multiplier Sharky Bites.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'sucrose',
                role: 'Sub DPS',
                roleDesc: 'Anemo Sub DPS. Shreds RES, groups enemies, and shares Elemental Mastery.',
                weapons: ['A Thousand Floating Dreams', 'Sacrificial Fragments'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: [
                    'Elemental Mastery',
                    'Energy Recharge',
                    'CRIT DMG',
                    'CRIT Rate'
                ]
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals consistent off-field Pyro damage to enable constant Vaporize.',
                weapons: ['A Thousand Blazing Suns', 'Sacrificial Greatsword'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'ATK%',
                    'Energy Recharge',
                    'Elemental Mastery'
                ]
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Shreds enemy elemental resistances and heals active team members.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Vaporization Team #1',
        rank: 'SS',
        description: "Mualani uses Skill to enter Nightsoul's Blessing, enhancing Normal Attack to Sharky Bite. Stacking Silver Momentum from Shark Bites at marked enemies. Xilonen provides element type RES shred and healing. Xiangling applies element type off-field for Vaporize. Zhongli offers strong shield for safe gameplay.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: "Hydro Main DPS. Enters Nightsoul's Blessing and deals high on-field Vaporize damage with Sharky Bites.",
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals substantial off-field Pyro damage and triggers Vaporize reactions.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Geo Support. Provides a near-unbreakable shield and shreds enemy resistances.',
                weapons: ['Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Shreds enemy elemental resistances and heals active team members.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mualani Vaporization Team #6',
        rank: 'S',
        description: "A team focused on Mualani's enhanced Normal Attack in Nightsoul's Blessing, triggering Vaporize with Xiangling's off-field Pyro. Furina provides damage buff and additional Hydro, while Xilonen shreds enemy RES and sustains the team.",
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Deals high on-field Vaporize damage.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: [
                    'HP%',
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'xiangling',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals substantial off-field Pyro damage to enable Vaporize.',
                weapons: ['Engulfing Lightning', 'The Catch'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.',
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Support. Shreds enemy elemental resistance and provides healing.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            }
        ]
    }
];
