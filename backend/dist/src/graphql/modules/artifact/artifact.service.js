"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArtifactService = void 0;
class ArtifactService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllArtifacts() {
        return this.prisma.artifactSet.findMany({
            orderBy: { nameEn: 'asc' },
        });
    }
    async getArtifactById(id) {
        return this.prisma.artifactSet.findUnique({
            where: { id },
        });
    }
}
exports.ArtifactService = ArtifactService;
