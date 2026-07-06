"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dehya = void 0;
exports.dehya = {
    characterId: "dehya",
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
    teams: [
        {
            name: "Dehya Melting Team #1",
            rank: "S",
            description: "Dehya provides off-field Pyro to enable Burning for stable Melt. Nahida applies Dendro and boosts Melt damage, while Bennett heals and buffs ATK. Maximize Ganyu's Melt damage by using Dehya's coordinated Pyro attacks and Nahida's Dendro application to trigger Burning, providing consistent Pyro aura.",
            members: [
                {
                    characterId: "ganyu",
                    role: "Main DPS",
                    roleDesc: "Deals DMG by Elemental Burst and Charged Attack, triggering Melt with Pyro from Dehya.",
                    weapons: [
                        "Hunter's Path",
                        "Hamayumi"
                    ],
                    artifacts: [
                        "4pc Wanderer's Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "dehya",
                    role: "Support",
                    roleDesc: "Elemental Skill creates a field that unleashes coordinated Pyro attacks.",
                    weapons: [
                        "Favonius Greatsword"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                },
                {
                    characterId: "nahida",
                    role: "Support",
                    roleDesc: "Elemental Skill connects up to 8 enemies, dealing Dendro DMG and triggering reactions. Elemental Burst provides stable EM based on teammates' elements. Burning provides stable Pyro source.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Solar Pearl"
                    ],
                    artifacts: [
                        "4pc Gilded Dreams"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Elemental Burst provides huge ATK buff and healing.",
                    weapons: [
                        "Aquila Favonia",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Dehya Melt Team #2",
            rank: "S",
            description: "Ganyu's DMG is maximized by triggering Melt with Pyro from Dehya. Kazuha groups enemies and provides DMG buff, and Bennett provides ATK buff and healing. Ganyu triggers Melt with Pyro from Dehya's coordinated attacks, while Kazuha groups enemies and provides DMG buff, and Bennett boosts ATK and heals.",
            members: [
                {
                    characterId: "ganyu",
                    role: "Main DPS",
                    roleDesc: "Deals DMG via Burst and Charged Attack. Her attacks trigger Melt with Pyro from Dehya.",
                    weapons: [
                        "Hunter's Path",
                        "Hamayumi"
                    ],
                    artifacts: [
                        "4pc Wanderer's Troupe"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "dehya",
                    role: "Sub DPS",
                    roleDesc: "Skill creates a field that unleashes coordinated Pyro damage when allies attack, enabling Melt for Ganyu.",
                    weapons: [
                        "Favonius Greatsword"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "Energy Recharge",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Groups enemies, provides DMG buff, and reduces elemental resistance with Swirl.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Burst provides a large ATK buff and healing to teammates.",
                    weapons: [
                        "Aquila Favonia",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Dehya Melt Team #3",
            rank: "S",
            description: "Ayaka's high Elemental Burst damage is maximized by triggering Melt with Pyro from Dehya. Kazuha groups and buffs, while Bennett provides ATK buff and healing. Ayaka's high Burst damage is maximized by triggering Melt with Pyro applied by Dehya's coordinated attacks.",
            members: [
                {
                    characterId: "ayaka",
                    role: "Main DPS",
                    roleDesc: "Ayaka's Elemental Burst deals high Cryo DMG which is maximized by Melting.",
                    weapons: [
                        "Mistsplitter Reforged",
                        "Amenoma Kageuchi"
                    ],
                    artifacts: [
                        "2pc Noblesse Oblige",
                        "2pc Blizzard Strayer"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "dehya",
                    role: "Sub DPS",
                    roleDesc: "Dehya's Elemental Skill creates a field that triggers coordinated attacks, providing Pyro for Melting.",
                    weapons: [
                        "Favonius Greatsword"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Groups enemies, applies swirled elements, provides DMG buff and reduces resistances.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Elemental Burst provides huge ATK buff and healing.",
                    weapons: [
                        "Aquila Favonia",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Dehya Pure Pyro Team #1",
            rank: "S",
            description: "A mono-pyro team that focuses on maximizing Dehya's Elemental Burst damage with the support of Kazuha and Bennett. Maximize Dehya's Elemental Burst damage with Kazuha's Pyro DMG buff and resistance shred, and Bennett's ATK buff and healing.",
            members: [
                {
                    characterId: "dehya",
                    role: "Main DPS",
                    roleDesc: "Dehya mainly deals DMG by her Elemental Burst. Her DMG is maximized by Kazuha and Bennett.",
                    weapons: [
                        "Beacon of the Reed Sea"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "xiangling",
                    role: "Sub DPS",
                    roleDesc: "Xiangling's Elemental Burst provides huge amount of DMG off-field.",
                    weapons: [
                        "Engulfing Lightning",
                        "The Catch"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha assists the team by grouping enemies, applying crowd control, providing DMG buff, and reducing Pyro resistance of enemies.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett's Elemental Burst provides huge ATK buff and healing to other members.",
                    weapons: [
                        "Aquila Favonia",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Dehya Pure Pyro Team #2",
            rank: "S",
            description: "A team focused on maximizing Dehya's Elemental Burst damage with support from Kazuha, Mona, and Bennett. Maximize Dehya's Elemental Burst damage using Kazuha's DMG buff and resistance shred, Mona's Omen and DMG increase, and Bennett's ATK buff.",
            members: [
                {
                    characterId: "dehya",
                    role: "Main DPS",
                    roleDesc: "Dehya deals DMG via her Elemental Burst. Her damage is amplified by Kazuha and Bennett.",
                    weapons: [
                        "Beacon of the Reed Sea"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "mona",
                    role: "Support",
                    roleDesc: "Mona's Elemental Burst increases team DMG and provides Elemental Mastery and ATK% for Dehya.",
                    weapons: [
                        "Thrilling Tales of Dragon Slayers"
                    ],
                    artifacts: [
                        "4pc Instructor"
                    ],
                    substats: [
                        "Energy Recharge",
                        "CRIT Rate",
                        "CRIT DMG"
                    ]
                },
                {
                    characterId: "kazuha",
                    role: "Support",
                    roleDesc: "Kazuha groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Viridescent Venerer"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "bennett",
                    role: "Support",
                    roleDesc: "Bennett's Elemental Burst provides a huge ATK buff and healing to the team.",
                    weapons: [
                        "Aquila Favonia",
                        "Favonius Sword"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        },
        {
            name: "Dehya Burgeon Team",
            rank: "A",
            description: "A Burgeon team where Dehya triggers cores with her Skill. Nahida applies Dendro, Xingqiu applies Hydro, and Kuki Shinobu provides healing and triggers Hyperbloom/Burgeon. Dehya triggers Burgeon using her Skill on Bloom cores created by Nahida and Xingqiu. Kuki Shinobu provides healing and triggers Hyperbloom.",
            members: [
                {
                    characterId: "nahida",
                    role: "Main DPS",
                    roleDesc: "Mainly deals DMG via Skill connecting up to 8 enemies, and dealing Dendro DMG while triggering reactions. Her Burst buffs her skill based on teammates' elements.",
                    weapons: [
                        "A Thousand Floating Dreams",
                        "Solar Pearl"
                    ],
                    artifacts: [
                        "4pc Deepwood Memories"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "dehya",
                    role: "Support",
                    roleDesc: "Triggers Burgeon by using Skill to activate cores. Also mitigates damage for teammates.",
                    weapons: [
                        "Rainslasher"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "HP%",
                        "Elemental Mastery"
                    ]
                },
                {
                    characterId: "xingqiu",
                    role: "Sub DPS",
                    roleDesc: "His Burst continuously applies Hydro to enemies, reacting with Dendro from Nahida to produce Bloom cores.",
                    weapons: [
                        "Sapwood Blade"
                    ],
                    artifacts: [
                        "4pc Noblesse Oblige"
                    ],
                    substats: [
                        "Energy Recharge",
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%"
                    ]
                },
                {
                    characterId: "shinobu",
                    role: "Support",
                    roleDesc: "Provides healing and triggers Hyperbloom by using Skill on Dendro Cores. Maximizing Elemental Mastery increases Hyperbloom DMG.",
                    weapons: [
                        "Freedom-Sworn",
                        "Iron Sting"
                    ],
                    artifacts: [
                        "4pc Gilded Dreams"
                    ],
                    substats: [
                        "Elemental Mastery",
                        "HP%",
                        "HP",
                        "Energy Recharge"
                    ]
                }
            ]
        },
        {
            name: "Dehya Vaporization Team #2",
            rank: "S",
            description: "A team that leverages Burning to enable Vaporize reactions, with two off-field Pyro supports boosting Mualani's damage. Use Burning (from Dendro/Emilie and Pyro supports) to set up constant Pyro aura for Mualani's Hydro attacks to trigger Vaporize, dealing massive damage.",
            members: [
                {
                    characterId: "mualani",
                    role: "Main DPS",
                    roleDesc: "Uses Skill to enter Nightmind's Blessing, enhancing Normal Attacks to 'Shark Bite'. Gains 'Wave Momentum' on contact, firing 'Shark Missiles' at 3 stacks.",
                    weapons: [
                        "Surf's Up",
                        "Sacrificial Jade"
                    ],
                    artifacts: [
                        "4pc Obsidian Codex"
                    ],
                    substats: [
                        "HP%",
                        "CRIT DMG",
                        "CRIT Rate",
                        "Elemental Mastery",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "emilie",
                    role: "Sub DPS",
                    roleDesc: "Summons 'Lumidouce Case' for intermittent Dendro damage. Burning state generates 'Scents' increasing range and damage. Burst further boosts scent damage.",
                    weapons: [
                        "Lumidouce Elegy",
                        "Deathmatch"
                    ],
                    artifacts: [
                        "4pc Unfinished Reverie"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "ATK%",
                        "Energy Recharge"
                    ]
                },
                {
                    characterId: "xiangling",
                    role: "Sub DPS",
                    roleDesc: "Off-field Burst provides massive Pyro damage and consistent Pyro application.",
                    weapons: [
                        "Engulfing Lightning",
                        "Favonius Lance"
                    ],
                    artifacts: [
                        "4pc Emblem of Severed Fate"
                    ],
                    substats: [
                        "CRIT DMG",
                        "CRIT Rate",
                        "Energy Recharge",
                        "ATK%"
                    ]
                },
                {
                    characterId: "dehya",
                    role: "Support",
                    roleDesc: "Creates a field via Skill that unleashes coordinated AoE Pyro attacks when enemies take damage.",
                    weapons: [
                        "Favonius Greatsword"
                    ],
                    artifacts: [
                        "4pc Tenacity of the Millelith"
                    ],
                    substats: [
                        "Energy Recharge",
                        "HP%"
                    ]
                }
            ]
        }
    ],
    bestWeapons: [
        {
            rank: 1,
            nameVi: "Hải Đăng Bờ Biển Lau",
            nameEn: "Hải Đăng Bờ Biển Lau",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.",
            passiveDescEn: "Tấn công căn bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công% và HP% sau khi Kỹ Năng Nguyên Tố đánh trúng địch.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Deshret.png"
        },
        {
            rank: 2,
            nameVi: "Xích Giác Phá Thạch Đao",
            nameEn: "Xích Giác Phá Thạch Đao",
            subStat: "Sát Thương Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.",
            passiveDescEn: "Sát Thương Bạo Kích cao. Tuy chỉ số Phòng Ngự không quá hữu ích nhưng lượng ST bạo cao giúp bù đắp sát thương tốt.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Itadorimaru.png"
        },
        {
            rank: 3,
            nameVi: "Phán Quyết",
            nameEn: "Phán Quyết",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.",
            passiveDescEn: "Tấn công căn bản cao và Tỷ Lệ Bạo Kích tốt. Nội tại tăng sát thương Kỹ Năng Nguyên Tố sau phản ứng Kết Tinh.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png"
        },
        {
            rank: 4,
            nameVi: "Đường Cùng Của Sói",
            nameEn: "Đường Cùng Của Sói",
            subStat: "Tấn Công%",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.",
            passiveDescEn: "Cung cấp lượng Tấn Công cực lớn cho Dehya và tăng sát thương cho toàn đội khi đánh trúng kẻ địch thấp máu.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.png"
        },
        {
            rank: 5,
            nameVi: "Nanh Sơn Vương",
            nameEn: "Nanh Sơn Vương",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.",
            passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng sát thương đòn đánh sau khi trúng Kỹ Năng Nguyên Tố, rất phù hợp với lối chơi Burning.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.png"
        },
        {
            rank: 6,
            nameVi: "Kiếm Li Cốt",
            nameEn: "Kiếm Li Cốt",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.",
            passiveDescEn: "Tăng sát thương đầu ra đáng kể khi tích đủ tầng nội tại, tuy nhiên cần duy trì khiên bảo vệ để tránh mất tầng.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Kione.png"
        },
        {
            rank: 7,
            nameVi: "Đóa Hoa Tôn Màu Thép",
            nameEn: "Đóa Hoa Tôn Màu Thép",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.",
            passiveDescEn: "Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và Tấn Công% sau khi kích hoạt phản ứng nguyên tố, rất mạnh cho lối chơi Burgeon.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Fleurfair.png"
        },
        {
            rank: 8,
            nameVi: "Vũ Tài",
            nameEn: "Vũ Tài",
            subStat: "Tinh Thông Nguyên Tố",
            isF2P: false,
            refinement: "R5",
            passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.",
            passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố dồi dào và tăng mạnh sát thương lên kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Perdue.png"
        },
        {
            rank: 9,
            nameVi: "Bóng Tối Thủy Triều",
            nameEn: "Bóng Tối Thủy Triều",
            subStat: "Tấn Công%",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.",
            passiveDescEn: "Vũ khí rèn F2P tăng Tấn Công% đáng kể khi nhận trị liệu, dễ kích hoạt khi đi kèm Healer.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Vorpal.png"
        },
        {
            rank: 10,
            nameVi: "Bá Vương Tối Thượng Siêu Cấp Ma Kiếm",
            nameEn: "Bá Vương Tối Thượng Siêu Cấp Ma Kiếm",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: true,
            refinement: "R5",
            passiveDescVi: "Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.",
            passiveDescEn: "Vũ khí sự kiện F2P tuyệt vời cung cấp Hiệu Quả Nạp giúp giảm áp lực nạp nộ và tăng Tấn Công% dựa trên Melusine đã giúp đỡ.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Champion.png"
        },
        {
            rank: 11,
            nameVi: "Gậy Đàm Phán",
            nameEn: "Gậy Đàm Phán",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.",
            passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và tăng sát thương sau khi chịu ảnh hưởng của các trạng thái nguyên tố.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_BeastTamer.png"
        },
        {
            rank: 12,
            nameVi: "Kiếm Vô Công",
            nameEn: "Kiếm Vô Công",
            subStat: "Tấn Công%",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.",
            passiveDescEn: "Tấn Công% cao và gia tăng hiệu quả khiên, hoạt động tốt nhất khi đi kèm nhân vật tạo khiên.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Kunwu.png"
        },
        {
            rank: 13,
            nameVi: "Thiên Dương Rực Lửa",
            nameEn: "Thiên Dương Rực Lửa",
            subStat: "Tỷ Lệ Bạo Kích",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.",
            passiveDescEn: "Tỷ Lệ Bạo Kích tốt và tăng mạnh Tấn Công sau khi kích hoạt phản ứng Nguyên Tố Hỏa hoặc Thiêu Đốt.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_RadianceSword.png"
        },
        {
            rank: 14,
            nameVi: "Thiên Không Kiêu Ngạo",
            nameEn: "Thiên Không Kiêu Ngạo",
            subStat: "Hiệu Quả Nạp Nguyên Tố",
            isF2P: false,
            refinement: "R1",
            passiveDescVi: "Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.",
            passiveDescEn: "Cung cấp Hiệu Quả Nạp lớn giúp duy trì chu kỳ nộ nạp cho Dehya.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Dvalin.png"
        },
        {
            rank: 15,
            nameVi: "Akuoumaru",
            nameEn: "Akuoumaru",
            subStat: "Tấn Công%",
            isF2P: false,
            refinement: "R5",
            passiveDescVi: "Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.",
            passiveDescEn: "Tăng sát thương Kỹ Năng Nộ dựa trên tổng năng lượng nộ của cả đội, tối ưu hóa sát thương nổ của Dehya.",
            iconUrl: "/assets/weapons/UI_EquipIcon_Claymore_Maria.png"
        }
    ],
    bestArtifacts: [
        {
            setNameVi: "Dấu Ấn Ngăn Cách",
            setNameEn: "Dấu Ấn Ngăn Cách",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "Hiệu Quả Nạp",
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "Tấn Công%",
                "HP%",
                "Tinh Thông Nguyên Tố"
            ]
        },
        {
            setNameVi: "Vầng Sáng Vourukasha",
            setNameEn: "Vầng Sáng Vourukasha",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "Hiệu Quả Nạp",
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "Tấn Công%",
                "HP%",
                "Tinh Thông Nguyên Tố"
            ]
        },
        {
            setNameVi: "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công",
            setNameEn: "Mix 2 bộ Ma Nữ / Tông Thất / Tấn Công",
            pieces: 2,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "Hiệu Quả Nạp",
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "Tấn Công%",
                "HP%",
                "Tinh Thông Nguyên Tố"
            ]
        },
        {
            setNameVi: "Ảo Mộng Chưa Hoàn Thành",
            setNameEn: "Ảo Mộng Chưa Hoàn Thành",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "Hiệu Quả Nạp",
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "Tấn Công%",
                "HP%",
                "Tinh Thông Nguyên Tố"
            ]
        },
        {
            setNameVi: "Thợ Săn Marechaussee",
            setNameEn: "Thợ Săn Marechaussee",
            pieces: 4,
            sands: [
                "Tấn Công%",
                "Tinh Thông Nguyên Tố",
                "Hiệu Quả Nạp"
            ],
            goblet: [
                "Sát Thương Nguyên Tố Hỏa"
            ],
            circlet: [
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích"
            ],
            subStatsPriority: [
                "Hiệu Quả Nạp",
                "Tỷ Lệ Bạo Kích",
                "Sát Thương Bạo Kích",
                "Tấn Công%",
                "HP%",
                "Tinh Thông Nguyên Tố"
            ]
        }
    ]
};
