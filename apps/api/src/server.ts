import { resolvers, typeDefs } from '@scrib/api/graphql';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { makeExecutableSchema } from 'graphql-tools';
import morgan from 'morgan';
// todo integrate
import throng from 'throng';

const port = parseInt(process.env.PORT!, 10) || 7000;
const dev = process.env.NODE_ENV !== 'production';

const app = express();

app.set('trust proxy', !dev);
app.disable('x-powered-by');

app.use(morgan(dev ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: dev ? Number.MAX_SAFE_INTEGER : 100, // limit each IP to x requests per windowMs
    message:
      'Too many requests from this IP, please try again after 15 minutes',
  }),
);

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

async function startServer() {
  // Add await server.start() before server.applyMiddleware
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(port, () => console.log('Listening on port', port));
}

startServer();
