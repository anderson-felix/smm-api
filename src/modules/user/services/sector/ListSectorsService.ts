import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import { formatSectorEntity, IFormattedSector } from '@modules/sector/utils';

@injectable()
export default class ListSectorsService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<IFormattedSector>> {
    const response = await this.sectorRepository.find(paging);
    return { ...response, results: response.results.map(formatSectorEntity) };
  }
}
