export const lyney = {
  characterId: "lyney",
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
  teams: [
    {
        name: "Lyney Pure Pyro Team #1",
        rank: "SS",
        description: "A pure Pyro team that maximizes Lyney's passive ATK bonus from Pyro teammates. Kaedehara Kazuha swirls Pyro to reduce enemy resistance and groups them, while Xiangling deals off-field Pyro damage and Bennett provides massive ATK buff and healing.",
        members: [
            {
                characterId: "lyney",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. His Charged Attacks deal high single-target and AoE Pyro DMG, boosted by his passive for each Pyro ally.",
                weapons: [
                    "The First Great Magic",
                    "Song of Stillness"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
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
                roleDesc: "Pyro Sub DPS. Deals substantial off-field Pyro damage with Pyronado and Pyronado's Pyro application.",
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
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.",
                weapons: [
                    "Freedom-Sworn",
                    "Iron Sting"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing to sustain Lyney's HP manipulation.",
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
        name: "Lyney Pure Pyro Team #2",
        rank: "S",
        description: "An alternative mono-pyro team maximizing Lyney's passive. Lynette replaces Kazuha, providing grouping, taunt via Boffo Cat Box, and Pyro RES shred with Swirl, while Xiangling deals off-field damage and Bennett buffs ATK and heals.",
        members: [
            {
                characterId: "lyney",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. Charged Attacks deal high Pyro DMG, boosted by Bennett and Xiangling.",
                weapons: [
                    "The First Great Magic",
                    "Song of Stillness"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
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
                roleDesc: "Pyro Sub DPS. Deals high off-field Pyro DMG and benefits from Pyro RES shred.",
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
            },
            {
                characterId: "lynette",
                role: "Support",
                roleDesc: "Anemo Support. Taunts enemies, swirls Pyro to reduce enemy resistance, and boosts team ATK after using Burst.",
                weapons: [
                    "Freedom-Sworn",
                    "Favonius Sword",
                    "Sacrificial Sword"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing.",
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
        name: "Lyney Pure Pyro Team #3",
        rank: "SS",
        description: "A defensive pure Pyro team featuring Dehya for damage reduction and interruption resistance. Kazuha swirls Pyro for RES shred and grouping, while Bennett provides ATK buffs and healing.",
        members: [
            {
                characterId: "lyney",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. His Charged Attacks deal high Pyro DMG, protected from interruption by Dehya.",
                weapons: [
                    "The First Great Magic",
                    "Song of Stillness"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "dehya",
                role: "Sub DPS",
                roleDesc: "Pyro Sub DPS & Tank. Provides off-field Pyro application, damage reduction, and interruption resistance.",
                weapons: [
                    "Favonius Greatsword",
                    "Sacrificial Greatsword"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "Energy Recharge",
                    "HP%",
                    "ATK%"
                ]
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Swirls Pyro to shred resistance, groups enemies, and provides elemental damage bonus.",
                weapons: [
                    "Freedom-Sworn",
                    "Iron Sting"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and consistent healing.",
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
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Màn Ảo Thuật Đầu Tiên",
        nameEn: "The First Great Magic",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công căn bản cao và dòng phụ Sát Thương Bạo Kích. Nội tại tăng sát thương trọng kích, hoàn toàn phù hợp với lối chơi của Lyney.",
        passiveDescEn: "High base ATK and CRIT DMG substat. The passive increases charged attack DMG, perfectly aligning with Lyney's playstyle.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Pledge.png"
    },
    {
        rank: 2,
        nameVi: "Xích Vũ Tinh Tựu",
        nameEn: "Astral Vulture's Crimson Plumage",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tấn Công% và Tỷ Lệ Bạo Kích. Nội tại tăng ATK sau phản ứng, lý tưởng cho đội hình Bốc Hơi.",
        passiveDescEn: "Provides ATK% and CRIT Rate. The passive boosts ATK after reactions, ideal for Vaporize setups.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Qoyllorsnova.png"
    },
    {
        rank: 3,
        nameVi: "Nhược Thủy",
        nameEn: "Aqua Simulacra",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát thương bạo kích cao và tăng sát thương toàn diện. Nội tại HP cộng hưởng tốt với cơ chế tự tiêu hao/hồi HP của Lyney.",
        passiveDescEn: "High CRIT DMG and a universal DMG bonus. The HP passive synergizes with Lyney's HP manipulation.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png"
    },
    {
        rank: 4,
        nameVi: "Sấm Sét Rung Động",
        nameEn: "Thundering Pulse",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp ATK% và Sát Thương Bạo Kích. Nội tại đòn đánh thường vẫn đem lại lợi ích tốt mặc dù đòn trọng kích không nhận được đầy đủ hiệu quả.",
        passiveDescEn: "Offers ATK% and CRIT DMG. The normal attack stack provides some benefit, but charged attacks miss part of the passive.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Narukami.png"
    },
    {
        rank: 5,
        nameVi: "Cánh Thiên Không",
        nameEn: "Skyward Harp",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chỉ số Tỷ Lệ Bạo Kích và Sát Thương Bạo Kích cực kỳ cân bằng. Hiệu ứng nổ AoE nhỏ giúp bổ trợ thêm sát thương.",
        passiveDescEn: "Balanced CRIT Rate and CRIT DMG stats. The extra AoE proc provides supplemental damage.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png"
    },
    {
        rank: 6,
        nameVi: "Cung Amos",
        nameEn: "Amos' Bow",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công% cao và tăng mạnh sát thương đòn trọng kích. Thời gian bay của mũi tên xa không phải là điểm yếu cho các đòn ngắm bắn của Lyney.",
        passiveDescEn: "High ATK% and a substantial charged attack DMG bonus. The long flight time is not a downside for Lyney's aimed shots.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Amos.png"
    },
    {
        rank: 7,
        nameVi: "Ngôi Sao Cực Đông",
        nameEn: "Polar Star",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp ATK% và Tỷ Lệ Bạo Kích. Nội tại yêu cầu cộng dồn thông qua đòn đánh thường, trọng kích, kỹ năng nguyên tố và kỹ năng nộ.",
        passiveDescEn: "Provides ATK% and CRIT Rate. The passive requires stacking with Skill and Burst hits, which is feasible.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png"
    },
    {
        rank: 8,
        nameVi: "Khúc Ca Tĩnh Lặng",
        nameEn: "Song of Stillness",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp ATK% và tăng sát thương khi được hồi máu. Chiêu nộ của Lyney có thể tự hồi phục giúp kích hoạt nội tại một cách dễ dàng.",
        passiveDescEn: "Gives ATK% and a DMG bonus when the wielder is healed. Lyney's Burst can heal, enabling the passive.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Vorpal.png"
    },
    {
        rank: 9,
        nameVi: "Mẫu Đạm Nguyệt",
        nameEn: "Prototype Crescent",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng ATK% và sát thương đòn trọng kích sau khi bắn trúng điểm yếu kẻ địch. Cực kỳ xuất sắc cho những ai ngắm bắn chuẩn xác.",
        passiveDescEn: "Increases ATK% and charged attack DMG upon hitting a weak point. Excellent for players who can aim consistently.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Proto.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Marechaussee Hunter",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Hiền Nhân Bốc Lửa",
        setNameEn: "Lavawalker",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Thần Sa Vãng Sinh Lục",
        setNameEn: "Vermillion Hereafter",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Dòng Hồi Ức Bất Tận",
        setNameEn: "Shimenawa's Reminiscence",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Mix 2 bộ (Ma Nữ / Thợ Săn / Tấn Công)",
        setNameEn: "2-piece Mix (Crimson Witch / Marechaussee / ATK +18%)",
        pieces: 2,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Sao Băng Bay Ngược",
        setNameEn: "Retracing Bolide",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Sử Ký Đình Đài Cát",
        setNameEn: "Desert Pavilion Chronicle",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục",
        setNameEn: "Wanderer's Troupe",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Sát Thương Bạo Kích",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ]
    }
]
};
