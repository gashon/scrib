import { AuthenticatedContext } from '@scrib/api/graphql/context';
import {
  UpdatePostArgs,
  newPostType,
  postType,
} from '@scrib/api/graphql/schema/types';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

export const updatePost: GraphQLFieldConfig<
  undefined,
  AuthenticatedContext,
  UpdatePostArgs
> = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(newPostType),
    },
  },
  resolve: async (_: any, args: any, ctx: AuthenticatedContext) => {
    const createdBy = ctx.req.user.id;
    const { id, ...rest } = args.input;

    const post = await ctx.db.postRepository.findOrCreate(
      {
        id,
        created_by: createdBy,
      },
      rest
    );

    post.set(rest);

    return post.save();
  },
};
