import OrderSectorRelation from '../infra/typeorm/entities/OrderSectorRelation';
import ICreateOrderSectorRelationDTO from '../dtos/ICreateOrderSectorRelationDTO';

export default interface IOrderSectorRelationRepository {
  create(data: ICreateOrderSectorRelationDTO): Promise<OrderSectorRelation>;
  save(entity: OrderSectorRelation): Promise<OrderSectorRelation>;
  remove(user: OrderSectorRelation): Promise<void>;
}
