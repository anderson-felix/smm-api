import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import OrderComment from '../infra/typeorm/entities/OrderComment';
import ICreateOrderCommentDTO from '../dtos/ICreateOrderCommentDTO';

export default interface IOrderCommentRepository {
  create(data: ICreateOrderCommentDTO): Promise<OrderComment>;
  save(entity: OrderComment): Promise<OrderComment>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<OrderComment>>;
  findById(id: string): Promise<OrderComment | undefined>;
  remove(user: OrderComment): Promise<void>;
}
