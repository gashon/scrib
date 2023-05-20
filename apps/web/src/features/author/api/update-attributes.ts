import { axios } from '@scrib/web/lib/axios';
import { IUser } from '@scrib/db/models/user';

export const updateAuthorAttributes = async (payload: Partial<IUser>) => {
  return axios.patch('/api/v1/user', payload);
};
