// src/graphql/resolvers.ts

import { TaskModel } from '';

const resolvers = {
  Query: {
    tasks: () => TaskModel.find(),
    task: (_: any, { id }: { id: string }) => TaskModel.findById(id),
  },
  Mutation: {
    createTask: async (_: any, { title, description }: { title: string; description: string }) => {
      const task = new TaskModel({ title, description, completed: false });
      await task.save();
      return task;
    },
    updateTask: async (
      _: any,
      { id, title, description, completed }: { id: string; title?: string; description?: string; completed?: boolean },
    ) => {
      const task = await TaskModel.findByIdAndUpdate(id, { title, description, completed }, { new: true });
      return task;
    },
    deleteTask: async (_: any, { id }: { id: string }) => {
      const task = await TaskModel.findByIdAndDelete(id);
      return task;
    },
  },
};

export default resolvers;
