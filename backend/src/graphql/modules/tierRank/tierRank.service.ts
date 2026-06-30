import { PrismaClient } from '@prisma/client';

export class TierRankService {
  constructor(private prisma: PrismaClient) {}

  async getAllTierRanks() {
    return this.prisma.tierRank.findMany({
      orderBy: { order: 'asc' },
    });
  }
}
