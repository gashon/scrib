import { authGuard } from '@scrib/api/graphql/middleware/auth';
import { createPost, updatePost, deletePost } from '@scrib/api/graphql/schema/mutation';
import { GraphQLObjectType } from 'graphql';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createPost: authGuard(createPost),
    updatePost: authGuard(updatePost),
    deletePost: authGuard(deletePost)
  }),
});
