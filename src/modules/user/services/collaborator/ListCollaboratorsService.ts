import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import {
  formatCollaboratorEntity,
  IFormattedCollaborator,
} from '@modules/collaborator/utils';

@injectable()
export default class ListCollaboratorsService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<IFormattedCollaborator>> {
    const response = await this.collaboratorRepository.find(paging);
    return {
      ...response,
      results: response.results.map(formatCollaboratorEntity),
    };
  }
}
