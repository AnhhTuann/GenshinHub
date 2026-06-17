export const chevreuse = {
  characterId: "chevreuse",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  stats: null,
  ascensionMats: null,
  talentPriority: [
  "Skill",
  "Burst",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Chevreuse Overload Team #3",
        rank: "SS",
        description: "Chevreuse is a Support/Healer in the team. The team's DMG is maximized by Chevreuse. Chevreuse's passive reduces Pyro and Electro RES when Overload is triggered, maximizing team DMG. Her Skill provides an ATK buff to Pyro and Electro characters based on her Max HP.",
        members: [
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
                weapons: [
                    "Aquila Favonia",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "Energy Recharge",
                    "HP%"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Support",
                roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
                weapons: [
                    "Favonius Lance",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "raiden-shogun",
                role: "Sub DPS",
                roleDesc: "Sub DPS. Triggers Electro attacks to enable Overload.",
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
                characterId: "yoimiya",
                role: "Main DPS",
                roleDesc: "Yoimiya is the main DPS, her DMG is amplified by Chevreuse in this team.",
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
        name: "Chevreuse Overload Team #1",
        rank: "SS",
        description: "Maximize team DMG with Chevreuse's Overload RES shred and ATK buff. Cyno drives with infused Electro attacks, Xiangling provides off-field Pyro DMG, and Bennett offers ATK buff and healing.",
        members: [
            {
                characterId: "chevreuse",
                role: "Support",
                roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
                weapons: [
                    "Favonius Lance",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "cyno",
                role: "Main DPS",
                roleDesc: "Main DPS. Runs standard normal ATK with Electro DMG. Maximize stats for continuous combat.",
                weapons: [
                    "Staff of the Scarlet Sands",
                    "Staff of Homa"
                ],
                artifacts: [
                    "4pc Gilded Dreams"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.",
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
                    "Energy Recharge",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
                weapons: [
                    "Aquila Favonia",
                    "Favonius Sword"
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
        name: "Chevreuse Overload Team #2",
        rank: "SS",
        description: "Maximize team DMG by using Chevreuse's passive to reduce element resistance when Overload is triggered, while Bennett provides ATK buff and healing. Raiden Shogun's Elemental Skill boosts Energy Recharge and Elemental Burst DMG of teammates, and she coordinates with Xiangling's Pyro element to trigger Overload.",
        members: [
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Sub DPS. Generates huge coordinated ATK off-field Pyro DMG.",
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
                    "Energy Recharge",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Support/Healer. Bennett provides huge ATK buff and healing.",
                weapons: [
                    "Aquila Favonia",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "Energy Recharge",
                    "HP%"
                ]
            },
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Main DPS. Runs on-field Electro attacks, fills team's energy with energy restoration. Triggers Overload with coordinated Pyro.",
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
                characterId: "chevreuse",
                role: "Support",
                roleDesc: "Support/Healer. Reduces enemy's resistance with RES shred when Overload is triggered, and her Skill grants an ATK buff based on her Max HP. Healing sustain.",
                weapons: [
                    "Favonius Lance",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Vũ Khí Cán Dài Hỗ Trợ Mới",
        nameEn: "New Support Polearm",
        subStat: "HP%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí cán dài hỗ trợ tăng HP% hoặc hiệu ứng tăng sát thương cho cả đội.",
        passiveDescEn: "Assuming a new support polearm, use for its HP% or team buffs.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png"
    },
    {
        rank: 2,
        nameVi: "Thương Tây Phong",
        nameEn: "Favonius Lance",
        subStat: "Hiệu Quả Nạp",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tạo hạt nhân lượng khi bạo kích, giúp giảm mạnh chỉ số nạp yêu cầu cho cả đội.",
        passiveDescEn: "Generates energy particles on CRIT hits, lowering ER requirements for the team.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png"
    },
    {
        rank: 3,
        nameVi: "Giáo Thập Tự Kitain",
        nameEn: "Kitain Cross Spear",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Dòng phụ Tinh Thông Nguyên Tố ít hữu dụng hơn, nhưng nội tại hồi Năng Lượng rất tốt.",
        passiveDescEn: "EM substat is less useful, but the passive provides decent energy regeneration.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Bakufu.png"
    },
    {
        rank: 4,
        nameVi: "Hắc Anh Thương",
        nameEn: "Black Tassel",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn giá rẻ tăng HP% cực lớn để tối đa hóa buff Tấn Công và khả năng trị liệu.",
        passiveDescEn: "Budget HP% stat stick. Maximizes HP for stronger ATK buffs and heals.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Ruby.png"
    },
    {
        rank: 5,
        nameVi: "Thù Lao Của Chính Nghĩa",
        nameEn: "Rightful Reward",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp HP% và khả năng hồi năng lượng từ nội tại khi được trị liệu.",
        passiveDescEn: "Provides HP% and energy regeneration when healed. Good for burst uptime.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Vorpal.png"
    },
    {
        rank: 6,
        nameVi: "Mẫu Tinh Liêm",
        nameEn: "Prototype Starglitter",
        subStat: "Hiệu Quả Nạp",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Dòng phụ Hiệu Quả Nạp giúp nạp Nộ nhanh hơn, nội tại tăng nhẹ sát thương sau E.",
        passiveDescEn: "Energy Recharge substat helps burst uptime. Passive is not the main focus.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Proto.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Nghi Thức Tông Thất Cổ",
        setNameEn: "Noblesse Oblige",
        pieces: 4,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Scroll of the Hero of Cinder City",
        pieces: 4,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    },
    {
        setNameVi: "Mix 2 bộ (HP% / Tăng Trị Liệu / Dấu Ấn)",
        setNameEn: "2-piece Mix (HP% / Healing Bonus / Emblem of Severed Fate)",
        pieces: 2,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    },
    {
        setNameVi: "Thiếu Nữ Đáng Yêu",
        setNameEn: "Maiden Beloved",
        pieces: 4,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    },
    {
        setNameVi: "Xà Cừ Đại Dương",
        setNameEn: "Ocean-Hued Clam",
        pieces: 4,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    },
    {
        setNameVi: "Khúc Ca Ngày Cũ",
        setNameEn: "Song of Days Past",
        pieces: 4,
        sands: [
            "HP%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "HP",
            "Tinh Thông Nguyên Tố"
        ]
    }
]
};
