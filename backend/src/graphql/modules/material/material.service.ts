import { PrismaClient } from '@prisma/client';

export class MaterialService {
  constructor(private prisma: PrismaClient) {}

  async getAllMaterials() {
    return this.prisma.material.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }
}
