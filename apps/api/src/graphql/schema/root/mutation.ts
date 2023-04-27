import { GraphQLID, GraphQLNonNull, GraphQLObjectType } from 'graphql';

//tmp

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    // todo
    // tmp field for compilation
    tmp: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Globally unique ID of the post',
    },
  }),
});
