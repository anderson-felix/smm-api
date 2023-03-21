import { injectable, inject } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { GetFileLinkParams } from '@shared/container/providers/StorageProvider/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class GetFileLinkService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public execute(data: GetFileLinkParams): string {
    if (!data.key) throw new LocaleError('operationNotPermitted');

    return this.storageProvider.getFileLink(data);
  }
}
