import { GraphQLContext } from '../../context';
import { MaterialService } from './material.service';

export const materialResolvers = {
  Query: {
    materials: async (_: any, __: any, context: GraphQLContext) => {
      const service = new MaterialService(context.prisma);
      return service.getAllMaterials();
    },
  },
};
