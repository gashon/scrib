
export const authResolvers = {
  Query: {
    users: () => User.find(),
    user: (_: any, { id }: { id: string }) => User.findById(id),
  },
  Mutation: {
    createUser: async (
      _: any,
      { title, description }: { title: string; description: string },
    ) => {
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
    ) => {
      const user = await User.findByIdAndUpdate(
        id,
        { title, description, completed },
        { new: true },
      );
      return user;
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};
