import { mutation, query } from '@scrib/api/graphql/schema/root';
import { GraphQLSchema } from 'graphql';

export const schema = new GraphQLSchema({
  mutation,
  query,
});
