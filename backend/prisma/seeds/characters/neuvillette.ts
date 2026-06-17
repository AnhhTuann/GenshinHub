export const neuvillette = {
  characterId: "neuvillette",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  talentPriority: [
  "Normal Attack",
  "Burst",
  "Skill"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Neuvillette Electro-Charged Team #1",
        rank: "SS",
        description: "An Electro-Charged team combining Neuvillette's Hydro application and off-field Electro from Yae Miko and Raiden Shogun, with Kazuha providing grouping and buffs.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Buffs Burst DMG and triggers off-field Electro attacks.",
                weapons: [
                    "Dragon's Bane"
                ],
                artifacts: [
                    "4pc Flower of Paradise Lost"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "neuvillette",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Drives Electro-Charged reactions with Charged Attacks.",
                weapons: [
                    "Tome of the Eternal Flow",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "yae-miko",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Deals continuous off-field Electro damage with turrets.",
                weapons: [
                    "Kagura's Verity",
                    "The Widsith"
                ],
                artifacts: [
                    "2pc Thundering Fury + 2pc Gladiator's Finale"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
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
            }
        ]
    },
    {
        name: "Neuvillette Electro-Charged Team #2",
        rank: "SS",
        description: "An Electro-Charged team featuring Neuvillette as the main DPS, with Furina providing off-field Hydro, Kazuha grouping and buffs, and Kuki Shinobu triggering Electro-Charged reactions and healing.",
        members: [
            {
                characterId: "neuvillette",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Deals high Hydro damage and drives Electro-Charged.",
                weapons: [
                    "Tome of the Eternal Flow",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
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
                characterId: "kuki-shinobu",
                role: "Support",
                roleDesc: "Electro Support. Provides healing and triggers Electro-Charged reactions.",
                weapons: [
                    "Key of Khaj-Nisut",
                    "Iron Sting"
                ],
                artifacts: [
                    "4pc Ocean-Hued Clam"
                ],
                substats: [
                    "Elemental Mastery",
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Fleuve Cendre Ferryman"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Neuvillette Hyperbloom",
        rank: "SS",
        description: "A powerful Hyperbloom team leveraging Neuvillette's continuous Hydro application with Nahida's Dendro application to create Bloom cores, then triggering Hyperbloom with Raiden Shogun's Electro. Furina provides additional off-field Hydro application and party-wide DMG buffs.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Triggers Hyperbloom reactions with Elemental Skill.",
                weapons: [
                    "Dragon's Bane"
                ],
                artifacts: [
                    "4pc Flower of Paradise Lost"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Sacrificial Fragments"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "Elemental Mastery",
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Fleuve Cendre Ferryman"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "neuvillette",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Deals high continuous Hydro damage with Charged Attacks.",
                weapons: [
                    "Tome of the Eternal Flow",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Neuvillette Hypercarry Team #1",
        rank: "SS",
        description: "Neuvillette hypercarry team utilizing Bloom reactions from Hydro and Dendro applications. Hydro application from Neuvillette and Furina reacts with Dendro from Baizhu to create Bloom cores. Kazuha provides Elemental Mastery buff and Anemo resistance shred via Viridescent Venerer.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, shreds resistances, and buffs elemental DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
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
                characterId: "neuvillette",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Deals massive Hydro damage with Charged Attacks.",
                weapons: [
                    "Tome of the Eternal Flow",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "baizhu",
                role: "Support",
                roleDesc: "Dendro Support. Provides healing, shields, and buffs Bloom reaction damage.",
                weapons: [
                    "Jadefall's Splendor",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Ocean-Hued Clam"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge",
                    "CRIT DMG",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and party-wide DMG buffs.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Fleuve Cendre Ferryman"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Neuvillette Vaporize #1",
        rank: "SS",
        description: "A powerful Vaporize team centered around Neuvillette's charged attacks, with Xiangling providing off-field Pyro application, Kazuha offering crowd control and resistance shred, and Bennett healing and boosting ATK.",
        members: [
            {
                characterId: "neuvillette",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Deals high continuous Hydro damage and triggers Vaporize.",
                weapons: [
                    "Tome of the Eternal Flow",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Pyro Sub DPS. Deals high Pyro damage off-field with Pyronado.",
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
                roleDesc: "Anemo Support. Groups enemies, shreds Pyro and Hydro resistances, and buffs elemental DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
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
                roleDesc: "Pyro Support. Provides healing and massive ATK buff.",
                weapons: [
                    "Skyward Blade",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.",
        passiveDescEn: "Vũ khí trấn phái tốt nhất. Cung cấp chỉ số Sát Thương Bạo Kích cực cao, tăng HP% và gia tăng mạnh sát thương đòn Trọng Kích. Nội tại hoàn hảo cho cơ chế tăng giảm HP của Neuvillette.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png"
    },
    {
        rank: 2,
        nameVi: "Ngọc Quý Lưu Trong Biển Chết",
        nameEn: "Ngọc Quý Lưu Trong Biển Chết",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.",
        passiveDescEn: "Vũ khí từ Nhật Ký Hành Trình cực kỳ mạnh mẽ, cung cấp lượng lớn Tỷ Lệ Bạo Kích và tăng mạnh HP% khi ở trong hàng chờ, cực kỳ thích hợp cho Neuvillette.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png"
    },
    {
        rank: 3,
        nameVi: "Thời Khắc Lướt Sóng",
        nameEn: "Thời Khắc Lướt Sóng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.",
        passiveDescEn: "Pháp khí tăng chỉ số Sát Thương Bạo Kích lớn. Dù nội tại tập trung vào phản ứng Bốc Hơi của đòn đánh thường, vũ khí này vẫn là một 'stat stick' rất tốt cho Neuvillette.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png"
    },
    {
        rank: 4,
        nameVi: "Chân Ngôn Bí Hạp",
        nameEn: "Chân Ngôn Bí Hạp",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.",
        passiveDescEn: "Một vũ khí tăng chỉ số Sát Thương Bạo Kích khác. Cung cấp Tỷ Lệ Bạo Kích nhỏ và gia tăng chỉ số Tinh Thông Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png"
    },
    {
        rank: 5,
        nameVi: "Ngọc Bích Huy Hoàng",
        nameEn: "Ngọc Bích Huy Hoàng",
        subStat: "HP%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.",
        passiveDescEn: "Cung cấp HP% lớn và hồi năng lượng sau khi dùng Kỹ Năng Nộ. Giúp giảm bớt áp lực Hiệu Quả Nạp cho Neuvillette và tăng sát thương dựa trên HP.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Morax.png"
    },
    {
        rank: 6,
        nameVi: "Mẫu Kim Phách",
        nameEn: "Mẫu Kim Phách",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.",
        passiveDescEn: "Lựa chọn rèn F2P hoàn hảo nhất. Tăng rất nhiều HP% và hỗ trợ hồi năng lượng cũng như hồi một lượng máu nhỏ cho toàn đội sau khi thi triển Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Proto.png"
    },
    {
        rank: 7,
        nameVi: "Quản Đốc Vàng Ròng",
        nameEn: "Quản Đốc Vàng Ròng",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.",
        passiveDescEn: "Chỉ số chính Tăng Tấn Công không quá hữu ích, nhưng dòng phụ Tỷ Lệ Bạo Kích cao và nội tại tăng sát thương Trọng Kích khi HP thay đổi vẫn rất ổn.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png"
    },
    {
        rank: 8,
        nameVi: "Chương Nhạc Lang Thang",
        nameEn: "Chương Nhạc Lang Thang",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.",
        passiveDescEn: "Cung cấp Sát Thương Bạo Kích lớn. Các hiệu ứng buff Tinh Thông Nguyên Tố hoặc Sát Thương Nguyên Tố rất tốt, nhưng buff Tấn Công% sẽ bị lãng phí.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png"
    },
    {
        rank: 9,
        nameVi: "Chân Ý Của Kagura",
        nameEn: "Chân Ý Của Kagura",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.",
        passiveDescEn: "Đóng vai trò làm vũ khí tăng chỉ số Sát Thương Bạo Kích. Nội tại tăng sát thương Kỹ Năng Nguyên Tố nhưng Neuvillette không tận dụng được tối đa.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png"
    },
    {
        rank: 10,
        nameVi: "Điển Tích Tây Phong",
        nameEn: "Điển Tích Tây Phong",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích cao và tăng tốc độ di chuyển. Tăng dần Sát Thương Nguyên Tố khi đứng sân lâu, phù hợp với thời gian đứng sân của Neuvillette.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png"
    },
    {
        rank: 11,
        nameVi: "Sừng Rượu Vân Xanh",
        nameEn: "Sừng Rượu Vân Xanh",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.",
        passiveDescEn: "Vũ khí sự kiện F2P cung cấp HP%. Chỉ nên sử dụng nếu bạn hoàn toàn không có Mẫu Kim Phách hoặc các pháp khí tăng chỉ số khác.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_ConchSprayer.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Giấc Mộng Thủy Tiên",
        setNameEn: "Giấc Mộng Thủy Tiên",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    },
    {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục",
        setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    },
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Thủy / HP / Thợ Săn",
        setNameEn: "Mix 2 bộ Thủy / HP / Thợ Săn",
        pieces: 2,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    },
    {
        setNameVi: "Trái Tim Trầm Luân",
        setNameEn: "Trái Tim Trầm Luân",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    },
    {
        setNameVi: "Sao Băng Bay Ngược",
        setNameEn: "Sao Băng Bay Ngược",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Thủy",
            "HP%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "HP%"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "HP%",
            "HP"
        ]
    }
]
};
