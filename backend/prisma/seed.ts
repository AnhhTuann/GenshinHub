import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const initialData = [
  {
    id: "hu-tao", name: "Hu Tao", title: "Fragrance in Thaw", rarity: 5, element: "Pyro", weapon: "Polearm", region: "Liyue",
    avatarUrl: "/characters/hu-tao-avatar.webp", splashArtUrl: "/characters/hu-tao-splash.webp",
    talentPriority: ["Normal Attack", "Elemental Skill", "Elemental Burst"], bestTeams: ["xingqiu", "zhongli", "yelan"],
    bestWeapons: [
      { weaponId: "staff-of-homa", name: "Staff of Homa", rank: 1, isF2P: false },
      { weaponId: "dragons-bane", name: "Dragon's Bane", rank: 2, isF2P: true }
    ],
    bestArtifacts: [
      { setName: "Crimson Witch of Flames", pieces: 4, sands: ["HP%", "Elemental Mastery"], goblet: ["Pyro DMG Bonus"], circlet: ["CRIT Rate", "CRIT DMG"], subStatsPriority: ["CRIT Rate", "CRIT DMG", "Elemental Mastery", "HP%"] }
    ]
  }
];

async function main() {
  console.log('Bắt đầu seed dữ liệu...');
  for (const char of initialData) {
    await prisma.character.create({
      data: {
        id: char.id, name: char.name, title: char.title, rarity: char.rarity, element: char.element, weapon: char.weapon, region: char.region, avatarUrl: char.avatarUrl, splashArtUrl: char.splashArtUrl, talentPriority: char.talentPriority, bestTeams: char.bestTeams,
        bestWeapons: { create: char.bestWeapons },
        bestArtifacts: { create: char.bestArtifacts }
      }
    });
  }
  console.log('Seed dữ liệu thành công!');
}
main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
