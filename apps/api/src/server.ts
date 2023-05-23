import { CustomError } from '@scrib/api/exceptions';
import { Context, context, schema } from '@scrib/api/graphql';
import logger from '@scrib/api/lib/logger';
import { jwtMiddleware } from '@scrib/api/routes/middleware/auth';
import mongoose from '@scrib/db/mongo';
import cookieParser from 'cookie-parser';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import router from '@scrib/api/routes';
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
  })
);

app.use(router);

app.all('/graphql', jwtMiddleware, (req, res) => {
  graphqlHTTP({
    schema,
    context: {
      ...context,
      req: {
        ...context.req,
        user: req.locals.user,
      },
    } as Context,
    formatError: (error) => {
      if (error instanceof CustomError) {
        res.status(error.statusCode);
      }

      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
      };
    },
    graphiql: dev,
  })(req, res);
});

async function startServer() {
  logger.info('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI!);
  logger.info('Connected to MongoDB');

  app.listen(port, () => logger.info(`API server listening on port ${port}`));
}

startServer();
