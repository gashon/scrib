import { resolvers, typeDefs } from '@scrib/api/graphql';
import { RequestContext } from '@scrib/api/graphql/context';
import { verify } from '@scrib/api/utils/jwt';
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
  context: ({ req }): RequestContext => {
    const user = req.headers.authorization && verify(req.headers.authorization);

    return {
      user: user || null,
    };
  },
});

export default server;
