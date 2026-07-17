"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Burst', 'Skill'],
    signatureWeapons: [],
    sands: ['Tấn Công%', 'Tinh Thông Nguyên Tố'],
    goblet: ['Sát Thương Nguyên Tố Hỏa'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
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
            nameVi: 'Chân Ngôn Bí Hạp',
            nameEn: 'Chân Ngôn Bí Hạp',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.',
            passiveDescEn: 'Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Sistrum.webp'
        },
        {
            rank: 2,
            nameVi: 'Nghi Thức Dòng Chảy Vĩnh Hằng',
            nameEn: 'Nghi Thức Dòng Chảy Vĩnh Hằng',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.',
            passiveDescEn: 'Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Iudex.webp'
        },
        {
            rank: 3,
            nameVi: 'Quản Đốc Vàng Ròng',
            nameEn: 'Quản Đốc Vàng Ròng',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Wheatley.webp'
        },
        {
            rank: 4,
            nameVi: 'Tâm Niệm Sắc Màu',
            nameEn: 'Tâm Niệm Sắc Màu',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.',
            passiveDescEn: 'Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_VaresaTransformer.webp'
        },
        {
            rank: 5,
            nameVi: 'Thời Khắc Lướt Sóng',
            nameEn: 'Thời Khắc Lướt Sóng',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.',
            passiveDescEn: 'Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.webp'
        },
        {
            rank: 6,
            nameVi: 'Cõi Mộng Ngàn Đêm',
            nameEn: 'Cõi Mộng Ngàn Đêm',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.',
            passiveDescEn: 'Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Ayus.webp'
        },
        {
            rank: 7,
            nameVi: 'Ánh Nhìn Tư Tế',
            nameEn: 'Ánh Nhìn Tư Tế',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Figurines.webp'
        },
        {
            rank: 8,
            nameVi: 'Dòng Chảy Trong Trẻo',
            nameEn: 'Dòng Chảy Trong Trẻo',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.',
            passiveDescEn: 'Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Vorpal.webp'
        },
        {
            rank: 9,
            nameVi: 'Chương Nhạc Lang Thang',
            nameEn: 'Chương Nhạc Lang Thang',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.',
            passiveDescEn: 'Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp'
        },
        {
            rank: 10,
            nameVi: 'Sương Mai',
            nameEn: 'Sương Mai',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.',
            passiveDescEn: 'Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Ziedas.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Diệm Liệt Ma Nữ Cháy Rực',
            setNameEn: 'Diệm Liệt Ma Nữ Cháy Rực',
            pieces: 4
        },
        {
            setNameVi: 'Thợ Săn Marechaussee',
            setNameEn: 'Thợ Săn Marechaussee',
            pieces: 4
        },
        {
            setNameVi: 'Giấc Mộng Hoàng Kim',
            setNameEn: 'Giấc Mộng Hoàng Kim',
            pieces: 4
        },
        {
            setNameVi: 'Đoàn Hát Lang Thang Đại Lục',
            setNameEn: 'Đoàn Hát Lang Thang Đại Lục',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
            setNameEn: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
            pieces: 2
        }
    ]
};
