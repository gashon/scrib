import { S3Client } from '@aws-sdk/client-s3';

const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  region: process.env.AWS_REGION,
};

export const s3Client = new S3Client(s3Config);
