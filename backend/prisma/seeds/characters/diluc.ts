export const diluc = {
  characterId: "diluc",
  tier: null,
  role: null,
  recommendedC: null,
  tierNoteEn: [],
  tierNoteVi: [],
  talentPriority: [
  "Normal Attack",
  "Skill",
  "Burst"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Diluc Vaporize Team #1",
        rank: "S",
        description: "Diluc's Pyro DMG is amplified by Vaporization reactions triggered by Xingqiu's continuous Hydro application, supported by Kazuha's elemental damage buff and resistance shred, and Zhongli's shielding and ATK buff.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                roleDesc: "Xingqiu's Elemental Burst attaches Hydro continuously, enabling Vaporization with Diluc's Pyro.",
                weapons: [
                    "Sacrificial Sword"
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
                roleDesc: "Groups enemies, provides DMG buff, and reduces enemy Elemental Resistance.",
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
                roleDesc: "Provides a strong shield and increases team ATK with Tenacity of the Millelith.",
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
        name: "Diluc Vaporize Team #2",
        rank: "S",
        description: "Diluc's Pyro DMG is amplified by Vaporization triggered by Xingqiu's Hydro application. Venti groups enemies and spreads Hydro, while Zhongli provides shields and ATK buff via Tenacity of the Millelith.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporization with Diluc.",
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
                characterId: "venti",
                role: "Sub DPS",
                roleDesc: "Elemental Burst groups enemies and spreads Hydro from Xingqiu.",
                weapons: [
                    "Elegy for the End",
                    "The Stringless"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield provides safety and ATK buff via Tenacity of the Millelith.",
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
        name: "Diluc Vaporize Team #3",
        rank: "S",
        description: "Diluc is a Main DPS in the team. Diluc's DMG is amplified by Vaporization. Use Hydro from Xingqiu to enable Vaporize for Diluc. Albedo and Zhongli provide Geo resonance and shielding.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc's DMG is amplified by Vaporization.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                roleDesc: "Xingqiu's Elemental Burst continuously applies Hydro to trigger Vaporization with Diluc.",
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
                characterId: "albedo",
                role: "Sub DPS",
                roleDesc: "Albedo pairs with Zhongli for Geo resonance. With Archaic Petra, picking up a crystallize shard boosts team's Pyro DMG.",
                weapons: [
                    "Cinnabar Spindle",
                    "Harbinger of Dawn"
                ],
                artifacts: [
                    "2pc Archaic Petra"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "Energy Recharge",
                    "DEF"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Zhongli's shield provides a safe environment and, with Tenacity of the Millelith, increases team ATK.",
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
        name: "Diluc Vaporize Plunge",
        rank: "S",
        description: "A team that amplifies Diluc's plunging attacks with Xianyun, enabling consistent Vaporize reactions and high damage. Furina provides massive DMG bonuses via HP fluctuation, while Bennett supplies healing and ATK buffs.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc is the main DPS, his DMG is amplified by the Plunging Attack in this team.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                characterId: "furina",
                role: "Sub DPS",
                roleDesc: "Furina's Burst provides DMG increase based on HP changes of allies. Her Skill drains allies' HP, which is restored by the healer.",
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
                characterId: "xianyun",
                role: "Support",
                roleDesc: "Xianyun provides healing to team members and boosts Diluc's Plunging Attack damage.",
                weapons: [
                    "Crane's Echoing Call",
                    "Oathsworn Eye"
                ],
                artifacts: [
                    "4pc Song of Days Past"
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
                roleDesc: "Bennett's Burst provides huge ATK buff and healing to other members.",
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
        name: "Diluc Vaporize Team",
        rank: "S",
        description: "Diluc's DMG is amplified by Vaporization with Xingqiu's Hydro application, Sucrose provides Elemental Mastery buff, and Bennett provides ATK buff and healing.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "DMG amplified by Vaporization.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                roleDesc: "Elemental Burst applies Hydro continuously to trigger Vaporize.",
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
                role: "Sub DPS",
                roleDesc: "Provides Elemental Mastery bonus to increase Vaporize DMG.",
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
                roleDesc: "Elemental Burst provides huge ATK buff and healing.",
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
        name: "Diluc Melt Team",
        rank: "S",
        description: "Diluc's damage is amplified by Melt reactions, with Ganyu providing off-field Cryo, Kazuha buffing and grouping, and Diona shielding and healing.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc's DMG is amplified by Melting.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                characterId: "ganyu",
                role: "Sub DPS",
                roleDesc: "Ganyu deals DMG mainly by Elemental Burst at backstage. Ganyu Cryo attachment reacts with Pyro attachment from Diluc to trigger Melt.",
                weapons: [
                    "Skyward Harp",
                    "The Stringless"
                ],
                artifacts: [
                    "2pc Blizzard Strayer",
                    "2pc Noblesse Oblige"
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
                roleDesc: "Kazuha can assist the team by grouping enemies together, applying crowd control, provide DMG buff to teammates and reduce Elemental Resistance of enemies.",
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
                roleDesc: "Diona's shield provides safe environment for team members, and helps boost the recharge of Ganyu's Elemental Burst.",
                weapons: [
                    "Sacrificial Bow",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Maiden Beloved"
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
        name: "Diluc Melt Team #2",
        rank: "S",
        description: "Diluc is the main DPS, his DMG amplified by Melt. Ayaka provides off-field Cryo via Burst for consistent melts. Sucrose boosts team Elemental Mastery and shreds resistance. Diona shields, heals, and helps battery Ayaka.",
        members: [
            {
                characterId: "diluc",
                role: "Main DPS",
                roleDesc: "Diluc's DMG is amplified by Melt in this team.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                characterId: "ayaka",
                role: "Sub DPS",
                roleDesc: "Ayaka deals DMG mainly by Elemental Burst at backstage. Her Cryo attachment reacts with Pyro from Diluc to trigger Melt.",
                weapons: [
                    "Mistsplitter Reforged",
                    "Amenoma Kageuchi"
                ],
                artifacts: [
                    "2pc Blizzard Strayer",
                    "2pc Noblesse Oblige"
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
                role: "Sub DPS",
                roleDesc: "Sucrose provides Elemental Mastery bonus to team members, increasing the DMG of Melt.",
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
                roleDesc: "Diona's shield provides a safe environment for team members and helps boost the recharge of Ayaka's Elemental Burst.",
                weapons: [
                    "Sacrificial Bow",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Maiden Beloved"
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
        nameVi: "Hải Đăng Bờ Biển Lau",
        nameEn: "Hải Đăng Bờ Biển Lau",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.",
        passiveDescEn: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích cực tốt. Khi Kỹ Năng Nguyên Tố đánh trúng địch hoặc nhận sát thương sẽ tăng mạnh Tấn Công%, cực kỳ tối ưu cho Diluc đứng sân.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png"
    },
    {
        rank: 2,
        nameVi: "Xích Giác Phá Thạch Đao",
        nameEn: "Xích Giác Phá Thạch Đao",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.",
        passiveDescEn: "Cung cấp lượng khổng lồ Sát Thương Bạo Kích. Mặc dù Diluc không tận dụng nhiều từ quy đổi Phòng Thủ, chỉ số bạo kích thuần vẫn giúp nó là lựa chọn cực mạnh.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png"
    },
    {
        rank: 3,
        nameVi: "Thiên Dương Rực Lửa",
        nameEn: "Thiên Dương Rực Lửa",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.",
        passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và 20% sát thương Kỹ Năng Nguyên Tố. Sau khi kích hoạt Thiêu Đốt hoặc dùng Nộ sẽ tăng mạnh Sát Thương Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png"
    },
    {
        rank: 4,
        nameVi: "Phán Quyết",
        nameEn: "Phán Quyết",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.",
        passiveDescEn: "Tấn công cơ bản cao và Tỷ Lệ Bạo Kích dồi dào. Sau phản ứng Kết Tinh sẽ tăng Sát Thương Nguyên Tố cho Diluc, thích hợp khi đi cùng đồng đội hệ Nham.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png"
    },
    {
        rank: 5,
        nameVi: "Kiếm Li Cốt",
        nameEn: "Kiếm Li Cốt",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.",
        passiveDescEn: "Vũ khí Battle Pass cực mạnh cho Diluc. Tăng sát thương đầu ra theo thời gian đứng sân, khuyên dùng đi kèm nhân vật tạo khiên để giữ tầng tích lũy.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png"
    },
    {
        rank: 6,
        nameVi: "Nanh Sơn Vương",
        nameEn: "Nanh Sơn Vương",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích. Sau khi Kỹ Năng Nguyên Tố đánh trúng kẻ địch sẽ tăng Tấn Công% và Tăng Sát Thương Nguyên Tố cho toàn bộ kỹ năng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_EmeraldSword.png"
    },
    {
        rank: 7,
        nameVi: "Đường Cùng Của Sói",
        nameEn: "Đường Cùng Của Sói",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.",
        passiveDescEn: "Lượng Tấn Công% khổng lồ giúp Diluc gây sát thương ổn định. Khi đánh trúng địch có HP dưới 30% sẽ buff thêm lượng lớn Tấn Công cho cả đội.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png"
    },
    {
        rank: 8,
        nameVi: "Kiếm Vô Công",
        nameEn: "Kiếm Vô Công",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.",
        passiveDescEn: "Tăng hiệu quả Khiên và Tấn Công% cộng dồn khi đánh trúng địch. Yêu cầu bắt buộc có khiên (như Zhongli) để phát huy tối đa sức mạnh.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png"
    },
    {
        rank: 9,
        nameVi: "Tiếng Gió Trong Rừng Thông",
        nameEn: "Tiếng Gió Trong Rừng Thông",
        subStat: "Tăng Sát Thương Vật Lý",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.",
        passiveDescEn: "Chỉ số ATK cơ bản cực cao và nội tại tăng Tấn Công%, Tốc Độ Tấn Công khi tích đủ tầng, dù dòng phụ Sát Thương Vật Lý bị lãng phí.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Widsith.png"
    },
    {
        rank: 10,
        nameVi: "Vũ Tài",
        nameEn: "Vũ Tài",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.",
        passiveDescEn: "Cực kỳ mạnh trong các đội hình phản ứng Bốc Hơi nhờ lượng Tinh Thông Nguyên Tố lớn và tăng sát thương lên kẻ địch bị ấn Thủy.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Perdue.png"
    },
    {
        rank: 11,
        nameVi: "Đóa Hoa Tôn Màu Thép",
        nameEn: "Đóa Hoa Tôn Màu Thép",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.",
        passiveDescEn: "Lựa chọn F2P Event hoàn hảo cho đội phản ứng. Tăng Tinh Thông Nguyên Tố và Tấn Công% sau khi dùng Kỹ Năng Nguyên Tố.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Fleurfair.png"
    },
    {
        rank: 12,
        nameVi: "Bóng Tối Thủy Triều",
        nameEn: "Bóng Tối Thủy Triều",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.",
        passiveDescEn: "Vũ khí rèn Fontaine cung cấp lượng lớn Tấn Công% sau khi nhận hồi máu. Dễ dàng kích hoạt và tối ưu khi đi cùng Healer.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Vorpal.png"
    },
    {
        rank: 13,
        nameVi: "Hắc Nham Trảm Đao",
        nameEn: "Hắc Nham Trảm Đao",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.",
        passiveDescEn: "Cung cấp Sát Thương Bạo Kích tốt giúp dễ build chỉ số. Nội tại tăng Tấn Công khi hạ gục kẻ địch, thích hợp khi đấu nhiều quái lẻ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Blackrock.png"
    },
    {
        rank: 14,
        nameVi: "Thiên Không Kiêu Ngạo",
        nameEn: "Thiên Không Kiêu Ngạo",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.",
        passiveDescEn: "Cung cấp Hiệu Quả Nạp giúp spam Nộ mượt mà. Nội tại tăng nhẹ sát thương và tạo ra các lưỡi đao chân không gây dame vật lý.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Dvalin.png"
    },
    {
        rank: 15,
        nameVi: "Đao Chấn Động",
        nameEn: "Đao Chấn Động",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.",
        passiveDescEn: "Vũ khí rèn Natlan cung cấp Tấn Công%. Thích hợp dùng trong các đội hình phản ứng có liên quan hệ Thảo để buff sát thương.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Isikhulu.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Diệm Liệt Ma Nữ Cháy Rực",
        setNameEn: "Diệm Liệt Ma Nữ Cháy Rực",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
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
            "Elemental Mastery",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Giấc Mộng Hoàng Kim",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
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
            "Elemental Mastery",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        setNameEn: "Mix 2 bộ Ma Nữ / Tinh Thông / Tấn Công",
        pieces: 2,
        sands: [
            "Tinh Thông Nguyên Tố",
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
            "Elemental Mastery",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Lễ Bế Mạc Của Giác Đấu Sĩ",
        setNameEn: "Lễ Bế Mạc Của Giác Đấu Sĩ",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
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
            "Elemental Mastery",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Thợ Săn Marechaussee",
        pieces: 4,
        sands: [
            "Tinh Thông Nguyên Tố",
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
            "Elemental Mastery",
            "Energy Recharge"
        ]
    }
]
};
