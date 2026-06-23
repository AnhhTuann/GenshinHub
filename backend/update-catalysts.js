const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "Lost Prayer to the Sacred Winds": { tier: "SS", roles: ["Main DPS"] },
  "Tulaytullah's Remembrance": { tier: "SS", roles: ["Main DPS"] },
  "The Widsith": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Sunny Morning Sleep-In": { tier: "SS", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Kagura's Verity": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "Starcaller's Watch": { tier: "SS", roles: ["Support"] },
  "A Thousand Floating Dreams": { tier: "SS", roles: ["Support"] },
  "Prototype Amber": { tier: "SS", roles: ["Support"] },
  "Thrilling Tales of Dragon Slayers": { tier: "SS", roles: ["Support"] },
  "Surf's Up": { tier: "S", roles: ["Main DPS"] },
  "Vivid Notions": { tier: "S", roles: ["Main DPS"] },
  "Cashflow Supervision": { tier: "S", roles: ["Main DPS"] },
  "Tome of the Eternal Flow": { tier: "S", roles: ["Main DPS"] },
  "Skyward Atlas": { tier: "S", roles: ["Main DPS", "Sub DPS"] },
  "Dawning Frost": { tier: "S", roles: ["Main DPS"] },
  "Sacrificial Fragments": { tier: "S", roles: ["Sub DPS", "Support"] },
  "Crane's Echoing Call": { tier: "S", roles: ["Support"] },
  "Favonius Codex": { tier: "S", roles: ["Sub DPS", "Support"] },
  "Wandering Evenstar": { tier: "S", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Reliquary of Truth": { tier: "A", roles: ["Main DPS"] },
  "Nightweaver's Looking Glass": { tier: "A", roles: ["Main DPS"] },
  "Memory of Dust": { tier: "A", roles: ["Main DPS"] },
  "Ring of Yaxche": { tier: "A", roles: ["Main DPS"] },
  "Etherlight Spindlelute": { tier: "A", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Ballad of the Boundless Blue": { tier: "A", roles: ["Main DPS"] },
  "Solar Pearl": { tier: "A", roles: ["Main DPS"] },
  "Nocturne's Curtain Call": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Fruit of Fulfillment": { tier: "A", roles: ["Sub DPS"] },
  "Blackmarrow Lantern": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Hakushin Ring": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Mappa Mare": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Magic Guide": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Oathsworn Eye": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Ash-Graven Drinking Horn": { tier: "B", roles: ["Main DPS"] },
  "Flowing Purity": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Dodoco Tales": { tier: "B", roles: ["Main DPS"] },
  "Waveriding Whirl": { tier: "B", roles: ["Sub DPS", "Support"] },
  "Sacrificial Jade": { tier: "B", roles: ["Sub DPS"] },
  "Everlasting Moonglow": { tier: "B", roles: ["Main DPS", "Support"] },
  "Jadefall's Splendor": { tier: "B", roles: ["Support"] },
  "Blackcliff Agate": { tier: "C", roles: ["Main DPS"] },
  "Emerald Orb": { tier: "C", roles: ["Sub DPS"] }
};

async function updateDB() {
  const catalysts = await prisma.weapon.findMany({
    where: { type: 'Pháp Khí' }
  });

  const nameToId = {};
  for (const w of catalysts) {
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
