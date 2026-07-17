"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialResolvers = void 0;
const material_service_1 = require("./material.service");
exports.materialResolvers = {
    Query: {
        materials: async (_, __, context) => {
            const service = new material_service_1.MaterialService(context.prisma);
            return service.getAllMaterials();
        },
    },
};
