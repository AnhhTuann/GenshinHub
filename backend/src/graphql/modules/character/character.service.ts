import { PrismaClient } from '@prisma/client';

export class CharacterService {
  constructor(private prisma: PrismaClient) {}

  async getAllCharacters() {
    return this.prisma.character.findMany({
      orderBy: { nameEn: 'asc' },
    });
  }

  async getCharacterById(id: string) {
    return this.prisma.character.findUnique({
      where: { id },
    });
  }

  async getCharactersByWeaponType(weaponType: string) {
    return this.prisma.character.findMany({
      where: { weapon: weaponType },
      select: {
        id: true,
        nameEn: true,
        nameVi: true,
        element: true,
        rarity: true,
        avatarUrl: true,
        weapon: true,
      },
      orderBy: { nameEn: 'asc' },
    });
  }

  async deleteCharacter(id: string) {
    const character = await this.prisma.character.findUnique({ where: { id } });
    if (!character) throw new Error("Character not found");

    await this.prisma.character.delete({ where: { id } });
    return true;
  }
}
