import { FC } from 'react';
import { userIsLoggedIn } from '@scrib/web/features/auth';
import Link, { LinkProps } from 'next/link';
import { Button } from '@scrib/ui/atoms';
import { Helmet } from 'react-helmet-async';
import dynamic from 'next/dynamic';
const ScribbleSVG = dynamic(() => import('@scrib/ui/svg/scribble'), {
  ssr: false,
});

const FourOFourPage: FC = () => {
  const isLoggedIn = userIsLoggedIn();

  return (
    <>
      <Helmet></Helmet>
      <div className="relative w-screen h-screen  flex justify-center items-center">
        <main className="z-20 flex justify-center items-center flex-col">
          <h1 className="text-4xl mb-4">404 Page not Found</h1>
          <div className="flex flex-row gap-5">
            <Link href={isLoggedIn ? '/dashboard' : '/'}>
              <Button variant="secondary">
                {isLoggedIn ? 'Dashboard' : 'Landing Page'}
              </Button>
            </Link>
            <Link href={'/auth'}>
              <Button variant="secondary">Login</Button>
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

export default FourOFourPage;
