import { createLoginLink, sign } from '@scrib/api/utils/jwt';
import { IUser } from '@scrib/db/models/user';
import { NextFunction, Request, Response } from 'express';

export default function oauthLogin(strategy: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const state = req.query.state && JSON.parse(req.query.state.toString());
      const user = req.user as IUser;
      if (!user)
        return res.redirect(`${process.env.DASHBOARD_BASE_URL}/auth/login`);

      const token = sign(
        {
          id: user._id.toString(),
        },
        3600, // 1 hour
      );

      const loginLink = createLoginLink(
        token,
        state.redirect?.toString() || '/dashboard',
      );

      res.redirect(loginLink.toString());
    } catch (err) {
      next(err);
    }
  };
}
