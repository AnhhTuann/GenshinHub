import { GraphQLContext } from '../../context';
import { createCharacterTierRankingService, hasCharacterRightsProof } from './characterTierRanking.service';

const serviceFor = (context: GraphQLContext) => createCharacterTierRankingService(context.prisma);

export const characterTierRankingResolvers = {
  CharacterTierRanking: {
    updatedAt: (parent: { updatedAt: Date | string }) =>
      parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
    evidence: (parent: any) => {
      if (!parent.evidence || typeof parent.evidence !== 'object' || Array.isArray(parent.evidence)) {
        return parent.evidence;
      }
      const { rightsProof: _proof, ...evidence } = parent.evidence;
      if (parent.approvalStatus !== 'APPROVED' && !hasCharacterRightsProof(parent)) {
        return { ...evidence, rightsVerified: false, rightsVerifiedBy: null, rightsVerifiedAt: null, rightsNote: null };
      }
      return evidence;
    },
  },
  Query: {
    characterTierRankings: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).listPublic(args),
    adminCharacterTierRankings: async (_: any, args: any, context: GraphQLContext) =>
      serviceFor(context).listAdmin(args, context),
    characterTierAuditLog: async (_: any, { rankingId, limit }: any, context: GraphQLContext) =>
      serviceFor(context).listAuditLog(rankingId, context),
  },
  Mutation: {
    upsertCharacterTierRanking: async (_: any, { input }: any, context: GraphQLContext) =>
      serviceFor(context).upsert(input, context),
    approveCharacterTierRanking: async (_: any, { id, expectedUpdatedAt, expectedChecksum }: any, context: GraphQLContext) =>
      serviceFor(context).approve(id, context, expectedUpdatedAt, expectedChecksum),
    rejectCharacterTierRanking: async (_: any, { id, reason, expectedUpdatedAt, expectedChecksum }: any, context: GraphQLContext) =>
      serviceFor(context).reject(id, reason, context, expectedUpdatedAt, expectedChecksum),
    requestChangesCharacterTierRanking: async (_: any, { id, reason, expectedUpdatedAt, expectedChecksum }: any, context: GraphQLContext) =>
      serviceFor(context).requestChanges(id, reason, context, expectedUpdatedAt, expectedChecksum),
    verifyCharacterTierRights: async (_: any, { id, verified, note, expectedUpdatedAt }: any, context: GraphQLContext) =>
      serviceFor(context).verifyRights(id, verified, note, context, expectedUpdatedAt),
  },
};
