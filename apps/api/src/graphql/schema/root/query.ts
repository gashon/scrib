import { post, posts } from '@scrib/api/graphql/schema/query';
import { GraphQLObjectType } from 'graphql';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: (): any => ({
    post,
    posts,
  }),
});
