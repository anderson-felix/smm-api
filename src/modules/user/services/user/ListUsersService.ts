import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '@modules/user/infra/typeorm/entities/User';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(paging: IPagingTypeORM): Promise<IPagingResponse<User>> {
    return await this.userRepository.find(paging);
  }
}
