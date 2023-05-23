import { axios } from '@scrib/web/lib/axios';
import { IUser } from '@scrib/db/models/user';
import { AxiosResponse } from 'axios';

export const updateAuthorAttributes = async (
  payload: Partial<IUser>
): Promise<
  AxiosResponse<{
    data: IUser;
  }>
> => {
  return axios.patch('/api/v1/user', payload, {
    withCredentials: true,
  });
};
