"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Burst', 'Skill', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Tấn Công%', 'Tinh Thông Nguyên Tố', 'Hiệu Quả Nạp'],
    goblet: ['Sát Thương Nguyên Tố Hỏa'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
    subStatsPriority: [
        'Hiệu Quả Nạp',
        'Tỷ Lệ Bạo Kích',
        'Sát Thương Bạo Kích',
        'Tấn Công%',
        'HP%',
        'Tinh Thông Nguyên Tố'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Hải Đăng Bờ Biển Lau',
            nameEn: 'Hải Đăng Bờ Biển Lau',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.',
            passiveDescEn: 'Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Deshret.webp'
        },
        {
            rank: 2,
            nameVi: 'Xích Giác Phá Thạch Đao',
            nameEn: 'Xích Giác Phá Thạch Đao',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.',
            passiveDescEn: 'Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.webp'
        },
        {
            rank: 3,
            nameVi: 'Phán Quyết',
            nameEn: 'Phán Quyết',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.',
            passiveDescEn: 'Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_GoldenVerdict.webp'
        },
        {
            rank: 4,
            nameVi: 'Đường Cùng Của Sói',
            nameEn: 'Đường Cùng Của Sói',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.',
            passiveDescEn: 'Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp'
        },
        {
            rank: 5,
            nameVi: 'Nanh Sơn Vương',
            nameEn: 'Nanh Sơn Vương',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp'
        },
        {
            rank: 6,
            nameVi: 'Kiếm Li Cốt',
            nameEn: 'Kiếm Li Cốt',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.',
            passiveDescEn: 'Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kione.webp'
        },
        {
            rank: 7,
            nameVi: 'Đóa Hoa Tôn Màu Thép',
            nameEn: 'Đóa Hoa Tôn Màu Thép',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.',
            passiveDescEn: 'Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Fleurfair.webp'
        },
        {
            rank: 8,
            nameVi: 'Vũ Tài',
            nameEn: 'Vũ Tài',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.',
            passiveDescEn: 'Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Perdue.webp'
        },
        {
            rank: 9,
            nameVi: 'Bóng Tối Thủy Triều',
            nameEn: 'Bóng Tối Thủy Triều',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.',
            passiveDescEn: 'Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Vorpal.webp'
        },
        {
            rank: 10,
            nameVi: 'Bá Vương Tối Thượng Siêu Cấp Ma Kiếm',
            nameEn: 'Bá Vương Tối Thượng Siêu Cấp Ma Kiếm',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.',
            passiveDescEn: 'Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Champion.webp'
        },
        {
            rank: 11,
            nameVi: 'Gậy Đàm Phán',
            nameEn: 'Gậy Đàm Phán',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_BeastTamer.webp'
        },
        {
            rank: 12,
            nameVi: 'Kiếm Vô Công',
            nameEn: 'Kiếm Vô Công',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.',
            passiveDescEn: 'Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kunwu.webp'
        },
        {
            rank: 13,
            nameVi: 'Thiên Dương Rực Lửa',
            nameEn: 'Thiên Dương Rực Lửa',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_RadianceSword.webp'
        },
        {
            rank: 14,
            nameVi: 'Thiên Không Kiêu Ngạo',
            nameEn: 'Thiên Không Kiêu Ngạo',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.',
            passiveDescEn: 'Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dvalin.webp'
        },
        {
            rank: 15,
            nameVi: 'Akuoumaru',
            nameEn: 'Akuoumaru',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.',
            passiveDescEn: 'Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Maria.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Ảo Mộng Chưa Hoàn Thành',
            setNameEn: 'Ảo Mộng Chưa Hoàn Thành',
            pieces: 4
        },
        {
            setNameVi: 'Vầng Sáng Vourukasha',
            setNameEn: 'Vầng Sáng Vourukasha',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công',
            setNameEn: 'Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công',
            pieces: 2
        },
        {
            setNameVi: 'Thợ Săn Marechaussee',
            setNameEn: 'Thợ Săn Marechaussee',
            pieces: 4
        },
        {
            setNameVi: 'Dấu Ấn Ngăn Cách',
            setNameEn: 'Dấu Ấn Ngăn Cách',
            pieces: 4
        }
    ]
};
