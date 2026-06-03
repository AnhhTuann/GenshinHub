import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    characters: async () => await prisma.character.findMany(),
    character: async (_: any, args: { id: string }) => await prisma.character.findUnique({ where: { id: args.id }, include: { bestWeapons: true, bestArtifacts: true } }),
  },
};
