import { gql } from 'apollo-server-express';
import { merge } from 'lodash';

import { userResolvers, userTypeDefs } from './user';

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [rootTypeDefs, userTypeDefs];
const resolvers = merge(userResolvers);

export { typeDefs, resolvers };
