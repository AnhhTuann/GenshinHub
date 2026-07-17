"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Hiệu Quả Nạp', 'Tinh Thông Nguyên Tố'],
    goblet: ['Tinh Thông Nguyên Tố'],
    circlet: ['Tinh Thông Nguyên Tố'],
    subStatsPriority: [
        'Hiệu Quả Nạp',
        'Tinh Thông Nguyên Tố',
        'HP%',
        'HP',
        'Tỷ Lệ Bạo Kích'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Giáo Thập Tự Kitain',
            nameEn: 'Giáo Thập Tự Kitain',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Provides Elemental Mastery and refunds energy after using Skill, helping sustain Burst uptime.',
            passiveDescEn: 'Provides Elemental Mastery and refunds energy after using Skill, helping sustain Burst uptime.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Bakufu.webp'
        },
        {
            rank: 2,
            nameVi: 'Thương Tây Phong',
            nameEn: 'Thương Tây Phong',
            subStat: 'Hiệu Quả Nạp',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Generates energy particles for the team on CRIT, ensuring consistent Burst availability.',
            passiveDescEn: 'Generates energy particles for the team on CRIT, ensuring consistent Burst availability.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Zephyrus.webp'
        },
        {
            rank: 3,
            nameVi: 'Tai Ương Của Rồng',
            nameEn: 'Tai Ương Của Rồng',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'High Elemental Mastery substat and passive boosts damage against enemies affected by Hydro or Pyro.',
            passiveDescEn: 'High Elemental Mastery substat and passive boosts damage against enemies affected by Hydro or Pyro.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Stardust.webp'
        },
        {
            rank: 4,
            nameVi: 'Quán Nguyệt Thương',
            nameEn: 'Quán Nguyệt Thương',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Offers Elemental Mastery and creates a leaf that boosts ATK for the team, useful for driving reactions.',
            passiveDescEn: 'Offers Elemental Mastery and creates a leaf that boosts ATK for the team, useful for driving reactions.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Arakalari.webp'
        },
        {
            rank: 5,
            nameVi: 'Hắc Anh Thương',
            nameEn: 'Hắc Anh Thương',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Budget option providing HP% for stronger shields, but offers no Elemental Mastery or energy.',
            passiveDescEn: 'Budget option providing HP% for stronger shields, but offers no Elemental Mastery or energy.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Noire.webp'
        },
        {
            rank: 6,
            nameVi: 'Thù Lao Của Chính Nghĩa',
            nameEn: 'Thù Lao Của Chính Nghĩa',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'F2P spear with HP% and energy regeneration when using Skill, aiding Burst uptime.',
            passiveDescEn: 'F2P spear with HP% and energy regeneration when using Skill, aiding Burst uptime.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Vorpal.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Diệm Liệt Ma Nữ Cháy Rực',
            setNameEn: 'Diệm Liệt Ma Nữ Cháy Rực',
            pieces: 4
        },
        {
            setNameVi: 'Đóa Hoa Trang Viên Thất Lạc',
            setNameEn: 'Đóa Hoa Trang Viên Thất Lạc',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Tinh Thông / Dấu Ấn',
            setNameEn: 'Mix 2 bộ Tinh Thông / Dấu Ấn',
            pieces: 2
        },
        {
            setNameVi: 'Giấc Mộng Hoàng Kim',
            setNameEn: 'Giấc Mộng Hoàng Kim',
            pieces: 4
        }
    ]
};
