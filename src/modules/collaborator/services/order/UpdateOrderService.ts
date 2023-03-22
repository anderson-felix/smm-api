import { injectable, inject } from 'tsyringe';

import {
  getFileNameFromUrl,
  getFilePathFromUrl,
  logger,
  updateEntity,
} from '@shared/utils';
import { OrderStatusEnum } from '@modules/order/enums/OrderStatusEnum';
import { File, Flag } from '@shared/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import { getOrderFilesDiff } from '@modules/order/utils';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

interface IRequest {
  collaborator: Collaborator;
  id: string;
  description?: string | null;
  status?: OrderStatusEnum;
  files?: File[];
  flags?: Flag[];
  accept?: boolean;
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('OrderCollaboratorRelationRepository')
    private orderCollaboratorRelationRepository: IOrderCollaboratorRelationRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    collaborator,
    id,
    files,
    accept,
    ...data
  }: IRequest): Promise<void> {
    const order = await this.orderRepository.findById(id, true);
    if (!order) throw new LocaleError('orderNotFound');

    const relation =
      await this.orderCollaboratorRelationRepository.findByCollaboratorAndOrder(
        { collaborator_id: collaborator.id, order_id: order.id },
      );

    if (!relation) throw new LocaleError('operationNotPermitted');
    if (accept) relation.accepted_at = new Date();
    if (!relation.accepted_at) throw new LocaleError('operationNotPermitted');

    await this.updateFiles(order, files);
    updateEntity(order, data);

    await this.orderRepository.save(order);
    await this.orderCollaboratorRelationRepository.save(relation);

    logger.info(
      `ORDER UPDATED BY - ${collaborator.email} : ${JSON.stringify(
        order,
        null,
        4,
      )}`,
    );
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
