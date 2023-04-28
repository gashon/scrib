import { postType } from '@scrib/api/graphql/schema/types/post';
import { GraphQLObjectType, GraphQLString } from 'graphql';

export const postEdge = new GraphQLObjectType({
  name: 'PostEdge',
  description: 'List of edges.',
  fields: {
    // node: {
    //   description: 'The item at the end of the edge.',
    //   type: postType,
    // },
    cursor: {
      description: 'A cursor for pagination.',
      type: GraphQLString,
    },
  },
});
