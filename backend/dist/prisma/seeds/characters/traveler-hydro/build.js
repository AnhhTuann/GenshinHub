"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Hiệu Quả Nạp', 'Tấn Công%'],
    goblet: ['Sát Thương Nguyên Tố Thủy'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích', 'Tăng Trị Liệu'],
    subStatsPriority: ['Energy Recharge', 'CRIT Rate', 'CRIT DMG', 'ATK%'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Tây Phong Kiếm',
            nameEn: 'Favonius Sword',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Hiệu quả nạp cao và nội tại sinh hạt năng lượng khi bạo kích giúp đáp ứng nhu cầu nạp của đội.',
            passiveDescEn: 'High Energy Recharge and passive generates Energy particles on CRIT, covering team needs.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Zephyrus.webp'
        },
        {
            rank: 2,
            nameVi: 'Ống Đồng Cát Tàn',
            nameEn: 'Fleuve Cendre Ferryman',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng Hiệu Quả Nạp và Tỷ Lệ Bạo Kích của Kỹ Năng Nguyên Tố, cải thiện khả năng nạp.',
            passiveDescEn: 'Boost Energy Recharge and Skill CRIT Rate, improving energy generation.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Dirty.webp'
        },
        {
            rank: 3,
            nameVi: 'Thiên Không Kiêu Hùng',
            nameEn: 'Skyward Blade',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp và tăng Tỷ Lệ Bạo Kích, cùng với hiệu ứng lưỡi dao chân không.',
            passiveDescEn: 'Provides Energy Recharge and bonus CRIT Rate, plus occasional vacuum blades.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Dvalin.webp'
        },
        {
            rank: 4,
            nameVi: 'Lời Thề Tự Do Cổ Xưa',
            nameEn: 'Freedom-Sworn',
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng Tấn Công và sát thương tấn công thường cho cả đội sau khi kích hoạt phản ứng.',
            passiveDescEn: 'Boosts party ATK and Normal Attack damage after triggering reactions, ideal for reaction teams.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Widsith.webp'
        },
        {
            rank: 5,
            nameVi: 'Kiếm Tế Lễ',
            nameEn: 'Sacrificial Sword',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Hiệu quả nạp cao với cơ hội làm mới hồi chiêu kỹ năng, giảm thiểu sự không ổn định khi sinh hạt.',
            passiveDescEn: 'High Energy Recharge with a chance to reset Skill cooldown, mitigating particle generation unreliability.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Fossil.webp'
        },
        {
            rank: 6,
            nameVi: 'Đoản Đao Amenoma',
            nameEn: 'Amenoma Kageuchi',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tích lũy năng lượng qua các lần dùng kỹ năng nguyên tố liên tiếp, giảm bớt yêu cầu năng lượng của chiêu nộ.',
            passiveDescEn: 'Generates Energy from successive Skill uses, easing Burst requirements.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Bakufu.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Thiên Nham Vững Chắc',
            setNameEn: 'Tenacity of the Millelith',
            pieces: 4
        },
        {
            setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            setNameEn: 'Scroll of the Hero of Cinder City',
            pieces: 4
        },
        { setNameVi: 'Giáo Quan', setNameEn: 'Instructor', pieces: 4 },
        {
            setNameVi: 'Nghi Thức Tông Thất Cổ',
            setNameEn: 'Noblesse Oblige',
            pieces: 4
        }
    ]
};
