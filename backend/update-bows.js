const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "Astral Vulture's Crimson Plumage": { tier: "SS", roles: ["Main DPS"] },
  "The First Great Magic": { tier: "SS", roles: ["Main DPS"] },
  "Polar Star": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Thundering Pulse": { tier: "SS", roles: ["Main DPS"] },
  "Aqua Simulacra": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Elegy for the End": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Skyward Harp": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "The Stringless": { tier: "SS", roles: ["Sub DPS"] },
  "Favonius Warbow": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Hunter's Bow": { tier: "S", roles: ["Main DPS", "Sub DPS"] },
  "Hunter's Path": { tier: "S", roles: ["Main DPS", "Sub DPS"] }, // Adding this just in case they meant Hunter's Path but got the wrong image/name
  "Amos' Bow": { tier: "S", roles: ["Main DPS"] },
  "Flower-Wreathed Feathers": { tier: "S", roles: ["Main DPS"] },
  "Rust": { tier: "S", roles: ["Main DPS"] },
  "Sacrificial Bow": { tier: "S", roles: ["Sub DPS", "Support"] },
  "The Daybreak Chronicles": { tier: "A", roles: ["Main DPS"] },
  "Scion of the Blazing Sun": { tier: "A", roles: ["Main DPS"] },
  "Hamayumi": { tier: "A", roles: ["Main DPS"] },
  "Mouun's Moon": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Silvershower Heartstrings": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Golden Frostbound Oath": { tier: "A", roles: ["Sub DPS"] },
  "Song of Stillness": { tier: "A", roles: ["Sub DPS"] },
  "Snare Hook": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Rainbow Serpent's Rain Bow": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Alley Hunter": { tier: "A", roles: ["Sub DPS"] },
  "Fading Twilight": { tier: "A", roles: ["Sub DPS"] },
  "Chain Breaker": { tier: "B", roles: ["Main DPS", "Support"] },
  "Range Gauge": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Cloudforged": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Mitternachts Waltz": { tier: "B", roles: ["Main DPS"] },
  "Blackcliff Warbow": { tier: "B", roles: ["Main DPS"] },
  "The Viridescent Hunt": { tier: "B", roles: ["Main DPS"] },
  "King's Squire": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Raven Bow": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Slingshot": { tier: "B", roles: ["Main DPS"] },
  "Sequence of Solitude": { tier: "B", roles: ["Sub DPS", "Support"] },
  "Windblume Ode": { tier: "B", roles: ["Sub DPS"] },
  "Ibis Piercer": { tier: "C", roles: ["Main DPS"] },
  "Prototype Crescent": { tier: "C", roles: ["Main DPS"] },
  "Compound Bow": { tier: "C", roles: ["Main DPS"] },
  "Sharpshooter's Oath": { tier: "C", roles: ["Main DPS", "Sub DPS"] },
  "End of the Line": { tier: "C", roles: ["Sub DPS"] },
  "Recurve Bow": { tier: "C", roles: ["Support"] }
};

async function updateDB() {
  const bows = await prisma.weapon.findMany({
    where: { type: 'Cung' }
  });

  const nameToId = {};
  for (const w of bows) {
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
