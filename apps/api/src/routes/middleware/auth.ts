import {
  AUTH_COOKIE_NAME,
  AUTH_REFRESH_COOKIE_NAME,
} from '@scrib/api/constants';
import logger from '@scrib/api/lib/logger';
import {
  DecodedToken,
  JwtPayload,
  decodeToken,
  sign,
} from '@scrib/api/utils/jwt';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const isTokenExpired = (decoded: DecodedToken): boolean => {
  if (decoded instanceof TokenExpiredError) {
    logger.error(`Expired token: ${JSON.stringify(decoded)}`);
    return true;
  }
  return false;
};

const isTokenValid = (decoded: DecodedToken): boolean => {
  if (decoded instanceof JsonWebTokenError) {
    logger.error(`Invalid token: ${JSON.stringify(decoded)}`);
    return false;
  }
  return true;
};

// attaches user to req.user
export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies[AUTH_COOKIE_NAME];
  const decoded: DecodedToken = decodeToken(token);

  const isExpired = isTokenExpired(decoded);
  // refresh logic
  if (isExpired) {
    res.clearCookie(AUTH_COOKIE_NAME);

    const refreshToken = req.cookies[AUTH_REFRESH_COOKIE_NAME];
    const decodedRefresh = decodeToken(refreshToken);
    const isRefreshExpired = isTokenExpired(decodedRefresh);

    if (isRefreshExpired || decodedRefresh === null) {
      next(); //todo implement refresh token
    }

    if (!isTokenValid(decodedRefresh)) throw new Error('Invalid token');

    // refresh token
    const refreshPayload = decodedRefresh as JwtPayload;
    const newToken = sign(refreshPayload);
    res.cookie(AUTH_COOKIE_NAME, newToken, {
      httpOnly: true,
      maxAge: 2592000000,
    });
    req.user = refreshPayload;
    next();
  }

  if (!isTokenValid(decoded)) throw new Error('Invalid token');

  req.user = decoded as JwtPayload;
  next();
}
