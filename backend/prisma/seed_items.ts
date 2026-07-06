import { PrismaClient } from '@prisma/client';
import { seedMaterials } from './seeds/materials';
import { seedArtifacts } from './seeds/artifacts';
import { seedWeapons } from './seeds/weapons';

const prisma = new PrismaClient();

async function main() {
  console.log('--- BẮT ĐẦU SEED ITEMS ---');
  await seedMaterials(prisma);
  await seedArtifacts(prisma);
  await seedWeapons(prisma);
  console.log('--- HOÀN TẤT SEED ITEMS ---');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
