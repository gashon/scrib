import { s3Client } from '@scrib/api/lib/s3';
import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

export type UploadImageResponse = PutObjectCommandOutput & {
  url: `https://${string}.s3.amazonaws.com/${string}`;
};

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
  fileName: string;
  postId: string;
} & BaseUploadParams &
  UserUploadParams;

type UploadParams = ProfileUploadParams | PostUploadParams;

const isPostUpload = (params: UploadParams): params is PostUploadParams =>
  params.folder === 'posts';

const getFilePath = (params: UploadParams): string => {
  if (isPostUpload(params)) {
    return `${params.rootDir}/${params.userId}/${params.folder}/${
      params.postId
    }/${uuidv4()}-${params.fileName}`;
  }

  return `${params.rootDir}/${params.userId}/${params.fileName}`;
};

export const upload = async (
  params: UploadParams
): Promise<UploadImageResponse> => {
  const key = getFilePath(params);
  const bucketParams = {
    Bucket: `${process.env.S3_BUCKET_NAME}`, //env
    Key: key,
    Body: params.fileData,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  return {
    ...data,
    url: `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
  };
};
