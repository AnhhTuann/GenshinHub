const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db_dump.json'));

const c = (name) => {
  const char = data.characters[name];
  if (!char) { console.error("MISSING CHAR:", name); return null; }
  return `{ id: '${char.nameEn}', name: '${char.nameEn}', rarity: ${char.rarity}, element: '${char.element}', avatarUrl: '${char.avatarUrl}' }`;
};

const w = (name) => {
  const wp = data.weapons[name];
  if (!wp) { console.error("MISSING WEAPON:", name); return null; }
  return `{ id: '${wp.nameEn}', name: '${wp.nameEn}', rarity: ${wp.rarity}, iconUrl: '${wp.iconUrl}' }`;
};

const domainsData = [
  {
    name: 'MONDAY_THURSDAY',
    domains: [
      {
        region: 'Mondstadt', domainName: 'Frosted Altar (Mondstadt)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104303.png',
        chars: ['Barbara', 'Amber', 'Klee', 'Tartaglia', 'Diona', 'Sucrose', 'Aloy'],
        wps: ['Aquila Favonia', 'The Flute', 'Rust']
      },
      {
        region: 'Liyue', domainName: 'Altar of Flames (Liyue)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104306.png',
        chars: ['Xiao', 'Ningguang', 'Qiqi', 'Keqing', 'Yelan', 'Shenhe'],
        wps: ['Primordial Jade Winged-Spear', 'Rust']
      },
      {
        region: 'Inazuma', domainName: 'Violet Court (Inazuma)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104314.png',
        chars: ['Yoimiya', 'Raiden Shogun', 'Sangonomiya Kokomi', 'Shikanoin Heizou'],
        wps: ['Mistsplitter Reforged', 'Thundering Pulse']
      },
      {
        region: 'Sumeru', domainName: 'Steeple of Ignorance (Sumeru)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104323.png',
        chars: ['Tighnari', 'Cyno', 'Nilou', 'Candace'],
        wps: ['Staff of the Scarlet Sands', 'Key of Khaj-Nisut']
      },
      {
        region: 'Fontaine', domainName: 'Pale Forgotten Glory (Fontaine)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104335.png',
        chars: ['Lyney', 'Neuvillette', 'Navia'],
        wps: ['The First Great Magic', 'Tome of the Eternal Flow']
      },
      {
        region: 'Natlan', domainName: 'Blazing Ruins (Natlan)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104347.png',
        chars: ['Mualani', 'Kinich', 'Kachina'],
        wps: ["Surf's Up", 'Fang of the Mountain King']
      }
    ]
  },
  {
    name: 'TUESDAY_FRIDAY',
    domains: [
      {
        region: 'Mondstadt', domainName: 'Forsaken Rift (Mondstadt)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104304.png',
        chars: ['Diluc', 'Jean', 'Mona', 'Noelle', 'Razor', 'Eula'],
        wps: ["Wolf's Gravestone"]
      },
      {
        region: 'Liyue', domainName: 'Taishan Mansion (Liyue)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104308.png',
        chars: ['Ganyu', 'Hu Tao', 'Kaedehara Kazuha', 'Xiangling', 'Chongyun', 'Yun Jin'],
        wps: ['Staff of Homa']
      }
    ]
  },
  {
    name: 'WEDNESDAY_SATURDAY',
    domains: [
      {
        region: 'Mondstadt', domainName: 'Forsaken Rift (Mondstadt)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104305.png',
        chars: ['Venti', 'Albedo', 'Rosaria', 'Fischl', 'Kaeya'],
        wps: ["Amos' Bow"]
      },
      {
        region: 'Liyue', domainName: 'Taishan Mansion (Liyue)', itemIcon: 'https://gi.yatta.moe/assets/UI/UI_ItemIcon_104311.png',
        chars: ['Zhongli', 'Xingqiu', 'Beidou', 'Xinyan', 'Yanfei', 'Baizhu'],
        wps: ['Lost Prayer to the Sacred Winds']
      }
    ]
  }
];

let out = `export interface DailyDomain {
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

`;

for (const group of domainsData) {
  out += `const ${group.name}: DailyDomain[] = [\n`;
  for (const dom of group.domains) {
    const charsStr = dom.chars.map(c).filter(Boolean).join(', ');
    const wpsStr = dom.wps.map(w).filter(Boolean).join(', ');
    out += `  {
    region: '${dom.region}',
    domainName: '${dom.domainName}',
    itemIcon: '${dom.itemIcon}',
    characters: [${charsStr}],
    weapons: [${wpsStr}]
  },\n`;
  }
  out += `];\n\n`;
}

out += `const scheduleMap: Record<number, DailyDomain[]> = {
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
`;

fs.writeFileSync('../frontend/data/dailyFarming.ts', out);
console.log("Written successfully");
