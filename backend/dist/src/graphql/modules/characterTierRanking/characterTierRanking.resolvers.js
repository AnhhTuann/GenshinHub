"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characterTierRankingResolvers = void 0;
const characterTierRanking_service_1 = require("./characterTierRanking.service");
const serviceFor = (context) => (0, characterTierRanking_service_1.createCharacterTierRankingService)(context.prisma);
exports.characterTierRankingResolvers = {
    CharacterTierRanking: {
        updatedAt: (parent) => parent.updatedAt instanceof Date ? parent.updatedAt.toISOString() : parent.updatedAt,
        evidence: (parent) => {
            if (!parent.evidence || typeof parent.evidence !== 'object' || Array.isArray(parent.evidence)) {
                return parent.evidence;
            }
            const { rightsProof: _proof, ...evidence } = parent.evidence;
            if (parent.approvalStatus !== 'APPROVED' && !(0, characterTierRanking_service_1.hasCharacterRightsProof)(parent)) {
                return { ...evidence, rightsVerified: false, rightsVerifiedBy: null, rightsVerifiedAt: null, rightsNote: null };
            }
            return evidence;
        },
    },
    Query: {
        characterTierRankings: async (_, args, context) => serviceFor(context).listPublic(args),
        adminCharacterTierRankings: async (_, args, context) => serviceFor(context).listAdmin(args, context),
        characterTierAuditLog: async (_, { rankingId, limit }, context) => serviceFor(context).listAuditLog(rankingId, context),
    },
    Mutation: {
        upsertCharacterTierRanking: async (_, { input }, context) => serviceFor(context).upsert(input, context),
        approveCharacterTierRanking: async (_, { id, expectedUpdatedAt, expectedChecksum }, context) => serviceFor(context).approve(id, context, expectedUpdatedAt, expectedChecksum),
        rejectCharacterTierRanking: async (_, { id, reason, expectedUpdatedAt, expectedChecksum }, context) => serviceFor(context).reject(id, reason, context, expectedUpdatedAt, expectedChecksum),
        requestChangesCharacterTierRanking: async (_, { id, reason, expectedUpdatedAt, expectedChecksum }, context) => serviceFor(context).requestChanges(id, reason, context, expectedUpdatedAt, expectedChecksum),
        verifyCharacterTierRights: async (_, { id, verified, note, expectedUpdatedAt }, context) => serviceFor(context).verifyRights(id, verified, note, context, expectedUpdatedAt),
    },
};
