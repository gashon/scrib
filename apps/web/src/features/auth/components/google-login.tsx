import { FC, useCallback } from 'react';
import { Button } from '@scrib/ui/components';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const GoogleLogin: FC = () => {
  const router = useRouter();
  const redirect = (router.query.redirect as string) || '/dashboard';

  const onGoogleLogin = useCallback(() => {
    window.location.href = `/ajax/auth/login/google?${new URLSearchParams({
      ...router.query,
      redirect,
    }).toString()}`;
  }, [router, redirect]);

  return (
    <Button
      onClick={onGoogleLogin}
      // icon={
      //   <Image
      //     src="/Google__G__Logo.svg"
      //     alt="Google logo"
      //     width={20}
      //     height={20}
      //   />
      // }
    >
      Continue with Google
    </Button>
  );
};
