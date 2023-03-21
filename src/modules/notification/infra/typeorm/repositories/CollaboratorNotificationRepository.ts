import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICollaboratorNotificationRepository from '@modules/notification/repositories/ICollaboratorNotificationRepository';
import ICreateCollaboratorNotificationDTO from '@modules/notification/dtos/ICreateCollaboratorNotificationDTO';
import CollaboratorNotification from '../entities/CollaboratorNotification';

export default class CollaboratorNotificationRepository
  implements ICollaboratorNotificationRepository
{
  private ormRepository: Repository<CollaboratorNotification>;

  constructor() {
    this.ormRepository = getRepository(CollaboratorNotification);
  }

  public async create(data: ICreateCollaboratorNotificationDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: CollaboratorNotification) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async remove(entity: CollaboratorNotification) {
    await this.ormRepository.remove(entity);
  }
}
