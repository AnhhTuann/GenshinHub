import { requireAdminActor } from '../tierReviewSecurity';
import { GraphQLContext } from '../../context';
import { createWeaponTierRankingService } from './weaponTierRanking.service';

const serviceFor = (context: GraphQLContext) => createWeaponTierRankingService(context.prisma);

// Preserve the legacy schema while preventing publication outside the candidate workflow.
function retiredPublicationMutation(_: unknown, __: unknown, context: GraphQLContext): never {
  requireAdminActor(context);
  throw new Error('USE_AUTHORITATIVE_WEAPON_REVIEW');
}

export const weaponTierRankingResolvers = {
  Weapon: {
    tierRanks: async (parent: any, _: any, context: GraphQLContext) =>
      context.dataloaders.weaponTierRanksLoader.load(String(parent.id)),
  },
  Query: {
    weaponTierRanks: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).listPublic(args),
    adminWeaponTierRanks: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).listAdmin(args, context),
    weaponTierAuditLog: async (_: any, { rankingId, limit }: any, context: GraphQLContext) =>
      serviceFor(context).listAuditLog(rankingId, context, limit),
  },
  Mutation: {
    upsertWeaponTierRank: retiredPublicationMutation,
    approveWeaponTierRank: retiredPublicationMutation,
    rejectWeaponTierRank: retiredPublicationMutation,
    requestChangesWeaponTierRank: retiredPublicationMutation,
    verifyWeaponTierRights: retiredPublicationMutation,
  },
};
