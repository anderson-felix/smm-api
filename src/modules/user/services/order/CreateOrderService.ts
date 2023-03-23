import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import ICreateOrderSectorRelationDTO from '@modules/order/dtos/ICreateOrderSectorRelationDTO';
import ISectorRepository from '@modules/sector/repositories/ISectorRepository';
import IOrderSectorRelationRepository from '@modules/order/repositories/IOrderSectorRelationRepository';
import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';

interface IRequest extends Omit<ICreateOrderDTO, 'created_by'> {
  user: User;
  collaborator_ids: string[];
  sectors: Array<Omit<ICreateOrderSectorRelationDTO, 'order_id'>>;
}

@injectable()
export default class CreateOrderService {
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
  ) {}

  public async execute({
    user,
    collaborator_ids,
    sectors: sectorsData,
    ...data
  }: IRequest): Promise<void> {
    const sectors = await this.sectorRepository.findByIds(
      sectorsData.map(e => e.sector_id),
    );
    const collaborators = await this.collaboratorRepository.findByIds(
      collaborator_ids,
    );
    const customer = data.customer_id
      ? await this.customerRepository.findById(data.customer_id)
      : null;

    if (data.customer_id && !customer)
      throw new LocaleError('customerNotFound');
    if (sectors.length !== sectorsData.length)
      throw new LocaleError('sectorNotFound');
    if (collaborators.length !== collaborator_ids.length)
      throw new LocaleError('collaboratorNotFound');

    const order = await this.orderRepository.create({
      ...data,
      created_by: user.id,
    });

    order.sector_relations = await Promise.all(
      sectorsData.map(data =>
        this.orderSectorRelationRepository.create({
          ...data,
          order_id: order.id,
        }),
      ),
    );

    order.collaborator_relations = await Promise.all(
      collaborator_ids.map(collaborator_id =>
        this.orderCollaboratorRelationRepository.create({
          collaborator_id,
          order_id: order.id,
        }),
      ),
    );

    logger.info(
      `ORDER CREATED BY - ${user.email} : ${JSON.stringify(order, null, 4)}`,
    );
  }
}
