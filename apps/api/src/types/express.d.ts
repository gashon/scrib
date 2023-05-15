import { JwtPayload, getUserFromToken } from '@scrib/api/utils/jwt';
import { Request, Express } from 'express';

interface ExtendedLocals {
  user?: JwtPayload | null;
}

declare global {
  namespace Express {
    interface Request {
      locals: ExtendedLocals & Express.Request['locals'];
    }
  }
}
