export const travelerHydro = {
  characterId: "traveler-hydro",
  tier: "D",
  role: "Sub DPS",
  recommendedC: "C6",
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
        name: "Traveler Hydro Bloom Team",
        rank: "S",
        description: "A classic Nilou Bloom team utilizing Hydro Traveler's continuous off-field Hydro application from their Burst, enhanced by Nilou's Bountiful Cores, Nahida's high Dendro application, and Baizhu's shielding/healing.",
        members: [
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies continuous Dendro off-field and shares Elemental Mastery with the active character.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Sacrificial Fragments"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "Elemental Mastery",
                    "CRIT Rate",
                    "CRIT DMG",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "baizhu",
                role: "Support",
                roleDesc: "Dendro Support/Healer. Provides shielding, continuous healing, and boosts Bloom reaction damage.",
                weapons: [
                    "Jadefall's Splendor",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge",
                    "HP"
                ]
            },
            {
                characterId: "nilou",
                role: "Support",
                roleDesc: "Hydro Support. Boosts Bloom reaction damage via Bountiful Cores based on her max HP.",
                weapons: [
                    "Key of Khaj-Nisut",
                    "The Dockhand's Assistant"
                ],
                artifacts: [
                    "2pc Tenacity of the Millelith",
                    "2pc Vourukasha's Glow"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Elemental Mastery",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "traveler-hydro",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro application from Burst to trigger Bloom reactions.",
                weapons: [
                    "Favonius Sword",
                    "Fleuve Cendre Ferryman"
                ],
                artifacts: [
                    "4pc Instructor"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Traveler Hydro F2P Vaporize Team",
        rank: "S",
        description: "A budget/F2P Vaporize team where Hydro Traveler triggers Vaporize reactions on their Elemental Skill and Burst, supported by Xiangling's Pyro application, Bennett's ATK buffs, and Sucrose's Elemental Mastery sharing.",
        members: [
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "ATK Buffer & Healer. Provides a massive ATK buff and continuous healing from his Burst.",
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
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Anemo Support. Swirls Hydro/Pyro to shred enemy resistances and shares Elemental Mastery with the team.",
                weapons: [
                    "Sacrificial Fragments",
                    "Thrilling Tales of Dragon Slayers"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "traveler-hydro",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Triggers Vaporize reactions on their Skill and Burst hits on-field.",
                weapons: [
                    "Favonius Sword",
                    "Fleuve Cendre Ferryman"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Pyro Sub DPS. Deals high off-field Pyro damage and applies Pyro to enable constant Vaporize reactions.",
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
        passiveDescVi: "Hiệu quả nạp cao và nội tại sinh hạt năng lượng khi bạo kích giúp đáp ứng nhu cầu nạp của đội.",
        passiveDescEn: "High Energy Recharge and passive generates Energy particles on CRIT, covering team needs.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Zephyrus.png"
    },
    {
        rank: 2,
        nameVi: "Ống Đồng Cát Tàn",
        nameEn: "Fleuve Cendre Ferryman",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng Hiệu Quả Nạp và Tỷ Lệ Bạo Kích của Kỹ Năng Nguyên Tố, cải thiện khả năng nạp.",
        passiveDescEn: "Boost Energy Recharge and Skill CRIT Rate, improving energy generation.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dirty.png"
    },
    {
        rank: 3,
        nameVi: "Thiên Không Kiêu Hùng",
        nameEn: "Skyward Blade",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp và tăng Tỷ Lệ Bạo Kích, cùng với hiệu ứng lưỡi dao chân không.",
        passiveDescEn: "Provides Energy Recharge and bonus CRIT Rate, plus occasional vacuum blades.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Dvalin.png"
    },
    {
        rank: 4,
        nameVi: "Lời Thề Tự Do Cổ Xưa",
        nameEn: "Freedom-Sworn",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng Tấn Công và sát thương tấn công thường cho cả đội sau khi kích hoạt phản ứng.",
        passiveDescEn: "Boosts party ATK and Normal Attack damage after triggering reactions, ideal for reaction teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Widsith.png"
    },
    {
        rank: 5,
        nameVi: "Kiếm Tế Lễ",
        nameEn: "Sacrificial Sword",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Hiệu quả nạp cao với cơ hội làm mới hồi chiêu kỹ năng, giảm thiểu sự không ổn định khi sinh hạt.",
        passiveDescEn: "High Energy Recharge with a chance to reset Skill cooldown, mitigating particle generation unreliability.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Fossil.png"
    },
    {
        rank: 6,
        nameVi: "Đoản Đao Amenoma",
        nameEn: "Amenoma Kageuchi",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tích lũy năng lượng qua các lần dùng kỹ năng nguyên tố liên tiếp, giảm bớt yêu cầu năng lượng của chiêu nộ.",
        passiveDescEn: "Generates Energy from successive Skill uses, easing Burst requirements.",
        iconUrl: "/images/weapons/UI_EquipIcon_Sword_Bakufu.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Tenacity of the Millelith",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%"
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
            "Sát Thương Nguyên Tố Thủy"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%"
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
            "Sát Thương Nguyên Tố Thủy"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%"
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
            "Sát Thương Nguyên Tố Thủy"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "ATK%"
        ]
    }
]
};
