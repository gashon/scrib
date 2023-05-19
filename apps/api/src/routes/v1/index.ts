import express from 'express';
import postRouter from './posts';
import s3UploadRouter from './upload';

const router: express.Router = express.Router();

router.use('/posts', postRouter);
router.use('/upload', s3UploadRouter);

export default router;
