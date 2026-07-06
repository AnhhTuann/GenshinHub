const fs = require('fs');
const file = 'backend/prisma/seeds/characters.ts';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  "import { kaedeharaKazuha } from './characters/kaedehara-kazuha';",
  "import { kaedeharaKazuha } from './characters/kaedehara-kazuha';\nimport { sandrone } from './characters/sandrone';"
);

content = content.replace(
  "  huTao,\n  kaedeharaKazuha\n];",
  "  huTao,\n  kaedeharaKazuha,\n  sandrone\n];"
);

content = content.replace(
  '      "Traveler|None|Sword|5"\n    ].map',
  '      "Traveler|None|Sword|5",\n      "Sandrone|Geo|Catalyst|5"\n    ].map'
);

fs.writeFileSync(file, content, 'utf8');
console.log("Updated characters.ts");
