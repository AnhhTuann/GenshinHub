export const build = {
  talentPriority: [ 'Normal Attack', 'Skill', 'Burst' ],
  signatureWeapons: [],
  sands: [ 'Tấn Công%' ],
  goblet: [ 'Sát Thương Nguyên Tố Hỏa' ],
  circlet: [ 'Sát Thương Bạo Kích', 'Tỷ Lệ Bạo Kích' ],
  subStatsPriority: [
    'Tỷ Lệ Bạo Kích',
    'Sát Thương Bạo Kích',
    'Tấn Công%',
    'Hiệu Quả Nạp'
  ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Màn Ảo Thuật Đầu Tiên',
      nameEn: 'The First Great Magic',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tấn công căn bản cao và dòng phụ Sát Thương Bạo Kích. Nội tại tăng sát thương trọng kích, hoàn toàn phù hợp với lối chơi của Lyney.',
      passiveDescEn: "High base ATK and CRIT DMG substat. The passive increases charged attack DMG, perfectly aligning with Lyney's playstyle.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Pledge.webp'
    },
    {
      rank: 2,
      nameVi: 'Xích Vũ Tinh Tựu',
      nameEn: "Astral Vulture's Crimson Plumage",
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Tấn Công% và Tỷ Lệ Bạo Kích. Nội tại tăng ATK sau phản ứng, lý tưởng cho đội hình Bốc Hơi.',
      passiveDescEn: 'Provides ATK% and CRIT Rate. The passive boosts ATK after reactions, ideal for Vaporize setups.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Qoyllorsnova.webp'
    },
    {
      rank: 3,
      nameVi: 'Nhược Thủy',
      nameEn: 'Aqua Simulacra',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Sát thương bạo kích cao và tăng sát thương toàn diện. Nội tại HP cộng hưởng tốt với cơ chế tự tiêu hao/hồi HP của Lyney.',
      passiveDescEn: "High CRIT DMG and a universal DMG bonus. The HP passive synergizes with Lyney's HP manipulation.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Kirin.webp'
    },
    {
      rank: 4,
      nameVi: 'Sấm Sét Rung Động',
      nameEn: 'Thundering Pulse',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp ATK% và Sát Thương Bạo Kích. Nội tại đòn đánh thường vẫn đem lại lợi ích tốt mặc dù đòn trọng kích không nhận được đầy đủ hiệu quả.',
      passiveDescEn: 'Offers ATK% and CRIT DMG. The normal attack stack provides some benefit, but charged attacks miss part of the passive.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Narukami.webp'
    },
    {
      rank: 5,
      nameVi: 'Cánh Thiên Không',
      nameEn: 'Skyward Harp',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Chỉ số Tỷ Lệ Bạo Kích và Sát Thương Bạo Kích cực kỳ cân bằng. Hiệu ứng nổ AoE nhỏ giúp bổ trợ thêm sát thương.',
      passiveDescEn: 'Balanced CRIT Rate and CRIT DMG stats. The extra AoE proc provides supplemental damage.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Dvalin.webp'
    },
    {
      rank: 6,
      nameVi: 'Cung Amos',
      nameEn: "Amos' Bow",
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tấn công% cao và tăng mạnh sát thương đòn trọng kích. Thời gian bay của mũi tên xa không phải là điểm yếu cho các đòn ngắm bắn của Lyney.',
      passiveDescEn: "High ATK% and a substantial charged attack DMG bonus. The long flight time is not a downside for Lyney's aimed shots.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Amos.webp'
    },
    {
      rank: 7,
      nameVi: 'Ngôi Sao Cực Đông',
      nameEn: 'Polar Star',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp ATK% và Tỷ Lệ Bạo Kích. Nội tại yêu cầu cộng dồn thông qua đòn đánh thường, trọng kích, kỹ năng nguyên tố và kỹ năng nộ.',
      passiveDescEn: 'Provides ATK% and CRIT Rate. The passive requires stacking with Skill and Burst hits, which is feasible.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Worldbane.webp'
    },
    {
      rank: 8,
      nameVi: 'Khúc Ca Tĩnh Lặng',
      nameEn: 'Song of Stillness',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Cung cấp ATK% và tăng sát thương khi được hồi máu. Chiêu nộ của Lyney có thể tự hồi phục giúp kích hoạt nội tại một cách dễ dàng.',
      passiveDescEn: "Gives ATK% and a DMG bonus when the wielder is healed. Lyney's Burst can heal, enabling the passive.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Vorpal.webp'
    },
    {
      rank: 9,
      nameVi: 'Mẫu Đạm Nguyệt',
      nameEn: 'Prototype Crescent',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Tăng ATK% và sát thương đòn trọng kích sau khi bắn trúng điểm yếu kẻ địch. Cực kỳ xuất sắc cho những ai ngắm bắn chuẩn xác.',
      passiveDescEn: 'Increases ATK% and charged attack DMG upon hitting a weak point. Excellent for players who can aim consistently.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Proto.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Sao Băng Bay Ngược',
      setNameEn: 'Retracing Bolide',
      pieces: 4
    },
    {
      setNameVi: 'Dòng Hồi Ức Bất Tận',
      setNameEn: "Shimenawa's Reminiscence",
      pieces: 4
    },
    {
      setNameVi: 'Thần Sa Vãng Sinh Lục',
      setNameEn: 'Vermillion Hereafter',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ (Ma Nữ / Thợ Săn / Tấn Công)',
      setNameEn: '2-piece Mix (Crimson Witch / Marechaussee / ATK +18%)',
      pieces: 2
    },
    {
      setNameVi: 'Đoàn Hát Lang Thang Đại Lục',
      setNameEn: "Wanderer's Troupe",
      pieces: 4
    },
    {
      setNameVi: 'Hiền Nhân Bốc Lửa',
      setNameEn: 'Lavawalker',
      pieces: 4
    },
    {
      setNameVi: 'Sử Ký Đình Đài Cát',
      setNameEn: 'Desert Pavilion Chronicle',
      pieces: 4
    },
    {
      setNameVi: 'Thợ Săn Marechaussee',
      setNameEn: 'Marechaussee Hunter',
      pieces: 4
    }
  ]
};
