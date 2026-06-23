const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "varesa": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "kinich": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "arlecchino": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "mualani": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "lohen": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "venti": { "tier": "S", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "klee": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "neuvillette": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "chasca": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "nahida": { "tier": "S", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "emilie": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "yelan": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "xingqiu": { "tier": "S", "role": "Sub DPS", "recommendedC": "C6" },
  "xiangling": { "tier": "S", "role": "Sub DPS", "recommendedC": "C4" },
  "albedo": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "xilonen": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "escoffier": { "tier": "S", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "mona": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "prune": { "tier": "S", "role": "Support", "recommendedC": "C6" },
  "illuga": { "tier": "S", "role": "Support", "recommendedC": "C6" },
  "kaedehara-kazuha": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "shenhe": { "tier": "S", "role": "Support", "recommendedC": "C0" }
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
