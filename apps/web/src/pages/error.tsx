import { FC } from 'react';
import { userIsLoggedIn } from '@scrib/web/features/auth';
import Link, { LinkProps } from 'next/link';
import { Button } from '@scrib/ui/atoms';
import { Helmet } from 'react-helmet-async';
import dynamic from 'next/dynamic';
const ScribbleSVG = dynamic(() => import('@scrib/ui/svg/scribble'), {
  ssr: false,
});

type QueryParamsWithRedirect = {
  title: string;
  description?: string;
  redirect: LinkProps['href'];
  retry?: boolean;
};

type QueryParamsWithoutRedirect = {
  title: string;
  description?: string;
  redirect?: never;
  retry?: never;
};

export type QueryParams = QueryParamsWithRedirect | QueryParamsWithoutRedirect;

const ErrorPage: FC<QueryParams> = ({
  title,
  description,
  redirect,
  retry,
  ...rest
}) => {
  const isLoggedIn = userIsLoggedIn();

  return (
    <>
      <Helmet>
        <title>{title ?? 'Scrib'}</title>
        <meta name="description" content={description ?? 'Error'} />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
        <meta name="bingbot" content="noindex" />
        <meta name="yandex" content="none" />
      </Helmet>
      <div className="relative w-screen h-screen  flex justify-center items-center">
        <main className="z-20 flex justify-center items-center flex-col">
          <h1 className="text-4xl mb-4">{title ?? 'Error'}</h1>
          {description && <p className="text-lg mb-10">{description}</p>}
          <div className="flex flex-row gap-5">
            {retry && redirect && (
              <Link href={redirect} className=" font-bold">
                <Button>Go Back</Button>
              </Link>
            )}

            <Link href={isLoggedIn ? '/' : '/auth'}>
              <Button variant="secondary">
                {isLoggedIn ? 'Go to Landing Page' : 'Login'}
              </Button>
            </Link>
          </div>
        </main>

        <div className="absolute inset-0 opacity-75 z-10">
          <ScribbleSVG />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const queryParams = context.query as QueryParams;

  return {
    props: {
      ...queryParams,
    },
  };
}

export default ErrorPage;
