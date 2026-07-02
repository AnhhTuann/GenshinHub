import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const aloyTeams = await prisma.characterTeam.findMany({
    where: { characterId: 'aloy' },
    include: { members: true },
  });

  for (const team of aloyTeams) {
    let newTeamName = team.name.replace(/Aloy/g, 'Diona');
    let newDesc = team.description?.replace(/Aloy/g, 'Diona').replace(/aloy/g, 'diona').replace(/<[^>]+>/g, '') || "";

    const newTeam = await prisma.characterTeam.create({
      data: {
        characterId: 'diona',
        name: newTeamName,
        order: team.order,
        rank: team.rank,
        description: newDesc,
        members: {
          create: team.members.map(m => {
            let roleDesc = m.roleDesc?.replace(/Aloy/g, 'Diona').replace(/aloy/g, 'diona').replace(/<[^>]+>/g, '') || "";
            return {
              characterId: m.characterId === 'aloy' ? 'diona' : m.characterId,
              role: m.characterId === 'aloy' ? 'Cryo Support' : m.role,
              roleDesc: roleDesc,
              order: m.order,
            };
          })
        }
      }
    });
    console.log('Created team:', newTeam.name);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
