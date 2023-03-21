import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateUserNotificationDTO from '../dtos/ICreateUserNotificationDTO';
import UserNotification from '../infra/typeorm/entities/UserNotification';

export default interface IUserNotificationRepository {
  create(data: ICreateUserNotificationDTO): Promise<UserNotification>;
  save(entity: UserNotification): Promise<UserNotification>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<UserNotification>>;
  findById(id: string): Promise<UserNotification | undefined>;
  remove(user: UserNotification): Promise<void>;
}
