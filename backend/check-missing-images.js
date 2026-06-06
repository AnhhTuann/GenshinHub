const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();
const PUBLIC_DIR = path.resolve(__dirname, '../frontend/public');

async function main() {
  // Check weapons
  const weapons = await prisma.weapon.findMany();
  const missingWeapons = weapons.filter(w => {
    if (!w.iconUrl) return true;
    const dest = path.join(PUBLIC_DIR, w.iconUrl);
    return !fs.existsSync(dest);
  });
  console.log(`\nWeapons in DB: ${weapons.length}`);
  console.log(`Missing weapon images: ${missingWeapons.length}`);
  if (missingWeapons.length > 0) {
    missingWeapons.forEach(w => console.log(`  ❌ ${w.name} -> ${w.iconUrl}`));
  }

  // Check artifact sets
  const artifacts = await prisma.artifactSet.findMany();
  const missingArt = artifacts.filter(a => {
    if (!a.iconUrl) return false;
    const dest = path.join(PUBLIC_DIR, a.iconUrl);
    return !fs.existsSync(dest);
  });
  console.log(`\nArtifact Sets in DB: ${artifacts.length}`);
  console.log(`Missing artifact images: ${missingArt.length}`);
  if (missingArt.length > 0) {
    missingArt.forEach(a => console.log(`  ❌ ${a.name} -> ${a.iconUrl}`));
  }

  // Check characters
  const chars = await prisma.character.findMany();
  const missingAvatar = chars.filter(c => {
    if (!c.avatarUrl) return true;
    const dest = path.join(PUBLIC_DIR, c.avatarUrl);
    return !fs.existsSync(dest);
  });
  const missingSplash = chars.filter(c => {
    if (!c.splashArtUrl) return true;
    const dest = path.join(PUBLIC_DIR, c.splashArtUrl);
    return !fs.existsSync(dest);
  });
  console.log(`\nCharacters in DB: ${chars.length}`);
  console.log(`Missing avatar images: ${missingAvatar.length}`);
  if (missingAvatar.length > 0) missingAvatar.forEach(c => console.log(`  ❌ ${c.name} -> ${c.avatarUrl}`));
  console.log(`Missing splash images: ${missingSplash.length}`);
  if (missingSplash.length > 0) missingSplash.forEach(c => console.log(`  ❌ ${c.name} -> ${c.splashArtUrl}`));
}

main().catch(console.error).finally(() => prisma.$disconnect());
