import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import { logger } from '@shared/utils';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user: User): Promise<void> {
    await this.userRepository.remove(user);

    logger.info(`USER DELETED - ${user.email}`);
  }
}
