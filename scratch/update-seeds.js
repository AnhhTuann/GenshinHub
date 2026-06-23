const fs = require('fs');
const path = require('path');

const updates = {
  "zibai": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "mavuika": { "tier": "SS", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "nefer": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "flins": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "skirk": { "tier": "SS", "role": "Main DPS", "recommendedC": "C1" },
  "varka": { "tier": "SS", "role": "Main DPS", "recommendedC": "C0" },
  "columbina": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "ineffa": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "lauma": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "linnea": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "durin": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C0" },
  "furina": { "tier": "SS", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "escoffier": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C0" },
  "fischl": { "tier": "SS", "role": "Sub DPS", "recommendedC": "C6" },
  "nicole": { "tier": "SS", "role": "Support", "recommendedC": "C0" },
  "bennett": { "tier": "SS", "role": "Support", "recommendedC": "C1" },
  "iansan": { "tier": "SS", "role": "Support", "recommendedC": "C2" },
  "citlali": { "tier": "SS", "role": "Support", "recommendedC": "C0" },
  "sucrose": { "tier": "SS", "role": "Support", "recommendedC": "C6" },
  "chevreuse": { "tier": "SS", "role": "Support", "recommendedC": "C6" }
};

const dir = path.join(__dirname, '..', 'backend', 'prisma', 'seeds', 'characters');

for (const [charId, data] of Object.entries(updates)) {
  const filePath = path.join(dir, `${charId}.ts`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // update tier
    content = content.replace(/tier:\s*(null|".*?"),/g, `tier: "${data.tier}",`);
    // update role
    content = content.replace(/role:\s*(null|".*?"),/g, `role: "${data.role}",`);
    // update recommendedC
    content = content.replace(/recommendedC:\s*(null|".*?"),/g, `recommendedC: "${data.recommendedC}",`);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${charId}.ts`);
  } else {
    console.log(`File not found: ${charId}.ts`);
  }
}
