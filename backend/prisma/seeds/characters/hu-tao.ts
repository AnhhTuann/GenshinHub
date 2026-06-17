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
  signatureWeapons: [],
  teams: [
    {
        name: "Hu Tao Vaporize",
        rank: "SS",
        description: "Hu Tao is the Pyro main DPS, with damage amplified by Vaporize reactions.\n\nHu Tao triggers Vaporize on enemies affected by Xingqiu's Burst. Kazuha groups enemies and buffs Pyro DMG, while Zhongli provides a shield and ATK boost with Tenacity of the Millelith",
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
                    "CRIT Rate",
                    "CRIT DMG",
                    "HP%",
                    "Elemental Mastery",
                    "ATK%"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Provides a shield and ATK buff with &lt;artifact&gt;Tenacity of the Millelith&lt;/artifact&gt; set.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
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
        setNameVi: "Mix 2 bộ Diệm Liệt Ma Nữ Cháy Rực & 2 bộ Thiên Nham Vững Chắc",
        setNameEn: "Mix 2-Piece Crimson Witch of Flames & 2-Piece Tenacity of the Millelith",
        pieces: 2,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
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
    }
]
};
