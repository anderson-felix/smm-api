import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import { logger } from '@shared/utils';
import { UserRoleEnum } from '@modules/user/enums/RoleEnum';
import { LocaleError } from '@shared/errors/LocaleError';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: User): Promise<void> {
    if (user.role === UserRoleEnum.owner)
      throw new LocaleError('operationNotPermitted');

    await this.userRepository.remove(user);

    logger.info(`USER DELETED - ${user.email}`);
  }
}
