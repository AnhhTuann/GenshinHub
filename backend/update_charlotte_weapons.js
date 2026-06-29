const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const weaponNames = [
    'Prototype Amber',
    'Favonius Codex',
    'Thrilling Tales of Dragon Slayers',
    'Oathsworn Eye',
    'Wine and Song'
  ];
  
  const weapons = await prisma.weapon.findMany({
    where: {
      nameEn: { in: weaponNames }
    }
  });

  const getW = (name) => weapons.find(w => w.nameEn === name);

  const pAmber = getW('Prototype Amber');
  const fav = getW('Favonius Codex');
  const ttds = getW('Thrilling Tales of Dragon Slayers');
  const oathsworn = getW('Oathsworn Eye');
  const wine = getW('Wine and Song');

  if (!pAmber || !fav || !ttds || !oathsworn || !wine) {
    console.log('Missing some weapons!');
    console.log(weapons.map(w => w.nameEn));
    return;
  }

  const bestWeaponsData = [
    {
      weaponId: pAmber.id,
      nameEn: pAmber.nameEn,
      nameVi: pAmber.nameVi,
      rank: 1,
      isF2P: true,
      iconUrl: pAmber.iconUrl,
      subStat: 'HP%',
      passiveDescEn: 'Restores Energy and heals the team over time, easing Charlotte\'s energy requirements and providing passive healing.',
      passiveDescVi: 'Phục hồi Năng lượng và hồi máu cho đội theo thời gian, giảm yêu cầu Nạp của Charlotte và cung cấp khả năng hồi phục thụ động.'
    },
    {
      weaponId: fav.id,
      nameEn: fav.nameEn,
      nameVi: fav.nameVi,
      rank: 2,
      isF2P: false,
      iconUrl: fav.iconUrl,
      subStat: 'Energy Recharge',
      passiveDescEn: 'Generates clear particles on CRIT, boosting team energy regeneration. Requires some CRIT Rate investment.',
      passiveDescVi: 'Tạo hạt năng lượng trắng khi Bạo kích, tăng khả năng hồi năng lượng cho đội. Yêu cầu một số chỉ số Tỷ lệ Bạo kích.'
    },
    {
      weaponId: ttds.id,
      nameEn: ttds.nameEn,
      nameVi: ttds.nameVi,
      rank: 3,
      isF2P: true,
      iconUrl: ttds.iconUrl,
      subStat: 'HP%',
      passiveDescEn: 'Swapping to another character grants a massive ATK% buff for 10s. Ideal for supporting a main DPS.',
      passiveDescVi: 'Đổi sang nhân vật khác cung cấp buff %Tấn công khổng lồ trong 10s. Lý tưởng để hỗ trợ một DPS chính.'
    },
    {
      weaponId: oathsworn.id,
      nameEn: oathsworn.nameEn,
      nameVi: oathsworn.nameVi,
      rank: 4,
      isF2P: true,
      refinement: 5,
      iconUrl: oathsworn.iconUrl,
      subStat: 'ATK%',
      passiveDescEn: 'Increases Energy Recharge after using Skill, helping fund her Burst without relying on CRIT.',
      passiveDescVi: 'Tăng Hiệu Quả Nạp Năng Lượng sau khi dùng Kỹ Năng, giúp sử dụng Kỹ năng nộ của cô ấy mà không cần phụ thuộc vào Bạo kích.'
    },
    {
      weaponId: wine.id,
      nameEn: wine.nameEn,
      nameVi: wine.nameVi,
      rank: 5,
      isF2P: false,
      iconUrl: wine.iconUrl,
      subStat: 'Energy Recharge',
      passiveDescEn: 'Boosts Energy Recharge and provides a team ATK% buff after using a Skill, though requires triggering Swirl.',
      passiveDescVi: 'Tăng Hiệu Quả Nạp và cung cấp buff %Tấn Công cho đội sau khi dùng Kỹ năng, nhưng yêu cầu kích hoạt phản ứng Khuếch Tán.'
    }
  ];

  await prisma.character.update({
    where: { id: 'charlotte' },
    data: { 
      bestWeapons: {
        deleteMany: {},
        create: bestWeaponsData
      }
    }
  });

  console.log('Charlotte weapons updated successfully!');
}

run().finally(() => prisma.$disconnect());
