import { GraphQLContext } from '../../context';
import { TierRankService } from './tierRank.service';

export const tierRankResolvers = {
  Query: {
    tierRanks: async (_: any, __: any, context: GraphQLContext) => {
      const service = new TierRankService(context.prisma);
      return service.getAllTierRanks();
    },
  },
};
