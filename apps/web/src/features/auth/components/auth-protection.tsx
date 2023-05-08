import { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import { useAuth } from '@scrib/web/features/auth';

type AuthProtectionProps = {
  loadingComponent: ReactElement;
  preloadedUser?: any;
};

export const AuthProtection: FC<PropsWithChildren<AuthProtectionProps>> = ({
  children,
  preloadedUser,
  loadingComponent,
}) => {
  const { user, isLoading } = preloadedUser
    ? { user: preloadedUser, isLoading: false }
    : useAuth();

  useEffect(() => {
    if (user === null) {
      window.location.replace(
        `/error/external?message=${encodeURIComponent(
          'You are not logged in!',
        )}&redirect=${encodeURIComponent(location.pathname + location.search)}`,
      );
    }
  }, [user, isLoading]);

  if (isLoading || user === null) return loadingComponent;

  return <>{children}</>;
};
