export const build = {
  talentPriority: [ 'Burst', 'Skill', 'Normal Attack' ],
  signatureWeapons: [],
  sands: [ 'Hiệu Quả Nạp', 'Tấn Công%' ],
  goblet: [ 'Sát Thương Nguyên Tố Lôi', 'Tấn Công%' ],
  circlet: [ 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích' ],
  subStatsPriority: [
    'CRIT Rate',
    'CRIT DMG',
    'ATK%',
    'Energy Recharge',
    'Elemental Mastery'
  ],
  bestWeapons: [
    {
      rank: 1,
      nameVi: 'Đoạn Thảo Kính Phạt',
      nameEn: 'Đoạn Thảo Kính Phạt',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.',
      passiveDescEn: 'Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Narukami.webp'
    },
    {
      rank: 2,
      nameVi: 'Trượng Hộ Ma',
      nameEn: 'Trượng Hộ Ma',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.',
      passiveDescEn: 'Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Homa.webp'
    },
    {
      rank: 3,
      nameVi: 'Quyền Trượng Cát Đỏ',
      nameEn: 'Quyền Trượng Cát Đỏ',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.',
      passiveDescEn: 'Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Deshret.webp'
    },
    {
      rank: 4,
      nameVi: 'Khúc Ca Hòa Điệu',
      nameEn: 'Khúc Ca Hòa Điệu',
      subStat: 'Sát Thương Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.',
      passiveDescEn: 'Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Trident.webp'
    },
    {
      rank: 5,
      nameVi: 'Khúc Ca Vườn Sáng',
      nameEn: 'Khúc Ca Vườn Sáng',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.',
      passiveDescEn: 'Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Muguet.webp'
    },
    {
      rank: 6,
      nameVi: 'Hòa Phát Diên',
      nameEn: 'Hòa Phát Diên',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.',
      passiveDescEn: 'Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Morax.webp'
    },
    {
      rank: 7,
      nameVi: 'Hủy Diệt',
      nameEn: 'Hủy Diệt',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.',
      passiveDescEn: 'Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Santika.webp'
    },
    {
      rank: 8,
      nameVi: 'Thương Quyết Chiến',
      nameEn: 'Thương Quyết Chiến',
      subStat: 'Tỷ Lệ Bạo Kích',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.',
      passiveDescEn: 'Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Gladiator.webp'
    },
    {
      rank: 9,
      nameVi: 'Giáo Nịnh Thần',
      nameEn: 'Giáo Nịnh Thần',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.',
      passiveDescEn: 'Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Kunwu.webp'
    },
    {
      rank: 10,
      nameVi: 'Lao Xiên Cá',
      nameEn: 'Lao Xiên Cá',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.',
      passiveDescEn: 'Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Mori.webp'
    },
    {
      rank: 11,
      nameVi: 'Xương Sống Thiên Không',
      nameEn: 'Xương Sống Thiên Không',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: false,
      refinement: 'R1',
      passiveDescVi: 'Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.',
      passiveDescEn: 'Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Dvalin.webp'
    },
    {
      rank: 12,
      nameVi: 'Vây Cá Chẻ Sóng',
      nameEn: 'Vây Cá Chẻ Sóng',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R5',
      passiveDescVi: 'Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.',
      passiveDescEn: 'Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Maria.webp'
    },
    {
      rank: 13,
      nameVi: 'Thương Lập Kiếm',
      nameEn: 'Thương Lập Kiếm',
      subStat: 'Tấn Công%',
      isF2P: false,
      refinement: 'R5',
      passiveDescVi: 'Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.',
      passiveDescEn: 'Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Lapis.webp'
    },
    {
      rank: 14,
      nameVi: 'Thương Tây Phong',
      nameEn: 'Thương Tây Phong',
      subStat: 'Hiệu Quả Nạp Nguyên Tố',
      isF2P: true,
      refinement: 'R5',
      passiveDescVi: 'Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.',
      passiveDescEn: 'Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.',
      iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Zephyrus.webp'
    }
  ],
  bestArtifacts: [
    {
      setNameVi: 'Nghi Thức Tông Thất Cổ',
      setNameEn: 'Nghi Thức Tông Thất Cổ',
      pieces: 4
    },
    {
      setNameVi: 'Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn',
      setNameEn: 'Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn',
      pieces: 2
    },
    {
      setNameVi: 'Dấu Ấn Ngăn Cách',
      setNameEn: 'Dấu Ấn Ngăn Cách',
      pieces: 4
    },
    {
      setNameVi: 'Thiên Nham Vững Chắc',
      setNameEn: 'Thiên Nham Vững Chắc',
      pieces: 4
    }
  ]
};
