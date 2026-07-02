import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const teams = await prisma.characterTeam.findMany();
  let teamUpdates = 0;
  for (const t of teams) {
    if (t.description && t.description.includes('<')) {
      const newDesc = t.description.replace(/<[^>]+>/g, '');
      await prisma.characterTeam.update({
        where: { id: t.id },
        data: { description: newDesc }
      });
      teamUpdates++;
    }
  }
  console.log(`Updated ${teamUpdates} teams.`);

  const members = await prisma.teamMember.findMany();
  let memberUpdates = 0;
  for (const m of members) {
    if (m.roleDesc && m.roleDesc.includes('<')) {
      const newDesc = m.roleDesc.replace(/<[^>]+>/g, '');
      await prisma.teamMember.update({
        where: { id: m.id },
        data: { roleDesc: newDesc }
      });
      memberUpdates++;
    }
  }
  console.log(`Updated ${memberUpdates} members.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
