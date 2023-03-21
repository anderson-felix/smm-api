import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

@injectable()
export default class ListCollaboratorsService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<Collaborator>> {
    return await this.collaboratorRepository.find(paging);
  }
}
