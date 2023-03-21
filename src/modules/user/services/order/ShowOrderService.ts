import { inject, injectable } from 'tsyringe';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new LocaleError('orderNotFound');

    return order;
  }
}
