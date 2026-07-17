"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Mavuika Burning',
        rank: 'S',
        description: "A Burning team where Mavuika and Emilie maintain the Burning reaction, boosting Kinich's damage with constant Pyro and Dendro application. Sustain Burning with Mavuika's off-field Pyro and Emilie's Dendro, allowing Kinich to trigger powerful Nightsoul Cannon blasts.",
        members: [
            {
                characterId: 'kinich',
                role: 'Main DPS',
                roleDesc: 'On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.',
                weapons: ['Fang of the Mountain King', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'emilie',
                role: 'Sub DPS',
                roleDesc: 'Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.',
                weapons: ['Lumidouce Elegy', 'Deathmatch'],
                artifacts: ['4pc Unfinished Reverie'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Applies consistent off-field Pyro and triggers Burning to enable Kinich.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'iansan',
                role: 'Support',
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: ['Calamity Queller', 'Favonius Lance'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['HP%', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mavuika Overload Vanguard',
        rank: 'S',
        description: "An Overload team centered around Mavuika's high burst damage, supported by Ororon's off-field attacks, Chevreuse's RES shred and ATK buff, and Iansan's ATK buff. Trigger Overload to activate Chevreuse's RES shred, boosting Mavuika's Pyro damage, while Ororon's Electro damage contributes. Iansan buffs ATK.",
        members: [
            {
                characterId: 'mavuika',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge']
            },
            {
                characterId: 'ororon',
                role: 'Support',
                roleDesc: 'Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.',
                weapons: ['Elegy for the End', 'Favonius Warbow'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'iansan',
                role: 'Support',
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: ['Calamity Queller', 'Favonius Lance'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['HP%', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mavuika Overload Team #2',
        rank: 'S',
        description: "Overload team featuring Varesa as Main DPS, Mavuika as Sub DPS, Chevreuse and Iansan providing support and healing. Shreds enemy resistance to Pyro and Electro after Overload, while Iansan provides a massive ATK buff, maximizing Varesa and Mavuika's damage.",
        members: [
            {
                characterId: 'varesa',
                role: 'Main DPS',
                roleDesc: 'Electro Main DPS. Deals continuous Electro damage to trigger Overload reactions.',
                weapons: ["Tulaytullah's Remembrance", 'The Widsith'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'iansan',
                role: 'Support',
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: ['Calamity Queller', 'Favonius Lance'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['HP%', 'CRIT Rate', 'Energy Recharge']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mavuika Overload Team #1',
        rank: 'SS',
        description: "An overload team featuring Mavuika as main DPS, with Ororon, Chevreuse, and Bennett providing support and healing. Leverage Chevreuse's passive to reduce enemy Pyro and Electro RES via Overload, while Ororon provides off-field damage and energy, and Bennett buffs ATK.",
        members: [
            {
                characterId: 'mavuika',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Nightsoul state normal attacks and coordinated attacks via Elemental Burst.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
                weapons: ['Mistsplitter Reforged', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'ororon',
                role: 'Support',
                roleDesc: 'Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.',
                weapons: ['Elegy for the End', 'Favonius Warbow'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mavuika Melt',
        rank: 'SS',
        description: "A melt team leveraging Mavuika's high Pyro damage with Citlali's Cryo application and Furina's damage buffs, all supported by Bennett's ATK buff and healing. Trigger Melt by applying elements to enemies via Citlali, then use Mavuika's empowered Burst for massive Pyro damage. Furina provides Hydro, freeze, and Bennett heals and buffs ATK.",
        members: [
            {
                characterId: 'mavuika',
                role: 'Main DPS',
                roleDesc: "Pyro Main DPS. Deals high on-field Melt damage with Citlali's Cryo application.",
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
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
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
                weapons: ['Mistsplitter Reforged', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'citlali',
                role: 'Support',
                roleDesc: 'Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.',
                weapons: ["Starcaller's Watch", 'Sacrificial Fragments'],
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
        name: 'Mavuika Overload',
        rank: 'SS',
        description: "An Overload team with Chevreuse's RES shred and ATK buff, maximizing Clorinde and Mavuika's damage. Leverage Overload reactions to trigger Chevreuse's Pyro and Electro RES shred and ATK buff, while Ororon provides off-field Electro damage and energy.",
        members: [
            {
                characterId: 'clorinde',
                role: 'Main DPS',
                roleDesc: 'Electro Main DPS. Infuses normal attacks with Electro and triggers reactions.',
                weapons: ['Absolution', 'The Black Sword'],
                artifacts: ['4pc Fragment of Harmonic Whimsy'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'ororon',
                role: 'Support',
                roleDesc: 'Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.',
                weapons: ['Elegy for the End', 'Favonius Warbow'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'chevreuse',
                role: 'Support',
                roleDesc: 'Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.',
                weapons: ['Staff of Homa', 'Favonius Lance'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Mavuika Vaporization Team #1',
        rank: 'SS',
        description: "A high-damage Vaporize team centered on Mavuika's empowered Burst. Mavuika's Burst is charged via Nightsoul points and normal attacks, then applies hydro-infused Pyro for massive DMG. Xilonen shreds enemy elemental RES and heals, Furina provides off-field hydro and buffs, enabling Mavuika to trigger Vaporize.",
        members: [
            {
                characterId: 'mavuika',
                role: 'Main DPS',
                roleDesc: 'Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
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
                roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
                weapons: ['Mistsplitter Reforged', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    },
    {
        name: 'Mavuika Vaporization',
        rank: 'SS',
        description: 'A top-tier Vaporize team featuring Mualani as main DPS, Mavuika as off-field Pyro applier, Xilonen for RES shred and healing, and Citlali for shielding and further resistance reduction via Melt reactions.',
        members: [
            {
                characterId: 'mualani',
                role: 'Main DPS',
                roleDesc: 'Hydro Main DPS. Deals high on-field Vaporize damage.',
                weapons: ["Surf's Up", 'Sacrificial Jade'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Provides consistent off-field Pyro application to enable Vaporize.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['DEF%', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'citlali',
                role: 'Support',
                roleDesc: 'Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.',
                weapons: ["Starcaller's Watch", 'Sacrificial Fragments'],
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
        name: 'Mavuika Vaporization Team #2',
        rank: 'S',
        description: "Chasca acts as the Main DPS, with Furina and Mavuika applying Hydro and Pyro for Vaporize reactions. Bennett provides ATK buffs and healing. This team leverages Chasca's ability to adapt her damage based on teammates' elements, combining Furina's continuous Hydro application with Mavuika's off-field Pyro to enable frequent Vaporize reactions.",
        members: [
            {
                characterId: 'chasca',
                role: 'Main DPS',
                roleDesc: "Anemo Main DPS. Adapts her damage based on teammates' elements to trigger reactions.",
                weapons: ["Astral Vulture's Crimson Plumage", 'First Great Magic'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
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
                characterId: 'mavuika',
                role: 'Sub DPS',
                roleDesc: 'Pyro Sub DPS. Enables Pyro element infusion and triggers Vaporize reactions.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'ATK Buffer & Healer. Provides massive ATK buff and constant healing.',
                weapons: ['Mistsplitter Reforged', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            }
        ]
    }
];
