export const yelan = {
  characterId: "yelan",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  talentPriority: [
  "Burst",
  "Skill",
  "Normal Attack"
],
  bestTeams: [
  "arlecchino",
  "zhongli",
  "bennett",
  "hu-tao",
  "xingqiu",
  "wanderer",
  "faruzan",
  "thoma",
  "cyno",
  "nahida",
  "baizhu",
  "raiden-shogun",
  "xiangling",
  "kazuha",
  "nilou",
  "furina",
  "jean"
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Tiếng Thở Dài Vô Tận",
        nameEn: "Tiếng Thở Dài Vô Tận",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.",
        passiveDescEn: "Dòng phụ Hiệu Quả Nạp cao và khả năng dùng Kỹ Năng Nộ kích hoạt buff Tấn Công cho đội; lý tưởng cho lối build hỗ trợ cần nhiều Nạp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png"
    },
    {
        rank: 2,
        nameVi: "Cung Tây Phong",
        nameEn: "Cung Tây Phong",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.",
        passiveDescEn: "Nội tại tinh luyện tạo hạt nhân lượng khi bạo kích bằng Kỹ Năng Nguyên Tố, giải quyết vấn đề nạp cho bản thân và toàn đội; Tấn Công cơ bản thấp không ảnh hưởng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Zephyrus.png"
    },
    {
        rank: 3,
        nameVi: "Nhược Thủy",
        nameEn: "Nhược Thủy",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.",
        passiveDescEn: "Dòng phụ Sát Thương Bạo Kích khổng lồ và nội tại tăng HP% giúp tăng mạnh sát thương, nhưng đòi hỏi Hiệu Quả Nạp cao từ thánh di vật; chỉ dùng khi có thể đạt trên 200% Nạp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Kirin.png"
    },
    {
        rank: 4,
        nameVi: "Cung Tế Lễ",
        nameEn: "Cung Tế Lễ",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R3",
        passiveDescVi: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.",
        passiveDescEn: "Nội tại tinh luyện reset hồi chiêu Kỹ Năng Nguyên Tố, tạo thêm hạt năng lượng; dòng phụ Hiệu Quả Nạp cao giúp giảm áp lực nạp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fossil.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Dấu Ấn Ngăn Cách",
        setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "HP%",
            "CRIT Rate",
            "CRIT DMG",
            "HP"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất",
        setNameEn: "Mix 2 bộ Dấu Ấn / HP / Thủy / Tông Thất",
        pieces: 2,
        sands: [
            "Hiệu Quả Nạp",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "HP%",
            "CRIT Rate",
            "CRIT DMG",
            "HP"
        ]
    },
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "HP%",
            "CRIT Rate",
            "CRIT DMG",
            "HP"
        ]
    }
]
};
