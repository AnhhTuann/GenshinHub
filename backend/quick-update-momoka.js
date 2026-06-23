const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'prisma', 'seeds', 'characters', 'momoka.ts');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/tier:\s*(null|".*?"),/g, `tier: "A",`);
  content = content.replace(/role:\s*(null|".*?"),/g, `role: "Support",`);
  content = content.replace(/recommendedC:\s*(null|".*?"),/g, `recommendedC: "C6",`);
  fs.writeFileSync(filePath, content);
  console.log('Updated momoka.ts (Kirara)');
}
