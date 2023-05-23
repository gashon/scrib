import { FC, PropsWithChildren, ReactElement, useEffect } from 'react';
import { useAuth } from '@scrib/web/features/auth';
import { redirectToErrorPage } from '@scrib/web/utils/redirect-to-error-page';

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
      redirectToErrorPage({
        title: 'Unauthorized',
        description: 'You must be logged in to view this page.',
        loggedIn: false,
      });
    }
  }, [user, isLoading]);

  if (isLoading || user === null) return loadingComponent;

  return <>{children}</>;
};
