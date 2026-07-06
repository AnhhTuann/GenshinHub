"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tierRankMutations = void 0;
const mutations_1 = require("../../../mutations");
exports.tierRankMutations = {
    Mutation: {
        addTierRank: async (_, args, context) => mutations_1.Mutation.addTierRank(_, args, context),
        updateTierRank: async (_, args, context) => mutations_1.Mutation.updateTierRank(_, args, context),
        deleteTierRank: async (_, args, context) => mutations_1.Mutation.deleteTierRank(_, args, context),
        reorderTierRanks: async (_, args, context) => mutations_1.Mutation.reorderTierRanks(_, args, context),
    }
};
