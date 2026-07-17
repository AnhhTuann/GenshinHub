"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
exports.build = {
    talentPriority: ['Skill', 'Burst', 'Normal Attack'],
    signatureWeapons: [],
    sands: ['Tấn Công%'],
    goblet: ['Sát Thương Nguyên Tố Thủy'],
    circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
    subStatsPriority: [
        'Tỷ Lệ Bạo Kích',
        'Sát Thương Bạo Kích',
        'Tấn Công%',
        'Hiệu Quả Nạp Nguyên Tố',
        'HP%',
        'Tinh Thông Nguyên Tố'
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: 'Haran Geppaku Futsu',
            nameEn: 'Haran Geppaku Futsu',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng tỷ lệ bạo kích và sát thương nguyên tố sau khi dùng kỹ năng nguyên tố.',
            passiveDescEn: 'Provides CRIT Rate and Elemental DMG Bonus; boosts Normal Attack DMG after teammates use Skills.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Amenoma.webp'
        },
        {
            rank: 2,
            nameVi: 'Bàn Nham Kết Lục',
            nameEn: 'Primordial Jade Cutter',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng HP và nhận buff tấn công dựa trên HP tối đa.',
            passiveDescEn: 'Increases HP; provides ATK bonus based on Max HP.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Morax.webp'
        },
        {
            rank: 3,
            nameVi: 'Ánh Sáng Sương Mù Rực Rỡ',
            nameEn: 'Mistsplitter Reforged',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng sát thương nguyên tố và cung cấp Sát Thương Bạo Kích.',
            passiveDescEn: 'Provides Elemental DMG Bonus and CRIT DMG. Maintain stacks with Normal Attack.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Narukami.webp'
        },
        {
            rank: 4,
            nameVi: 'Ánh Lá Phán Quyết',
            nameEn: 'Light of Foliar Incision',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng tỷ lệ bạo kích; tăng sát thương đánh thường và kỹ năng dựa trên Tinh Thông Nguyên Tố.',
            passiveDescEn: 'Increases CRIT Rate; boosts Normal Attack and Elemental Skill DMG based on EM.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Ayus.webp'
        },
        {
            rank: 5,
            nameVi: 'Thiên Không Kiếm',
            nameEn: 'Skyward Blade',
            subStat: 'Hiệu Quả Nạp Nguyên Tố',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng tỷ lệ bạo kích, tốc độ di chuyển và tốc độ tấn công sau khi dùng Nộ.',
            passiveDescEn: 'Increases CRIT Rate, Movement SPD, and Attack SPD after using Elemental Burst.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Zephyrus.webp'
        },
        {
            rank: 6,
            nameVi: 'Sắc Nước Lộng Lẫy',
            nameEn: 'Splendor of Tranquil Waters',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng sát thương kỹ năng nguyên tố khi HP thay đổi.',
            passiveDescEn: "Boosts Elemental Skill DMG when HP changes; boosts Max HP when teammate's HP changes.",
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Regalis.webp'
        },
        {
            rank: 7,
            nameVi: 'Mảnh Trăng Kính Sáng',
            nameEn: 'Lightbearing Moonshard',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng sát thương nguyên tố khi kích hoạt kết tinh.',
            passiveDescEn: 'Increases Elemental DMG Bonus after triggering Crystallize reaction.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Zibai.webp'
        },
        {
            rank: 8,
            nameVi: 'Kiếm Chước Phong',
            nameEn: 'Summit Shaper',
            subStat: 'Tấn Công%',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng tấn công và hiệu quả khiên.',
            passiveDescEn: 'Increases ATK and shield strength; ATK bonus is doubled when protected by a shield.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Kunwu.webp'
        },
        {
            rank: 9,
            nameVi: 'Đoản Khúc Hải Uyên',
            nameEn: 'Finale of the Deep',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng tấn công khi dùng kỹ năng và kích hoạt Khế Ước Sinh Mệnh.',
            passiveDescEn: 'Increases ATK when using Elemental Skill; clears Bond of Life to grant additional ATK.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Vorpal.webp'
        },
        {
            rank: 10,
            nameVi: 'Kiếm Đen',
            nameEn: 'The Black Sword',
            subStat: 'Tỷ Lệ Bạo Kích',
            isF2P: false,
            refinement: 'R1',
            passiveDescVi: 'Tăng sát thương đánh thường và trọng kích, hồi máu khi bạo kích.',
            passiveDescEn: 'Increases Normal and Charged Attack DMG; restores HP on CRIT hit.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Bloodstained.webp'
        },
        {
            rank: 11,
            nameVi: 'Kagotsurube Isshin',
            nameEn: 'Kagotsurube Isshin',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R1',
            passiveDescVi: 'Gây sát thương diện rộng và tăng tấn công sau khi đánh thường/trọng kích trúng kẻ địch.',
            passiveDescEn: 'Triggers AoE DMG and increases ATK when Normal, Charged, or Plunging Attacks hit.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Youtou.webp'
        },
        {
            rank: 12,
            nameVi: 'Tiếng Hét Của Rồng',
            nameEn: "Lion's Roar",
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng sát thương gây ra cho kẻ địch bị ảnh hưởng bởi Hỏa hoặc Lôi.',
            passiveDescEn: 'Increases DMG against enemies affected by Pyro or Electro.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Rockkiller.webp'
        },
        {
            rank: 13,
            nameVi: 'Thần Kiếm Lê Minh',
            nameEn: 'Harbinger of Dawn',
            subStat: 'Sát Thương Bạo Kích',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tăng mạnh tỷ lệ bạo kích khi HP trên 90%.',
            passiveDescEn: 'Increases CRIT Rate when HP is above 90%.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Dawn.webp'
        },
        {
            rank: 14,
            nameVi: 'Kiếm Sáo',
            nameEn: 'The Flute',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Tích lũy âm thanh khi đánh thường/trọng kích để gây sát thương diện rộng.',
            passiveDescEn: 'Normal and Charged Attacks grant Harmonics; triggers AoE DMG on 5 stacks.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Troupe.webp'
        },
        {
            rank: 15,
            nameVi: 'Kiếm Narzissenkreuz',
            nameEn: 'Sword of Narzissenkreuz',
            subStat: 'Tấn Công%',
            isF2P: true,
            refinement: 'R5',
            passiveDescVi: 'Giải phóng năng lượng Pneuma hoặc Ousia khi đánh trúng kẻ địch.',
            passiveDescEn: 'Releases a Pneuma or Ousia energy blast when Normal, Charged, or Plunging Attacks hit.',
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Psalmus.webp'
        }
    ],
    bestArtifacts: [
        {
            setNameVi: 'Thợ Săn Marechaussee',
            setNameEn: 'Thợ Săn Marechaussee',
            pieces: 4
        },
        { setNameVi: 'Dư Âm Tế Lễ', setNameEn: 'Dư Âm Tế Lễ', pieces: 4 },
        {
            setNameVi: 'Như Sấm Thịnh Nộ',
            setNameEn: 'Như Sấm Thịnh Nộ',
            pieces: 4
        },
        {
            setNameVi: 'Giấc Mộng Thủy Tiên',
            setNameEn: 'Giấc Mộng Thủy Tiên',
            pieces: 4
        },
        {
            setNameVi: 'Mix 2 bộ Thủy & 2 bộ Tấn Công',
            setNameEn: 'Mix 2 bộ Thủy & 2 bộ Tấn Công',
            pieces: 2
        },
        {
            setNameVi: 'Trái Tim Trầm Luân',
            setNameEn: 'Trái Tim Trầm Luân',
            pieces: 4
        },
        {
            setNameVi: 'Dũng Sĩ Trong Băng Giá',
            setNameEn: 'Dũng Sĩ Trong Băng Giá',
            pieces: 4
        },
        {
            setNameVi: 'Lễ Bế Mạc Của Giác Đấu Sĩ',
            setNameEn: 'Lễ Bế Mạc Của Giác Đấu Sĩ',
            pieces: 4
        }
    ]
};
