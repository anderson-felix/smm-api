import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import IUserNotificationRepository from '@modules/notification/repositories/IUserNotificationRepository';
import ICreateUserNotificationDTO from '@modules/notification/dtos/ICreateUserNotificationDTO';
import UserNotification from '../entities/UserNotification';

export default class UserNotificationRepository
  implements IUserNotificationRepository
{
  private ormRepository: Repository<UserNotification>;

  constructor() {
    this.ormRepository = getRepository(UserNotification);
  }

  public async create(data: ICreateUserNotificationDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: UserNotification) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async remove(entity: UserNotification) {
    await this.ormRepository.remove(entity);
  }
}
