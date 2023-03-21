import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';

@injectable()
export default class ShowCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(id: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) throw new LocaleError('collaboratorNotFound');

    return collaborator;
  }
}
