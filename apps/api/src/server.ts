import { context, schema } from '@scrib/api/graphql';
import logger from '@scrib/api/lib/logger';
import cookieParser from 'cookie-parser';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import rateLimit from 'express-rate-limit';
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

app.all(
  '/graphql',
  graphqlHTTP({
    schema,
    context: context as any,
    graphiql: dev, // Enable GraphiQL only in development mode
  }),
);

async function startServer() {
  // todo add connection to db
  app.listen(port, () => logger.info(`API server listening on port ${port}`));
}

startServer();
