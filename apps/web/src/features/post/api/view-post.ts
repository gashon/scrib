import { axios } from '@scrib/web/lib/axios';
import { AxiosResponse } from 'axios';

type ViewPostResponse = {
  message?: string;
};

export const viewPost = async (id: string): Promise<ViewPostResponse> => {
  const response: AxiosResponse<ViewPostResponse> = await axios.post(
    `/api/v1/posts/${id}/views`
  );

  return response?.data;
};
