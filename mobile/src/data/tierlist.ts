export type Tier = 'SS' | 'S' | 'A' | 'B' | 'C' | 'Unranked';

// Define tiers by English Names for better matching
const characterTiers: Record<Tier, string[]> = {
  'SS': [
    'Hu Tao', 'Neuvillette', 'Furina', 'Kaedehara Kazuha', 'Nahida',
    'Zhongli', 'Yelan', 'Alhaitham', 'Raiden Shogun', 'Arlecchino', 'Mavuika', 'Xilonen', 'Chasca'
  ],
  'S': [
    'Kamisato Ayaka', 'Tartaglia', 'Xiao', 'Ganyu', 'Nilou',
    'Navia', 'Lyney', 'Wriothesley', 'Albedo', 'Yae Miko', 'Shenhe', 'Kokomi', 'Baizhu', 'Clorinde', 'Kinich'
  ],
  'A': [
    'Eula', 'Itto', 'Cyno', 'Ayato', 'Tighnari', 'Wanderer', 'Keqing', 'Diluc', 'Yoimiya', 'Klee', 'Mona', 'Jean', 'Venti'
  ],
  'B': [
    'Qiqi', 'Dehya', 'Aloy', 'Chongyun', 'Xinyan', 'Razor', 'Ningguang'
  ],
  'C': [
    'Amber', 'Lisa', 'Kaeya'
  ],
  'Unranked': [] // Fallback for others (4-stars mostly)
};

const weaponTiers: Record<Tier, string[]> = {
  'SS': [
    'Staff of Homa', 'Aqua Simulacra', 'Mistsplitter Reforged', 'Primordial Jade Cutter', 'Elegy for the End', 'Key of Khaj-Nisut', "A Thousand Floating Dreams", "Tome of the Eternal Flow", "Crimson Moon's Semblance"
  ],
  'S': [
    'Engulfing Lightning', 'Thundering Pulse', 'Polar Star', 'Haran Geppaku Futsu', 'Redhorn Stonethresher', "Wolf's Gravestone", 'Freedom-Sworn', 'Kagura\'s Verity', 'Skyward Harp', 'Amos\' Bow'
  ],
  'A': [
    'The Catch', 'The Widsith', 'Serpent Spine', 'Deathmatch', 'The Black Sword', 'Favonius Sword', 'Favonius Lance', 'Favonius Greatsword', 'Favonius Codex', 'Favonius Warbow', 'Sacrificial Sword', 'Sacrificial Bow'
  ],
  'B': [
    'Skyward Blade', 'Skyward Pride', 'Skyward Atlas', 'Skyward Spine', 'Aquila Favonia', 'Memory of Dust', 'The Unforged', 'Vortex Vanquisher', 'Summit Shaper'
  ],
  'C': [
    'The Bell', 'Eye of Perception', 'Rainslasher'
  ],
  'Unranked': []
};

// Helper functions to get tier by name
export function getCharacterTier(nameEn: string): Tier {
  for (const [tier, names] of Object.entries(characterTiers)) {
    if (names.includes(nameEn)) return tier as Tier;
  }
  return 'Unranked'; // Or you could default to 'A' or 'B'
}

export function getWeaponTier(nameEn: string): Tier {
  for (const [tier, names] of Object.entries(weaponTiers)) {
    if (names.includes(nameEn)) return tier as Tier;
  }
  return 'Unranked';
}

// Colors and styling for tiers
export const TIER_STYLES: Record<Tier, { bg: string; text: string; border: string }> = {
  'SS': { bg: 'bg-[#ff4a4a]/20', text: 'text-[#ff4a4a]', border: 'border-[#ff4a4a]/30' },
  'S':  { bg: 'bg-[#ff9900]/20', text: 'text-[#ff9900]', border: 'border-[#ff9900]/30' },
  'A':  { bg: 'bg-[#c084fc]/20', text: 'text-[#c084fc]', border: 'border-[#c084fc]/30' },
  'B':  { bg: 'bg-[#4fc3f7]/20', text: 'text-[#4fc3f7]', border: 'border-[#4fc3f7]/30' },
  'C':  { bg: 'bg-[#aed581]/20', text: 'text-[#aed581]', border: 'border-[#aed581]/30' },
  'Unranked': { bg: 'bg-white/5', text: 'text-white/40', border: 'border-white/10' }
};

export const TIERS_ORDER: Tier[] = ['SS', 'S', 'A', 'B', 'C', 'Unranked'];

export type Role = 'Main DPS' | 'Sub DPS' | 'Support';

const characterRoles: Record<Role, string[]> = {
  'Main DPS': [
    'Hu Tao', 'Neuvillette', 'Arlecchino', 'Kamisato Ayaka', 'Xiao', 'Ganyu', 'Arataki Itto', 'Cyno', 'Wanderer', 'Keqing', 'Diluc', 'Yoimiya', 'Klee', 'Eula', 'Lyney', 'Wriothesley', 'Navia', 'Clorinde', 'Kinich', 'Chasca', 'Mavuika', 'Tartaglia', 'Razor', 'Ningguang', 'Yanfei', 'Freminet', 'Gaming', 'Sethos', 'Tighnari', 'Kamisato Ayato', 'Alhaitham'
  ],
  'Sub DPS': [
    'Furina', 'Yelan', 'Albedo', 'Yae Miko', 'Fischl', 'Xingqiu', 'Xiangling', 'Beidou', 'Chiori', 'Emilie', 'Rosaria', 'Kaeya', 'Lisa', 'Aloy', 'Collei'
  ],
  'Support': [
    'Kaedehara Kazuha', 'Nahida', 'Zhongli', 'Sangonomiya Kokomi', 'Baizhu', 'Shenhe', 'Venti', 'Jean', 'Mona', 'Qiqi', 'Diona', 'Bennett', 'Sucrose', 'Barbara', 'Noelle', 'Dori', 'Layla', 'Faruzan', 'Yaoyao', 'Mika', 'Kirara', 'Lynette', 'Charlotte', 'Chevreuse', 'Kachina', 'Kuki Shinobu', 'Gorou', 'Kujou Sara', 'Thoma', 'Xinyan', 'Sayu', 'Yun Jin', 'Candace', 'Nilou', 'Xilonen', 'Sigewinne', 'Ororon', 'Raiden Shogun'
  ]
};

export function getCharacterRole(nameEn: string): Role {
  for (const [role, names] of Object.entries(characterRoles)) {
    if (names.includes(nameEn)) return role as Role;
  }
  return 'Support'; // Default
}