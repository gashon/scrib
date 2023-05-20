import { axios } from '@scrib/web/lib/axios';
import { AxiosResponse } from 'axios';
import { UploadImageResponse } from '@scrib/api/utils/upload';

export const uploadProfileImage = async (): Promise<
  AxiosResponse<{
    data: UploadImageResponse;
  }>
> => {
  return axios.patch('/api/v1/upload/profile');
};
