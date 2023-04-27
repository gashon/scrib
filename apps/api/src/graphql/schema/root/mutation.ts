import { createPost } from '@scrib/api/graphql/schema/mutation';
import { GraphQLObjectType } from 'graphql';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createPost,
  }),
});
