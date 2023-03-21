import { injectable, inject } from 'tsyringe';

import { logger, updateEntity } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import User from '@modules/user/infra/typeorm/entities/User';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import Sector from '@modules/sector/infra/typeorm/entities/Sector';

interface IRequest {
  user: User;
  id: string;
  display_name?: string;
  description?: string | null;
  color?: string | null;
}

@injectable()
export default class UpdateSectorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ user, id, ...params }: IRequest): Promise<Sector> {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) throw new LocaleError('sectorNotFound');

    updateEntity(sector, params);

    await this.sectorRepository.save(sector);

    logger.info(
      `SECTOR UPDATED BY - ${user.email} : ${JSON.stringify(sector, null, 4)}`,
    );

    return sector;
  }
}
