import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initialData = [
  {
    id: "hu-tao", name: "Hu Tao", title: "Fragrance in Thaw", rarity: 5, element: "Pyro", weapon: "Polearm", region: "Liyue",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Hutao.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png",
    talentPriority: ["Normal Attack", "Elemental Skill", "Elemental Burst"], bestTeams: ["xingqiu", "zhongli", "yelan"],
    lore: "Hu Tao is the 77th Director of the Wangsheng Funeral Parlor, a person vital to managing Liyue's funerary affairs.",
    baseStats: { hp: 15552, atk: 106, def: 876 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Hu_Tao",
    bestWeapons: [
      { weaponId: "staff-of-homa", name: "Staff of Homa", rank: 1, isF2P: false },
      { weaponId: "dragons-bane", name: "Dragon's Bane", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Crimson Witch of Flames", pieces: 4, sands: ["HP%", "Elemental Mastery"], goblet: ["Pyro DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%"] }
    ]
  },
  {
    id: "raiden-shogun", name: "Raiden Shogun", title: "Plane of Euthymia", rarity: 5, element: "Electro", weapon: "Polearm", region: "Inazuma",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Shougun.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Shougun.png",
    talentPriority: ["Elemental Burst", "Elemental Skill", "Normal Attack"], bestTeams: ["xingqiu", "xiangling", "bennett"],
    lore: "The Raiden Shogun is the unique and supreme ruler of Inazuma.",
    baseStats: { hp: 12907, atk: 337, def: 789 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Raiden_Shogun",
    bestWeapons: [
      { weaponId: "engulfing-lightning", name: "Engulfing Lightning", rank: 1, isF2P: false },
      { weaponId: "the-catch", name: "The Catch", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Emblem of Severed Fate", pieces: 4, sands: ["Energy Recharge", "ATK%"], goblet: ["Electro DMG Bonus", "ATK%"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "ATK%"] }
    ]
  },
  {
    id: "zhongli", name: "Zhongli", title: "Vago Mundo", rarity: 5, element: "Geo", weapon: "Polearm", region: "Liyue",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Zhongli.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Zhongli.png",
    talentPriority: ["Elemental Skill", "Elemental Burst", "Normal Attack"], bestTeams: ["hu-tao", "xingqiu", "yelan"],
    lore: "A mysterious expert contracted by the Wangsheng Funeral Parlor. Extremely knowledgeable in all things.",
    baseStats: { hp: 14695, atk: 251, def: 738 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Zhongli",
    bestWeapons: [
      { weaponId: "staff-of-homa", name: "Staff of Homa", rank: 1, isF2P: false },
      { weaponId: "black-tassel", name: "Black Tassel", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Tenacity of the Millelith", pieces: 4, sands: ["HP%"], goblet: ["HP%"], circlet: ["HP%"], subStatsPriority: ["HP%", "Energy Recharge", "CRIT Rate"] }
    ]
  },
  {
    id: "furina", name: "Furina", title: "Endless Solo of Solitude", rarity: 5, element: "Hydro", weapon: "Sword", region: "Fontaine",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Furina.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Furina.png",
    talentPriority: ["Elemental Burst", "Elemental Skill", "Normal Attack"], bestTeams: ["neuvillette", "kazuha", "baizhu"],
    lore: "The absolute focus of the stage of judgment, until the final applause sounds.",
    baseStats: { hp: 15307, atk: 244, def: 696 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Furina",
    bestWeapons: [
      { weaponId: "splendor-of-tranquil-waters", name: "Splendor of Tranquil Waters", rank: 1, isF2P: false },
      { weaponId: "fleuve-cendre-ferryman", name: "Fleuve Cendre Ferryman", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Golden Troupe", pieces: 4, sands: ["HP%", "Energy Recharge"], goblet: ["HP%", "Hydro DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "HP%", "Energy Recharge"] }
    ]
  },
  {
    id: "neuvillette", name: "Neuvillette", title: "Ordainer of Inexorable Judgment", rarity: 5, element: "Hydro", weapon: "Catalyst", region: "Fontaine",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Neuvillette.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Neuvillette.png",
    talentPriority: ["Normal Attack", "Elemental Burst", "Elemental Skill"], bestTeams: ["furina", "kazuha", "zhongli"],
    lore: "The Iudex of Fontaine, known as the Ordainer of Inexorable Judgment.",
    baseStats: { hp: 14695, atk: 208, def: 576 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Neuvillette",
    bestWeapons: [
      { weaponId: "tome-of-the-eternal-flow", name: "Tome of the Eternal Flow", rank: 1, isF2P: false },
      { weaponId: "prototype-amber", name: "Prototype Amber", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Marechaussee Hunter", pieces: 4, sands: ["HP%"], goblet: ["Hydro DMG Bonus", "HP%"], circlet: ["CRIT DMG", "HP%"], subStatsPriority: ["CRIT DMG", "CRIT Rate", "HP%", "Energy Recharge"] }
    ]
  },
  {
    id: "kazuha", name: "Kaedehara Kazuha", title: "Scarlet Leaves Pursue Wild Waves", rarity: 5, element: "Anemo", weapon: "Sword", region: "Inazuma",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Kazuha.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png",
    talentPriority: ["Elemental Burst", "Elemental Skill", "Normal Attack"], bestTeams: ["childe", "xiangling", "bennett"],
    lore: "A wandering samurai from Inazuma who is currently with Liyue's Crux Fleet.",
    baseStats: { hp: 13348, atk: 297, def: 807 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Kaedehara_Kazuha",
    bestWeapons: [
      { weaponId: "freedom-sworn", name: "Freedom-Sworn", rank: 1, isF2P: false },
      { weaponId: "iron-sting", name: "Iron Sting", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Viridescent Venerer", pieces: 4, sands: ["Elemental Mastery", "Energy Recharge"], goblet: ["Elemental Mastery"], circlet: ["Elemental Mastery"], subStatsPriority: ["Elemental Mastery", "Energy Recharge"] }
    ]
  },
  {
    id: "ayaka", name: "Kamisato Ayaka", title: "Frostflake Heron", rarity: 5, element: "Cryo", weapon: "Sword", region: "Inazuma",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Ayaka.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png",
    talentPriority: ["Elemental Burst", "Normal Attack", "Elemental Skill"], bestTeams: ["shenhe", "kazuha", "kokomi"],
    lore: "Daughter of the Yashiro Commission's Kamisato Clan from Inazuma. Dignified and elegant, wise and strong.",
    baseStats: { hp: 12858, atk: 342, def: 784 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Kamisato_Ayaka",
    bestWeapons: [
      { weaponId: "mistsplitter-reforged", name: "Mistsplitter Reforged", rank: 1, isF2P: false },
      { weaponId: "amenoma-kageuchi", name: "Amenoma Kageuchi", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Blizzard Strayer", pieces: 4, sands: ["ATK%"], goblet: ["Cryo DMG Bonus"], circlet: ["CRIT DMG", "ATK%"], subStatsPriority: ["CRIT DMG", "ATK%", "Energy Recharge", "CRIT Rate"] }
    ]
  },
  {
    id: "ganyu", name: "Ganyu", title: "Plenilune Gaze", rarity: 5, element: "Cryo", weapon: "Bow", region: "Liyue",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Ganyu.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Ganyu.png",
    talentPriority: ["Normal Attack", "Elemental Burst", "Elemental Skill"], bestTeams: ["zhongli", "xiangling", "bennett"],
    lore: "The secretary at Yuehai Pavilion. The blood of the qilin, an illuminated beast, flows within her veins.",
    baseStats: { hp: 9797, atk: 335, def: 630 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Ganyu",
    bestWeapons: [
      { weaponId: "amos-bow", name: "Amos' Bow", rank: 1, isF2P: false },
      { weaponId: "prototype-crescent", name: "Prototype Crescent", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Wanderer's Troupe", pieces: 4, sands: ["ATK%", "Elemental Mastery"], goblet: ["Cryo DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"] }
    ]
  },
  {
    id: "nahida", name: "Nahida", title: "Physic of Purity", rarity: 5, element: "Dendro", weapon: "Catalyst", region: "Sumeru",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Nahida.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Nahida.png",
    talentPriority: ["Elemental Skill", "Elemental Burst", "Normal Attack"], bestTeams: ["nilou", "xingqiu", "baizhu"],
    lore: "A caged bird secluded within the Sanctuary of Surasthana who can only see the world in her dreams.",
    baseStats: { hp: 10366, atk: 299, def: 630 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Nahida",
    bestWeapons: [
      { weaponId: "a-thousand-floating-dreams", name: "A Thousand Floating Dreams", rank: 1, isF2P: false },
      { weaponId: "magic-guide", name: "Magic Guide", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Deepwood Memories", pieces: 4, sands: ["Elemental Mastery"], goblet: ["Elemental Mastery", "Dendro DMG Bonus"], circlet: ["Elemental Mastery", "CRIT Rate", "CRIT DMG"], subStatsPriority: ["Elemental Mastery", "CRIT Rate", "CRIT DMG", "Energy Recharge"] }
    ]
  },
  {
    id: "arlecchino", name: "Arlecchino", title: "Dire Balemoon", rarity: 5, element: "Pyro", weapon: "Polearm", region: "Snezhnaya",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Arlecchino.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png",
    talentPriority: ["Normal Attack", "Elemental Skill", "Elemental Burst"], bestTeams: ["yelan", "bennett", "zhongli"],
    lore: "The Knave, Fourth of the Fatui Harbingers. A poised, ruthless diplomat.",
    baseStats: { hp: 13103, atk: 342, def: 765 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Arlecchino",
    bestWeapons: [
      { weaponId: "crimson-moons-semblance", name: "Crimson Moon's Semblance", rank: 1, isF2P: false },
      { weaponId: "white-tassel", name: "White Tassel", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Fragment of Harmonic Whimsy", pieces: 4, sands: ["ATK%"], goblet: ["Pyro DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Elemental Mastery"] }
    ]
  },
  {
    id: "yelan", name: "Yelan", title: "Valley Orchid", rarity: 5, element: "Hydro", weapon: "Bow", region: "Liyue",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Yelan.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Yelan.png",
    talentPriority: ["Elemental Burst", "Elemental Skill", "Normal Attack"], bestTeams: ["hu-tao", "xingqiu", "zhongli"],
    lore: "A mysterious person who claims to work for the Ministry of Civil Affairs, but is a non-entity on their records.",
    baseStats: { hp: 14450, atk: 244, def: 548 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Yelan",
    bestWeapons: [
      { weaponId: "aqua-simulacra", name: "Aqua Simulacra", rank: 1, isF2P: false },
      { weaponId: "favonius-warbow", name: "Favonius Warbow", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Emblem of Severed Fate", pieces: 4, sands: ["HP%", "Energy Recharge"], goblet: ["Hydro DMG Bonus", "HP%"], circlet: ["CRIT Rate", "CRIT DMG", "HP%"], subStatsPriority: ["Energy Recharge", "CRIT Rate", "CRIT DMG", "HP%"] }
    ]
  },
  {
    id: "navia", name: "Navia", title: "Helm of the Radiant Rose", rarity: 5, element: "Geo", weapon: "Claymore", region: "Fontaine",
    avatarUrl: "https://enka.network/ui/UI_AvatarIcon_Navia.png", splashArtUrl: "https://enka.network/ui/UI_Gacha_AvatarImg_Navia.png",
    talentPriority: ["Elemental Skill", "Normal Attack", "Elemental Burst"], bestTeams: ["zhongli", "xiangling", "bennett"],
    lore: "The President of the Spina di Rosula, who is always eager to solve the problems of the people of Fontaine.",
    baseStats: { hp: 12650, atk: 352, def: 793 }, fandomUrl: "https://genshin-impact.fandom.com/wiki/Navia",
    bestWeapons: [
      { weaponId: "verdict", name: "Verdict", rank: 1, isF2P: false },
      { weaponId: "serpent-spine", name: "Serpent Spine", rank: 2, isF2P: false }
    ],
    bestArtifacts: [
      { setName: "Nighttime Whispers in the Echoing Woods", pieces: 4, sands: ["ATK%"], goblet: ["Geo DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "ATK%", "Energy Recharge"] }
    ]
  }
];

async function main() {
  console.log('Bắt đầu xoá dữ liệu cũ...');
  await prisma.characterWeapon.deleteMany({});
  await prisma.characterArtifact.deleteMany({});
  await prisma.character.deleteMany({});
  
  console.log('Bắt đầu seed dữ liệu mới...');
  for (const char of initialData) {
    await prisma.character.create({
      data: {
        id: char.id, name: char.name, title: char.title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: char.region, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority, bestTeams: char.bestTeams,
        lore: char.lore, baseStats: char.baseStats, fandomUrl: char.fandomUrl,
        bestWeapons: { create: char.bestWeapons },
        bestArtifacts: { create: char.bestArtifacts }
      }
    });
  }
  console.log('Seed dữ liệu thành công!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
