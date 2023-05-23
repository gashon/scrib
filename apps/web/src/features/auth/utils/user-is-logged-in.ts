import { AUTH_COOKIE_NAME } from '@scrib/api/constants';

export const userIsLoggedIn = (): boolean => {
  if (typeof document !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith(AUTH_COOKIE_NAME))
      ?.split('=')[1];

    return !!token;
  }
};
