import { injectable, inject } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import { logger } from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import IOrderCommentRepository from '@modules/order/repositories/IOrderCommentRepository';
import ICreateOrderCommentDTO from '@modules/order/dtos/ICreateOrderCommentDTO';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest
  extends Omit<ICreateOrderCommentDTO, 'collaborator_id' | 'user_id'> {
  user: User;
}

@injectable()
export default class SubmitCommentService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderCommentRepository')
    private orderCommentRepository: IOrderCommentRepository,
  ) {}

  public async execute({ user, ...data }: IRequest): Promise<void> {
    const order = await this.orderRepository.findById(data.order_id, true);
    if (!order) throw new LocaleError('orderNotFound');

    await this.orderCommentRepository.create({
      ...data,
      user_id: user.id,
    });

    logger.info(
      `ORDER COMMENTED BY - ${user.email} : ${JSON.stringify(data, null, 4)}`,
    );
  }
}
