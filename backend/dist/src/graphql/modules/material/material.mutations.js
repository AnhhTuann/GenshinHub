"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.materialMutations = void 0;
const mutations_1 = require("../../../mutations");
exports.materialMutations = {
    Mutation: {
        upsertMaterial: async (_, args, context) => mutations_1.Mutation.upsertMaterial(_, args, context),
        deleteMaterial: async (_, args, context) => mutations_1.Mutation.deleteMaterial(_, args, context),
    }
};
