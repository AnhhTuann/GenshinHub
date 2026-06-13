const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function run() {
  console.log("--- Checking Characters ---");
  const chars = await prisma.character.findMany();
  console.log(`Total characters in DB: ${chars.length}`);
  
  const charDocsContent = fs.readFileSync(path.join(__dirname, '../docs/characters.md'), 'utf-8');
  const charMatches = [...charDocsContent.matchAll(/\| `(.*?)` \| `(.*?)` \| (.*?) \|/g)];
  let missingCharsDb = [];
  let missingCharsImg = [];
  for (const match of charMatches) {
    if (match[1] === 'Filename') continue;
    const filename = match[1];
    const id = match[2];
    const name = match[3];
    
    // Check DB
    if (!chars.find(c => c.id === id || c.id === id.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))) {
      missingCharsDb.push({ id, name });
    }
    
    // Check image
    const imgPath = path.join(__dirname, '../frontend/public/images/avatars', filename);
    if (!fs.existsSync(imgPath) && !filename.includes('Mannequin')) {
      missingCharsImg.push(filename);
    }
  }
  console.log(`Missing characters in DB from docs: ${missingCharsDb.length}`);
  if (missingCharsDb.length) console.log(missingCharsDb);
  console.log(`Missing character images: ${missingCharsImg.length}`);
  if (missingCharsImg.length) console.log(missingCharsImg);

  console.log("\n--- Checking Weapons ---");
  const weapons = await prisma.weapon.findMany();
  console.log(`Total weapons in DB: ${weapons.length}`);
  const weaponDocsContent = fs.readFileSync(path.join(__dirname, '../docs/weapons.md'), 'utf-8');
  const weaponMatches = [...weaponDocsContent.matchAll(/\| `(.*?)` \| (.*?) \|/g)];
  let missingWeaponsImg = [];
  for (const match of weaponMatches) {
    if (match[1] === 'Filename') continue;
    const filename = match[1];
    const imgPath = path.join(__dirname, '../frontend/public/images/weapons', filename);
    if (!fs.existsSync(imgPath)) {
      missingWeaponsImg.push(filename);
    }
  }
  console.log(`Missing weapon images: ${missingWeaponsImg.length}`);
  if (missingWeaponsImg.length) console.log(missingWeaponsImg);

  console.log("\n--- Checking Artifacts ---");
  const artifacts = await prisma.artifactSet.findMany();
  console.log(`Total artifacts in DB: ${artifacts.length}`);
  const artifactDocsContent = fs.readFileSync(path.join(__dirname, '../docs/artifacts.md'), 'utf-8');
  const artifactMatches = [...artifactDocsContent.matchAll(/\| `(.*?)` \| (.*?) \|/g)];
  let missingArtifactsImg = [];
  for (const match of artifactMatches) {
    if (match[1] === 'Filename') continue;
    const filename = match[1];
    const imgPath = path.join(__dirname, '../frontend/public/images/artifacts', filename);
    if (!fs.existsSync(imgPath)) {
      missingArtifactsImg.push(filename);
    }
  }
  console.log(`Missing artifact images: ${missingArtifactsImg.length}`);
  if (missingArtifactsImg.length) console.log(missingArtifactsImg);
  
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
