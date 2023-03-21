import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';

@injectable()
export default class ListOrdersService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<Order>> {
    return await this.orderRepository.find(paging);
  }
}
