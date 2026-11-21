import { GraphQLContext } from '../../context';
import { requireAdminActor } from '../tierReviewSecurity';
import { buildVersionedReviewPreview } from './versionedReview';

export const phaseD3ReviewResolvers = {
  Query: {
    adminD3VersionedReviewPreview: async (_: any, __: any, context: GraphQLContext) => {
      requireAdminActor(context);
      return buildVersionedReviewPreview();
    },
  },
};
