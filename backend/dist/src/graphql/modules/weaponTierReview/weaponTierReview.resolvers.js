"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.weaponTierReviewResolvers = void 0;
const weaponTierReview_service_1 = require("./weaponTierReview.service");
const serviceFor = (context) => (0, weaponTierReview_service_1.createWeaponTierReviewService)(context.prisma);
exports.weaponTierReviewResolvers = {
    Query: {
        adminWeaponTierReviewQueue: async (_, args, context) => serviceFor(context).queue(context, args?.sourceVersion),
        adminWeaponTierReview: async (_, args, context) => serviceFor(context).one(args.candidateId, context, args?.sourceVersion),
        adminWeaponTierReviewAudit: async (_, args, context) => serviceFor(context).auditLog(args.candidateId, context, args?.limit, args?.sourceVersion),
    },
    Mutation: {
        adminPublishWeaponTierReview: async (_, args, context) => serviceFor(context).publish(args, context),
        adminDecideWeaponTierReview: async (_, args, context) => serviceFor(context).decide(args, context),
        adminVerifyWeaponTierReviewRights: async (_, args, context) => serviceFor(context).verifyRights(args, context),
        adminConfirmWeaponTierChange: async (_, args, context) => serviceFor(context).confirmTierChange(args, context),
    },
};
