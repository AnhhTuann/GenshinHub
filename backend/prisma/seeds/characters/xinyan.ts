export const xinyan = {
  characterId: "xinyan",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  stats: null,
  ascensionMats: null,
  talentPriority: [
  "Normal Attack",
  "Burst",
  "Skill"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Xinyan Physical Team #2",
        rank: "A",
        description: "A physical team centered around Razor with Electro and Cryo for Superconduct. Xinyan provides shields, Qiqi heals and applies Cryo, and Bennett buffs ATK and heals. Razor's physical damage is maximized by triggering Superconduct to reduce enemy physical resistance. Xinyan provides a shield for safety, Qiqi applies Cryo off-field, and Bennett enhances ATK and healing.",
        members: [
            {
                characterId: "razor",
                role: "Main DPS",
                roleDesc: "Main physical DPS, C4 reduces enemy DEF with Elemental Skill.",
                weapons: [
                    "Wolf's Gravestone",
                    "Prototype Archaic"
                ],
                artifacts: [
                    "4pc Gladiator's Finale"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "xinyan",
                role: "Support",
                roleDesc: "Provides a shield for safe play.",
                weapons: [
                    "Wolf's Gravestone",
                    "Whiteblind"
                ],
                artifacts: [
                    "2pc Crimson Witch of Flames",
                    "2pc Retracing Bolide"
                ],
                substats: [
                    "Energy Recharge",
                    "DEF%",
                    "CRIT DMG",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "qiqi",
                role: "Support",
                roleDesc: "Elemental Skill applies Cryo continuously and heals the team.",
                weapons: [
                    "Skyward Blade",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Maiden Beloved"
                ],
                substats: [
                    "ATK%",
                    "Energy Recharge",
                    "HP%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Elemental Burst provides a large ATK buff and healing.",
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
        name: "Xinyan Overload",
        rank: "A",
        description: "Xinyan's Pyro attacks combine with Electro from Fischl to trigger frequent Overload reactions, dealing AoE Pyro DMG. Kazuha provides Anemo grouping and resistance shred, while Bennett offers ATK buffs and healing.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Kazuha groups enemies, provides Anemo crowd control, DMG buffs, and reduces enemy Pyro and Electro resistance with Swirl.",
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
                characterId: "xinyan",
                role: "Main DPS",
                roleDesc: "Xinyan's Skill reduces enemy DEF and provides a shield to boost DPS. Build with DEF% or ATK% to maximize shield strength and damage.",
                weapons: [
                    "Wolf's Gravestone",
                    "Whiteblind"
                ],
                artifacts: [
                    "4pc Retracing Bolide"
                ],
                substats: [
                    "DEF%",
                    "ATK%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "fischl",
                role: "Sub DPS",
                roleDesc: "Fischl's Skill provides continuous off-field Electro application to trigger Overload, significantly boosts damage.",
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
                roleDesc: "Bennett's Burst provides massive ATK buff and healing, enabling the team to deal more damage and survive.",
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
        name: "Xinyan Physical Team #1",
        rank: "A",
        description: "A physical team centered on Eula, with Cryo and Electro reactions to reduce physical resistance via Superconduct. Maximize Eula's physical damage by using Superconduct to reduce enemy physical resistance, while Xinyan provides shielding and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "eula",
                role: "Main DPS",
                roleDesc: "Eula's physical damage is boosted by Superconduct.",
                weapons: [
                    "Skyward Pride",
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
                characterId: "xinyan",
                role: "Support",
                roleDesc: "Xinyan's shield provides a safe environment for team members.",
                weapons: [
                    "Wolf's Gravestone",
                    "Whiteblind"
                ],
                artifacts: [
                    "2pc Crimson Witch of Flames",
                    "2pc Retracing Bolide"
                ],
                substats: [
                    "Energy Recharge",
                    "DEF%",
                    "CRIT DMG",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Bennett's Burst provides huge ATK buff and healing.",
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
                characterId: "beidou",
                role: "Sub DPS",
                roleDesc: "Beidou's Burst provides continuous Electro DMG off-field to trigger Superconduct.",
                weapons: [
                    "Skyward Pride",
                    "Serpent Spine"
                ],
                artifacts: [
                    "2pc Thundering Fury",
                    "2pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Energy Recharge",
                    "ATK%"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Xích Giác Phá Thạch Đao",
        nameEn: "Xích Giác Phá Thạch Đao",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.",
        passiveDescEn: "Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png"
    },
    {
        rank: 2,
        nameVi: "Thiên Không Kiêu Ngạo",
        nameEn: "Thiên Không Kiêu Ngạo",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.",
        passiveDescEn: "Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dvalin.png"
    },
    {
        rank: 3,
        nameVi: "Kiếm Li Cốt",
        nameEn: "Kiếm Li Cốt",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.",
        passiveDescEn: "Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png"
    },
    {
        rank: 4,
        nameVi: "Kiếm Vô Công",
        nameEn: "Kiếm Vô Công",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.",
        passiveDescEn: "Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png"
    },
    {
        rank: 5,
        nameVi: "Tiếng Gió Trong Rừng Thông",
        nameEn: "Tiếng Gió Trong Rừng Thông",
        subStat: "Sát Thương Vật Lý",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.",
        passiveDescEn: "Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Widsith.png"
    },
    {
        rank: 6,
        nameVi: "Đường Cùng Của Sói",
        nameEn: "Đường Cùng Của Sói",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.",
        passiveDescEn: "Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png"
    },
    {
        rank: 7,
        nameVi: "Vua Biển Hàng Hiệu",
        nameEn: "Vua Biển Hàng Hiệu",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.",
        passiveDescEn: "Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_MillenniaTuna.png"
    },
    {
        rank: 8,
        nameVi: "Tuyết Vùi Tinh Ngân",
        nameEn: "Tuyết Vùi Tinh Ngân",
        subStat: "Sát Thương Vật Lý",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.",
        passiveDescEn: "Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dragonfell.png"
    },
    {
        rank: 9,
        nameVi: "Mẫu Cổ Hoa",
        nameEn: "Mẫu Cổ Hoa",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.",
        passiveDescEn: "Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Proto.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp",
        setNameEn: "Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp",
        pieces: 2,
        sands: [
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Vật Lý"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp",
            "Phòng Ngự%"
        ]
    },
    {
        setNameVi: "Lửa Trắng Xám",
        setNameEn: "Lửa Trắng Xám",
        pieces: 4,
        sands: [
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Vật Lý"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp",
            "Phòng Ngự%"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu",
        setNameEn: "Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu",
        pieces: 2,
        sands: [
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Vật Lý"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp",
            "Phòng Ngự%"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ",
        setNameEn: "Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ",
        pieces: 2,
        sands: [
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Vật Lý"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp",
            "Phòng Ngự%"
        ]
    }
]
};
