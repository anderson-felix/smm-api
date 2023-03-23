import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import IOrderRepository from '@modules/order/repositories/IOrderRepository';
import ICreateOrderDTO from '@modules/order/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: ICreateOrderDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: Order) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    paging.relations = [
      'sector_relations',
      'sector_relations.sector',
      'collaborator_relations',
      'collaborator_relations.collaborator',
      'comments',
      'comments.collaborator',
      'comments.user',
      'customer',
    ];
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string, relationless = false) {
    return await this.ormRepository.findOne({
      where: { id },
      relations: relationless
        ? []
        : [
            'sector_relations',
            'sector_relations.sector',
            'collaborator_relations',
            'collaborator_relations.collaborator',
            'comments',
            'comments.collaborator',
            'comments.user',
            'customer',
          ],
    });
  }

  public async remove(entity: Order) {
    entity.deleted_at = new Date();

    await this.ormRepository.save(entity);
  }
}
