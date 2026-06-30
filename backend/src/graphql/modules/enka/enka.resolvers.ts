import { GraphQLContext } from '../../context';
import { resolvers } from '../../../resolvers';

export const enkaResolvers = {
  Query: {
    // Cast resolvers to any and extract showcase, since we are progressively migrating
    showcase: async (_: any, args: any, context: GraphQLContext) => (resolvers.Query as any).showcase(_, args, context),
  },
};
