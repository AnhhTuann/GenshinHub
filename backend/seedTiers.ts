import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultTiers = [
  { name: 'SS', order: 0, colorBase: 'amber' },
  { name: 'S', order: 1, colorBase: 'red' },
  { name: 'A', order: 2, colorBase: 'blue' },
  { name: 'B', order: 3, colorBase: 'gray' },
  { name: 'C', order: 4, colorBase: 'emerald' },
  { name: 'D', order: 5, colorBase: 'orange' },
];

async function main() {
  const count = await prisma.tierRank.count();
  if (count === 0) {
    for (const tier of defaultTiers) {
      await prisma.tierRank.create({ data: tier });
    }
    console.log('Seeded default TierRanks!');
  } else {
    console.log('TierRanks already seeded.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
