import { getRepository, Repository } from 'typeorm';

import IOrderCollaboratorRelationRepository, {
  IFindByCollaboratorAndOrder,
} from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
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

  public async findByCollaboratorId(collaborator_id: string) {
    return await this.ormRepository.find({
      where: { collaborator_id },
      relations: [
        'order',
        'order.sector_relations',
        'order.sector_relations.sector',
        'order.collaborator_relations',
        'order.collaborator_relations.collaborator',
        'order.comments',
        'order.comments.collaborator',
        'order.comments.user',
      ],
    });
  }

  public async findByCollaboratorAndOrder({
    collaborator_id,
    order_id,
  }: IFindByCollaboratorAndOrder) {
    return await this.ormRepository.findOne({
      where: { collaborator_id, order_id },
    });
  }
}
