import { PrismaClient, CharacterWeapon, CharacterArtifact, CharacterTeam, TeamMember } from '@prisma/client';
import DataLoader from 'dataloader';

export interface MyLoaders {
  characterWeaponsLoader: DataLoader<string, CharacterWeapon[]>;
  characterArtifactsLoader: DataLoader<string, CharacterArtifact[]>;
  characterTeamsLoader: DataLoader<string, CharacterTeam[]>;
  teamMembersLoader: DataLoader<string, TeamMember[]>;
}

export function createLoaders(prisma: PrismaClient): MyLoaders {
  return {
    // DataLoader for fetching Best Weapons by Character ID
    characterWeaponsLoader: new DataLoader<string, CharacterWeapon[]>(async (characterIds) => {
      const weapons = await prisma.characterWeapon.findMany({
        where: { characterId: { in: [...characterIds] } },
        orderBy: { rank: 'asc' },
      });
      
      // Group by characterId
      const grouped = weapons.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterWeapon[]>);
      
      // Return array in the exact same order and length as characterIds
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Best Artifacts by Character ID
    characterArtifactsLoader: new DataLoader<string, CharacterArtifact[]>(async (characterIds) => {
      const artifacts = await prisma.characterArtifact.findMany({
        where: { characterId: { in: [...characterIds] } },
        orderBy: { order: 'asc' },
      });
      
      const grouped = artifacts.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterArtifact[]>);
      
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Teams by Character ID
    characterTeamsLoader: new DataLoader<string, CharacterTeam[]>(async (characterIds) => {
      const teams = await prisma.characterTeam.findMany({
        where: { characterId: { in: [...characterIds] } },
        orderBy: { order: 'asc' },
      });
      
      const grouped = teams.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterTeam[]>);
      
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Team Members by Team ID
    teamMembersLoader: new DataLoader<string, TeamMember[]>(async (teamIds) => {
      const members = await prisma.teamMember.findMany({
        where: { teamId: { in: [...teamIds] } },
      });
      
      const grouped = members.reduce((acc, curr) => {
        if (!acc[curr.teamId]) acc[curr.teamId] = [];
        acc[curr.teamId].push(curr);
        return acc;
      }, {} as Record<string, TeamMember[]>);
      
      return teamIds.map(id => grouped[id] || []);
    }),
  };
}
