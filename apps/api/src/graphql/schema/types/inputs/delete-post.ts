import { GraphQLID, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export type DeletePostArgs = {
  input: {
    id: string;
  };
};

export const deletePostType = new GraphQLInputObjectType({
  name: 'DeletePost',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'id of the post',
    },
  },
});
