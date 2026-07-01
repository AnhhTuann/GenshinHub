import { GraphQLContext } from '../../context';
import { CharacterService } from './character.service';

export const characterResolvers = {
  Query: {
    characters: async (_: any, __: any, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getAllCharacters();
    },
    character: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getCharacterById(args.id);
    },
    charactersByWeaponType: async (_: any, args: { weaponType: string }, context: GraphQLContext) => {
      const service = new CharacterService(context.prisma);
      return service.getCharactersByWeaponType(args.weaponType);
    },
  },
  
  // Field Resolvers (Solving N+1 Problem via DataLoader)
  Character: {
    signatureWeapons: async (parent: any, _: any, context: GraphQLContext) => {
      if (!parent.signatureWeapons || parent.signatureWeapons.length === 0) return [];
      return context.prisma.weapon.findMany({ where: { nameEn: { in: parent.signatureWeapons } } });
    },
    bestWeapons: async (parent: any, _: any, context: GraphQLContext) => {
      return context.dataloaders.characterWeaponsLoader.load(parent.id);
    },
    bestArtifacts: async (parent: any, _: any, context: GraphQLContext) => {
      return context.dataloaders.characterArtifactsLoader.load(parent.id);
    },
    teams: async (parent: any, _: any, context: GraphQLContext) => {
      return context.dataloaders.characterTeamsLoader.load(parent.id);
    },
  },

  TeamBuild: {
    members: async (parent: any, _: any, context: GraphQLContext) => {
      return context.dataloaders.teamMembersLoader.load(parent.id);
    }
  },

  CharacterArtifact: {
    iconUrl: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) {
        return '/assets/items/UI_RelicIcon_15001_4.webp'; // Hardcode generic icon for Mix sets
      }
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      return set?.iconUrl || null;
    },
    rarity: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) return 5;
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      return set?.rarityList?.[0] || 5;
    },
    artifactSetId: async (parent: any, _: any, context: GraphQLContext) => {
      if (parent.setNameEn && parent.setNameEn.startsWith('Mix ')) return null;
      const set = await context.prisma.artifactSet.findFirst({ where: { nameEn: parent.setNameEn } });
      return set?.id || null;
    },
    mixSets: async (parent: any, _: any, context: GraphQLContext) => {
      if (!parent.setNameEn || !parent.setNameEn.startsWith('Mix 2-Piece ')) return [];
      // Example: "Mix 2-Piece Archaic Petra & 2-Piece Noblesse Oblige"
      const match = parent.setNameEn.match(/Mix 2-Piece (.*?) & 2-Piece (.*)/);
      if (!match) return [];
      const set1Name = match[1];
      const set2Name = match[2];
      const sets = await context.prisma.artifactSet.findMany({
        where: { nameEn: { in: [set1Name, set2Name] } }
      });
      const mix1 = sets.find(s => s.nameEn === set1Name);
      const mix2 = sets.find(s => s.nameEn === set2Name);
      
      const result = [];
      if (mix1) result.push({ nameEn: mix1.nameEn, nameVi: mix1.nameVi, iconUrl: mix1.iconUrl, artifactSetId: mix1.id });
      if (mix2) result.push({ nameEn: mix2.nameEn, nameVi: mix2.nameVi, iconUrl: mix2.iconUrl, artifactSetId: mix2.id });
      return result;
    }
  }
};
