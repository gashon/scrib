import { axios } from '@scrib/web/lib/axios';
import { FileUploadName } from '@scrib/api/types';

export const uploadImage = async (file: File & FileUploadName) => {
  const formData = new FormData();
  formData.append('file', file, file.name);

  const { data } = await axios.post('/api/v1/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
