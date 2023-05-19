import { s3Client } from '@scrib/api/lib/s3';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';

type UploadParams = {
  userId: string;
  fileName: string;
  fileData: Buffer;
};

export const upload = async ({
  userId,
  fileName,
  fileData,
}: UploadParams): Promise<PutObjectCommandOutput> => {
  const bucketParams = {
    Bucket: `${process.env.S3_BUCKET_NAME}`, //env
    Key: `${userId}/${fileName}`,
    Body: fileData,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  return data;
};
