import { resolvers, typeDefs } from '@scrib/api/graphql';
import { verify } from '@scrib/api/utils/jwt';
import models from '@scrib/db/models';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  introspection: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    return {
      ...error,
    };
  },
  context: ({ req }) => {
    if (req) {
      const user =
        req.headers.authorization && verify(req.headers.authorization);

      return {
        models,
        user,
      };
    }
  },
});

export default server;
