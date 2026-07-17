"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
class CharacterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllCharacters() {
        return this.prisma.character.findMany({
            orderBy: { nameEn: 'asc' },
        });
    }
    async getCharacterById(id) {
        return this.prisma.character.findUnique({
            where: { id },
        });
    }
    async getCharactersByWeaponType(weaponType) {
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
    async deleteCharacter(id) {
        const character = await this.prisma.character.findUnique({ where: { id } });
        if (!character)
            throw new Error("Character not found");
        await this.prisma.character.delete({ where: { id } });
        return true;
    }
}
exports.CharacterService = CharacterService;
