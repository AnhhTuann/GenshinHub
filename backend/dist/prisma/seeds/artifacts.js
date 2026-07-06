"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedArtifacts = seedArtifacts;
const axios_1 = __importDefault(require("axios"));
async function seedArtifacts(prisma) {
    console.log('Bắt đầu tải danh sách Artifact Sets...');
    try {
        const { data: aDataVi } = await axios_1.default.get('https://gi.yatta.moe/api/v2/vi/reliquary');
        const { data: aDataEn } = await axios_1.default.get('https://gi.yatta.moe/api/v2/en/reliquary');
        const aItemsVi = aDataVi?.data?.items || {};
        const aItemsEn = aDataEn?.data?.items || {};
        const artifactData = Object.values(aItemsVi).map((item) => {
            const id = String(item.id);
            const itemEn = aItemsEn[item.id] || {};
            const affixesVi = Object.values(item.affixList || {});
            const affixesEn = Object.values(itemEn.affixList || {});
            return {
                id,
                nameVi: item.name || 'Unknown',
                nameEn: itemEn.name || item.name || 'Unknown',
                rarityList: item.levelList || [],
                piece2DescVi: affixesVi[0] || "",
                piece2DescEn: affixesEn[0] || affixesVi[0] || "",
                piece4DescVi: affixesVi[1] || "",
                piece4DescEn: affixesEn[1] || affixesVi[1] || "",
                iconUrl: item.icon ? `/assets/artifacts/${item.icon}.webp` : null,
            };
        });
        await prisma.artifactSet.deleteMany({});
        await prisma.artifactSet.createMany({ data: artifactData });
        console.log(`Đã seed thành công ${artifactData.length} Artifact Sets.`);
    }
    catch (e) {
        console.log('Lỗi seed Artifact Set:', e.message);
    }
}
