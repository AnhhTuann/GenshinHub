const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const sets = await prisma.artifactSet.findMany();
  console.log(`Total sets: ${sets.length}`);
  console.log("First 10 sets:", sets.slice(0, 10).map(s => ({ id: s.id, name: s.name, iconUrl: s.iconUrl })));
  const specific = sets.filter(s => s.name.includes("Bóng Hình") || s.name.includes("Bóng hình") || s.name.includes("Ma Nữ") || s.name.includes("ma nữ"));
  console.log("Matches:", specific);
}
main().catch(console.error).finally(() => prisma.$disconnect());
