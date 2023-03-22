import OrderCollaboratorRelation from '../infra/typeorm/entities/OrderCollaboratorRelation';
import ICreateOrderCollaboratorRelationDTO from '../dtos/ICreateOrderCollaboratorRelationDTO';

export interface IFindByCollaboratorAndOrder {
  order_id: string;
  collaborator_id: string;
}

export default interface IOrderCollaboratorRelationRepository {
  create(
    data: ICreateOrderCollaboratorRelationDTO,
  ): Promise<OrderCollaboratorRelation>;
  save(entity: OrderCollaboratorRelation): Promise<OrderCollaboratorRelation>;
  remove(user: OrderCollaboratorRelation): Promise<void>;
  findByCollaboratorId(id: string): Promise<OrderCollaboratorRelation[]>;
  findByCollaboratorAndOrder(
    data: IFindByCollaboratorAndOrder,
  ): Promise<OrderCollaboratorRelation | undefined>;
}
