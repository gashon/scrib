import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

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
      type: new GraphQLNonNull(GraphQLID),
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
    status: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Status of the post',
    },
  },
});
