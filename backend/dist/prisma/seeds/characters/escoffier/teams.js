"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Escoffier Permafrost',
        rank: 'S',
        description: "A permafrost team that freezes enemies while Ayaka's Burst deals massive Cryo damage. Escoffier heals and shreds resistances.\n" +
            '\n' +
            "Freeze enemies with Cryo and Hydro reactions, then nuke with Ayaka's Burst. Shenhe boosts ATK and reduces Cryo RES. Furina provides off-field Hydro and DMG buff. Escoffier heals and shreds both Cryo and Hydro RES.\n" +
            '\n' +
            'Team composition: Kamisato Ayaka (Cryo Main DPS), Shenhe (Cryo Sub DPS), Furina (Hydro Sub DPS), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'kamisato-ayaka',
                role: 'Main DPS',
                roleDesc: 'Deals massive damage with Burst while enemies are frozen. Prioritize CRIT DMG and ATK%.',
                weapons: ['Mistsplitter Reforged', 'Finale of the Deep'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'shenhe',
                role: 'Sub DPS',
                roleDesc: "Boosts Ayaka's ATK and reduces enemy Cryo RES. Stack ATK%.",
                weapons: ['Calamity Queller', 'Favonius Lance'],
                artifacts: ["2pc Gladiator's Finale + 2pc Shimenawa's Reminiscence"],
                substats: ['ATK%', 'Energy Recharge', 'CRIT Rate']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Applies continuous Hydro with Skill and provides DMG buff via Burst. Burns team HP for synergy with healer.',
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: 'Heals team and reduces enemy Cryo/Hydro RES. Summons a Mek to deal Cryo damage.',
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Permafrost Team #2',
        rank: 'S',
        description: 'A permafreeze team with Ayaka as main DPS, Furina providing Hydro application and DMG buffs, Citlali shielding and shredding resistances, and Escoffier healing and further resistance shred.\n' +
            '\n' +
            "Ayaka's Burst deals massive Cryo DMG while Furina provides continuous Hydro for Freeze. Citlali shields and reduces enemy Pyro/Hydro resistance, and Escoffier heals and reduces Cryo/Hydro resistance, enabling consistent Freeze uptime and high damage.\n" +
            '\n' +
            'Team composition: Kamisato Ayaka (Cryo Main DPS), Citlali (Cryo Support), Furina (Hydro Sub DPS), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'kamisato-ayaka',
                role: 'Main DPS',
                roleDesc: 'Ayaka deals DMG by her Burst, and her Cryo DMG reacts with Hydro from allies to trigger Freeze.',
                weapons: ['Mistsplitter Reforged', 'Finale of the Deep'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'citlali',
                role: 'Support',
                roleDesc: "Citlali's Skill provides a shield based on Elemental Mastery and summons a creature dealing AoE Cryo. When active, triggering Frozen or Melt reduces nearby enemies' Pyro and Hydro resistance.",
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
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: "Furina's Skill provides continuous Hydro application. Her Burst increases DMG based on HP changes of allies, enabled by HP drain from her Skill and healing from the team healer.",
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: "Escoffier summons a 'Cooking Mek' that shoots Cryo projectiles. Her Burst deals AoE Cryo and heals the team. Both Skill and Burst lower enemies' Cryo or Hydro resistance, increasing with the number of Cryo and Hydro characters.",
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Permafreeze Team',
        rank: 'S',
        description: 'A permafreeze team focusing on Cryo and Hydro application to freeze enemies, with Ayaka as the primary burst damage dealer. Escoffier provides resistance shred for both elements.\n' +
            '\n' +
            "Freeze enemies with continuous Cryo and Hydro application, then shatter them with Ayaka's burst. Escoffier enhances Cryo/Hydro damage and healing.\n" +
            '\n' +
            'Team composition: Kamisato Ayaka (Cryo Main DPS), Charlotte (Cryo Support), Furina (Hydro Sub DPS), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'kamisato-ayaka',
                role: 'Main DPS',
                roleDesc: 'Ayaka deals DMG by her Elemental Burst, and her Cryo DMG reacts with Hydro from allies to trigger Freeze.',
                weapons: ['Mistsplitter Reforged', 'Finale of the Deep'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'charlotte',
                role: 'Support',
                roleDesc: "Charlotte's Elemental Burst heals and protects the team. She also provides Cryo DMG for Freeze.",
                weapons: ['Thrilling Tales of Dragon Slayers'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: "Furina's Elemental Skill provides continuous Hydro application. Her Elemental Burst increases team DMG based on HP changes.",
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: "Escoffier summons a Cooking Mek that shoots Frosty Parfaits. Her Burst heals and deals AoE Cryo DMG. Both Skill and Burst lower enemies' Cryo or Hydro resistance based on party Cryo/Hydro count.",
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Permafrost Team #4',
        rank: 'S',
        description: 'Freeze-focused team with Wriothesley as main DPS, Yelan and Furina providing off-field Hydro, and Escoffier healing and reducing Cryo/Hydro resistance.\n' +
            '\n' +
            "Use Wriothesley's Cryo damage with off-field Hydro from Yelan and Furina to trigger Freeze, while Escoffier heals and further reduces Cryo and Hydro resistance to boost damage.\n" +
            '\n' +
            'Team composition: Wriothesley (Cryo Main DPS), Yelan (Hydro Sub DPS), Furina (Hydro Sub DPS), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'wriothesley',
                role: 'Main DPS',
                roleDesc: 'Inflicts damage through normal and charged attacks, dealing Cryo damage.',
                weapons: ['Cashflow Supervision', 'The Widsith'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous Hydro attack off-field for triggering Vaporize. Her Burst can increase DMG of allies via passive talent.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: "Elemental Skill provides continuous Hydro application. Burst provides DMG increase based on allies' HP changes, achieved by Skill draining HP and healer restoring.",
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: "Summons a Cooking Mek that shoots Frosty Parfaits at enemies, dealing Cryo damage. Burst heals the team. Skill and Burst lower enemies' Cryo or Hydro resistance based on number of Cryo and Hydro characters in the party.",
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Pure Hydro Team #1',
        rank: 'SS',
        description: "A team centered on reducing enemy Hydro and Cryo resistance while maximizing Neuvillette's Hydro damage. Escoffier and Xilonen provide healing and resistance shred, Furina boosts damage and applies Hydro.\n" +
            '\n' +
            "Stack Hydro and Cryo characters to lower enemy resistance via Escoffier's skill and burst, while Furina's buffs and Neuvillette's high HP-scaling damage sweep the field.\n" +
            '\n' +
            'Team composition: Neuvillette (Hydro Main DPS), Furina (Hydro Sub DPS), Xilonen (Geo Support), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'neuvillette',
                role: 'Main DPS',
                roleDesc: 'Deals massive Hydro damage with charged attacks. Benefits from HP% scaling.',
                weapons: ['Tome of the Eternal Flow', 'Sacrificial Jade'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Skill provides continuous Hydro application. Burst increases team damage based on HP changes.',
                weapons: ['Splendor of Tranquil Waters', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'xilonen',
                role: 'Support',
                roleDesc: 'Samplers reduce enemy elemental RES. Provides healing to teammates.',
                weapons: ['Peak Patrol Song', 'Favonius Sword'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['CRIT DMG', 'CRIT Rate', 'DEF%', 'Energy Recharge']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: 'Summons a helper that shoots Cryo projectiles. Burst deals AoE Cryo damage and heals team. Reduces Cryo and Hydro resistance of enemies.',
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Pure Hydro Team #2',
        rank: 'SS',
        description: "A team centered around Escoffier's resistance shred for Hydro and Cryo, with Furina providing DMG buffs and Neuvillette as the main damage dealer. Freeze provides crowd control.\n" +
            '\n' +
            "Leverage Escoffier's Skill and Burst to lower enemy Cryo and Hydro resistance, while Furina's Burst increases damage based on HP fluctuations. Neuvillette unleashes charged attacks for sustained Hydro damage.\n" +
            '\n' +
            'Team composition: Neuvillette (Hydro Main DPS), Furina (Hydro Sub DPS), Charlotte (Cryo Support), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'neuvillette',
                role: 'Main DPS',
                roleDesc: 'Main DPS that deals continuous Hydro damage with Charged Attacks.',
                weapons: ['Tome of the Eternal Flow', 'Sacrificial Jade'],
                artifacts: ['4pc Marechaussee Hunter'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Provides continuous Hydro via Skill and DMG increase from Burst based on HP changes.',
                weapons: ['Splendor of Tranquil Waters', 'Wolf-Fang'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'charlotte',
                role: 'Support',
                roleDesc: 'Healer and provides Cryo for Freeze. Uses Burst for team protection.',
                weapons: ['Thrilling Tales of Dragon Slayers', 'Favonius Codex'],
                artifacts: ['4pc Scroll of the Hero of Cinder City'],
                substats: ['Energy Recharge', 'ATK%', 'HP%']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: 'Summons a mek that shoots Frosty Parfaits. Burst heals and lowers Cryo/Hydro resistance based on party composition.',
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Escoffier Melting Team',
        rank: 'SS',
        description: "A team centered around Mavuika triggering Melt reactions with Escoffier's Cryo application and resistance shred. Furina provides Hydro application and team-wide DMG buffs, while Bennett supplies ATK buffs and healing.\n" +
            '\n' +
            "Escoffier lowers enemies' Cryo and Hydro resistance, enabling Mavuika to deal massive Melt damage. Furina boosts damage via her Burst, and Bennett provides ATK buffs and sustain.\n" +
            '\n' +
            'Team composition: Mavuika (Pyro Main DPS), Furina (Hydro Sub DPS), Bennett (Pyro Support), Escoffier (Cryo Support)',
        members: [
            {
                characterId: 'mavuika',
                role: 'Main DPS',
                roleDesc: 'Main DPS. Her Burst is charged via Nightsoul points and enhances her abilities and resistance to interruption for 7s.',
                weapons: ['A Thousand Blazing Suns', 'Serpent Spine'],
                artifacts: ['4pc Obsidian Codex'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK', 'Elemental Mastery']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: "Sub DPS. Skill provides continuous Hydro application. Burst grants DMG increase based on HP changes of allies, enabled by her Skill's HP drain and healer.",
                weapons: ['Splendor of Tranquil Waters', 'Favonius Sword'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'bennett',
                role: 'Support',
                roleDesc: 'Support/Healer. Burst provides huge ATK buff and healing.',
                weapons: ['Mistsplitter Reforged', 'The Alley Flash'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['Energy Recharge', 'HP%']
            },
            {
                characterId: 'escoffier',
                role: 'Support',
                roleDesc: "Support/Healer. Skill summons a mek that shoots Cryo. Burst deals AoE Cryo damage and heals the team. Both reduce enemies' Cryo and Hydro resistance, scaling with number of Cryo/Hydro characters.",
                weapons: ['Symphonist of Scents', 'Favonius Lance'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK', 'Energy Recharge']
            }
        ]
    }
];
