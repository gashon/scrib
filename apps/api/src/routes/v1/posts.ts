import express from 'express';
import Post from '@scrib/db/models/post';
const router: express.Router = express.Router();

router.get('/:id', async (req: express.Request, res: express.Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if(post.deleted_at){
    return res.status(404).json({ error: 'Post not found' });
  }
  
  return res.json({ data: post });
});

export default router;
