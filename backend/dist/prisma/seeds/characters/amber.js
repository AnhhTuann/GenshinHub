"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amber = void 0;
exports.amber = {
    characterId: "amber",
    tier: null,
    role: null,
    recommendedC: null,
    tierNoteEn: [],
    tierNoteVi: [],
    talentPriority: [
        "Normal Attack",
        "Skill",
        "Burst"
    ],
    signatureWeapons: [],
    teams: [
        {
            name: "Amber Vaporize Team",
            rank: "S",
            description: "The DMG of Amber is maximized by Vaporization. Maximize Amber's damage through Vaporize reactions by using Xingqiu's Hydro application, Kazuha's buffing and resistance shred, and Bennett's ATK buff and healing.",
            members: [
                {
                    characterId: "amber",
                    role: "Main DPS",
                    roleDesc: "Amber is the main DPS, her DMG is amplified by Vaporization in this team.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "Xingqiu's Elemental Burst can attach Hydro element to enemies continuously, and so react with Amber's Pyro DMG to trigger Vaporization.",
                    weapons: [
                        "Sacrificial Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha can assist the team by grouping enemies together, applying Swirl control, provide DMG buff to teammates, and reduce Elemental Resistance of enemies.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Vaporize Amber",
            rank: "S",
            description: "Amber's damage is maximized by Vaporize, utilizing Xingqiu's consistent Hydro application and Kazuha's support, with Bennett providing ATK buff and healing. Amber's charged attacks trigger Vaporize with Xingqiu's Hydro application, while Kazuha provides grouping and damage buffs, and Bennett heals and boosts ATK.",
            members: [
                {
                    characterId: "amber",
                    role: "Main DPS",
                    roleDesc: "Amber deals damage with Charged Attack to trigger Vaporize.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "Xingqiu's Elemental Burst applies Hydro continuously to enable Vaporize.",
                    weapons: [
                        "Sacrificial Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha groups enemies and provides Elemental Mastery buff and Anemo RES shred.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett's Elemental Burst provides ATK buff and healing.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Amber Melt Team",
            rank: "S",
            description: "The DMG of Ayaka is maximized by Melt. Maximize Ayaka's Melt damage by applying Pyro with Amber and Bennett while Zhongli provides shielding and ATK buffs.",
            members: [
                {
                    characterId: "ayaka",
                    role: "Main DPS",
                    roleDesc: "Deals DMG by her Burst, and her Cryo DMG reacts with Pyro attachment from Amber's Skill to trigger Melt.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "Amenoma Kageuchi"
                    ],
                    artifacts: [
                        "4pc Blizzard Strayer"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "amber",
                    role: "Sub DPS",
                    roleDesc: "Works with Ayaka to trigger Melt by her Skill.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "zhongli",
                    role: "Support",
                    roleDesc: "Provides shield for safe environment and increases ATK of whole team using full set of Tenacity of the Millelith.",
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
                    roleDesc: "His Burst provides huge ATK buff and healing to other members.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Ayaka Melt",
            rank: "S",
            description: "The DMG of Ayaka is maximized by Melting. Ayaka's Cryo DMG reacts with Pyro from Amber's Skill to trigger Melt, while Zhongli provides shield and ATK buff, and Bennett provides ATK buff and healing.",
            members: [
                {
                    characterId: "ayaka",
                    role: "Main DPS",
                    roleDesc: "Ayaka deals DMG by her Burst, and her Cryo DMG reacts with Pyro attachment from Amber's Skill to trigger Melting.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "Amenoma Kageuchi"
                    ],
                    artifacts: [
                        "4pc Blizzard Strayer"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "amber",
                    role: "Sub DPS",
                    roleDesc: "Amber is the Sub DPS, which works with Ayaka to trigger Melting.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "zhongli",
                    role: "Support",
                    roleDesc: "Zhongli's shield provides safe environment for team members, and increases ATK of whole team by using full set of Tenacity of the Millelith.",
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
                    roleDesc: "Bennett's Burst provides huge ATK buff and healing to other members.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Amber Overload Team #1",
            rank: "S",
            description: "Amber's Pyro attachment reacts with Electro attachment from Raiden Shogun to trigger frequent Overload.",
            members: [
                {
                    characterId: "raiden-shogun",
                    role: "Main DPS",
                    roleDesc: "Raiden Shogun is the main DPS. The DMG of Elemental Burst depends on the energy consumed by team members using their Elemental Burst.",
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
                        "ATK%"
                    ]
                },
                {
                    characterId: "amber",
                    role: "Sub DPS",
                    roleDesc: "Amber is the Sub DPS, which works with Raiden Shogun to trigger Overload.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha can assist the team by grouping enemies together, applying Swirl control, provide DMG buff to teammates, and reduce Elemental Resistance of enemies.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Raiden Overload",
            rank: "S",
            description: "The team triggers frequent Overload reactions between Raiden Shogun's Electro and Amber's Pyro. Kazuha groups enemies and buffs damage, while Bennett provides ATK buff and healing.",
            members: [
                {
                    characterId: "raiden-shogun",
                    role: "Main DPS",
                    roleDesc: "Raiden Shogun deals Burst damage scaling with team's energy consumption.",
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
                        "ATK%"
                    ]
                },
                {
                    characterId: "amber",
                    role: "Sub DPS",
                    roleDesc: "Amber is the Sub DPS, works with Raiden Shogun to trigger Overload.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha groups enemies, applies swirled control, buffs team DMG, and reduces enemy Elemental Resistance.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett provides huge ATK and healing via Burst.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
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
            name: "Amber's Reaction Overload",
            rank: "S",
            description: "Amber's Pyro triggers Overload with Fischl's Electro and Vaporization with Xingqiu's Hydro. Combines Pyro reactions: Overload from Amber and Fischl, and Vaporization from Amber and Xingqiu, supported by Bennett.",
            members: [
                {
                    characterId: "amber",
                    role: "Main DPS",
                    roleDesc: "Main DPS triggering Overload with Fischl and Vaporization with Xingqiu.",
                    weapons: [
                        "Thundering Pulse",
                        "Rust"
                    ],
                    artifacts: [
                        "4pc Crimson Witch of Flames"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "Provides continuous Hydro application via Burst to enable Vaporization.",
                    weapons: [
                        "Sacrificial Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "fischl",
                    role: "Sub DPS",
                    roleDesc: "Off-field Electro via Skill for Overload. Oz provides a significant upgrade.",
                    weapons: [
                        "Skyward Harp",
                        "The Stringless"
                    ],
                    artifacts: [
                        "4pc Thundering Fury"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Provides ATK buff and healing via Burst.",
                    weapons: [
                        "Skyward Blade",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                }
            ]
        }
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: "Màn Ảo Thuật Đầu Tiên",
            nameEn: "Màn Ảo Thuật Đầu Tiên",
            subStat: "Sát Thương Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.",
            passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Pledge.png"
        },
        {
            rank: 2,
            nameVi: "Nhược Thủy",
            nameEn: "Nhược Thủy",
            subStat: "Sát Thương Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.",
            passiveDescEn: "Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png"
        },
        {
            rank: 3,
            nameVi: "Sấm Sét Rung Động",
            nameEn: "Sấm Sét Rung Động",
            subStat: "Sát Thương Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.",
            passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Narukami.png"
        },
        {
            rank: 4,
            nameVi: "Cánh Thiên Không",
            nameEn: "Cánh Thiên Không",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.",
            passiveDescEn: "Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png"
        },
        {
            rank: 5,
            nameVi: "Ngôi Sao Cực Đông",
            nameEn: "Ngôi Sao Cực Đông",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.",
            passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png"
        },
        {
            rank: 6,
            nameVi: "Nỏ Kéo",
            nameEn: "Nỏ Kéo",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.",
            passiveDescEn: "Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Sling.png"
        },
        {
            rank: 7,
            nameVi: "Cung Amos",
            nameEn: "Cung Amos",
            subStat: "Tấn Công%",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.",
            passiveDescEn: "Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Amos.png"
        },
        {
            rank: 8,
            nameVi: "Con Đường Thợ Săn",
            nameEn: "Con Đường Thợ Săn",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.",
            passiveDescEn: "Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Ayus.png"
        },
        {
            rank: 9,
            nameVi: "Mỏ Cò Xuyên Thấu",
            nameEn: "Mỏ Cò Xuyên Thấu",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.",
            passiveDescEn: "Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Ibis.png"
        },
        {
            rank: 10,
            nameVi: "Cung Sắc Xanh",
            nameEn: "Cung Sắc Xanh",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.",
            passiveDescEn: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Viridescent.png"
        },
        {
            rank: 11,
            nameVi: "Cung Trừ Ma",
            nameEn: "Cung Trừ Ma",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.",
            passiveDescEn: "Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Bakufu.png"
        },
        {
            rank: 12,
            nameVi: "Mẫu Đạm Nguyệt",
            nameEn: "Mẫu Đạm Nguyệt",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.",
            passiveDescEn: "Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Proto.png"
        },
        {
            rank: 13,
            nameVi: "Khúc Ca Tĩnh Lặng",
            nameEn: "Khúc Ca Tĩnh Lặng",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.",
            passiveDescEn: "Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Vorpal.png"
        },
        {
            rank: 14,
            nameVi: "Bài Ca Hoa Gió",
            nameEn: "Bài Ca Hoa Gió",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.",
            passiveDescEn: "Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fleurfair.png"
        },
        {
            rank: 15,
            nameVi: "Tuyệt Huyền",
            nameEn: "Tuyệt Huyền",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.",
            passiveDescEn: "Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Troupe.png"
        },
        {
            rank: 16,
            nameVi: "Lời Thề Xạ Thủ Thần",
            nameEn: "Lời Thề Xạ Thủ Thần",
            subStat: "Sát Thương Bạo Kích",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.",
            passiveDescEn: "Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Arjuna.png"
        },
        {
            rank: 17,
            nameVi: "Cận Vệ Nhà Vua",
            nameEn: "Cận Vệ Nhà Vua",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.",
            passiveDescEn: "Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Arakalari.png"
        },
        {
            rank: 18,
            nameVi: "Hậu Duệ Mặt Trời",
            nameEn: "Hậu Duệ Mặt Trời",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.",
            passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.",
            iconUrl: "/images/weapons/UI_EquipIcon_Bow_Gurabad.png"
        }
    ],
    bestArtifacts: [
        {
            setNameVi: "Dòng Hồi Ức Bất Tận",
            setNameEn: "Dòng Hồi Ức Bất Tận",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "CRIT DMG",
                "ATK%",
                "Elemental Mastery"
            ]
        },
        {
            setNameVi: "Đoàn Hát Lang Thang Đại Lục",
            setNameEn: "Đoàn Hát Lang Thang Đại Lục",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "CRIT DMG",
                "ATK%",
                "Elemental Mastery"
            ]
        },
        {
            setNameVi: "Diệm Liệt Ma Nữ Cháy Rực",
            setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "CRIT DMG",
                "ATK%",
                "Elemental Mastery"
            ]
        },
        {
            setNameVi: "Giấc Mộng Hoàng Kim",
            setNameEn: "Giấc Mộng Hoàng Kim",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "CRIT DMG",
                "ATK%",
                "Elemental Mastery"
            ]
        },
        {
            setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
            setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
            pieces: 2,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "CRIT DMG",
                "ATK%",
                "Elemental Mastery"
            ]
        }
    ]
};
