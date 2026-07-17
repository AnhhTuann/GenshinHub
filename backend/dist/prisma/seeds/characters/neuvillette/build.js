"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Burst', 'Skill'],
    signatureWeapons: [],
    sands: ['HP%'],
    goblet: ['Sát Thương Nguyên Tố Thủy', 'HP%'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích', 'HP%'],
    subStatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'HP%', 'HP'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Nghi Thức Dòng Chảy Vĩnh Hằng',
            nameEn: 'Nghi Thức Dòng Chảy Vĩnh Hằng',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.',
            passiveDescEn: 'Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Iudex.webp'
        },
        {
            rank: 2,
            nameVi: 'Ngọc Quý Lưu Trong Biển Chết',
            nameEn: 'Ngọc Quý Lưu Trong Biển Chết',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.',
            passiveDescEn: 'Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Yue.webp'
        },
        {
            rank: 3,
            nameVi: 'Thời Khắc Lướt Sóng',
            nameEn: 'Thời Khắc Lướt Sóng',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.",
            passiveDescEn: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.",
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.webp'
        },
        {
            rank: 4,
            nameVi: 'Chân Ngôn Bí Hạp',
            nameEn: 'Chân Ngôn Bí Hạp',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.',
            passiveDescEn: 'Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Sistrum.webp'
        },
        {
            rank: 5,
            nameVi: 'Ngọc Bích Huy Hoàng',
            nameEn: 'Ngọc Bích Huy Hoàng',
            subStat: 'HP%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.',
            passiveDescEn: 'Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Morax.webp'
        },
        {
            rank: 6,
            nameVi: 'Mẫu Kim Phách',
            nameEn: 'Mẫu Kim Phách',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.',
            passiveDescEn: 'Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Proto.webp'
        },
        {
            rank: 7,
            nameVi: 'Quản Đốc Vàng Ròng',
            nameEn: 'Quản Đốc Vàng Ròng',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.',
            passiveDescEn: 'Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Wheatley.webp'
        },
        {
            rank: 8,
            nameVi: 'Chương Nhạc Lang Thang',
            nameEn: 'Chương Nhạc Lang Thang',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.',
            passiveDescEn: 'Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp'
        },
        {
            rank: 9,
            nameVi: 'Chân Ý Của Kagura',
            nameEn: 'Chân Ý Của Kagura',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.',
            passiveDescEn: 'Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Narukami.webp'
        },
        {
            rank: 10,
            nameVi: 'Điển Tích Tây Phong',
            nameEn: 'Điển Tích Tây Phong',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Fourwinds.webp'
        },
        {
            rank: 11,
            nameVi: 'Sừng Rượu Vân Xanh',
            nameEn: 'Sừng Rượu Vân Xanh',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.',
            passiveDescEn: 'Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_ConchSprayer.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Đoàn Hát Lang Thang Đại Lục',
            setNameEn: 'Đoàn Hát Lang Thang Đại Lục',
            pieces: 4
        },
        {
            setNameVi: 'Trái Tim Trầm Luân',
            setNameEn: 'Trái Tim Trầm Luân',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Thủy / HP / Thợ Săn',
            setNameEn: 'Mix 2 bộ Thủy / HP / Thợ Săn',
            pieces: 2
        },
        {
            setNameVi: 'Thợ Săn Marechaussee',
            setNameEn: 'Thợ Săn Marechaussee',
            pieces: 4
        },
        {
            setNameVi: 'Giấc Mộng Thủy Tiên',
            setNameEn: 'Giấc Mộng Thủy Tiên',
            pieces: 4
        },
        {
            setNameVi: 'Sao Băng Bay Ngược',
            setNameEn: 'Sao Băng Bay Ngược',
            pieces: 4
        }
    ]
};
