import { getRepository, Repository } from 'typeorm';

import ICollaboratorSectorRelationRepository from '@modules/collaborator/repositories/ICollaboratorSectorRelationRepository';
import ICreateCollaboratorSectorRelationDTO from '@modules/collaborator/dtos/ICreateCollaboratorSectorRelationDTO';
import CollaboratorSectorRelation from '../entities/CollaboratorSectorRelation';

export default class CollaboratorSectorRelationRepository
  implements ICollaboratorSectorRelationRepository
{
  private ormRepository: Repository<CollaboratorSectorRelation>;

  constructor() {
    this.ormRepository = getRepository(CollaboratorSectorRelation);
  }

  public async create(data: ICreateCollaboratorSectorRelationDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: CollaboratorSectorRelation) {
    return await this.ormRepository.save(entity);
  }

  public async remove(entity: CollaboratorSectorRelation) {
    await this.ormRepository.remove(entity);
  }
}
