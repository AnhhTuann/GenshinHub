export const mavuika = {
  characterId: "mavuika",
  tier: "SS",
  role: "Main DPS, Sub DPS",
  recommendedC: "C0",
  tierNoteEn: [],
  tierNoteVi: [],
  stats: null,
  ascensionMats: null,
  talentPriority: [
  "Burst",
  "Skill",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Mavuika Vaporization Team #1",
        rank: "SS",
        description: "A high-damage Vaporize team centered on Mavuika's empowered Burst. Mavuika's Burst is charged via Nightsoul points and normal attacks, then applies hydro-infused Pyro for massive DMG. Xilonen shreds enemy elemental RES and heals, Furina provides off-field hydro and buffs, enabling Mavuika to trigger Vaporize.",
        members: [
            {
                characterId: "xilonen",
                role: "Main DPS, Sub DPS",
                roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "DEF%",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "bennett",
                role: "Main DPS, Sub DPS",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
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
            },
            {
                characterId: "furina",
                role: "Main DPS, Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
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
            }
        ]
    },
    {
        name: "Mavuika Overload Team #1",
        rank: "SS",
        description: "An overload team featuring Mavuika as main DPS, with Ororon, Chevreuse, and Bennett providing support and healing. Leverage Chevreuse's passive to reduce enemy Pyro and Electro RES via Overload, while Ororon provides off-field damage and energy, and Bennett buffs ATK.",
        members: [
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Main DPS. Nightsoul state normal attacks and coordinated attacks via Elemental Burst.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
                weapons: [
                    "Staff of Homa",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "ororon",
                role: "Main DPS, Sub DPS",
                roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
                weapons: [
                    "Elegy for the End",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "bennett",
                role: "Main DPS, Sub DPS",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
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
        name: "Mavuika Overload Vanguard",
        rank: "S",
        description: "An Overload team centered around Mavuika's high burst damage, supported by Ororon's off-field attacks, Chevreuse's RES shred and ATK buff, and Iansan's ATK buff. Trigger Overload to activate Chevreuse's RES shred, boosting Mavuika's Pyro damage, while Ororon's Electro damage contributes. Iansan buffs ATK.",
        members: [
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Main DPS. Deals high on-field Pyro damage and coordinates attacks during her Burst.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "ororon",
                role: "Main DPS, Sub DPS",
                roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
                weapons: [
                    "Elegy for the End",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "iansan",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: [
                    "Calamity Queller",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "HP%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
                weapons: [
                    "Staff of Homa",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Mavuika Overload",
        rank: "SS",
        description: "An Overload team with Chevreuse's RES shred and ATK buff, maximizing Clorinde and Mavuika's damage. Leverage Overload reactions to trigger Chevreuse's Pyro and Electro RES shred and ATK buff, while Ororon provides off-field Electro damage and energy.",
        members: [
            {
                characterId: "ororon",
                role: "Main DPS, Sub DPS",
                roleDesc: "Electro Support. Triggers Electro-related reactions and off-field attacks. Solves Energy needs.",
                weapons: [
                    "Elegy for the End",
                    "Favonius Warbow"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "clorinde",
                role: "Main DPS, Sub DPS",
                roleDesc: "Electro Main DPS. Infuses normal attacks with Electro and triggers reactions.",
                weapons: [
                    "Absolution",
                    "The Black Sword"
                ],
                artifacts: [
                    "4pc Fragment of Harmonic Whimsy"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
                weapons: [
                    "Staff of Homa",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Mavuika Vaporization Team #2",
        rank: "S",
        description: "Chasca acts as the Main DPS, with Furina and Mavuika applying Hydro and Pyro for Vaporize reactions. Bennett provides ATK buffs and healing. This team leverages Chasca's ability to adapt her damage based on teammates' elements, combining Furina's continuous Hydro application with Mavuika's off-field Pyro to enable frequent Vaporize reactions.",
        members: [
            {
                characterId: "bennett",
                role: "Main DPS, Sub DPS",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
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
            },
            {
                characterId: "chasca",
                role: "Main DPS, Sub DPS",
                roleDesc: "Anemo Main DPS. Adapts her damage based on teammates' elements to trigger reactions.",
                weapons: [
                    "Astral Vulture's Crimson Plumage",
                    "First Great Magic"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Sub DPS. Enables Pyro element infusion and triggers Vaporize reactions.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
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
                role: "Main DPS, Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
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
            }
        ]
    },
    {
        name: "Mavuika Overload Team #2",
        rank: "S",
        description: "Overload team featuring Varesa as Main DPS, Mavuika as Sub DPS, Chevreuse and Iansan providing support and healing. Shreds enemy resistance to Pyro and Electro after Overload, while Iansan provides a massive ATK buff, maximizing Varesa and Mavuika's damage.",
        members: [
            {
                characterId: "varesa",
                role: "Main DPS, Sub DPS",
                roleDesc: "Electro Main DPS. Deals continuous Electro damage to trigger Overload reactions.",
                weapons: [
                    "Tulaytullah's Remembrance",
                    "The Widsith"
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
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Sub DPS. Deals coordinated attacks via Burst to trigger Overload.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "iansan",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: [
                    "Calamity Queller",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "HP%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "chevreuse",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro/Electro RES Shred & Healing. Buffs team ATK% after triggering Overload.",
                weapons: [
                    "Staff of Homa",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Tenacity of the Millelith"
                ],
                substats: [
                    "HP%",
                    "Energy Recharge"
                ]
            }
        ]
    },
    {
        name: "Mavuika Vaporization",
        rank: "SS",
        description: "A top-tier Vaporize team featuring Mualani as main DPS, Mavuika as off-field Pyro applier, Xilonen for RES shred and healing, and Citlali for shielding and further resistance reduction via Melt reactions.",
        members: [
            {
                characterId: "mualani",
                role: "Main DPS, Sub DPS",
                roleDesc: "Hydro Main DPS. Deals high on-field Vaporize damage.",
                weapons: [
                    "Surf's Up",
                    "Sacrificial Jade"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Sub DPS. Provides consistent off-field Pyro application to enable Vaporize.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            },
            {
                characterId: "xilonen",
                role: "Main DPS, Sub DPS",
                roleDesc: "Geo Shredder & Healer. Shreds enemy Elemental resistance and provides healing.",
                weapons: [
                    "Peak Patrol Song",
                    "Favonius Sword"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "DEF%",
                    "CRIT Rate",
                    "HP%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "citlali",
                role: "Main DPS, Sub DPS",
                roleDesc: "Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.",
                weapons: [
                    "Starcaller's Watch",
                    "Sacrificial Fragments"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            }
        ]
    },
    {
        name: "Mavuika Melt",
        rank: "SS",
        description: "A melt team leveraging Mavuika's high Pyro damage with Citlali's Cryo application and Furina's damage buffs, all supported by Bennett's ATK buff and healing. Trigger Melt by applying elements to enemies via Citlali, then use Mavuika's empowered Burst for massive Pyro damage. Furina provides Hydro, freeze, and Bennett heals and buffs ATK.",
        members: [
            {
                characterId: "furina",
                role: "Main DPS, Sub DPS",
                roleDesc: "Hydro Sub DPS. Provides off-field Hydro damage and huge damage buffs to the team.",
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
                characterId: "citlali",
                role: "Main DPS, Sub DPS",
                roleDesc: "Cryo Shield & Support. Provides shield and reduces resistance via Melt reactions.",
                weapons: [
                    "Starcaller's Watch",
                    "Sacrificial Fragments"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "Elemental Mastery",
                    "Energy Recharge",
                    "CRIT Rate",
                    "CRIT DMG"
                ]
            },
            {
                characterId: "bennett",
                role: "Main DPS, Sub DPS",
                roleDesc: "ATK Buffer & Healer. Provides massive ATK buff and constant healing.",
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
            },
            {
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Main DPS. Deals high on-field Melt damage with Citlali's Cryo application.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Elemental Mastery"
                ]
            }
        ]
    },
    {
        name: "Mavuika Burning",
        rank: "S",
        description: "A Burning team where Mavuika and Emilie maintain the Burning reaction, boosting Kinich's damage with constant Pyro and Dendro application. Sustain Burning with Mavuika's off-field Pyro and Emilie's Dendro, allowing Kinich to trigger powerful Nightsoul Cannon blasts.",
        members: [
            {
                characterId: "emilie",
                role: "Main DPS, Sub DPS",
                roleDesc: "Off-field Dendro DPS. Amplifies Burning reaction damage and deals high consistent damage.",
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
                characterId: "mavuika",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Sub DPS. Applies consistent off-field Pyro and triggers Burning to enable Kinich.",
                weapons: [
                    "A Thousand Blazing Suns",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%",
                    "Energy Recharge"
                ]
            },
            {
                characterId: "kinich",
                role: "Main DPS, Sub DPS",
                roleDesc: "On-field Dendro DPS. Uses his Elemental Skill to trigger loop shots and deals massive damage.",
                weapons: [
                    "Fang of the Mountain King",
                    "Serpent Spine"
                ],
                artifacts: [
                    "4pc Obsidian Codex"
                ],
                substats: [
                    "CRIT DMG",
                    "CRIT Rate",
                    "ATK%"
                ]
            },
            {
                characterId: "iansan",
                role: "Main DPS, Sub DPS",
                roleDesc: "Pyro Support/Healer. Buffs teammates' ATK based on her max HP. Provides healing.",
                weapons: [
                    "Calamity Queller",
                    "Favonius Lance"
                ],
                artifacts: [
                    "4pc Scroll of the Hero of Cinder City"
                ],
                substats: [
                    "HP%",
                    "CRIT Rate",
                    "Energy Recharge"
                ]
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Thiên Dương Rực Lửa",
        nameEn: "A Thousand Blazing Suns",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Cung cấp Tỷ Lệ Bạo Kích cao và lượng buff Tấn Công% khổng lồ sau khi dùng Kỹ Năng Nguyên Tố, đồng bộ hoàn hảo với Kỹ Năng Nộ. Lựa chọn trấn phái tối ưu cho sát thương cá nhân và hỗ trợ đồng đội.",
        passiveDescEn: "Provides high CRIT Rate and a massive ATK% buff after using Skill, synchronized with Burst. Best-in-slot for personal damage and team support.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_RadianceSword.png"
    },
    {
        rank: 2,
        nameVi: "Xích Giác Phá Thạch Đao",
        nameEn: "Redhorn Stonethresher",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Sát Thương Bạo Kích cao và chuyển hóa Phòng Ngự thành sát thương Đánh Thường/Trọng Kích. Có thể dùng tốt nếu có nhiều dòng phụ Phòng Ngự, tuy nhiên khả năng phối hợp bị hạn chế.",
        passiveDescEn: "High CRIT DMG and converts DEF to Normal/Charged Attack damage. Viable if you have high DEF substats, but synergy is limited.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Itadorimaru.png"
    },
    {
        rank: 3,
        nameVi: "Phán Quyết",
        nameEn: "Verdict",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản và Tỷ Lệ Bạo Kích cao. Sau khi có phản ứng Kết Tinh gần đó, gia tăng sát thương Kỹ Năng Nguyên Tố và Nộ. Hoạt động tốt khi đi cùng đồng đội hệ Nham.",
        passiveDescEn: "High base ATK and CRIT Rate. After a crystallize reaction nearby, boosts Skill and Burst damage. Works if you have a Geo teammate.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_GoldenVerdict.png"
    },
    {
        rank: 4,
        nameVi: "Hải Đăng Bờ Biển Lau",
        nameEn: "Beacon of the Reed Sea",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và nội tại tăng Tấn Công% kích hoạt khi chịu sát thương hoặc dùng Kỹ Năng Nguyên Tố. Ổn định và rất dễ duy trì.",
        passiveDescEn: "High CRIT Rate and an ATK% passive that activates on taking damage or using Skill. Consistent and easy to maintain.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Deshret.png"
    },
    {
        rank: 5,
        nameVi: "Đóa Hoa Tôn Màu Thép",
        nameEn: "Mailed Flower",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Lựa chọn F2P cung cấp Tinh Thông Nguyên Tố và buff Tấn Công% sau khi kích hoạt phản ứng liên quan đến Thủy/Băng. Thích hợp cho các đội hình Bốc Hơi/Tan Chảy.",
        passiveDescEn: "F2P option with Elemental Mastery and an ATK% buff after triggering Hydro/Cryo reactions. Good for Melt/Vaporize teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Fleurfair.png"
    },
    {
        rank: 6,
        nameVi: "Đường Cùng Của Sói",
        nameEn: "Wolf's Gravestone",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tấn Công cơ bản cao và buff Tấn Công% cho toàn đội khi đánh trúng kẻ địch thấp máu. Phù hợp cho lượng sát thương thuần và hỗ trợ đồng đội.",
        passiveDescEn: "High base ATK and team-wide ATK% buff on hitting low-HP enemies. Solid for raw damage and supporting allies.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png"
    },
    {
        rank: 7,
        nameVi: "Kiếm Vô Công",
        nameEn: "The Unforged",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tăng hiệu quả khiên và Tấn Công%. Yêu cầu có nhân vật tạo khiên để tối đa hóa nội tại. Hoạt động tốt nếu đi cùng Zhongli hoặc tương đương.",
        passiveDescEn: "Shield strength and ATK% scaling. Requires a shielder to maximize the passive. Works if paired with Zhongli or similar.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kunwu.png"
    },
    {
        rank: 8,
        nameVi: "Kiếm Li Cốt",
        nameEn: "Serpent Spine",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R5",
        passiveDescVi: "Tăng Sát Thương theo thời gian đứng sân qua các tầng cộng dồn. Tinh luyện cao cực kỳ mạnh, nhưng cần tránh nhận sát thương để duy trì các tầng buff.",
        passiveDescEn: "Stacks DMG% over time while on field. High refinement shines, but avoid taking damage to maintain stacks.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Kione.png"
    },
    {
        rank: 9,
        nameVi: "Nanh Sơn Vương",
        nameEn: "Fang of the Mountain King",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Tỷ Lệ Bạo Kích cao và buff Sát Thương sau khi đánh trúng bằng Kỹ Năng Nguyên Tố. Phối hợp tốt với các đội hình Thiêu Đốt/Sum Suê, nhưng không hoàn toàn tối ưu cho Mavuika.",
        passiveDescEn: "High CRIT Rate and a DMG% buff after hitting with Skill. Synergizes with burning/bloom teams, but not optimal for Mavuika.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_EmeraldSword.png"
    },
    {
        rank: 10,
        nameVi: "Bóng Tối Thủy Triều",
        nameEn: "Tidal Shadow",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Vũ khí rèn cung cấp Tấn Công% sau khi được hồi máu. Dễ dàng chế tạo và duy trì nếu đội hình có nhân vật hồi máu.",
        passiveDescEn: "Craftable weapon that grants ATK% after being healed. Easy to obtain and maintain if you have a healer.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Vorpal.png"
    },
    {
        rank: 11,
        nameVi: "Vũ Tài",
        nameEn: "Rainslasher",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "Cung cấp Tinh Thông Nguyên Tố và tăng sát thương chống lại kẻ địch bị ảnh hưởng bởi Thủy hoặc Lôi. Chỉ nên dùng trong đội hình Bốc Hơi/Quá Tải.",
        passiveDescEn: "Provides Elemental Mastery and increased damage against enemies affected by Hydro or Electro. Only use in Vaporize/Overload teams.",
        iconUrl: "/images/weapons/UI_EquipIcon_Claymore_Perdue.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Thợ Săn Marechaussee",
        setNameEn: "Marechaussee Hunter",
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
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Ký Ức Rừng Sâu",
        setNameEn: "Deepwood Memories",
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
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Bức Tranh Dũng Sĩ Thành Tro Tàn",
        setNameEn: "Scroll of the Hero of Cinder City",
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
            "Elemental Mastery"
        ]
    },
    {
        setNameVi: "Bí Điển Obsidian",
        setNameEn: "Obsidian Codex",
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
            "Elemental Mastery"
        ]
    }
]
};
