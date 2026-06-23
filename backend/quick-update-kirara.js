const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateKirara() {
  try {
    await prisma.character.update({
      where: { id: "momoka" },
      data: {
        tier: "A",
        role: "Support",
        recommendedC: "C6"
      }
    });
    console.log("Updated momoka (Kirara) in DB.");
  } catch (e) {
    console.log("Error updating momoka: " + e.message);
  }
}

updateKirara().finally(() => prisma.$disconnect());
