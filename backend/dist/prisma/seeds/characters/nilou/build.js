"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['HP%'],
    goblet: ['HP%'],
    circlet: ['HP%'],
    subStatsPriority: ['HP%', 'HP', 'Elemental Mastery', 'Energy Recharge'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Chìa Khóa Khaj-Nisut',
            nameEn: 'Key of Khaj-Nisut',
            subStat: 'HP%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí trấn phái. Tăng lượng lớn HP% và chuyển đổi giới hạn HP thành Tinh Thông Nguyên Tố cho đồng đội.',
            passiveDescEn: 'Signature sword; provides massive HP% boost and converts max HP to team Elemental Mastery.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Deshret.webp'
        },
        {
            rank: 2,
            nameVi: 'Ánh Trăng Xiphos',
            nameEn: "Xiphos' Moonlight",
            subStat: 'Tinh Thông Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Dòng phụ Tinh Thông Nguyên Tố; nội tại chuyển đổi Tinh Thông thành Hiệu Quả Nạp cho bản thân và cả đội.',
            passiveDescEn: 'Elemental Mastery substat; passive converts EM to Energy Recharge for the equipping character and team.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Pleroma.webp'
        },
        {
            rank: 3,
            nameVi: 'Kiếm Bến Tàu',
            nameEn: "The Dockhand's Assistant",
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Vũ khí 4 sao tăng HP% giúp tối ưu hóa lượng máu tối đa cho Nilou.',
            passiveDescEn: "4-star sword providing HP% substat to help maximize Nilou's HP.",
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Mechanic.webp'
        },
        {
            rank: 4,
            nameVi: 'Tây Phong Kiếm',
            nameEn: 'Favonius Sword',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp cao giúp đáp ứng nhu cầu năng lượng và sinh hạt khi bạo kích.',
            passiveDescEn: 'High Energy Recharge helps meet Burst cost, and passive generates particles on CRIT.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Zephyrus.webp'
        },
        {
            rank: 5,
            nameVi: 'Kiếm Tế Lễ',
            nameEn: 'Sacrificial Sword',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cho phép làm mới hồi chiêu kỹ năng nguyên tố, hữu ích để thực hiện vũ điệu hai lần.',
            passiveDescEn: 'Allows resetting Skill cooldown, useful to double trigger her dance steps.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Fossil.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc',
            setNameEn: 'Mix 2 bộ Nghi Thức Tông Thất Cổ & 2 bộ Thiên Nham Vững Chắc',
            pieces: 2
        },
        {
            setNameVi: 'Thiên Nham Vững Chắc',
            setNameEn: 'Tenacity of the Millelith',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc',
            setNameEn: 'Mix 2 bộ Trái Tim Trầm Luân & 2 bộ Thiên Nham Vững Chắc',
            pieces: 2
        },
        {
            setNameVi: 'Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc',
            setNameEn: 'Mix 2 bộ Giấc Mộng Hoàng Kim & 2 bộ Thiên Nham Vững Chắc',
            pieces: 2
        },
        {
            setNameVi: 'Ký Ức Rừng Sâu',
            setNameEn: 'Deepwood Memories',
            pieces: 4
        }
    ]
};
