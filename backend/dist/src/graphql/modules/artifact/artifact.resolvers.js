"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artifactResolvers = void 0;
const artifact_service_1 = require("./artifact.service");
exports.artifactResolvers = {
    Query: {
        artifacts: async (_, __, context) => {
            const service = new artifact_service_1.ArtifactService(context.prisma);
            return service.getAllArtifacts();
        },
        artifactSet: async (_, args, context) => {
            const service = new artifact_service_1.ArtifactService(context.prisma);
            return service.getArtifactById(args.id);
        },
    },
};
