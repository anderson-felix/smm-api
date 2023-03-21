import { injectable, inject } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';

interface IRequest {
  id: string;
  user: User;
}

@injectable()
export default class DeleteSectorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ user, id }: IRequest): Promise<void> {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) throw new LocaleError('sectorNotFound');

    await this.sectorRepository.remove(sector);

    logger.info(
      `SECTOR DELETED BY - ${user.email} : ${JSON.stringify(sector, null, 4)}`,
    );
  }
}
