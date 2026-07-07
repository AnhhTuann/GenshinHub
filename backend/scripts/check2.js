const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function r() {
  const chars = await prisma.character.findMany({ select: { splashArtUrl: true } });
  console.log(chars.map(c => c.splashArtUrl).filter(a => {
    if (!a) return false;
    const l = a.toLowerCase();
    return l.includes('mizu') || l.includes('manekin') || l.includes('mannequin') || l.includes('traveler') || l.includes('player');
  }));
  await prisma.$disconnect();
}
r();
