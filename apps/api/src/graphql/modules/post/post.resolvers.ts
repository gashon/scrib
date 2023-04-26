import {
  AuthenticatedContext,
  RequestContext,
  authMiddleware,
} from '@scrib/api/graphql';
import Post from '@scrib/db/models/post';

export const userResolvers = {
  Query: {
    posts: async (
      _: any,
      { userId }: { userId: string },
      ___: RequestContext,
    ) => {
      const posts = await Post.find({ created_by: userId });

      return posts;
    },
    post: async (_: any, { id }: { id: string }, ___: RequestContext) => {
      const post = await Post.findById(id);
      return post;
    },
  },
  Mutation: {
    createPost: authMiddleware(
      async (
        _: any,
        { title, content }: { title: string; content: string },
        context: AuthenticatedContext,
      ) => {
        const post = new Post({
          title,
          content,
          created_by: context.user.id,
        });

        await post.save();
        return post;
      },
    ),
    updatePost: authMiddleware(
      async (
        _: any,
        { id, title, content }: { id: string; title: string; content: string },
        context: AuthenticatedContext,
      ) => {
        const post = await Post.findById(id);

        if (!post) throw new Error('Post not found');

        if (post.created_by.toString() !== context.user.id)
          throw new Error('Unauthorized');

        post.set({
          title,
          content,
        });

        await post.save();
        return post;
      },
    ),
    likePost: authMiddleware(
      async (_: any, { id }: { id: string }, context: AuthenticatedContext) => {
        const post = await Post.findById(id);

        if (!post) throw new Error('Post not found');

        if (post.created_by.toString() === context.user.id)
          throw new Error('Unauthorized');

        post.set({
          likes: post.likes + 1,
        });

        await post.save();
        return post;
      },
    ),
    viewPost: async (_: any, { id }: { id: string }, ___: RequestContext) => {
      const post = await Post.findById(id);

      if (!post) throw new Error('Post not found');

      post.set({
        views: post.views + 1,
      });

      await post.save();
      return post;
    },

    deletePost: authMiddleware(
      async (_: any, { id }: { id: string }, context: AuthenticatedContext) => {
        const post = await Post.findById(id);

        if (!post) throw new Error('Post not found');

        if (post.created_by.toString() !== context.user.id)
          throw new Error('Unauthorized');

        post.set({
          deleted_at: new Date(),
        });

        await post.save();
        return post;
      },
    ),
  },
};
