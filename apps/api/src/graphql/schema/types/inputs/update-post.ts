import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export type UpdatePostArgs = {
  input: {
    id: string;
    title?: string;
    content?: string;
  };
};

export const updatePostType = new GraphQLInputObjectType({
  name: 'UpdatePost',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Id of the post',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the post',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Content of the post',
    },
  },
});
