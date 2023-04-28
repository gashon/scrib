import { postEdge } from '@scrib/api/graphql/schema/types/edges/post-edge';
import { pageInfo } from '@scrib/api/graphql/schema/types/page-info';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

export const postConnection = new GraphQLObjectType({
  name: 'PostConnection',
  fields: {
    totalCount: {
      description: 'Identifies the total count of items in the connection.',
      type: new GraphQLNonNull(GraphQLInt),
    },
    edges: {
      description: 'A list of edges.',
      type: new GraphQLList(postEdge),
    },
    pageInfo: {
      type: new GraphQLNonNull(pageInfo),
    },
  },
});
