const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function convertPath(oldPath) {
  if (!oldPath || !oldPath.includes('/images/')) return oldPath;
  
  return oldPath.replace(/\/images\/([a-zA-Z0-9_\-\/]+)\.png/g, (match, p1) => {
    let np = p1;
    np = np.replace(/^avatars\//, 'characters/');
    np = np.replace(/^splash\//, 'characters/');
    np = np.replace(/^artifacts\//, 'items/');
    np = np.replace(/^materials\//, 'items/');
    
    if (oldPath.includes('/avatars/')) {
      np = np + '_avatar';
    } else if (oldPath.includes('/splash/')) {
      np = np + '_splash';
    }
    
    return `/assets/${np}.webp`;
  });
}

async function run() {
  console.log('Bắt đầu cập nhật Database...');
  
  // Characters
  const chars = await prisma.character.findMany();
  for (const char of chars) {
    const newAvatar = convertPath(char.avatarUrl);
    const newSplash = convertPath(char.splashArtUrl);
    
    if (newAvatar !== char.avatarUrl || newSplash !== char.splashArtUrl) {
      await prisma.character.update({
        where: { id: char.id },
        data: {
          avatarUrl: newAvatar,
          splashArtUrl: newSplash,
        }
      });
      console.log(`Cập nhật Character: ${char.id}`);
    }
  }

  // Weapons
  const weapons = await prisma.weapon.findMany();
  for (const w of weapons) {
    const newIcon = convertPath(w.iconUrl);
    if (newIcon !== w.iconUrl) {
      await prisma.weapon.update({
        where: { id: w.id },
        data: { iconUrl: newIcon }
      });
      console.log(`Cập nhật Weapon: ${w.id}`);
    }
  }

  // Materials
  const materials = await prisma.material.findMany();
  for (const m of materials) {
    const newIcon = convertPath(m.iconUrl);
    if (newIcon !== m.iconUrl) {
      await prisma.material.update({
        where: { id: m.id },
        data: { iconUrl: newIcon }
      });
      console.log(`Cập nhật Material: ${m.id}`);
    }
  }

  // Artifacts
  const artifacts = await prisma.artifactSet.findMany();
  for (const a of artifacts) {
    const newIcon = convertPath(a.iconUrl);
    if (newIcon !== a.iconUrl) {
      await prisma.artifactSet.update({
        where: { id: a.id },
        data: { iconUrl: newIcon }
      });
      console.log(`Cập nhật Artifact: ${a.id}`);
    }
  }

  // CharacterWeapon
  const charWeapons = await prisma.characterWeapon.findMany();
  for (const cw of charWeapons) {
    if (cw.iconUrl) {
      const newIcon = convertPath(cw.iconUrl);
      if (newIcon !== cw.iconUrl) {
        await prisma.characterWeapon.update({
          where: { id: cw.id },
          data: { iconUrl: newIcon }
        });
        console.log(`Cập nhật CharacterWeapon: ${cw.id}`);
      }
    }
  }

  console.log('Hoàn tất cập nhật Database!');
}

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
