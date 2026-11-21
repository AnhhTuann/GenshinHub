"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponTierRankingResolvers = void 0;
const tierReviewSecurity_1 = require("../tierReviewSecurity");
const weaponTierRanking_service_1 = require("./weaponTierRanking.service");
const serviceFor = (context) => (0, weaponTierRanking_service_1.createWeaponTierRankingService)(context.prisma);
// Preserve the legacy schema while preventing publication outside the candidate workflow.
function retiredPublicationMutation(_, __, context) {
    (0, tierReviewSecurity_1.requireAdminActor)(context);
    throw new Error('USE_AUTHORITATIVE_WEAPON_REVIEW');
}
exports.weaponTierRankingResolvers = {
    Weapon: {
        tierRanks: async (parent, _, context) => context.dataloaders.weaponTierRanksLoader.load(String(parent.id)),
    },
    Query: {
        weaponTierRanks: async (_, args, context) => serviceFor(context).listPublic(args),
        adminWeaponTierRanks: async (_, args, context) => serviceFor(context).listAdmin(args, context),
        weaponTierAuditLog: async (_, { rankingId, limit }, context) => serviceFor(context).listAuditLog(rankingId, context, limit),
    },
    Mutation: {
        upsertWeaponTierRank: retiredPublicationMutation,
        approveWeaponTierRank: retiredPublicationMutation,
        rejectWeaponTierRank: retiredPublicationMutation,
        requestChangesWeaponTierRank: retiredPublicationMutation,
        verifyWeaponTierRights: retiredPublicationMutation,
    },
};
