export const bennett = {
  characterId: "bennett",
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
        name: "Bennett Vaporize Team #2",
        rank: "S",
        description: "Bennett provides huge ATK buff and healing, while Yoimiya triggers Vaporize with Xingqiu's Hydro application, and Kazuha groups enemies and buffs damage.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
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
                roleDesc: "Bennett's Burst provides a huge ATK buff and heals team members.",
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
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Xingqiu's Elemental Burst attaches Hydro element to enemies continuously, reacting with Yoimiya's Pyro DMG to trigger Vaporization.",
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
                characterId: "yoimiya",
                role: "Main DPS",
                roleDesc: "Yoimiya is the main DPS, her DMG is amplified by Vaporization in this team.",
                weapons: [
                    "Thundering Pulse",
                    "Rust"
                ],
                artifacts: [
                    "4pc Shimenawa's Reminiscence"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Bennett Pure Pyro",
        rank: "S",
        description: "A powerful mono-element Pyro team that maximizes Klee and Xiangling's damage with Kazuha's crowd control support and Bennett's ATK buff and healing.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
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
                roleDesc: "Provides huge ATK buff and healing.",
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
            },
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee is the main DPS, her DMG is amplified by Pyro in this team.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Provides a large amount of off-field Pyro DMG.",
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
                    "ATK%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Hu Tao Vaporize with Bennett",
        rank: "S",
        description: "A powerful Vaporize team featuring Hu Tao as main DPS, with Xingqiu providing consistent Hydro application, Sucrose buffing Elemental Mastery, and Bennett providing ATK buff and healing.",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "Hu Tao is the main DPS, her DMG is amplified by Vaporization in this team.",
                weapons: [
                    "Staff of Homa",
                    "Deathmatch"
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
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
                weapons: [
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Heart of Depth"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
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
            },
            {
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
                weapons: [
                    "Sacrificial Fragments",
                    "Mappa Mare"
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
            }
        ]
    },
    {
        name: "Bennett Vaporize Team #3",
        rank: "S",
        description: "Klee team focusing on Vaporize between Klee and Xingqiu, with Sucrose boosting Elemental Mastery and Bennett providing ATK buffs and healing.",
        members: [
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporize with Klee.",
                weapons: [
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Heart of Depth"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
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
            },
            {
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Provides Elemental Mastery bonus to increase Vaporize DMG.",
                weapons: [
                    "Sacrificial Fragments",
                    "Mappa Mare"
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
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee is the main DPS, her DMG is amplified by Vaporization in this team.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Bennett Thunder Team",
        rank: "S",
        description: "Bennett's Burst provides huge ATK buff and healing. Raiden Shogun's Burst DMG is maximized by Kujou Sara (C6)'s Electro CRIT DMG, Kazuha, and Bennett's ATK buff and resistance reduction.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "The main DPS. Boosts teammates' Energy Recharge with Burst and triggers Overload with Bennett.",
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
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Groups enemies, applies crowd control, provides DMG buff, and reduces enemy Elemental Resistance.",
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
                roleDesc: "Provides a massive ATK buff and healing to allies.",
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
            },
            {
                characterId: "kujou-sara",
                role: "Sub DPS",
                roleDesc: "Provides ATK buff to teammates. Her Burst boosts damage and Elemental Mastery.",
                weapons: [
                    "Skyward Harp",
                    "The Stringless"
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
            }
        ]
    },
    {
        name: "Bennett Superconduct Team",
        rank: "S",
        description: "A team focused on maximizing Eula's Burst damage via Superconduct, ATK buff from Bennett, and Diona's Cryo battery.",
        members: [
            {
                characterId: "fischl",
                role: "Sub DPS",
                roleDesc: "Provides continuous off-field Electro damage via Oz.",
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
                characterId: "diona",
                role: "Support",
                roleDesc: "Diona's shield provides safe environment for team members, and acts as a battery for Eula.",
                weapons: [
                    "Sacrificial Bow",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Maiden Beloved"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "eula",
                role: "Main DPS",
                roleDesc: "Eula is the main DPS, her physical DMG is amplified by Superconduct.",
                weapons: [
                    "Song of Broken Pines",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Pale Flame"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
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
        name: "Bennett Vaporize Team",
        rank: "S",
        description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Yanfei is the main DPS, her DMG is amplified by Vaporization in this team.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
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
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
                weapons: [
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Heart of Depth"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
                weapons: [
                    "Sacrificial Fragments",
                    "Mappa Mare"
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
            }
        ]
    },
    {
        name: "Bennett Vaporize Team #1",
        rank: "S",
        description: "Bennett provides huge ATK buff and healing, while Tartaglia's DMG is amplified by Vaporize. Tartaglia triggers Vaporize with Xiangling's Burst, while Kazuha provides crowd control and elemental damage bonus, and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Groups enemies, reduces enemy Element RES, buffs team DMG.",
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
                roleDesc: "Elemental Burst provides huge ATK buff and healing.",
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
            },
            {
                characterId: "tartaglia",
                role: "Main DPS",
                roleDesc: "Main DPS, DMG amplified by Vaporize.",
                weapons: [
                    "Polar Star",
                    "Rust"
                ],
                artifacts: [
                    "4pc Heart of Depth"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Elemental Burst provides huge DMG and continuous Pyro for Vaporize.",
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
                    "ATK%",
                    "Energy Recharge"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Ánh Sáng Đêm Sương Mù",
        nameEn: "Ánh Sáng Đêm Sương Mù",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.",
        passiveDescEn: "Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Narukami.png"
    },
    {
        rank: 2,
        nameVi: "Xá Tội",
        nameEn: "Xá Tội",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.",
        passiveDescEn: "Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Estoc.png"
    },
    {
        rank: 3,
        nameVi: "Thương Diệu",
        nameEn: "Thương Diệu",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.",
        passiveDescEn: "Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_OuterSword.png"
    },
    {
        rank: 4,
        nameVi: "Phong Ưng Kiếm",
        nameEn: "Phong Ưng Kiếm",
        subStat: "Tăng Sát Thương Vật Lý",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.",
        passiveDescEn: "Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Falcon.png"
    },
    {
        rank: 5,
        nameVi: "Tia Sáng Nơi Hẻm Tối",
        nameEn: "Tia Sáng Nơi Hẻm Tối",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.",
        passiveDescEn: "Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Outlaw.png"
    },
    {
        rank: 6,
        nameVi: "Lời Thề Tự Do Cổ Xưa",
        nameEn: "Lời Thề Tự Do Cổ Xưa",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.",
        passiveDescEn: "Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png"
    },
    {
        rank: 7,
        nameVi: "Khúc Ca Núi Đá",
        nameEn: "Khúc Ca Núi Đá",
        subStat: "Phòng Thủ%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.",
        passiveDescEn: "Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png"
    },
    {
        rank: 8,
        nameVi: "Thiên Không Kiếm",
        nameEn: "Thiên Không Kiếm",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.",
        passiveDescEn: "Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png"
    },
    {
        rank: 9,
        nameVi: "Kiếm Gỗ",
        nameEn: "Kiếm Gỗ",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.",
        passiveDescEn: "Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Arakalari.png"
    },
    {
        rank: 10,
        nameVi: "Mẫu Trảm Nham",
        nameEn: "Mẫu Trảm Nham",
        subStat: "Tăng Sát Thương Vật Lý",
        isF2P: true,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.",
        passiveDescEn: "Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Proto.png"
    },
    {
        rank: 11,
        nameVi: "Tai Họa Eshu",
        nameEn: "Tai Họa Eshu",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.",
        passiveDescEn: "Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_SacrificialNgombe.png"
    },
    {
        rank: 12,
        nameVi: "Tây Phong Kiếm",
        nameEn: "Tây Phong Kiếm",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.",
        passiveDescEn: "Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Nghi Thức Tông Thất Cổ",
        setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "ATK%",
            "HP"
        ]
    },
    {
        setNameVi: "Ký Ức Rừng Sâu",
        setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "ATK%",
            "HP"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "ATK%",
            "HP"
        ]
    },
    {
        setNameVi: "Giáo Quan",
        setNameEn: "Giáo Quan",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "ATK%",
            "HP"
        ]
    }
]
};
