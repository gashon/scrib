import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export type CreatePostArgs = {
  input: {
    title: string;
  };
};

export const newPostType = new GraphQLInputObjectType({
  name: 'NewPost',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the post',
    },
  },
});
