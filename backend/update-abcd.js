const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updates = {
  // Overrides for higher tiers acquiring new roles
  "prune": { "tier": "S", "role": "Support, Sub DPS", "recommendedC": "C6" },
  "mona": { "tier": "S", "role": "Support, Sub DPS", "recommendedC": "C0" },
  "sucrose": { "tier": "SS", "role": "Support, Sub DPS", "recommendedC": "C6" },

  // Tier A
  "clorinde": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "gaming": { "tier": "A", "role": "Main DPS", "recommendedC": "C6" },
  "razor": { "tier": "A", "role": "Main DPS", "recommendedC": "C6" },
  "navia": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "alhaitham": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "kamisato-ayaka": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "wriothesley": { "tier": "A", "role": "Main DPS", "recommendedC": "C1" },
  "lyney": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "hu-tao": { "tier": "A", "role": "Main DPS", "recommendedC": "C1" },
  "xiao": { "tier": "A", "role": "Main DPS", "recommendedC": "C0" },
  "raiden-shogun": { "tier": "A", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "nilou": { "tier": "A", "role": "Sub DPS", "recommendedC": "C0" },
  "kuki-shinobu": { "tier": "A", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "ororon": { "tier": "A", "role": "Sub DPS", "recommendedC": "C0" },
  "aino": { "tier": "A", "role": "Sub DPS", "recommendedC": "C0" },
  "chiori": { "tier": "A", "role": "Sub DPS", "recommendedC": "C1" },
  "yae-miko": { "tier": "A", "role": "Sub DPS", "recommendedC": "C0" },
  "rosaria": { "tier": "A", "role": "Sub DPS, Support", "recommendedC": "C2" },
  "xianyun": { "tier": "A", "role": "Support", "recommendedC": "C0" },
  "baizhu": { "tier": "A", "role": "Support", "recommendedC": "C0" },
  "zhongli": { "tier": "A", "role": "Support", "recommendedC": "C0" },
  "jean": { "tier": "A", "role": "Support", "recommendedC": "C0" },
  "lanyan": { "tier": "A", "role": "Support", "recommendedC": "C2" },
  "sangonomiya-kokomi": { "tier": "A", "role": "Support, Sub DPS", "recommendedC": "C0" },
  "faruzan": { "tier": "A", "role": "Support", "recommendedC": "C6" },
  "gorou": { "tier": "A", "role": "Support", "recommendedC": "C6" },
  "diona": { "tier": "A", "role": "Support", "recommendedC": "C6" },
  "yaoyao": { "tier": "A", "role": "Support", "recommendedC": "C6" },
  "charlotte": { "tier": "A", "role": "Support", "recommendedC": "C6" },
  "layla": { "tier": "A", "role": "Support", "recommendedC": "C1" },
  "kirara": { "tier": "A", "role": "Support", "recommendedC": "C6" },

  // Tier B
  "tartaglia": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "wanderer": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "yoimiya": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "diluc": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "arataki-itto": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "kamisato-ayato": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "ganyu": { "tier": "B", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "tighnari": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "sethos": { "tier": "B", "role": "Main DPS", "recommendedC": "C6" },
  "cyno": { "tier": "B", "role": "Main DPS", "recommendedC": "C0" },
  "ifa": { "tier": "B", "role": "Main DPS", "recommendedC": "C6" },
  "jahoda": { "tier": "B", "role": "Sub DPS, Support", "recommendedC": "C6" },
  "thoma": { "tier": "B", "role": "Sub DPS, Support", "recommendedC": "C6" },
  "collei": { "tier": "B", "role": "Sub DPS", "recommendedC": "C2" },
  "traveler-pyro": { "tier": "B", "role": "Sub DPS", "recommendedC": "C6" },
  "beidou": { "tier": "B", "role": "Sub DPS", "recommendedC": "C2" },
  "kaeya": { "tier": "B", "role": "Sub DPS", "recommendedC": "C2" },
  "traveler-dendro": { "tier": "B", "role": "Sub DPS", "recommendedC": "C6" },
  "lynette": { "tier": "B", "role": "Sub DPS", "recommendedC": "C0" },
  "yun-jin": { "tier": "B", "role": "Support", "recommendedC": "C6" },
  "kujou-sara": { "tier": "B", "role": "Support", "recommendedC": "C6" },
  "yumemizu": { "tier": "B", "role": "Support, Main DPS", "recommendedC": "C2" },
  "sigewinne": { "tier": "B", "role": "Support", "recommendedC": "C0" },
  "dehya": { "tier": "B", "role": "Support, Sub DPS, Main DPS", "recommendedC": "C0" },

  // Tier C
  "keqing": { "tier": "C", "role": "Main DPS", "recommendedC": "C4" },
  "noelle": { "tier": "C", "role": "Main DPS, Support", "recommendedC": "C6" },
  "eula": { "tier": "C", "role": "Main DPS", "recommendedC": "C0" },
  "yanfei": { "tier": "C", "role": "Main DPS", "recommendedC": "C1" },
  "shikanoin-heizou": { "tier": "C", "role": "Main DPS", "recommendedC": "C6" },
  "kaveh": { "tier": "C", "role": "Main DPS", "recommendedC": "C6" },
  "kachina": { "tier": "C", "role": "Sub DPS", "recommendedC": "C0" },
  "lisa": { "tier": "C", "role": "Sub DPS, Support", "recommendedC": "C4" },
  "chongyun": { "tier": "C", "role": "Sub DPS, Support", "recommendedC": "C6" },
  "sayu": { "tier": "C", "role": "Sub DPS, Support", "recommendedC": "C6" },
  "mika": { "tier": "C", "role": "Support", "recommendedC": "C6" },
  "dahlia": { "tier": "C", "role": "Support", "recommendedC": "C0" },
  "qiqi": { "tier": "C", "role": "Support", "recommendedC": "C0" },
  "barbara": { "tier": "C", "role": "Support", "recommendedC": "C0" },
  "traveler-electro": { "tier": "C", "role": "Support", "recommendedC": "C6" },
  "candace": { "tier": "C", "role": "Support", "recommendedC": "C2" },
  "dori": { "tier": "C", "role": "Support", "recommendedC": "C4" },

  // Tier D
  "freminet": { "tier": "D", "role": "Main DPS", "recommendedC": "C6" },
  "ningguang": { "tier": "D", "role": "Main DPS", "recommendedC": "C6" },
  "xinyan": { "tier": "D", "role": "Main DPS, Sub DPS, Support", "recommendedC": "C6" },
  "aloy": { "tier": "D", "role": "Main DPS", "recommendedC": "C0" },
  "traveler-geo": { "tier": "D", "role": "Sub DPS", "recommendedC": "C6" },
  "amber": { "tier": "D", "role": "Sub DPS", "recommendedC": "C2" },
  "traveler-anemo": { "tier": "D", "role": "Sub DPS", "recommendedC": "C6" },
  "traveler-hydro": { "tier": "D", "role": "Sub DPS", "recommendedC": "C6" }
};

async function updateDB() {
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
      console.log(`Could not update ${id} in DB: ${e.message}`);
    }
  }
}

function updateTS() {
  const dir = path.join(__dirname, '..', 'backend', 'prisma', 'seeds', 'characters');
  for (const [charId, data] of Object.entries(updates)) {
    const filePath = path.join(dir, `${charId}.ts`);
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      content = content.replace(/tier:\s*(null|".*?"),/g, `tier: "${data.tier}",`);
      content = content.replace(/role:\s*(null|".*?"),/g, `role: "${data.role}",`);
      content = content.replace(/recommendedC:\s*(null|".*?"),/g, `recommendedC: "${data.recommendedC}",`);
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${charId}.ts`);
    } else {
      console.log(`File not found: ${charId}.ts`);
    }
  }
}

async function run() {
  await updateDB();
  updateTS();
  await prisma.$disconnect();
}

run();
