export interface DailyDomain {
  region: string;
  domainName: string;
  itemIcon: string;
  characters: { id: string; name: string; avatarUrl: string; rarity: number; element: string }[];
  weapons: { id: string; name: string; iconUrl: string; rarity: number }[];
}

export interface DailySchedule {
  dayOfWeek: number;
  domains: DailyDomain[];
}

const MONDAY_THURSDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Frosted Altar (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png',
    characters: [{ id: 'Barbara', name: 'Barbara', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Barbara.webp' }, { id: 'Amber', name: 'Amber', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Ambor.webp' }, { id: 'Klee', name: 'Klee', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Klee.webp' }, { id: 'Tartaglia', name: 'Tartaglia', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Tartaglia.webp' }, { id: 'Diona', name: 'Diona', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Diona.webp' }, { id: 'Sucrose', name: 'Sucrose', rarity: 4, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Sucrose.webp' }, { id: 'Aloy', name: 'Aloy', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Aloy.webp' }],
    weapons: [{ id: 'Aquila Favonia', name: 'Aquila Favonia', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Falcon.webp' }, { id: 'The Flute', name: 'The Flute', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Troupe.webp' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Recluse.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Altar of Flames (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png',
    characters: [{ id: 'Xiao', name: 'Xiao', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Xiao.webp' }, { id: 'Ningguang', name: 'Ningguang', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Ningguang.webp' }, { id: 'Qiqi', name: 'Qiqi', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Qiqi.webp' }, { id: 'Keqing', name: 'Keqing', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Keqing.webp' }, { id: 'Yelan', name: 'Yelan', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Yelan.webp' }, { id: 'Shenhe', name: 'Shenhe', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Shenhe.webp' }],
    weapons: [{ id: 'Primordial Jade Winged-Spear', name: 'Primordial Jade Winged-Spear', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Morax.webp' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Recluse.webp' }]
  },
  {
    region: 'Inazuma',
    domainName: 'Violet Court (Inazuma)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104314.png',
    characters: [{ id: 'Yoimiya', name: 'Yoimiya', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Yoimiya.webp' }, { id: 'Raiden Shogun', name: 'Raiden Shogun', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Shougun.webp' }, { id: 'Sangonomiya Kokomi', name: 'Sangonomiya Kokomi', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Kokomi.webp' }, { id: 'Shikanoin Heizou', name: 'Shikanoin Heizou', rarity: 4, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Heizo.webp' }],
    weapons: [{ id: 'Mistsplitter Reforged', name: 'Mistsplitter Reforged', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Narukami.webp' }, { id: 'Thundering Pulse', name: 'Thundering Pulse', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Narukami.webp' }]
  },
  {
    region: 'Sumeru',
    domainName: 'Steeple of Ignorance (Sumeru)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104323.png',
    characters: [{ id: 'Tighnari', name: 'Tighnari', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Tighnari.webp' }, { id: 'Cyno', name: 'Cyno', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Cyno.webp' }, { id: 'Nilou', name: 'Nilou', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Nilou.webp' }, { id: 'Candace', name: 'Candace', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Candace.webp' }],
    weapons: [{ id: 'Staff of the Scarlet Sands', name: 'Staff of the Scarlet Sands', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Deshret.webp' }, { id: 'Key of Khaj-Nisut', name: 'Key of Khaj-Nisut', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Deshret.webp' }]
  },
  {
    region: 'Fontaine',
    domainName: 'Pale Forgotten Glory (Fontaine)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104335.png',
    characters: [{ id: 'Lyney', name: 'Lyney', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Liney.webp' }, { id: 'Neuvillette', name: 'Neuvillette', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Neuvillette.webp' }, { id: 'Navia', name: 'Navia', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Navia.webp' }],
    weapons: [{ id: 'The First Great Magic', name: 'The First Great Magic', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Pledge.webp' }, { id: 'Tome of the Eternal Flow', name: 'Tome of the Eternal Flow', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Iudex.webp' }]
  },
  {
    region: 'Natlan',
    domainName: 'Blazing Ruins (Natlan)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104347.png',
    characters: [{ id: 'Mualani', name: 'Mualani', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Mualani.webp' }, { id: 'Kinich', name: 'Kinich', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Kinich.webp' }, { id: 'Kachina', name: 'Kachina', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kachina.webp' }],
    weapons: [{ id: 'Surf\'s Up', name: 'Surf\'s Up', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.webp' }, { id: 'Fang of the Mountain King', name: 'Fang of the Mountain King', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp' }]
  },
];

const TUESDAY_FRIDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104304.png',
    characters: [{ id: 'Diluc', name: 'Diluc', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Diluc.webp' }, { id: 'Jean', name: 'Jean', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Qin.webp' }, { id: 'Mona', name: 'Mona', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Mona.webp' }, { id: 'Noelle', name: 'Noelle', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Noel.webp' }, { id: 'Razor', name: 'Razor', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Razor.webp' }, { id: 'Eula', name: 'Eula', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Eula.webp' }],
    weapons: [{ id: "Wolf's Gravestone", name: "Wolf's Gravestone", rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104308.png',
    characters: [{ id: 'Ganyu', name: 'Ganyu', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Ganyu.webp' }, { id: 'Hu Tao', name: 'Hu Tao', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Hutao.webp' }, { id: 'Kaedehara Kazuha', name: 'Kaedehara Kazuha', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kazuha.webp' }, { id: 'Xiangling', name: 'Xiangling', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xiangling.webp' }, { id: 'Chongyun', name: 'Chongyun', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Chongyun.webp' }, { id: 'Yun Jin', name: 'Yun Jin', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Yunjin.webp' }],
    weapons: [{ id: 'Staff of Homa', name: 'Staff of Homa', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Homa.webp' }]
  },
];

const WEDNESDAY_SATURDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104305.png',
    characters: [{ id: 'Venti', name: 'Venti', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Venti.webp' }, { id: 'Albedo', name: 'Albedo', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Albedo.webp' }, { id: 'Rosaria', name: 'Rosaria', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Rosaria.webp' }, { id: 'Fischl', name: 'Fischl', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Fischl.webp' }, { id: 'Kaeya', name: 'Kaeya', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kaeya.webp' }],
    weapons: [{ id: "Amos' Bow", name: "Amos' Bow", rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Amos.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104311.png',
    characters: [{ id: 'Zhongli', name: 'Zhongli', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Zhongli.webp' }, { id: 'Xingqiu', name: 'Xingqiu', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xingqiu.webp' }, { id: 'Beidou', name: 'Beidou', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Beidou.webp' }, { id: 'Xinyan', name: 'Xinyan', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xinyan.webp' }, { id: 'Yanfei', name: 'Yanfei', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Feiyan.webp' }, { id: 'Baizhu', name: 'Baizhu', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Baizhuer.webp' }],
    weapons: [{ id: 'Lost Prayer to the Sacred Winds', name: 'Lost Prayer to the Sacred Winds', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Fourwinds.webp' }]
  },
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
  
  if (serverTime.getHours() < 4) {
    serverTime.setDate(serverTime.getDate() - 1);
  }
  
  return getFarmingDataForDay(serverTime.getDay());
}
