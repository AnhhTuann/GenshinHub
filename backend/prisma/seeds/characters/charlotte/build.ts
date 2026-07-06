export const build = {
  talentPriority: [ 'Normal Attack', 'Elemental Skill', 'Elemental Burst' ],
  signatureWeapons: [],
  sands: [ 'Energy Recharge', 'ATK%' ],
  goblet: [ 'ATK%' ],
  circlet: [ 'Healing Bonus', 'ATK%', 'CRIT Rate' ],
  subStatsPriority: [ 'Energy Recharge', 'ATK%', 'CRIT Rate', 'CRIT DMG' ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Mẫu Kim Phách',
      nameEn: 'Prototype Amber',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R1',
      passiveDescVi: 'Phục hồi Năng lượng và hồi máu cho đội theo thời gian, giảm yêu cầu Nạp của Charlotte và cung cấp khả năng hồi phục thụ động.',
      passiveDescEn: "Restores Energy and heals the team over time, easing Charlotte's energy requirements and providing passive healing.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Proto.webp'
    },
    {
      rank: 2,
      nameVi: 'Tây Phong Mật Điển',
      nameEn: 'Favonius Codex',
      subStat: 'Energy Recharge',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tạo hạt năng lượng trắng khi Bạo kích, tăng khả năng hồi năng lượng cho đội. Yêu cầu một số chỉ số Tỷ lệ Bạo kích.',
      passiveDescEn: 'Generates clear particles on CRIT, boosting team energy regeneration. Requires some CRIT Rate investment.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Zephyrus.webp'
    },
    {
      rank: 3,
      nameVi: 'Câu Chuyện Diệt Rồng',
      nameEn: 'Thrilling Tales of Dragon Slayers',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R1',
      passiveDescVi: 'Đổi sang nhân vật khác cung cấp buff %Tấn công khổng lồ trong 10s. Lý tưởng để hỗ trợ một DPS chính.',
      passiveDescEn: 'Swapping to another character grants a massive ATK% buff for 10s. Ideal for supporting a main DPS.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Pulpfic.webp'
    },
    {
      rank: 4,
      nameVi: 'Con Ngươi Tuyên Thệ',
      nameEn: 'Oathsworn Eye',
      subStat: 'ATK%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Tăng Hiệu Quả Nạp Năng Lượng sau khi dùng Kỹ Năng, giúp sử dụng Kỹ năng nộ của cô ấy mà không cần phụ thuộc vào Bạo kích.',
      passiveDescEn: 'Increases Energy Recharge after using Skill, helping fund her Burst without relying on CRIT.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Jyanome.webp'
    },
    {
      rank: 5,
      nameVi: 'Rượu Và Thơ Nơi Hẻm Tối',
      nameEn: 'Wine and Song',
      subStat: 'Energy Recharge',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng Hiệu Quả Nạp và cung cấp buff %Tấn Công cho đội sau khi dùng Kỹ năng, nhưng yêu cầu kích hoạt phản ứng Khuếch Tán.',
      passiveDescEn: 'Boosts Energy Recharge and provides a team ATK% buff after using a Skill, though requires triggering Swirl.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Outlaw.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Mix 2 bộ Dấu Ấn Ngăn Cách & 2 bộ Dòng Hồi Ức Bất Tận',
      setNameEn: "Mix 2-Piece Emblem of Severed Fate & 2-Piece Shimenawa's Reminiscence",
      pieces: 2
    },
    {
      setNameVi: 'Xà Cừ Đại Dương',
      setNameEn: 'Ocean-Hued Clam',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ Dấu Ấn Ngăn Cách & 2 bộ Xà Cừ Đại Dương',
      setNameEn: 'Mix 2-Piece Emblem of Severed Fate & 2-Piece Ocean-Hued Clam',
      pieces: 2
    },
    {
      setNameVi: 'Nghi Thức Tông Thất Cổ',
      setNameEn: 'Noblesse Oblige',
      pieces: 4
    },
    {
      setNameVi: 'Thiên Nham Vững Chắc',
      setNameEn: 'Tenacity of the Millelith',
      pieces: 4
    }
  ]
};
