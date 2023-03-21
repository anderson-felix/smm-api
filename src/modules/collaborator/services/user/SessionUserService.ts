import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import { logger } from '@shared/utils';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export default class SessionUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new LocaleError('invalidLogin');

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) throw new LocaleError('invalidLogin');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    logger.info(`USER LOGGED IN - ${user.email}`);

    return { user, token };
  }
}
