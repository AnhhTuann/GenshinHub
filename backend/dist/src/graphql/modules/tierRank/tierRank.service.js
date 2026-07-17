"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TierRankService = void 0;
class TierRankService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllTierRanks() {
        return this.prisma.tierRank.findMany({
            orderBy: { order: 'asc' },
        });
    }
}
exports.TierRankService = TierRankService;
