import path from 'path';

export interface IUploadConfig {
  driver: string;
  directory: string;
}

export default {
  driver: process.env.NODE_ENV?.toLowerCase() === 'production' ? 'S3' : 'DISK',
  directory: path.resolve(__dirname, '..', '..', 'tmp'),
} as IUploadConfig;
