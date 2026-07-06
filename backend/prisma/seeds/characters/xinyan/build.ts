export const build = {
  talentPriority: [ 'Normal Attack', 'Burst', 'Skill' ],
  signatureWeapons: [],
  sands: [ 'Tấn Công%', 'Hiệu Quả Nạp' ],
  goblet: [ 'Sát Thương Vật Lý' ],
  circlet: [ 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích' ],
  subStatsPriority: [
    'Tỷ Lệ Bạo Kích',
    'Sát Thương Bạo Kích',
    'Tấn Công%',
    'Hiệu Quả Nạp',
    'Phòng Ngự%'
  ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Xích Giác Phá Thạch Đao',
      nameEn: 'Xích Giác Phá Thạch Đao',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.',
      passiveDescEn: 'Tăng mạnh phòng ngự và sát thương đòn đánh thường/trọng kích dựa trên Phòng Ngự, rất phù hợp với khiên của Xinyan.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.webp'
    },
    {
      rank: 2,
      nameVi: 'Thiên Không Kiêu Ngạo',
      nameEn: 'Thiên Không Kiêu Ngạo',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.',
      passiveDescEn: 'Cung cấp Hiệu Quả Nạp lớn giúp Xinyan dễ dàng nạp đầy Nộ và tạo thêm kiếm khí chân không gây sát thương Vật Lý.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dvalin.webp'
    },
    {
      rank: 3,
      nameVi: 'Kiếm Li Cốt',
      nameEn: 'Kiếm Li Cốt',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.',
      passiveDescEn: 'Tích lũy sát thương tăng dần theo thời gian, đem lại lượng sát thương đầu ra cực kỳ ổn định nếu được bảo kê tốt.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kione.webp'
    },
    {
      rank: 4,
      nameVi: 'Kiếm Vô Công',
      nameEn: 'Kiếm Vô Công',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.',
      passiveDescEn: 'Tăng mạnh Tấn Công% và cường hóa hiệu quả Khiên. Hoàn hảo khi kết hợp với nhân vật tạo khiên như Xinyan.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kunwu.webp'
    },
    {
      rank: 5,
      nameVi: 'Tiếng Gió Trong Rừng Thông',
      nameEn: 'Tiếng Gió Trong Rừng Thông',
      subStat: 'Sát Thương Vật Lý',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.',
      passiveDescEn: 'Tăng cực nhiều Sát Thương Vật Lý và tốc độ đánh cho cả đội, tối ưu chuỗi combo xoay trọng kích của Xinyan.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Widsith.webp'
    },
    {
      rank: 6,
      nameVi: 'Đường Cùng Của Sói',
      nameEn: 'Đường Cùng Của Sói',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.',
      passiveDescEn: 'Bơm lượng Tấn Công khổng lồ và tăng mạnh sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp'
    },
    {
      rank: 7,
      nameVi: 'Vua Biển Hàng Hiệu',
      nameEn: 'Vua Biển Hàng Hiệu',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.',
      passiveDescEn: 'Vũ khí Event F2P cực tốt, tăng chỉ số Tấn Công và gia tăng trực tiếp lượng sát thương từ Kỹ Năng Nộ.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_MillenniaTuna.webp'
    },
    {
      rank: 8,
      nameVi: 'Tuyết Vùi Tinh Ngân',
      nameEn: 'Tuyết Vùi Tinh Ngân',
      subStat: 'Sát Thương Vật Lý',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.',
      passiveDescEn: 'Lựa chọn rèn F2P tuyệt vời cung cấp chỉ số Sát Thương Vật Lý và tạo thêm băng rơi gây sát thương diện rộng.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dragonfell.webp'
    },
    {
      rank: 9,
      nameVi: 'Mẫu Cổ Hoa',
      nameEn: 'Mẫu Cổ Hoa',
      subStat: 'Tấn Công%',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.',
      passiveDescEn: 'Vũ khí rèn quốc dân dễ tiếp cận, tăng Tấn Công và có tỷ lệ gây thêm sát thương vật lý diện rộng mỗi 15s.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Proto.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu',
      setNameEn: 'Mix 2 bộ Lửa Trắng Xám / Kỵ Sĩ Đạo Nhuốm Máu',
      pieces: 2
    },
    {
      setNameVi: 'Lửa Trắng Xám',
      setNameEn: 'Lửa Trắng Xám',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ',
      setNameEn: 'Mix 2 bộ Dấu Ấn / Lửa Trắng Xám / Kỵ Sĩ',
      pieces: 2
    },
    {
      setNameVi: 'Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp',
      setNameEn: 'Mix 2 bộ Vật Lý / Tấn Công / Tông Thất / Giáp',
      pieces: 2
    }
  ]
};
