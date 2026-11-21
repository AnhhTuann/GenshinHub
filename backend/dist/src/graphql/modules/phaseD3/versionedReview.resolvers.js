"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.phaseD3ReviewResolvers = void 0;
const tierReviewSecurity_1 = require("../tierReviewSecurity");
const versionedReview_1 = require("./versionedReview");
exports.phaseD3ReviewResolvers = {
    Query: {
        adminD3VersionedReviewPreview: async (_, __, context) => {
            (0, tierReviewSecurity_1.requireAdminActor)(context);
            return (0, versionedReview_1.buildVersionedReviewPreview)();
        },
    },
};
