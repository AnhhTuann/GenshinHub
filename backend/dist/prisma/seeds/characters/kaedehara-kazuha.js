"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kaedeharaKazuha = void 0;
exports.kaedeharaKazuha = {
    characterId: "kaedehara-kazuha",
    tier: null,
    role: null,
    recommendedC: null,
    tierNoteEn: [],
    tierNoteVi: [],
    talentPriority: [
        "Burst",
        "Skill",
        "Normal Attack"
    ],
    signatureWeapons: [],
    teams: [],
    bestWeapons: [
        {
            rank: 1,
            nameVi: "Lời Thề Tự Do Cổ Xưa",
            nameEn: "Lời Thề Tự Do Cổ Xưa",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tinh Thông Nguyên Tố cực cao và khả năng buff Tấn Công cho toàn đội. Trấn phái giúp tối đa hóa khả năng hỗ trợ và sát thương Khuếch Tán.",
            passiveDescEn: "Tinh Thông Nguyên Tố cực cao và khả năng buff Tấn Công cho toàn đội. Trấn phái giúp tối đa hóa khả năng hỗ trợ và sát thương Khuếch Tán.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Widsith.png"
        },
        {
            rank: 2,
            nameVi: "Tây Phong Kiếm",
            nameEn: "Tây Phong Kiếm",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Tạo hạt nhân lượng cho cả đội. Cực kỳ hữu dụng khi nhu cầu Hiệu Quả Nạp cao, đặc biệt khi đội hình không có Bennett.",
            passiveDescEn: "Tạo hạt nhân lượng cho cả đội. Cực kỳ hữu dụng khi nhu cầu Hiệu Quả Nạp cao, đặc biệt khi đội hình không có Bennett.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Zephyrus.png"
        },
        {
            rank: 3,
            nameVi: "Ánh Trăng Xiphos",
            nameEn: "Ánh Trăng Xiphos",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Chuyển hóa Tinh Thông Nguyên Tố thành Hiệu Quả Nạp cho bản thân và toàn đội. Giúp duy trì thời gian thi triển Kỹ Năng Nộ.",
            passiveDescEn: "Chuyển hóa Tinh Thông Nguyên Tố thành Hiệu Quả Nạp cho bản thân và toàn đội. Giúp duy trì thời gian thi triển Kỹ Năng Nộ.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Pleroma.png"
        },
        {
            rank: 4,
            nameVi: "Kiếm Tế Lễ",
            nameEn: "Kiếm Tế Lễ",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: false,
            refinement: "R5",
            passiveDescVi: "Reset thời gian hồi chiêu E để Khuếch Tán hai lần và tạo thêm nhiều hạt năng lượng. Gom quái cực tốt và sạc ổn định.",
            passiveDescEn: "Reset thời gian hồi chiêu E để Khuếch Tán hai lần và tạo thêm nhiều hạt năng lượng. Gom quái cực tốt và sạc ổn định.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Fossil.png"
        },
        {
            rank: 5,
            nameVi: "Ống Đồng Fleuve Cendre",
            nameEn: "Ống Đồng Fleuve Cendre",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Tăng Tỷ Lệ Bạo Kích Kỹ Năng Nguyên Tố và Hiệu Quả Nạp. Vũ khí F2P (đổi câu cá) giúp cân bằng giữa sát thương và khả năng nạp.",
            passiveDescEn: "Tăng Tỷ Lệ Bạo Kích Kỹ Năng Nguyên Tố và Hiệu Quả Nạp. Vũ khí F2P (đổi câu cá) giúp cân bằng giữa sát thương và khả năng nạp.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Dirty.png"
        },
        {
            rank: 6,
            nameVi: "Thiên Không Kiếm",
            nameEn: "Thiên Không Kiếm",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn Công cơ bản cao và Hiệu Quả Nạp tốt kèm hiệu ứng chân không nhỏ. Lựa chọn thay thế giúp tăng sát thương cá nhân và khả năng sạc.",
            passiveDescEn: "Tấn Công cơ bản cao và Hiệu Quả Nạp tốt kèm hiệu ứng chân không nhỏ. Lựa chọn thay thế giúp tăng sát thương cá nhân và khả năng sạc.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Dvalin.png"
        },
        {
            rank: 7,
            nameVi: "Thiết Phong Kích",
            nameEn: "Thiết Phong Kích",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí thuần Tinh Thông Nguyên Tố dễ chế tạo. Lựa chọn giá rẻ giúp tăng sát thương Khuếch Tán và khả năng buff cho đội.",
            passiveDescEn: "Vũ khí thuần Tinh Thông Nguyên Tố dễ chế tạo. Lựa chọn giá rẻ giúp tăng sát thương Khuếch Tán và khả năng buff cho đội.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Exotic.png"
        },
        {
            rank: 8,
            nameVi: "Toukabou Shigure",
            nameEn: "Toukabou Shigure",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: false,
            refinement: "R5",
            passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và tăng nhẹ sát thương sau khi đánh trúng kẻ địch. Vũ khí Event giới hạn thay thế tốt cho Thiết Phong Kích.",
            passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố và tăng nhẹ sát thương sau khi đánh trúng kẻ địch. Vũ khí Event giới hạn thay thế tốt cho Thiết Phong Kích.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Kasabouzu.png"
        },
        {
            rank: 9,
            nameVi: "Kiếm Phi Thiên",
            nameEn: "Kiếm Phi Thiên",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Tăng Tấn Công sau khi thi triển Nộ. Chỉ sử dụng khi không có lựa chọn nào khác; chỉ số cơ bản thấp khiến vũ khí này không tối ưu.",
            passiveDescEn: "Tăng Tấn Công sau khi thi triển Nộ. Chỉ sử dụng khi không có lựa chọn nào khác; chỉ số cơ bản thấp khiến vũ khí này không tối ưu.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Sword_Mitsurugi.png"
        }
    ],
    bestArtifacts: [
        {
            setNameVi: "Bóng Hình Màu Xanh",
            setNameEn: "Bóng Hình Màu Xanh",
            pieces: 4,
            sands: [
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Tinh Thông Nguyên Tố"
            ],
            circlet: [
                "Tinh Thông Nguyên Tố"
            ],
            subStatsPriority: [
                "Energy Recharge",
                "Elemental Mastery",
                "CRIT Rate"
            ]
        },
        {
            setNameVi: "Như Sấm Thịnh Nộ",
            setNameEn: "Như Sấm Thịnh Nộ",
            pieces: 4,
            sands: [
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Tinh Thông Nguyên Tố"
            ],
            circlet: [
                "Tinh Thông Nguyên Tố"
            ],
            subStatsPriority: [
                "Energy Recharge",
                "Elemental Mastery",
                "CRIT Rate"
            ]
        }
    ]
};
