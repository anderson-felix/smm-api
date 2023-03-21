import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import ICreateSectorDTO from '@modules/sector/dtos/ICreateSectorDTO';
import Sector from '../entities/Sector';

export default class SectorRepository implements ISectorRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async create(data: ICreateSectorDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: Sector) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async remove(entity: Sector) {
    entity.deleted_at = new Date();
    await this.ormRepository.save(entity);
  }
}
