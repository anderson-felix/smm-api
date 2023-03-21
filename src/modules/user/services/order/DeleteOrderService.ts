import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import { getFileNameFromUrl, logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  id: string;
  user: User;
}

@injectable()
export default class DeleteOrderService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user, id }: IRequest): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new LocaleError('orderNotFound');

    await this.orderRepository.remove(order);

    await Promise.allSettled(
      order.files.map(({ link }) =>
        this.storageProvider.deleteFile({
          filename: getFileNameFromUrl(link),
          folder: 'order_files',
        }),
      ),
    );

    logger.info(
      `ORDER DELETED BY - ${user.email} : ${JSON.stringify(order, null, 4)}`,
    );
  }
}
