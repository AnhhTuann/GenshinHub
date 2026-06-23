const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "Staff of Homa": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Primordial Jade Winged-Spear": { tier: "SS", roles: ["Main DPS"] },
  "Staff of the Scarlet Sands": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Symphonist of Scents": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Engulfing Lightning": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "\"The Catch\"": { tier: "SS", roles: ["Sub DPS"] },
  "Favonius Lance": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Deathmatch": { tier: "S", roles: ["Main DPS"] },
  "Lumidouce Elegy": { tier: "S", roles: ["Sub DPS"] },
  "Skyward Spine": { tier: "S", roles: ["Main DPS", "Sub DPS"] },
  "Ballad of the Fjords": { tier: "S", roles: ["Main DPS", "Sub DPS"] },
  "Kitain Cross Spear": { tier: "S", roles: ["Sub DPS"] },
  "Wavebreaker's Fin": { tier: "S", roles: ["Sub DPS"] },
  "Rightful Reward": { tier: "S", roles: ["Support"] },
  "Dialogues of the Desert Sages": { tier: "S", roles: ["Support"] },
  "Black Tassel": { tier: "S", roles: ["Support"] },
  "Crimson Moon's Semblance": { tier: "A", roles: ["Main DPS"] },
  "Bloodsoaked Ruins": { tier: "A", roles: ["Main DPS"] },
  "Vortex Vanquisher": { tier: "A", roles: ["Main DPS", "Support"] },
  "Calamity Queller": { tier: "A", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Prospector's Drill": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Fractured Halo": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Mountain-Bracing Bolt": { tier: "A", roles: ["Sub DPS"] },
  "Sacrificer's Staff": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Dragon's Bane": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Moonpiercer": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Missive Windspear": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Tamayuratei no Ohanashi": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Blackcliff Pole": { tier: "B", roles: ["Main DPS"] },
  "Lithic Spear": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "White Tassel": { tier: "B", roles: ["Main DPS"] },
  "Crescent Pike": { tier: "C", roles: ["Main DPS"] },
  "Prototype Starglitter": { tier: "C", roles: ["Main DPS", "Sub DPS"] },
  "Dragonspine Spear": { tier: "C", roles: ["Main DPS"] },
  "Footprint of the Rainbow": { tier: "C", roles: ["Sub DPS"] }
};

async function updateDB() {
  const polearms = await prisma.weapon.findMany({
    where: { type: 'Vũ Khí Cán Dài' }
  });

  const nameToId = {};
  for (const w of polearms) {
    nameToId[w.nameEn] = w.id;
  }

  for (const [name, data] of Object.entries(updates)) {
    const id = nameToId[name];
    if (!id) {
      console.log(`Could not find ID for ${name}`);
      continue;
    }

    try {
      await prisma.weapon.update({
        where: { id },
        data: {
          tier: data.tier,
          role: data.roles.join(", ")
        }
      });
      console.log(`Updated ${name} (ID: ${id}) to Tier ${data.tier} with roles ${data.roles.join(", ")}`);
    } catch (e) {
      console.log(`Failed to update ${name}: ${e.message}`);
    }
  }
}

updateDB().finally(() => prisma.$disconnect());
