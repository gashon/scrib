import express from 'express';
import postRouter from './posts';

const router: express.Router = express.Router();
router.use('/posts', postRouter);

export default router;
