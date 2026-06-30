import { GraphQLContext } from '../../context';
import { Mutation } from '../../../mutations';

export const weaponMutations = {
  Mutation: {
    upsertWeapon: async (_: any, args: any, context: GraphQLContext) => Mutation.upsertWeapon(_, args, context),
    deleteWeapon: async (_: any, args: any, context: GraphQLContext) => Mutation.deleteWeapon(_, args, context),
    updateWeaponTierList: async (_: any, args: any, context: GraphQLContext) => Mutation.updateWeaponTierList(_, args, context),
  }
};
