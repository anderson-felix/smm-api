import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import User from '@modules/user/infra/typeorm/entities/User';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import ICreateSectorDTO from '@modules/sector/dtos/ICreateSectorDTO';
import Sector from '@modules/sector/infra/typeorm/entities/Sector';

interface IRequest extends Omit<ICreateSectorDTO, 'created_by'> {
  user: User;
}

@injectable()
export default class CreateSectorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({ user, ...data }: IRequest): Promise<Sector> {
    const sector = await this.sectorRepository.create({
      ...data,
      created_by: user.id,
    });

    logger.info(
      `SECTOR CREATED BY - ${user.email} : ${JSON.stringify(sector, null, 4)}`,
    );

    return sector;
  }
}
