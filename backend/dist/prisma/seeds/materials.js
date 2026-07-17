"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedMaterials = seedMaterials;
const axios_1 = __importDefault(require("axios"));
async function seedMaterials(prisma) {
    console.log('Bắt đầu tải danh sách Material...');
    try {
        const { data: mDataVi } = await axios_1.default.get('https://gi.yatta.moe/api/v2/vi/material');
        const { data: mDataEn } = await axios_1.default.get('https://gi.yatta.moe/api/v2/en/material');
        const mItemsVi = Object.values(mDataVi?.data?.items || {});
        const mItemsEn = mDataEn?.data?.items || {};
        const materialData = mItemsVi.map((item) => {
            const id = String(item.id);
            const itemEn = mItemsEn[item.id] || {};
            return {
                id,
                nameVi: item.name || 'Unknown',
                nameEn: itemEn.name || item.name || 'Unknown',
                type: item.type || 'Unknown',
                rarity: item.rank || 1,
                iconUrl: item.icon ? `/assets/items/${item.icon}.webp` : null,
            };
        });
        const manualMaterials = [
            { id: "112001", nameVi: "Tinh Chất Slime", nameEn: "Slime Condensate", type: "MATERIAL", rarity: 1, iconUrl: "/assets/items/UI_ItemIcon_112001.webp" },
            { id: "100019", nameVi: "Nấm Phila", nameEn: "Philanemo Mushroom", type: "MATERIAL", rarity: 1, iconUrl: "/assets/items/UI_ItemIcon_100019.webp" }
        ];
        for (const m of manualMaterials) {
            if (!materialData.find((x) => x.id === m.id)) {
                materialData.push(m);
            }
        }
        await prisma.material.deleteMany({});
        await prisma.material.createMany({ data: materialData });
        console.log(`Đã seed thành công ${materialData.length} Materials.`);
    }
    catch (e) {
        console.log('Lỗi seed Material:', e.message);
    }
}
