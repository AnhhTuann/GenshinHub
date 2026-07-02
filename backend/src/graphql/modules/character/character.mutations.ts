import { GraphQLContext } from '../../context';
import { CharacterService } from './character.service';
import { Mutation as mutationsImpl } from '../../../mutations'; // Temporary reference to old mutations, we will extract them later

export const characterMutations = {
  Mutation: {
    // We will extract these from mutations.ts into character.service.ts
    // For now, we wire them up to the old mutations to keep things compiling and extract them step-by-step
    upsertCharacter: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.upsertCharacter(_, args, context),
    deleteCharacter: async (_: any, args: any, context: GraphQLContext) => {
        const service = new CharacterService(context.prisma);
        return service.deleteCharacter(args.id);
    },
    updateCharacterSplashArt: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterSplashArt(_, args, context),
    
    addCharacterTeam: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.addCharacterTeam(_, args, context),
    updateCharacterTeam: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterTeam(_, args, context),
    removeCharacterTeam: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.removeCharacterTeam(_, args, context),
    reorderCharacterTeams: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.reorderCharacterTeams(_, args, context),
    
    reorderCharacterWeapons: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.reorderCharacterWeapons(_, args, context),
    reorderCharacterArtifacts: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.reorderCharacterArtifacts(_, args, context),
    
    updateCharacterTierList: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterTierList(_, args, context),
    
    addCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.addCharacterWeapon(_, args, context),
    updateCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterWeapon(_, args, context),
    removeCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.removeCharacterWeapon(_, args, context),
    
    addCharacterArtifact: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.addCharacterArtifact(_, args, context),
    removeCharacterArtifact: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.removeCharacterArtifact(_, args, context),
    
    updateCharacterTalents: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterTalents(_, args, context),
    updateCharacterArtifactStats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterArtifactStats(_, args, context),
    updateCharacterStats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterStats(_, args, context),
    updateCharacterAscensionMats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterAscensionMats(_, args, context),
    
    generateCharacterAI: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.generateCharacterAI(_, args, context),
  }
};
