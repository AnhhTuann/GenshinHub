import { GraphQLContext } from '../../context';
import { ArtifactService } from './artifact.service';

export const artifactResolvers = {
  Query: {
    artifacts: async (_: any, __: any, context: GraphQLContext) => {
      const service = new ArtifactService(context.prisma);
      return service.getAllArtifacts();
    },
    artifactSet: async (_: any, args: { id: string }, context: GraphQLContext) => {
      const service = new ArtifactService(context.prisma);
      return service.getArtifactById(args.id);
    },
  },
};
