import { FC } from 'react';
import { userIsLoggedIn } from '@scrib/web/features/auth';
import Link from 'next/link';
import { Button } from '@scrib/ui/atoms';
import { useRouter } from 'next/router';

export const Navbar: FC = () => {
  const isLoggedIn = userIsLoggedIn();
  const isEditting = useRouter().pathname.includes('edit');

  return (
    <section className="h-auto w-full">
      <div className="z-20 flex flex-row justify-between items-center w-full h-16 px-8 py-4">
        <Link href="/">
          <div className="border-black border-b">
            <p className="font-bold text-3xl">Scrib</p>
          </div>
        </Link>

        {!isEditting && (
          <Link href={isLoggedIn ? '/auth' : '/post'}>
            <Button className="bg-transparent">
              {isLoggedIn ? 'Register/Login' : 'Make a Post'}
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};
