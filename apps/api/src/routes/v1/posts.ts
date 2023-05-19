import express from 'express';
import Post from '@scrib/db/models/post';
import status from 'http-status';
import mongoose from 'mongoose';

const router: express.Router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.deleted_at) {
    return res
      .status(status.NOT_FOUND)
      .json({ message: 'Post not found', data: null });
  }

  return res.json({ data: post });
});

router.post(
  '/:id/views',
  async (req: express.Request, res: express.Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const post = await Post.findById(req.params.id).session(session);
      if (post) {
        post.views += 1;
        await post.save({ session });
      }
      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
    }
    session.endSession();

    return res.json({ message: 'success' });
  }
);

export default router;
