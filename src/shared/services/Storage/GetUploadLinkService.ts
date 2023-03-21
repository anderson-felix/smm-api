import { injectable, inject } from 'tsyringe';
import mime from 'mime-types';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import {
  GetUploadLinkParams,
  UploadLinkResponse,
} from '@shared/container/providers/StorageProvider/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class GetUploadLinkService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(data: GetUploadLinkParams): Promise<UploadLinkResponse> {
    if (!data.mimetype) throw new LocaleError('contentTypeRequired');

    data.mimetype = data.mimetype.trim().replace('svg xml', 'svg+xml');

    const extension = mime.extension(data.mimetype);

    if (!extension) throw new LocaleError('invalidFileType');

    return await this.storageProvider.getUploadLink(data);
  }
}
