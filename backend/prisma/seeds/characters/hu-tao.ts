export const huTao = {
  characterId: "hu-tao",
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
  signatureWeapons: [
  "Staff of Homa"
],
  teams: [
    {
        name: "Hu Tao Melt Team #1",
        rank: "SS",
        description: "Hu Tao is the main DPS, her DMG is amplified by Melt. Two Cryo characters provide resonance, increasing CRIT Rate against enemies affected by Cryo or Frozen. Hu Tao's Pyro attacks trigger Melt reactions against Cryo-applied enemies, boosted by Cryo resonance for extra CRIT Rate.",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "Hu Tao's DMG is amplified by Melt.",
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
                    "Elemental Mastery",
                    "ATK%"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Xingqiu's Burst continuously applies Hydro to trigger Vaporize with Hu Tao and Freeze with Rosaria.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "2pc Heart of Depth + 2pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "rosaria",
                role: "Sub DPS",
                roleDesc: "Rosaria's Burst deals Cryo DMG and provides CRIT Rate share to party. Melt with Hu Tao and Freeze with Xingqiu.",
                weapons: [
                    "Skyward Spine",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "diona",
                role: "Support",
                roleDesc: "Diona provides shield and healing. At C6 with Instructor, she boosts party Elemental Mastery by 320 (including Instructor bonus).",
                weapons: [
                    "Elegy for the End",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Instructor"
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
        name: "Hu Tao Melt Team #2",
        rank: "S",
        description: "Hu Tao triggers Melt on Cryo-affected enemies for massive damage. Ayaka provides off-field Cryo application, Kazuha shreds resistance and buffs, Bennett heals and boosts ATK. Hu Tao triggers Melt on Cryo-affected enemies for massive single-target damage.",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "Main DPS whose damage is amplified by Melt.",
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
                    "Elemental Mastery",
                    "ATK%"
                ]
            },
            {
                characterId: "ayaka",
                role: "Sub DPS",
                roleDesc: "Sub DPS applying Cryo via Burst for Hu Tao to Melt.",
                weapons: [
                    "Mistsplitter Reforged",
                    "Amenoma Kageuchi"
                ],
                artifacts: [
                    "2pc Blizzard Strayer + 2pc Noblesse Oblige"
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
                roleDesc: "VV shred, crowd control, and elemental damage buffs.",
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
                roleDesc: "Healing and massive ATK buff from Burst.",
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
        name: "Hu Tao Vaporize",
        rank: "SS",
        description: "Hu Tao is the Pyro main DPS, with damage amplified by Vaporize reactions. Hu Tao triggers Vaporize on enemies affected by Xingqiu's Burst. Kazuha groups enemies and buffs Pyro DMG, while Zhongli provides a shield and ATK boost with Tenacity of the Millelith.",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "Main DPS, DMG amplified by Vaporize.",
                weapons: [
                    "Staff of Homa",
                    "Deathmatch"
                ],
                artifacts: [
                    "Shimenawa's Reminiscence"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Elemental Mastery",
                    "ATK%"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Elemental Burst applies Hydro continuously to enable Vaporize.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "kaedehara-kazuha",
                role: "Support",
                roleDesc: "Groups enemies, provides Anemo Swirl to reduce resistance and buff Pyro DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Iron Sting"
                ],
                artifacts: [
                    "Viridescent Venerer"
                ],
                substats: [
                    "Elemental Mastery",
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Provides a shield and ATK buff with Tenacity of the Millelith set.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "Tenacity of the Millelith"
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
        name: "Hu Tao Vaporize",
        rank: "SS",
        description: "Hu Tao triggers Vaporize on enemies affected by Xingqiu's Burst. Kazuha groups enemies and buffs Pyro DMG, while Zhongli provides a shield and ATK boost with Tenacity of the Millelith",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "Main DPS, DMG amplified by Vaporize.",
                weapons: [
                    "Staff of Homa"
                ],
                artifacts: [
                    "Shimenawa's Reminiscence"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Elemental Mastery",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "adsadsd",
        rank: "SS",
        description: "ádadsda",
        members: [
            {
                characterId: "hu-tao",
                role: "Main DPS",
                roleDesc: "",
                weapons: [
                    "A Thousand Blazing Suns"
                ],
                artifacts: [
                    "Resolution of Sojourner"
                ],
                substats: []
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Trượng Hộ Ma",
        nameEn: "Staff of Homa",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí 'trấn phái' tốt nhất, cung cấp lượng lớn HP và chuyển hóa máu thành Tấn Công cực mạnh.",
        passiveDescEn: "Vũ khí 'trấn phái' tốt nhất, cung cấp lượng lớn HP và chuyển hóa máu thành Tấn Công cực mạnh.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png"
    },
    {
        rank: 2,
        nameVi: "Quyền Trượng Cát Đỏ",
        nameEn: "Staff of the Scarlet Sands",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Lựa chọn thay thế mạnh mẽ nếu build theo hướng Tinh Thông Nguyên Tố cao, chuyển hóa TTNT thành Tấn Công.",
        passiveDescEn: "Lựa chọn thay thế mạnh mẽ nếu build theo hướng Tinh Thông Nguyên Tố cao, chuyển hóa TTNT thành Tấn Công.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png"
    },
    {
        rank: 3,
        nameVi: "Khúc Ca Vịnh Hẹp",
        nameEn: "Ballad of the Fjords",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Vũ khí 4 sao BP cực tốt khi đi kèm đội hình có ít nhất 3 nguyên tố khác nhau để buff thêm Tinh Thông Nguyên Tố.",
        passiveDescEn: "Vũ khí 4 sao BP cực tốt khi đi kèm đội hình có ít nhất 3 nguyên tố khác nhau để buff thêm Tinh Thông Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Shanty.png"
    },
    {
        rank: 4,
        nameVi: "Bi Ca Lumidouce",
        nameEn: "Lumidouce Elegy",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Không khuyến nghị do dòng phụ tăng ST Vật Lý bị lãng phí và nội tại yêu cầu kích hoạt Kỹ Năng Nguyên Tố liên tục.",
        passiveDescEn: "Không khuyến nghị do dòng phụ tăng ST Vật Lý bị lãng phí và nội tại yêu cầu kích hoạt Kỹ Năng Nguyên Tố liên tục.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png"
    },
    {
        rank: 5,
        nameVi: "Tai Ương Của Rồng",
        nameEn: "Dragon's Bane",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Lựa chọn 4 sao đột phá cho đội hình Bốc Hơi nhờ lượng TTNT dồi dào và tăng sát thương lên kẻ địch bị ấn Thủy/Hỏa.",
        passiveDescEn: "Lựa chọn 4 sao đột phá cho đội hình Bốc Hơi nhờ lượng TTNT dồi dào và tăng sát thương lên kẻ địch bị ấn Thủy/Hỏa.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Stardust.png"
    },
    {
        rank: 6,
        nameVi: "Thương Quyết Chiến",
        nameEn: "Deathmatch",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chỉ số Tỷ Lệ Bạo Kích rất cao giúp cân bằng chỉ số dễ dàng, tuy nhiên lượng buff Tấn Công không quá ấn tượng.",
        passiveDescEn: "Chỉ số Tỷ Lệ Bạo Kích rất cao giúp cân bằng chỉ số dễ dàng, tuy nhiên lượng buff Tấn Công không quá ấn tượng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png"
    },
    {
        rank: 7,
        nameVi: "Hòa Phác Diên",
        nameEn: "Primordial Jade Winged-Spear",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cao và cộng dồn Tấn Công ổn định, tuy nhiên cần thời gian để tích tầng nội tại.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích cao và cộng dồn Tấn Công ổn định, tuy nhiên cần thời gian để tích tầng nội tại.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png"
    },
    {
        rank: 8,
        nameVi: "Thương Thiên Nham",
        nameEn: "Lithic Spear",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Cực mạnh trong đội hình nhiều nhân vật Liyue (như Xingqiu, Zhongli) để được tăng Tỷ Lệ Bạo Kích và Tấn Công%.",
        passiveDescEn: "Cực mạnh trong đội hình nhiều nhân vật Liyue (như Xingqiu, Zhongli) để được tăng Tỷ Lệ Bạo Kích và Tấn Công%.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png"
    },
    {
        rank: 9,
        nameVi: "Mũi Nhọn Của Gió",
        nameEn: "Missive Windspear",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn tạm ổn khi thiếu thốn.",
        passiveDescEn: "Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn tạm ổn khi thiếu thốn.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Windvane.png"
    },
    {
        rank: 10,
        nameVi: "Thương Bạch Anh",
        nameEn: "White Tassel",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn 3 sao F2P cực tốt ở giai đoạn đầu game nhờ buff Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.",
        passiveDescEn: "Lựa chọn 3 sao F2P cực tốt ở giai đoạn đầu game nhờ buff Tỷ Lệ Bạo Kích và tăng sát thương đòn đánh thường.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Ruby.png"
    },
    {
        rank: 11,
        nameVi: "Thương Hắc Nham",
        nameEn: "Blackcliff Pole",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích nhưng nội tại yêu cầu hạ gục quái để kích hoạt, kém hiệu quả khi đấu Boss.",
        passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích nhưng nội tại yêu cầu hạ gục quái để kích hoạt, kém hiệu quả khi đấu Boss.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Blackrock.png"
    },
    {
        rank: 12,
        nameVi: "Giáo Thập Tự Kitain",
        nameEn: "Kitain Cross Spear",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn F2P cung cấp Tinh Thông Nguyên Tố, tuy nhiên nội tại tiêu hao năng lượng không thực sự hữu dụng với Hu Tao.",
        passiveDescEn: "Vũ khí rèn F2P cung cấp Tinh Thông Nguyên Tố, tuy nhiên nội tại tiêu hao năng lượng không thực sự hữu dụng với Hu Tao.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Bakufu.png"
    },
    {
        rank: 13,
        nameVi: "Thù Lao Của Chính Nghĩa",
        nameEn: "Rightful Reward",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Không khuyến nghị do dòng phụ Hiệu Quả Nạp bị lãng phí và nội tại yêu cầu hồi máu, mâu thuẫn lối chơi thấp máu của cô.",
        passiveDescEn: "Không khuyến nghị do dòng phụ Hiệu Quả Nạp bị lãng phí và nội tại yêu cầu hồi máu, mâu thuẫn lối chơi thấp máu của cô.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Vorpal.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực",
        setNameEn: "Crimson Witch of Flames",
        pieces: 4,
        sands: [
            "HP%",
            "Tinh Thông Nguyên Tố",
            "Elemental Mastery"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa",
            "Pyro DMG Bonus"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "CRIT Rate",
            "CRIT DMG"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "HP%",
            "ATK%"
        ]
    },
    {
        setNameVi: "Dòng Hồi Ức Bất Tận",
        setNameEn: "Shimenawa's Reminiscence",
        pieces: 4,
        sands: [
            "HP%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "HP%",
            "ATK%"
        ]
    },
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Gilded Dreams",
        pieces: 4,
        sands: [
            "HP%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "HP%",
            "ATK%"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Diệm Liệt Ma Nữ Cháy Rực & 2 bộ Giấc Mộng Hoàng Kim",
        setNameEn: "Mix 2-Piece Crimson Witch of Flames & 2-Piece Gilded Dreams",
        pieces: 2,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
    },
    {
        setNameVi: "Mix 2 bộ Diệm Liệt Ma Nữ Cháy Rực & 2 bộ Thiên Nham Vững Chắc",
        setNameEn: "Mix 2-Piece Crimson Witch of Flames & 2-Piece Tenacity of the Millelith",
        pieces: 2,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
    }
]
};
