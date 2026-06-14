export const sigewinne = {
  characterId: "sigewinne",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  talentPriority: [
  "Skill",
  "Burst",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Sigewinne Pure Hydro",
        rank: "SS",
        description: "The team focuses on dealing Hydro damage, with Sigewinne providing healing and Elemental Skill damage buffs, while Yelan and Furina output damage and Kazuha provides grouping and resistance shred.",
        members: [
            {
                characterId: "yelan",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Deals high on-field single-target Hydro damage with coordinated attacks from Burst.",
                weapons: [
                    "Aqua Simulacra",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
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
                roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Hydro DMG.",
                weapons: [
                    "Xiphos' Moonlight",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT DMG",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge ramping damage buffs to the team.",
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
                characterId: "sigewinne",
                role: "Support",
                roleDesc: "Hydro Support. Provides team-wide healing via her Skill and buffs teammates' off-field Elemental Skill DMG.",
                weapons: [
                    "Silvershower Heartstrings",
                    "Recurve Bow"
                ],
                artifacts: [
                    "2pc Tenacity of the Millelith",
                    "2pc Vourukasha's Glow"
                ],
                substats: [
                    "HP%",
                    "HP"
                ]
            }
        ]
    },
    {
        name: "Sigewinne For Fun",
        rank: "S",
        description: "A for-fun team where Traveler (Geo) and Zhongli's Geo construct resonance is the main DMG source, speeding up Sigewinne's passive. Sigewinne heals and boosts Skill DMG. Geo construct resonance between Traveler (Geo) and Zhongli triggers Sigewinne's passive talent for additional damage, while Furina provides off-field Hydro and DMG buffs.",
        members: [
            {
                characterId: "sigewinne",
                role: "Support",
                roleDesc: "Hydro Support. Restores team HP and buffs off-field Elemental Skill DMG.",
                weapons: [
                    "Silvershower Heartstrings",
                    "Recurve Bow"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Supplies off-field Hydro attacks and massive damage buffs.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
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
                characterId: "traveler-geo",
                role: "Main DPS",
                roleDesc: "Geo Main DPS. Places Geo constructs that resonate with Zhongli's pillars to deal AoE Geo damage.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "2pc Gladiator's Finale",
                    "2pc Shimenawa's Reminiscence"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "HP%"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Geo Support. Creates a powerful shield, shreds enemy RES, and places resonating pillars.",
                weapons: [
                    "Staff of Homa"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "HP%"
                ]
            }
        ]
    },
    {
        name: "Sigewinne Bloom Team",
        rank: "SS",
        description: "Bloom team utilizing Nilou's passive to create Bountiful Cores for massive AoE Dendro damage, with Alhaitham as on-field driver, Furina providing off-field Hydro and damage buffs, and Sigewinne healing to sustain Furina's HP drain.",
        members: [
            {
                characterId: "alhaitham",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Infuses attacks with Dendro and triggers rapid Bloom reactions on-field.",
                weapons: [
                    "Light of Foliar Incision",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Applies off-field Hydro and boosts team damage.",
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
                characterId: "nilou",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Enables Bountiful Cores with her passive, dealing high AoE Bloom damage.",
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
                    "Elemental Mastery",
                    "HP"
                ]
            },
            {
                characterId: "sigewinne",
                role: "Support",
                roleDesc: "Hydro Support. Provides continuous healing to sustain the team from Bloom and Furina's drain, and buffs Skill DMG.",
                weapons: [
                    "Elegy for the End",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Màn Mưa Tơ Lòng",
        nameEn: "Silvershower Heartstrings",
        subStat: "HP%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí trấn phái tốt nhất. Dòng phụ HP% tăng mạnh trị liệu và sát thương kỹ năng nộ.",
        passiveDescEn: "Signature bow; HP% substat directly boosts healing and Burst stack generation.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Arcdange.png"
    },
    {
        rank: 2,
        nameVi: "Thanh Âm Lạnh Lẽo",
        nameEn: "Sequence of Solitude",
        subStat: "HP%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Cung cấp chỉ số HP% lớn từ dòng phụ, nội tại có cơ chế nổ sát thương diện rộng hữu ích.",
        passiveDescEn: "High base ATK and Energy Recharge help Burst uptime, but HP% is preferred for healing.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Stinger.png"
    },
    {
        rank: 3,
        nameVi: "Cung Phản Khúc",
        nameEn: "Recurve Bow",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn 3 sao tốt nhất cho vai trò trị liệu thuần túy nhờ dòng phụ HP% cực cao.",
        passiveDescEn: "3-star with HP% substat; best F2P option for raw healing output.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Curve.png"
    },
    {
        rank: 4,
        nameVi: "Cung Tây Phong",
        nameEn: "Favonius Warbow",
        subStat: "Hiệu Quả Nạp",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp lớn và hạt nhân lượng cho đồng đội khi tạo bạo kích.",
        passiveDescEn: "Provides team energy via particles; good if Burst uptime is a concern.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Zephyrus.png"
    },
    {
        rank: 5,
        nameVi: "Tiếng Thở Dài Vô Tận",
        nameEn: "Elegy for the End",
        subStat: "Hiệu Quả Nạp",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp cao, hỗ trợ tăng Tinh Thông Nguyên Tố và Tấn Công% cho cả đội.",
        passiveDescEn: "Boosts team Elemental Mastery and ATK% after Skill hits; supports reaction comps.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Widsith.png"
    },
    {
        rank: 6,
        nameVi: "Cung Tế Lễ",
        nameEn: "Sacrificial Bow",
        subStat: "Hiệu Quả Nạp",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Có cơ hội làm mới hồi chiêu kỹ năng nguyên tố, giúp tăng tần suất kích hoạt trị liệu.",
        passiveDescEn: "Resets Skill cooldown, allowing more Convalescence stacks and healing triggers.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fossil.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Xà Cừ Đại Dương",
        setNameEn: "Ocean-Hued Clam",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "CRIT Rate"
        ]
    },
    {
        setNameVi: "Khúc Ca Ngày Cũ",
        setNameEn: "Song of Days Past",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "CRIT Rate"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Scroll of the Hero of Cinder City",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "CRIT Rate"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc",
        setNameEn: "2-piece Mix (HP% / HP%)",
        pieces: 2,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "CRIT Rate"
        ]
    },
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Tenacity of the Millelith",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích",
            "Tăng Trị Liệu"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "CRIT Rate"
        ]
    }
]
};
