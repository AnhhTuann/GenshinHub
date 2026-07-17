"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Normal Attack', 'Elemental Skill', 'Elemental Burst'],
    signatureWeapons: ['Song of Broken Pines'],
    sands: ['ATK%'],
    goblet: ['Elemental DMG Bonus'],
    circlet: ['CRIT Rate'],
    subStatsPriority: ['CRIT Rate', 'CRIT DMG', 'ATK%'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Đại Kiếm Phi Thiên',
            nameEn: 'Skyrider Greatsword',
            subStat: null,
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Mitsurugi.webp'
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
            nameVi: 'Tiếng Gió Trong Rừng Thông',
            nameEn: 'Song of Broken Pines',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Widsith.webp'
        },
        {
            rank: 1,
            nameVi: 'Akuoumaru',
            nameEn: 'Akuoumaru',
            subStat: null,
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Maria.webp'
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
            nameVi: 'Thiên Nham Cổ Kiếm',
            nameEn: 'Lithic Blade',
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Lapis.webp'
        },
        {
            rank: 1,
            nameVi: 'Tuyết Vùi Tinh Ngân',
            nameEn: 'Snow-Tombed Starsilver',
            subStat: null,
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Dragonfell.webp'
        },
        {
            rank: 1,
            nameVi: 'Mẫu Cổ Hoa',
            nameEn: 'Prototype Archaic',
            subStat: null,
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Proto.webp'
        },
        {
            rank: 1,
            nameVi: 'Vua Biển Hàng Hiệu',
            nameEn: 'Luxurious Sea-Lord',
            subStat: null,
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_MillenniaTuna.webp'
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
            nameVi: 'Đường Cùng Của Sói',
            nameEn: "Wolf's Gravestone",
            subStat: null,
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp'
        },
        {
            rank: 1,
            nameVi: '"Bá Vương Tối Thượng Siêu Cấp Ma Kiếm"',
            nameEn: `"Ultimate Overlord's Mega Magic Sword"`,
            subStat: null,
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Champion.webp'
        },
        {
            rank: 1,
            nameVi: 'Bóng Tối Thủy Triều',
            nameEn: 'Tidal Shadow',
            subStat: null,
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: null,
            passiveDescEn: null,
            iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Vorpal.webp'
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
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Kỵ Sĩ Đạo Nhuốm Máu & 2 bộ Lửa Trắng Xám',
            setNameEn: 'Mix 2-Piece Bloodstained Chivalry & 2-Piece Pale Flame',
            pieces: 2
        },
        { setNameVi: 'Lửa Trắng Xám', setNameEn: 'Pale Flame', pieces: 4 },
        {
            setNameVi: 'Mix 2 bộ Lễ Bế Mạc Của Giác Đấu Sĩ & 2 bộ Lửa Trắng Xám',
            setNameEn: "Mix 2-Piece Gladiator's Finale & 2-Piece Pale Flame",
            pieces: 2
        },
        {
            setNameVi: 'Lễ Bế Mạc Của Giác Đấu Sĩ',
            setNameEn: "Gladiator's Finale",
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Kỵ Sĩ Đạo Nhuốm Máu & 2 bộ Lễ Bế Mạc Của Giác Đấu Sĩ',
            setNameEn: "Mix 2-Piece Bloodstained Chivalry & 2-Piece Gladiator's Finale",
            pieces: 2
        }
    ]
};
