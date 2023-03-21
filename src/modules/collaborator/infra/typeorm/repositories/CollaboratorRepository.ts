import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import ICreateCollaboratorDTO from '@modules/collaborator/dtos/ICreateCollaboratorDTO';
import Collaborator from '../entities/Collaborator';

export default class CollaboratorRepository implements ICollaboratorRepository {
  private ormRepository: Repository<Collaborator>;

  constructor() {
    this.ormRepository = getRepository(Collaborator);
  }

  public async create(data: ICreateCollaboratorDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: Collaborator) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findByEmail(email: string) {
    return await this.ormRepository
      .createQueryBuilder('collaborator')
      .addSelect('collaborator.password')
      .where('collaborator.email = :param', { param: email })
      .getOne();
  }

  public async findByFederalDocument(federal_document: string) {
    return await this.ormRepository.findOne({ where: { federal_document } });
  }

  public async findByIdToAuth(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByIdWithPasswordSelected(id: string) {
    return await this.ormRepository
      .createQueryBuilder('collaborator')
      .addSelect('collaborator.password')
      .where('collaborator.id = :param', { param: id })
      .getOne();
  }

  public async remove(entity: Collaborator) {
    entity.deleted_at = new Date();
    await this.ormRepository.save(entity);
  }
}
