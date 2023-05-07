import express from 'express';

import auth from './auth';

const router: express.Router = express.Router();

router.use('/auth', auth);

export default router;
