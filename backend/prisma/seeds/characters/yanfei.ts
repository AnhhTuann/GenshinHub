export const yanfei = {
  characterId: "yanfei",
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
  teams: [
    {
        name: "Yanfei Vaporize & Burgeon",
        rank: "S",
        description: "Yanfei drives Vaporize and Burgeon reactions with Yelan's off-field Hydro and Nahida's Dendro application, while Zhongli provides shielding and ATK buff.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main Pyro DPS driving Vaporize and Burgeon.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "yelan",
                role: "Sub DPS",
                roleDesc: "Applies Hydro off-field and increases on-field character's damage.",
                weapons: [
                    "Aqua Simulacra",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "HP%",
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Applies Dendro continuously and shares Elemental Mastery.",
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
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Provides a strong shield, shred resistance, and buffs ATK via Tenacity of the Millelith.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Yanfei Vaporize",
        rank: "S",
        description: "Yanfei's Pyro damage is amplified by Vaporize reactions enabled by Xingqiu's consistent off-field Hydro application, while Kazuha provides crowd control and Elemental DMG buffs, and Zhongli shields and buffs ATK.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main Pyro DPS triggering Vaporize on Hydro-affected enemies.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Crimson Witch of Flames"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Applies Hydro continuously with his Raincutter Burst.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
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
                roleDesc: "Groups enemies, decreases Pyro resistance, and buffs Elemental DMG.",
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
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Provides shield and buffs team ATK with Tenacity of the Millelith.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Yanfei Vaporize Team #2",
        rank: "A",
        description: "A team focuses on triggering Vaporize with Yanfei as the main DPS, supported by Xingqiu's Hydro application, Venti's crowd control, and Zhongli's shielding. Use Xingqiu's Burst to apply Hydro, then trigger Vaporize with Yanfei's charged attacks. Venti groups enemies and spreads Hydro/Pyro, while Zhongli shields and buffs ATK.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Triggers Vaporize with charged attacks.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Enables Vaporize with off-field Hydro attacks.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "venti",
                role: "Support",
                roleDesc: "Provides crowd control, groups enemies, and shreds elemental resistance.",
                weapons: [
                    "Elegy for the End",
                    "The Stringless"
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
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shields and buffs team ATK.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Yanfei Vaporize Team #3",
        rank: "A",
        description: "A Vaporize team centered on Yanfei's Pyro damage, supported by Xingqiu's Hydro application, and Geo resonance from Albedo and Zhongli. Yanfei's Pyro DMG is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Albedo and Zhongli provide Geo resonance and shield, while Albedo can boost DMG with Archaic Petra.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main Pyro DPS.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Off-field Hydro support.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "albedo",
                role: "Sub DPS",
                roleDesc: "Geo resonance and off-field DMG support.",
                weapons: [
                    "Cinnabar Spindle",
                    "Harbinger of Dawn"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "DEF%",
                    "CRIT DMG",
                    "CRIT Rate",
                    "Energy Recharge",
                    "DEF"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield and Geo resonance support.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Yanfei Vaporize Team #4",
        rank: "A",
        description: "Yanfei triggers Vaporize reactions with Xingqiu's Burst, while Sucrose boosts Elemental Mastery and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main DPS triggering Vaporize.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Provides continuous off-field Hydro application to trigger Vaporize.",
                weapons: [
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Provides Elemental Mastery bonus to team members, increasing the DMG of Vaporization.",
                weapons: [
                    "Sacrificial Fragments",
                    "Mappa Mare"
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
                roleDesc: "Provides a large ATK buff and healing.",
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
    },
    {
        name: "Yanfei Vaporize Team #5",
        rank: "A",
        description: "Focuses on Yanfei as main DPS triggering Vaporize reactions, with Xiangling providing off-field Pyro application, Kazuha for grouping, elemental buff/shred, and Bennett for ATK buff and healing.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main DPS driving the Pyro attacks.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xiangling",
                role: "Sub DPS",
                roleDesc: "Provides off-field Pyro damage and resonance.",
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
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Groups enemies and boosts Elemental DMG.",
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
                roleDesc: "ATK buff and healing support.",
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
    },
    {
        name: "Yanfei Melt Team #1",
        rank: "A",
        description: "Yanfei serves as the primary DPS, with her damage amplified by Melt reactions. Trigger Melt on enemies affected by Ganyu's Burst and skill application, while Kazuha provides grouping and elemental shred, and Diona offers shielding and energy for Ganyu.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "Main DPS triggering Melt reactions.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "ganyu",
                role: "Sub DPS",
                roleDesc: "Applies Cryo consistently off-field via Burst.",
                weapons: [
                    "Skyward Harp",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
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
                roleDesc: "Groups enemies, provides Anemo Swirl to reduce Cryo resistance.",
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
                characterId: "diona",
                role: "Support",
                roleDesc: "Provides shields, healing, and acts as a battery for Ganyu.",
                weapons: [
                    "Sacrificial Bow",
                    "Favonius Warbow"
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
    },
    {
        name: "Yanfei Melt Team #2",
        rank: "A",
        description: "A Melt team where Yanfei serves as the on-field driver, triggering Melt reactions with off-field Cryo application from Ayaka and Diona. Yanfei triggers Melt reactions by applying Pyro to enemies affected by Cryo from Ayaka's Burst and Diona's Skill/Burst. Sucrose buffs Elemental Mastery and reduces Cryo resistance with Viridescent Venerer.",
        members: [
            {
                characterId: "yanfei",
                role: "Main DPS",
                roleDesc: "On-field driver triggering Melt.",
                weapons: [
                    "Lost Prayer to the Sacred Winds",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Wanderer's Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "ayaka",
                role: "Sub DPS",
                roleDesc: "Provides powerful off-field Cryo application via Burst.",
                weapons: [
                    "Mistsplitter Reforged",
                    "Amenoma Kageuchi"
                ],
                artifacts: [
                    "4pc Blizzard Strayer"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "sucrose",
                role: "Support",
                roleDesc: "Provides Elemental Mastery buffs and groups enemies.",
                weapons: [
                    "Sacrificial Fragments",
                    "Mappa Mare"
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
                characterId: "diona",
                role: "Support",
                roleDesc: "Shield and healing support.",
                weapons: [
                    "Sacrificial Bow",
                    "Favonius Warbow"
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
        nameVi: "Chân Ngôn Bí Hạp",
        nameEn: "Chân Ngôn Bí Hạp",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.",
        passiveDescEn: "Tấn công căn bản và Sát Thương Bạo Kích cao. Kỹ Năng Nộ giúp tăng Tinh Thông Nguyên Tố để phản ứng Bốc Hơi mạnh mẽ hơn.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png"
    },
    {
        rank: 2,
        nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.",
        passiveDescEn: "Lượng Sát Thương Bạo Kích khổng lồ và tăng sát thương Đòn Đánh Thường. Hiệu ứng thay đổi HP dễ dàng được kích hoạt bởi các đòn Trọng Kích của Yanfei.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png"
    },
    {
        rank: 3,
        nameVi: "Quản Đốc Vàng Ròng",
        nameEn: "Quản Đốc Vàng Ròng",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.",
        passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố, rất phù hợp với chu kỳ combo của Yanfei.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png"
    },
    {
        rank: 4,
        nameVi: "Tâm Niệm Sắc Màu",
        nameEn: "Tâm Niệm Sắc Màu",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.",
        passiveDescEn: "Cung cấp Tinh Thông Nguyên Tố và Tỷ Lệ Bạo Kích. Sau khi kích hoạt phản ứng, cả đội nhận thêm Tấn Công%, có lợi cho cả Yanfei lẫn đồng đội hỗ trợ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_VaresaTransformer.png"
    },
    {
        rank: 5,
        nameVi: "Thời Khắc Lướt Sóng",
        nameEn: "Thời Khắc Lướt Sóng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.",
        passiveDescEn: "Sát Thương Bạo Kích cao và tăng tốc độ Đánh Thường. Phản ứng Bốc Hơi giúp tăng thêm Tinh Thông Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png"
    },
    {
        rank: 6,
        nameVi: "Cõi Mộng Ngàn Đêm",
        nameEn: "Cõi Mộng Ngàn Đêm",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.",
        passiveDescEn: "Tăng Tinh Thông Nguyên Tố cho cả đội và lượng lớn TTNT cá nhân. Rất lý tưởng cho đội hình chuyên phản ứng, tăng mạnh sát thương Bốc Hơi.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png"
    },
    {
        rank: 7,
        nameVi: "Ánh Nhìn Tư Tế",
        nameEn: "Ánh Nhìn Tư Tế",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và Hiệu Quả Nạp. Buff sát thương Kỹ Năng Nộ giúp tối ưu khả năng dồn sát thương của Yanfei.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Figurines.png"
    },
    {
        rank: 8,
        nameVi: "Dòng Chảy Trong Trẻo",
        nameEn: "Dòng Chảy Trong Trẻo",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.",
        passiveDescEn: "Lựa chọn rèn F2P cung cấp dòng phụ Tấn Công%. Nội tại tăng Sát Thương Nguyên Tố sau khi dùng Kỹ Năng Nguyên Tố, đơn giản nhưng hiệu quả.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Vorpal.png"
    },
    {
        rank: 9,
        nameVi: "Chương Nhạc Lang Thang",
        nameEn: "Chương Nhạc Lang Thang",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.",
        passiveDescEn: "Nhận ngẫu nhiên các buff khi ra sân: Tấn Công%, Tăng Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố. Cả 3 buff đều cực kỳ có lợi cho lối chơi Bốc Hơi của Yanfei.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png"
    },
    {
        rank: 10,
        nameVi: "Sương Mai",
        nameEn: "Sương Mai",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.",
        passiveDescEn: "Dòng phụ Sát Thương Bạo Kích. Sau khi kích hoạt phản ứng Nguyên Tố Hỏa, tăng Tấn Công và Tỷ Lệ Bạo Kích, rất đồng bộ với lối chơi của Yanfei.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ziedas.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực",
        setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: [
            "Tấn Công%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Tinh Thông Nguyên Tố",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: [
            "Tấn Công%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Tinh Thông Nguyên Tố",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục",
        setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: [
            "Tấn Công%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Tinh Thông Nguyên Tố",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: [
            "Tấn Công%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Tinh Thông Nguyên Tố",
            "Hiệu Quả Nạp"
        ]
    },
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: [
            "Tấn Công%",
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích",
            "Tấn Công%",
            "Tinh Thông Nguyên Tố",
            "Hiệu Quả Nạp"
        ]
    }
]
};
