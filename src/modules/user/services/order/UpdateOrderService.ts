import { injectable, inject } from 'tsyringe';

import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import Order from '@modules/order/infra/typeorm/entities/Order';
import User from '@modules/user/infra/typeorm/entities/User';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICreateOrderSectorRelationDTO from '@modules/order/dtos/ICreateOrderSectorRelationDTO';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import IOrderSectorRelationRepository from '@modules/order/repositories/IOrderSectorRelationRepository';
import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import { OrderStatusEnum } from '@modules/order/enums/OrderStatusEnum';
import { File, Flag } from '@shared/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import {
  getFileNameFromUrl,
  getFilePathFromUrl,
  logger,
  updateEntity,
} from '@shared/utils';
import {
  formatOrderEntity,
  getOrderFilesDiff,
  IFormattedOrder,
} from '@modules/order/utils';

type Sectors = Array<Omit<ICreateOrderSectorRelationDTO, 'order_id'>>;
interface IRequest {
  user: User;
  id: string;
  customer_id?: string | null;
  display_name?: string;
  description?: string | null;
  status?: OrderStatusEnum;
  files?: File[];
  flags?: Flag[];
  collaborator_ids?: string[];
  sectors?: Sectors;
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,

    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @inject('OrderSectorRelationRepository')
    private orderSectorRelationRepository: IOrderSectorRelationRepository,

    @inject('OrderCollaboratorRelationRepository')
    private orderCollaboratorRelationRepository: IOrderCollaboratorRelationRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user,
    id,
    files,
    collaborator_ids,
    sectors,
    ...data
  }: IRequest): Promise<IFormattedOrder> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new LocaleError('orderNotFound');

    if (data.customer_id && data.customer_id !== order.customer_id) {
      const customer = await this.customerRepository.findById(data.customer_id);
      if (!customer) throw new LocaleError('customerNotFound');
    }

    await Promise.all([
      this.updateFiles(order, files),
      this.updateSectorRelations(order, sectors),
      this.updateCollaboratorRelations(order, collaborator_ids),
    ]);

    updateEntity(order, data);

    await this.orderRepository.save(order);

    logger.info(
      `ORDER UPDATED BY - ${user.email} : ${JSON.stringify(order, null, 4)}`,
    );

    return formatOrderEntity(order);
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

  private async updateSectorRelations(order: Order, sectorsData?: Sectors) {
    if (!sectorsData?.length) return;

    const sectorIds = sectorsData.map(e => e.sector_id);

    const relations = order.sector_relations.filter(r =>
      sectorIds.includes(r.sector_id),
    );
    if (sectorIds.length === relations.length) return;

    const sectors = await this.sectorRepository.findByIds(sectorIds);
    if (sectors.length !== sectorIds.length)
      throw new LocaleError('sectorNotFound');

    await Promise.all(
      order.sector_relations.map(r =>
        this.orderSectorRelationRepository.remove(r),
      ),
    );

    order.sector_relations = await Promise.all(
      sectorsData.map(data =>
        this.orderSectorRelationRepository.create({
          ...data,
          order_id: order.id,
        }),
      ),
    );
  }

  private async updateCollaboratorRelations(
    order: Order,
    collaboratorIds?: string[],
  ) {
    if (!collaboratorIds?.length) return;

    const relations = order.collaborator_relations.filter(r =>
      collaboratorIds.includes(r.collaborator_id),
    );
    if (collaboratorIds.length === relations.length) return;

    const collaborators = await this.collaboratorRepository.findByIds(
      collaboratorIds,
    );
    if (collaborators.length !== collaboratorIds.length)
      throw new LocaleError('collaboratorNotFound');

    await Promise.all(
      order.collaborator_relations.map(r =>
        this.orderCollaboratorRelationRepository.remove(r),
      ),
    );

    order.collaborator_relations = await Promise.all(
      collaboratorIds.map(collaborator_id =>
        this.orderCollaboratorRelationRepository.create({
          collaborator_id,
          order_id: order.id,
        }),
      ),
    );
  }
}
