import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

@injectable()
export default class AuthenticateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute(id: string): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findByIdToAuth(id);
    if (!collaborator) throw new LocaleError('userNotFound');

    return collaborator;
  }
}
