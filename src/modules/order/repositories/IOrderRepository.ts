import Order from '@modules/order/infra/typeorm/entities/Order';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';

export default interface IOrderRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  save(movie: Order): Promise<Order>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Order>>;
  findById(id: string): Promise<Order | undefined>;
  remove(movie: Order): Promise<void>;
}
