import { GraphQLObjectType } from 'graphql';

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: (): any => ({
    createAuthor,
    deleteAuthor,
  }),
});

export default mutation;
