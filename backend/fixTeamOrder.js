const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
require('ts-node').register({ transpileOnly: true });
const { debouncedExport } = require('./src/exportData');

const prisma = new PrismaClient();

function getRoleScore(role) {
  const r = role.toLowerCase();
  if (r.includes('main dps')) return 1;
  if (r.includes('sub dps')) return 2;
  return 3;
}

function stripTags(text) {
  if (!text) return text;
  return text.replace(/<[^>]+>/g, '');
}

async function run() {
  const teams = await prisma.characterTeam.findMany({
    include: { members: true }
  });

  console.log(`Found ${teams.length} teams.`);
  let updatedCount = 0;
  let tagCount = 0;
  const charsToExport = new Set();

  for (const team of teams) {
    const cleanTeamDesc = stripTags(team.description);
    if (cleanTeamDesc !== team.description) {
      await prisma.characterTeam.update({
        where: { id: team.id },
        data: { description: cleanTeamDesc }
      });
      tagCount++;
      charsToExport.add(team.characterId);
    }

    const sortedMembers = [...team.members].sort((a, b) => {
      const scoreA = getRoleScore(a.role);
      const scoreB = getRoleScore(b.role);
      if (scoreA !== scoreB) return scoreA - scoreB;
      // If same score, keep their original order to be stable
      return a.order - b.order;
    });

    for (let i = 0; i < sortedMembers.length; i++) {
      const member = sortedMembers[i];
      const cleanRoleDesc = stripTags(member.roleDesc);
      if (member.order !== i || cleanRoleDesc !== member.roleDesc) {
        await prisma.teamMember.update({
          where: { id: member.id },
          data: { 
            order: i,
            roleDesc: cleanRoleDesc
          }
        });
        updatedCount++;
        charsToExport.add(team.characterId);
      }
    }
  }

  console.log(`Updated ${updatedCount} team members.`);
  
  if (charsToExport.size > 0) {
    console.log(`Exporting ${charsToExport.size} characters...`);
    for (const charId of charsToExport) {
      debouncedExport(charId);
    }
    // wait a bit for debounce
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('Done!');
  process.exit(0);
}

run().catch(console.error);
