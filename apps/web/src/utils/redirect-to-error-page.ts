import { QueryParams } from '@scrib/web/pages/error';
import { NextRouter } from 'next/router';

export const redirectToErrorPage = (
  params: QueryParams,
  router?: NextRouter
): void => {
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

  if (typeof window !== 'undefined') {
    window.location.href = `/error?${queryParams}`;
    return;
  }

  throw new Error(
    'Cannot redirect to error page on server side, use redirectToErrorPageSSR in getServerSideProps instead'
  );
};

export const redirectToErrorPageSSR = (
  params: QueryParams
): {
  redirect: {
    destination: string;
    permanent: boolean;
  };
} => {
  return {
    redirect: {
      destination: `/error?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`,
      permanent: false,
    },
  };
};
