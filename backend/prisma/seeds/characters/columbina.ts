export const columbina = {
  characterId: "columbina",
  talentPriority: ["Skill", "Burst", "Normal Attack"],
  bestWeapons: [
    {
      rank: 1,
      nameVi: "Dạ Khúc Hạ Màn",
      nameEn: "Nocturne's Curtain Call",
      subStat: "Sát Thương Bạo Kích",
      isF2P: false,
      refinement: "R1",
      passiveDescVi:
        "Vũ khí trấn phái tốt nhất. Tăng tấn công cơ bản cao, bổ sung Hiệu Quả Nạp lớn. Nội tại tăng sát thương Kỹ Năng Nộ và hồi phục năng lượng trực tiếp.",
      passiveDescEn:
        "High base ATK and Energy Recharge. Passive boosts Burst damage and generates energy after casting it, solving energy issues directly.",
      iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Brisingamen.png",
    },
    {
      rank: 2,
      nameVi: "Mẫu Kim Phách",
      nameEn: "Prototype Amber",
      subStat: "HP%",
      isF2P: true,
      refinement: "R5",
      passiveDescVi:
        "Vũ khí chế tạo cung cấp HP%, đồng thời nội tại hồi phục năng lượng cho cả đội và trị liệu nhẹ.",
      passiveDescEn:
        "Craftable HP% weapon. Regenerates energy for the wielder and heals the party slightly.",
      iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Proto.png",
    },
    {
      rank: 3,
      nameVi: "Ngọc Bích Hiến Tế",
      nameEn: "Sacrificial Jade",
      subStat: "Tỷ Lệ Bạo Kích",
      isF2P: false,
      refinement: "R1",
      passiveDescVi:
        "Cung cấp Tỷ Lệ Bạo Kích và Tinh Thông Nguyên Tố. Nội tại tăng mạnh sát thương E và Q khi đứng sân ngoài.",
      passiveDescEn:
        "Provides CRIT Rate and EM. Passive increases Skill and Burst damage when off-field, fitting support-DPS hybrid role.",
      iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png",
    },
    {
      rank: 4,
      nameVi: "Tây Phong Mật Điển",
      nameEn: "Favonius Codex",
      subStat: "Hiệu Quả Nạp",
      isF2P: false,
      refinement: "R5",
      passiveDescVi:
        "Chỉ số Hiệu Quả Nạp cao và sinh hạt nhân lượng khi bạo kích để hỗ trợ nạp cho cả đội.",
      passiveDescEn:
        "High Energy Recharge and white particles on CRIT hits. Helps battery the team.",
      iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Zephyrus.png",
    },
  ],
  bestArtifacts: [
    {
      setNameVi: "Khúc Ca Trăng Lụa",
      setNameEn: "Silken Moon's Serenade",
      pieces: 4,
      sands: ["HP%", "Hiệu Quả Nạp"],
      goblet: ["HP%"],
      circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
      subStatsPriority: [
        "Energy Recharge",
        "CRIT Rate",
        "CRIT DMG",
        "HP%",
        "Elemental Mastery",
      ],
    },
    {
      setNameVi: "Khúc Ca Của Trăng Và Sao Mai",
      setNameEn: "Aubade of Morningstar and Moon",
      pieces: 4,
      sands: ["HP%", "Hiệu Quả Nạp"],
      goblet: ["HP%"],
      circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
      subStatsPriority: [
        "Energy Recharge",
        "CRIT Rate",
        "CRIT DMG",
        "HP%",
        "Elemental Mastery",
      ],
    },
    {
      setNameVi: "Mix 2 bộ (HP% / Tinh Thông / Hiệu Quả Nạp)",
      setNameEn: "2-piece Mix (HP% / EM / ER)",
      pieces: 2,
      sands: ["HP%", "Hiệu Quả Nạp"],
      goblet: ["HP%"],
      circlet: ["Tỷ Lệ Bạo Kích", "Sát Thương Bạo Kích"],
      subStatsPriority: [
        "Energy Recharge",
        "CRIT Rate",
        "CRIT DMG",
        "HP%",
        "Elemental Mastery",
      ],
    },
  ],
  bestTeams: [
    "nefer",
    "lauma",
    "yaoyao",
    "nahida",
    "nilou",
    "yelan",
    "kuki-shinobu",
    "flins",
    "xilonen",
    "ineffa",
    "chasca",
    "jahoda",
  ],
};
