import { PrismaClient } from '@prisma/client';
import { detailedTeamsData } from '../../frontend/data/teams';
import { exportDatabaseToSeeds } from './exportData';

const prisma = new PrismaClient();

async function main() {
  console.log("Starting migration of Meta Team Comps...");

  for (const [characterId, teams] of Object.entries(detailedTeamsData)) {
    console.log(`Migrating teams for ${characterId}...`);
    
    const dbChar = await prisma.character.findUnique({ where: { id: characterId } });
    if (!dbChar) {
      console.log(`Character ${characterId} not found in DB. Skipping.`);
      continue;
    }

    // Delete existing teams
    await prisma.characterTeam.deleteMany({ where: { characterId } });

    // Create new teams
    for (const team of teams) {
      await prisma.characterTeam.create({
        data: {
          characterId,
          name: team.name,
          rank: team.rank,
          description: team.description,
          members: {
            create: team.members.map((m: any) => ({
              characterId: m.characterId,
              role: m.role,
              roleDesc: m.roleDesc,
              weapons: m.weapons || [],
              artifacts: m.artifacts || [],
              substats: m.substats || []
            }))
          }
        }
      });
    }
  }

  console.log("Finished migrating all teams to DB.");
  
  console.log("Running exportDatabaseToSeeds to update .ts files...");
  await exportDatabaseToSeeds();
  console.log("Export complete.");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
