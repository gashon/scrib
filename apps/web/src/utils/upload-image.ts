import { axios } from '@scrib/web/lib/axios';
import { FileUploadName } from '@scrib/api/types';
import { successNotification } from '@scrib/web/lib/notification';
import { errorNotification } from '@scrib/web/lib/notification';

export const uploadImage = async (file: File & FileUploadName) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  try {
    const { data } = await axios.post('/api/v1/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    successNotification('Image uploaded');
    return data;
  } catch (err) {
    errorNotification('Error uploading image');
  }
};
