import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { LocaleError } from '@shared/errors/LocaleError';
import { logger, updateEntity } from '@shared/utils';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  user: User;
  name?: string;
  email?: string;
  password?: string;
  old_password?: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(params: IRequest): Promise<IFormattedUser> {
    params.user = (await this.userRepository.findByIdWithPasswordSelected(
      params.user.id,
    )) as User;

    const { user } = params;

    await Promise.all([this.updateEmail(params), this.updatePassword(params)]);
    delete params.password;

    updateEntity(user, params);

    await this.userRepository.save(user);

    const formattedUser = formatUserEntity(user);
    logger.info(`USER UPDATED - ${JSON.stringify(formattedUser, null, 4)}`);

    return formattedUser;
  }

  private async updateEmail({ email, user }: IRequest) {
    if (!email || email === user.email) return;

    const userWithSameEmail = await this.userRepository.findByEmail(email);
    if (userWithSameEmail) throw new LocaleError('emailAlreadyExists');

    user.email = email;
  }

  private async updatePassword({ user, ...params }: IRequest) {
    if (!params.password) return;
    if (!params.old_password) throw new LocaleError('oldPasswordIsRequired');

    const isValid = await this.hashProvider.compareHash(
      params.old_password,
      user.password,
    );
    if (!isValid) throw new LocaleError('passwordsNotMatch');

    user.password = await this.hashProvider.generateHash(params.password);
  }
}
