export const build = {
  talentPriority: [ 'Skill', 'Burst', 'Normal Attack' ],
  signatureWeapons: [],
  sands: [ 'HP%', 'Tinh Thông Nguyên Tố' ],
  goblet: [ 'Sát Thương Nguyên Tố Thủy' ],
  circlet: [
    'Tỷ Lệ Bạo Kích',
    'Sát Thương Bạo Kích',
    'HP%',
    'Tinh Thông Nguyên Tố'
  ],
  subStatsPriority: [ 'CRIT Rate', 'CRIT DMG', 'Elemental Mastery', 'HP%', 'HP' ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Thời Khắc Lướt Sóng',
      nameEn: "Surf's Up",
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Vũ khí trấn phái tốt nhất. Cung cấp Sát Thương Bạo Kích cực cao và tăng sát thương Tấn Công Thường dựa theo HP giới hạn.',
      passiveDescEn: "Signature weapon; provides massive CRIT DMG and a Hydro DMG bonus that scales with HP, perfectly syncing with Mualani's kit.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.webp'
    },
    {
      rank: 2,
      nameVi: 'Chân Ngôn Bí Hạp',
      nameEn: 'Reliquary of Truth',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tấn công cơ bản cao, dòng phụ Sát Thương Bạo Kích. Nội tại tăng sát thương Thủy sau khi dùng kỹ năng.',
      passiveDescEn: "High base ATK and CRIT DMG substat; the passive boosts Hydro DMG after using a skill, aligning with Mualani's rotation.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Sistrum.webp'
    },
    {
      rank: 3,
      nameVi: 'Cõi Mộng Ngàn Đêm',
      nameEn: 'A Thousand Floating Dreams',
      subStat: 'Tinh Thông Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng mạnh Tinh Thông Nguyên Tố cho Mualani và đồng đội, trực tiếp nâng cao sát thương phản ứng Bốc Hơi.',
      passiveDescEn: 'Boosts Elemental Mastery for both Mualani and her party, directly increasing Vaporize damage. Solid support option.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Ayus.webp'
    },
    {
      rank: 4,
      nameVi: 'Nghi Thức Dòng Chảy Vĩnh Hằng',
      nameEn: 'Tome of the Eternal Flow',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Sát Thương Bạo Kích cao và nội tại tăng HP cùng sát thương tấn công thường.',
      passiveDescEn: "High CRIT DMG and HP scaling passive that boosts normal attack DMG, complementing Mualani's sharky hits.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Iudex.webp'
    },
    {
      rank: 5,
      nameVi: 'Ánh Nhìn Tư Tế',
      nameEn: "Starcaller's Watch",
      subStat: 'Tinh Thông Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Hiệu Quả Nạp và buff sát thương cho cả đội sau khi nộ.',
      passiveDescEn: 'Provides Energy Recharge and a team-wide damage buff after using burst, helping Mualani maintain uptime and amplify damage.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MenulisRing.webp'
    },
    {
      rank: 6,
      nameVi: 'Ngọc Bích Hiến Tế',
      nameEn: 'Sacrificial Jade',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng tỷ lệ bạo kích và HP giới hạn khi không đứng sân quá lâu.',
      passiveDescEn: 'Grants CRIT Rate and extra HP when off-field, making it easier to build for consistent Vaporize crits.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Yue.webp'
    },
    {
      rank: 7,
      nameVi: 'Hòa Giấc Trong Nắng Mai',
      nameEn: 'Sunny Morning Sleep-In',
      subStat: 'Tinh Thông Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng Tinh Thông Nguyên Tố và cung cấp buff Tinh Thông Nguyên Tố cho cả đội sau khi kích hoạt phản ứng.',
      passiveDescEn: 'Increases Elemental Mastery and provides a team-wide EM buff after triggering reactions, enhancing Vaporize damage.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_SakuraFan.webp'
    },
    {
      rank: 8,
      nameVi: 'Vòng Yaxche',
      nameEn: 'Ring of Yaxche',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Cung cấp chỉ số HP% rất lớn, nội tại tăng sát thương đánh thường dựa trên lượng HP tối đa.',
      passiveDescEn: "Offers HP% and a passive that boosts normal attack DMG based on max HP, directly scaling Mualani's damage.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Isikhulu.webp'
    },
    {
      rank: 9,
      nameVi: 'Chương Nhạc Lang Thang',
      nameEn: 'The Widsith',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R5',
      passiveDescVi: 'Tăng ngẫu nhiên Tấn Công, Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố Thủy khi chuyển nhân vật.',
      passiveDescEn: 'Random buff on swap: ATK, EM, or Hydro DMG. All three benefit Vaporize setups, though it has downtime.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Bí Điển Obsidian',
      setNameEn: 'Obsidian Codex',
      pieces: 4
    },
    {
      setNameVi: 'Trái Tim Trầm Luân',
      setNameEn: 'Heart of Depth',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ (HP% / Sát Thương Thủy / Tinh Thông / Thợ Săn)',
      setNameEn: '2-piece Mix (HP% / Hydro DMG / EM / Marechaussee)',
      pieces: 2
    },
    {
      setNameVi: 'Thợ Săn Marechaussee',
      setNameEn: 'Marechaussee Hunter',
      pieces: 4
    }
  ]
};
