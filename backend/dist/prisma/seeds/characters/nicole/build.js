"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Hiệu Quả Nạp', 'Tấn Công%'],
    goblet: ['Tấn Công%'],
    circlet: ['Tấn Công%', 'Tỷ Lệ Bạo Kích'],
    subStatsPriority: ['Hiệu Quả Nạp', 'Tấn Công%', 'Tỷ Lệ Bạo Kích'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Trần Quang Thất Dụ',
            nameEn: 'Trần Quang Thất Dụ',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao và dòng phụ Tấn Công% giúp việc đạt ngưỡng kích hoạt buff dễ dàng hơn.',
            passiveDescEn: 'Tấn công cơ bản cao và dòng phụ Tấn Công% giúp việc đạt ngưỡng kích hoạt buff dễ dàng hơn.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_FairyGarden.webp'
        },
        {
            rank: 2,
            nameVi: 'Khóa Trần Thế',
            nameEn: 'Khóa Trần Thế',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng Tấn Công% cực lớn và tăng cường hiệu quả khiên, giúp tối ưu hóa cả khiên lẫn buff ATK.',
            passiveDescEn: 'Cung cấp lượng Tấn Công% cực lớn và tăng cường hiệu quả khiên, giúp tối ưu hóa cả khiên lẫn buff ATK.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Kunwu.webp'
        },
        {
            rank: 3,
            nameVi: 'Dư Âm Tiếng Hạc',
            nameEn: 'Dư Âm Tiếng Hạc',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng Tấn Công% cho toàn đội sau khi sử dụng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi hỗ trợ đồng đội.',
            passiveDescEn: 'Tăng Tấn Công% cho toàn đội sau khi sử dụng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi hỗ trợ đồng đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MountainGale.webp'
        },
        {
            rank: 4,
            nameVi: 'Quyển Thiên Không',
            nameEn: 'Quyển Thiên Không',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao và dòng phụ Tấn Công% lớn giúp đạt ngưỡng chỉ số cần thiết; đồng thời tăng nhẹ sát thương Phong.',
            passiveDescEn: 'Tấn công cơ bản cao và dòng phụ Tấn Công% lớn giúp đạt ngưỡng chỉ số cần thiết; đồng thời tăng nhẹ sát thương Phong.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Dvalin.webp'
        },
        {
            rank: 5,
            nameVi: 'Ánh Nhìn Tư Tế',
            nameEn: 'Ánh Nhìn Tư Tế',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp và buff Tấn Công cho đội sau khi tạo khiên, tăng khả năng hồi nộ và hỗ trợ đồng đội.',
            passiveDescEn: 'Cung cấp Hiệu Quả Nạp và buff Tấn Công cho đội sau khi tạo khiên, tăng khả năng hồi nộ và hỗ trợ đồng đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Figurines.webp'
        },
        {
            rank: 6,
            nameVi: 'Con Ngươi Tuyên Thệ',
            nameEn: 'Con Ngươi Tuyên Thệ',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Chỉ số Hiệu Quả Nạp Nguyên Tố cao giúp duy trì chu kỳ Nộ hồi liên tục khi cần thiết.',
            passiveDescEn: 'Chỉ số Hiệu Quả Nạp Nguyên Tố cao giúp duy trì chu kỳ Nộ hồi liên tục khi cần thiết.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Jyanome.webp'
        },
        {
            rank: 7,
            nameVi: 'Vòng Bạch Thần',
            nameEn: 'Vòng Bạch Thần',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng sát thương Nguyên Tố Lôi cho đồng đội sau phản ứng, rất mạnh khi đi kèm với đội hình có Lôi.',
            passiveDescEn: 'Tăng sát thương Nguyên Tố Lôi cho đồng đội sau phản ứng, rất mạnh khi đi kèm với đội hình có Lôi.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Bakufu.webp'
        },
        {
            rank: 8,
            nameVi: 'Dòng Chảy Tinh Khiết',
            nameEn: 'Dòng Chảy Tinh Khiết',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn cung cấp Tấn Công% và cơ chế tự hồi phục, hỗ trợ đắc lực trong việc đạt ngưỡng chỉ số.',
            passiveDescEn: 'Vũ khí rèn cung cấp Tấn Công% và cơ chế tự hồi phục, hỗ trợ đắc lực trong việc đạt ngưỡng chỉ số.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Vorpal.webp'
        },
        {
            rank: 9,
            nameVi: 'Tây Phong Mật Điển',
            nameEn: 'Tây Phong Mật Điển',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tạo thêm hạt nhân năng lượng khi bạo kích giúp giảm áp lực nạp cho cả đội.',
            passiveDescEn: 'Tạo thêm hạt nhân năng lượng khi bạo kích giúp giảm áp lực nạp cho cả đội.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Zephyrus.webp'
        },
        {
            rank: 10,
            nameVi: 'Câu Chuyện Diệt Rồng',
            nameEn: 'Câu Chuyện Diệt Rồng',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng 48% Tấn Công cho nhân vật tiếp theo ra sân, là một lựa chọn hỗ trợ cổ điển nhưng cực kỳ mạnh mẽ.',
            passiveDescEn: 'Tăng 48% Tấn Công cho nhân vật tiếp theo ra sân, là một lựa chọn hỗ trợ cổ điển nhưng cực kỳ mạnh mẽ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Pulpfic.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Tấn Công / Hiệu Quả Nạp',
            setNameEn: 'Mix 2 bộ Tấn Công / Hiệu Quả Nạp',
            pieces: 2
        },
        {
            setNameVi: 'Nghi Thức Tông Thất Cổ',
            setNameEn: 'Nghi Thức Tông Thất Cổ',
            pieces: 4
        },
        {
            setNameVi: 'Phước Lành Trời Cao',
            setNameEn: 'Phước Lành Trời Cao',
            pieces: 4
        },
        {
            setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            setNameEn: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            pieces: 4
        }
    ]
};
