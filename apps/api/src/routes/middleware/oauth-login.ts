import { createLoginLink, sign } from '@scrib/api/utils/jwt';
import { IUser } from '@scrib/db/models/user';
import { NextFunction, Request, Response } from 'express';

export function oauthLogin(strategy: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const state = req.query.state && JSON.parse(req.query.state.toString());
      const user = req.user as IUser;
      if (!user)
        return res.redirect(`${process.env.WEB_BASE_URL}/auth/login`);

      const tokenPayload = {
        id: user._id.toString(),
      };
      const token = sign(tokenPayload);
      const refreshToken = sign(
        tokenPayload,
        60 * 60 * 24 * 30 * 6, // 6 months todo shorten!!
      );

      const loginLink = createLoginLink({
        token,
        refreshToken,
        redirect: state.redirect?.toString() || '/dashboard',
      });

      res.redirect(loginLink.toString());
    } catch (err) {
      next(err);
    }
  };
}
