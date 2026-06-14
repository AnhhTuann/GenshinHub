export const nahida = {
  characterId: "nahida",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  talentPriority: [
  "Skill",
  "Burst",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Nahida Overload-Catalyze Team",
        rank: "S",
        description: "Nahida is the Main DPS. Raiden Shogun and Thoma provide continuous Electro and Pyro attachment. Nahida's Normal Attacks trigger Overload, Spread, and Aggravate. Use Nahida's Skill to apply Dendro, then Electro/Pyro from Raiden and Thoma trigger Overload, Spread, and Aggravate. Kuki triggers Hyperbloom from Dendro cores, maximizing reaction damage.",
        members: [
            {
                characterId: "nahida",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Applies Dendro with Skill and drives reactions using Normal Attacks.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "raiden-shogun",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Triggers Quicken and Aggravate reactions.",
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
                characterId: "kuki-shinobu",
                role: "Support",
                roleDesc: "Electro Support. Heals and triggers Hyperbloom from Dendro cores.",
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
            },
            {
                characterId: "thoma",
                role: "Support",
                roleDesc: "Pyro Support. Provides shield and triggers Burning/Burgeon/Overload reactions.",
                weapons: [
                    "Kitain Cross Spear"
                ],
                artifacts: [
                    "4pc Flower of Paradise Lost"
                ],
                substats: [
                    "Energy Recharge",
                    "Elemental Mastery",
                    "HP%"
                ]
            }
        ]
    },
    {
        name: "Nahida Catalyze Team #1",
        rank: "SS",
        description: "Nahida maximizes Elemental Mastery for personal DMG and Catalyze. Two Electro characters provide off-field Electro for Aggravate reactions, and two Dendro units reduce Tri-Karma Purification interval.",
        members: [
            {
                characterId: "nahida",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Maximizes EM for personal damage and Catalyze reactions.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "yae-miko",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Provides off-field Electro damage for Aggravate.",
                weapons: [
                    "Kagura's Verity",
                    "The Widsith"
                ],
                artifacts: [
                    "2pc Golden Troupe + 2pc Thundering Fury"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "fischl",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Applies off-field Electro continuously.",
                weapons: [
                    "Aqua Simulacra",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides shield and Geo Resonance.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Archaic Petra"
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
        name: "Nahida Hyperbloom Team #1",
        rank: "SS",
        description: "Hyperbloom team with Nahida applying Dendro, Kokomi creating Dendro cores, Raiden Shogun triggering Hyperbloom, and Kazuha providing support and Elemental RES shred. Raiden Shogun's Elemental Skill triggers Hyperbloom on Dendro Cores created by Nahida and Kokomi. Kazuha groups enemies and buffs team DMG.",
        members: [
            {
                characterId: "kokomi",
                role: "Main DPS",
                roleDesc: "Hydro Main DPS. Applies Hydro on-field, triggers Bloom, and heals the team.",
                weapons: [
                    "Everlasting Moonglow",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Ocean-Hued Clam"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies off-field Dendro to create Bloom cores.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "raiden-shogun",
                role: "Sub DPS",
                roleDesc: "Electro trigger. Triggers Hyperbloom on Dendro cores off-field.",
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
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, shreds Hydro/Electro resistance, and buffs team damage.",
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
            }
        ]
    },
    {
        name: "Nahida Rainbow Hyperbloom Team",
        rank: "SS",
        description: "A versatile team that uses Nahida's Dendro with Yelan's Hydro to create Bloom cores, then triggers Hyperbloom with Kuki Shinobu's Electro or Burgeon with Thoma's Pyro. Nahida applies Dendro with her Skill while Yelan provides off-field Hydro to create Bloom cores. Kuki (high Elemental Mastery) or Thoma then trigger Hyperbloom or Burgeon for massive damage.",
        members: [
            {
                characterId: "nahida",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Applies Dendro and triggers reactions on-field.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "yelan",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro and increases active character damage.",
                weapons: [
                    "Aqua Simulacra",
                    "Favonius Warbow"
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
                characterId: "thoma",
                role: "Support",
                roleDesc: "Pyro Support. Triggers Burgeon reactions on Dendro cores.",
                weapons: [
                    "Kitain Cross Spear"
                ],
                artifacts: [
                    "4pc Flower of Paradise Lost"
                ],
                substats: [
                    "Energy Recharge",
                    "Elemental Mastery",
                    "HP%"
                ]
            },
            {
                characterId: "kuki-shinobu",
                role: "Support",
                roleDesc: "Electro Support. Heals the team and triggers Hyperbloom.",
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
        name: "Nahida Bloom Team",
        rank: "SS",
        description: "Primary Dendro applicator as Elemental Mastery. Nilou triggers bountiful blooms. Nahida's Elemental Skill applies Dendro to trigger Bloom, Yelan/Xingqiu applies Hydro, and Kokomi triggers healing.",
        members: [
            {
                characterId: "nilou",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Replaces Bloom cores with Bountiful Cores for instant massive damage.",
                weapons: [
                    "Key of Khaj-Nisut",
                    "The Dockhand's Assistant"
                ],
                artifacts: [
                    "2pc Tenacity of the Millelith + 2pc Vourukasha's Glow"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "nahida",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Continuous Dendro application on-field.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "traveler",
                role: "Support",
                roleDesc: "Dendro Support. Provides Dendro Resonance and off-field Dendro application.",
                weapons: [
                    "Freedom-Sworn",
                    "Iron Sting"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "Energy Recharge",
                    "Elemental Mastery",
                    "HP%"
                ]
            },
            {
                characterId: "kokomi",
                role: "Support",
                roleDesc: "Hydro Support. Heals the team and applies Hydro off-field.",
                weapons: [
                    "Everlasting Moonglow",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Ocean-Hued Clam"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Nahida Catalyze Team #2",
        rank: "S",
        description: "Nahida (Dendro) application with Cyno (Electro) for high damage. Zhongli provides shielding and ATK buff. Maximize team damage through Catalyze reactions. Nahida's Tri-Karma Purification benefits from two Electro characters, reducing its trigger interval.",
        members: [
            {
                characterId: "cyno",
                role: "Main DPS",
                roleDesc: "Electro Main DPS. Drives Aggravate reactions on-field during Burst.",
                weapons: [
                    "Staff of the Scarlet Sands",
                    "Deathmatch"
                ],
                artifacts: [
                    "4pc Thundering Fury"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "fischl",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Deals off-field Electro damage for Catalyze.",
                weapons: [
                    "Aqua Simulacra",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares EM with the active character.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Gilded Dreams"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides shield and RES shred.",
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
        name: "Nahida Catalyze Team #3",
        rank: "S",
        description: "Nahida is the Main DPS with maximized Elemental Mastery to boost her DMG and Catalyze reactions. Beidou and Fischl provide off-field Electro for Aggravate reactions. Zhongli's shield offers safety and can use Archaic Petra for bonus DMG.",
        members: [
            {
                characterId: "nahida",
                role: "Main DPS",
                roleDesc: "Dendro Main DPS. Deals high on-field Dendro damage and drives Catalyze.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "beidou",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Provides off-field Electro damage and damage reduction via Burst.",
                weapons: [
                    "Skyward Pride",
                    "Serpent Spine"
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
                characterId: "fischl",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Applies off-field Electro continuously.",
                weapons: [
                    "Aqua Simulacra",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Strong shield protection, can buff Geo/Electro with Archaic Petra.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Archaic Petra"
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
        name: "Nahida Melt Team",
        rank: "S",
        description: "Nahida applies Dendro to trigger Burning with Pyro from Bennett, then Ganyu/Rosaria Melt on burning enemies for massive damage.",
        members: [
            {
                characterId: "ganyu",
                role: "Main DPS",
                roleDesc: "Cryo Main DPS. Triggers Melt on burning targets.",
                weapons: [
                    "Hunter's Path",
                    "Hamayumi"
                ],
                artifacts: [
                    "4pc Shimenawa's Reminiscence"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Maintains Burning status on enemies via Tri-Karma Purification.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Protects Ganyu during Charged Attacks.",
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
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Applies Pyro to trigger Burning, heals, and buffs ATK.",
                weapons: [
                    "Aquila Favonia",
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
        name: "Nahida Hyperbloom Team #2",
        rank: "S",
        description: "Razor triggers multiple reactions (Overloaded, Electro-Charged, Superconduct, Aggravate, Hyperbloom) with his Burst while Nahida applies Dendro, Xingqiu applies Hydro, and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "razor",
                role: "Main DPS",
                roleDesc: "Electro Main DPS. Drives multiple reactions on-field using Burst.",
                weapons: [
                    "Serpent Spine",
                    "Wolf's Gravestone"
                ],
                artifacts: [
                    "4pc Gilded Dreams"
                ],
                substats: [
                    "Energy Recharge",
                    "Elemental Mastery",
                    "HP%"
                ]
            },
            {
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro application to create Bloom cores.",
                weapons: [
                    "Sacrificial Sword"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field to create Bloom cores.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Solar Pearl"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Provides ATK buff, healing, and Pyro application for Overload/Burgeon.",
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
        nameVi: "Cõi Mộng Ngàn Đêm",
        nameEn: "Cõi Mộng Ngàn Đêm",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.",
        passiveDescEn: "Vũ khí tốt nhất: cung cấp Tinh Thông Nguyên Tố cực lớn và buff thêm TTNT cho cả đội, giúp tăng mạnh sát thương phản ứng và khả năng hỗ trợ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Ayus.png"
    },
    {
        rank: 2,
        nameVi: "Hòa Giấc Trong Nắng Mai",
        nameEn: "Hòa Giấc Trong Nắng Mai",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.",
        passiveDescEn: "Tấn Công cơ bản cao và dòng phụ Tỷ Lệ Bạo Kích; nội tại cung cấp lượng lớn Tinh Thông Nguyên Tố sau khi kích hoạt phản ứng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_SakuraFan.png"
    },
    {
        rank: 3,
        nameVi: "Chân Ý Của Kagura",
        nameEn: "Chân Ý Của Kagura",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.",
        passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và tăng sát thương Kỹ Năng Nguyên Tố từ các tầng nội tại, tuy nhiên cần đứng sân để duy trì.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png"
    },
    {
        rank: 4,
        nameVi: "Mảnh Chương Tế Lễ",
        nameEn: "Mảnh Chương Tế Lễ",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.",
        passiveDescEn: "Tinh Thông Nguyên Tố cao và có tỷ lệ reset thời gian hồi chiêu E, giúp kéo dài khả năng cấp Thảo ngoài sân.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fossil.png"
    },
    {
        rank: 5,
        nameVi: "Đàn Thiên Quang",
        nameEn: "Đàn Thiên Quang",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.",
        passiveDescEn: "Cung cấp Hiệu Quả Nạp và tăng Tinh Thông Nguyên Tố cho toàn đội sau khi dùng Nộ, hỗ trợ đắc lực cho các phản ứng nguyên tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_SeeliesLute.png"
    },
    {
        rank: 6,
        nameVi: "Sao Đêm Rong Ruổi",
        nameEn: "Sao Đêm Rong Ruổi",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.",
        passiveDescEn: "Dòng phụ Tinh Thông Nguyên Tố và nội tại chuyển hóa thành Tấn Công cho Nahida và toàn đội, rất tốt cho lối chơi hỗ trợ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Pleroma.png"
    },
    {
        rank: 7,
        nameVi: "Chương Nhạc Lang Thang",
        nameEn: "Chương Nhạc Lang Thang",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.",
        passiveDescEn: "Buff ngẫu nhiên cực mạnh (TTNT, Tấn Công, Sát Thương Nguyên Tố), tuy nhiên không ổn định cho hỗ trợ phản ứng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png"
    },
    {
        rank: 8,
        nameVi: "Ngọc Bích Hiến Tế",
        nameEn: "Ngọc Bích Hiến Tế",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.",
        passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng HP/TTNT khi không đứng sân, phù hợp cho Nahida off-field sử dụng như một vũ khí tăng chỉ số.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png"
    },
    {
        rank: 9,
        nameVi: "Quyển Thiên Không",
        nameEn: "Quyển Thiên Không",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.",
        passiveDescEn: "Tấn Công cơ bản cao và buff Sát Thương Nguyên Tố; nội tại tạo thêm sát thương vật lý nhỏ nhưng thiếu Tinh Thông Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png"
    },
    {
        rank: 10,
        nameVi: "Điển Tích Tây Phong",
        nameEn: "Điển Tích Tây Phong",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.",
        passiveDescEn: "Tỷ Lệ Bạo Kích cao và tăng dần Sát Thương Nguyên Tố khi đứng sân; không tối ưu cho lối chơi quick-swap.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png"
    },
    {
        rank: 11,
        nameVi: "Khóa Trần Thế",
        nameEn: "Khóa Trần Thế",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.",
        passiveDescEn: "Yêu cầu khiên để tối đa hóa cộng dồn Tấn Công%; không thực sự lý tưởng vì Nahida ưu tiên Tinh Thông Nguyên Tố hơn.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Kunwu.png"
    },
    {
        rank: 12,
        nameVi: "Nhật Nguyệt Hạp",
        nameEn: "Nhật Nguyệt Hạp",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.",
        passiveDescEn: "Gia tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ kèm Tỷ Lệ Bạo Kích; thiếu Tinh Thông Nguyên Tố và chỉ phù hợp khi đứng sân.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Resurrection.png"
    },
    {
        rank: 13,
        nameVi: "Tây Phong Mật Điển",
        nameEn: "Tây Phong Mật Điển",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.",
        passiveDescEn: "Tạo hạt năng lượng cho cả đội; sử dụng nếu đội hình thiếu Nạp trầm trọng dù lượng Tinh Thông Nguyên Tố nhận lại thấp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Zephyrus.png"
    },
    {
        rank: 14,
        nameVi: "Hải Đồ Vạn Quốc",
        nameEn: "Hải Đồ Vạn Quốc",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.",
        passiveDescEn: "Vũ khí rèn dễ kiếm cung cấp Tinh Thông Nguyên Tố; nội tại tăng Sát Thương Nguyên Tố sau phản ứng, lựa chọn F2P ổn định.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Exotic.png"
    },
    {
        rank: 15,
        nameVi: "Tóm Tắt Ma Pháp",
        nameEn: "Tóm Tắt Ma Pháp",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.",
        passiveDescEn: "Vũ khí 3 sao rẻ tiền cung cấp lượng Tinh Thông Nguyên Tố lớn; nội tại tăng sát thương lên kẻ địch dính ấn Thủy hoặc Lôi.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Intro.png"
    },
    {
        rank: 16,
        nameVi: "Vòng Bạch Thần",
        nameEn: "Vòng Bạch Thần",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.",
        passiveDescEn: "Vũ khí rèn cung cấp Hiệu Quả Nạp và buff Sát Thương Nguyên Tố liên quan đến Lôi; chỉ dùng trong đội hình phản ứng Lôi.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Bakufu.png"
    },
    {
        rank: 17,
        nameVi: "Câu Chuyện Diệt Rồng",
        nameEn: "Câu Chuyện Diệt Rồng",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.",
        passiveDescEn: "Cung cấp lượng lớn buff Tấn Công% cho nhân vật ra sân tiếp theo; chỉ dùng thuần hỗ trợ khi Nahida không gây sát thương.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Pulpfic.png"
    },
    {
        rank: 18,
        nameVi: "Mẫu Kim Phách",
        nameEn: "Mẫu Kim Phách",
        subStat: "HP%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.",
        passiveDescEn: "Hồi máu và phục hồi năng lượng cho toàn đội; sử dụng nếu cần gia tăng khả năng sinh tồn và nạp năng lượng thay vì TTNT.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Proto.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Ký Ức Rừng Sâu",
        setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    },
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    },
    {
        setNameVi: "Đoàn Kịch Hoàng Kim",
        setNameEn: "Đoàn Kịch Hoàng Kim",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu",
        setNameEn: "Mix 2 bộ Tinh Thông & 2 bộ Ký Ức Rừng Sâu",
        pieces: 2,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    },
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    },
    {
        setNameVi: "Đóa Hoa Trang Viên Thất Lạc",
        setNameEn: "Đóa Hoa Trang Viên Thất Lạc",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố"
        ],
        goblet: [
            "Tinh Thông Nguyên Tố",
            "Sát Thương Nguyên Tố Thảo"
        ],
        circlet: [
            "Tinh Thông Nguyên Tố",
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "Energy Recharge",
            "CRIT Rate",
            "CRIT DMG",
            "Elemental Mastery",
            "ATK%"
        ]
    }
]
};
