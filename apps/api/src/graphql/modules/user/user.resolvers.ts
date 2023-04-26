import {
  AuthenticatedContext,
  RequestContext,
  authMiddleware,
} from '@scrib/api/graphql';
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
    /* authMiddleware( */
    deleteUser: async (
      _: any,
      { id }: { id: string },
      context: AuthenticatedContext,
    ) => {
      if (id !== context.user.id)
        throw new Error('You can only delete your own account');

      // Access the `user` property from the context object
      const user = await User.findById(context.user.id);

      if (!user) throw new Error('User not found');

      user.set({ deleted_at: new Date() });
      await user.save();

      return user;
    },
    // ),
  },
};
