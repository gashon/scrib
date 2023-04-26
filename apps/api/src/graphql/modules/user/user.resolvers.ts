import User from '@scrib/db/models/user';
import { RequestContext } from '@scrib/api/graphql/context';

export const userResolvers = {
  Query: {
    users: (_: any, __: any, context: RequestContext) => {
      // Access the `user` property from the context object
      const currentUser = context.user;
      return User.find();
    },
    user: (_: any, { id }: { id: string }, context: RequestContext) => {
      // Access the `user` property from the context object
      const currentUser = context.user;
      return User.findById(id);
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { title, description }: { title: string; description: string },
      context: RequestContext,
    ) => {
      // Access the `user` property from the context object
      const currentUser = context.user;

      const user = new User({ title, description, completed: false });
      await user.save();
      return user;
    },
    updateUser: async (
      _: any,
      {
        id,
        title,
        description,
        completed,
      }: {
        id: string;
        title?: string;
        description?: string;
        completed?: boolean;
      },
      context: RequestContext,
    ) => {
      // Access the `user` property from the context object
      const currentUser = context.user;

      const user = await User.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true },
      );
      return user;
    },
    deleteUser: async (_: any, { id }: { id: string }, context: RequestContext) => {
      // Access the `user` property from the context object
      const currentUser = context.user;

      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};
