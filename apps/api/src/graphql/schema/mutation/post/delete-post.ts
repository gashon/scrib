import { AuthenticatedContext } from '@scrib/api/graphql/context';
import {
  DeletePostArgs,
  deletePostType,
  postType,
} from '@scrib/api/graphql/schema/types';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

export const deletePost: GraphQLFieldConfig<
  undefined,
  AuthenticatedContext,
  DeletePostArgs
> = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(deletePostType),
    },
  },
  resolve: async (_: any, args: any, ctx: AuthenticatedContext) => {
    const deletedBy = ctx.req.user.id;
    const post = await ctx.db.postRepository.findById(args.input.id);

    if (!post) throw new Error('Post not found');

    if (post.created_by._id.toString() !== deletedBy)
      throw new Error('You are not authorized to delete this post');

    return ctx.db.postRepository.deleteById(args.input.id);
  },
};
