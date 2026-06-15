export interface DailyDomain {
  region: string;
  domainName: string; // The name of the domain like "Altar of Flames (Liyue)"
  itemIcon: string; // Path or URL to the book/weapon material icon
  characters: { id: string; name: string; avatarUrl: string; rarity: number; element: string }[];
  weapons: { id: string; name: string; iconUrl: string; rarity: number }[];
}

export interface DailySchedule {
  dayOfWeek: number;
  domains: DailyDomain[];
}

// Helper to generate character object
const c = (id: string, name: string, rarity: number, element: string) => ({
  id, name, rarity, element, avatarUrl: `https://gi.yatta.moe/assets/UI/UI_AvatarIcon_${id}.png`
});

// Helper to generate weapon object
const w = (id: string, name: string, rarity: number) => ({
  id, name, rarity, iconUrl: `https://gi.yatta.moe/assets/UI/UI_EquipIcon_${id}.png`
});

const MONDAY_THURSDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Frosted Altar (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png', // Freedom Book
    characters: [
      c('Barbara', 'Barbara', 4, 'Hydro'), c('Ambor', 'Amber', 4, 'Pyro'), c('Klee', 'Klee', 5, 'Pyro'), 
      c('Tartaglia', 'Childe', 5, 'Hydro'), c('Diona', 'Diona', 4, 'Cryo'), c('Sucrose', 'Sucrose', 4, 'Anemo')
    ],
    weapons: [
      w('Sword_Falcon', 'Aquila Favonia', 5), w('Sword_Troupe', 'The Flute', 4)
    ]
  },
  {
    region: 'Liyue',
    domainName: 'Altar of Flames (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png', // Prosperity Book
    characters: [
      c('Xiao', 'Xiao', 5, 'Anemo'), c('Ningguang', 'Ningguang', 4, 'Geo'), c('Qiqi', 'Qiqi', 5, 'Cryo'), 
      c('Keqing', 'Keqing', 5, 'Electro'), c('Yelan', 'Yelan', 5, 'Hydro'), c('Shenhe', 'Shenhe', 5, 'Cryo')
    ],
    weapons: [
      w('Pole_Lapis', 'Primordial Jade Winged-Spear', 5), w('Bow_Fossil', 'Rust', 4)
    ]
  },
  {
    region: 'Inazuma',
    domainName: 'Violet Court (Inazuma)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104314.png', // Transience Book
    characters: [
      c('Yoimiya', 'Yoimiya', 5, 'Pyro'), c('Shougun', 'Raiden Shogun', 5, 'Electro'), 
      c('Kokomi', 'Sangonomiya Kokomi', 5, 'Hydro'), c('Heizou', 'Shikanoin Heizou', 4, 'Anemo')
    ],
    weapons: [
      w('Sword_Narukami', 'Mistsplitter Reforged', 5), w('Bow_Narukami', 'Thundering Pulse', 5)
    ]
  },
  {
    region: 'Sumeru',
    domainName: 'Steeple of Ignorance (Sumeru)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104323.png', // Admonition Book
    characters: [
      c('Tighnari', 'Tighnari', 5, 'Dendro'), c('Cyno', 'Cyno', 5, 'Electro'), 
      c('Nilou', 'Nilou', 5, 'Hydro'), c('Candace', 'Candace', 4, 'Hydro')
    ],
    weapons: [
      w('Pole_Deshret', 'Staff of the Scarlet Sands', 5), w('Sword_Deshret', 'Key of Khaj-Nisut', 5)
    ]
  },
  {
    region: 'Fontaine',
    domainName: 'Pale Forgotten Glory (Fontaine)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104335.png', // Equity Book
    characters: [
      c('Lyney', 'Lyney', 5, 'Pyro'), c('Neuvillette', 'Neuvillette', 5, 'Hydro'), 
      c('Navia', 'Navia', 5, 'Geo')
    ],
    weapons: [
      w('Bow_Pneumousia', 'The First Great Magic', 5), w('Catalyst_Pneumousia', 'Tome of the Eternal Flow', 5)
    ]
  },
  {
    region: 'Natlan',
    domainName: 'Blazing Ruins (Natlan)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104347.png', // Contention Book
    characters: [
      c('Mualani', 'Mualani', 5, 'Hydro'), c('Kinich', 'Kinich', 5, 'Dendro'), 
      c('Kachina', 'Kachina', 4, 'Geo')
    ],
    weapons: [
      w('Catalyst_Umpakati', 'Surf\'s Up', 5), w('Claymore_Umpakati', 'Fang of the Mountain King', 5)
    ]
  }
];

