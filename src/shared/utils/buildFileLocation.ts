import { container } from 'tsyringe';

import { BucketFolders } from '@shared/container/providers/StorageProvider/interfaces';
import GetFileLinkService from '@shared/services/Storage/GetFileLinkService';

type FuncType = (uri: string) => string;

export const buildFileLocation: FuncType = uri => {
  const localStorageLocation = `http://localhost:${process.env.PORT}`;

  if (!uri || typeof uri !== 'string') return localStorageLocation;

  const getFileLink = container.resolve(GetFileLinkService);
  const [folder, ...key] = uri.split('/');

  return getFileLink.execute({
    folder: folder as BucketFolders,
    key: key.join(''),
  });
};
