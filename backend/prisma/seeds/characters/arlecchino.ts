export const arlecchino = {
  characterId: "arlecchino",
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
  bestTeams: [
  "citlali",
  "xilonen",
  "bennett",
  "kazuha",
  "yelan",
  "furina",
  "chiori",
  "fischl",
  "chevreuse",
  "mavuika",
  "ororon"
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Hình Thái Xích Nguyệt",
        nameEn: "Crimson Moon's Semblance",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí trấn phái; tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên Khế Ước Sinh Mệnh, tối đa hóa sát thương của đòn Đánh Thường.",
        passiveDescEn: "Signature weapon; boosts ATK% and CRIT Rate based on Bond of Life, maximizing Normal Attack damage.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_BloodMoon.png"
    },
    {
        rank: 2,
        nameVi: "Hòa Phác Diên",
        nameEn: "Primordial Jade Winged-Spear",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng Tấn Công% khi đánh trúng kẻ địch, cộng dồn tăng sát thương duy trì; đa dụng và rất đáng tin cậy.",
        passiveDescEn: "Increases ATK% on hit, stacking for sustained damage; versatile and reliable.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png"
    },
    {
        rank: 3,
        nameVi: "Quyền Trượng Cát Đỏ",
        nameEn: "Staff of the Scarlet Sands",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chuyển hóa Tinh Thông Nguyên Tố thành Tấn Công%; cực kỳ mạnh mẽ trong các đội hình phản ứng Bốc Hơi/Tan Chảy.",
        passiveDescEn: "Converts Elemental Mastery to ATK%; excellent for Vaporize/Melt teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png"
    },
    {
        rank: 4,
        nameVi: "Trượng Hộ Ma",
        nameEn: "Staff of Homa",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Sát Thương Bạo Kích cực cao và tăng Tấn Công% dựa trên HP; hoạt động cực tốt trong mọi đội hình.",
        passiveDescEn: "Provides high CRIT DMG and ATK% based on HP; works well in any team.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png"
    },
    {
        rank: 5,
        nameVi: "Bi Ca Lumidouce",
        nameEn: "Lumidouce Elegy",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản cao và Hiệu Quả Nạp lớn; cung cấp các buff cho đồng đội nhưng giảm sát thương cá nhân của bản thân, phù hợp cho vai trò Sub-DPS.",
        passiveDescEn: "High base ATK and Energy Recharge; team buffs but less personal damage, suitable for sub-DPS role.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png"
    },
    {
        rank: 6,
        nameVi: "Hủy Diệt",
        nameEn: "Calamity Queller",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chỉ số Tấn Công căn bản khổng lồ; gia tăng Tấn Công% sau khi kích hoạt Kỹ Năng Nguyên Tố, giúp khuếch đại các đòn đánh ban đầu.",
        passiveDescEn: "High base ATK; grants ATK% after using Skill, boosting initial hits.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png"
    },
    {
        rank: 7,
        nameVi: "Giáo Nịnh Thần",
        nameEn: "Vortex Vanquisher",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Đòi hỏi có khiên để nhận được đầy đủ lượng buff Tấn Công%; lựa chọn ổn khi đi kèm với các nhân vật tạo khiên mạnh như Zhongli.",
        passiveDescEn: "Requires shield for full ATK% bonus; decent with shield support like Zhongli.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png"
    },
    {
        rank: 8,
        nameVi: "Thương Quyết Chiến",
        nameEn: "Deathmatch",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích tốt và tăng Tấn Công% khi đối mặt với nhiều kẻ địch; lựa chọn giá rẻ chất lượng.",
        passiveDescEn: "CRIT Rate substat and ATK% bonus against multiple enemies; good F2P option.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png"
    },
    {
        rank: 9,
        nameVi: "Thương Bạch Anh",
        nameEn: "White Tassel",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí 3 sao giúp tăng 48% sát thương của đòn Đánh Thường; phương án cực kỳ kinh tế và mạnh cho người chơi mới hoặc ngân sách hạn chế.",
        passiveDescEn: "3-star that boosts Normal Attack DMG by 48%; cheap option for early game or budget builds.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Ruby.png"
    },
    {
        rank: 10,
        nameVi: "Khúc Ca Vịnh Hẹp",
        nameEn: "Ballad of the Fjords",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tỷ Lệ Bạo Kích tốt; gia tăng Tinh Thông Nguyên Tố nếu đội hình có từ 3 hệ nguyên tố khác nhau trở lên, giúp khuếch đại sát thương phản ứng.",
        passiveDescEn: "CRIT Rate substat; increases Elemental Mastery if team has 3 different elements, boosting reactions.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Shanty.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Mảnh Hài Hòa Bất Thường",
        setNameEn: "Fragment of Harmonic Whimsy",
        pieces: 4,
        sands: [
            "Tấn Công%",
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
            "ATK%"
        ]
    },
    {
        setNameVi: "Lễ Bế Mạc Của Giác Đấu Sĩ",
        setNameEn: "Gladiator's Finale",
        pieces: 4,
        sands: [
            "Tấn Công%",
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
            "ATK%"
        ]
    },
    {
        setNameVi: "Sử Ký Đình Đài Cát",
        setNameEn: "Desert Pavilion Chronicle",
        pieces: 4,
        sands: [
            "Tấn Công%",
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
            "ATK%"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn",
        setNameEn: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn",
        pieces: 2,
        sands: [
            "Tấn Công%",
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
            "ATK%"
        ]
    },
    {
        setNameVi: "Dư Âm Tế Lễ",
        setNameEn: "Echoes of an Offering",
        pieces: 4,
        sands: [
            "Tấn Công%",
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
            "ATK%"
        ]
    }
]
};
