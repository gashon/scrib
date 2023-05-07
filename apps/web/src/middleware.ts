import { NextMiddleware, NextResponse } from 'next/server';

const middleware: NextMiddleware = async function middleware(req) {
  try {
    const jwtToken = req.nextUrl.searchParams.get('jwt_token');

    // If there is no authorization token, continue
    if (!jwtToken) return NextResponse.next();

    // Set redirect
    const redirect = decodeURIComponent(
      req.nextUrl.searchParams.get('redirect') || '/dashboard',
    );
    // Construct the URL
    const url = new URL(`${process.env.DASHBOARD_BASE_URL}${redirect}`);

    // Create the response object
    const res = NextResponse.redirect(url);

    // Set the authorization token
    if (jwtToken)
      res.cookies.set('jwt_token', jwtToken, {
        maxAge: 60 * 60 * 24 * 365 * 10, // cookie expiration handled on login and UNAUTHORIZED
        path: '/',
        httpOnly: false, // used by the client to check if the user is logged in
      });

    return res;
  } catch (err) {
    return NextResponse.redirect(
      `${process.env.DASHBOARD_BASE_URL}/auth/login`,
    );
  }
};

export const config = {
  matcher: ['/auth/login', '/auth', '/'],
};

export default middleware;
