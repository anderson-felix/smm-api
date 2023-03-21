import User from '@modules/user/infra/typeorm/entities/User';

export default class ShowProfileService {
  public async execute(user: User): Promise<User> {
    return user;
  }
}
