import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function exportDatabaseToSeeds() {
  console.log("Exporting characters to TS files...");
  
  const characters = await prisma.character.findMany({
    include: {
      bestWeapons: true,
      bestArtifacts: true,
    }
  });

  const charDir = path.join(__dirname, '../prisma/seeds/characters');
  if (!fs.existsSync(charDir)) {
    fs.mkdirSync(charDir, { recursive: true });
  }

  const exportNames: string[] = [];

  for (const char of characters) {
    const camelCaseName = char.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    exportNames.push(camelCaseName);

    const fileContent = `export const ${camelCaseName} = {
  characterId: ${JSON.stringify(char.id)},
  talentPriority: ${JSON.stringify(char.talentPriority, null, 2)},
  bestTeams: ${JSON.stringify(char.bestTeams, null, 2)},
  bestWeapons: ${JSON.stringify(char.bestWeapons.map(w => ({
    rank: w.rank,
    nameVi: w.nameVi,
    nameEn: w.nameEn,
    subStat: w.subStat,
    isF2P: w.isF2P,
    refinement: w.refinement ? 'R' + w.refinement : null,
    passiveDescVi: w.passiveDescVi,
    passiveDescEn: w.passiveDescEn,
    iconUrl: w.iconUrl
  })), null, 4).replace(/"([^"]+)":/g, '$1:')},
  bestArtifacts: ${JSON.stringify(char.bestArtifacts.map(a => ({
    setNameVi: a.setNameVi,
    setNameEn: a.setNameEn,
    pieces: a.pieces,
    sands: a.sands,
    goblet: a.goblet,
    circlet: a.circlet,
    subStatsPriority: a.subStatsPriority
  })), null, 4).replace(/"([^"]+)":/g, '$1:')}
};
`;
    fs.writeFileSync(path.join(charDir, `${char.id}.ts`), fileContent, 'utf-8');
  }

  // Rewrite the index characters.ts file (just the imports and metaBuilds array part)
  const indexFile = path.join(__dirname, '../prisma/seeds/characters.ts');
  let content = fs.existsSync(indexFile) ? fs.readFileSync(indexFile, 'utf-8') : '';
  
  // Replace the imports and metaBuilds array
  const importsStr = characters.map(c => {
    const camelCaseName = c.id.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    return `import { ${camelCaseName} } from './characters/${c.id}';`;
  }).join('\n');
  
  const arrayStr = `const metaBuilds = [\n  ${exportNames.join(',\n  ')}\n];`;

  // We find the place to replace. This is a bit tricky with Regex.
  const modifiedContent = content
    .replace(/import \{.*\} from '.\/characters\/.*';\n/g, '')
    .replace(/const metaBuilds = \[[\s\S]*?\];/, `${importsStr}\n\n${arrayStr}`);

  // In case the replace failed (no match), append
  if (modifiedContent.includes('const metaBuilds = [')) {
    fs.writeFileSync(indexFile, modifiedContent, 'utf-8');
  } else {
     // fallback
     console.log("Could not find metaBuilds array to replace. Skipping characters.ts update.");
  }

  return true;
}
