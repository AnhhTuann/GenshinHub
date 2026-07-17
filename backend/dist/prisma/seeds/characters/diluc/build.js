"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Skill', 'Burst'],
    signatureWeapons: [],
    sands: ['Tinh Thông Nguyên Tố', 'Tấn Công%'],
    goblet: ['Sát Thương Nguyên Tố Hỏa'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
    subStatsPriority: [
        'CRIT Rate',
        'CRIT DMG',
        'ATK%',
        'Elemental Mastery',
        'Energy Recharge'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Hải Đăng Bờ Biển Lau',
            nameEn: 'Hải Đăng Bờ Biển Lau',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.',
            passiveDescEn: 'Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Deshret.webp'
        },
        {
            rank: 2,
            nameVi: 'Xích Giác Phá Thạch Đao',
            nameEn: 'Xích Giác Phá Thạch Đao',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.',
            passiveDescEn: 'Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.webp'
        },
        {
            rank: 3,
            nameVi: 'Thiên Dương Rực Lửa',
            nameEn: 'Thiên Dương Rực Lửa',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.',
            passiveDescEn: 'Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_RadianceSword.webp'
        },
        {
            rank: 4,
            nameVi: 'Phán Quyết',
            nameEn: 'Phán Quyết',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.',
            passiveDescEn: 'Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_GoldenVerdict.webp'
        },
        {
            rank: 5,
            nameVi: 'Kiếm Li Cốt',
            nameEn: 'Kiếm Li Cốt',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.',
            passiveDescEn: 'Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kione.webp'
        },
        {
            rank: 6,
            nameVi: 'Nanh Sơn Vương',
            nameEn: 'Nanh Sơn Vương',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp'
        },
        {
            rank: 7,
            nameVi: 'Đường Cùng Của Sói',
            nameEn: 'Đường Cùng Của Sói',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.',
            passiveDescEn: 'Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp'
        },
        {
            rank: 8,
            nameVi: 'Kiếm Vô Công',
            nameEn: 'Kiếm Vô Công',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.',
            passiveDescEn: 'Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kunwu.webp'
        },
        {
            rank: 9,
            nameVi: 'Tiếng Gió Trong Rừng Thông',
            nameEn: 'Tiếng Gió Trong Rừng Thông',
            subStat: 'Tăng Sát Thương Vật Lý',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.',
            passiveDescEn: 'Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Widsith.webp'
        },
        {
            rank: 10,
            nameVi: 'Vũ Tài',
            nameEn: 'Vũ Tài',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.',
            passiveDescEn: 'Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Perdue.webp'
        },
        {
            rank: 11,
            nameVi: 'Đóa Hoa Tôn Màu Thép',
            nameEn: 'Đóa Hoa Tôn Màu Thép',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.',
            passiveDescEn: 'Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Fleurfair.webp'
        },
        {
            rank: 12,
            nameVi: 'Bóng Tối Thủy Triều',
            nameEn: 'Bóng Tối Thủy Triều',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.',
            passiveDescEn: 'Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Vorpal.webp'
        },
        {
            rank: 13,
            nameVi: 'Hắc Nham Trảm Đao',
            nameEn: 'Hắc Nham Trảm Đao',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.',
            passiveDescEn: 'Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Blackrock.webp'
        },
        {
            rank: 14,
            nameVi: 'Thiên Không Kiêu Ngạo',
            nameEn: 'Thiên Không Kiêu Ngạo',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.',
            passiveDescEn: 'Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dvalin.webp'
        },
        {
            rank: 15,
            nameVi: 'Đao Chấn Động',
            nameEn: 'Đao Chấn Động',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.',
            passiveDescEn: 'Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Isikhulu.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
            setNameEn: 'Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công',
            pieces: 2
        },
        {
            setNameVi: 'Lễ Bế Mạc Của Giác Đấu Sĩ',
            setNameEn: 'Lễ Bế Mạc Của Giác Đấu Sĩ',
            pieces: 4
        },
        {
            setNameVi: 'Thợ Săn Marechaussee',
            setNameEn: 'Thợ Săn Marechaussee',
            pieces: 4
        },
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
