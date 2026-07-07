const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  console.log('🔄 Đang cập nhật đường dẫn ảnh trong database...');
  const characters = await prisma.character.findMany({
    select: { id: true, avatarUrl: true, splashArtUrl: true }
  });

  let count = 0;
  for (const char of characters) {
    let newAvatar = char.avatarUrl;
    let newSplash = char.splashArtUrl;
    let modified = false;

    if (newAvatar) {
      const match = newAvatar.match(/UI_AvatarIcon_([a-zA-Z0-9_]+)_avatar\.webp/);
      if (match) {
        newAvatar = `/assets/characters/${match[1]}/avatar.webp`;
        if (newAvatar !== char.avatarUrl) modified = true;
      }
    }

    if (newSplash) {
      const match = newSplash.match(/UI_Gacha_AvatarImg_([a-zA-Z0-9_]+)_splash\.webp/);
      if (match) {
        newSplash = `/assets/characters/${match[1]}/splash.webp`;
        if (newSplash !== char.splashArtUrl) modified = true;
      }
    }

    if (modified) {
      await prisma.character.update({
        where: { id: char.id },
        data: {
          avatarUrl: newAvatar,
          splashArtUrl: newSplash
        }
      });
      count++;
    }
  }

  console.log(`✅ Cập nhật thành công ${count} nhân vật!`);
  await prisma.$disconnect();
}

run();
