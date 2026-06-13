const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function run() {
  console.log("\n--- Checking Materials ---");
  const materials = await prisma.material.findMany();
  const materialDocsContent = fs.readFileSync(path.join(__dirname, '../docs/materials.md'), 'utf-8');
  const materialMatches = [...materialDocsContent.matchAll(/\| `(UI_ItemIcon_.*?)` \| (.*?) \|/g)];
  let missingMaterialsDb = [];
  let missingMaterialsImg = [];
  for (const match of materialMatches) {
    const filename = match[1].trim();
    const nameEn = match[2].trim();
    
    // Check if filename id is in DB. Material DB id is usually the number in filename.
    const idMatch = filename.match(/UI_ItemIcon_(\d+)\.png/);
    if (idMatch) {
      const id = idMatch[1];
      const materialInDb = materials.find(m => m.id === id);
      if (!materialInDb) {
        missingMaterialsDb.push({ id, filename, nameEn });
      }
    }
  }
  console.log(`Missing materials in DB:`, missingMaterialsDb.length);
  if (missingMaterialsDb.length > 0) console.log(missingMaterialsDb);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
