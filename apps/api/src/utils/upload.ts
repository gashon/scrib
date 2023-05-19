import { s3Client } from '@scrib/api/lib/s3';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';

type UploadParams = {
  userId: string;
  fileName: string;
  fileData: Buffer;
  folder: 'profile' | 'post';
};

export const upload = async ({
  userId,
  fileName,
  fileData,
  folder,
}: UploadParams): Promise<PutObjectCommandOutput> => {
  const bucketParams = {
    Bucket: `${process.env.S3_BUCKET_NAME}`, //env
    Key: `${userId}/${folder}/${fileName}`,
    Body: fileData,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  return data;
};
