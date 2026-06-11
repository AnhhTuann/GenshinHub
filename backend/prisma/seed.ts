import { PrismaClient } from '@prisma/client';
import { seedCharacters } from './seeds/characters';
import { seedMaterials } from './seeds/materials';
import { seedArtifacts } from './seeds/artifacts';
import { seedWeapons } from './seeds/weapons';

const prisma = new PrismaClient();

async function main() {
  console.log('--- BẮT ĐẦU SEED DATABASE ---');
  
  const targetId = process.env.SEED_CHARACTER;
  if (targetId) {
    console.log(`Chỉ chạy seed cho nhân vật: ${targetId}. Bỏ qua vật phẩm, vũ khí, tdv.`);
    await seedCharacters(prisma);
  } else {
    await seedMaterials(prisma);
    await seedArtifacts(prisma);
    await seedWeapons(prisma);
    await seedCharacters(prisma);
  }

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
