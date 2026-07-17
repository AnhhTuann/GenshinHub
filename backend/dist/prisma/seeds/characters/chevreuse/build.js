"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['HP%', 'Hiệu Quả Nạp'],
    goblet: ['HP%'],
    circlet: ['HP%', 'Tăng Trị Liệu'],
    subStatsPriority: [
        'Hiệu Quả Nạp',
        'HP%',
        'Tỷ Lệ Bạo Kích',
        'HP',
        'Tinh Thông Nguyên Tố'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Vũ Khí Cán Dài Hỗ Trợ Mới',
            nameEn: 'New Support Polearm',
            subStat: 'HP%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí cán dài hỗ trợ tăng HP% hoặc hiệu ứng tăng sát thương cho cả đội.',
            passiveDescEn: 'Assuming a new support polearm, use for its HP% or team buffs.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Deshret.webp'
        },
        {
            rank: 2,
            nameVi: 'Thương Tây Phong',
            nameEn: 'Favonius Lance',
            subStat: 'Hiệu Quả Nạp',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Tạo hạt nhân lượng khi bạo kích, giúp giảm mạnh chỉ số nạp yêu cầu cho cả đội.',
            passiveDescEn: 'Generates energy particles on CRIT hits, lowering ER requirements for the team.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Zephyrus.webp'
        },
        {
            rank: 3,
            nameVi: 'Giáo Thập Tự Kitain',
            nameEn: 'Kitain Cross Spear',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Dòng phụ Tinh Thông Nguyên Tố ít hữu dụng hơn, nhưng nội tại hồi Năng Lượng rất tốt.',
            passiveDescEn: 'EM substat is less useful, but the passive provides decent energy regeneration.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Bakufu.webp'
        },
        {
            rank: 4,
            nameVi: 'Hắc Anh Thương',
            nameEn: 'Black Tassel',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn giá rẻ tăng HP% cực lớn để tối đa hóa buff Tấn Công và khả năng trị liệu.',
            passiveDescEn: 'Budget HP% stat stick. Maximizes HP for stronger ATK buffs and heals.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Ruby.webp'
        },
        {
            rank: 5,
            nameVi: 'Thù Lao Của Chính Nghĩa',
            nameEn: 'Rightful Reward',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp HP% và khả năng hồi năng lượng từ nội tại khi được trị liệu.',
            passiveDescEn: 'Provides HP% and energy regeneration when healed. Good for burst uptime.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Vorpal.webp'
        },
        {
            rank: 6,
            nameVi: 'Mẫu Tinh Liêm',
            nameEn: 'Prototype Starglitter',
            subStat: 'Hiệu Quả Nạp',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Dòng phụ Hiệu Quả Nạp giúp nạp Nộ nhanh hơn, nội tại tăng nhẹ sát thương sau E.',
            passiveDescEn: 'Energy Recharge substat helps burst uptime. Passive is not the main focus.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Proto.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ (HP% / Tăng Trị Liệu / Dấu Ấn)',
            setNameEn: '2-piece Mix (HP% / Healing Bonus / Emblem of Severed Fate)',
            pieces: 2
        },
        {
            setNameVi: 'Xà Cừ Đại Dương',
            setNameEn: 'Ocean-Hued Clam',
            pieces: 4
        },
        {
            setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            setNameEn: 'Scroll of the Hero of Cinder City',
            pieces: 4
        },
        {
            setNameVi: 'Khúc Ca Ngày Cũ',
            setNameEn: 'Song of Days Past',
            pieces: 4
        },
        {
            setNameVi: 'Nghi Thức Tông Thất Cổ',
            setNameEn: 'Noblesse Oblige',
            pieces: 4
        },
        {
            setNameVi: 'Thiếu Nữ Đáng Yêu',
            setNameEn: 'Maiden Beloved',
            pieces: 4
        }
    ]
};
