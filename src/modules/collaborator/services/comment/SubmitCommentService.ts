import { injectable, inject } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import { logger } from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import IOrderCommentRepository from '@modules/order/repositories/IOrderCommentRepository';
import ICreateOrderCommentDTO from '@modules/order/dtos/ICreateOrderCommentDTO';

interface IRequest
  extends Omit<ICreateOrderCommentDTO, 'collaborator_id' | 'user_id'> {
  collaborator: Collaborator;
}

@injectable()
export default class SubmitCommentService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderCommentRepository')
    private orderCommentRepository: IOrderCommentRepository,
  ) {}

  public async execute({ collaborator, ...data }: IRequest): Promise<void> {
    const order = await this.orderRepository.findById(data.order_id, true);
    if (!order) throw new LocaleError('orderNotFound');

    await this.orderCommentRepository.create({
      ...data,
      collaborator_id: collaborator.id,
    });

    logger.info(
      `ORDER COMMENTED BY - ${collaborator.email} : ${JSON.stringify(
        data,
        null,
        4,
      )}`,
    );
  }
}
