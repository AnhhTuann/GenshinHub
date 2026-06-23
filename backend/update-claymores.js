const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  "Verdict": { tier: "SS", roles: ["Main DPS", "Sub DPS"] },
  "A Thousand Blazing Suns": { tier: "SS", roles: ["Main DPS"] },
  "Gest of the Mighty Wolf": { tier: "SS", roles: ["Main DPS"] },
  "Beacon of the Reed Sea": { tier: "SS", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Redhorn Stonethresher": { tier: "SS", roles: ["Main DPS"] },
  "Serpent Spine": { tier: "SS", roles: ["Main DPS"] },
  "Favonius Greatsword": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Sacrificial Greatsword": { tier: "SS", roles: ["Sub DPS", "Support"] },
  "Wolf's Gravestone": { tier: "SS", roles: ["Main DPS", "Sub DPS", "Support"] },
  "Fang of the Mountain King": { tier: "S", roles: ["Main DPS"] },
  "The Unforged": { tier: "S", roles: ["Main DPS", "Support"] },
  "Song of Broken Pines": { tier: "S", roles: ["Main DPS"] },
  "Akuoumaru": { tier: "S", roles: ["Main DPS", "Sub DPS"] },
  "Makhaira Aquamarine": { tier: "S", roles: ["Sub DPS", "Support"] },
  "Skyward Pride": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Earth Shaker": { tier: "A", roles: ["Main DPS"] },
  "Flame-Forged Insight": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "\"Ultimate Overlord's Mega Magic Sword\"": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Rainslasher": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Whiteblind": { tier: "A", roles: ["Main DPS"] },
  "Mailed Flower": { tier: "A", roles: ["Main DPS", "Sub DPS"] },
  "Master Key": { tier: "A", roles: ["Sub DPS", "Support"] },
  "Katsuragikiri Nagamasa": { tier: "A", roles: ["Sub DPS"] },
  "Forest Regalia": { tier: "A", roles: ["Support"] },
  "Fruitful Hook": { tier: "B", roles: ["Main DPS"] },
  "Talking Stick": { tier: "B", roles: ["Main DPS"] },
  "Luxurious Sea-Lord": { tier: "B", roles: ["Main DPS", "Sub DPS"] },
  "Prototype Archaic": { tier: "B", roles: ["Main DPS"] },
  "Blackcliff Slasher": { tier: "B", roles: ["Main DPS"] },
  "Tidal Shadow": { tier: "C", roles: ["Main DPS", "Sub DPS"] },
  "Lithic Blade": { tier: "C", roles: ["Main DPS", "Sub DPS"] },
  "Snow-Tombed Starsilver": { tier: "C", roles: ["Main DPS"] },
  "Portable Power Saw": { tier: "C", roles: ["Sub DPS"] },
  "The Bell": { tier: "C", roles: ["Support"] }
};

async function updateDB() {
  const claymores = await prisma.weapon.findMany({
    where: { type: 'Trọng Kiếm' }
  });

  const nameToId = {};
  for (const w of claymores) {
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
