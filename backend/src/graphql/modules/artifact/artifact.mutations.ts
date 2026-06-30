import { GraphQLContext } from '../../context';
import { Mutation } from '../../../mutations';

export const artifactMutations = {
  Mutation: {
    upsertArtifactSet: async (_: any, args: any, context: GraphQLContext) => Mutation.upsertArtifactSet(_, args, context),
    deleteArtifactSet: async (_: any, args: any, context: GraphQLContext) => Mutation.deleteArtifactSet(_, args, context),
  }
};
