import {
  AUTH_COOKIE_NAME,
  AUTH_REFRESH_COOKIE_NAME,
} from '@scrib/api/constants';
import passport from '@scrib/api/lib/passport';
import { jwtMiddleware } from '@scrib/api/routes/middleware/auth';
import { oauthLogin } from '@scrib/api/routes/middleware/oauth-login';
import { createLoginLink, decodeToken, sign } from '@scrib/api/utils/jwt';
import User from '@scrib/db/models/user';
import express, { NextFunction, Request, Response } from 'express';
import status from 'http-status';

const router: express.Router = express.Router();

// Incomplete route!**
router.post('/login/email', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) user = await User.create({ email: req.body.email });

    const token = sign({ id: user._id.toString() });

    const loginLink = createLoginLink(token, '/dashboard');

    // todo send email
    console.log(loginLink.toString());

    res.sendStatus(status.OK);
  } catch (err) {
    next(err);
  }
});

router.get('/login/github', (req, res, next) => {
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
    state: JSON.stringify({
      redirect: req.query.redirect?.toString(),
    }),
  })(req, res, next);
});

router.get(
  '/login/github/callback',
  (req, res, next) => {
    next();
  },
  passport.authenticate('github', {
    // todo export to middleware and share in both routes
    session: false,
    failureRedirect: `${process.env.WEB_BASE_URL}/auth/login`,
  }),
  oauthLogin('github'),
);

router.get('/login/google', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
    state: JSON.stringify({
      redirect: req.query.redirect?.toString(),
    }),
  })(req, res, next);
});

router.get(
  '/login/google/callback',
  (req, res, next) => {
    next();
  },
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.WEB_BASE_URL}/auth/login`,
  }),
  oauthLogin('google'),
);

router.get(
  '/user',
  jwtMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ data: req.locals.user });
  },
);

router.get(
  '/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie(AUTH_COOKIE_NAME);
      res.clearCookie(AUTH_REFRESH_COOKIE_NAME);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
