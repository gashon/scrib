import { JwtPayload, getUserFromToken } from '@scrib/api/utils/jwt';
import { Request } from 'express';

declare module 'express' {
  interface Request {
    locals: {
      user: JwtPayload | null;
    };
  }
}
