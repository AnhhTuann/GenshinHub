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
    itemIcon: '/assets/items/UI_ItemIcon_104303.webp',
    characters: [{ id: 'Barbara', name: 'Barbara', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Barbara_avatar.webp' }, { id: 'Amber', name: 'Amber', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Ambor_avatar.webp' }, { id: 'Klee', name: 'Klee', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Klee_avatar.webp' }, { id: 'Tartaglia', name: 'Tartaglia', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Tartaglia_avatar.webp' }, { id: 'Diona', name: 'Diona', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Diona_avatar.webp' }, { id: 'Sucrose', name: 'Sucrose', rarity: 4, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Sucrose_avatar.webp' }, { id: 'Aloy', name: 'Aloy', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Aloy_avatar.webp' }],
    weapons: [{ id: 'Aquila Favonia', name: 'Aquila Favonia', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Falcon.webp' }, { id: 'The Flute', name: 'The Flute', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Troupe.webp' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Recluse.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Altar of Flames (Liyue)',
    itemIcon: '/assets/items/UI_ItemIcon_104306.webp',
    characters: [{ id: 'Xiao', name: 'Xiao', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Xiao_avatar.webp' }, { id: 'Ningguang', name: 'Ningguang', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Ningguang_avatar.webp' }, { id: 'Qiqi', name: 'Qiqi', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Qiqi_avatar.webp' }, { id: 'Keqing', name: 'Keqing', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Keqing_avatar.webp' }, { id: 'Yelan', name: 'Yelan', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Yelan_avatar.webp' }, { id: 'Shenhe', name: 'Shenhe', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Shenhe_avatar.webp' }],
    weapons: [{ id: 'Primordial Jade Winged-Spear', name: 'Primordial Jade Winged-Spear', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Morax.webp' }, { id: 'Rust', name: 'Rust', rarity: 4, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Recluse.webp' }]
  },
  {
    region: 'Inazuma',
    domainName: 'Violet Court (Inazuma)',
    itemIcon: '/assets/items/UI_ItemIcon_104314.webp',
    characters: [{ id: 'Yoimiya', name: 'Yoimiya', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Yoimiya_avatar.webp' }, { id: 'Raiden Shogun', name: 'Raiden Shogun', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Shougun_avatar.webp' }, { id: 'Sangonomiya Kokomi', name: 'Sangonomiya Kokomi', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Kokomi_avatar.webp' }, { id: 'Shikanoin Heizou', name: 'Shikanoin Heizou', rarity: 4, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Heizo_avatar.webp' }],
    weapons: [{ id: 'Mistsplitter Reforged', name: 'Mistsplitter Reforged', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Narukami.webp' }, { id: 'Thundering Pulse', name: 'Thundering Pulse', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Narukami.webp' }]
  },
  {
    region: 'Sumeru',
    domainName: 'Steeple of Ignorance (Sumeru)',
    itemIcon: '/assets/items/UI_ItemIcon_104323.webp',
    characters: [{ id: 'Tighnari', name: 'Tighnari', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Tighnari_avatar.webp' }, { id: 'Cyno', name: 'Cyno', rarity: 5, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Cyno_avatar.webp' }, { id: 'Nilou', name: 'Nilou', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Nilou_avatar.webp' }, { id: 'Candace', name: 'Candace', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Candace_avatar.webp' }],
    weapons: [{ id: 'Staff of the Scarlet Sands', name: 'Staff of the Scarlet Sands', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Deshret.webp' }, { id: 'Key of Khaj-Nisut', name: 'Key of Khaj-Nisut', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Deshret.webp' }]
  },
  {
    region: 'Fontaine',
    domainName: 'Pale Forgotten Glory (Fontaine)',
    itemIcon: '/assets/items/UI_ItemIcon_104335.webp',
    characters: [{ id: 'Lyney', name: 'Lyney', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Liney_avatar.webp' }, { id: 'Neuvillette', name: 'Neuvillette', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Neuvillette_avatar.webp' }, { id: 'Navia', name: 'Navia', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Navia_avatar.webp' }],
    weapons: [{ id: 'The First Great Magic', name: 'The First Great Magic', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Pledge.webp' }, { id: 'Tome of the Eternal Flow', name: 'Tome of the Eternal Flow', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_Iudex.webp' }]
  },
  {
    region: 'Natlan',
    domainName: 'Blazing Ruins (Natlan)',
    itemIcon: '/assets/items/UI_ItemIcon_104347.webp',
    characters: [{ id: 'Mualani', name: 'Mualani', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Mualani_avatar.webp' }, { id: 'Kinich', name: 'Kinich', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Kinich_avatar.webp' }, { id: 'Kachina', name: 'Kachina', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kachina_avatar.webp' }],
    weapons: [{ id: 'Surf\'s Up', name: 'Surf\'s Up', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Catalyst_MechaPufferfish.webp' }, { id: 'Fang of the Mountain King', name: 'Fang of the Mountain King', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_EmeraldSword.webp' }]
  },
];

const TUESDAY_FRIDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: '/assets/items/UI_ItemIcon_104304.webp',
    characters: [{ id: 'Diluc', name: 'Diluc', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Diluc_avatar.webp' }, { id: 'Jean', name: 'Jean', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Qin_avatar.webp' }, { id: 'Mona', name: 'Mona', rarity: 5, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Mona_avatar.webp' }, { id: 'Noelle', name: 'Noelle', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Noel_avatar.webp' }, { id: 'Razor', name: 'Razor', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Razor_avatar.webp' }, { id: 'Eula', name: 'Eula', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Eula_avatar.webp' }],
    weapons: [{ id: "Wolf's Gravestone", name: "Wolf's Gravestone", rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Claymore_Wolfmound.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: '/assets/items/UI_ItemIcon_104308.webp',
    characters: [{ id: 'Ganyu', name: 'Ganyu', rarity: 5, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Ganyu_avatar.webp' }, { id: 'Hu Tao', name: 'Hu Tao', rarity: 5, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Hutao_avatar.webp' }, { id: 'Kaedehara Kazuha', name: 'Kaedehara Kazuha', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kazuha_avatar.webp' }, { id: 'Xiangling', name: 'Xiangling', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xiangling_avatar.webp' }, { id: 'Chongyun', name: 'Chongyun', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Chongyun_avatar.webp' }, { id: 'Yun Jin', name: 'Yun Jin', rarity: 4, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Yunjin_avatar.webp' }],
    weapons: [{ id: 'Staff of Homa', name: 'Staff of Homa', rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Homa.webp' }]
  },
];

const WEDNESDAY_SATURDAY: DailyDomain[] = [
  {
    region: 'Mondstadt',
    domainName: 'Forsaken Rift (Mondstadt)',
    itemIcon: '/assets/items/UI_ItemIcon_104305.webp',
    characters: [{ id: 'Venti', name: 'Venti', rarity: 5, element: 'Anemo', avatarUrl: '/assets/characters/UI_AvatarIcon_Venti_avatar.webp' }, { id: 'Albedo', name: 'Albedo', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Albedo_avatar.webp' }, { id: 'Rosaria', name: 'Rosaria', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Rosaria_avatar.webp' }, { id: 'Fischl', name: 'Fischl', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Fischl_avatar.webp' }, { id: 'Kaeya', name: 'Kaeya', rarity: 4, element: 'Cryo', avatarUrl: '/assets/characters/UI_AvatarIcon_Kaeya_avatar.webp' }],
    weapons: [{ id: "Amos' Bow", name: "Amos' Bow", rarity: 5, iconUrl: '/assets/weapons/UI_EquipIcon_Bow_Amos.webp' }]
  },
  {
    region: 'Liyue',
    domainName: 'Taishan Mansion (Liyue)',
    itemIcon: '/assets/items/UI_ItemIcon_104311.webp',
    characters: [{ id: 'Zhongli', name: 'Zhongli', rarity: 5, element: 'Geo', avatarUrl: '/assets/characters/UI_AvatarIcon_Zhongli_avatar.webp' }, { id: 'Xingqiu', name: 'Xingqiu', rarity: 4, element: 'Hydro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xingqiu_avatar.webp' }, { id: 'Beidou', name: 'Beidou', rarity: 4, element: 'Electro', avatarUrl: '/assets/characters/UI_AvatarIcon_Beidou_avatar.webp' }, { id: 'Xinyan', name: 'Xinyan', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Xinyan_avatar.webp' }, { id: 'Yanfei', name: 'Yanfei', rarity: 4, element: 'Pyro', avatarUrl: '/assets/characters/UI_AvatarIcon_Feiyan_avatar.webp' }, { id: 'Baizhu', name: 'Baizhu', rarity: 5, element: 'Dendro', avatarUrl: '/assets/characters/UI_AvatarIcon_Baizhuer_avatar.webp' }],
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
