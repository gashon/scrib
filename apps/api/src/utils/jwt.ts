import {
  AUTH_COOKIE_NAME,
  AUTH_REFRESH_COOKIE_NAME,
} from '@scrib/api/constants';
import logger from '@scrib/api/lib/logger';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const SECRET_KEY = 'd3b0e0ca3e61ff2c68a8d0edc69551b0'; //env

export interface JwtPayload {
  id: string;
}

export type DecodedToken =
  | JwtPayload
  | TokenExpiredError
  | JsonWebTokenError
  | null;

/**
 * Sign a JWT token with a given payload.
 *
 * @param payload The payload to be encoded in the JWT.
 * @param expiresIn Expiration time for the token in seconds.
 * @returns The JWT token as a string.
 */
export function sign(
  payload: JwtPayload,
  expiresIn: number | string = 2592000, // 30 days
): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

/**
 * Verify and decode a JWT token.
 *
 * @param token The JWT token to be decoded.
 * @returns The decoded payload or null if the token is invalid.
 */
export function verify(token: string): JwtPayload | null {
  try {
    const decodedPayload = jwt.verify(token, SECRET_KEY) as JwtPayload;
    return decodedPayload;
  } catch (error) {
    console.error('Invalid Token:', error);
    return null;
  }
}

export function createLoginLink({
  token,
  refreshToken,
  redirect,
}: {
  token: string;
  refreshToken: string;
  redirect: string;
}): URL {
  const loginLink = new URL(`${process.env.DASHBOARD_BASE_URL}/auth/login`);

  loginLink.searchParams.append(AUTH_COOKIE_NAME, encodeURIComponent(token));
  loginLink.searchParams.append(
    AUTH_REFRESH_COOKIE_NAME,
    encodeURIComponent(token),
  );
  loginLink.searchParams.append('redirect', encodeURIComponent(redirect));

  return loginLink;
}

export function decodeToken(token?: string): DecodedToken {
  try {
    if (token) {
      const decodedPayload = jwt.verify(token, SECRET_KEY) as JwtPayload;
      return decodedPayload;
    }

    return null;
  } catch (error: any) {
    if (error instanceof TokenExpiredError) {
      logger.error(`Token Expired: ${JSON.stringify(error)}`);
      return error;
    }

    logger.error(`Invalid Token: ${JSON.stringify(error)}`);
    return null;
  }
}
