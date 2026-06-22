export const zhongli = {
  characterId: "zhongli",
  tier: "A",
  role: "Support",
  recommendedC: "C0",
  tierNoteEn: [],
  tierNoteVi: [],
  stats: null,
  ascensionMats: null,
  talentPriority: [
  "Skill",
  "Burst",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Zhongli Catalyze Team",
        rank: "S",
        description: "Zhongli is a Shield Support. The Electro DMG of Keqing is maximized by Aggravate. Keqing and Fischl apply off-field Electro, while Traveler (Dendro) applies Dendro to trigger Quicken, resulting in Aggravate reactions that boost Keqing's Electro DMG. Zhongli provides a shield and reduces enemy resistance with Shred.",
        members: [
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides a safe environment, shield, and decreases enemy resistance with Shred.",
                weapons: [
                    "Staff of Homa",
                    "Black Tassel"
                ],
                artifacts: [
                    "4pc Deepwood Memories"
                ],
                substats: [
                    "HP%",
                    "HP",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "fischl",
                role: "Support",
                roleDesc: "Electro Sub DPS. Provides continuous off-field Electro damage to trigger Aggravate.",
                weapons: [
                    "Skyward Harp",
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
                characterId: "keqing",
                role: "Support",
                roleDesc: "Electro Main DPS. Multi-stage attacks trigger Aggravate reactions to trigger extra damage.",
                weapons: [
                    "Mistsplitter Reforged",
                    "Iron Sting"
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
                characterId: "traveler",
                role: "Support",
                roleDesc: "Dendro Sub DPS. Applies Dendro off-field via Burst to maintain Quicken status.",
                weapons: [
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Emblem of Severed Fate"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Zhongli Superconduct Team",
        rank: "S",
        description: "Zhongli acts as Shield Support in the team. Eula's physical damage is maximized by Superconduct and aid of teammates. The team revolves around Eula's high damage physical Burst, amplified by Superconduct (triggered by Fischl's Skill) and RES reduction from Zhongli's Tenacity of the Millelith, while Chongyun reduces cooldown with C2.",
        members: [
            {
                characterId: "eula",
                role: "Support",
                roleDesc: "Physical Main DPS. Unleashes massive physical damage via Burst.",
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
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides strong shield and physical RES shred.",
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
                characterId: "chongyun",
                role: "Support",
                roleDesc: "Cryo Sub DPS. Provides Cryo application, reduces cooldowns, and increases ATK speed.",
                weapons: [
                    "Wolf's Gravestone",
                    "Serpent Spine"
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
                characterId: "fischl",
                role: "Support",
                roleDesc: "Electro Sub DPS. Applies off-field Electro to enable Superconduct.",
                weapons: [
                    "Skyward Harp",
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
            }
        ]
    },
    {
        name: "Zhongli Xiao-Jean Team",
        rank: "SS",
        description: "Zhongli provides a safe environment with his shield. Xiao's Elemental Burst damage is maximized by teammates. Geo resonance from Zhongli and Albedo enhances shield strength and damage. Jean acts as a battery and healer, while Zhongli's shield and Tenacity of the Millelith buff ATK.",
        members: [
            {
                characterId: "jean",
                role: "Support",
                roleDesc: "Anemo Support. Heals the party and acts as a battery for Xiao.",
                weapons: [
                    "Skyward Blade",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
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
                role: "Support",
                roleDesc: "Geo Sub DPS. Pairs with Zhongli for Geo Resonance and deals off-field Geo damage.",
                weapons: [
                    "Cinnabar Spindle",
                    "Harbinger of Dawn"
                ],
                artifacts: [
                    "4pc Husk of Opulent Dreams"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "DEF%",
                    "DEF",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides a strong shield and ATK buff via Tenacity of the Millelith.",
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
                characterId: "xiao",
                role: "Support",
                roleDesc: "Anemo Main DPS. Unleashes continuous plunging attacks during Burst.",
                weapons: [
                    "Primordial Jade Winged-Spear",
                    "Deathmatch"
                ],
                artifacts: [
                    "4pc Vermillion Hereafter"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Zhongli Melt Team",
        rank: "S",
        description: "Zhongli acts as Support in the team. Ganyu provides Cryo, while Xiangling's Pyronado triggers Melt for Ganyu. Ganyu's Charge Attack applies Cryo, triggering Melt from Xiangling's Pyronado, while Zhongli's shield and Bennett's Burst provide safety and ATK buff.",
        members: [
            {
                characterId: "bennett",
                role: "Support",
                roleDesc: "Pyro Support. Heals and provides massive ATK buff.",
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
            },
            {
                characterId: "xiangling",
                role: "Support",
                roleDesc: "Pyro Sub DPS. Deals massive Pyro damage off-field with Pyronado.",
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
                    "Energy Recharge"
                ]
            },
            {
                characterId: "ganyu",
                role: "Support",
                roleDesc: "Cryo Main DPS. Triggers Melt on Pyro-affected enemies.",
                weapons: [
                    "Amos' Bow",
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
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Offers shield and ATK buffs.",
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
        name: "Zhongli Permafrost Team #1",
        rank: "S",
        description: "Zhongli acts as Shield Support in the team. Ganyu's Cryo is main DPS, with constant Hydro application from Mona to trigger Freezing. Ganyu's Cryo attacks combined with Mona's Hydro application keep enemies frozen, while Venti groups them and Zhongli provides a safe shield and ATK buff.",
        members: [
            {
                characterId: "mona",
                role: "Support",
                roleDesc: "Hydro Support. Triggers Freeze and increases team damage via Omen.",
                weapons: [
                    "Skyward Atlas",
                    "Favonius Codex",
                    "Thrilling Tales of Dragon Slayers"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            },
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides shield and team buffs.",
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
                characterId: "ganyu",
                role: "Support",
                roleDesc: "Cryo Main DPS. Deals massive AoE Cryo damage via Charged Attacks.",
                weapons: [
                    "Amos' Bow",
                    "Prototype Crescent"
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
                characterId: "venti",
                role: "Support",
                roleDesc: "Anemo Support. Gathers enemies and triggers Swirl reactions.",
                weapons: [
                    "Elegy for the End"
                ],
                artifacts: [
                    "4pc Viridescent Venerer"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Zhongli Vaporize Team",
        rank: "SS",
        description: "A powerful team that maximizes Hu Tao's damage through Vaporize reactions, supported by Zhongli's shield and Kazuha's buffs. Hu Tao's Pyro damage is amplified by Vaporize triggered by Xingqiu's continuous Hydro application. Kazuha groups enemies, reduces Pyro RES, and provides Elemental Mastery buff. Zhongli provides a safe shield and ATK boost via Tenacity of the Millelith.",
        members: [
            {
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Groups enemies, shreds Pyro RES, and buffs elemental damage.",
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
                roleDesc: "Shield Support. Provides strong shield and buffs ATK via Tenacity of the Millelith.",
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
                characterId: "xingqiu",
                role: "Support",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro application to enable Vaporize.",
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
                characterId: "hu-tao",
                role: "Support",
                roleDesc: "Pyro Main DPS. Vaporizes attacks on enemies affected by Hydro.",
                weapons: [
                    "Staff of Homa",
                    "Deathmatch"
                ],
                artifacts: [
                    "4pc Crimson Witch of Flames"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Elemental Mastery",
                    "ATK%"
                ]
            }
        ]
    },
    {
        name: "Ayaka Permafrost Team",
        rank: "S",
        description: "A powerful team combining Ayaka as main Cryo DPS, with Mona applying Hydro, Kazuha grouping and shredding resistance, and Zhongli for shielding. Focuses on freezing enemies and dealing Freeze reactions.",
        members: [
            {
                characterId: "zhongli",
                role: "Support",
                roleDesc: "Shield Support. Provides a safe shield for the team.",
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
                characterId: "kazuha",
                role: "Support",
                roleDesc: "Anemo Support. Shreds resistance and provides elemental damage buffs.",
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
                characterId: "ayaka",
                role: "Support",
                roleDesc: "Cryo Main DPS. Deals massive Cryo damage with Burst.",
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
                characterId: "mona",
                role: "Support",
                roleDesc: "Hydro Support. Applies Hydro off-field and increases team damage.",
                weapons: [
                    "Skyward Atlas",
                    "Favonius Codex",
                    "Thrilling Tales of Dragon Slayers"
                ],
                artifacts: [
                    "4pc Noblesse Oblige"
                ],
                substats: [
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG",
                    "ATK%"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Trượng Hộ Ma",
        nameEn: "Trượng Hộ Ma",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Dòng phụ Sát Thương Bạo Kích cao và khả năng chuyển hóa HP thành Tấn Công giúp gia tăng đáng kể sát thương của Kỹ Năng Nộ.",
        passiveDescEn: "Dòng phụ Sát Thương Bạo Kích cao và khả năng chuyển hóa HP thành Tấn Công giúp gia tăng đáng kể sát thương của Kỹ Năng Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Homa.png"
    },
    {
        rank: 2,
        nameVi: "Bi Ca Lumidouce",
        nameEn: "Bi Ca Lumidouce",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng lớn Hiệu Quả Nạp và buff Tinh Thông Nguyên Tố/Tấn Công cho toàn đội sau khi dùng Kỹ Năng Nguyên Tố, tuy nhiên sát thương Nộ sẽ thấp hơn.",
        passiveDescEn: "Cung cấp lượng lớn Hiệu Quả Nạp và buff Tinh Thông Nguyên Tố/Tấn Công cho toàn đội sau khi dùng Kỹ Năng Nguyên Tố, tuy nhiên sát thương Nộ sẽ thấp hơn.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Muguet.png"
    },
    {
        rank: 3,
        nameVi: "Hòa Phát Diên",
        nameEn: "Hòa Phát Diên",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công khi đánh trúng kẻ địch, giúp tích tầng trước khi thả Q.",
        passiveDescEn: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Nội tại tăng Tấn Công khi đánh trúng kẻ địch, giúp tích tầng trước khi thả Q.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Morax.png"
    },
    {
        rank: 4,
        nameVi: "Xương Sống Thiên Không",
        nameEn: "Xương Sống Thiên Không",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp lượng lớn Hiệu Quả Nạp và thêm Tỷ Lệ Bạo Kích. Nội tại tạo thêm các đòn đánh AoE nhỏ sau khi dùng Kỹ Năng Nộ.",
        passiveDescEn: "Cung cấp lượng lớn Hiệu Quả Nạp và thêm Tỷ Lệ Bạo Kích. Nội tại tạo thêm các đòn đánh AoE nhỏ sau khi dùng Kỹ Năng Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Dvalin.png"
    },
    {
        rank: 5,
        nameVi: "Giáo Nịnh Thần",
        nameEn: "Giáo Nịnh Thần",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản và Tấn Công% cao nhưng yêu cầu duy trì khiên để nhận toàn bộ nội tại. Rất phù hợp với khiên tự tạo của Zhongli.",
        passiveDescEn: "Tấn Công cơ bản và Tấn Công% cao nhưng yêu cầu duy trì khiên để nhận toàn bộ nội tại. Rất phù hợp với khiên tự tạo của Zhongli.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Kunwu.png"
    },
    {
        rank: 6,
        nameVi: "Hủy Diệt",
        nameEn: "Hủy Diệt",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản và Tấn Công% cực cao sau khi dùng Kỹ Năng Nguyên Tố. Tốt cho sát thương nhưng cần thời gian đứng sân để kích hoạt.",
        passiveDescEn: "Tấn Công cơ bản và Tấn Công% cực cao sau khi dùng Kỹ Năng Nguyên Tố. Tốt cho sát thương nhưng cần thời gian đứng sân để kích hoạt.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Santika.png"
    },
    {
        rank: 7,
        nameVi: "Lao Xiên Cá",
        nameEn: "Lao Xiên Cá",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và sát thương của Kỹ Năng Nộ cùng Hiệu Quả Nạp. Lựa chọn F2P tuyệt vời giúp tối ưu hóa chu kỳ ra chiêu.",
        passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và sát thương của Kỹ Năng Nộ cùng Hiệu Quả Nạp. Lựa chọn F2P tuyệt vời giúp tối ưu hóa chu kỳ ra chiêu.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Mori.png"
    },
    {
        rank: 8,
        nameVi: "Thương Quyết Chiến",
        nameEn: "Thương Quyết Chiến",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích và thêm Tấn Công khi có kẻ địch ở gần. Thích hợp để build sát thương nhưng ít hỗ trợ nạp năng lượng.",
        passiveDescEn: "Cung cấp Tỷ Lệ Bạo Kích và thêm Tấn Công khi có kẻ địch ở gần. Thích hợp để build sát thương nhưng ít hỗ trợ nạp năng lượng.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Gladiator.png"
    },
    {
        rank: 9,
        nameVi: "Đoạn Thảo Kính Phạt",
        nameEn: "Đoạn Thảo Kính Phạt",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Hiệu Quả Nạp cực cao và chuyển hóa dòng nạp thành Tấn Công%. Rất dễ bị thừa Nạp, nên cân nhắc kết hợp với đồng hồ Nạp nếu cần.",
        passiveDescEn: "Hiệu Quả Nạp cực cao và chuyển hóa dòng nạp thành Tấn Công%. Rất dễ bị thừa Nạp, nên cân nhắc kết hợp với đồng hồ Nạp nếu cần.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Narukami.png"
    },
    {
        rank: 10,
        nameVi: "Thương Thiên Nham",
        nameEn: "Thương Thiên Nham",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Đạt hiệu quả cực cao trong đội hình thuần Liyue.",
        passiveDescEn: "Tăng Tỷ Lệ Bạo Kích và Tấn Công% dựa trên số lượng nhân vật Liyue trong đội. Đạt hiệu quả cực cao trong đội hình thuần Liyue.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Lapis.png"
    },
    {
        rank: 11,
        nameVi: "Thương Hắc Nham",
        nameEn: "Thương Hắc Nham",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Sát Thương Bạo Kích. Nội tại tăng Tấn Công sau khi hạ gục kẻ địch, nhưng không ổn định khi đối đầu với Boss đơn mục tiêu.",
        passiveDescEn: "Cung cấp Sát Thương Bạo Kích. Nội tại tăng Tấn Công sau khi hạ gục kẻ địch, nhưng không ổn định khi đối đầu với Boss đơn mục tiêu.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Blackrock.png"
    },
    {
        rank: 12,
        nameVi: "Mũi Nhọn Của Gió",
        nameEn: "Mũi Nhọn Của Gió",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí cán dài F2P cung cấp Tấn Công% và nội tại tăng Tấn Công% sau khi kích hoạt phản ứng nguyên tố. Tạm ổn cho lối chơi sát thương Nộ.",
        passiveDescEn: "Vũ khí cán dài F2P cung cấp Tấn Công% và nội tại tăng Tấn Công% sau khi kích hoạt phản ứng nguyên tố. Tạm ổn cho lối chơi sát thương Nộ.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Windvane.png"
    },
    {
        rank: 13,
        nameVi: "Thương Tây Phong",
        nameEn: "Thương Tây Phong",
        subStat: "Hiệu Quả Nạp Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Hiệu Quả Nạp cao và sinh hạt nhân lượng cho toàn đội. Cần ưu tiên chỉ số Tỷ Lệ Bạo Kích để dễ kích hoạt nội tại.",
        passiveDescEn: "Hiệu Quả Nạp cao và sinh hạt nhân lượng cho toàn đội. Cần ưu tiên chỉ số Tỷ Lệ Bạo Kích để dễ kích hoạt nội tại.",
        iconUrl: "/images/weapons/UI_EquipIcon_Pole_Zephyrus.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Giáo Quan",
        setNameEn: "Giáo Quan",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Ký Ức Rừng Sâu",
        setNameEn: "Ký Ức Rừng Sâu",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc",
        setNameEn: "Mix 2 bộ Vầng Sáng Vourukasha & 2 bộ Thiên Nham Vững Chắc",
        pieces: 2,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Thiên Nham Vững Chắc",
        setNameEn: "Thiên Nham Vững Chắc",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    },
    {
        setNameVi: "Phiến Đá Lâu Đời",
        setNameEn: "Phiến Đá Lâu Đời",
        pieces: 4,
        sands: [
            "HP%"
        ],
        goblet: [
            "HP%"
        ],
        circlet: [
            "HP%",
            "Tỷ Lệ Bạo Kích"
        ],
        subStatsPriority: [
            "HP%",
            "HP",
            "Energy Recharge"
        ]
    }
]
};
