"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const materials_1 = require("./seeds/materials");
const artifacts_1 = require("./seeds/artifacts");
const weapons_1 = require("./seeds/weapons");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('--- BẮT ĐẦU SEED ITEMS ---');
    await (0, materials_1.seedMaterials)(prisma);
    await (0, artifacts_1.seedArtifacts)(prisma);
    await (0, weapons_1.seedWeapons)(prisma);
    console.log('--- HOÀN TẤT SEED ITEMS ---');
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
