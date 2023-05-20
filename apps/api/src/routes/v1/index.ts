import express from 'express';

import postRouter from './posts';
import s3UploadRouter from './upload';
import userRouter from './user';

const router: express.Router = express.Router();

router.use('/posts', postRouter);
router.use('/user', userRouter);
router.use('/upload', s3UploadRouter);

export default router;
