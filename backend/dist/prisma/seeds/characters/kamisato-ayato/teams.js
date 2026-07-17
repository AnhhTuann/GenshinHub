"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teams = void 0;
exports.teams = [
    {
        name: 'Ayato Hyperbloom',
        rank: 'SS',
        description: "A high-damage Hyperbloom team leveraging Ayato's continuous Hydro application, Nahida's Dendro, and Kuki's Electro to trigger Hyperbloom, with Kazuha providing grouping and buffs.\n" +
            '\n' +
            "Ayato's Skill applies Hydro to enemies, which reacts with Dendro from Nahida to create Bloom cores. Kuki's Electro Skill then triggers Hyperbloom for massive damage. Kazuha groups enemies and reduces Anemo resistance with Viridescent Venerer.\n" +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Nahida (Dendro Sub DPS), Kaedehara Kazuha (Anemo Support), Kuki Shinobu (Electro Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'Ayato is the Main DPS, his continuous Hydro attacks trigger reactions.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: "Nahida deals DMG via Skill connecting up to 8 enemies and triggering reactions. Her Burst buffs the Skill based on teammates' elements.",
                weapons: ['A Thousand Floating Dreams', 'Solar Pearl'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'ATK%',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: 'Kazuha groups enemies, applies crowd control, provides DMG buffs, and reduces Anemo resistance.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'kuki-shinobu',
                role: 'Support',
                roleDesc: 'Kuki heals the team and triggers Hyperbloom with her Electro Skill. Maximize Elemental Mastery for high Hyperbloom damage.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Gilded Dreams'],
                substats: ['Elemental Mastery', 'HP%', 'HP', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayato Burgeon',
        rank: 'SS',
        description: "A team that uses Hydro and Dendro to generate Bloom cores, then triggers Burgeon with Thoma's Burst.\n" +
            '\n' +
            "Apply Dendro with Nahida and Hydro with Ayato and Yelan to create Bloom cores. Thoma's Burst triggers Burgeon on active character normal attacks.\n" +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Yelan (Hydro Sub DPS), Nahida (Dendro Sub DPS), Thoma (Pyro Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: "Main DPS using normal attacks to trigger Burgeon via Thoma's Burst.",
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'nahida',
                role: 'Sub DPS',
                roleDesc: 'Applies Dendro with Skill and buffs Burst duration via teammate elements.',
                weapons: ['A Thousand Floating Dreams', 'Solar Pearl'],
                artifacts: ['4pc Deepwood Memories'],
                substats: [
                    'CRIT DMG',
                    'CRIT Rate',
                    'Elemental Mastery',
                    'ATK%',
                    'Energy Recharge'
                ]
            },
            {
                characterId: 'yelan',
                role: 'Sub DPS',
                roleDesc: 'Off-field Hydro application to generate Bloom cores.',
                weapons: ['Aqua Simulacra', 'Favonius Warbow'],
                artifacts: ['4pc Emblem of Severed Fate'],
                substats: ['HP%', 'Energy Recharge', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'thoma',
                role: 'Support',
                roleDesc: 'Provides shield and triggers Burgeon via Burst. C6 boosts Ayato normal attack DMG.',
                weapons: ['Kitain Cross Spear', 'Black Tassel'],
                artifacts: ['4pc Flower of Paradise Lost'],
                substats: ['Energy Recharge', 'Elemental Mastery', 'HP%']
            }
        ]
    },
    {
        name: 'Ayato Pure Hydro Team #2',
        rank: 'SS',
        description: 'Ayato is a Main DPS. His damage is maximized by ATK SPD buff from Yun Jin and Jean.\n' +
            '\n' +
            "Maximize Ayato's damage using Yun Jin's Normal ATK buff and ATK SPD from C6 Yun Jin and C2 Jean. Jean also provides Viridescent Venerer shred for Hydro resistance.\n" +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Furina (Hydro Sub DPS), Yun Jin (Geo Support), Jean (Anemo Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'DMG maximized by ATK SPD buff from Yun Jin and Jean.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%']
            },
            {
                characterId: 'furina',
                role: 'Sub DPS',
                roleDesc: 'Elemental Burst provides DMG increase based on HP changes. Elemental Skill burns allies HP.',
                weapons: ['Splendor of Tranquil Waters', 'Fleuve Cendre Ferryman'],
                artifacts: ['4pc Golden Troupe'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'yun-jin',
                role: 'Support',
                roleDesc: 'Provides Normal ATK Bonus and Normal ATK SPD Bonus (C6) to Ayato.',
                weapons: ['Kitain Cross Spear', 'Favonius Lance'],
                artifacts: ['4pc Husk of Opulent Dreams'],
                substats: ['DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge']
            },
            {
                characterId: 'jean',
                role: 'Support',
                roleDesc: 'Healer, spreads element, reduces enemy RES. C2 gives 15% ATK SPD to all characters.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayato Pure Hydro Team',
        rank: 'SS',
        description: "Ayato is a Main DPS in the team. His DMG is maximized by Support's Artifacts and ATK SPD buff from Yun Jin.\n" +
            '\n' +
            'Kazuha reduces Hydro resistance with Swirl, while Zhongli and Yun Jin provide shields and ATK SPD buffs, allowing Ayato to deal continuous Hydro damage.\n' +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Kaedehara Kazuha (Anemo Support), Yun Jin (Geo Support), Zhongli (Geo Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'Continuous Hydro DPS relying on Normal Attacks after supports set up.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'yun-jin',
                role: 'Support',
                roleDesc: 'Provides Normal ATK Bonus and ATK SPD buff to Ayato via Burst.',
                weapons: ['Kitain Cross Spear', 'Favonius Lance'],
                artifacts: ['4pc Noblesse Oblige'],
                substats: ['DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge']
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
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies, reduces Hydro resistance, and provides DMG buff.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Ayato Vaporize Team #2',
        rank: 'SS',
        description: 'The Normal ATK DMG Output of Ayato and Yoimiya is maximized by Vaporization and ATK SPD buff from Yun Jin.\n' +
            '\n' +
            'Ayato and Yoimiya alternate as on-field DPS, triggering Vaporize reactions. Yun Jin boosts their Normal ATK DMG and ATK SPD, while Zhongli provides shielding and ATK buff via Tenacity of the Millelith.\n' +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Yoimiya (Pyro Main DPS), Yun Jin (Geo Support), Zhongli (Geo Support)',
        members: [
            {
                characterId: 'yoimiya',
                role: 'Main DPS',
                roleDesc: 'Deals Pyro DMG with Normal Attacks after Elemental Skill enabling Vaporize reactions.',
                weapons: ['Thundering Pulse', 'Rust'],
                artifacts: ["4pc Shimenawa's Reminiscence"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: "Applies Hydro continuously with Normal Attacks to enable Vaporize. Elemental Burst increases Yoimiya's ATK SPD.",
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Provides a strong shield for safe field time and ATK buff to the team via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'yun-jin',
                role: 'Support',
                roleDesc: 'Provides Normal ATK Bonus and ATK SPD bonus (C6) to Ayato and Yoimiya.',
                weapons: ['Kitain Cross Spear', 'Favonius Lance'],
                artifacts: ['4pc Husk of Opulent Dreams'],
                substats: ['DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayato Electro-Charged Team #2',
        rank: 'S',
        description: 'Ayato drives Electro-Charged reactions with continuous Hydro application, while Fischl and Beidou provide off-field Electro. Jean (C2) heals, shreds resistance with Viridescent Venerer, and boosts attack speed.\n' +
            '\n' +
            "Ayato's Hydro attacks react with Electro from Fischl and Beidou to trigger Electro-Charged, while Jean provides healing, Anemo RES shred, and attack speed buff at C2.\n" +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Fischl (Electro Sub DPS), Beidou (Electro Sub DPS), Jean (Anemo Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'Continuous Hydro attacks trigger Electro-Charged with off-field Electro.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'fischl',
                role: 'Sub DPS',
                roleDesc: 'Off-field Electro application via Skill to enable Electro-Charged. C6 is a significant upgrade.',
                weapons: ['Skyward Harp', 'The Stringless'],
                artifacts: ['4pc Thundering Fury'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'beidou',
                role: 'Sub DPS',
                roleDesc: 'Off-field Electro via Burst for consistent Electro-Charged.',
                weapons: ['Skyward Pride', 'Serpent Spine'],
                artifacts: ['2pc Noblesse Oblige + 2pc Thundering Fury'],
                substats: ['CRIT DMG', 'CRIT Rate', 'Energy Recharge', 'ATK%']
            },
            {
                characterId: 'jean',
                role: 'Support',
                roleDesc: 'Heals, shreds Electro and Hydro RES with Viridescent Venerer, and provides 15% attack speed at C2.',
                weapons: ['Skyward Blade', 'Favonius Sword'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayato Vaporize #1',
        rank: 'SS',
        description: 'Ayato and Hu Tao maximize Normal ATK DMG through Vaporize and ATK SPD buff from Yun Jin.\n' +
            '\n' +
            "Ayato's continuous Hydro attacks enable Vaporize for Hu Tao, while Yun Jin boosts Normal ATK DMG and SPD. Zhongli provides shield and ATK buff.\n" +
            '\n' +
            'Team composition: Kamisato Ayato (Hydro Main DPS), Hu Tao (Pyro Main DPS), Yun Jin (Geo Support), Zhongli (Geo Support)',
        members: [
            {
                characterId: 'hu-tao',
                role: 'Main DPS',
                roleDesc: 'Triggers Vaporize with Pyro application from Ayato. Switches to Ayato when Skill is on cooldown.',
                weapons: ['Staff of Homa', 'Deathmatch'],
                artifacts: ['4pc Crimson Witch of Flames'],
                substats: ['CRIT DMG', 'CRIT Rate', 'HP%', 'Elemental Mastery', 'ATK%']
            },
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: "Continuous Hydro attacks apply Hydro for Vaporize. Burst increases Hu Tao's ATK SPD.",
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'zhongli',
                role: 'Support',
                roleDesc: 'Shield provides safe environment and ATK boost via Tenacity of the Millelith.',
                weapons: ['Staff of Homa', 'Black Tassel'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            },
            {
                characterId: 'yun-jin',
                role: 'Support',
                roleDesc: 'Provides Normal ATK Bonus and ATK SPD (C6) to both Ayato and Hu Tao.',
                weapons: ['Kitain Cross Spear', 'Favonius Lance'],
                artifacts: ['4pc Husk of Opulent Dreams'],
                substats: ['DEF%', 'DEF', 'CRIT DMG', 'CRIT Rate', 'Energy Recharge']
            }
        ]
    },
    {
        name: 'Ayato Permafrost',
        rank: 'SS',
        description: 'Ayato and Ayaka trigger Freeze with Hydro and Cryo while Kazuha groups enemies and Kokomi provides healing.\n' +
            '\n' +
            'Ayaka applies Cryo off-field while Ayato and Kokomi provide consistent Hydro application to trigger Freeze. Kazuha groups enemies and buffs Cryo damage.\n' +
            '\n' +
            'Team composition: Kamisato Ayaka (Cryo Sub DPS), Kamisato Ayato (Hydro Main DPS), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'Primary on-field DPS. Continuous Hydro attacks react with Cryo to Freeze. Burst increases Attack SPD of Ayaka.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'kamisato-ayaka',
                role: 'Sub DPS',
                roleDesc: 'Deals high DMG with Burst and Skill, providing Cryo application to trigger Freeze.',
                weapons: ['Mistsplitter Reforged', 'Amenoma Kageuchi'],
                artifacts: ['4pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'sangonomiya-kokomi',
                role: 'Support',
                roleDesc: 'Healer and Hydro applicator. Skill triggers Tenacity of the Millelith to buff team ATK and sustain Freeze.',
                weapons: ['Everlasting Moonglow', 'Thrilling Tales of Dragon Slayers'],
                artifacts: ['4pc Tenacity of the Millelith'],
                substats: ['HP%', 'Energy Recharge', 'HP', 'ATK%', 'Elemental Mastery']
            },
            {
                characterId: 'kaedehara-kazuha',
                role: 'Support',
                roleDesc: 'Groups enemies with Skill and Burst, provides Elemental DMG Bonus to team and reduces enemy resistance with Viridescent Venerer.',
                weapons: ['Freedom-Sworn', 'Iron Sting'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['Elemental Mastery', 'CRIT DMG', 'CRIT Rate', 'ATK%']
            }
        ]
    },
    {
        name: 'Ayato Permafrost Team #2',
        rank: 'SS',
        description: "A Freeze team where Ayato's Hydro attacks and Ganyu's Cryo Burst lock enemies in ice, while Venti groups them and Diona provides shield and energy.\n" +
            '\n' +
            "Freeze enemies using Ayato's Hydro application and Ganyu's Cryo Burst, grouped by Venti and protected by Diona.\n" +
            '\n' +
            'Team composition: Ganyu (Cryo Sub DPS), Kamisato Ayato (Hydro Main DPS), Venti (Anemo Support), Diona (Cryo Support)',
        members: [
            {
                characterId: 'kamisato-ayato',
                role: 'Main DPS',
                roleDesc: 'Continuous Hydro attacks trigger Freeze with Cryo. Burst boosts team Attack SPD.',
                weapons: ['Haran Geppaku Futsu', 'The Black Sword'],
                artifacts: ["4pc Nymph's Dream"],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'HP%', 'Energy Recharge']
            },
            {
                characterId: 'ganyu',
                role: 'Sub DPS',
                roleDesc: 'Deals Cryo via Burst and Charged Attack. Provides Cryo for Freeze.',
                weapons: ["Hunter's Path", 'Hamayumi'],
                artifacts: ['2pc Noblesse Oblige + 2pc Blizzard Strayer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%', 'Energy Recharge']
            },
            {
                characterId: 'venti',
                role: 'Support',
                roleDesc: 'Groups enemies with Burst and spreads Hydro for wider Freeze.',
                weapons: ['Elegy for the End', 'Rust'],
                artifacts: ['4pc Viridescent Venerer'],
                substats: ['CRIT DMG', 'CRIT Rate', 'ATK%']
            },
            {
                characterId: 'diona',
                role: 'Support',
                roleDesc: 'Shield provides safety and Cryo battery for Ganyu.',
                weapons: ['Sacrificial Bow', 'Favonius Warbow'],
                artifacts: ['4pc Maiden Beloved'],
                substats: ['HP%', 'HP', 'Energy Recharge']
            }
        ]
    }
];
