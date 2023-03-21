import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateCollaboratorNotificationDTO from '../dtos/ICreateCollaboratorNotificationDTO';
import CollaboratorNotification from '../infra/typeorm/entities/CollaboratorNotification';

export default interface ICollaboratorNotificationRepository {
  create(
    data: ICreateCollaboratorNotificationDTO,
  ): Promise<CollaboratorNotification>;
  save(entity: CollaboratorNotification): Promise<CollaboratorNotification>;
  find(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<CollaboratorNotification>>;
  findById(id: string): Promise<CollaboratorNotification | undefined>;
  remove(user: CollaboratorNotification): Promise<void>;
}
