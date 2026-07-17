"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Elemental Skill', 'Elemental Burst'],
    signatureWeapons: [],
    sands: ['ATK%', 'Energy Recharge', 'Elemental Mastery'],
    goblet: ['Cryo DMG Bonus'],
    circlet: ['CRIT Rate', 'CRIT DMG'],
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
            nameVi: 'Nanh Sơn Vương',
            nameEn: 'Fang of the Mountain King',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp'
        },
        {
            rank: 1,
            nameVi: 'Sắc Nước Makhaira',
            nameEn: 'Makhaira Aquamarine',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Pleroma.webp'
        },
        {
            rank: 1,
            nameVi: 'Hắc Nham Trảm Đao',
            nameEn: 'Blackcliff Slasher',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Blackrock.webp'
        },
        {
            rank: 1,
            nameVi: 'Đại Kiếm Tây Phong',
            nameEn: 'Favonius Greatsword',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Zephyrus.webp'
        },
        {
            rank: 1,
            nameVi: 'Thiên Không Kiêu Ngạo',
            nameEn: 'Skyward Pride',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dvalin.webp'
        },
        {
            rank: 1,
            nameVi: 'Thiên Dương Rực Lửa',
            nameEn: 'A Thousand Blazing Suns',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_RadianceSword.webp'
        },
        {
            rank: 1,
            nameVi: 'Phán Quyết',
            nameEn: 'Verdict',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_GoldenVerdict.webp'
        },
        {
            rank: 1,
            nameVi: 'Kiếm Li Cốt',
            nameEn: 'Serpent Spine',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kione.webp'
        },
        {
            rank: 1,
            nameVi: 'Kiếm Vô Công',
            nameEn: 'The Unforged',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Kunwu.webp'
        },
        {
            rank: 1,
            nameVi: 'Hải Đăng Bờ Biển Lau',
            nameEn: 'Beacon of the Reed Sea',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Deshret.webp'
        },
        {
            rank: 1,
            nameVi: 'Xích Giác Phá Thạch Đao',
            nameEn: 'Redhorn Stonethresher',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.webp'
        },
        {
            rank: 5,
            nameVi: 'Đóa Hoa Tôn Màu Thép',
            nameEn: 'Mailed Flower',
            subStat: null,
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Fleurfair.webp'
        },
        {
            rank: 5,
            nameVi: 'Vua Biển Hàng Hiệu',
            nameEn: 'Luxurious Sea-Lord',
            subStat: null,
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_MillenniaTuna.webp'
        },
        {
            rank: 5,
            nameVi: 'Akuoumaru',
            nameEn: 'Akuoumaru',
            subStat: null,
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Maria.webp'
        },
        {
            rank: 5,
            nameVi: 'Đại Kiếm Tế Lễ',
            nameEn: 'Sacrificial Greatsword',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Fossil.webp'
        },
        {
            rank: 5,
            nameVi: 'Bóng Tối Thủy Triều',
            nameEn: 'Tidal Shadow',
            subStat: null,
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Vorpal.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Dũng Sĩ Trong Băng Giá & 2 bộ Nghi Thức Tông Thất Cổ',
            setNameEn: 'Mix 2-Piece Blizzard Strayer & 2-Piece Noblesse Oblige',
            pieces: 2
        },
        {
            setNameVi: 'Dấu Ấn Ngăn Cách',
            setNameEn: 'Emblem of Severed Fate',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Dũng Sĩ Trong Băng Giá & 2 bộ Dòng Hồi Ức Bất Tận',
            setNameEn: "Mix 2-Piece Blizzard Strayer & 2-Piece Shimenawa's Reminiscence",
            pieces: 2
        },
        {
            setNameVi: 'Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Dòng Hồi Ức Bất Tận',
            setNameEn: "Mix 2-Piece Noblesse Oblige & 2-Piece Shimenawa's Reminiscence",
            pieces: 2
        },
        {
            setNameVi: 'Mix 2 bộ Dũng Sĩ Trong Băng Giá & 2 bộ Dấu Ấn Ngăn Cách',
            setNameEn: 'Mix 2-Piece Blizzard Strayer & 2-Piece Emblem of Severed Fate',
            pieces: 2
        }
    ]
};
