const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '../frontend/public');

async function main() {
  const characters = await prisma.character.findMany({
    include: {
      bestWeapons: true,
      bestArtifacts: true
    }
  });

  const missingAvatars = [];
  const missingSplashes = [];
  const missingWeapons = [];
  const missingArtifacts = [];

  for (const char of characters) {
    // 1. Check avatar
    if (char.avatarUrl) {
      const p = path.join(PUBLIC_DIR, char.avatarUrl);
      if (!fs.existsSync(p)) {
        missingAvatars.push({ character: char.name, url: char.avatarUrl });
      }
    } else {
      missingAvatars.push({ character: char.name, url: null });
    }

    // 2. Check splash
    if (char.splashArtUrl) {
      const p = path.join(PUBLIC_DIR, char.splashArtUrl);
      if (!fs.existsSync(p)) {
        missingSplashes.push({ character: char.name, url: char.splashArtUrl });
      }
    } else {
      missingSplashes.push({ character: char.name, url: null });
    }

    // 3. Check best weapons
    for (const w of char.bestWeapons) {
      if (w.iconUrl) {
        const p = path.join(PUBLIC_DIR, w.iconUrl);
        if (!fs.existsSync(p)) {
          missingWeapons.push({ character: char.name, weapon: w.name, url: w.iconUrl });
        }
      } else {
        missingWeapons.push({ character: char.name, weapon: w.name, url: null });
      }
    }

    // 4. Check best artifacts
    for (const art of char.bestArtifacts) {
      if (art.setNameVi === "Thánh Di Vật Đề Cử" || art.setNameVi.startsWith("Mix")) {
        const p = path.join(PUBLIC_DIR, "/images/artifacts/UI_RelicIcon_15001_4.png");
        if (!fs.existsSync(p)) {
          missingArtifacts.push({ character: char.name, artifact: art.setNameVi, url: "/images/artifacts/UI_RelicIcon_15001_4.png" });
        }
        continue;
      }
      const set = await prisma.artifactSet.findFirst({ where: { nameVi: art.setNameVi } });
      if (set && set.iconUrl) {
        const p = path.join(PUBLIC_DIR, set.iconUrl);
        if (!fs.existsSync(p)) {
          missingArtifacts.push({ character: char.name, artifact: art.setNameVi, url: set.iconUrl });
        }
      } else {
        missingArtifacts.push({ character: char.name, artifact: art.setNameVi, url: null });
      }
    }
  }

  console.log('--- MISSING AVATARS ---');
  console.log(JSON.stringify(missingAvatars, null, 2));

  console.log('\n--- MISSING SPLASHES ---');
  console.log(JSON.stringify(missingSplashes, null, 2));

  console.log('\n--- MISSING WEAPONS ---');
  console.log(JSON.stringify(missingWeapons, null, 2));

  console.log('\n--- MISSING ARTIFACTS ---');
  console.log(JSON.stringify(missingArtifacts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
