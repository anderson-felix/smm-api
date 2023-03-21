import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { LocaleError } from '@shared/errors/LocaleError';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { formatUserEntity, IFormattedUser } from '@modules/user/utils';
import { logger } from '@shared/utils';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    password,
    ...params
  }: ICreateUserDTO): Promise<IFormattedUser> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      params.email,
    );

    if (userWithSameEmail) throw new LocaleError('emailAlreadyExists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      ...params,
      password: hashedPassword,
    });

    logger.info(`USER CREATED - ${JSON.stringify(params, null, 4)}`);

    return formatUserEntity(user);
  }
}
