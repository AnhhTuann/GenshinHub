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
    characters: [{ id: 'Barbara', name: 'Barbara', rarity: 4, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Barbara.png' }, { id: 'Amber', name: 'Amber', rarity: 4, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Ambor.png' }, { id: 'Klee', name: 'Klee', rarity: 5, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Klee.png' }, { id: 'Tartaglia', name: 'Tartaglia', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Tartaglia.png' }, { id: 'Diona', name: 'Diona', rarity: 4, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Diona.png' }, { id: 'Sucrose', name: 'Sucrose', rarity: 4, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Sucrose.png' }, { id: 'Aloy', name: 'Aloy', rarity: 5, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Aloy.png' }],
    weapons: [{ id: 'Aquila Favonia', name: 'Aquila Favonia', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Sword_Falcon.png' }, { id: 'The Flute', name: 'The Flute', rarity: 4, iconUrl: '/images/weapons/UI_EquipIcon_Sword_Troupe.png' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/images/weapons/UI_EquipIcon_Bow_Recluse.png' }]
  },
  {
    region: 'Liyue',
    domainName: 'Altar of Flames (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png',
    characters: [{ id: 'Xiao', name: 'Xiao', rarity: 5, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Xiao.png' }, { id: 'Ningguang', name: 'Ningguang', rarity: 4, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Ningguang.png' }, { id: 'Qiqi', name: 'Qiqi', rarity: 5, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Qiqi.png' }, { id: 'Keqing', name: 'Keqing', rarity: 5, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Keqing.png' }, { id: 'Yelan', name: 'Yelan', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Yelan.png' }, { id: 'Shenhe', name: 'Shenhe', rarity: 5, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Shenhe.png' }],
    weapons: [{ id: 'Primordial Jade Winged-Spear', name: 'Primordial Jade Winged-Spear', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Pole_Morax.png' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/images/weapons/UI_EquipIcon_Bow_Recluse.png' }]
  },
  {
    region: 'Inazuma',
    domainName: 'Violet Court (Inazuma)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104314.png',
    characters: [{ id: 'Yoimiya', name: 'Yoimiya', rarity: 5, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Yoimiya.png' }, { id: 'Raiden Shogun', name: 'Raiden Shogun', rarity: 5, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Shougun.png' }, { id: 'Sangonomiya Kokomi', name: 'Sangonomiya Kokomi', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Kokomi.png' }, { id: 'Shikanoin Heizou', name: 'Shikanoin Heizou', rarity: 4, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Heizo.png' }],
    weapons: [{ id: 'Mistsplitter Reforged', name: 'Mistsplitter Reforged', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Sword_Narukami.png' }, { id: 'Thundering Pulse', name: 'Thundering Pulse', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Bow_Narukami.png' }]
  },
  {
    region: 'Sumeru',
    domainName: 'Steeple of Ignorance (Sumeru)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104323.png',
    characters: [{ id: 'Tighnari', name: 'Tighnari', rarity: 5, element: 'Dendro', avatarUrl: '/images/avatars/UI_AvatarIcon_Tighnari.png' }, { id: 'Cyno', name: 'Cyno', rarity: 5, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Cyno.png' }, { id: 'Nilou', name: 'Nilou', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Nilou.png' }, { id: 'Candace', name: 'Candace', rarity: 4, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Candace.png' }],
    weapons: [{ id: 'Staff of the Scarlet Sands', name: 'Staff of the Scarlet Sands', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Pole_Deshret.png' }, { id: 'Key of Khaj-Nisut', name: 'Key of Khaj-Nisut', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Sword_Deshret.png' }]
  },
  {
    region: 'Fontaine',
    domainName: 'Pale Forgotten Glory (Fontaine)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104335.png',
    characters: [{ id: 'Lyney', name: 'Lyney', rarity: 5, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Liney.png' }, { id: 'Neuvillette', name: 'Neuvillette', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Neuvillette.png' }, { id: 'Navia', name: 'Navia', rarity: 5, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Navia.png' }],
    weapons: [{ id: 'The First Great Magic', name: 'The First Great Magic', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Bow_Pledge.png' }, { id: 'Tome of the Eternal Flow', name: 'Tome of the Eternal Flow', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Catalyst_Iudex.png' }]
  },
  {
    region: 'Natlan',
    domainName: 'Blazing Ruins (Natlan)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104347.png',
    characters: [{ id: 'Mualani', name: 'Mualani', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Mualani.png' }, { id: 'Kinich', name: 'Kinich', rarity: 5, element: 'Dendro', avatarUrl: '/images/avatars/UI_AvatarIcon_Kinich.png' }, { id: 'Kachina', name: 'Kachina', rarity: 4, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Kachina.png' }],
    weapons: [{ id: 'Surf\'s Up', name: 'Surf\'s Up', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.png' }, { id: 'Fang of the Mountain King', name: 'Fang of the Mountain King', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Claymore_EmeraldSword.png' }]
  },
];

const TUESDAY_FRIDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104304.png',
    characters: [{ id: 'Diluc', name: 'Diluc', rarity: 5, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Diluc.png' }, { id: 'Jean', name: 'Jean', rarity: 5, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Qin.png' }, { id: 'Mona', name: 'Mona', rarity: 5, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Mona.png' }, { id: 'Noelle', name: 'Noelle', rarity: 4, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Noel.png' }, { id: 'Razor', name: 'Razor', rarity: 4, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Razor.png' }, { id: 'Eula', name: 'Eula', rarity: 5, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Eula.png' }],
    weapons: [{ id: "Wolf's Gravestone", name: "Wolf's Gravestone", rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Claymore_Wolfmound.png' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104308.png',
    characters: [{ id: 'Ganyu', name: 'Ganyu', rarity: 5, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Ganyu.png' }, { id: 'Hu Tao', name: 'Hu Tao', rarity: 5, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Hutao.png' }, { id: 'Kaedehara Kazuha', name: 'Kaedehara Kazuha', rarity: 5, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Kazuha.png' }, { id: 'Xiangling', name: 'Xiangling', rarity: 4, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Xiangling.png' }, { id: 'Chongyun', name: 'Chongyun', rarity: 4, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Chongyun.png' }, { id: 'Yun Jin', name: 'Yun Jin', rarity: 4, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Yunjin.png' }],
    weapons: [{ id: 'Staff of Homa', name: 'Staff of Homa', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Pole_Homa.png' }]
  },
];

const WEDNESDAY_SATURDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104305.png',
    characters: [{ id: 'Venti', name: 'Venti', rarity: 5, element: 'Anemo', avatarUrl: '/images/avatars/UI_AvatarIcon_Venti.png' }, { id: 'Albedo', name: 'Albedo', rarity: 5, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Albedo.png' }, { id: 'Rosaria', name: 'Rosaria', rarity: 4, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Rosaria.png' }, { id: 'Fischl', name: 'Fischl', rarity: 4, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Fischl.png' }, { id: 'Kaeya', name: 'Kaeya', rarity: 4, element: 'Cryo', avatarUrl: '/images/avatars/UI_AvatarIcon_Kaeya.png' }],
    weapons: [{ id: "Amos' Bow", name: "Amos' Bow", rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Bow_Amos.png' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104311.png',
    characters: [{ id: 'Zhongli', name: 'Zhongli', rarity: 5, element: 'Geo', avatarUrl: '/images/avatars/UI_AvatarIcon_Zhongli.png' }, { id: 'Xingqiu', name: 'Xingqiu', rarity: 4, element: 'Hydro', avatarUrl: '/images/avatars/UI_AvatarIcon_Xingqiu.png' }, { id: 'Beidou', name: 'Beidou', rarity: 4, element: 'Electro', avatarUrl: '/images/avatars/UI_AvatarIcon_Beidou.png' }, { id: 'Xinyan', name: 'Xinyan', rarity: 4, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Xinyan.png' }, { id: 'Yanfei', name: 'Yanfei', rarity: 4, element: 'Pyro', avatarUrl: '/images/avatars/UI_AvatarIcon_Feiyan.png' }, { id: 'Baizhu', name: 'Baizhu', rarity: 5, element: 'Dendro', avatarUrl: '/images/avatars/UI_AvatarIcon_Baizhuer.png' }],
    weapons: [{ id: 'Lost Prayer to the Sacred Winds', name: 'Lost Prayer to the Sacred Winds', rarity: 5, iconUrl: '/images/weapons/UI_EquipIcon_Catalyst_Fourwinds.png' }]
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
