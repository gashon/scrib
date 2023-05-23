import { axios } from '@scrib/web/lib/axios';
import storage from '@scrib/web/lib/storage';

export const useLogout = () => {
  return async (): Promise<void> => {
    await axios.post('/ajax/auth/logout', {}, { withCredentials: true });
    storage.remove('user');
    window.location.assign('/');
  };
};
