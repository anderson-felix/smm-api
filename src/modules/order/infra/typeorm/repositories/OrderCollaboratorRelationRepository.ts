import { getRepository, Repository } from 'typeorm';

import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import ICreateOrderCollaboratorRelationDTO from '@modules/order/dtos/ICreateOrderCollaboratorRelationDTO';
import OrderCollaboratorRelation from '../entities/OrderCollaboratorRelation';

export default class OrderCollaboratorRelationRepository
  implements IOrderCollaboratorRelationRepository
{
  private ormRepository: Repository<OrderCollaboratorRelation>;

  constructor() {
    this.ormRepository = getRepository(OrderCollaboratorRelation);
  }

  public async create(data: ICreateOrderCollaboratorRelationDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: OrderCollaboratorRelation) {
    return await this.ormRepository.save(entity);
  }

  public async remove(entity: OrderCollaboratorRelation) {
    await this.ormRepository.remove(entity);
  }
}
