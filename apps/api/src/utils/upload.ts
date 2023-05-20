import { s3Client } from '@scrib/api/lib/s3';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';

type BaseUploadParams = {
  userId: string;
  fileData: Buffer;
};

type UserUploadParams = {
  rootDir: 'users';
};

type ProfileUploadParams = {
  fileName: 'profile';
  folder?: never;
} & BaseUploadParams &
  UserUploadParams;

type PostUploadParams = {
  folder: 'posts';
  postId: string;
} & BaseUploadParams &
  UserUploadParams;

type UploadParams = ProfileUploadParams | PostUploadParams;

const isPostUpload = (params: UploadParams): params is PostUploadParams =>
  params.folder === 'posts';

const getFilePath = (params: UploadParams): string => {
  if (isPostUpload(params)) {
    return `${params.rootDir}/${params.userId}/${params.folder}/${params.postId}`;
  }

  return `${params.rootDir}/${params.userId}/${params.fileName}`;
};

export const upload = async (
  params: UploadParams
): Promise<PutObjectCommandOutput> => {
  const bucketParams = {
    Bucket: `${process.env.S3_BUCKET_NAME}`, //env
    Key: getFilePath(params),
    Body: params.fileData,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  return data;
};
