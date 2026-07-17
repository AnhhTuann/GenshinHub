"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enkaResolvers = void 0;
const resolvers_1 = require("../../../resolvers");
exports.enkaResolvers = {
    Query: {
        // Cast resolvers to any and extract showcase, since we are progressively migrating
        showcase: async (_, args, context) => resolvers_1.resolvers.Query.showcase(_, args, context),
    },
};
