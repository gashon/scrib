import { AuthenticatedContext } from '@scrib/api/graphql/context';
import {
  UpdatePostArgs,
  updatePostType,
  postType,
} from '@scrib/api/graphql/schema/types';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { estimateReadingTimeInSecs } from '@scrib/api/utils/estimate-reading-time';

export const updatePost: GraphQLFieldConfig<
  undefined,
  AuthenticatedContext,
  UpdatePostArgs
> = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(updatePostType),
    },
  },
  resolve: async (_: any, args: any, ctx: AuthenticatedContext) => {
    const createdBy = ctx.req.user.id;
    const { id, ...rest } = args.input;

    const post = await ctx.db.postRepository.findOne({
      _id: id,
      created_by: createdBy,
    });

    if (!post) {
      throw new Error('Post not found');
    }

    const readingTime = estimateReadingTimeInSecs(rest.content);
    post.set({
      ...rest,
      reading_time: readingTime,
    });
    await post.save();

    return post;
  },
};
