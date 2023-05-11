import {
  AUTH_COOKIE_NAME,
  AUTH_REFRESH_COOKIE_NAME,
} from '@scrib/api/constants';
import { NextMiddleware, NextResponse } from 'next/server';

const middleware: NextMiddleware = async function middleware(req) {
  try {
    const token = req.nextUrl.searchParams.get(AUTH_COOKIE_NAME);
    const refreshToken = req.nextUrl.searchParams.get(AUTH_REFRESH_COOKIE_NAME);

    if (!token || !refreshToken) {
      return NextResponse.next();
    }

    const redirect = decodeURIComponent(
      req.nextUrl.searchParams.get('redirect') || '/dashboard',
    );
    // Construct the URL
    const url = new URL(`${process.env.NEXT_PUBLIC_WEB_BASE_URL}${redirect}`);

    // Create the response object
    const res = NextResponse.redirect(url);
    console.log("url", url)

    // Set the authorization token
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      maxAge: 60 * 60 * 24 * 365 * 10, // cookie expiration handled on login and UNAUTHORIZED
      path: '/',
      httpOnly: false, // used by the client to check if the user is logged in
    });
    res.cookies.set(AUTH_REFRESH_COOKIE_NAME, refreshToken, {
      maxAge: 60 * 60 * 24 * 365 * 10, // cookie expiration handled on login and UNAUTHORIZED
      path: '/',
      httpOnly: true,
    });

    return res;
  } catch (err) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_WEB_BASE_URL}/auth/login`,
    );
  }
};

export const config = {
  matcher: ['/auth/login', '/auth'],
};

export default middleware;
