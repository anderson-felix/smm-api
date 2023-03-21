import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import Order from '@modules/order/infra/typeorm/entities/Order';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest extends Omit<ICreateOrderDTO, 'created_by'> {
  user: User;
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ user, ...data }: IRequest): Promise<Order> {
    const order = await this.orderRepository.create({
      ...data,
      created_by: user.id,
    });

    logger.info(
      `ORDER CREATED BY - ${user.email} : ${JSON.stringify(order, null, 4)}`,
    );

    return order;
  }
}
