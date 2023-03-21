import { inject, injectable } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = await this.userRepository.findByIdToAuth(id);
    if (!user) throw new LocaleError('userNotFound');

    return user;
  }
}
