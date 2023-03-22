import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { formatOrderEntity, IFormattedOrder } from '@modules/order/utils';

@injectable()
export default class ListOrdersService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<IFormattedOrder>> {
    const response = await this.orderRepository.find(paging);
    return { ...response, results: response.results.map(formatOrderEntity) };
  }
}
