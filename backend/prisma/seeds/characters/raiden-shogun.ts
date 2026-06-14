export const raidenShogun = {
  characterId: "raiden-shogun",
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
  teams: [
    {
        name: "Raiden Shogun Electro Team",
        rank: "SS",
        description: "Raiden Shogun drives an electro charged team with high energy cost bursts, maximizing her own damage while providing energy and buffs.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Electro Main DPS. Drives the team with high energy cost bursts, maximizing damage and energy refund.",
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
                characterId: "kujou-sara",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Provides Electro CRIT DMG buff and ATK bonus for Raiden.",
                weapons: [
                    "Elegy for the End",
                    "Mouun's Moon"
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
                roleDesc: "Anemo Support. Groups enemies, triggers Viridescent Venerer resistance shred, and buffs Electro DMG.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Provides massive ATK buff and healing for the team.",
                weapons: [
                    "Aquila Favonia",
                    "The Alley Flash"
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
        name: "Raiden Shogun National Team",
        rank: "SS",
        description: "Raiden Shogun acts as the Main DPS, utilizing her Elemental Burst which scales with energy consumed by teammates. Xiangling and Xingqiu provide high off-field bursts (80 energy) to maximize her damage, while Bennett supplies ATK buffs and healing.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Main DPS. Scales damage with team energy consumption and refills team energy.",
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
                characterId: "xingqiu",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides constant off-field Hydro application to enable Vaporize/Electro-Charged reactions.",
                weapons: [
                    "Primordial Jade Cutter",
                    "Sacrificial Sword"
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
                roleDesc: "Pyro Sub DPS. Deals massive Pyro damage off-field with her Pyronado.",
                weapons: [
                    "Primordial Jade Cutter",
                    "The Catch"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Heals and buffs ATK.",
                weapons: [
                    "Aquila Favonia",
                    "The Alley Flash"
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
        name: "Raiden Shogun Overload Team",
        rank: "SS",
        description: "Raiden Shogun serves as Main DPS, with Kujou Sara providing ATK bonus and CRIT DMG boost for Electro. Xiangling offers continuous Pyro DMG, and Bennett heals and buffs ATK.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Main DPS. Drives the team with high energy cost bursts.",
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
                characterId: "kujou-sara",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Buffs Electro CRIT DMG and ATK.",
                weapons: [
                    "Elegy for the End",
                    "Mouun's Moon"
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
                roleDesc: "Pyro Sub DPS. Continuously applies Pyro off-field.",
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
                    "Elemental Mastery",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Heals and buffs ATK.",
                weapons: [
                    "Aquila Favonia",
                    "The Alley Flash"
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
        name: "Raiden Shogun Overload Team #2",
        rank: "SS",
        description: "Electro-Pyro overload team focusing on Raiden Shogun's Burst damage. Kujou Sara C6 provides CRIT DMG for Electro, Chevreuse shreds Pyro/Electro RES when Overload is triggered, while Bennett supplies huge ATK buffs and healing.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Main DPS. Deals massive Electro damage with Burst.",
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
                characterId: "kujou-sara",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Provides ATK and Electro CRIT DMG buffs.",
                weapons: [
                    "Elegy for the End",
                    "Mouun's Moon"
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
                characterId: "chevreuse",
                role: "Support",
                roleDesc: "Pyro Support. Shreds Pyro/Electro resistance and buffs team ATK%.",
                weapons: [
                    "Staff of Homa",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Heals and buffs ATK.",
                weapons: [
                    "Aquila Favonia",
                    "The Alley Flash"
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
        name: "Raiden Shogun Catalyze Team",
        rank: "S",
        description: "A variant of Raiden's team using Nahida for Aggravate reactions to boost Electro damage.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Main DPS. Triggers Aggravate reactions for enhanced Electro damage.",
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
                characterId: "kujou-sara",
                role: "Sub DPS",
                roleDesc: "Electro Sub DPS. Buffs Electro CRIT DMG and ATK.",
                weapons: [
                    "Elegy for the End",
                    "Mouun's Moon"
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
                roleDesc: "Anemo Support. Groups enemies and shreds resistance.",
                weapons: [
                    "Freedom-Sworn",
                    "Xiphos' Moonlight"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field and shares Elemental Mastery.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Prototype Amber"
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
            }
        ]
    },
    {
        name: "Raiden Shogun Hyperbloom",
        rank: "SS",
        description: "Raiden Shogun is the Electro trigger in the Hyperbloom team, with Yelan providing Hydro application and DMG, Nahida applying Dendro, and Baizhu for healing and shields.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Electro trigger. Triggers Hyperbloom reactions on Dendro Cores with Elemental Skill.",
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
                characterId: "yelan",
                role: "Sub DPS",
                roleDesc: "Hydro Sub DPS. Applies Hydro off-field and boosts active character damage.",
                weapons: [
                    "Aqua Simulacra",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "nahida",
                role: "Sub DPS",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field and increases team Elemental Mastery.",
                weapons: [
                    "A Thousand Floating Dreams",
                    "Prototype Amber"
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
                characterId: "baizhu",
                role: "Support",
                roleDesc: "Dendro Support. Provides shields, healing, and Hyperbloom reaction damage bonus.",
                weapons: [
                    "Prototype Amber"
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
        name: "Raiden Shogun Double Core Team",
        rank: "S",
        description: "A team built around Raiden Shogun and Eula as dual carries. Superconduct enables Eula's physical Burst damage, while Raiden provides energy and burst buffs. Rosaria batteries Eula, and Bennett heals and buffs ATK.",
        members: [
            {
                characterId: "raiden-shogun",
                role: "Main DPS",
                roleDesc: "Electro Main DPS. Triggers Superconduct and refills team energy.",
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
                characterId: "eula",
                role: "Main DPS",
                roleDesc: "Physical Main DPS. Deals massive physical Burst damage.",
                weapons: [
                    "Song of Broken Pines",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Pale Flame"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "rosaria",
                role: "Sub DPS",
                roleDesc: "Cryo Sub DPS. Batteries Eula and shares CRIT Rate.",
                weapons: [
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Heals and buffs ATK.",
                weapons: [
                    "Aquila Favonia",
                    "The Alley Flash"
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
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Đoạn Thảo Kính Phạt",
        nameEn: "Đoạn Thảo Kính Phạt",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.",
        passiveDescEn: "Trấn phái hoàn hảo nhất, tăng mạnh Hiệu Quả Nạp và chuyển hóa nó thành Tấn Công%.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png"
    },
    {
        rank: 2,
        nameVi: "Trượng Hộ Ma",
        nameEn: "Trượng Hộ Ma",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.",
        passiveDescEn: "Cung cấp lượng lớn Sát Thương Bạo Kích và Tấn Công% khi máu dưới 50%, là vũ khí đa dụng rất mạnh.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png"
    },
    {
        rank: 3,
        nameVi: "Quyền Trượng Cát Đỏ",
        nameEn: "Quyền Trượng Cát Đỏ",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.",
        passiveDescEn: "Chuyển đổi Tinh Thông Nguyên Tố thành Tấn Công%, rất hữu dụng trong các đội hình phản ứng nguyên tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Deshret.png"
    },
    {
        rank: 4,
        nameVi: "Khúc Ca Hòa Điệu",
        nameEn: "Khúc Ca Hòa Điệu",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.",
        passiveDescEn: "Lựa chọn tình huống cung cấp Hiệu Quả Nạp và buff cho đội, tuy không tối ưu nhưng vẫn dùng tốt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Trident.png"
    },
    {
        rank: 5,
        nameVi: "Khúc Ca Vườn Sáng",
        nameEn: "Khúc Ca Vườn Sáng",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.",
        passiveDescEn: "Không quá lý tưởng cho Raiden, ưu tiên lựa chọn khác trừ khi đội hình cần hiệu quả hỗ trợ của nó.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png"
    },
    {
        rank: 6,
        nameVi: "Hòa Phát Diên",
        nameEn: "Hòa Phát Diên",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.",
        passiveDescEn: "Đem lại lượng lớn Tỷ Lệ Bạo Kích và tăng dần Tấn Công%, lựa chọn DPS tổng thể rất ổn định.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png"
    },
    {
        rank: 7,
        nameVi: "Hủy Diệt",
        nameEn: "Hủy Diệt",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.",
        passiveDescEn: "Cung cấp chỉ số Tấn Công% cực cao và buff cho Kỹ Năng Nguyên Tố, cạnh tranh tốt ở mức tinh luyện thấp.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png"
    },
    {
        rank: 8,
        nameVi: "Thương Quyết Chiến",
        nameEn: "Thương Quyết Chiến",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.",
        passiveDescEn: "Vũ khí phân khúc giá rẻ giúp tăng Tỷ Lệ Bạo Kích, hiệu quả khi solo hoặc đối phó với ít kẻ địch.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png"
    },
    {
        rank: 9,
        nameVi: "Giáo Nịnh Thần",
        nameEn: "Giáo Nịnh Thần",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.",
        passiveDescEn: "Tăng hiệu quả Khiên và Tấn Công%, yêu cầu có nhân vật tạo khiên trong đội để phát huy tối đa sức mạnh.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png"
    },
    {
        rank: 10,
        nameVi: "Lao Xiên Cá",
        nameEn: "Lao Xiên Cá",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.",
        passiveDescEn: "Vũ khí F2P tốt nhất cho Raiden, tăng trực tiếp sát thương Nộ và Tỷ Lệ Bạo Kích của kỹ năng Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png"
    },
    {
        rank: 11,
        nameVi: "Xương Sống Thiên Không",
        nameEn: "Xương Sống Thiên Không",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.",
        passiveDescEn: "Cung cấp Hiệu Quả Nạp và Tỷ Lệ Bạo Kích, là vũ khí đa dụng ổn nhưng dễ bị thay thế bởi lựa chọn khác.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Dvalin.png"
    },
    {
        rank: 12,
        nameVi: "Vây Cá Chẻ Sóng",
        nameEn: "Vây Cá Chẻ Sóng",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.",
        passiveDescEn: "Sát thương Nộ tăng theo tổng năng lượng tiêu hao của cả đội, cực mạnh trong các đội hình tốn nhiều năng lượng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Maria.png"
    },
    {
        rank: 13,
        nameVi: "Thương Lập Kiếm",
        nameEn: "Thương Lập Kiếm",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.",
        passiveDescEn: "Tăng mạnh Tấn Công% và Tỷ Lệ Bạo Kích dựa trên số thành viên Liyue trong đội hình.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png"
    },
    {
        rank: 14,
        nameVi: "Thương Tây Phong",
        nameEn: "Thương Tây Phong",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.",
        passiveDescEn: "Ưu tiên nạp năng lượng cho cả đội thay vì sát thương cá nhân, tạo nhiều hạt nhân lượng khi bạo kích.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Dấu Ấn Ngăn Cách",
        setNameEn: "Dấu Ấn Ngăn Cách",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Lôi",
            "Tấn Công%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge",
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Nghi Thức Tông Thất Cổ",
        setNameEn: "Nghi Thức Tông Thất Cổ",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Lôi",
            "Tấn Công%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge",
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn",
        setNameEn: "Mix 2 bộ Lôi & Tông Thất & Tấn Công & Dấu Ấn",
        pieces: 2,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Lôi",
            "Tấn Công%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge",
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: [
            "Hiệu Quả Nạp",
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Lôi",
            "Tấn Công%"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge",
            "Elemental Mastery"
        ]
    }
]
};
