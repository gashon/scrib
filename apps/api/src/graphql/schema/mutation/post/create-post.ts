import { Context } from '@scrib/api/graphql/context';
import { newPostType, postType } from '@scrib/api/graphql/schema/types';
import { GraphQLNonNull } from 'graphql';

export const createPost = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(newPostType),
    },
  },
  resolve: async (_: any, args: any, context: Context) => {
    // todo turn into auth route
    const created_by = '507f1f77bcf86cd799439011';
    return context.db.postRepository.create({ ...args.input, created_by });
  },
};
