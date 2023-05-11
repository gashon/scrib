import { FC, useCallback } from 'react';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@scrib/ui/components';

export const GithubLogin: FC = () => {
  const onGithubLogin = useCallback(() => {
    window.location.href = '/ajax/auth/login/github';
  }, []);

  return (
    <Button onClick={onGithubLogin} icon={<FaGithub size={20} />}>
      Continue with Github
    </Button>
  );
};
