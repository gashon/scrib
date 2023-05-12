import { axios } from '@scrib/web/lib/axios';
import { IPost } from '@scrib/db/models/post';
import { AxiosResponse } from 'axios';

type GetPostResponse = {
  data: IPost;
};

export const getPost = async (id: string): Promise<IPost> => {
  const response: AxiosResponse<GetPostResponse> = await axios.get(
    `/api/v1/posts/${id}`
  );

  return response.data.data;
};
