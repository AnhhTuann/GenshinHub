import { GraphQLContext } from '../../context';
import { Mutation } from '../../../mutations';

export const materialMutations = {
  Mutation: {
    upsertMaterial: async (_: any, args: any, context: GraphQLContext) => Mutation.upsertMaterial(_, args, context),
    deleteMaterial: async (_: any, args: any, context: GraphQLContext) => Mutation.deleteMaterial(_, args, context),
  }
};
