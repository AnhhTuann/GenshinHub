import { PrismaClient } from '@prisma/client';

export class WeaponService {
  constructor(private prisma: PrismaClient) {}

  async getAllWeapons() {
    return this.prisma.weapon.findMany({
      orderBy: { rarity: 'desc' },
    });
  }

  async getWeaponById(id: string) {
    return this.prisma.weapon.findUnique({
      where: { id },
    });
  }
}
