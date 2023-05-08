import { AUTH_COOKIE_NAME } from '@scrib/api/constants';
import { getUserFromToken } from '@scrib/api/utils/jwt';
import { NextFunction, Request, Response } from 'express';

// attaches user to req.user
export function jwtMiddleware(req: Request, _: Response, next: NextFunction) {
  const token = req.cookies[AUTH_COOKIE_NAME];
  const user = getUserFromToken(token);
  req.user = user;
  next();
}
