"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Skill', 'Burst'],
    signatureWeapons: [],
    sands: ['Tấn Công%', 'Tinh Thông Nguyên Tố'],
    goblet: ['Sát Thương Nguyên Tố Hỏa'],
    circlet: ['Sát Thương Bạo Kích'],
    subStatsPriority: ['CRIT DMG', 'ATK%', 'Elemental Mastery'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Màn Ảo Thuật Đầu Tiên',
            nameEn: 'Màn Ảo Thuật Đầu Tiên',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.',
            passiveDescEn: 'Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng sát thương Trọng Kích và tăng Tấn Công%, rất thích hợp cho lối chơi ngắm bắn của Amber.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Pledge.webp'
        },
        {
            rank: 2,
            nameVi: 'Nhược Thủy',
            nameEn: 'Nhược Thủy',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.',
            passiveDescEn: 'Chỉ số Sát Thương Bạo Kích khổng lồ (88.2%). Nội tại tăng sát thương khi ở gần kẻ địch, giúp tối ưu hóa lượng dame phản ứng Tan Chảy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Kirin.webp'
        },
        {
            rank: 3,
            nameVi: 'Sấm Sét Rung Động',
            nameEn: 'Sấm Sét Rung Động',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.',
            passiveDescEn: 'Cung cấp lượng lớn Sát Thương Bạo Kích và nội tại tăng Tấn Công%, thích hợp cho lối chơi ngắm bắn kết hợp xả chiêu.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Narukami.webp'
        },
        {
            rank: 4,
            nameVi: 'Cánh Thiên Không',
            nameEn: 'Cánh Thiên Không',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao và nội tại tăng thêm Sát Thương Bạo Kích%. Cung cấp thêm sát thương vật lý diện rộng thỉnh thoảng, rất đa dụng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Dvalin.webp'
        },
        {
            rank: 5,
            nameVi: 'Ngôi Sao Cực Đông',
            nameEn: 'Ngôi Sao Cực Đông',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích. Nội tại tích tầng tăng Tấn Công% khi đánh trúng địch bằng Kỹ Năng Nguyên Tố, Nộ, Thường và Trọng Kích.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Worldbane.webp'
        },
        {
            rank: 6,
            nameVi: 'Nỏ Kéo',
            nameEn: 'Nỏ Kéo',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.',
            passiveDescEn: 'Lựa chọn 3 sao F2P cực mạnh nhờ lượng Tỷ Lệ Bạo Kích dồi dào và nội tại tăng mạnh sát thương đòn ngắm bắn trong cự ly gần.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Sling.webp'
        },
        {
            rank: 7,
            nameVi: 'Cung Amos',
            nameEn: 'Cung Amos',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.',
            passiveDescEn: 'Tấn Cống% cực cao. Tăng sát thương Tấn Công Thường và Ngắm Bắn, sát thương tăng thêm dựa trên thời gian bay của mũi tên.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Amos.webp'
        },
        {
            rank: 8,
            nameVi: 'Con Đường Thợ Săn',
            nameEn: 'Con Đường Thợ Săn',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.',
            passiveDescEn: 'Tỷ Lệ Bạo Kích cao. Nội tại tăng sát thương Trọng Kích dựa trên Tinh Thông Nguyên Tố, cực mạnh trong đội hình Tan Chảy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Ayus.webp'
        },
        {
            rank: 9,
            nameVi: 'Mỏ Cò Xuyên Thấu',
            nameEn: 'Mỏ Cò Xuyên Thấu',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.',
            passiveDescEn: 'Vũ khí Event F2P tăng Tinh Thông Nguyên Tố sau khi đánh trúng địch bằng trọng kích, trực tiếp khuếch đại sát thương phản ứng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Ibis.webp'
        },
        {
            rank: 10,
            nameVi: 'Cung Sắc Xanh',
            nameEn: 'Cung Sắc Xanh',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.',
            passiveDescEn: 'Dòng phụ Tỷ Lệ Bạo Kích và nội tại tạo gió lốc nhỏ gom quái, giúp Amber dễ dàng thực hiện các phát bắn chuẩn xác.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Viridescent.webp'
        },
        {
            rank: 11,
            nameVi: 'Cung Trừ Ma',
            nameEn: 'Cung Trừ Ma',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.',
            passiveDescEn: 'Vũ khí rèn Inazuma F2P tăng mạnh sát thương đòn ngắm bắn, hiệu quả tối đa khi giữ đầy thanh năng lượng Nộ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Bakufu.webp'
        },
        {
            rank: 12,
            nameVi: 'Mẫu Đạm Nguyệt',
            nameEn: 'Mẫu Đạm Nguyệt',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.',
            passiveDescEn: 'Cung cấp lượng lớn Tấn Công% sau khi bắn trúng điểm yếu của kẻ địch, lựa chọn ngắm bắn bắn tỉa rất tốt.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Proto.webp'
        },
        {
            rank: 13,
            nameVi: 'Khúc Ca Tĩnh Lặng',
            nameEn: 'Khúc Ca Tĩnh Lặng',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.',
            passiveDescEn: 'Vũ khí rèn Fontaine tăng mạnh sát thương đòn đánh sau khi nhận trị liệu, dễ kích hoạt khi đi cùng Healer.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Vorpal.webp'
        },
        {
            rank: 14,
            nameVi: 'Bài Ca Hoa Gió',
            nameEn: 'Bài Ca Hoa Gió',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.',
            passiveDescEn: 'Tăng Tinh Thông Nguyên Tố và nhận thêm Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, hữu ích cho các pha phản ứng.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Fleurfair.webp'
        },
        {
            rank: 15,
            nameVi: 'Tuyệt Huyền',
            nameEn: 'Tuyệt Huyền',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.',
            passiveDescEn: 'Tăng mạnh sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ, thích hợp cho lối chơi quickswap ném bù nhìn rối và xả Nộ.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Troupe.webp'
        },
        {
            rank: 16,
            nameVi: 'Lời Thề Xạ Thủ Thần',
            nameEn: 'Lời Thề Xạ Thủ Thần',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.',
            passiveDescEn: 'Vũ khí 3 sao F2P hoàn hảo cho lối chơi bắn điểm yếu nhờ lượng lớn Sát Thương Bạo Kích và nội tại tăng 48% dame điểm yếu.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Arjuna.webp'
        },
        {
            rank: 17,
            nameVi: 'Cận Vệ Nhà Vua',
            nameEn: 'Cận Vệ Nhà Vua',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.',
            passiveDescEn: 'Vũ khí rèn Sumeru tăng Tinh Thông Nguyên Tố sau khi dùng kỹ năng, bổ trợ tốt cho các phản ứng nguyên tố.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Arakalari.webp'
        },
        {
            rank: 18,
            nameVi: 'Hậu Duệ Mặt Trời',
            nameEn: 'Hậu Duệ Mặt Trời',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.',
            passiveDescEn: 'Cung cấp Tỷ Lệ Bạo Kích. Đòn trọng kích trúng địch gây thêm sát thương Hỏa và tăng sát thương trọng kích tiếp theo lên mục tiêu đó.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Gurabad.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Giấc Mộng Hoàng Kim',
            setNameEn: 'Giấc Mộng Hoàng Kim',
            pieces: 4
        },
        {
            setNameVi: 'Diệm Liệt Ma Nữ Cháy Rực',
            setNameEn: 'Diệm Liệt Ma Nữ Cháy Rực',
            pieces: 4
        },
        {
            setNameVi: 'Nghi Thức Tông Thất Cổ',
            setNameEn: 'Noblesse Oblige',
            pieces: 4
        },
        {
            setNameVi: 'Đoàn Hát Lang Thang Đại Lục',
            setNameEn: 'Đoàn Hát Lang Thang Đại Lục',
            pieces: 4
        },
        {
            setNameVi: 'Dấu Ấn Ngăn Cách',
            setNameEn: 'Emblem of Severed Fate',
            pieces: 4
        },
        {
            setNameVi: 'Dòng Hồi Ức Bất Tận',
            setNameEn: 'Dòng Hồi Ức Bất Tận',
            pieces: 4
        }
    ]
};
