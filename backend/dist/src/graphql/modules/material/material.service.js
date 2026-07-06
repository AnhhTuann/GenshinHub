"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
class MaterialService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllMaterials() {
        return this.prisma.material.findMany({
            orderBy: { nameEn: 'asc' },
        });
    }
}
exports.MaterialService = MaterialService;
