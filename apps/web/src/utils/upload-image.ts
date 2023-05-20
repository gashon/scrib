import { axios } from '@scrib/web/lib/axios';
import { successNotification } from '@scrib/web/lib/notification';
import { errorNotification } from '@scrib/web/lib/notification';
import { UploadImageResponse } from '@scrib/api/utils/upload';

export const uploadImage = async (
  type: 'post' | 'profile',
  file: File,
  payload: {
    post_id?: string;
  }
): Promise<{
  data: UploadImageResponse;
}> => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  if (payload.post_id) {
    formData.append('post_id', payload.post_id);
  }

  try {
    const { data } = await axios.post(
      `/api/v1/upload/image/${type}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    successNotification('Image uploaded');
    return data;
  } catch (err) {
    errorNotification('Error uploading image');
  }
};
