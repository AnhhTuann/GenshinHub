import { GraphQLContext } from '../../context';
import { Mutation } from '../../../mutations';

export const tierRankMutations = {
  Mutation: {
    addTierRank: async (_: any, args: any, context: GraphQLContext) => Mutation.addTierRank(_, args, context),
    updateTierRank: async (_: any, args: any, context: GraphQLContext) => Mutation.updateTierRank(_, args, context),
    deleteTierRank: async (_: any, args: any, context: GraphQLContext) => Mutation.deleteTierRank(_, args, context),
    reorderTierRanks: async (_: any, args: any, context: GraphQLContext) => Mutation.reorderTierRanks(_, args, context),
  }
};
