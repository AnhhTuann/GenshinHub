export const build = {
  talentPriority: [ 'Burst', 'Normal Attack', 'Skill' ],
  signatureWeapons: [],
  sands: [ 'HP%', 'Hiệu Quả Nạp' ],
  goblet: [ 'Sát Thương Nguyên Tố Thủy', 'HP%' ],
  circlet: [ 'Tăng Trị Liệu' ],
  subStatsPriority: [ 'HP%', 'Hiệu Quả Nạp', 'Tấn Công%', 'HP', 'Tinh Thông Nguyên Tố' ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Vầng Trăng Biển Hoa',
      nameEn: 'Everlasting Moonglow',
      subStat: 'HP%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Vũ khí trấn phái. Tăng HP%, tăng sát thương Tấn Công Thường dựa trên giới hạn HP, hồi năng lượng khi dùng Q và trị liệu.',
      passiveDescEn: 'Best-in-slot: HP% substat and passive that boosts Normal Attack DMG based on HP, with Energy Recharge on healing.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_FairyGarden.webp'
    },
    {
      rank: 2,
      nameVi: 'Dòng Chảy Trong Trẻo',
      nameEn: 'Flowing Purity',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí rèn F2P giúp tăng mạnh Sát Thương Nguyên Tố Thủy sau khi dùng kỹ năng, tối ưu hóa lượng sát thương đầu ra.',
      passiveDescEn: 'Craftable option: Energy Recharge substat and passive that increases Hydro DMG after using Skill, amplifying burst damage.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Vorpal.webp'
    },
    {
      rank: 3,
      nameVi: 'Mẫu Kim Phách',
      nameEn: 'Prototype Amber',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Lựa chọn rèn F2P hoàn hảo. Cung cấp chỉ số HP% lớn, đồng thời hồi năng lượng cho bản thân và hồi phục máu cho cả đội.',
      passiveDescEn: 'Budget healer weapon: HP% substat and passive restoring energy and healing team, but lower personal DPS.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Proto.webp'
    },
    {
      rank: 4,
      nameVi: 'Vòng Yaxche',
      nameEn: 'Ring of Yaxche',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí rèn tại Natlan tăng nhiều HP%, nội tại gia tăng sát thương Tấn Công Thường dựa theo lượng HP tối đa.',
      passiveDescEn: 'Decent stat stick: HP% substat, but passive requiring shield or off-field not fully utilized by on-field Kokomi.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Isikhulu.webp'
    },
    {
      rank: 5,
      nameVi: 'Sừng Rượu Vân Xanh',
      nameEn: 'Ash-Graven Drinking Horn',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí sự kiện tăng HP% và tạo sát thương diện rộng dựa theo lượng HP tối đa khi tấn công trúng kẻ địch.',
      passiveDescEn: 'Event weapon: HP% substat, passive boosts Normal Attack DMG after healing, but requires shield for full effect.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_ConchSprayer.webp'
    },
    {
      rank: 6,
      nameVi: 'Vòng Bạch Thần',
      nameEn: 'Hakushin Ring',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Hỗ trợ tuyệt vời cho đội hình Điện Cảm. Nội tại tăng sát thương nguyên tố Lôi cho đồng đội sau khi kích hoạt phản ứng.',
      passiveDescEn: 'Supportive option: Energy Recharge substat, passive boosts team Electro DMG after Electro-Charged, good in taser comps.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Bakufu.webp'
    },
    {
      rank: 7,
      nameVi: 'Câu Chuyện Diệt Rồng',
      nameEn: 'Thrilling Tales of Dragon Slayers',
      subStat: 'HP%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí 3 sao hỗ trợ thuần túy. Tăng mạnh Tấn Công% cho nhân vật tiếp theo ra sân, lý tưởng khi Kokomi đóng vai trò Support.',
      passiveDescEn: "Full support: HP% substat, but passive buffs next character's ATK — not recommended for personal DPS.",
      iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Pulpfic.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Xà Cừ Đại Dương',
      setNameEn: 'Ocean-Hued Clam',
      pieces: 4
    },
    {
      setNameVi: 'Trái Tim Trầm Luân',
      setNameEn: 'Heart of Depth',
      pieces: 4
    },
    {
      setNameVi: 'Thiên Nham Vững Chắc',
      setNameEn: 'Tenacity of the Millelith',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ Trị Liệu / Thủy / HP',
      setNameEn: 'Mix 2 bộ Trị Liệu / Thủy / HP',
      pieces: 2
    }
  ]
};
