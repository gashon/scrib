import { resolvers, typeDefs } from '@scrib/api/graphql';
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
  context: async ({ req }) => {
    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    }
  },
});

export default server;
