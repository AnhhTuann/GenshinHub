"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const character_schema_1 = require("./modules/character/character.schema");
const character_resolvers_1 = require("./modules/character/character.resolvers");
const character_mutations_1 = require("./modules/character/character.mutations");
const weapon_schema_1 = require("./modules/weapon/weapon.schema");
const weapon_resolvers_1 = require("./modules/weapon/weapon.resolvers");
const weapon_mutations_1 = require("./modules/weapon/weapon.mutations");
const artifact_schema_1 = require("./modules/artifact/artifact.schema");
const artifact_resolvers_1 = require("./modules/artifact/artifact.resolvers");
const artifact_mutations_1 = require("./modules/artifact/artifact.mutations");
const material_schema_1 = require("./modules/material/material.schema");
const material_resolvers_1 = require("./modules/material/material.resolvers");
const material_mutations_1 = require("./modules/material/material.mutations");
const tierRank_schema_1 = require("./modules/tierRank/tierRank.schema");
const tierRank_resolvers_1 = require("./modules/tierRank/tierRank.resolvers");
const tierRank_mutations_1 = require("./modules/tierRank/tierRank.mutations");
const backup_schema_1 = require("./modules/backup/backup.schema");
const backup_resolvers_1 = require("./modules/backup/backup.resolvers");
const backup_mutations_1 = require("./modules/backup/backup.mutations");
const enka_schema_1 = require("./modules/enka/enka.schema");
const enka_resolvers_1 = require("./modules/enka/enka.resolvers");
const user_schema_1 = require("./modules/user/user.schema");
const user_resolvers_1 = require("./modules/user/user.resolvers");
// Combine all typeDefs
exports.typeDefs = (0, merge_1.mergeTypeDefs)([
    `scalar JSON`, // Base types
    character_schema_1.characterTypeDefs,
    weapon_schema_1.weaponTypeDefs,
    artifact_schema_1.artifactTypeDefs,
    material_schema_1.materialTypeDefs,
    tierRank_schema_1.tierRankTypeDefs,
    backup_schema_1.backupTypeDefs,
    enka_schema_1.enkaTypeDefs,
    user_schema_1.userSchema,
]);
// Combine all resolvers
exports.resolvers = (0, merge_1.mergeResolvers)([
    character_resolvers_1.characterResolvers,
    character_mutations_1.characterMutations,
    weapon_resolvers_1.weaponResolvers,
    weapon_mutations_1.weaponMutations,
    artifact_resolvers_1.artifactResolvers,
    artifact_mutations_1.artifactMutations,
    material_resolvers_1.materialResolvers,
    material_mutations_1.materialMutations,
    tierRank_resolvers_1.tierRankResolvers,
    tierRank_mutations_1.tierRankMutations,
    backup_resolvers_1.backupResolvers,
    backup_mutations_1.backupMutations,
    enka_resolvers_1.enkaResolvers,
    user_resolvers_1.userResolvers,
]);
