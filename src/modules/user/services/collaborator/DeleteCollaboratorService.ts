import { injectable, inject } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';

interface IRequest {
  id: string;
  user: User;
}

@injectable()
export default class DeleteCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,
  ) {}

  public async execute({ user, id }: IRequest): Promise<void> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) throw new LocaleError('collaboratorNotFound');

    await this.collaboratorRepository.remove(collaborator);

    logger.info(
      `COLLABORATOR DELETED BY - ${user.email} : ${JSON.stringify(
        collaborator,
        null,
        4,
      )}`,
    );
  }
}
