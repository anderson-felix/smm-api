import { inject, injectable } from 'tsyringe';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_dto: ICreateUserDTO;
}

@injectable()
export default class PopulateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_dto }: IRequest) {
    const hashedPassword = await this.hashProvider.generateHash(
      user_dto.password,
    );

    await this.userRepository.create({ ...user_dto, password: hashedPassword });
  }
}
