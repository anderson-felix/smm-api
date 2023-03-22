import { inject, injectable } from 'tsyringe';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import { formatOrderEntity, IFormattedOrder } from '@modules/order/utils';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<IFormattedOrder> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new LocaleError('orderNotFound');

    return formatOrderEntity(order);
  }
}
