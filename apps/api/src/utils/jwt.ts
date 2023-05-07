import jwt from 'jsonwebtoken';

const SECRET_KEY = 'd3b0e0ca3e61ff2c68a8d0edc69551b0'; //env

export interface JwtPayload {
  id: string;
  exp?: number;
}

/**
 * Sign a JWT token with a given payload.
 *
 * @param payload The payload to be encoded in the JWT.
 * @param expiresIn Expiration time for the token in seconds.
 * @returns The JWT token as a string.
 */
export function sign(payload: JwtPayload, expiresIn: number = 3600): string {
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

export function createLoginLink(token: string, redirect: string): URL {
  const loginLink = new URL(`${process.env.DASHBOARD_BASE_URL}/auth/login`);

  loginLink.searchParams.append('jwt_token', encodeURIComponent(token));
  loginLink.searchParams.append('redirect', encodeURIComponent(redirect));

  return loginLink;
}
