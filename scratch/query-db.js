const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sets = await prisma.artifactSet.findMany({
    where: {
      name: {
        in: ['Diệm Liệt Ma Nữ Cháy Rực', 'Dòng Hồi Ức Bất Tận', 'Giấc Mộng Hoàng Kim']
      }
    }
  });
  console.log("Database records:", sets);
}

main().catch(console.error).finally(() => prisma.$disconnect());
