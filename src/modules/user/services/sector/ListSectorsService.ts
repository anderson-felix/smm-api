import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import Sector from '@modules/sector/infra/typeorm/entities/Sector';

@injectable()
export default class ListSectorsService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<Sector>> {
    return await this.sectorRepository.find(paging);
  }
}
