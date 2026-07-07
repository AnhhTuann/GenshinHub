const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const chars = await prisma.character.findMany();
  for (const c of chars) {
    if (!c.splashArtUrl) {
      // Find what urlSafe should be by extracting from avatarUrl
      if (c.avatarUrl) {
        const match = c.avatarUrl.match(/\/assets\/characters\/([^/]+)\/avatar\.webp/);
        if (match) {
          const urlSafe = match[1];
          await prisma.character.update({
            where: { id: c.id },
            data: { splashArtUrl: `/assets/characters/${urlSafe}/splash.webp` }
          });
          console.log(`Updated splashArtUrl for ${c.nameEn}`);
        }
      }
    }
  }
  await prisma.$disconnect();
}
run();
