import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { characterTypeDefs } from './modules/character/character.schema';
import { characterResolvers } from './modules/character/character.resolvers';
import { characterMutations } from './modules/character/character.mutations';

import { weaponTypeDefs } from './modules/weapon/weapon.schema';
import { weaponResolvers } from './modules/weapon/weapon.resolvers';
import { weaponMutations } from './modules/weapon/weapon.mutations';

import { artifactTypeDefs } from './modules/artifact/artifact.schema';
import { artifactResolvers } from './modules/artifact/artifact.resolvers';
import { artifactMutations } from './modules/artifact/artifact.mutations';

import { materialTypeDefs } from './modules/material/material.schema';
import { materialResolvers } from './modules/material/material.resolvers';
import { materialMutations } from './modules/material/material.mutations';

import { tierRankTypeDefs } from './modules/tierRank/tierRank.schema';
import { tierRankResolvers } from './modules/tierRank/tierRank.resolvers';
import { tierRankMutations } from './modules/tierRank/tierRank.mutations';

import { backupTypeDefs } from './modules/backup/backup.schema';
import { backupResolvers } from './modules/backup/backup.resolvers';
import { backupMutations } from './modules/backup/backup.mutations';

import { enkaTypeDefs } from './modules/enka/enka.schema';
import { enkaResolvers } from './modules/enka/enka.resolvers';

// Combine all typeDefs
export const typeDefs = mergeTypeDefs([
  `scalar JSON`, // Base types
  characterTypeDefs,
  weaponTypeDefs,
  artifactTypeDefs,
  materialTypeDefs,
  tierRankTypeDefs,
  backupTypeDefs,
  enkaTypeDefs,
]);

// Combine all resolvers
export const resolvers = mergeResolvers([
  characterResolvers,
  characterMutations,
  weaponResolvers,
  weaponMutations,
  artifactResolvers,
  artifactMutations,
  materialResolvers,
  materialMutations,
  tierRankResolvers,
  tierRankMutations,
  backupResolvers,
  backupMutations,
  enkaResolvers,
]);
