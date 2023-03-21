import OrderCollaboratorRelation from '../infra/typeorm/entities/OrderCollaboratorRelation';
import ICreateOrderCollaboratorRelationDTO from '../dtos/ICreateOrderCollaboratorRelationDTO';

export default interface IOrderCollaboratorRelationRepository {
  create(
    data: ICreateOrderCollaboratorRelationDTO,
  ): Promise<OrderCollaboratorRelation>;
  save(entity: OrderCollaboratorRelation): Promise<OrderCollaboratorRelation>;
  remove(user: OrderCollaboratorRelation): Promise<void>;
}
