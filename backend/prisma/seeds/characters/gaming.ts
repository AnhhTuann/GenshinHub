export const gaming = {
  characterId: "gaming",
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
        name: "Gaming Melting Team #1",
        rank: "SS",
        description: "A high-damage Melt team centered on Gaming's plunging attacks, supported by Ganyu's off-field Cryo application, Layla's shield and Cryo application, and Xianyun's plunge buffs and healing.",
        members: [
            {
                characterId: "ganyu",
                role: "Sub DPS",
                roleDesc: "Cryo Sub DPS. Her Burst provides continuous off-field Cryo application to trigger Melt.",
                weapons: [
                    "Hunter's Path",
                    "Harp"
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
                characterId: "gaming",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. His Plunging Attack provides continuous high-multiplier Pyro DMG.",
                weapons: [
                    "Serpent Spine",
                    "Redhorn Stonethresher"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "layla",
                role: "Support",
                roleDesc: "Cryo Shield & Support. Provides a strong shield and additional Cryo application.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Harbinger of Dawn"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
                weapons: [
                    "Crane's Echoing Call",
                    "Oathsworn Eye"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "ATK%",
                    "ATK",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Gaming Vaporize Team",
        rank: "SS",
        description: "Gaming is a Main DPS. His DMG is amplified by Vaporize with off-field Hydro and support buffs from Furina, Kazuha, and Xianyun.",
        members: [
            {
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
                weapons: [
                    "Crane's Echoing Call",
                    "Oathsworn Eye"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "ATK%",
                    "ATK",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Fleuve Cendre Ferryman"
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
                characterId: "gaming",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. Plunging Attacks trigger Vaporize reactions to deal massive DMG.",
                weapons: [
                    "Redhorn Stonethresher",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, swirls elements to reduce resistance, and buffs Pyro DMG.",
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
            }
        ]
    },
    {
        name: "Gaming Pure Pyro Team",
        rank: "S",
        description: "A pure Pyro team centered on Gaming's plunging attacks, boosted by Xianyun, with Bennett and Xiangling providing buffs and off-field damage.",
        members: [
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
                characterId: "gaming",
                role: "Main DPS",
                roleDesc: "Pyro Main DPS. Plunging Attacks deal high consistent Pyro DMG.",
                weapons: [
                    "Redhorn Stonethresher",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Anemo Support. Enables Plunging Attacks, provides team-wide healing, and buffs plunging DMG.",
                weapons: [
                    "Crane's Echoing Call",
                    "Oathsworn Eye"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "ATK%",
                    "ATK",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Pyro Sub DPS. Deals high off-field Pyro DMG via Pyronado and Gouba.",
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
        nameVi: "Chiến Hùng Ca Của Sói",
        nameEn: "Gest of the Mighty Wolf",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công% cao và tăng Tấn Công cho toàn đội khi đánh trúng kẻ địch; giá trị ổn định cho sát thương thuần.",
        passiveDescEn: "High ATK% and team-wide ATK buff on hit; consistent value for raw damage.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_EnsisAquilonis.png"
    },
    {
        rank: 2,
        nameVi: "Kiếm Li Cốt",
        nameEn: "Serpent Spine",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và cộng dồn buff Sát Thương; nội tại vẫn hoạt động tốt khi thực hiện các đòn tấn công khi đáp.",
        passiveDescEn: "Provides CRIT Rate and stacking DMG bonus; passive stays active during plunging combos.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png"
    },
    {
        rank: 3,
        nameVi: "Xích Giác Phá Thạch Đao",
        nameEn: "Redhorn Stonethresher",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao và chuyển hóa Phòng Ngự thành Tấn Công; có lợi cho thời gian đứng sân dài.",
        passiveDescEn: "High CRIT DMG and converts DEF to ATK; benefits extended field time.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png"
    },
    {
        rank: 4,
        nameVi: "Thiên Dương Rực Lửa",
        nameEn: "A Thousand Blazing Suns",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng sát thương Kỹ Năng và Nộ sau khi kích hoạt phản ứng; kết hợp rất tốt trong đội hình hệ Hỏa.",
        passiveDescEn: "Boosts Skill and Burst DMG after reactions; pairs well with Pyro teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png"
    },
    {
        rank: 5,
        nameVi: "Phán Quyết",
        nameEn: "Verdict",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng sát thương dựa trên phản ứng Kết Tinh; kén đội hình nhưng hoạt động ổn khi có các nhân vật hỗ trợ hệ Nham.",
        passiveDescEn: "DMG bonus on Crystallize; niche but viable with geo supports.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png"
    },
    {
        rank: 6,
        nameVi: "Hải Đăng Bờ Biển Lau",
        nameEn: "Beacon of the Reed Sea",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng Tấn Công% khi chịu sát thương; cộng hưởng tốt với cơ chế tự tiêu hao HP.",
        passiveDescEn: "High CRIT Rate and ATK% from taking DMG; synergistic with HP loss mechanics.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png"
    },
    {
        rank: 7,
        nameVi: "Móc Trĩu Quả",
        nameEn: "Fruitful Hook",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Vũ khí 4 sao cung cấp Tỷ Lệ Bạo Kích và tăng Tấn Công cho đòn tấn công khi đáp; lựa chọn tốt nhất trong phân khúc 4 sao.",
        passiveDescEn: "4-star with CRIT Rate and ATK boost for plunging attacks; best in slot for 4-star.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Umpakati.png"
    },
    {
        rank: 8,
        nameVi: "Đường Cùng Của Sói",
        nameEn: "Wolf's Gravestone",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Lượng Tấn Công% khổng lồ và buff Tấn Công cho toàn đội; đáng tin cậy cho lượng sát thương thuần.",
        passiveDescEn: "Massive ATK% and team-wide ATK buff; reliable for raw damage.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png"
    },
    {
        rank: 9,
        nameVi: "Vũ Tài",
        nameEn: "Rainslasher",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Dòng phụ Tinh Thông Nguyên Tố giúp khuếch đại sát thương phản ứng Bốc Hơi/Tan Chảy.",
        passiveDescEn: "Elemental Mastery substat boosts Vaporize/Melt DMG.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Perdue.png"
    },
    {
        rank: 10,
        nameVi: "Đóa Hoa Tôn Màu Thép",
        nameEn: "Mailed Flower",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng Tinh Thông Nguyên Tố và Tấn Công% khi đánh trúng bằng kỹ năng; rất tốt cho các đội hình phản ứng.",
        passiveDescEn: "EM and ATK% from skill hits; good for reaction teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Fleurfair.png"
    },
    {
        rank: 11,
        nameVi: "Thiên Nham Cổ Kiếm",
        nameEn: "Lithic Blade",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tăng Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số lượng đồng đội Liyue; yêu cầu giới hạn xây dựng đội hình.",
        passiveDescEn: "ATK% and CRIT Rate with Liyue teammates; requires team restriction.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Lapis.png"
    },
    {
        rank: 12,
        nameVi: "Kiếm Vô Công",
        nameEn: "The Unforged",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng hiệu lực khiên và Tấn Công% khi được bảo vệ bởi khiên; yêu cầu trong đội có nhân vật tạo khiên.",
        passiveDescEn: "Shield strength and ATK% when shielded; needs a shielder.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png"
    },
    {
        rank: 13,
        nameVi: "Bóng Tối Thủy Triều",
        nameEn: "Tidal Shadow",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng Tấn Công% sau khi được hồi máu; hoạt động rất hiệu quả khi đi cùng nhân vật hồi máu.",
        passiveDescEn: "ATK% after healing; works well with healers.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Vorpal.png"
    },
    {
        rank: 14,
        nameVi: "\"Bá Vương Tối Thượng Siêu Cấp Ma Kiếm\"",
        nameEn: "\"Ultimate Overlord's Mega Magic Sword\"",
        subStat: "Hiệu Quả Nạp",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí sự kiện cung cấp Tấn Công% và hiệu quả nạp; lựa chọn F2P chất lượng.",
        passiveDescEn: "Event weapon with ATK% and energy; good free option.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Champion.png"
    },
    {
        rank: 15,
        nameVi: "Sắc Nước Makhaira",
        nameEn: "Makhaira Aquamarine",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chia sẻ Tấn Công dựa trên Tinh Thông Nguyên Tố cho đồng đội; mang lại lợi ích lớn cho các đội hình phản ứng.",
        passiveDescEn: "EM share to team; benefits reaction teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Pleroma.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Gilded Dreams",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tinh Thông Nguyên Tố",
            "Tấn Công%"
        ]
    },
    {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực",
        setNameEn: "Crimson Witch of Flames",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tinh Thông Nguyên Tố",
            "Tấn Công%"
        ]
    },
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Marechaussee Hunter",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tinh Thông Nguyên Tố",
            "Tấn Công%"
        ]
    },
    {
        setNameVi: "Lời Thề Đêm Dài",
        setNameEn: "Long Night's Oath",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
            "Tấn Công%",
            "Hiệu Quả Nạp"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Hiệu Quả Nạp",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tinh Thông Nguyên Tố",
            "Tấn Công%"
        ]
    }
]
};
