import { injectable, inject } from 'tsyringe';

import {
  getFileNameFromUrl,
  getFilePathFromUrl,
  logger,
  updateEntity,
} from '@shared/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';
import User from '@modules/user/infra/typeorm/entities/User';
import { OrderStatusEnum } from '@modules/order/enums/OrderStatusEnum';
import { File, Flag } from '@shared/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { getOrderFilesDiff } from '@modules/order/utils';

interface IRequest {
  user: User;
  id: string;
  customer_id?: string | null;
  display_name?: string;
  description?: string | null;
  status?: OrderStatusEnum;
  files?: File[];
  flags?: Flag[];
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user, id, files, ...data }: IRequest): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new LocaleError('orderNotFound');

    await this.updateFiles(order, files);

    updateEntity(order, data);

    await this.orderRepository.save(order);

    logger.info(
      `ORDER UPDATED BY - ${user.email} : ${JSON.stringify(order, null, 4)}`,
    );

    return order;
  }

  private async updateFiles(order: Order, files?: File[]): Promise<void> {
    if (!files) return;

    if (!order.files.length) {
      order.files = files;
      return;
    }

    const orderImages = order.files.map(file => ({
      ...file,
      link: getFilePathFromUrl(file.link),
    }));

    const newImages = files.map(file => ({
      ...file,
      link: getFilePathFromUrl(file.link),
    }));
    const imagesToRemove = getOrderFilesDiff(orderImages, newImages);

    await Promise.allSettled(
      imagesToRemove.map(({ link }) =>
        this.storageProvider.deleteFile({
          filename: getFileNameFromUrl(link),
          folder: 'order_files',
        }),
      ),
    );

    order.files = [
      ...newImages,
      ...orderImages.filter(e => !imagesToRemove.find(f => f.link === e.link)),
    ];
  }
}
