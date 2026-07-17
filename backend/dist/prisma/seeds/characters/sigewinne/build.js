"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['HP%'],
    goblet: ['HP%'],
    circlet: ['HP%', 'Tỷ Lệ Bạo Kích', 'Tăng Trị Liệu'],
    subStatsPriority: ['HP%', 'HP', 'CRIT Rate'],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Màn Mưa Tơ Lòng',
            nameEn: 'Silvershower Heartstrings',
            subStat: 'HP%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Vũ khí trấn phái tốt nhất. Dòng phụ HP% tăng mạnh trị liệu và sát thương kỹ năng nộ.',
            passiveDescEn: 'Signature bow; HP% substat directly boosts healing and Burst stack generation.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Arcdange.webp'
        },
        {
            rank: 2,
            nameVi: 'Thanh Âm Lạnh Lẽo',
            nameEn: 'Sequence of Solitude',
            subStat: 'HP%',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp chỉ số HP% lớn từ dòng phụ, nội tại có cơ chế nổ sát thương diện rộng hữu ích.',
            passiveDescEn: 'High base ATK and Energy Recharge help Burst uptime, but HP% is preferred for healing.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Stinger.webp'
        },
        {
            rank: 3,
            nameVi: 'Cung Phản Khúc',
            nameEn: 'Recurve Bow',
            subStat: 'HP%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Lựa chọn 3 sao tốt nhất cho vai trò trị liệu thuần túy nhờ dòng phụ HP% cực cao.',
            passiveDescEn: '3-star with HP% substat; best F2P option for raw healing output.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Curve.webp'
        },
        {
            rank: 4,
            nameVi: 'Cung Tây Phong',
            nameEn: 'Favonius Warbow',
            subStat: 'Hiệu Quả Nạp',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp lớn và hạt nhân lượng cho đồng đội khi tạo bạo kích.',
            passiveDescEn: 'Provides team energy via particles; good if Burst uptime is a concern.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Zephyrus.webp'
        },
        {
            rank: 5,
            nameVi: 'Tiếng Thở Dài Vô Tận',
            nameEn: 'Elegy for the End',
            subStat: 'Hiệu Quả Nạp',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Cung cấp Hiệu Quả Nạp cao, hỗ trợ tăng Tinh Thông Nguyên Tố và Tấn Công% cho cả đội.',
            passiveDescEn: 'Boosts team Elemental Mastery and ATK% after Skill hits; supports reaction comps.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Widsith.webp'
        },
        {
            rank: 6,
            nameVi: 'Cung Tế Lễ',
            nameEn: 'Sacrificial Bow',
            subStat: 'Hiệu Quả Nạp',
            isF2P: false,
            refinement: 'R5',
            passiveDescVi: 'Có cơ hội làm mới hồi chiêu kỹ năng nguyên tố, giúp tăng tần suất kích hoạt trị liệu.',
            passiveDescEn: 'Resets Skill cooldown, allowing more Convalescence stacks and healing triggers.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Fossil.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Xà Cừ Đại Dương',
            setNameEn: 'Ocean-Hued Clam',
            pieces: 4
        },
        {
            setNameVi: 'Khúc Ca Ngày Cũ',
            setNameEn: 'Song of Days Past',
            pieces: 4
        },
        {
            setNameVi: 'Thiên Nham Vững Chắc',
            setNameEn: 'Tenacity of the Millelith',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc',
            setNameEn: '2-piece Mix (HP% / HP%)',
            pieces: 2
        },
        {
            setNameVi: 'Bức Tranh Dũng Sĩ Thành Tro Tàn',
            setNameEn: 'Scroll of the Hero of Cinder City',
            pieces: 4
        }
    ]
};
