export const build = {
  talentPriority: [ 'Normal Attack', 'Skill', 'Burst' ],
  signatureWeapons: [],
  sands: [ 'Tấn Công%', 'Tinh Thông Nguyên Tố' ],
  goblet: [ 'Sát Thương Nguyên Tố Hỏa' ],
  circlet: [ 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích' ],
  subStatsPriority: [
    'Tỷ Lệ Bạo Kích',
    'Sát Thương Bạo Kích',
    'Tấn Công%',
    'Tinh Thông Nguyên Tố',
    'Hiệu Quả Nạp'
  ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Sấm Sét Rung Động',
      nameEn: 'Sấm Sét Rung Động',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Best-in-slot: high base ATK and CRIT DMG, passive boosts Normal Attack damage and stacks with her Pyro infusion.',
      passiveDescEn: 'Best-in-slot: high base ATK and CRIT DMG, passive boosts Normal Attack damage and stacks with her Pyro infusion.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Narukami.webp'
    },
    {
      rank: 2,
      nameVi: 'Nhược Thủy',
      nameEn: 'Nhược Thủy',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'High CRIT DMG and unconditional damage bonus. The passive condition (enemies nearby) is usually met in her attack range.',
      passiveDescEn: 'High CRIT DMG and unconditional damage bonus. The passive condition (enemies nearby) is usually met in her attack range.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Kirin.webp'
    },
    {
      rank: 3,
      nameVi: 'Màn Ảo Thuật Đầu Tiên',
      nameEn: 'Màn Ảo Thuật Đầu Tiên',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Provides CRIT DMG and ATK% based on party elemental diversity, which works well in reaction teams.',
      passiveDescEn: 'Provides CRIT DMG and ATK% based on party elemental diversity, which works well in reaction teams.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Pledge.webp'
    },
    {
      rank: 4,
      nameVi: 'Ngôi Sao Cực Đông',
      nameEn: 'Ngôi Sao Cực Đông',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'ATK% substat and passive that increases ATK and Skill/Burst damage. Requires stacking but effective.',
      passiveDescEn: 'ATK% substat and passive that increases ATK and Skill/Burst damage. Requires stacking but effective.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Worldbane.webp'
    },
    {
      rank: 5,
      nameVi: 'Con Đường Thợ Săn',
      nameEn: 'Con Đường Thợ Săn',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: "Decent CRIT Rate stat stick; the passive boosts Charged Attacks, which are rarely used, so it's a fallback option.",
      passiveDescEn: "Decent CRIT Rate stat stick; the passive boosts Charged Attacks, which are rarely used, so it's a fallback option.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Ayus.webp'
    },
    {
      rank: 6,
      nameVi: 'Cánh Thiên Không',
      nameEn: 'Cánh Thiên Không',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Solid CRIT Rate and extra CRIT DMG from passive. A reliable stat stick.',
      passiveDescEn: 'Solid CRIT Rate and extra CRIT DMG from passive. A reliable stat stick.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Dvalin.webp'
    },
    {
      rank: 7,
      nameVi: 'Nỏ Kéo',
      nameEn: 'Nỏ Kéo',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: '3-star weapon with high CRIT Rate. Passive works at close range; good early game but inconsistent at longer ranges.',
      passiveDescEn: '3-star weapon with high CRIT Rate. Passive works at close range; good early game but inconsistent at longer ranges.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Sling.webp'
    },
    {
      rank: 8,
      nameVi: 'Cung Amos',
      nameEn: 'Cung Amos',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'High base ATK and passive that increases Normal and Charged Attack damage over time. Decent but outclassed by other options.',
      passiveDescEn: 'High base ATK and passive that increases Normal and Charged Attack damage over time. Decent but outclassed by other options.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Amos.webp'
    },
    {
      rank: 9,
      nameVi: 'Cung Rỉ Sét',
      nameEn: 'Cung Rỉ Sét',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R5',
      passiveDescVi: 'ATK% substat and passive that boosts Normal Attack damage by up to 80% at R5 while reducing Charged Attack damage. Excellent for her playstyle.',
      passiveDescEn: 'ATK% substat and passive that boosts Normal Attack damage by up to 80% at R5 while reducing Charged Attack damage. Excellent for her playstyle.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Recluse.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Dòng Hồi Ức Bất Tận',
      setNameEn: 'Dòng Hồi Ức Bất Tận',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
      setNameEn: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
      pieces: 2
    },
    { setNameVi: 'Dư Âm Tế Lễ', setNameEn: 'Dư Âm Tế Lễ', pieces: 4 },
    {
      setNameVi: 'Diệm Liệt Ma Nữ Cháy Rực',
      setNameEn: 'Diệm Liệt Ma Nữ Cháy Rực',
      pieces: 4
    },
    {
      setNameVi: 'Giấc Mộng Hoàng Kim',
      setNameEn: 'Giấc Mộng Hoàng Kim',
      pieces: 4
    }
  ]
};
