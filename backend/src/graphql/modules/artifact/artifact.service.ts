import { PrismaClient } from '@prisma/client';

export class ArtifactService {
  constructor(private prisma: PrismaClient) {}

  async getAllArtifacts() {
    return this.prisma.artifactSet.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }

  async getArtifactById(id: string) {
    return this.prisma.artifactSet.findUnique({
      where: { id },
    });
  }
}
