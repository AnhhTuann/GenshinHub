import { GraphQLContext } from '../../context';
import { createWeaponTierReviewService } from './weaponTierReview.service';

const serviceFor = (context: GraphQLContext) => createWeaponTierReviewService(context.prisma);

export const weaponTierReviewResolvers = {
  Query: {
    adminWeaponTierReviewQueue: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).queue(context, args?.sourceVersion),
    adminWeaponTierReview: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).one(args.candidateId, context, args?.sourceVersion),
    adminWeaponTierReviewAudit: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).auditLog(args.candidateId, context, args?.limit, args?.sourceVersion),
  },
  Mutation: {
    adminPublishWeaponTierReview: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).publish(args, context),
    adminDecideWeaponTierReview: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).decide(args, context),
    adminVerifyWeaponTierReviewRights: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).verifyRights(args, context),
    adminConfirmWeaponTierChange: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).confirmTierChange(args, context),
  },
};
