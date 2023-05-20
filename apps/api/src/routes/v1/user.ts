import express from 'express';
import User, { IUser } from '@scrib/db/models/user';
import status from 'http-status';
import logger from '@scrib/api/lib/logger';
import fileUpload from 'express-fileupload';
import { jwtMiddleware } from '@scrib/api/routes/middleware/auth';

const router: express.Router = express.Router();

router.use(fileUpload());

router.patch(
  '/',
  jwtMiddleware,
  async (req: express.Request, res: express.Response) => {
    const userId = req.locals.user.id;

    const { first_name, last_name, avatar } = req.body;
    try {
      const user = User.findById(userId);
      if (!user) throw new Error('User not found');

      user.set({
        first_name: first_name || user.first_name,
        last_name: last_name || user.last_name,
        avatar: avatar || user.avatar,
      });
      await user.save();
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
