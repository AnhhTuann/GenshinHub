const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  // --- SS Weapons (from previous script, merging new roles if needed) ---
  "11505": { tier: "SS", roles: ["Main DPS", "Sub DPS"] }, // Primordial Jade Cutter
  "11509": { tier: "SS", roles: ["Main DPS"] }, // Mistsplitter Reforged
  "11510": { tier: "SS", roles: ["Main DPS"] }, // Haran Geppaku Futsu
  "11513": { tier: "SS", roles: ["Main DPS", "Sub DPS"] }, // Splendor of Tranquil Waters (Added Main DPS from S)
  "11503": { tier: "SS", roles: ["Sub DPS", "Support"] }, // Freedom-Sworn
  "11403": { tier: "SS", roles: ["Sub DPS", "Support"] }, // Sacrificial Sword (Added Support from S)
  "11516": { tier: "SS", roles: ["Support"] }, // Peak Patrol Song
  "11401": { tier: "SS", roles: ["Sub DPS", "Support"] }, // Favonius Sword (Added Sub DPS from S)
  "11418": { tier: "SS", roles: ["Sub DPS", "Support"] }, // Xiphos' Moonlight (Added Sub DPS from S)

  // --- S Weapons ---
  "11514": { tier: "S", roles: ["Main DPS", "Sub DPS"] }, // Uraku Misugiri
  "11517": { tier: "S", roles: ["Main DPS"] }, // Azurelight
  "11519": { tier: "S", roles: ["Main DPS"] }, // Lightbearing Moonshard
  "11512": { tier: "S", roles: ["Main DPS"] }, // Light of Foliar Incision
  "11515": { tier: "S", roles: ["Main DPS"] }, // Absolution
  "11432": { tier: "S", roles: ["Main DPS"] }, // Calamity of Eshu
  "11424": { tier: "S", roles: ["Main DPS", "Sub DPS"] }, // Wolf-Fang (A Sub DPS)
  "11409": { tier: "S", roles: ["Main DPS"] }, // The Black Sword
  "11518": { tier: "S", roles: ["Sub DPS"] }, // Athame Artis
  "11502": { tier: "S", roles: ["Main DPS", "Sub DPS", "Support"] }, // Skyward Blade (A Main DPS)
  "11511": { tier: "S", roles: ["Sub DPS"] }, // Key of Khaj-Nisut
  "11426": { tier: "S", roles: ["Sub DPS", "Support"] }, // Fleuve Cendre Ferryman
  "11302": { tier: "S", roles: ["Main DPS", "Sub DPS"] }, // Harbinger of Dawn (A Main DPS)

  // --- A Weapons ---
  "11414": { tier: "A", roles: ["Main DPS", "Sub DPS"] }, // Amenoma Kageuchi
  "11422": { tier: "A", roles: ["Main DPS", "Sub DPS"] }, // Toukabou Shigure
  "11407": { tier: "A", roles: ["Main DPS", "Sub DPS"] }, // Iron Sting
  "11427": { tier: "A", roles: ["Sub DPS", "Support"] }, // The Dockhand's Assistant (B Support)
  "11433": { tier: "A", roles: ["Sub DPS", "Support"] }, // Serenity's Call (B Support)
  "11413": { tier: "A", roles: ["Sub DPS"] }, // Festering Desire
  "11417": { tier: "A", roles: ["Support"] }, // Sapwood Blade

  // --- B Weapons ---
  "11504": { tier: "B", roles: ["Main DPS"] }, // Summit Shaper
  "11501": { tier: "B", roles: ["Main DPS"] }, // Aquila Favonia
  "11430": { tier: "B", roles: ["Main DPS"] }, // Sturdy Bone
  "11434": { tier: "B", roles: ["Main DPS"] }, // Moonweaver's Dawn
  "11425": { tier: "B", roles: ["Main DPS"] }, // Finale of the Deep
  "11405": { tier: "B", roles: ["Main DPS", "Sub DPS"] }, // Lion's Roar
  "11408": { tier: "B", roles: ["Main DPS"] }, // Blackcliff Longsword
  "11431": { tier: "B", roles: ["Sub DPS"] }, // Flute of Ezpitzal
  "11410": { tier: "B", roles: ["Sub DPS"] }, // The Alley Flash
  "11415": { tier: "B", roles: ["Sub DPS"] }, // Cinnabar Spindle

  // --- C Weapons ---
  "11402": { tier: "C", roles: ["Main DPS"] }, // The Flute
  "11404": { tier: "C", roles: ["Main DPS"] }, // Royal Longsword
  "11406": { tier: "C", roles: ["Main DPS"] }, // Prototype Rancour
  "11304": { tier: "C", roles: ["Main DPS", "Sub DPS"] }, // Dark Iron Sword
  "11306": { tier: "C", roles: ["Main DPS"] }, // Skyrider Sword
  "11301": { tier: "C", roles: ["Sub DPS"] } // Cool Steel
};

async function updateDB() {
  for (const [id, data] of Object.entries(updates)) {
    try {
      await prisma.weapon.update({
        where: { id },
        data: {
          tier: data.tier,
          role: data.roles.join(", ")
        }
      });
      console.log(`Updated ${id} to Tier ${data.tier}`);
    } catch (e) {
      console.log(`Failed to update ${id}: ${e.message}`);
    }
  }
}

updateDB().finally(() => prisma.$disconnect());
