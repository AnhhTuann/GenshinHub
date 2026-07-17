"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tierRankResolvers = void 0;
const tierRank_service_1 = require("./tierRank.service");
exports.tierRankResolvers = {
    Query: {
        tierRanks: async (_, __, context) => {
            const service = new tierRank_service_1.TierRankService(context.prisma);
            return service.getAllTierRanks();
        },
    },
};
