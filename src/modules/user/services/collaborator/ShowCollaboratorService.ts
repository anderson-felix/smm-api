import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import {
  formatCollaboratorEntity,
  IFormattedCollaborator,
} from '@modules/collaborator/utils';

@injectable()
export default class ShowCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(id: string): Promise<IFormattedCollaborator> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) throw new LocaleError('collaboratorNotFound');

    return formatCollaboratorEntity(collaborator);
  }
}
