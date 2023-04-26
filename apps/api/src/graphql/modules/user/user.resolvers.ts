import { RequestContext, authMiddleware } from '@scrib/api/graphql';
import User from '@scrib/db/models/user';

export const userResolvers = {
  Query: {
    users: (_: any, __: any, ___: RequestContext) => {
      return User.find();
    },
    user: (_: any, { id }: { id: string }, ___: RequestContext) => {
      return User.findById(id);
    },
  },
  Mutation: {
    deleteUser: authMiddleware(
      async (_: any, { id }: { id: string }, context: RequestContext) => {
        if (!context.user)
          throw new Error('You must be logged in to delete a user');
        // Access the `user` property from the context object
        const user = await User.findById(context.user.id);

        if (!user) throw new Error('User not found');

        user.set({ deleted_at: new Date() });
        await user.save();

        return user;
      },
    ),
  },
};
