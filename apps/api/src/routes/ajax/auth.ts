import express from 'express';
import status from 'http-status';

import Notification from '@nifty/server-lib/models/notification';
import Token from '@nifty/server-lib/models/token';
import RefreshToken from '@nifty/server-lib/models/refresh-token';
import User, { IUser } from '@nifty/server-lib/models/user';

import passport from '@/lib/passport';
import createLoginLink from '@/util/create-login-link'
import auth from '@/middlewares/auth';
import oauthLogin from '@/middlewares/oauth-login';

const router: express.Router = express.Router();

router.post('/login/email', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) user = await User.create({ email: req.body.email });

    const [accessToken, refreshToken] = await Promise.all([
      Token.create({ user: user.id, strategy: 'email' }),
      RefreshToken.create({
        user: user.id,
        created_by_ip: req.ip,
      })
    ]);

    const loginLink = createLoginLink({ accessToken, refreshToken }, '/dashboard');
    await Notification.create({
      type: 'login',
      emails: [req.body.email],
      data: { login_link: loginLink.toString() },
    });

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
  passport.authenticate('github', { // todo export to middleware and share in both routes
    session: false,
    failureRedirect: `${process.env.DASHBOARD_BASE_URL}/auth/login`,
  }),
  oauthLogin('github')
)

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
    failureRedirect: `${process.env.DASHBOARD_BASE_URL}/auth/login`,
  }),
  oauthLogin('google')
);

router.get('/user', auth(), async (req, res, next) => {
  try {
    const token = await Token.findById(req.cookies.access_token).populate('user');
    if (!token) return res.sendStatus(status.UNAUTHORIZED);

    res.send(token.user);
  } catch (err) {
    next(err);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    await Token.updateMany({
      _id: {
        $in: [
          req.cookies.access_token,
          req.cookies.refresh_token,
        ]
      }
    }, { deleted_at: new Date() });

    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export default router;
