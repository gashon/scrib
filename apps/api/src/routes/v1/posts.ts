import express from 'express';
import Post from '@scrib/db/models/post';
import status from 'http-status';
import logger from '@scrib/api/lib/logger';

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
    try {
      const post = await Post.findById(req.params.id);
      if (post) {
        post.views += 1;
        await post.save();
      }
    } catch (err) {
      logger.error(`${JSON.stringify(err)}`);
    }

    return res.json({ message: 'success' });
  }
);

export default router;
