import { GraphQLContext } from '../../context';
import { CharacterService } from './character.service';
import { Mutation as mutationsImpl } from '../../../mutations'; // Temporary reference to old mutations, we will extract them later

const buildFields = ['bestWeapons', 'bestArtifacts', 'teams', 'sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'];

async function guardLegacyBuildWrite(context: GraphQLContext, characterIds: string[]) {
  if (!context.user.isAdmin) throw new Error('Unauthorized: Admin access required.');
  if (!characterIds.length) return;
  const found = await context.prisma.characterBuild.findFirst({
    where: { characterId: { in: characterIds } }, select: { id: true },
  });
  if (found) throw new Error('Choose a build and use the build editor.');
}

async function guardLegacyRows(context: GraphQLContext, model: 'weapon' | 'artifact' | 'team', ids: string[]) {
  if (!context.user.isAdmin) throw new Error('Unauthorized: Admin access required.');
  const where = { id: { in: ids } };
  const select = { characterId: true } as const;
  const rows = model === 'weapon' ? await context.prisma.characterWeapon.findMany({ where, select }) :
    model === 'artifact' ? await context.prisma.characterArtifact.findMany({ where, select }) :
      await context.prisma.characterTeam.findMany({ where, select });
  await guardLegacyBuildWrite(context, rows.map(row => row.characterId));
}

export const characterMutations = {
  Mutation: {
    // We will extract these from mutations.ts into character.service.ts
    // For now, we wire them up to the old mutations to keep things compiling and extract them step-by-step
    upsertCharacter: async (_: any, args: any, context: GraphQLContext) => {
      if (buildFields.some(field => args.input?.[field] !== undefined)) await guardLegacyBuildWrite(context, [args.input.id]);
      return mutationsImpl.upsertCharacter(_, args, context);
    },
    deleteCharacter: async (_: any, args: any, context: GraphQLContext) => {
        const service = new CharacterService(context.prisma);
        return service.deleteCharacter(args.id);
    },
    updateCharacterSplashArt: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterSplashArt(_, args, context),
    
    addCharacterTeam: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyBuildWrite(context, [args.characterId]);
      return mutationsImpl.addCharacterTeam(_, args, context);
    },
    updateCharacterTeam: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'team', [args.teamId]);
      return mutationsImpl.updateCharacterTeam(_, args, context);
    },
    removeCharacterTeam: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'team', [args.teamId]);
      return mutationsImpl.removeCharacterTeam(_, args, context);
    },
    reorderCharacterTeams: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'team', args.teamIds);
      return mutationsImpl.reorderCharacterTeams(_, args, context);
    },
    
    reorderCharacterWeapons: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'weapon', args.weaponIds);
      return mutationsImpl.reorderCharacterWeapons(_, args, context);
    },
    reorderCharacterArtifacts: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'artifact', args.artifactIds);
      return mutationsImpl.reorderCharacterArtifacts(_, args, context);
    },
    
    updateCharacterTierList: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterTierList(_, args, context),
    
    addCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyBuildWrite(context, [args.characterId]);
      return mutationsImpl.addCharacterWeapon(_, args, context);
    },
    updateCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'weapon', [args.id]);
      return mutationsImpl.updateCharacterWeapon(_, args, context);
    },
    removeCharacterWeapon: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'weapon', [args.id]);
      return mutationsImpl.removeCharacterWeapon(_, args, context);
    },
    
    addCharacterArtifact: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyBuildWrite(context, [args.characterId]);
      return mutationsImpl.addCharacterArtifact(_, args, context);
    },
    removeCharacterArtifact: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyRows(context, 'artifact', [args.id]);
      return mutationsImpl.removeCharacterArtifact(_, args, context);
    },
    
    updateCharacterTalents: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyBuildWrite(context, [args.id]);
      return mutationsImpl.updateCharacterTalents(_, args, context);
    },
    updateCharacterArtifactStats: async (_: any, args: any, context: GraphQLContext) => {
      await guardLegacyBuildWrite(context, [args.id]);
      return mutationsImpl.updateCharacterArtifactStats(_, args, context);
    },
    updateCharacterStats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterStats(_, args, context),
    updateCharacterAscensionMats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterAscensionMats(_, args, context),
    updateCharacterTalentMats: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.updateCharacterTalentMats(_, args, context),
    
    generateCharacterAI: async (_: any, args: any, context: GraphQLContext) => mutationsImpl.generateCharacterAI(_, args, context),
  }
};
