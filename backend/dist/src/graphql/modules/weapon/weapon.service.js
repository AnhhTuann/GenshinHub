"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponService = void 0;
class WeaponService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllWeapons() {
        return this.prisma.weapon.findMany({
            orderBy: { rarity: 'desc' },
        });
    }
    async getWeaponById(id) {
        return this.prisma.weapon.findUnique({
            where: { id },
        });
    }
}
exports.WeaponService = WeaponService;
