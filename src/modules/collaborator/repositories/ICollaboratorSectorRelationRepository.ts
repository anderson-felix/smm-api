import CollaboratorSectorRelation from '@modules/collaborator/infra/typeorm/entities/CollaboratorSectorRelation';
import ICreateCollaboratorSectorRelationDTO from '@modules/collaborator/dtos/ICreateCollaboratorSectorRelationDTO';

export default interface ICollaboratorSectorRelationRepository {
  create(
    data: ICreateCollaboratorSectorRelationDTO,
  ): Promise<CollaboratorSectorRelation>;
  save(entity: CollaboratorSectorRelation): Promise<CollaboratorSectorRelation>;
  remove(user: CollaboratorSectorRelation): Promise<void>;
}
