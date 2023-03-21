import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import Sector from '@modules/sector/infra/typeorm/entities/Sector';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';

@injectable()
export default class ShowSectorrService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(id: string): Promise<Sector> {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) throw new LocaleError('sectorNotFound');

    return sector;
  }
}
