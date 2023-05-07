import passport from '@scrib/api/lib/passport';
import { oauthLogin } from '@scrib/api/routes/middleware/oauth-login';
import { createLoginLink, sign, verify } from '@scrib/api/utils/jwt';
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
    failureRedirect: `${process.env.DASHBOARD_BASE_URL}/auth/login`,
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
    failureRedirect: `${process.env.DASHBOARD_BASE_URL}/auth/login`,
  }),
  oauthLogin('google'),
);

router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new Error('Unauthorized'); // todo make this a custom error
    }

    const decoded = verify(token);
    if (!decoded) {
      throw new Error('Unauthorized'); // todo make this a custom error
    }

    const user = await User.findById(decoded.id);

    res.json({ data: user });
  } catch (err) {
    next(err);
  }
});

router.get(
  '/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // todo blacklist token

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

export default router;
