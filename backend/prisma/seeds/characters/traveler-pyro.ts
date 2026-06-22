export const travelerPyro = {
  characterId: "traveler-pyro",
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
        name: "Traveler Pyro Burning Team",
        rank: "S",
        description: "A Burning-focused team where Kinich deals high Dendro damage on-field, Emilie acts as an off-field Dendro Sub DPS, Bennett provides massive ATK buffs and healing, and Pyro Traveler applies consistent off-field Pyro.",
        members: [
            {
                characterId: "emilie",
                role: "Sub DPS",
                roleDesc: "Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.",
                weapons: [
                    "Lumidouce Elegy",
                    "Deathmatch"
                ],
                artifacts: [
                    "4pc Unfinished Reverie"
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
                roleDesc: "Healer/Buffer. Provides massive ATK buff and consistent healing via Elemental Burst.",
                weapons: [
                    "Mistsplitter Reforged",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge",
                    "HP",
                    "ATK%"
                ]
            },
            {
                characterId: "traveler-pyro",
                role: "Support",
                roleDesc: "Pyro Support. Provides Pyro resonance, off-field Pyro application, and team buffs via Scroll of the Hero set.",
                weapons: [
                    "Favonius Sword",
                    "Peak Patrol Song"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            },
            {
                characterId: "kinich",
                role: "Main DPS",
                roleDesc: "On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.",
                weapons: [
                    "Fang of the Mountain King",
                    "Earth Shaker"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
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
        name: "Traveler Pyro Vaporize Team",
        rank: "S",
        description: "A premium Vaporize team featuring Mavuika as the primary on-field Pyro DPS, Furina for off-field Hydro application and DMG buffs, Xilonen for healing and RES shred, and Pyro Traveler for Pyro resonance and off-field support.",
        members: [
            {
                characterId: "mavuika",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
                weapons: [
                    "Arianrhod",
                    "Earth Shaker"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS / Buffer",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "HP%",
                    "CRIT DMG",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "traveler-pyro",
                role: "Support",
                roleDesc: "Pyro Support. Enables Pyro resonance, helps keep Pyro/Hydro aura, and buffs the team with Instructor/Scroll.",
                weapons: [
                    "Favonius Sword",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            },
            {
                characterId: "xilonen",
                role: "Support / Healer",
                roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "DEF%",
                    "Energy Recharge",
                    "DEF",
                    "CRIT Rate"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Tây Phong Kiếm",
        nameEn: "Favonius Sword",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Kích hoạt bạo kích có tỷ lệ sinh ra một lượng nhỏ Nguyên Tố Hạt Nhân, hồi năng lượng cho toàn đội.",
        passiveDescEn: "CRIT hits generate Energy particles, accelerating team Burst uptime.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png"
    },
    {
        rank: 2,
        nameVi: "Khúc Ca Núi Đá",
        nameEn: "Peak Patrol Song",
        subStat: "Phòng Ngự%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sau khi dùng Kỹ Năng Nguyên Tố hoặc Nộ, tăng sát thương cho toàn đội 24% trong 15s.",
        passiveDescEn: "After using Skill or Burst, increases party damage by 24% for 15s.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_XochitlsTube.png"
    },
    {
        rank: 3,
        nameVi: "Lời Thề Tự Do Cổ Xưa",
        nameEn: "Freedom-Sworn",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Kích hoạt phản ứng nguyên tố tăng Tấn Công đánh thường/trọng kích/tấn công khi đáp thêm 16% và Tấn Công 20% cho cả đội.",
        passiveDescEn: "Triggering reactions builds stacks; at max, boosts team's Normal/Charged/Plunging ATK by 16% and ATK by 20%.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png"
    },
    {
        rank: 4,
        nameVi: "Chìa Khóa Khaj-Nisut",
        nameEn: "Key of Khaj-Nisut",
        subStat: "HP%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Gia tăng HP và chuyển hóa HP thành Tinh Thông Nguyên Tố cho toàn đội từ 100-200 điểm, tối ưu hóa phản ứng.",
        passiveDescEn: "HP% substat and passive grant team 100-200 Elemental Mastery, perfect for Vaporize/Melt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Deshret.png"
    },
    {
        rank: 5,
        nameVi: "Kiếm Tế Lễ",
        nameEn: "Sacrificial Sword",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Khi Kỹ Năng Nguyên Tố gây sát thương có tỷ lệ làm mới thời gian chờ kỹ năng đó, cho phép kích hoạt kỹ năng liên tiếp.",
        passiveDescEn: "Resets Skill cooldown on hit, allowing double Tap Ring or Hold Coordinated attacks.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Fossil.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Mix 2 bộ Hiệu Quả Nạp +20%",
        setNameEn: "Mix 2 bộ Hiệu Quả Nạp +20%",
        pieces: 2,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "DEF%"
        ]
    },
    {
        setNameVi: "Giáo Quan",
        setNameEn: "Instructor",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "DEF%"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Scroll of the Hero of Cinder City",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "DEF%"
        ]
    },
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Tenacity of the Millelith",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "DEF%"
        ]
    },
    {
        setNameVi: "Nghi Thức Tông Thất Cổ",
        setNameEn: "Noblesse Oblige",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "DEF%"
        ]
    }
]
};
