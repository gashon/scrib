import { FC, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@scrib/ui';

export const GithubLogin: FC = () => {
  const onGithubLogin = useCallback(() => {
    window.location.href = '/ajax/auth/login/github';
  }, []);

  return <Button onClick={onGithubLogin}>Continue with Github</Button>;
};
