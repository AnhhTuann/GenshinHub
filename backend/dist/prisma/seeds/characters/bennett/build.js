"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Burst', 'Skill', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Hiệu Quả Nạp', 'Tấn Công%', 'HP%'],
    goblet: ['Sát Thương Nguyên Tố Hỏa', 'HP%'],
    circlet: ['Tỷ Lệ Bạo Kích', 'HP%', 'Tăng Trị Liệu'],
    subStatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'HP%', 'ATK%', 'HP'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Ánh Sáng Đêm Sương Mù',
            nameEn: 'Ánh Sáng Đêm Sương Mù',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.',
            passiveDescEn: 'Tấn công cơ bản cao nhất game (674) giúp gia tăng tối đa lượng buff Tấn Công của Kỹ Năng Nộ, dù dòng phụ Sát Thương Bạo Kích ít có tác dụng hỗ trợ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Narukami.webp'
        },
        {
            rank: 2,
            nameVi: 'Xá Tội',
            nameEn: 'Xá Tội',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.',
            passiveDescEn: 'Tấn công cơ bản cực cao (674) giúp tối ưu hóa lượng buff Tấn Công. Chỉ số Sát Thương Bạo Kích tuy không quá lý tưởng cho lối chơi thuần hỗ trợ nhưng vẫn rất giá trị.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Estoc.webp'
        },
        {
            rank: 3,
            nameVi: 'Thương Diệu',
            nameEn: 'Thương Diệu',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.',
            passiveDescEn: 'Tấn công cơ bản tối đa (674) kết hợp hoàn hảo cùng dòng phụ Tỷ Lệ Bạo Kích. Hỗ trợ sạc Nộ tốt và buff sát thương hiệu quả.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_OuterSword.webp'
        },
        {
            rank: 4,
            nameVi: 'Phong Ưng Kiếm',
            nameEn: 'Phong Ưng Kiếm',
            subStat: 'Tăng Sát Thương Vật Lý',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.',
            passiveDescEn: 'Tấn công cơ bản cao (674) giúp cung cấp lượng buff ATK cực lớn cho đồng đội. Dòng phụ Sát Thương Vật Lý bị lãng phí nhưng nội tại tự hồi máu thỉnh thoảng giúp ích.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Falcon.webp'
        },
        {
            rank: 5,
            nameVi: 'Tia Sáng Nơi Hẻm Tối',
            nameEn: 'Tia Sáng Nơi Hẻm Tối',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.',
            passiveDescEn: 'Vũ khí 4 sao có Tấn Công cơ bản cao nhất (620). Tăng nhẹ sát thương cá nhân, dòng phụ Tinh Thông Nguyên Tố hỗ trợ phản ứng tốt.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Outlaw.webp'
        },
        {
            rank: 6,
            nameVi: 'Lời Thề Tự Do Cổ Xưa',
            nameEn: 'Lời Thề Tự Do Cổ Xưa',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.',
            passiveDescEn: 'Tấn công cơ bản khá tốt (608). Nội tại tăng Tấn Công% và sát thương đánh thường cho cả đội, hỗ trợ hoàn hảo cho đội hình phản ứng bốc hơi/tan chảy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Widsith.webp'
        },
        {
            rank: 7,
            nameVi: 'Khúc Ca Núi Đá',
            nameEn: 'Khúc Ca Núi Đá',
            subStat: 'Phòng Thủ%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.',
            passiveDescEn: 'Tấn công cơ bản cực cao (674) tương tự Thương Diệu, giúp sạc Nộ tốt và gia tăng lượng buff Tấn Công khổng lồ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_XochitlsTube.webp'
        },
        {
            rank: 8,
            nameVi: 'Thiên Không Kiếm',
            nameEn: 'Thiên Không Kiếm',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.',
            passiveDescEn: 'Tấn công cơ bản cao (608) đi kèm dòng phụ Hiệu Quả Nạp rất lớn, giúp Bennett spam Nộ cực kỳ dễ dàng mà không lo thiếu nạp.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Dvalin.webp'
        },
        {
            rank: 9,
            nameVi: 'Kiếm Gỗ',
            nameEn: 'Kiếm Gỗ',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.',
            passiveDescEn: 'Vũ khí rèn Sumeru F2P tốt nhất cho Bennett. Tấn công cơ bản ổn định (565), dòng phụ Hiệu Quả Nạp và tạo hạt buff tinh thông cho đồng đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Arakalari.webp'
        },
        {
            rank: 10,
            nameVi: 'Mẫu Trảm Nham',
            nameEn: 'Mẫu Trảm Nham',
            subStat: 'Tăng Sát Thương Vật Lý',
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.',
            passiveDescEn: 'Tấn công cơ bản tương đối tốt (565) cho vũ khí F2P dễ kiếm. Dòng phụ Vật Lý ít tác dụng, khuyên dùng khi không có lựa chọn nào khác.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Proto.webp'
        },
        {
            rank: 11,
            nameVi: 'Tai Họa Eshu',
            nameEn: 'Tai Họa Eshu',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.',
            passiveDescEn: 'Tấn công cơ bản cao (565) nhưng không có dòng phụ Hiệu Quả Nạp. Nội tại tăng Tấn Công% sau khi được hồi máu.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_SacrificialNgombe.webp'
        },
        {
            rank: 12,
            nameVi: 'Tây Phong Kiếm',
            nameEn: 'Tây Phong Kiếm',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.',
            passiveDescEn: 'Tấn công cơ bản thấp (454) làm giảm lượng buff Tấn Công. Tuy nhiên dòng phụ Nạp rất cao và nội tại sinh hạt năng lượng giúp sạc nhanh cho cả đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Zephyrus.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            setNameEn: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            pieces: 4
        },
        {
            setNameVi: 'Nghi Thức Tông Thất Cổ',
            setNameEn: 'Nghi Thức Tông Thất Cổ',
            pieces: 4
        },
        { setNameVi: 'Giáo Quan', setNameEn: 'Giáo Quan', pieces: 4 },
        {
            setNameVi: 'Ký Ức Rừng Sâu',
            setNameEn: 'Ký Ức Rừng Sâu',
            pieces: 4
        }
    ]
};
