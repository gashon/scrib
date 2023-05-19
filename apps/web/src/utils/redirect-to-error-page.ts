import { QueryParams } from '@scrib/web/pages/error';
import { NextRouter } from 'next/router';

export const redirectToErrorPage = (
  params: QueryParams,
  router?: NextRouter
): void => {
  if (typeof window !== 'undefined') {
    // create query params url
    const queryParams = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');

    if (router) {
      router.push({
        pathname: '/error',
        query: queryParams,
      });
      return;
    }

    window.location.href = `/error?${queryParams}`;
    return;
  }

  throw new Error('Cannot redirect to error page on server side');
};
