import { injectable, inject } from 'tsyringe';

import IOrderCollaboratorRelationRepository from '@modules/order/repositories/IOrderCollaboratorRelationRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import {
  formatOrderRelationEntity,
  IFormattedOrderRelation,
} from '@modules/collaborator/utils';

@injectable()
export default class ListOrdersService {
  constructor(
    @inject('OrderCollaboratorRelationRepository')
    private orderCollaboratorRelationRepository: IOrderCollaboratorRelationRepository,
  ) {}

  public async execute(
    collaborator: Collaborator,
  ): Promise<IFormattedOrderRelation[]> {
    const relations =
      await this.orderCollaboratorRelationRepository.findByCollaboratorId(
        collaborator.id,
      );

    return relations.map(formatOrderRelationEntity);
  }
}
