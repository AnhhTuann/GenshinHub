"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Burst', 'Skill', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Hiệu Quả Nạp', 'Tấn Công%', 'Tinh Thông Nguyên Tố'],
    goblet: ['Sát Thương Nguyên Tố Hỏa'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
    subStatsPriority: [
        'Energy Recharge',
        'CRIT Rate',
        'CRIT DMG',
        'ATK%',
        'Elemental Mastery'
    ],
    bestWeapons: [
        {
            rank: 0,
            nameVi: 'Quyền Trượng Cát Đỏ',
            nameEn: 'Quyền Trượng Cát Đỏ',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cực cao và Tấn Công cơ bản tốt. Nội tại chuyển hóa Tinh Thông Nguyên Tố thành Tấn Công, rất mạnh trong đội hình Bốc Hơi.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cực cao và Tấn Công cơ bản tốt. Nội tại chuyển hóa Tinh Thông Nguyên Tố thành Tấn Công, rất mạnh trong đội hình Bốc Hơi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Deshret.webp'
        },
        {
            rank: 1,
            nameVi: 'Đoạn Thảo Trường Đao',
            nameEn: 'Engulfing Lightning',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Narukami.webp'
        },
        {
            rank: 1,
            nameVi: 'Hòa Phác Diên',
            nameEn: 'Primordial Jade Winged-Spear',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Morax.webp'
        },
        {
            rank: 1,
            nameVi: 'Bi Ca Lumidouce',
            nameEn: 'Bi Ca Lumidouce',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp tốt và gia tăng Tinh Thông Nguyên Tố cho toàn đội, giúp đẩy mạnh sát thương phản ứng.',
            passiveDescEn: 'Cung cấp Hiệu Quả Nạp tốt và gia tăng Tinh Thông Nguyên Tố cho toàn đội, giúp đẩy mạnh sát thương phản ứng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Muguet.webp'
        },
        {
            rank: 2,
            nameVi: 'Hào Quang Tách Rời',
            nameEn: 'Hào Quang Tách Rời',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí thử nghiệm cung cấp Sát Thương Bạo Kích, tuy nhiên chỉ số không tối ưu bằng các lựa chọn khác.',
            passiveDescEn: 'Vũ khí thử nghiệm cung cấp Sát Thương Bạo Kích, tuy nhiên chỉ số không tối ưu bằng các lựa chọn khác.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Perdix.webp'
        },
        {
            rank: 3,
            nameVi: 'Trượng Hộ Ma',
            nameEn: 'Trượng Hộ Ma',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Sát Thương Bạo Kích cao và nội tại tăng Tấn Công dựa trên HP. Sát thương đầu ra rất lớn nhưng yêu cầu tự bù đắp Hiệu Quả Nạp.',
            passiveDescEn: 'Sát Thương Bạo Kích cao và nội tại tăng Tấn Công dựa trên HP. Sát thương đầu ra rất lớn nhưng yêu cầu tự bù đắp Hiệu Quả Nạp.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Homa.webp'
        },
        {
            rank: 6,
            nameVi: 'Tai Họa Và Hối Hận',
            nameEn: 'Tai Họa Và Hối Hận',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Lựa chọn thay thế mang lại Sát Thương Bạo Kích cao, tuy nhiên nội tại không quá phù hợp cho Xiangling.',
            passiveDescEn: 'Lựa chọn thay thế mang lại Sát Thương Bạo Kích cao, tuy nhiên nội tại không quá phù hợp cho Xiangling.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Carbine.webp'
        },
        {
            rank: 7,
            nameVi: 'Lao Xiên Cá',
            nameEn: 'Lao Xiên Cá',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn F2P tốt nhất: Tăng trực tiếp Sát Thương và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ cùng chỉ số Hiệu Quả Nạp cao.',
            passiveDescEn: 'Lựa chọn F2P tốt nhất: Tăng trực tiếp Sát Thương và Tỷ Lệ Bạo Kích của Kỹ Năng Nộ cùng chỉ số Hiệu Quả Nạp cao.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Mori.webp'
        },
        {
            rank: 8,
            nameVi: 'Thương Quyết Chiến',
            nameEn: 'Thương Quyết Chiến',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng lớn Tỷ Lệ Bạo Kích và thêm Tấn Công dựa trên số lượng kẻ địch. Cần bù đắp Hiệu Quả Nạp từ thánh di vật.',
            passiveDescEn: 'Cung cấp lượng lớn Tỷ Lệ Bạo Kích và thêm Tấn Công dựa trên số lượng kẻ địch. Cần bù đắp Hiệu Quả Nạp từ thánh di vật.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Gladiator.webp'
        },
        {
            rank: 9,
            nameVi: 'Khúc Ca Vịnh Hẹp',
            nameEn: 'Khúc Ca Vịnh Hẹp',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích và tăng mạnh Tinh Thông Nguyên Tố nếu đội hình có từ 3 nguyên tố khác nhau trở lên.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích và tăng mạnh Tinh Thông Nguyên Tố nếu đội hình có từ 3 nguyên tố khác nhau trở lên.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Shanty.webp'
        },
        {
            rank: 10,
            nameVi: 'Hủy Diệt',
            nameEn: 'Hủy Diệt',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố. Thích hợp dùng làm vũ khí thuần tăng sát thương tấn công.',
            passiveDescEn: 'Chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố. Thích hợp dùng làm vũ khí thuần tăng sát thương tấn công.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Santika.webp'
        },
        {
            rank: 11,
            nameVi: 'Giáo Nịnh Thần',
            nameEn: 'Giáo Nịnh Thần',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng hiệu quả Khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.',
            passiveDescEn: 'Tăng hiệu quả Khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Kunwu.webp'
        },
        {
            rank: 12,
            nameVi: 'Hình Thái Xích Nguyệt',
            nameEn: 'Hình Thái Xích Nguyệt',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Lựa chọn thay thế tạm ổn cung cấp Tỷ Lệ Bạo Kích, tuy nhiên nội tại tăng sát thương không hoạt động tối đa với Xiangling.',
            passiveDescEn: 'Lựa chọn thay thế tạm ổn cung cấp Tỷ Lệ Bạo Kích, tuy nhiên nội tại tăng sát thương không hoạt động tối đa với Xiangling.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_BloodMoon.webp'
        },
        {
            rank: 13,
            nameVi: 'Tàn Tích Nhuốm Máu',
            nameEn: 'Tàn Tích Nhuốm Máu',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Với vũ khí thử nghiệm, coi như vật giữ chỗ. Có lẽ không dùng được.',
            passiveDescEn: 'Với vũ khí thử nghiệm, coi như vật giữ chỗ. Có lẽ không dùng được.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_TummaLyhty.webp'
        },
        {
            rank: 14,
            nameVi: 'Vây Cá Chẻ Sóng',
            nameEn: 'Vây Cá Chẻ Sóng',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Gia tăng mạnh sát thương Kỹ Năng Nộ dựa trên tổng năng lượng tiêu hao của toàn đội. Đạt hiệu quả cực cao ở tinh luyện 5.',
            passiveDescEn: 'Gia tăng mạnh sát thương Kỹ Năng Nộ dựa trên tổng năng lượng tiêu hao của toàn đội. Đạt hiệu quả cực cao ở tinh luyện 5.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Maria.webp'
        },
        {
            rank: 15,
            nameVi: 'Mũi Nhọn Của Gió',
            nameEn: 'Mũi Nhọn Của Gió',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn thay thế rất tốt.',
            passiveDescEn: 'Vũ khí Event F2P tăng Tấn Công% và Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng, lựa chọn thay thế rất tốt.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Windvane.webp'
        },
        {
            rank: 16,
            nameVi: 'Giáo Thập Tự Kitain',
            nameEn: 'Giáo Thập Tự Kitain',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Tinh Thông Nguyên Tố và khả năng hồi năng lượng khi dùng Kỹ Năng Nguyên Tố, giúp giảm nhẹ áp lực nạp.',
            passiveDescEn: 'Cung cấp Tinh Thông Nguyên Tố và khả năng hồi năng lượng khi dùng Kỹ Năng Nguyên Tố, giúp giảm nhẹ áp lực nạp.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Bakufu.webp'
        },
        {
            rank: 17,
            nameVi: 'Thương Thiên Nham',
            nameEn: 'Thương Thiên Nham',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Gia tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Phù hợp cho đội hình National truyền thống.',
            passiveDescEn: 'Gia tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Phù hợp cho đội hình National truyền thống.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Lapis.webp'
        },
        {
            rank: 18,
            nameVi: 'Thương Tây Phong',
            nameEn: 'Thương Tây Phong',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Hiệu Quả Nạp cao và nội tại sinh hạt năng lượng cho toàn đội khi bạo kích, giúp sạc nhanh cho bản thân và đồng đội.',
            passiveDescEn: 'Hiệu Quả Nạp cao và nội tại sinh hạt năng lượng cho toàn đội khi bạo kích, giúp sạc nhanh cho bản thân và đồng đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Zephyrus.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Dấu Ấn Ngăn Cách & 2 bộ Nghi Thức Tông Thất Cổ',
            setNameEn: 'Mix 2-Piece Emblem of Severed Fate & 2-Piece Noblesse Oblige',
            pieces: 2
        },
        {
            setNameVi: 'Mix 2 bộ Diệm Liệt Ma Nữ Cháy Rực & 2 bộ Dấu Ấn Ngăn Cách',
            setNameEn: 'Mix 2-Piece Crimson Witch of Flames & 2-Piece Emblem of Severed Fate',
            pieces: 2
        },
        {
            setNameVi: 'Mix 2 bộ Diệm Liệt Ma Nữ Cháy Rực & 2 bộ Nghi Thức Tông Thất Cổ',
            setNameEn: 'Mix 2-Piece Crimson Witch of Flames & 2-Piece Noblesse Oblige',
            pieces: 2
        },
        {
            setNameVi: 'Dấu Ấn Ngăn Cách',
            setNameEn: 'Dấu Ấn Ngăn Cách',
            pieces: 4
        },
        {
            setNameVi: 'Diệm Liệt Ma Nữ Cháy Rực',
            setNameEn: 'Diệm Liệt Ma Nữ Cháy Rực',
            pieces: 4
        }
    ]
};