const TUESDAY_FRIDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104304.png', // Resistance Book
    characters: [
      c('Diluc', 'Diluc', 5, 'Pyro'), c('Jean', 'Jean', 5, 'Anemo'), c('Mona', 'Mona', 5, 'Hydro'), 
      c('Noel', 'Noelle', 4, 'Geo'), c('Razor', 'Razor', 4, 'Electro'), c('Eula', 'Eula', 5, 'Cryo')
    ],
    weapons: [w('Claymore_Wolfmound', 'Wolf\'s Gravestone', 5)]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104308.png', // Diligence Book
    characters: [
      c('Ganyu', 'Ganyu', 5, 'Cryo'), c('HuTao', 'Hu Tao', 5, 'Pyro'), c('Kazuha', 'Kaedehara Kazuha', 5, 'Anemo'), 
      c('Xiangling', 'Xiangling', 4, 'Pyro'), c('Chongyun', 'Chongyun', 4, 'Cryo'), c('Yunjin', 'Yun Jin', 4, 'Geo')
    ],
    weapons: [w('Pole_Homa', 'Staff of Homa', 5)]
  }
];

const WEDNESDAY_SATURDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104305.png', // Ballad Book
    characters: [
      c('Venti', 'Venti', 5, 'Anemo'), c('Albedo', 'Albedo', 5, 'Geo'), c('Rosaria', 'Rosaria', 4, 'Cryo'), 
      c('Fischl', 'Fischl', 4, 'Electro'), c('Kaeya', 'Kaeya', 4, 'Cryo')
    ],
    weapons: [w('Bow_Amos', 'Amos\' Bow', 5)]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104311.png', // Gold Book
    characters: [
      c('Zhongli', 'Zhongli', 5, 'Geo'), c('Xingqiu', 'Xingqiu', 4, 'Hydro'), c('Beidou', 'Beidou', 4, 'Electro'), 
      c('Xinyan', 'Xinyan', 4, 'Pyro'), c('Yanfei', 'Yanfei', 4, 'Pyro'), c('Baizhu', 'Baizhu', 5, 'Dendro')
    ],
    weapons: [w('Catalyst_Zephyrus', 'Lost Prayer to the Sacred Winds', 5)]
  }
];

const scheduleMap: Record<number, DailyDomain[]> = {
  1: MONDAY_THURSDAY,
  2: TUESDAY_FRIDAY,
  3: WEDNESDAY_SATURDAY,
  4: MONDAY_THURSDAY,
  5: TUESDAY_FRIDAY,
  6: WEDNESDAY_SATURDAY,
};

export function getFarmingDataForDay(day: number): DailyDomain[] | null {
  if (day === 0) return null; // Sunday
  return scheduleMap[day] || null;
}

export function getTodayFarmingData(timezoneOffsetHours: number = 8): DailyDomain[] | null {
  const now = new Date();
  const localTime = now.getTime();
  const localOffset = now.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const serverTime = new Date(utc + (3600000 * timezoneOffsetHours));
  
  // Reset happens at 4:00 AM server time
  if (serverTime.getHours() < 4) {
    serverTime.setDate(serverTime.getDate() - 1);
  }
  
  return getFarmingDataForDay(serverTime.getDay());
}
