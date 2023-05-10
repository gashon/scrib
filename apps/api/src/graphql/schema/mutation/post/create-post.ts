import { AuthenticatedContext } from '@scrib/api/graphql/context';
import {
  CreatePostArgs,
  newPostType,
  postType,
} from '@scrib/api/graphql/schema/types';
import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';

export const createPost: GraphQLFieldConfig<
  undefined,
  AuthenticatedContext,
  CreatePostArgs
> = {
  type: postType,
  args: {
    input: {
      type: new GraphQLNonNull(newPostType),
    },
  },
  resolve: async (_: any, args: any, ctx: AuthenticatedContext) => {
    const created_by = ctx.req.user.id;
    return ctx.db.postRepository.create({ ...args.input, created_by });
  },
};
