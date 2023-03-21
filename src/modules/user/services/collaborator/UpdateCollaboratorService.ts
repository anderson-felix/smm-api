import { injectable, inject } from 'tsyringe';

import { logger, updateEntity } from '@shared/utils';
import { Address } from '@shared/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import User from '@modules/user/infra/typeorm/entities/User';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user: User;
  id: string;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
  phone?: string;
  address?: Address | null;
  description?: string | null;
  hourly_price?: string | null;
}

@injectable()
export default class UpdateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user,
    id,
    old_password,
    password,
    ...params
  }: IRequest): Promise<Collaborator> {
    const collaborator = await this.collaboratorRepository.findById(id);
    if (!collaborator) throw new LocaleError('collaboratorNotFound');

    if (params.email && params.email !== collaborator.email) {
      const collaboratorWithSameMail =
        await this.collaboratorRepository.findByEmail(params.email);

      if (collaboratorWithSameMail) throw new LocaleError('emailAlreadyExists');
    }

    await this.updatePassword(collaborator, password, old_password);

    updateEntity(collaborator, params);

    await this.collaboratorRepository.save(collaborator);

    logger.info(
      `COLLABORATOR UPDATED BY - ${user.email} : ${JSON.stringify(
        collaborator,
        null,
        4,
      )}`,
    );

    return collaborator;
  }

  private async updatePassword(
    collaborator: Collaborator,
    new_password?: string,
    old_password?: string,
  ) {
    if (!new_password) return;
    if (!old_password) throw new LocaleError('oldPasswordIsRequired');

    const isValid = await this.hashProvider.compareHash(
      old_password,
      collaborator.password,
    );
    if (!isValid) throw new LocaleError('passwordsNotMatch');

    collaborator.password = await this.hashProvider.generateHash(new_password);
  }
}
