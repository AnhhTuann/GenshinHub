import { PrismaClient } from '@prisma/client';
import { seedCharacters } from './seeds/characters';
import { seedMaterials } from './seeds/materials';
import { seedArtifacts } from './seeds/artifacts';
import { seedWeapons } from './seeds/weapons';

const prisma = new PrismaClient();

async function main() {
  console.log('--- BẮT ĐẦU SEED DATABASE ---');
  
  // Bạn có thể comment lại những phần không muốn chạy để tiết kiệm thời gian
  await seedMaterials(prisma);
  await seedArtifacts(prisma);
  await seedWeapons(prisma);
  await seedCharacters(prisma);

  console.log('--- HOÀN TẤT SEED DATABASE ---');
}

main()
  .catch(e => {
    console.error('LỖI SEED DATABASE:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
