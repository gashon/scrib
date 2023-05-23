import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import ajax from './ajax';
import v1 from './v1';

const WHITELIST = [
  'http://localhost:3000',
  'http://localhost:7000',
  'https://scrib-web.vercel.app',
];

const router: express.Router = express.Router();

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ extended: true, limit: '50mb' }));
router.use(helmet());
router.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
router.use(cookieParser());

router.use('/ajax', ajax);
router.use('/api/v1', v1);

export default router;
