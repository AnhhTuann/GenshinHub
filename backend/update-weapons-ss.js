const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const weaponsToUpdate = {
  // Main DPS
  "11505": { tier: "SS", roles: ["Main DPS", "Sub DPS"] }, // Primordial Jade Cutter
  "11509": { tier: "SS", roles: ["Main DPS"] }, // Mistsplitter Reforged
  "11510": { tier: "SS", roles: ["Main DPS"] }, // Haran Geppaku Futsu
  
  // Sub DPS
  "11513": { tier: "SS", roles: ["Sub DPS"] }, // Splendor of Tranquil Waters
  "11503": { tier: "SS", roles: ["Sub DPS", "Support"] }, // Freedom-Sworn
  "11403": { tier: "SS", roles: ["Sub DPS"] }, // Sacrificial Sword
  
  // Support
  "11516": { tier: "SS", roles: ["Support"] }, // Peak Patrol Song
  "11401": { tier: "SS", roles: ["Support"] }, // Favonius Sword
  "11418": { tier: "SS", roles: ["Support"] } // Xiphos' Moonlight
};

async function updateDB() {
  for (const [id, data] of Object.entries(weaponsToUpdate)) {
    try {
      await prisma.weapon.update({
        where: { id: id },
        data: {
          tier: data.tier,
          role: data.roles.join(", ")
        }
      });
      console.log(`Updated ${id} in DB.`);
    } catch (e) {
      console.log(`Could not update ${id} in DB: ` + e.message);
    }
  }
}

updateDB().finally(() => prisma.$disconnect());
