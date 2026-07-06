"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifactMutations = void 0;
const mutations_1 = require("../../../mutations");
exports.artifactMutations = {
    Mutation: {
        upsertArtifactSet: async (_, args, context) => mutations_1.Mutation.upsertArtifactSet(_, args, context),
        deleteArtifactSet: async (_, args, context) => mutations_1.Mutation.deleteArtifactSet(_, args, context),
    }
};
