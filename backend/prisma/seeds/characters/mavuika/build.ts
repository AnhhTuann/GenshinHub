export const build = {
  talentPriority: [ 'Burst', 'Skill', 'Normal Attack' ],
  signatureWeapons: [],
  sands: [ 'Tinh Thông Nguyên Tố', 'Tấn Công%' ],
  goblet: [ 'Sát Thương Nguyên Tố Hỏa' ],
  circlet: [ 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích' ],
  subStatsPriority: [ 'CRIT Rate', 'CRIT DMG', 'ATK%', 'Elemental Mastery' ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Thiên Dương Rực Lửa',
      nameEn: 'A Thousand Blazing Suns',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích cao và lượng buff Tấn Công% khổng lồ sau khi dùng Kỹ Năng Nguyên Tố, đồng bộ hoàn hảo với Kỹ Năng Nộ. Lựa chọn trấn phái tối ưu cho sát thương cá nhân và hỗ trợ đồng đội.',
      passiveDescEn: 'Provides high CRIT Rate and a massive ATK% buff after using Skill, synchronized with Burst. Best-in-slot for personal damage and team support.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_RadianceSword.webp'
    },
    {
      rank: 2,
      nameVi: 'Xích Giác Phá Thạch Đao',
      nameEn: 'Redhorn Stonethresher',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Sát Thương Bạo Kích cao và chuyển hóa Phòng Ngự thành sát thương Đánh Thường/Trọng Kích. Có thể dùng tốt nếu có nhiều dòng phụ Phòng Ngự, tuy nhiên khả năng phối hợp bị hạn chế.',
      passiveDescEn: 'High CRIT DMG and converts DEF to Normal/Charged Attack damage. Viable if you have high DEF substats, but synergy is limited.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.webp'
    },
    {
      rank: 3,
      nameVi: 'Phán Quyết',
      nameEn: 'Verdict',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Sau khi có phản ứng Kết Tinh gần đó, gia tăng sát thương Kỹ Năng Nguyên Tố và Nộ. Hoạt động tốt khi đi cùng đồng đội hệ Nham.',
      passiveDescEn: 'High base ATK and CRIT Rate. After a crystallize reaction nearby, boosts Skill and Burst damage. Works if you have a Geo teammate.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_GoldenVerdict.webp'
    },
    {
      rank: 4,
      nameVi: 'Hải Đăng Bờ Biển Lau',
      nameEn: 'Beacon of the Reed Sea',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tỷ Lệ Bạo Kích cao và nội tại tăng Tấn Công% kích hoạt khi chịu sát thương hoặc dùng Kỹ Năng Nguyên Tố. Ổn định và rất dễ duy trì.',
      passiveDescEn: 'High CRIT Rate and an ATK% passive that activates on taking damage or using Skill. Consistent and easy to maintain.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Deshret.webp'
    },
    {
      rank: 5,
      nameVi: 'Đóa Hoa Tôn Màu Thép',
      nameEn: 'Mailed Flower',
      subStat: 'Tinh Thông Nguyên Tố',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và buff Tấn Công% sau khi kích hoạt phản ứng liên quan đến Thủy/Băng. Thích hợp cho các đội hình Bốc Hơi/Tan Chảy.',
      passiveDescEn: 'F2P option with Elemental Mastery and an ATK% buff after triggering Hydro/Cryo reactions. Good for Melt/Vaporize teams.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Fleurfair.webp'
    },
    {
      rank: 6,
      nameVi: 'Đường Cùng Của Sói',
      nameEn: "Wolf's Gravestone",
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tấn Công cơ bản cao và buff Tấn Công% cho toàn đội khi đánh trúng kẻ địch thấp máu. Phù hợp cho lượng sát thương thuần và hỗ trợ đồng đội.',
      passiveDescEn: 'High base ATK and team-wide ATK% buff on hitting low-HP enemies. Solid for raw damage and supporting allies.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp'
    },
    {
      rank: 7,
      nameVi: 'Kiếm Vô Công',
      nameEn: 'The Unforged',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng hiệu quả khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên để tối đa hóa nội tại. Hoạt động tốt nếu đi cùng Zhongli hoặc tương đương.',
      passiveDescEn: 'Shield strength and ATK% scaling. Requires a shielder to maximize the passive. Works if paired with Zhongli or similar.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kunwu.webp'
    },
    {
      rank: 8,
      nameVi: 'Kiếm Li Cốt',
      nameEn: 'Serpent Spine',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R5',
      passiveDescVi: 'Tăng Sát Thương theo thời gian đứng sân qua các tầng cộng dồn. Tinh luyện cao cực kỳ mạnh, nhưng cần tránh nhận sát thương để duy trì các tầng buff.',
      passiveDescEn: 'Stacks DMG% over time while on field. High refinement shines, but avoid taking damage to maintain stacks.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kione.webp'
    },
    {
      rank: 9,
      nameVi: 'Nanh Sơn Vương',
      nameEn: 'Fang of the Mountain King',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tỷ Lệ Bạo Kích cao và buff Sát Thương sau khi đánh trúng bằng Kỹ Năng Nguyên Tố. Phối hợp tốt với các đội hình Thiêu Đốt/Sum Suê, nhưng không hoàn toàn tối ưu cho Mavuika.',
      passiveDescEn: 'High CRIT Rate and a DMG% buff after hitting with Skill. Synergizes with burning/bloom teams, but not optimal for Mavuika.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp'
    },
    {
      rank: 10,
      nameVi: 'Bóng Tối Thủy Triều',
      nameEn: 'Tidal Shadow',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí rèn cung cấp Tấn Công% sau khi được hồi máu. Dễ dàng chế tạo và duy trì nếu đội hình có nhân vật hồi máu.',
      passiveDescEn: 'Craftable weapon that grants ATK% after being healed. Easy to obtain and maintain if you have a healer.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Vorpal.webp'
    },
    {
      rank: 11,
      nameVi: 'Vũ Tài',
      nameEn: 'Rainslasher',
      subStat: 'Tinh Thông Nguyên Tố',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Cung cấp Tinh Thông Nguyên Tố và tăng sát thương chống lại kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi. Chỉ nên dùng trong đội hình Bốc Hơi/Quá Tải.',
      passiveDescEn: 'Provides Elemental Mastery and increased damage against enemies affected by Hydro or Electro. Only use in Vaporize/Overload teams.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Perdue.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Bí Điển Obsidian',
      setNameEn: 'Obsidian Codex',
      pieces: 4
    },
    {
      setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
      setNameEn: 'Scroll of the Hero of Cinder City',
      pieces: 4
    },
    {
      setNameVi: 'Ký Ức Rừng Sâu',
      setNameEn: 'Deepwood Memories',
      pieces: 4
    },
    {
      setNameVi: 'Thợ Săn Marechaussee',
      setNameEn: 'Marechaussee Hunter',
      pieces: 4
    }
  ]
};
