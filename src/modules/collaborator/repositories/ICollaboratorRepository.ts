import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import ICreateCollaboratorDTO from '@modules/collaborator/dtos/ICreateCollaboratorDTO';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';

export default interface ICollaboratorRepository {
  create(data: ICreateCollaboratorDTO): Promise<Collaborator>;
  save(entity: Collaborator): Promise<Collaborator>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Collaborator>>;
  findByEmail(email: string): Promise<Collaborator | undefined>;
  findByFederalDocument(document: string): Promise<Collaborator | undefined>;
  findById(id: string): Promise<Collaborator | undefined>;
  findByIds(ids: string[]): Promise<Collaborator[]>;
  findByIdToAuth(id: string): Promise<Collaborator | undefined>;
  findByIdWithPasswordSelected(
    email: string,
  ): Promise<Collaborator | undefined>;
  remove(user: Collaborator): Promise<void>;
}
