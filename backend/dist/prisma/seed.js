"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const characters_1 = require("./seeds/characters");
const materials_1 = require("./seeds/materials");
const artifacts_1 = require("./seeds/artifacts");
const weapons_1 = require("./seeds/weapons");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('--- BẮT ĐẦU SEED DATABASE ---');
    const targetId = process.env.SEED_CHARACTER;
    if (targetId) {
        console.log(`Chỉ chạy seed cho nhân vật: ${targetId}. Bỏ qua vật phẩm, vũ khí, tdv.`);
        await (0, characters_1.seedCharacters)(prisma);
    }
    else {
        await (0, materials_1.seedMaterials)(prisma);
        await (0, artifacts_1.seedArtifacts)(prisma);
        await (0, weapons_1.seedWeapons)(prisma);
        await (0, characters_1.seedCharacters)(prisma);
    }
    console.log('--- HOÀN TẤT SEED DATABASE ---');
}
main()
    .catch(e => {
    console.error('LỖI SEED DATABASE:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
