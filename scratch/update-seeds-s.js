const fs = require('fs');
const path = require('path');

const updates = {
  "varesa": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "kinich": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "arlecchino": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "mualani": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "lohen": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "venti": { "tier": "S", "role": "Main DPS, Sub DPS", "recommendedC": "C0" },
  "klee": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "neuvillette": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "chasca": { "tier": "S", "role": "Main DPS", "recommendedC": "C0" },
  "nahida": { "tier": "S", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "emilie": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "yelan": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "xingqiu": { "tier": "S", "role": "Sub DPS", "recommendedC": "C6" },
  "xiangling": { "tier": "S", "role": "Sub DPS", "recommendedC": "C4" },
  "albedo": { "tier": "S", "role": "Sub DPS", "recommendedC": "C0" },
  "xilonen": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "escoffier": { "tier": "S", "role": "Sub DPS, Support", "recommendedC": "C0" },
  "mona": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "prune": { "tier": "S", "role": "Support", "recommendedC": "C6" },
  "illuga": { "tier": "S", "role": "Support", "recommendedC": "C6" },
  "kaedehara-kazuha": { "tier": "S", "role": "Support", "recommendedC": "C0" },
  "shenhe": { "tier": "S", "role": "Support", "recommendedC": "C0" }
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
