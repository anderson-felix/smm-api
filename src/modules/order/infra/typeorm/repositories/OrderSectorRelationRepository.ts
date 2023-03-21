import { getRepository, Repository } from 'typeorm';

import IOrderSectorRelationRepository from '@modules/order/repositories/IOrderSectorRelationRepository';
import ICreateOrderSectorRelationDTO from '@modules/order/dtos/ICreateOrderSectorRelationDTO';
import OrderSectorRelation from '../entities/OrderSectorRelation';

export default class OrderSectorRelationRepository
  implements IOrderSectorRelationRepository
{
  private ormRepository: Repository<OrderSectorRelation>;

  constructor() {
    this.ormRepository = getRepository(OrderSectorRelation);
  }

  public async create(data: ICreateOrderSectorRelationDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: OrderSectorRelation) {
    return await this.ormRepository.save(entity);
  }

  public async remove(entity: OrderSectorRelation) {
    await this.ormRepository.remove(entity);
  }
}
