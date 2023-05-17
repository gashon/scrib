import express from 'express';
import Post from '@scrib/db/models/post';
import status from 'http-status';

const router: express.Router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.deleted_at) {
    return res.status(status.NOT_FOUND).json({ message: 'Post not found' });
  }

  return res.json({ data: post });
});

export default router;
