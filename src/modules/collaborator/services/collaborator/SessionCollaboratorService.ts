import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { LocaleError } from '@shared/errors/LocaleError';
import { logger } from '@shared/utils';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class SessionCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest) {
    const collaborator = await this.collaboratorRepository.findByEmail(email);
    if (!collaborator) throw new LocaleError('invalidLogin');

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      collaborator.password,
    );

    if (!passwordMatched) throw new LocaleError('invalidLogin');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: collaborator.id,
      expiresIn,
    });

    logger.info(`COLLABORATOR LOGGED IN - ${collaborator.email}`);

    return { collaborator, token };
  }
}
