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
  }
};
