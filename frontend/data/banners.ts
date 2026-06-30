export type BannerItem = {
  nameEn: string;
  nameVi?: string;
  rarity: 4 | 5;
};

export type BannerPhase = {
  phase: number;
  startDate: string;
  endDate: string;
  characterBanners: string[];
  weaponBanners: string[];
  characters: BannerItem[];
  weapons: BannerItem[];
};

export type BannerVersion = {
  version: string;
  versionNameEn: string;
  versionNameVi: string;
  phases: BannerPhase[];
};

export const BANNERS_HISTORY: BannerVersion[] = [
  {
    version: "1.0",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2020-09-27",
        endDate: "2020-10-17",
        characterBanners: [
          "/assets/banners/ballad_in_goblets_2020_09_28_1_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2020_09_28_1_0.webp"
        ],
        characters: [
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Aquila Favonia",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2020-10-19",
        endDate: "2020-11-09",
        characterBanners: [
          "/assets/banners/sparkling_steps_2020_10_20_1_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2020_10_20_1_0.webp"
        ],
        characters: [
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "Wolf's Gravestone",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "1.1",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2020-11-10",
        endDate: "2020-11-30",
        characterBanners: [
          "/assets/banners/farewell_of_snezhnaya_2020_11_11_1_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2020_11_11_1_1.webp"
        ],
        characters: [
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Memory of Dust",
            rarity: 5
          },
          {
            nameEn: "Skyward Harp",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2020-11-30",
        endDate: "2020-12-21",
        characterBanners: [
          "/assets/banners/gentry_of_hermitage_2020_12_01_1_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2020_12_01_1_1.webp"
        ],
        characters: [
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "The Unforged",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "1.2",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2020-12-22",
        endDate: "2021-01-11",
        characterBanners: [
          "/assets/banners/secretum_secretorum_2020_12_23_1_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2020_12_23_1_2.webp"
        ],
        characters: [
          {
            nameEn: "Albedo",
            rarity: 5
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Summit Shaper",
            rarity: 5
          },
          {
            nameEn: "Skyward Atlas",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-01-11",
        endDate: "2021-02-01",
        characterBanners: [
          "/assets/banners/adrift_in_the_harbor_2021_01_12_1_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_01_12_1_2.webp"
        ],
        characters: [
          {
            nameEn: "Ganyu",
            rarity: 5
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Skyward Pride",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "1.3",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-02-02",
        endDate: "2021-02-16",
        characterBanners: [
          "/assets/banners/invitation_to_mundane_life_2021_02_03_1_3.webp"
        ],
        weaponBanners: [],
        characters: [
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          }
        ],
        weapons: []
      },
      {
        phase: 2,
        startDate: "2021-02-02",
        endDate: "2021-02-22",
        characterBanners: [],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_02_03_1_3.webp"
        ],
        characters: [],
        weapons: [
          {
            nameEn: "Primordial Jade Cutter",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      },
      {
        phase: 3,
        startDate: "2021-02-16",
        endDate: "2021-03-01",
        characterBanners: [
          "/assets/banners/dance_of_lanterns_2021_02_17_1_3.webp"
        ],
        weaponBanners: [],
        characters: [
          {
            nameEn: "Keqing",
            rarity: 5
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          }
        ],
        weapons: []
      },
      {
        phase: 4,
        startDate: "2021-02-22",
        endDate: "2021-03-15",
        characterBanners: [],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_02_23_1_3.webp"
        ],
        characters: [],
        weapons: [
          {
            nameEn: "Staff of Homa",
            rarity: 5
          },
          {
            nameEn: "Wolf's Gravestone",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      },
      {
        phase: 5,
        startDate: "2021-03-01",
        endDate: "2021-03-15",
        characterBanners: [
          "/assets/banners/moment_of_bloom_2021_03_02_1_3.webp"
        ],
        weaponBanners: [],
        characters: [
          {
            nameEn: "Hu Tao",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          }
        ],
        weapons: []
      }
    ]
  },
  {
    version: "1.4",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-03-16",
        endDate: "2021-04-05",
        characterBanners: [
          "/assets/banners/ballad_in_goblets_2021_03_17_1_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_03_17_1_4.webp"
        ],
        characters: [
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Skyward Blade",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-04-05",
        endDate: "2021-04-26",
        characterBanners: [
          "/assets/banners/farewell_of_snezhnaya_2021_04_06_1_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_04_06_1_4.webp"
        ],
        characters: [
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Skyward Harp",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "1.5",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-04-27",
        endDate: "2021-05-17",
        characterBanners: [
          "/assets/banners/gentry_of_hermitage_2021_04_28_1_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_04_28_1_5.webp"
        ],
        characters: [
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Summit Shaper",
            rarity: 5
          },
          {
            nameEn: "Memory of Dust",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-05-17",
        endDate: "2021-06-07",
        characterBanners: [
          "/assets/banners/born_of_ocean_swell_2021_05_18_1_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_05_18_1_5.webp"
        ],
        characters: [
          {
            nameEn: "Eula",
            rarity: 5
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Song of Broken Pines",
            rarity: 5
          },
          {
            nameEn: "Aquila Favonia",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "1.6",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-06-08",
        endDate: "2021-06-28",
        characterBanners: [
          "/assets/banners/sparkling_steps_2021_06_09_1_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_06_09_1_6.webp"
        ],
        characters: [
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Skyward Pride",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-06-28",
        endDate: "2021-07-19",
        characterBanners: [
          "/assets/banners/leaves_in_the_wind_2021_06_29_1_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_06_29_1_6.webp"
        ],
        characters: [
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Skyward Atlas",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.0",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-07-20",
        endDate: "2021-08-09",
        characterBanners: [
          "/assets/banners/the_heron_s_court_2021_07_21_2_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_07_21_2_0.webp"
        ],
        characters: [
          {
            nameEn: "Kamisato Ayaka",
            rarity: 5
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Mistsplitter Reforged",
            rarity: 5
          },
          {
            nameEn: "Skyward Spine",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-08-09",
        endDate: "2021-08-30",
        characterBanners: [
          "/assets/banners/tapestry_of_golden_flames_2021_08_10_2_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_08_10_2_0.webp"
        ],
        characters: [
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          },
          {
            nameEn: "Skyward Blade",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.1",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-08-31",
        endDate: "2021-09-20",
        characterBanners: [
          "/assets/banners/reign_of_serenity_2021_09_01_2_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_09_01_2_1.webp"
        ],
        characters: [
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "The Unforged",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-09-20",
        endDate: "2021-10-11",
        characterBanners: [
          "/assets/banners/drifting_luminescence_2021_09_21_2_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_09_21_2_1.webp"
        ],
        characters: [
          {
            nameEn: "Sangonomiya Kokomi",
            rarity: 5
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Everlasting Moonglow",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Cutter",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.2",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-10-12",
        endDate: "2021-11-01",
        characterBanners: [
          "/assets/banners/farewell_of_snezhnaya_2021_10_13_2_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_10_13_2_2.webp"
        ],
        characters: [
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Polar Star",
            rarity: 5
          },
          {
            nameEn: "Memory of Dust",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-11-01",
        endDate: "2021-11-22",
        characterBanners: [
          "/assets/banners/moment_of_bloom_2021_11_02_2_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_11_02_2_2.webp"
        ],
        characters: [
          {
            nameEn: "Hu Tao",
            rarity: 5
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Staff of Homa",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.3",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2021-11-23",
        endDate: "2021-12-13",
        characterBanners: [
          "/assets/banners/secretum_secretorum_2021_11_24_2_3.webp",
          "/assets/banners/born_of_ocean_swell_2021_11_24_2_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_11_24_2_3.webp"
        ],
        characters: [
          {
            nameEn: "Albedo",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Eula",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Song of Broken Pines",
            rarity: 5
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2021-12-13",
        endDate: "2022-01-03",
        characterBanners: [
          "/assets/banners/oni_s_royale_2021_12_14_2_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2021_12_14_2_3.webp"
        ],
        characters: [
          {
            nameEn: "Arataki Itto",
            rarity: 5
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Redhorn Stonethresher",
            rarity: 5
          },
          {
            nameEn: "Skyward Harp",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.4",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-01-04",
        endDate: "2022-01-24",
        characterBanners: [
          "/assets/banners/the_transcendent_one_returns_2022_01_05_2_4.webp",
          "/assets/banners/invitation_to_mundane_life_2022_01_05_2_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_01_05_2_4.webp"
        ],
        characters: [
          {
            nameEn: "Shenhe",
            rarity: 5
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Calamity Queller",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-01-24",
        endDate: "2022-02-14",
        characterBanners: [
          "/assets/banners/gentry_of_hermitage_2022_01_25_2_4.webp",
          "/assets/banners/adrift_in_the_harbor_2022_01_25_2_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_01_25_2_4.webp"
        ],
        characters: [
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Ganyu",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.5",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-02-15",
        endDate: "2022-03-07",
        characterBanners: [
          "/assets/banners/everbloom_violet_2022_02_16_2_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_02_16_2_5.webp"
        ],
        characters: [
          {
            nameEn: "Yae Miko",
            rarity: 5
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Kagura's Verity",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Cutter",
            rarity: 5
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-03-07",
        endDate: "2022-03-28",
        characterBanners: [
          "/assets/banners/reign_of_serenity_2022_03_08_2_5.webp",
          "/assets/banners/drifting_luminescence_2022_03_08_2_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_03_08_2_5.webp"
        ],
        characters: [
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Sangonomiya Kokomi",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "Everlasting Moonglow",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.6",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-03-29",
        endDate: "2022-04-18",
        characterBanners: [
          "/assets/banners/azure_excursion_2022_03_30_2_6.webp",
          "/assets/banners/ballad_in_goblets_2022_03_30_2_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_03_30_2_6.webp"
        ],
        characters: [
          {
            nameEn: "Kamisato Ayato",
            rarity: 5
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Haran Geppaku Futsu",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-04-18",
        endDate: "2022-05-30",
        characterBanners: [
          "/assets/banners/the_heron_s_court_2022_04_19_2_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_04_19_2_6.webp"
        ],
        characters: [
          {
            nameEn: "Kamisato Ayaka",
            rarity: 5
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Mistsplitter Reforged",
            rarity: 5
          },
          {
            nameEn: "The Unforged",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.7",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-05-30",
        endDate: "2022-06-20",
        characterBanners: [
          "/assets/banners/discerner_of_enigmas_2022_05_31_2_7.webp",
          "/assets/banners/invitation_to_mundane_life_2022_05_31_2_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_05_31_2_7.webp"
        ],
        characters: [
          {
            nameEn: "Yelan",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Aqua Simulacra",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-06-20",
        endDate: "2022-07-11",
        characterBanners: [
          "/assets/banners/oni_s_royale_2022_06_21_2_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_06_21_2_7.webp"
        ],
        characters: [
          {
            nameEn: "Arataki Itto",
            rarity: 5
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Gorou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Redhorn Stonethresher",
            rarity: 5
          },
          {
            nameEn: "Memory of Dust",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "2.8",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-07-12",
        endDate: "2022-08-01",
        characterBanners: [
          "/assets/banners/leaves_in_the_wind_2022_07_13_2_8.webp",
          "/assets/banners/sparkling_steps_2022_07_13_2_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_07_13_2_8.webp"
        ],
        characters: [
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-08-01",
        endDate: "2022-08-22",
        characterBanners: [
          "/assets/banners/tapestry_of_golden_flames_2022_08_02_2_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_08_02_2_8.webp"
        ],
        characters: [
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          },
          {
            nameEn: "Summit Shaper",
            rarity: 5
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.0",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-08-23",
        endDate: "2022-09-08",
        characterBanners: [
          "/assets/banners/viridescent_vigil_2022_08_24_3_0.webp",
          "/assets/banners/gentry_of_hermitage_2022_08_24_3_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_08_24_3_0.webp"
        ],
        characters: [
          {
            nameEn: "Tighnari",
            rarity: 5
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Hunter's Path",
            rarity: 5
          },
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-09-08",
        endDate: "2022-09-26",
        characterBanners: [
          "/assets/banners/adrift_in_the_harbor_2022_09_09_3_0.webp",
          "/assets/banners/drifting_luminescence_2022_09_09_3_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_09_09_3_0.webp"
        ],
        characters: [
          {
            nameEn: "Ganyu",
            rarity: 5
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Sangonomiya Kokomi",
            rarity: 5
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Everlasting Moonglow",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.1",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-09-27",
        endDate: "2022-10-13",
        characterBanners: [
          "/assets/banners/twilight_arbiter_2022_09_28_3_1.webp",
          "/assets/banners/ballad_in_goblets_2022_09_28_3_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_09_28_3_1.webp"
        ],
        characters: [
          {
            nameEn: "Cyno",
            rarity: 5
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Staff of the Scarlet Sands",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Makhaira Aquamarine",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-10-13",
        endDate: "2022-10-31",
        characterBanners: [
          "/assets/banners/twirling_lotus_2022_10_14_3_1.webp",
          "/assets/banners/secretum_secretorum_2022_10_14_3_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_10_14_3_1.webp"
        ],
        characters: [
          {
            nameEn: "Nilou",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Albedo",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Key of Khaj-Nisut",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Cutter",
            rarity: 5
          },
          {
            nameEn: "Xiphos' Moonlight",
            rarity: 4
          },
          {
            nameEn: "Wandering Evenstar",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.2",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-11-01",
        endDate: "2022-11-17",
        characterBanners: [
          "/assets/banners/the_moongrass__enlightenment_2022_11_02_3_2.webp",
          "/assets/banners/tapestry_of_golden_flames_2022_11_02_3_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_11_02_3_2.webp"
        ],
        characters: [
          {
            nameEn: "Nahida",
            rarity: 5
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "A Thousand Floating Dreams",
            rarity: 5
          },
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-11-17",
        endDate: "2022-12-05",
        characterBanners: [
          "/assets/banners/everbloom_violet_2022_11_18_3_2.webp",
          "/assets/banners/farewell_of_snezhnaya_2022_11_18_3_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_11_18_3_2.webp"
        ],
        characters: [
          {
            nameEn: "Yae Miko",
            rarity: 5
          },
          {
            nameEn: "Layla",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Layla",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Kagura's Verity",
            rarity: 5
          },
          {
            nameEn: "Polar Star",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.3",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2022-12-06",
        endDate: "2022-12-26",
        characterBanners: [
          "/assets/banners/from_ashes_reborn_2022_12_07_3_3.webp",
          "/assets/banners/oni_s_royale_2022_12_07_3_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_12_07_3_3.webp"
        ],
        characters: [
          {
            nameEn: "Wanderer",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Arataki Itto",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Tulaytullah's Remembrance",
            rarity: 5
          },
          {
            nameEn: "Redhorn Stonethresher",
            rarity: 5
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2022-12-26",
        endDate: "2023-01-16",
        characterBanners: [
          "/assets/banners/reign_of_serenity_2022_12_27_3_3.webp",
          "/assets/banners/azure_excursion_2022_12_27_3_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2022_12_27_3_3.webp"
        ],
        characters: [
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Kamisato Ayato",
            rarity: 5
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "Haran Geppaku Futsu",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.4",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-01-17",
        endDate: "2023-02-06",
        characterBanners: [
          "/assets/banners/caution_in_confidence_2023_01_18_3_4.webp",
          "/assets/banners/invitation_to_mundane_life_2023_01_18_3_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_01_18_3_4.webp"
        ],
        characters: [
          {
            nameEn: "Alhaitham",
            rarity: 5
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Light of Foliar Incision",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-02-06",
        endDate: "2023-02-27",
        characterBanners: [
          "/assets/banners/moment_of_bloom_2023_02_07_3_4.webp",
          "/assets/banners/discerner_of_enigmas_2023_02_07_3_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_02_07_3_4.webp"
        ],
        characters: [
          {
            nameEn: "Hu Tao",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Yelan",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Staff of Homa",
            rarity: 5
          },
          {
            nameEn: "Aqua Simulacra",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.5",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-02-28",
        endDate: "2023-03-20",
        characterBanners: [
          "/assets/banners/auric_blaze_2023_03_01_3_5.webp",
          "/assets/banners/twilight_arbiter_2023_03_01_3_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_03_01_3_5.webp"
        ],
        characters: [
          {
            nameEn: "Dehya",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Cyno",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Beacon of the Reed Sea",
            rarity: 5
          },
          {
            nameEn: "Staff of the Scarlet Sands",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-03-20",
        endDate: "2023-04-10",
        characterBanners: [
          "/assets/banners/the_transcendent_one_returns_2023_03_21_3_5.webp",
          "/assets/banners/the_heron_s_court_2023_03_21_3_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_03_21_3_5.webp"
        ],
        characters: [
          {
            nameEn: "Shenhe",
            rarity: 5
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Kamisato Ayaka",
            rarity: 5
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Mika",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Calamity Queller",
            rarity: 5
          },
          {
            nameEn: "Mistsplitter Reforged",
            rarity: 5
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.6",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-04-11",
        endDate: "2023-05-01",
        characterBanners: [
          "/assets/banners/the_moongrass__enlightenment_2023_04_12_3_6.webp",
          "/assets/banners/twirling_lotus_2023_04_12_3_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_04_12_3_6.webp"
        ],
        characters: [
          {
            nameEn: "Nahida",
            rarity: 5
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          },
          {
            nameEn: "Nilou",
            rarity: 5
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "A Thousand Floating Dreams",
            rarity: 5
          },
          {
            nameEn: "Key of Khaj-Nisut",
            rarity: 5
          },
          {
            nameEn: "Xiphos' Moonlight",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-05-01",
        endDate: "2023-05-22",
        characterBanners: [
          "/assets/banners/immaculate_pulse_2023_05_02_3_6.webp",
          "/assets/banners/adrift_in_the_harbor_2023_05_02_3_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_05_02_3_6.webp"
        ],
        characters: [
          {
            nameEn: "Baizhu",
            rarity: 5
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Ganyu",
            rarity: 5
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Jadefall's Splendor",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          },
          {
            nameEn: "Makhaira Aquamarine",
            rarity: 4
          },
          {
            nameEn: "Wandering Evenstar",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.7",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-05-23",
        endDate: "2023-06-12",
        characterBanners: [
          "/assets/banners/tapestry_of_golden_flames_2023_05_24_3_7.webp",
          "/assets/banners/everbloom_violet_2023_05_24_3_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_05_24_3_7.webp"
        ],
        characters: [
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Yae Miko",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          },
          {
            nameEn: "Kagura's Verity",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-06-12",
        endDate: "2023-07-03",
        characterBanners: [
          "/assets/banners/caution_in_confidence_2023_06_13_3_7.webp",
          "/assets/banners/leaves_in_the_wind_2023_06_13_3_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_06_13_3_7.webp"
        ],
        characters: [
          {
            nameEn: "Alhaitham",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Light of Foliar Incision",
            rarity: 5
          },
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "3.8",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-07-04",
        endDate: "2023-07-24",
        characterBanners: [
          "/assets/banners/born_of_ocean_swell_2023_07_05_3_8.webp",
          "/assets/banners/sparkling_steps_2023_07_05_3_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_07_05_3_8.webp"
        ],
        characters: [
          {
            nameEn: "Eula",
            rarity: 5
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Song of Broken Pines",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-07-24",
        endDate: "2023-08-14",
        characterBanners: [
          "/assets/banners/drifting_luminescence_2023_07_25_3_8.webp",
          "/assets/banners/from_ashes_reborn_2023_07_25_3_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_07_25_3_8.webp"
        ],
        characters: [
          {
            nameEn: "Sangonomiya Kokomi",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Wanderer",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Everlasting Moonglow",
            rarity: 5
          },
          {
            nameEn: "Tulaytullah's Remembrance",
            rarity: 5
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.0",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-08-15",
        endDate: "2023-09-04",
        characterBanners: [
          "/assets/banners/conjuring_chiaroscuro_2023_08_16_4_0.webp",
          "/assets/banners/discerner_of_enigmas_2023_08_16_4_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_08_16_4_0.webp"
        ],
        characters: [
          {
            nameEn: "Lyney",
            rarity: 5
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Yelan",
            rarity: 5
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "The First Great Magic",
            rarity: 5
          },
          {
            nameEn: "Aqua Simulacra",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-09-04",
        endDate: "2023-09-25",
        characterBanners: [
          "/assets/banners/gentry_of_hermitage_2023_09_05_4_0.webp",
          "/assets/banners/farewell_of_snezhnaya_2023_09_05_4_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_09_05_4_0.webp"
        ],
        characters: [
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Freminet",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Freminet",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "Polar Star",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.1",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-09-26",
        endDate: "2023-10-16",
        characterBanners: [
          "/assets/banners/decree_of_the_deeps_2023_09_27_4_1.webp",
          "/assets/banners/moment_of_bloom_2023_09_27_4_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_09_27_4_1.webp"
        ],
        characters: [
          {
            nameEn: "Neuvillette",
            rarity: 5
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Hu Tao",
            rarity: 5
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Tome of the Eternal Flow",
            rarity: 5
          },
          {
            nameEn: "Staff of Homa",
            rarity: 5
          },
          {
            nameEn: "The Dockhand's Assistant",
            rarity: 4
          },
          {
            nameEn: "Portable Power Saw",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-10-16",
        endDate: "2023-11-06",
        characterBanners: [
          "/assets/banners/tempestuous_destiny_2023_10_17_4_1.webp",
          "/assets/banners/ballad_in_goblets_2023_10_17_4_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_10_17_4_1.webp"
        ],
        characters: [
          {
            nameEn: "Wriothesley",
            rarity: 5
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Cashflow Supervision",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Prospector's Drill",
            rarity: 4
          },
          {
            nameEn: "Range Gauge",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.2",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-11-07",
        endDate: "2023-11-27",
        characterBanners: [
          "/assets/banners/chanson_of_many_waters_2023_11_08_4_2.webp",
          "/assets/banners/immaculate_pulse_2023_11_08_4_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_11_08_4_2.webp"
        ],
        characters: [
          {
            nameEn: "Furina",
            rarity: 5
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Baizhu",
            rarity: 5
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Splendor of Tranquil Waters",
            rarity: 5
          },
          {
            nameEn: "Jadefall's Splendor",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2023-11-27",
        endDate: "2023-12-18",
        characterBanners: [
          "/assets/banners/twilight_arbiter_2023_11_28_4_2.webp",
          "/assets/banners/azure_excursion_2023_11_28_4_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_11_28_4_2.webp"
        ],
        characters: [
          {
            nameEn: "Cyno",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Kamisato Ayato",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Staff of the Scarlet Sands",
            rarity: 5
          },
          {
            nameEn: "Haran Geppaku Futsu",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.3",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2023-12-19",
        endDate: "2024-01-08",
        characterBanners: [
          "/assets/banners/in_the_name_of_the_rosula_2023_12_20_4_3.webp",
          "/assets/banners/the_heron_s_court_2023_12_20_4_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2023_12_20_4_3.webp"
        ],
        characters: [
          {
            nameEn: "Navia",
            rarity: 5
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Kamisato Ayaka",
            rarity: 5
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Verdict",
            rarity: 5
          },
          {
            nameEn: "Mistsplitter Reforged",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-01-08",
        endDate: "2024-01-29",
        characterBanners: [
          "/assets/banners/reign_of_serenity_2024_01_09_4_3.webp",
          "/assets/banners/tapestry_of_golden_flames_2024_01_09_4_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_01_09_4_3.webp"
        ],
        characters: [
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.4",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-01-30",
        endDate: "2024-02-19",
        characterBanners: [
          "/assets/banners/the_crane_soars_skyward_2024_01_31_4_4.webp",
          "/assets/banners/the_moongrass__enlightenment_2024_01_31_4_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_01_31_4_4.webp"
        ],
        characters: [
          {
            nameEn: "Xianyun",
            rarity: 5
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Nahida",
            rarity: 5
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Crane's Echoing Call",
            rarity: 5
          },
          {
            nameEn: "A Thousand Floating Dreams",
            rarity: 5
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-02-19",
        endDate: "2024-03-11",
        characterBanners: [
          "/assets/banners/invitation_to_mundane_life_2024_02_20_4_4.webp",
          "/assets/banners/everbloom_violet_2024_02_20_4_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_02_20_4_4.webp"
        ],
        characters: [
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Yae Miko",
            rarity: 5
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Kagura's Verity",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.5",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-03-12",
        endDate: "2024-04-01",
        characterBanners: [
          "/assets/banners/of_silken_clouds_woven_2024_03_13_4_5.webp",
          "/assets/banners/oni_s_royale_2024_03_13_4_5.webp",
          "/assets/banners/ode_to_the_dawn_breeze_2024_03_13_4_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_03_13_4_5.webp"
        ],
        characters: [
          {
            nameEn: "Chiori",
            rarity: 5
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Arataki Itto",
            rarity: 5
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Albedo",
            rarity: 5
          },
          {
            nameEn: "Diluc",
            rarity: 5
          },
          {
            nameEn: "Eula",
            rarity: 5
          },
          {
            nameEn: "Jean",
            rarity: 5
          },
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Mona",
            rarity: 5
          },
          {
            nameEn: "Aquila Favonia",
            rarity: 5
          },
          {
            nameEn: "Beacon of the Reed Sea",
            rarity: 5
          },
          {
            nameEn: "Hunter's Path",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "Skyward Atlas",
            rarity: 5
          },
          {
            nameEn: "Skyward Blade",
            rarity: 5
          },
          {
            nameEn: "Skyward Harp",
            rarity: 5
          },
          {
            nameEn: "Skyward Pride",
            rarity: 5
          },
          {
            nameEn: "Skyward Spine",
            rarity: 5
          },
          {
            nameEn: "Song of Broken Pines",
            rarity: 5
          },
          {
            nameEn: "Wolf's Gravestone",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Uraku Misugiri",
            rarity: 5
          },
          {
            nameEn: "Redhorn Stonethresher",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-04-01",
        endDate: "2024-04-22",
        characterBanners: [
          "/assets/banners/decree_of_the_deeps_2024_04_02_4_5.webp",
          "/assets/banners/leaves_in_the_wind_2024_04_02_4_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_04_02_4_5.webp"
        ],
        characters: [
          {
            nameEn: "Neuvillette",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Tome of the Eternal Flow",
            rarity: 5
          },
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.6",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-04-23",
        endDate: "2024-05-13",
        characterBanners: [
          "/assets/banners/the_hearth_s_ashen_shadow_2024_04_24_4_6.webp",
          "/assets/banners/conjuring_chiaroscuro_2024_04_24_4_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_04_24_4_6.webp"
        ],
        characters: [
          {
            nameEn: "Arlecchino",
            rarity: 5
          },
          {
            nameEn: "Freminet",
            rarity: 4
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Lyney",
            rarity: 5
          },
          {
            nameEn: "Freminet",
            rarity: 4
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Crimson Moon's Semblance",
            rarity: 5
          },
          {
            nameEn: "The First Great Magic",
            rarity: 5
          },
          {
            nameEn: "The Dockhand's Assistant",
            rarity: 4
          },
          {
            nameEn: "Portable Power Saw",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-05-13",
        endDate: "2024-06-03",
        characterBanners: [
          "/assets/banners/from_ashes_reborn_2024_05_14_4_6.webp",
          "/assets/banners/immaculate_pulse_2024_05_14_4_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_05_14_4_6.webp"
        ],
        characters: [
          {
            nameEn: "Wanderer",
            rarity: 5
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          },
          {
            nameEn: "Baizhu",
            rarity: 5
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Tulaytullah's Remembrance",
            rarity: 5
          },
          {
            nameEn: "Jadefall's Splendor",
            rarity: 5
          },
          {
            nameEn: "Range Gauge",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Prospector's Drill",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.7",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-06-04",
        endDate: "2024-06-24",
        characterBanners: [
          "/assets/banners/illuminating_lightning_2024_06_05_4_7.webp",
          "/assets/banners/caution_in_confidence_2024_06_05_4_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_06_05_4_7.webp"
        ],
        characters: [
          {
            nameEn: "Clorinde",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Alhaitham",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Thoma",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Absolution",
            rarity: 5
          },
          {
            nameEn: "Light of Foliar Incision",
            rarity: 5
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-06-24",
        endDate: "2024-07-15",
        characterBanners: [
          "/assets/banners/romaritime_meluserenity_2024_06_25_4_7.webp",
          "/assets/banners/chanson_of_many_waters_2024_06_25_4_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_06_25_4_7.webp"
        ],
        characters: [
          {
            nameEn: "Sigewinne",
            rarity: 5
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Furina",
            rarity: 5
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Silvershower Heartstrings",
            rarity: 5
          },
          {
            nameEn: "Splendor of Tranquil Waters",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "4.8",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-07-16",
        endDate: "2024-08-05",
        characterBanners: [
          "/assets/banners/in_the_name_of_the_rosula_2024_07_17_4_8.webp",
          "/assets/banners/twirling_lotus_2024_07_17_4_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_07_17_4_8.webp"
        ],
        characters: [
          {
            nameEn: "Navia",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          },
          {
            nameEn: "Nilou",
            rarity: 5
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Ningguang",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Verdict",
            rarity: 5
          },
          {
            nameEn: "Key of Khaj-Nisut",
            rarity: 5
          },
          {
            nameEn: "Xiphos' Moonlight",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-08-05",
        endDate: "2024-08-26",
        characterBanners: [
          "/assets/banners/ambrosial_essence_2024_08_06_4_8.webp",
          "/assets/banners/discerner_of_enigmas_2024_08_06_4_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_08_06_4_8.webp"
        ],
        characters: [
          {
            nameEn: "Emilie",
            rarity: 5
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Yelan",
            rarity: 5
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Lumidouce Elegy",
            rarity: 5
          },
          {
            nameEn: "Aqua Simulacra",
            rarity: 5
          },
          {
            nameEn: "Makhaira Aquamarine",
            rarity: 4
          },
          {
            nameEn: "Wandering Evenstar",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.0",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-08-27",
        endDate: "2024-09-16",
        characterBanners: [
          "/assets/banners/sharktacular_surfari_2024_08_28_5_0.webp",
          "/assets/banners/leaves_in_the_wind_2024_08_28_5_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_08_28_5_0.webp"
        ],
        characters: [
          {
            nameEn: "Mualani",
            rarity: 5
          },
          {
            nameEn: "Kachina",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Kachina",
            rarity: 4
          },
          {
            nameEn: "Xinyan",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Surf's Up",
            rarity: 5
          },
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-09-16",
        endDate: "2024-10-07",
        characterBanners: [
          "/assets/banners/seeker_of_flame_wrought_secrets_2024_09_17_5_0.webp",
          "/assets/banners/reign_of_serenity_2024_09_17_5_0.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_09_17_5_0.webp"
        ],
        characters: [
          {
            nameEn: "Kinich",
            rarity: 5
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Fang of the Mountain King",
            rarity: 5
          },
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.1",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-10-08",
        endDate: "2024-10-28",
        characterBanners: [
          "/assets/banners/forgefire_s_blessing_2024_10_09_5_1.webp",
          "/assets/banners/of_silken_clouds_woven_2024_10_09_5_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_10_09_5_1.webp"
        ],
        characters: [
          {
            nameEn: "Xilonen",
            rarity: 5
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Chiori",
            rarity: 5
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Peak Patrol Song",
            rarity: 5
          },
          {
            nameEn: "Uraku Misugiri",
            rarity: 5
          },
          {
            nameEn: "Sturdy Bone",
            rarity: 4
          },
          {
            nameEn: "Mountain-Bracing Bolt",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-10-28",
        endDate: "2024-11-18",
        characterBanners: [
          "/assets/banners/the_moongrass__enlightenment_2024_10_29_5_1.webp",
          "/assets/banners/moment_of_bloom_2024_10_29_5_1.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_10_29_5_1.webp"
        ],
        characters: [
          {
            nameEn: "Nahida",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Hu Tao",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "A Thousand Floating Dreams",
            rarity: 5
          },
          {
            nameEn: "Staff of Homa",
            rarity: 5
          },
          {
            nameEn: "Fruitful Hook",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.2",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-11-19",
        endDate: "2024-12-09",
        characterBanners: [
          "/assets/banners/piercing_shot_s_crimson_wake_2024_11_20_5_2.webp",
          "/assets/banners/conjuring_chiaroscuro_2024_11_20_5_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_11_20_5_2.webp"
        ],
        characters: [
          {
            nameEn: "Chasca",
            rarity: 5
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Lyney",
            rarity: 5
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Barbara",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Astral Vulture's Crimson Plumage",
            rarity: 5
          },
          {
            nameEn: "The First Great Magic",
            rarity: 5
          },
          {
            nameEn: "Waveriding Whirl",
            rarity: 4
          },
          {
            nameEn: "Flower-Wreathed Feathers",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2024-12-09",
        endDate: "2024-12-30",
        characterBanners: [
          "/assets/banners/decree_of_the_deeps_2024_12_10_5_2.webp",
          "/assets/banners/gentry_of_hermitage_2024_12_10_5_2.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2024_12_10_5_2.webp"
        ],
        characters: [
          {
            nameEn: "Neuvillette",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Shikanoin Heizou",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Tome of the Eternal Flow",
            rarity: 5
          },
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.3",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2024-12-31",
        endDate: "2025-01-20",
        characterBanners: [
          "/assets/banners/ancient_flame_ablaze_2025_01_01_5_3.webp",
          "/assets/banners/starry_night_s_whispers_2025_01_01_5_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_01_01_5_3.webp"
        ],
        characters: [
          {
            nameEn: "Mavuika",
            rarity: 5
          },
          {
            nameEn: "Kachina",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Citlali",
            rarity: 5
          },
          {
            nameEn: "Kachina",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "A Thousand Blazing Suns",
            rarity: 5
          },
          {
            nameEn: "Starcaller's Watch",
            rarity: 5
          },
          {
            nameEn: "Lithic Blade",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-01-20",
        endDate: "2025-02-10",
        characterBanners: [
          "/assets/banners/the_hearth_s_ashen_shadow_2025_01_21_5_3.webp",
          "/assets/banners/illuminating_lightning_2025_01_21_5_3.webp",
          "/assets/banners/remembrance_of_jade_and_stone_2025_01_21_5_3.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_01_21_5_3.webp"
        ],
        characters: [
          {
            nameEn: "Arlecchino",
            rarity: 5
          },
          {
            nameEn: "Lan Yan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Clorinde",
            rarity: 5
          },
          {
            nameEn: "Lan Yan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Baizhu",
            rarity: 5
          },
          {
            nameEn: "Shenhe",
            rarity: 5
          },
          {
            nameEn: "Keqing",
            rarity: 5
          },
          {
            nameEn: "Ganyu",
            rarity: 5
          },
          {
            nameEn: "Qiqi",
            rarity: 5
          },
          {
            nameEn: "Childe",
            rarity: 5
          },
          {
            nameEn: "Xiao",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Cutter",
            rarity: 5
          },
          {
            nameEn: "Summit Shaper",
            rarity: 5
          },
          {
            nameEn: "The Unforged",
            rarity: 5
          },
          {
            nameEn: "Calamity Queller",
            rarity: 5
          },
          {
            nameEn: "Primordial Jade Winged-Spear",
            rarity: 5
          },
          {
            nameEn: "Jadefall's Splendor",
            rarity: 5
          },
          {
            nameEn: "Memory of Dust",
            rarity: 5
          },
          {
            nameEn: "Polar Star",
            rarity: 5
          },
          {
            nameEn: "Amos' Bow",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Crimson Moon's Semblance",
            rarity: 5
          },
          {
            nameEn: "Absolution",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          },
          {
            nameEn: "Lithic Spear",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.4",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-02-11",
        endDate: "2025-03-03",
        characterBanners: [
          "/assets/banners/dawn_s_drifting_reverie_2025_02_12_5_4.webp",
          "/assets/banners/romaritime_meluserenity_2025_02_12_5_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_02_12_5_4.webp"
        ],
        characters: [
          {
            nameEn: "Yumemizuki Mizuki",
            rarity: 5
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Sigewinne",
            rarity: 5
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Sayu",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Sunny Morning Sleep-In",
            rarity: 5
          },
          {
            nameEn: "Silvershower Heartstrings",
            rarity: 5
          },
          {
            nameEn: "Akuoumaru",
            rarity: 4
          },
          {
            nameEn: "Wavebreaker's Fin",
            rarity: 4
          },
          {
            nameEn: "Mouun's Moon",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-03-03",
        endDate: "2025-03-24",
        characterBanners: [
          "/assets/banners/chanson_of_many_waters_2025_03_04_5_4.webp",
          "/assets/banners/tempestuous_destiny_2025_03_04_5_4.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_03_04_5_4.webp"
        ],
        characters: [
          {
            nameEn: "Furina",
            rarity: 5
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Wriothesley",
            rarity: 5
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          },
          {
            nameEn: "Chongyun",
            rarity: 4
          },
          {
            nameEn: "Mika",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Splendor of Tranquil Waters",
            rarity: 5
          },
          {
            nameEn: "Cashflow Supervision",
            rarity: 5
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.5",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-03-25",
        endDate: "2025-04-14",
        characterBanners: [
          "/assets/banners/cornucopia_of_contention_2025_03_26_5_5.webp",
          "/assets/banners/the_crane_soars_skyward_2025_03_26_5_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_03_26_5_5.webp"
        ],
        characters: [
          {
            nameEn: "Varesa",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Xianyun",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Vivid Notions",
            rarity: 5
          },
          {
            nameEn: "Crane's Echoing Call",
            rarity: 5
          },
          {
            nameEn: "Sturdy Bone",
            rarity: 4
          },
          {
            nameEn: "Fruitful Hook",
            rarity: 4
          },
          {
            nameEn: "Mountain-Bracing Bolt",
            rarity: 4
          },
          {
            nameEn: "Waveriding Whirl",
            rarity: 4
          },
          {
            nameEn: "Flower-Wreathed Feathers",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-04-14",
        endDate: "2025-05-05",
        characterBanners: [
          "/assets/banners/forgefire_s_blessing_2025_04_15_5_5.webp",
          "/assets/banners/ballad_in_goblets_2025_04_15_5_5.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_04_15_5_5.webp"
        ],
        characters: [
          {
            nameEn: "Xilonen",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          },
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Beidou",
            rarity: 4
          },
          {
            nameEn: "Yanfei",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Peak Patrol Song",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.6",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-05-06",
        endDate: "2025-05-26",
        characterBanners: [
          "/assets/banners/la_chanson_cerise_2025_05_07_5_6.webp",
          "/assets/banners/in_the_name_of_the_rosula_2025_05_07_5_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_05_07_5_6.webp"
        ],
        characters: [
          {
            nameEn: "Escoffier",
            rarity: 5
          },
          {
            nameEn: "Ifa",
            rarity: 4
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          },
          {
            nameEn: "Navia",
            rarity: 5
          },
          {
            nameEn: "Ifa",
            rarity: 4
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Layla",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Symphonist of Scents",
            rarity: 5
          },
          {
            nameEn: "Verdict",
            rarity: 5
          },
          {
            nameEn: "The Dockhand's Assistant",
            rarity: 4
          },
          {
            nameEn: "Portable Power Saw",
            rarity: 4
          },
          {
            nameEn: "Prospector's Drill",
            rarity: 4
          },
          {
            nameEn: "Range Gauge",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-05-26",
        endDate: "2025-06-16",
        characterBanners: [
          "/assets/banners/seeker_of_flame_wrought_secrets_2025_05_27_5_6.webp",
          "/assets/banners/reign_of_serenity_2025_05_27_5_6.webp",
          "/assets/banners/thunder_rends_the_plains_on_high_2025_05_27_5_6.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_05_27_5_6.webp"
        ],
        characters: [
          {
            nameEn: "Kinich",
            rarity: 5
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Raiden Shogun",
            rarity: 5
          },
          {
            nameEn: "Thoma",
            rarity: 4
          },
          {
            nameEn: "Kujou Sara",
            rarity: 4
          },
          {
            nameEn: "Lynette",
            rarity: 4
          },
          {
            nameEn: "Kamisato Ayaka",
            rarity: 5
          },
          {
            nameEn: "Kamisato Ayato",
            rarity: 5
          },
          {
            nameEn: "Yoimiya",
            rarity: 5
          },
          {
            nameEn: "Chiori",
            rarity: 5
          },
          {
            nameEn: "Yae Miko",
            rarity: 5
          },
          {
            nameEn: "Arataki Itto",
            rarity: 5
          },
          {
            nameEn: "Sangonomiya Kokomi",
            rarity: 5
          },
          {
            nameEn: "Kaedehara Kazuha",
            rarity: 5
          },
          {
            nameEn: "Uraku Misugiri",
            rarity: 5
          },
          {
            nameEn: "Haran Geppaku Futsu",
            rarity: 5
          },
          {
            nameEn: "Mistsplitter Reforged",
            rarity: 5
          },
          {
            nameEn: "Freedom-Sworn",
            rarity: 5
          },
          {
            nameEn: "Redhorn Stonethresher",
            rarity: 5
          },
          {
            nameEn: "Kagura's Verity",
            rarity: 5
          },
          {
            nameEn: "Everlasting Moonglow",
            rarity: 5
          },
          {
            nameEn: "Thundering Pulse",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Fang of the Mountain King",
            rarity: 5
          },
          {
            nameEn: "Engulfing Lightning",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.7",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-06-17",
        endDate: "2025-07-07",
        characterBanners: [
          "/assets/banners/void_star_s_advent_2025_06_18_5_7.webp",
          "/assets/banners/the_transcendent_one_returns_2025_06_18_5_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_06_18_5_7.webp"
        ],
        characters: [
          {
            nameEn: "Skirk",
            rarity: 5
          },
          {
            nameEn: "Dahlia",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          },
          {
            nameEn: "Shenhe",
            rarity: 5
          },
          {
            nameEn: "Dahlia",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Diona",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Azurelight",
            rarity: 5
          },
          {
            nameEn: "Calamity Queller",
            rarity: 5
          },
          {
            nameEn: "Xiphos' Moonlight",
            rarity: 4
          },
          {
            nameEn: "Makhaira Aquamarine",
            rarity: 4
          },
          {
            nameEn: "Wandering Evenstar",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-07-07",
        endDate: "2025-07-28",
        characterBanners: [
          "/assets/banners/ancient_flame_ablaze_2025_07_08_5_7.webp",
          "/assets/banners/ambrosial_essence_2025_07_08_5_7.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_07_08_5_7.webp"
        ],
        characters: [
          {
            nameEn: "Mavuika",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Emilie",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "A Thousand Blazing Suns",
            rarity: 5
          },
          {
            nameEn: "Lumidouce Elegy",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "5.8",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-07-29",
        endDate: "2025-08-18",
        characterBanners: [
          "/assets/banners/astral_actuation_2025_07_30_5_8.webp",
          "/assets/banners/starry_night_s_whispers_2025_07_30_5_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_07_30_5_8.webp"
        ],
        characters: [
          {
            nameEn: "Ineffa",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Citlali",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Fractured Halo",
            rarity: 5
          },
          {
            nameEn: "Starcaller's Watch",
            rarity: 5
          },
          {
            nameEn: "Sturdy Bone",
            rarity: 4
          },
          {
            nameEn: "Mountain-Bracing Bolt",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-08-18",
        endDate: "2025-09-08",
        characterBanners: [
          "/assets/banners/sharktacular_surfari_2025_08_19_5_8.webp",
          "/assets/banners/piercing_shot_s_crimson_wake_2025_08_19_5_8.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_08_19_5_8.webp"
        ],
        characters: [
          {
            nameEn: "Mualani",
            rarity: 5
          },
          {
            nameEn: "Ifa",
            rarity: 4
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Chasca",
            rarity: 5
          },
          {
            nameEn: "Ifa",
            rarity: 4
          },
          {
            nameEn: "Ororon",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Surf's Up",
            rarity: 5
          },
          {
            nameEn: "Astral Vulture's Crimson Plumage",
            rarity: 5
          },
          {
            nameEn: "Fruitful Hook",
            rarity: 4
          },
          {
            nameEn: "Waveriding Whirl",
            rarity: 4
          },
          {
            nameEn: "Flower-Wreathed Feathers",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna I\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-09-09",
        endDate: "2025-09-29",
        characterBanners: [
          "/assets/banners/moonsong_of_the_groves_2025_09_10__luna_i_.webp",
          "/assets/banners/the_moongrass__enlightenment_2025_09_10__luna_i_.webp",
          "/assets/banners/roving_chalice_of_dewgrass_2025_09_10__luna_i_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_09_10__luna_i_.webp"
        ],
        characters: [
          {
            nameEn: "Lauma",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Nahida",
            rarity: 5
          },
          {
            nameEn: "Barbara",
            rarity: 4
          },
          {
            nameEn: "Kuki Shinobu",
            rarity: 4
          },
          {
            nameEn: "Kaveh",
            rarity: 4
          },
          {
            nameEn: "Dehya",
            rarity: 5
          },
          {
            nameEn: "Alhaitham",
            rarity: 5
          },
          {
            nameEn: "Wanderer",
            rarity: 5
          },
          {
            nameEn: "Cyno",
            rarity: 5
          },
          {
            nameEn: "Nilou",
            rarity: 5
          },
          {
            nameEn: "Tighnari",
            rarity: 5
          },
          {
            nameEn: "Light of Foliar Incision",
            rarity: 5
          },
          {
            nameEn: "Key of Khaj-Nisut",
            rarity: 5
          },
          {
            nameEn: "Beacon of the Reed Sea",
            rarity: 5
          },
          {
            nameEn: "Staff of the Scarlet Sands",
            rarity: 5
          },
          {
            nameEn: "Tulaytullah's Remembrance",
            rarity: 5
          },
          {
            nameEn: "Hunter's Path",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Nightweaver's Looking Glass",
            rarity: 5
          },
          {
            nameEn: "A Thousand Floating Dreams",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-09-29",
        endDate: "2025-10-20",
        characterBanners: [
          "/assets/banners/the_lone_light_knocks_at_night_2025_09_30__luna_i_.webp",
          "/assets/banners/discerner_of_enigmas_2025_09_30__luna_i_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_09_30__luna_i_.webp"
        ],
        characters: [
          {
            nameEn: "Flins",
            rarity: 5
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          },
          {
            nameEn: "Yelan",
            rarity: 5
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Dori",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Bloodsoaked Ruins",
            rarity: 5
          },
          {
            nameEn: "Aqua Simulacra",
            rarity: 5
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna II\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-10-21",
        endDate: "2025-11-10",
        characterBanners: [
          "/assets/banners/temptation_of_the_crimson_sands_2025_10_22__luna_ii_.webp",
          "/assets/banners/chanson_of_many_waters_2025_10_22__luna_ii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_10_22__luna_ii_.webp"
        ],
        characters: [
          {
            nameEn: "Nefer",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          },
          {
            nameEn: "Furina",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Collei",
            rarity: 4
          },
          {
            nameEn: "Yaoyao",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Reliquary of Truth",
            rarity: 5
          },
          {
            nameEn: "Splendor of Tranquil Waters",
            rarity: 5
          },
          {
            nameEn: "Moonweaver's Dawn",
            rarity: 4
          },
          {
            nameEn: "Sacrificer's Staff",
            rarity: 4
          },
          {
            nameEn: "Dawning Frost",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-11-10",
        endDate: "2025-12-01",
        characterBanners: [
          "/assets/banners/the_hearth_s_ashen_shadow_2025_11_11__luna_ii_.webp",
          "/assets/banners/gentry_of_hermitage_2025_11_11__luna_ii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_11_11__luna_ii_.webp"
        ],
        characters: [
          {
            nameEn: "Arlecchino",
            rarity: 5
          },
          {
            nameEn: "Lan Yan",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          },
          {
            nameEn: "Zhongli",
            rarity: 5
          },
          {
            nameEn: "Lan Yan",
            rarity: 4
          },
          {
            nameEn: "Rosaria",
            rarity: 4
          },
          {
            nameEn: "Yun Jin",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Crimson Moon's Semblance",
            rarity: 5
          },
          {
            nameEn: "Vortex Vanquisher",
            rarity: 5
          },
          {
            nameEn: "The Dockhand's Assistant",
            rarity: 4
          },
          {
            nameEn: "Portable Power Saw",
            rarity: 4
          },
          {
            nameEn: "Range Gauge",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna III\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2025-12-02",
        endDate: "2025-12-22",
        characterBanners: [
          "/assets/banners/rubedo__of_white_stone_born_2025_12_03__luna_iii_.webp",
          "/assets/banners/ballad_in_goblets_2025_12_03__luna_iii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_12_03__luna_iii_.webp"
        ],
        characters: [
          {
            nameEn: "Durin",
            rarity: 5
          },
          {
            nameEn: "Jahoda",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          },
          {
            nameEn: "Venti",
            rarity: 5
          },
          {
            nameEn: "Jahoda",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Faruzan",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Athame Artis",
            rarity: 5
          },
          {
            nameEn: "The Daybreak Chronicles",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Prospector's Drill",
            rarity: 4
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "The Stringless",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2025-12-22",
        endDate: "2026-01-12",
        characterBanners: [
          "/assets/banners/cornucopia_of_contention_2025_12_23__luna_iii_.webp",
          "/assets/banners/forgefire_s_blessing_2025_12_23__luna_iii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2025_12_23__luna_iii_.webp"
        ],
        characters: [
          {
            nameEn: "Varesa",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          },
          {
            nameEn: "Xilonen",
            rarity: 5
          },
          {
            nameEn: "Iansan",
            rarity: 4
          },
          {
            nameEn: "Chevreuse",
            rarity: 4
          },
          {
            nameEn: "Gaming",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Vivid Notions",
            rarity: 5
          },
          {
            nameEn: "Peak Patrol Song",
            rarity: 5
          },
          {
            nameEn: "Fruitful Hook",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna IV\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2026-01-13",
        endDate: "2026-02-02",
        characterBanners: [
          "/assets/banners/somnias_a_luna_2026_01_14__luna_iv_.webp",
          "/assets/banners/astral_actuation_2026_01_14__luna_iv_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_01_14__luna_iv_.webp"
        ],
        characters: [
          {
            nameEn: "Columbina",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Ifa",
            rarity: 4
          },
          {
            nameEn: "Ineffa",
            rarity: 5
          },
          {
            nameEn: "Sethos",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Ifa",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Nocturne's Curtain Call",
            rarity: 5
          },
          {
            nameEn: "Fractured Halo",
            rarity: 5
          },
          {
            nameEn: "Mountain-Bracing Bolt",
            rarity: 4
          },
          {
            nameEn: "Waveriding Whirl",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2026-02-02",
        endDate: "2026-02-23",
        characterBanners: [
          "/assets/banners/harmonious_abundance_2026_02_03__luna_iv_.webp",
          "/assets/banners/decree_of_the_deeps_2026_02_03__luna_iv_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_02_03__luna_iv_.webp"
        ],
        characters: [
          {
            nameEn: "Zibai",
            rarity: 5
          },
          {
            nameEn: "Illuga",
            rarity: 4
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Gorou",
            rarity: 4
          },
          {
            nameEn: "Neuvillette",
            rarity: 5
          },
          {
            nameEn: "Illuga",
            rarity: 4
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Gorou",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Lightbearing Moonshard",
            rarity: 5
          },
          {
            nameEn: "Tome of the Eternal Flow",
            rarity: 5
          },
          {
            nameEn: "Xiphos' Moonlight",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna V\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2026-02-24",
        endDate: "2026-03-16",
        characterBanners: [
          "/assets/banners/the_northerly_wind_s_song_of_triumph_2026_02_25__luna_v_.webp",
          "/assets/banners/the_lone_light_knocks_at_night_2026_02_25__luna_v_.webp",
          "/assets/banners/ode_to_the_dawn_breeze_2026_02_25__luna_v_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_02_25__luna_v_.webp"
        ],
        characters: [
          {
            nameEn: "Varka",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Flins",
            rarity: 5
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Sucrose",
            rarity: 4
          },
          {
            nameEn: "Eula",
            rarity: 5
          },
          {
            nameEn: "Mona",
            rarity: 5
          },
          {
            nameEn: "Albedo",
            rarity: 5
          },
          {
            nameEn: "Klee",
            rarity: 5
          },
          {
            nameEn: "Diluc",
            rarity: 5
          },
          {
            nameEn: "Jean",
            rarity: 5
          },
          {
            nameEn: "Skyward Blade",
            rarity: 5
          },
          {
            nameEn: "Aquila Favonia",
            rarity: 5
          },
          {
            nameEn: "Song of Broken Pines",
            rarity: 5
          },
          {
            nameEn: "Wolf's Gravestone",
            rarity: 5
          },
          {
            nameEn: "Skyward Pride",
            rarity: 5
          },
          {
            nameEn: "Skyward Spine",
            rarity: 5
          },
          {
            nameEn: "Lost Prayer to the Sacred Winds",
            rarity: 5
          },
          {
            nameEn: "Skyward Atlas",
            rarity: 5
          },
          {
            nameEn: "Elegy for the End",
            rarity: 5
          },
          {
            nameEn: "Skyward Harp",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Gest of the Mighty Wolf",
            rarity: 5
          },
          {
            nameEn: "Bloodsoaked Ruins",
            rarity: 5
          },
          {
            nameEn: "Sacrificer's Staff",
            rarity: 4
          },
          {
            nameEn: "Favonius Sword",
            rarity: 4
          },
          {
            nameEn: "Favonius Greatsword",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Fragments",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Bow",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2026-03-16",
        endDate: "2026-04-06",
        characterBanners: [
          "/assets/banners/void_star_s_advent_2026_03_17__luna_v_.webp",
          "/assets/banners/la_chanson_cerise_2026_03_17__luna_v_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_03_17__luna_v_.webp"
        ],
        characters: [
          {
            nameEn: "Skirk",
            rarity: 5
          },
          {
            nameEn: "Dahlia",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          },
          {
            nameEn: "Escoffier",
            rarity: 5
          },
          {
            nameEn: "Dahlia",
            rarity: 4
          },
          {
            nameEn: "Candace",
            rarity: 4
          },
          {
            nameEn: "Charlotte",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Azurelight",
            rarity: 5
          },
          {
            nameEn: "Symphonist of Scents",
            rarity: 5
          },
          {
            nameEn: "The Flute",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Codex",
            rarity: 4
          },
          {
            nameEn: "Rust",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna VI\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2026-04-07",
        endDate: "2026-04-27",
        characterBanners: [
          "/assets/banners/ya_hoho__compendium_2026_04_08__luna_vi_.webp",
          "/assets/banners/piercing_shot_s_crimson_wake_2026_04_08__luna_vi_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_04_08__luna_vi_.webp"
        ],
        characters: [
          {
            nameEn: "Linnea",
            rarity: 5
          },
          {
            nameEn: "Illuga",
            rarity: 4
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          },
          {
            nameEn: "Chasca",
            rarity: 5
          },
          {
            nameEn: "Illuga",
            rarity: 4
          },
          {
            nameEn: "Aino",
            rarity: 4
          },
          {
            nameEn: "Noelle",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Golden Frostbound Oath",
            rarity: 5
          },
          {
            nameEn: "Astral Vulture's Crimson Plumage",
            rarity: 5
          },
          {
            nameEn: "Flower-Wreathed Feathers",
            rarity: 4
          },
          {
            nameEn: "Lion's Roar",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Greatsword",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "Eye of Perception",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2026-04-27",
        endDate: "2026-05-18",
        characterBanners: [
          "/assets/banners/moonsong_of_the_groves_2026_04_28__luna_vi_.webp",
          "/assets/banners/temptation_of_the_crimson_sands_2026_04_28__luna_vi_.webp",
          "/assets/banners/dewlit_tranquility_2026_04_28__luna_vi_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_04_28__luna_vi_.webp"
        ],
        characters: [
          {
            nameEn: "Lauma",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Jahoda",
            rarity: 4
          },
          {
            nameEn: "Nefer",
            rarity: 5
          },
          {
            nameEn: "Xingqiu",
            rarity: 4
          },
          {
            nameEn: "Kirara",
            rarity: 4
          },
          {
            nameEn: "Jahoda",
            rarity: 4
          },
          {
            nameEn: "Emilie",
            rarity: 5
          },
          {
            nameEn: "Clorinde",
            rarity: 5
          },
          {
            nameEn: "Sigewinne",
            rarity: 5
          },
          {
            nameEn: "Navia",
            rarity: 5
          },
          {
            nameEn: "Lyney",
            rarity: 5
          },
          {
            nameEn: "Absolution",
            rarity: 5
          },
          {
            nameEn: "Verdict",
            rarity: 5
          },
          {
            nameEn: "Lumidouce Elegy",
            rarity: 5
          },
          {
            nameEn: "Silvershower Heartstrings",
            rarity: 5
          },
          {
            nameEn: "The First Great Magic",
            rarity: 5
          }
        ],
        weapons: [
          {
            nameEn: "Nightweaver's Looking Glass",
            rarity: 5
          },
          {
            nameEn: "Reliquary of Truth",
            rarity: 5
          },
          {
            nameEn: "Dawning Frost",
            rarity: 4
          },
          {
            nameEn: "Sacrificial Sword",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          },
          {
            nameEn: "Favonius Warbow",
            rarity: 4
          }
        ]
      }
    ]
  },
  {
    version: "\"Luna VII\"",
    versionNameEn: "",
    versionNameVi: "",
    phases: [
      {
        phase: 1,
        startDate: "2026-05-19",
        endDate: "2026-06-08",
        characterBanners: [
          "/assets/banners/angel_s_reverie_2026_05_20__luna_vii_.webp",
          "/assets/banners/rubedo__of_white_stone_born_2026_05_20__luna_vii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_05_20__luna_vii_.webp"
        ],
        characters: [
          {
            nameEn: "Nicole",
            rarity: 5
          },
          {
            nameEn: "Prune",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          },
          {
            nameEn: "Durin",
            rarity: 5
          },
          {
            nameEn: "Prune",
            rarity: 4
          },
          {
            nameEn: "Razor",
            rarity: 4
          },
          {
            nameEn: "Fischl",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Angelos' Heptades",
            rarity: 5
          },
          {
            nameEn: "Athame Artis",
            rarity: 5
          },
          {
            nameEn: "Moonweaver's Dawn",
            rarity: 4
          },
          {
            nameEn: "Mitternachts Waltz",
            rarity: 4
          },
          {
            nameEn: "The Bell",
            rarity: 4
          },
          {
            nameEn: "Dragon's Bane",
            rarity: 4
          },
          {
            nameEn: "The Widsith",
            rarity: 4
          }
        ]
      },
      {
        phase: 2,
        startDate: "2026-06-08",
        endDate: "2026-06-29",
        characterBanners: [
          "/assets/banners/frostedge_nocturne_2026_06_09__luna_vii_.webp",
          "/assets/banners/ancient_flame_ablaze_2026_06_09__luna_vii_.webp"
        ],
        weaponBanners: [
          "/assets/banners/epitome_invocation_2026_06_09__luna_vii_.webp"
        ],
        characters: [
          {
            nameEn: "Lohen",
            rarity: 5
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          },
          {
            nameEn: "Mavuika",
            rarity: 5
          },
          {
            nameEn: "Mika",
            rarity: 4
          },
          {
            nameEn: "Xiangling",
            rarity: 4
          },
          {
            nameEn: "Bennett",
            rarity: 4
          }
        ],
        weapons: [
          {
            nameEn: "Disaster and Remorse",
            rarity: 5
          },
          {
            nameEn: "A Thousand Blazing Suns",
            rarity: 5
          },
          {
            nameEn: "The Alley Flash",
            rarity: 4
          },
          {
            nameEn: "Wine and Song",
            rarity: 4
          },
          {
            nameEn: "Alley Hunter",
            rarity: 4
          },
          {
            nameEn: "Rainslasher",
            rarity: 4
          },
          {
            nameEn: "Favonius Lance",
            rarity: 4
          }
        ]
      }
    ]
  }
];
