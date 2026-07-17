"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Tinh Thông Nguyên Tố'],
    goblet: ['Tinh Thông Nguyên Tố', 'Sát Thương Nguyên Tố Thảo'],
    circlet: ['Tinh Thông Nguyên Tố', 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
    subStatsPriority: [
        'Energy Recharge',
        'CRIT Rate',
        'CRIT DMG',
        'Elemental Mastery',
        'ATK%'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Cõi Mộng Ngàn Đêm',
            nameEn: 'Cõi Mộng Ngàn Đêm',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.',
            passiveDescEn: 'Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Ayus.webp'
        },
        {
            rank: 2,
            nameVi: 'Hòa Giấc Trong Nắng Mai',
            nameEn: 'Hòa Giấc Trong Nắng Mai',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.',
            passiveDescEn: 'Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_SakuraFan.webp'
        },
        {
            rank: 3,
            nameVi: 'Chân Ý Của Kagura',
            nameEn: 'Chân Ý Của Kagura',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.',
            passiveDescEn: 'Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Narukami.webp'
        },
        {
            rank: 4,
            nameVi: 'Mảnh Chương Tế Lễ',
            nameEn: 'Mảnh Chương Tế Lễ',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.',
            passiveDescEn: 'Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Fossil.webp'
        },
        {
            rank: 5,
            nameVi: 'Đàn Thiên Quang',
            nameEn: 'Đàn Thiên Quang',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.',
            passiveDescEn: 'Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_SeeliesLute.webp'
        },
        {
            rank: 6,
            nameVi: 'Sao Đêm Rong Ruổi',
            nameEn: 'Sao Đêm Rong Ruổi',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.',
            passiveDescEn: 'Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Pleroma.webp'
        },
        {
            rank: 7,
            nameVi: 'Chương Nhạc Lang Thang',
            nameEn: 'Chương Nhạc Lang Thang',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.',
            passiveDescEn: 'Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Troupe.webp'
        },
        {
            rank: 8,
            nameVi: 'Ngọc Bích Hiến Tế',
            nameEn: 'Ngọc Bích Hiến Tế',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Yue.webp'
        },
        {
            rank: 9,
            nameVi: 'Quyển Thiên Không',
            nameEn: 'Quyển Thiên Không',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.',
            passiveDescEn: 'Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Dvalin.webp'
        },
        {
            rank: 10,
            nameVi: 'Điển Tích Tây Phong',
            nameEn: 'Điển Tích Tây Phong',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Fourwinds.webp'
        },
        {
            rank: 11,
            nameVi: 'Khóa Trần Thế',
            nameEn: 'Khóa Trần Thế',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.',
            passiveDescEn: 'Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Kunwu.webp'
        },
        {
            rank: 12,
            nameVi: 'Nhật Nguyệt Hạp',
            nameEn: 'Nhật Nguyệt Hạp',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.',
            passiveDescEn: 'Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Resurrection.webp'
        },
        {
            rank: 13,
            nameVi: 'Tây Phong Mật Điển',
            nameEn: 'Tây Phong Mật Điển',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.',
            passiveDescEn: 'Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Zephyrus.webp'
        },
        {
            rank: 14,
            nameVi: 'Hải Đồ Vạn Quốc',
            nameEn: 'Hải Đồ Vạn Quốc',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.',
            passiveDescEn: 'Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Exotic.webp'
        },
        {
            rank: 15,
            nameVi: 'Tóm Tắt Ma Pháp',
            nameEn: 'Tóm Tắt Ma Pháp',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.',
            passiveDescEn: 'Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Intro.webp'
        },
        {
            rank: 16,
            nameVi: 'Vòng Bạch Thần',
            nameEn: 'Vòng Bạch Thần',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.',
            passiveDescEn: 'Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Bakufu.webp'
        },
        {
            rank: 17,
            nameVi: 'Câu Chuyện Diệt Rồng',
            nameEn: 'Câu Chuyện Diệt Rồng',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.',
            passiveDescEn: 'Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Pulpfic.webp'
        },
        {
            rank: 18,
            nameVi: 'Mẫu Kim Phách',
            nameEn: 'Mẫu Kim Phách',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.',
            passiveDescEn: 'Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Proto.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Thiên Nham Vững Chắc',
            setNameEn: 'Thiên Nham Vững Chắc',
            pieces: 4
        },
        {
            setNameVi: 'Đoàn Kịch Hoàng Kim',
            setNameEn: 'Đoàn Kịch Hoàng Kim',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu',
            setNameEn: 'Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu',
            pieces: 2
        },
        {
            setNameVi: 'Ký Ức Rừng Sâu',
            setNameEn: 'Ký Ức Rừng Sâu',
            pieces: 4
        },
        {
            setNameVi: 'Đóa Hoa Trang Viên Thất Lạc',
            setNameEn: 'Đóa Hoa Trang Viên Thất Lạc',
            pieces: 4
        },
        {
            setNameVi: 'Giấc Mộng Hoàng Kim',
            setNameEn: 'Giấc Mộng Hoàng Kim',
            pieces: 4
        }
    ]
};
