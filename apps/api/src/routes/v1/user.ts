import express from 'express';
import User from '@scrib/db/models/user';
import status from 'http-status';
import logger from '@scrib/api/lib/logger';
import { jwtMiddleware, authGuard } from '@scrib/api/routes/middleware/auth';

const router: express.Router = express.Router();

router.patch(
  '/',
  jwtMiddleware,
  // authGuard,
  async (req: express.Request, res: express.Response) => {
    const userId = req.locals.user.id;

    const { first_name, last_name, avatar } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');

      user.set({
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        avatar: avatar || user.avatar,
      });
      await user.save();

      return res.status(status.OK).json({
        data: user,
      });
    } catch (err) {
      logger.error(`${JSON.stringify(err)}`);
      return res.status(status.INTERNAL_SERVER_ERROR).json({
        message: 'Error updating user',
        data: null,
      });
    }
  }
);

export default router;
