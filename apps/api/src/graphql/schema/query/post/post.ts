import { Context } from '@scrib/api/graphql/context';
import { postType } from '@scrib/api/graphql/schema/types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

export const post = {
  type: postType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the post',
    },
  },
  resolve: async (_: any, args: any, context: Context) => {
    const { id } = args;
    const post = await context.db.postRepository.findById(id);
    return post?.toObject();
  },
};
