export const aloy = {
  characterId: "aloy",
  tier: "C",
  role: "Sub DPS",
  recommendedC: "C0",
  tierNoteEn: [],
  tierNoteVi: [],
  stats: null,
  ascensionMats: null,
  talentPriority: [
  "Elemental Burst",
  "Elemental Skill",
  "Normal Attack"
],
  signatureWeapons: [],
  teams: [
    {
        name: "Ayaka Freeze",
        rank: "A",
        description: "Ayaka Freeze with Aloy as battery",
        members: [
            {
                characterId: "kokomi",
                role: "Healer/Hydro Applier",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "venti",
                role: "Crowd Control/VV",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "aloy",
                role: "Sub DPS/Battery",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "ayaka",
                role: "Main DPS",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            }
        ]
    },
    {
        name: "Ganyu Freeze",
        rank: "A",
        description: "Ganyu Freeze with Aloy as battery",
        members: [
            {
                characterId: "aloy",
                role: "Sub DPS/Battery",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "ganyu",
                role: "Main DPS",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "mona",
                role: "Buffer/Hydro Applier",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "jean",
                role: "Healer/VV",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            }
        ]
    },
    {
        name: "Aloy Reverse Melt",
        rank: "A",
        description: "Aloy Reverse Melt with Xiangling",
        members: [
            {
                characterId: "xiangling",
                role: "Off-field Pyro",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "rosaria",
                role: "Sub DPS/Cryo Applier",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "aloy",
                role: "Main DPS/Melt Trigger",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            },
            {
                characterId: "bennett",
                role: "Buffer/Healer",
                roleDesc: "",
                weapons: [],
                artifacts: [],
                substats: []
            }
        ]
    }
],
  bestWeapons: [
    {
        rank: 1,
        nameVi: "Thundering Pulse",
        nameEn: "Thundering Pulse",
        subStat: "Sát Thương Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "High base ATK and CRIT DMG substat; passive ATK% benefits burst even if normal attack bonus is wasted.",
        passiveDescEn: "High base ATK and CRIT DMG substat; passive ATK% benefits burst even if normal attack bonus is wasted.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Narukami.png"
    },
    {
        rank: 2,
        nameVi: "Polar Star",
        nameEn: "Polar Star",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Provides ATK% and directly boosts Skill and Burst damage through stacks.",
        passiveDescEn: "Provides ATK% and directly boosts Skill and Burst damage through stacks.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Worldbane.png"
    },
    {
        rank: 3,
        nameVi: "Skyward Harp",
        nameEn: "Skyward Harp",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "High CRIT Rate and extra crit damage out; passive adds some physical but still solid for burst.",
        passiveDescEn: "High CRIT Rate and extra crit damage out; passive adds some physical but still solid for burst.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Dvalin.png"
    },
    {
        rank: 4,
        nameVi: "The Stringless",
        nameEn: "The Stringless",
        subStat: "Tinh Thông Nguyên Tố",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Increases Skill and Burst damage by 24-48%, excellent for burst support.",
        passiveDescEn: "Increases Skill and Burst damage by 24-48%, excellent for burst support.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Troupe.png"
    },
    {
        rank: 5,
        nameVi: "Amos' Bow",
        nameEn: "Amos' Bow",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Very high base ATK; passive is wasted on burst, but raw stats still contribute to damage.",
        passiveDescEn: "Very high base ATK; passive is wasted on burst, but raw stats still contribute to damage.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Amos.png"
    },
    {
        rank: 6,
        nameVi: "Alley Hunter",
        nameEn: "Alley Hunter",
        subStat: "Tấn Công%",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "While off-field, increases her damage by up to 40%, ideal for a quick-swap burst role.",
        passiveDescEn: "While off-field, increases her damage by up to 40%, ideal for a quick-swap burst role.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Outlaw.png"
    },
    {
        rank: 7,
        nameVi: "Prototype Crescent",
        nameEn: "Prototype Crescent",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R1",
        passiveDescVi: "Craftable; hitting weak points grants ATK%, useful if you can consistently aim.",
        passiveDescEn: "Craftable; hitting weak points grants ATK%, useful if you can consistently aim.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Proto.png"
    },
    {
        rank: 8,
        nameVi: "Predator",
        nameEn: "Predator",
        subStat: "Tấn Công%",
        isF2P: true,
        refinement: "R1",
        passiveDescVi: "Free weapon with ATK% substat; passive is specific to Aloy but not impactful for burst.",
        passiveDescEn: "Free weapon with ATK% substat; passive is specific to Aloy but not impactful for burst.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Predator.png"
    },
    {
        rank: 9,
        nameVi: "Sacrificial Bow",
        nameEn: "Sacrificial Bow",
        subStat: "Hiệu Quả Nạp",
        isF2P: false,
        refinement: "R1",
        passiveDescVi: "Provides Energy Recharge; skill reset is rarely needed but helps with energy generation.",
        passiveDescEn: "Provides Energy Recharge; skill reset is rarely needed but helps with energy generation.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Fossil.png"
    },
    {
        rank: 10,
        nameVi: "Slingshot",
        nameEn: "Slingshot",
        subStat: "Tỷ Lệ Bạo Kích",
        isF2P: true,
        refinement: "R5",
        passiveDescVi: "3-star with high CRIT Rate; only use as a stat stick if no other bows available.",
        passiveDescEn: "3-star with high CRIT Rate; only use as a stat stick if no other bows available.",
        iconUrl: "/images/weapons/UI_EquipIcon_Bow_Sling.png"
    }
],
  bestArtifacts: [
    {
        setNameVi: "Mix 2 bộ Dũng Sĩ Trong Băng Giá & 2 bộ Giấc Mộng Hoàng Kim",
        setNameEn: "Mix 2-Piece Blizzard Strayer & 2-Piece Gilded Dreams",
        pieces: 2,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
    },
    {
        setNameVi: "Mix 2 bộ Dũng Sĩ Trong Băng Giá & 2 bộ Nghi Thức Tông Thất Cổ",
        setNameEn: "Mix 2-Piece Blizzard Strayer & 2-Piece Noblesse Oblige",
        pieces: 2,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
    },
    {
        setNameVi: "Giấc Mộng Hoàng Kim",
        setNameEn: "Gilded Dreams",
        pieces: 4,
        sands: [],
        goblet: [],
        circlet: [],
        subStatsPriority: []
    },
    {
        setNameVi: "Nghi Thức Tông Thất Cổ",
        setNameEn: "Noblesse Oblige",
        pieces: 4,
        sands: [
            "ATK%",
            "Elemental Mastery"
        ],
        goblet: [
            "Cryo DMG Bonus"
        ],
        circlet: [
            "CRIT Rate",
            "CRIT DMG"
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
        setNameVi: "Dấu Ấn Ngăn Cách",
        setNameEn: "Emblem of Severed Fate",
        pieces: 4,
        sands: [
            "ATK%",
            "ER"
        ],
        goblet: [
            "Cryo DMG Bonus"
        ],
        circlet: [
            "CRIT Rate",
            "CRIT DMG"
        ],
        subStatsPriority: [
            "CRIT Rate",
            "CRIT DMG",
            "ATK%",
            "ER"
        ]
    }
]
};
