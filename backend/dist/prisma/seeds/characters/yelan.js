"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yelan = void 0;
exports.yelan = {
    characterId: "yelan",
    tier: null,
    role: null,
    recommendedC: null,
    tierNoteEn: [],
    tierNoteVi: [],
    talentPriority: [
        "Burst",
        "Skill",
        "Normal Attack"
    ],
    signatureWeapons: [],
    teams: [
        {
            name: "Yelan Vaporization Team #1",
            rank: "SS",
            description: "Arlecchino and Yelan trigger Vaporize reactions. Zhongli provides shield and ATK buff, Bennett provides ATK buff and healing. Arlecchino's infused Pyro attacks paired with Yelan's off-field Hydro enable consistent Vaporize. Zhongli's shield and Tenacity of the Millelith boost ATK, while Bennett's Burst provides further ATK and healing.",
            members: [
                {
                    characterId: "arlecchino",
                    role: "Main DPS",
                    roleDesc: "Pyro Main DPS. Deals massive Pyro damage using Bond of Life mechanics.",
                    weapons: [
                        "Crimson Moon's Semblance",
                        "Deathmatch"
                    ],
                    artifacts: [
                        "4pc Fragment of Harmonious Whimsy"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
                    weapons: [
                        "Aqua Simulacra",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "zhongli",
                    role: "Support",
                    roleDesc: "Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.",
                    weapons: [
                        "Staff of Homa",
                        "Black Tassel"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Pyro Support. Provides healing and massive ATK buff.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "The Alley Flash"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Hu Tao Double Hydro Vap",
            rank: "SS",
            description: "Yelan Vaporization Team (D2) featuring Hu Tao as main DPS, Yelan and Xingqiu providing continuous off-field Hydro applications, and Zhongli for shield and ATK buff. Hu Tao's damage is amplified by Vaporization triggered by the constant off-field Hydro from Yelan and Xingqiu, while Zhongli's shield and Tenacity of the Millelith set ensure safe, uninterrupted damage.",
            members: [
                {
                    characterId: "hu-tao",
                    role: "Main DPS",
                    roleDesc: "Pyro Main DPS. Deals massive Vaporize damage using Charged Attacks.",
                    weapons: [
                        "Staff of Homa",
                        "Ballad of the Fjords"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
                    weapons: [
                        "Aqua Simulacra",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Support",
                    roleDesc: "Hydro Support. Provides continuous off-field Hydro, damage reduction, and minor healing.",
                    weapons: [
                        "Staff of Homa",
                        "Sacrificial Sword"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "zhongli",
                    role: "Support",
                    roleDesc: "Geo Support. Provides unbreakable shield, shreds resistance, and buffs ATK with Tenacity set.",
                    weapons: [
                        "Black Tassel"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Yelan Wanderer Team #1",
            rank: "SS",
            description: "A Wanderer hypercarry team utilizing Yelan's off-field Hydro, Faruzan's Anemo support, and Thoma's shield and off-field Pyro application. Wanderer's Skill elevates his Pyro and Hydro infused NA to boost ATK and stamina. Faruzan shreds Anemo RES and gains CRIT bonus via Skill. Yelan provides off-field Hydro application. Thoma shields and applies Pyro for absorption.",
            members: [
                {
                    characterId: "wanderer",
                    role: "Main DPS",
                    roleDesc: "Anemo Main DPS. Deals high on-field wind damage and infuses elements.",
                    weapons: [
                        "Tulaytullah's Remembrance",
                        "The Widsith"
                    ],
                    artifacts: [
                        "4pc Desert Pavilion Chronicle"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
                    weapons: [
                        "Aqua Simulacra",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "faruzan",
                    role: "Support",
                    roleDesc: "Anemo Support. Shreds Anemo resistance, groups enemies, and buffs Anemo DMG.",
                    weapons: [
                        "Elegy for the End",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "thoma",
                    role: "Support",
                    roleDesc: "Pyro Support. Provides stackable shield and off-field Pyro application.",
                    weapons: [
                        "Staff of Homa",
                        "Kitain Cross Spear"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Yelan Quickbloom Team #1",
            rank: "SS",
            description: "An Electro Quickbloom team featuring Cyno as the main driver, Yelan for off-field Hydro, Nahida for Dendro application, and Baizhu for healing and survivability. Quickbloom team leveraging Cyno's Electro application to trigger Hyperbloom from Bloom cores generated by Nahida and Yelan's Hydro.",
            members: [
                {
                    characterId: "cyno",
                    role: "Main DPS",
                    roleDesc: "Electro Main DPS. Deals high Electro damage during his Burst and triggers reactions.",
                    weapons: [
                        "Staff of the Scarlet Sands",
                        "Ballad of the Fjords"
                    ],
                    artifacts: [
                        "4pc Gilded Dreams"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
                    weapons: [
                        "Aqua Simulacra",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Sub DPS",
                    roleDesc: "Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "baizhu",
                    role: "Support",
                    roleDesc: "Dendro Support. Provides healing, shields, and buffs Dendro reaction damage.",
                    weapons: [
                        "Jadefall's Splendor",
                        "Prototype Amber"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Yelan National Team #1",
            rank: "SS",
            description: "A powerful variation of the National Team that replaces Xingqiu with Yelan for higher personal damage, while maintaining the core synergy of Raiden Shogun enabling burst spam from Xiangling and Yelan, with Bennett providing ATK buff and healing.",
            members: [
                {
                    characterId: "raiden-shogun",
                    role: "Main DPS",
                    roleDesc: "Electro Main DPS. Deals high Electro damage and restores energy for the team.",
                    weapons: [
                        "Engulfing Lightning",
                        "Favonius Lance"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "yelan",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro application and buffs active character DMG.",
                    weapons: [
                        "Aqua Simulacra",
                        "Favonius Warbow"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xiangling",
                    role: "Sub DPS",
                    roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.",
                    weapons: [
                        "Engulfing Lightning",
                        "The Catch"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "The Alley Flash"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Yelan Pure Vaporization Team #3",
            rank: "SS",
            description: "Yelan drives Vaporize with charged attacks, supported by Xiangling's off-field Pyro, Kazuha's Elemental DMG buff, and Bennett's ATK buff. Yelan uses charged attacks to trigger Vaporize consistently, while Xiangling provides Pyro application via her Burst, Kazuha groups enemies and increases team damage, and Bennett heals and buffs ATK.",
            members: [
                {
                    characterId: "yelan",
                    role: "Main DPS",
                    roleDesc: "Hydro Main DPS. Triggers massive Vaporize damage using Charged Attacks.",
                    weapons: [
                        "Aqua Simulacra",
                        "The Stringless"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
                    weapons: [
                        "Freedom-Sworn",
                        "Xiphos' Moonlight"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate"
                    ]
                },
                {
                    characterId: "xiangling",
                    role: "Sub DPS",
                    roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage with Pyronado.",
                    weapons: [
                        "Engulfing Lightning",
                        "The Catch"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Pyro Support. Heals and provides a massive ATK buff.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "The Alley Flash"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Yelan Blooming Team #1",
            rank: "SS",
            description: "This team generates powerful Bountiful Cores from Bloom reactions using Yelan's on-field driver, Nilou's passive, Nahida's Dendro, and Baizhu's healing/shields.",
            members: [
                {
                    characterId: "yelan",
                    role: "Main DPS",
                    roleDesc: "Hydro Main DPS. Drives reactions on-field with Hydro-infused attacks.",
                    weapons: [
                        "Aqua Simulacra",
                        "The Stringless"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "nilou",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Enables Bountiful Cores and provides off-field Hydro application.",
                    weapons: [
                        "Key of Khaj-Nisut",
                        "The Dockhand's Assistant"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "HP%",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Sub DPS",
                    roleDesc: "Dendro Sub DPS. Applies Dendro off-field, marks enemies, and shares EM.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Wandering Evenstar"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "baizhu",
                    role: "Support",
                    roleDesc: "Dendro Support. Provides healing and shields, and buffs team damage.",
                    weapons: [
                        "Jadefall's Splendor",
                        "Prototype Amber"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Ocean-Hued Clam"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Yelan Pure Hydro Team #2",
            rank: "SS",
            description: "Yelan Pure Hydro Team (Chuo). Yelan as the main DPS, supported by Furina, Kazuha, and Jean. Yelan's personal damage is amplified by Furina's DMG bonus and Kazuha's elemental damage buff and resistance shred, while Jean provides healing and Viridescent Venerer buff.",
            members: [
                {
                    characterId: "yelan",
                    role: "Main DPS",
                    roleDesc: "Hydro Main DPS. Deals high Hydro damage on-field.",
                    weapons: [
                        "Aqua Simulacra",
                        "The Stringless"
                    ],
                    artifacts: [
                        "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "furina",
                    role: "Sub DPS",
                    roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
                    weapons: [
                        "Splendor of Tranquil Waters",
                        "Wolf-Fang"
                    ],
                    artifacts: [
                        "4pc Golden Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "HP%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
                    weapons: [
                        "Freedom-Sworn",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate"
                    ]
                },
                {
                    characterId: "jean",
                    role: "Support",
                    roleDesc: "Anemo Support. Instantly heals the entire party and shreds resistances.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "ATK%",
                        "ATK",
                        "Energy Recharge"
                    ]
                }
            ]
        }
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: "Tiếng Thở Dài Vô Tận",
            nameEn: "Tiếng Thở Dài Vô Tận",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.",
            passiveDescEn: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Dvalin.png"
        },
        {
            rank: 2,
            nameVi: "Cung Tây Phong",
            nameEn: "Cung Tây Phong",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.",
            passiveDescEn: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Zephyrus.png"
        },
        {
            rank: 3,
            nameVi: "Nhược Thủy",
            nameEn: "Nhược Thủy",
            subStat: "Sát Thương Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.",
            passiveDescEn: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Kirin.png"
        },
        {
            rank: 4,
            nameVi: "Cung Tế Lễ",
            nameEn: "Cung Tế Lễ",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: false,
            refinement: "R3",
            passiveDescVi: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.",
            passiveDescEn: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Bow_Fossil.png"
        }
    ],
    bestArtifacts: [
        {
            setNameVi: "Dấu Ấn Ngăn Cách",
            setNameEn: "Dấu Ấn Ngăn Cách",
            pieces: 4,
            sands: [
                "Hiệu Quả Nạp",
                "HP%"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Thủy",
                "HP%"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "HP%"
            ],
            subStatsPriority: [
                "Energy Recharge",
                "HP%",
                "CRIT Rate",
                "CRIT DMG",
                "HP"
            ]
        },
        {
            setNameVi: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất",
            setNameEn: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất",
            pieces: 2,
            sands: [
                "Hiệu Quả Nạp",
                "HP%"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Thủy",
                "HP%"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "HP%"
            ],
            subStatsPriority: [
                "Energy Recharge",
                "HP%",
                "CRIT Rate",
                "CRIT DMG",
                "HP"
            ]
        },
        {
            setNameVi: "Thợ Săn Marechaussee",
            setNameEn: "Thợ Săn Marechaussee",
            pieces: 4,
            sands: [
                "Hiệu Quả Nạp",
                "HP%"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Thủy",
                "HP%"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "HP%"
            ],
            subStatsPriority: [
                "Energy Recharge",
                "HP%",
                "CRIT Rate",
                "CRIT DMG",
                "HP"
            ]
        }
    ]
};
