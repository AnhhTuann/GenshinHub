const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "zibai": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "mavuika": { "tier": "SS", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "nefer": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "flins": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "skirk": { "tier": "SS", "role": "Main DPS", "recommendedC": "C1" },
  "varka": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "columbina": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "ineffa": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "lauma": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "linnea": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "durin": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C0" },
  "furina": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "escoffier": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C0" },
  "fischl": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C6" },
  "nicole": { "tier": "SS", "role": "Support", "recommendedC": "C0" },
  "bennett": { "tier": "SS", "role": "Support", "recommendedC": "C1" },
  "iansan": { "tier": "SS", "role": "Support", "recommendedC": "C2" },
  "citlali": { "tier": "SS", "role": "Support", "recommendedC": "C0" },
  "sucrose": { "tier": "SS", "role": "Support", "recommendedC": "C6" },
  "chevreuse": { "tier": "SS", "role": "Support", "recommendedC": "C6" }
};

async function main() {
  for (const [id, data] of Object.entries(updates)) {
    try {
      await prisma.character.update({
        where: { id },
        data: {
          tier: data.tier,
          role: data.role,
          recommendedC: data.recommendedC
        }
      });
      console.log(`Updated ${id} in DB.`);
    } catch (e) {
      console.log(`Could not update ${id}: ${e.message}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
