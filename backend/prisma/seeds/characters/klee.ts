export const klee = {
  characterId: "klee",
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
        name: "Klee Vaporize Team",
        rank: "S",
        description: "A powerful Vaporize team built around Klee as the on-field Pyro Main DPS, with Xilonen providing consistent Hydro application and damage buffs, Furina applying off-field Hydro, and Bennett reducing enemy RES and sustaining the team.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, which triggers Vaporize with Furina's Hydro.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xilonen",
                role: "Support",
                roleDesc: "Provides elemental resistance shred and heals allies, while triggering Crystallize for Scroll set buffs.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Provides continuous off-field Hydro application and buffs the entire team's DMG through HP fluctuation.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a massive ATK buff and healing, and triggers Pyro resonance.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Vaporization Team #2",
        rank: "S",
        description: "Klee is a Main DPS in the team. Klee applies Pyro while Furina provides continuous Hydro application for Vaporize reactions. Kazuha enhances damage with swirled control, while Bennett provides healing and ATK buffs.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill can apply Pyro, triggering Vaporize with Furina's Hydro.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
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
                roleDesc: "Groups enemies, swirls Pyro and Hydro for resistance shred and damage buffs.",
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
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides ATK buff and healing, triggering Pyro resonance.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Pyro-Overload",
        rank: "S",
        description: "A high damage Pyro team revolving around Klee's explosion attacks, supported by Xilonen's RES shred, Durin's off-field Pyro and RES reduction, and Bennett's ATK buff and healing.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's normal attacks, charged attacks, and Elemental Skill apply Pyro, which triggers Pyro reactions.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xilonen",
                role: "Support",
                roleDesc: "Provides elemental resistance shred and heals teammates.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "durin",
                role: "Support",
                roleDesc: "Durin gains [Confirmation of Purity] or [Beacon of Rustication] via Skill and triggering Burn. The former provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
                weapons: [
                    "Alatus Alva",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Flower of Paradise Lost"
                ],
                substats: [
                    "CRIT Rate",
                    "CRIT DMG",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Hazard Team",
        rank: "S",
        description: "A team leveraging the powerful synergy between Klee, Albedo, and Durin for enhanced damage and support. Bennett provides ATK buffs and healing.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Pyro reactions.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
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
                roleDesc: "Provides off-field Geo damage and Geo resonance, while boosting team's Elemental Mastery.",
                weapons: [
                    "Uraku Misugiri",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "4pc Golden Troupe"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "DEF"
                ]
            },
            {
                characterId: "durin",
                role: "Support",
                roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
                weapons: [
                    "Alatus Alva",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Flower of Paradise Lost"
                ],
                substats: [
                    "CRIT Rate",
                    "CRIT DMG",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides a large ATK buff and healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Overload Team #1",
        rank: "S",
        description: "An explosive Overload team featuring Klee as the primary damage dealer, Fischl providing consistent Electro application, Durin for off-field Pyro and shred, and Bennett for ATK buffs and healing.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Deals Pyro damage to trigger Overload with Fischl's Electro.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
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
                roleDesc: "Provides off-field Electro damage via Oz to trigger Overload.",
                weapons: [
                    "Aqua Simulacra",
                    "Sacrificial Bow"
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
                characterId: "durin",
                role: "Support",
                roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
                weapons: [
                    "Alatus Alva",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Flower of Paradise Lost"
                ],
                substats: [
                    "CRIT Rate",
                    "CRIT DMG",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides ATK buff and healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Overload #2",
        rank: "S",
        description: "An overload team that maximizes Klee's Pyro damage with Chevreuse's RES shred and ATK buff, Fischl's off-field Electro, and Durin's support.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Deals Pyro damage to trigger Overload with Fischl.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Lavawalker"
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
                roleDesc: "Provides off-field Electro damage via Oz.",
                weapons: [
                    "Aqua Simulacra",
                    "Sacrificial Bow"
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
                characterId: "durin",
                role: "Support",
                roleDesc: "Provides off-field Pyro damage and Pyro resistance shred, while boosting teammates' ATK.",
                weapons: [
                    "Alatus Alva",
                    "Wolf-Fang"
                ],
                artifacts: [
                    "2pc Noblesse Oblige",
                    "2pc Flower of Paradise Lost"
                ],
                substats: [
                    "CRIT Rate",
                    "CRIT DMG",
                    "Energy Recharge",
                    "ATK%"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Support",
                roleDesc: "Provides healing and buffs team ATK and Electro/Pyro shred when Overload is triggered.",
                weapons: [
                    "Sumpwood of Songs",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Song of Days Past"
                ],
                substats: [
                    "HP%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Klee Vaporization Team #3",
        rank: "S",
        description: "Klee Vaporization team with Citlali shield and Furina Hydro. Klee triggers Vaporize with Furina's off-field Hydro application, while Citlali shields and applies Cryo, and Bennett buffs ATK and heals.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's Pyro attacks trigger Vaporize with Furina's Hydro.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "citlali",
                role: "Support",
                roleDesc: "Provides shield and off-field Cryo application.",
                weapons: [
                    "Starcaller's Watch",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
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
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides ATK buff and healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Vaporization Team #4",
        rank: "S",
        description: "This team features Melt reactions with Klee's Pyro and Citlali's Cryo, while Xilonen provides RES shred and Bennett provides ATK buff.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Deals Pyro damage to trigger Melt with Citlali's Cryo.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "citlali",
                role: "Support",
                roleDesc: "Provides off-field Cryo application and shield.",
                weapons: [
                    "Starcaller's Watch",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "xilonen",
                role: "Support",
                roleDesc: "Provides elemental resistance shred and healing.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Provides ATK buff and healing.",
                weapons: [
                    "Mistsplitter Reforged",
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
        name: "Klee Plunge Attack Team #1",
        rank: "S",
        description: "A plunge attack team focused on Klee's plunging attacks, supported by Furina's Hydro application and damage buff, Citlali's shield and off-field Cryo, and Xianyun's plunge attack buff and healing.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's Normal Attacks, Charged Attacks, and Elemental Skill apply Pyro, triggering Vaporize with Furina's Hydro.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "citlali",
                role: "Support",
                roleDesc: "Provides off-field Cryo application and shield.",
                weapons: [
                    "Starcaller's Watch",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Provides off-field Hydro application and team-wide DMG buff.",
                weapons: [
                    "Splendor of Tranquil Waters",
                    "Favonius Sword"
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
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Provides healing to team members and enables plunging attacks.",
                weapons: [
                    "Crane's Echoing Call",
                    "Favonius Codex"
                ],
                artifacts: [
                    "2pc Gladiator's Finale",
                    "2pc Shimenawa's Reminiscence"
                ],
                substats: [
                    "Energy Recharge",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Klee Plunge Attack Team #2",
        rank: "S",
        description: "A plunge attack team centered on Klee's enhanced plunges with support from Citlali, Xilonen, and Xianyun.",
        members: [
            {
                characterId: "klee",
                role: "Main DPS",
                roleDesc: "Klee's plunging attacks trigger Melt with Citlali's Cryo.",
                weapons: [
                    "Cashflow Supervision",
                    "The Widsith"
                ],
                artifacts: [
                    "4pc Marechaussee Hunter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "citlali",
                role: "Support",
                roleDesc: "Provides off-field Cryo application and shield.",
                weapons: [
                    "Starcaller's Watch",
                    "Prototype Amber"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "xilonen",
                role: "Support",
                roleDesc: "Provides elemental resistance shred and healing.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Provides healing and enables plunging attacks.",
                weapons: [
                    "Crane's Echoing Call",
                    "Favonius Codex"
                ],
                artifacts: [
                    "2pc Gladiator's Finale",
                    "2pc Shimenawa's Reminiscence"
                ],
                substats: [
                    "Energy Recharge",
                    "ATK%"
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
        passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng Tỷ Lệ Bạo Kích và Tinh Thông Nguyên Tố sau khi dùng kỹ năng, rất thích hợp cho Klee.",
        passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích cực lớn. Nội tại tăng Tỷ Lệ Bạo Kích và Tinh Thông Nguyên Tố sau khi dùng kỹ năng, rất thích hợp cho Klee.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Sistrum.png"
    },
    {
        rank: 2,
        nameVi: "Điển Tích Tây Phong",
        nameEn: "Điển Tích Tây Phong",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tăng Tốc Chạy. Tăng Sát Thương Nguyên Tố theo thời gian đứng sân giúp Klee dồn dame cực tốt.",
        passiveDescEn: "Dòng phụ Tỷ Lệ Bạo Kích và nội tại tăng Tốc Chạy. Tăng Sát Thương Nguyên Tố theo thời gian đứng sân giúp Klee dồn dame cực tốt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png"
    },
    {
        rank: 3,
        nameVi: "Chân Ý Của Kagura",
        nameEn: "Chân Ý Của Kagura",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao. Nội tại tăng sát thương Kỹ Năng Nguyên Tố và tăng Sát Thương Nguyên Tố khi dùng kỹ năng liên tục.",
        passiveDescEn: "Sát Thương Bạo Kích cao. Nội tại tăng sát thương Kỹ Năng Nguyên Tố và tăng Sát Thương Nguyên Tố khi dùng kỹ năng liên tục.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Narukami.png"
    },
    {
        rank: 4,
        nameVi: "Tâm Niệm Sắc Màu",
        nameEn: "Tâm Niệm Sắc Màu",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao. Tăng Tấn Công% và Sát Thương Tấn Công Thường sau khi sử dụng Kỹ Năng Nguyên Tố, tối ưu hóa chuỗi combo của Klee.",
        passiveDescEn: "Sát Thương Bạo Kích cao. Tăng Tấn Công% và Sát Thương Tấn Công Thường sau khi sử dụng Kỹ Năng Nguyên Tố, tối ưu hóa chuỗi combo của Klee.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_VaresaTransformer.png"
    },
    {
        rank: 5,
        nameVi: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        nameEn: "Nghi Thức Dòng Chảy Vĩnh Hằng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao và Sát Thương Bạo Kích%. Sau khi trọng kích trúng địch sẽ tăng Tỷ Lệ Bạo Kích và Tấn Công.",
        passiveDescEn: "Tấn công cơ bản cao và Sát Thương Bạo Kích%. Sau khi trọng kích trúng địch sẽ tăng Tỷ Lệ Bạo Kích và Tấn Công.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Iudex.png"
    },
    {
        rank: 6,
        nameVi: "Quản Đốc Vàng Ròng",
        nameEn: "Quản Đốc Vàng Ròng",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Tăng sát thương Tấn Công Thường và sát thương Kỹ Năng Nguyên Tố, tương thích cao với bộ kỹ năng kép của Klee.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Tăng sát thương Tấn Công Thường và sát thương Kỹ Năng Nguyên Tố, tương thích cao với bộ kỹ năng kép của Klee.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Wheatley.png"
    },
    {
        rank: 7,
        nameVi: "Hồi Ức Tulaytullah",
        nameEn: "Hồi Ức Tulaytullah",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Sát Thương Bạo Kích. Sau khi dùng Kỹ Năng Nguyên Tố sẽ tăng Tốc Độ Tấn Công Thường và Sát Thương Tấn Công Thường.",
        passiveDescEn: "Dòng phụ Sát Thương Bạo Kích. Sau khi dùng Kỹ Năng Nguyên Tố sẽ tăng Tốc Độ Tấn Công Thường và Sát Thương Tấn Công Thường.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Alaya.png"
    },
    {
        rank: 8,
        nameVi: "Thời Khắc Lướt Sóng",
        nameEn: "Thời Khắc Lướt Sóng",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích% (hoặc Sát Thương Bạo Kích%). Tăng sát thương Trọng Kích và hồi năng lượng, hỗ trợ nạp Nộ cho Klee.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích% (hoặc Sát Thương Bạo Kích%). Tăng sát thương Trọng Kích và hồi năng lượng, hỗ trợ nạp Nộ cho Klee.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png"
    },
    {
        rank: 9,
        nameVi: "Quyển Thiên Không",
        nameEn: "Quyển Thiên Không",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công% dồi dào. Nội tại tạo thêm sát thương vật lý diện rộng và tăng Sát Thương Nguyên Tố ổn định.",
        passiveDescEn: "Tấn Công% dồi dào. Nội tại tạo thêm sát thương vật lý diện rộng và tăng Sát Thương Nguyên Tố ổn định.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Dvalin.png"
    },
    {
        rank: 10,
        nameVi: "Chương Nhạc Lang Thang",
        nameEn: "Chương Nhạc Lang Thang",
        subStat: "Sát Thương Bạo Kích",
        isF2P: true,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao. Nhận ngẫu nhiên lượng lớn Tấn Công%, Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố, cung cấp sát thương bùng nổ cực khủng.",
        passiveDescEn: "Sát Thương Bạo Kích cao. Nhận ngẫu nhiên lượng lớn Tấn Công%, Sát Thương Nguyên Tố hoặc Tinh Thông Nguyên Tố, cung cấp sát thương bùng nổ cực khủng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Troupe.png"
    },
    {
        rank: 11,
        nameVi: "Nhật Nguyệt Hạp",
        nameEn: "Nhật Nguyệt Hạp",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Đòn đánh thường trúng địch tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Đòn đánh thường trúng địch tăng sát thương Kỹ Năng Nguyên Tố và Kỹ Năng Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Resurrection.png"
    },
    {
        rank: 12,
        nameVi: "Ngọc Bích Hiến Tế",
        nameEn: "Ngọc Bích Hiến Tế",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Tăng Tinh Thông Nguyên Tố và Tấn Công sau khi dùng kỹ năng, thích hợp cho đội phản ứng.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Tăng Tinh Thông Nguyên Tố và Tấn Công sau khi dùng kỹ năng, thích hợp cho đội phản ứng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Yue.png"
    },
    {
        rank: 13,
        nameVi: "Dòng Chảy Tinh Khiết",
        nameEn: "Dòng Chảy Tinh Khiết",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng mạnh Tấn Công% và tăng Sát Thương Nguyên Tố khi dùng kỹ năng, giảm áp lực nạp Nộ.",
        passiveDescEn: "Tăng mạnh Tấn Công% và tăng Sát Thương Nguyên Tố khi dùng kỹ năng, giảm áp lực nạp Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Catalyst_Vorpal.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Ngày Nổi Gió",
        setNameEn: "Ngày Nổi Gió",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Hiền Nhân Bốc Lửa",
        setNameEn: "Hiền Nhân Bốc Lửa",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Dư Âm Tế Lễ",
        setNameEn: "Dư Âm Tế Lễ",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Sử Ký Đình Đài Cát",
        setNameEn: "Sử Ký Đình Đài Cát",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn",
        setNameEn: "Mix 2 bộ Tấn Công / Ma Nữ / Thợ Săn",
        pieces: 2,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Đoàn Hát Lang Thang Đại Lục",
        setNameEn: "Đoàn Hát Lang Thang Đại Lục",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Mảnh Hài Hòa Bất Thường",
        setNameEn: "Mảnh Hài Hòa Bất Thường",
        pieces: 4,
        sands: [
            "Tấn Công%"
        ],
        goblet: [
            "Sát Thương Nguyên Tố Hỏa"
        ],
        circlet: [
            "Tỷ Lệ Bạo Kích",
            "Sát Thương Bạo Kích"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "Energy Recharge"
        ]
    }
]
};
