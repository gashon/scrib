import { AUTH_COOKIE_NAME } from '@scrib/api/constants';

export const userIsLoggedIn = (): boolean => {
  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem(AUTH_COOKIE_NAME);
    return !!token;
  }
};
