import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: User) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findByEmail(email: string) {
    return await this.ormRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :param', { param: email })
      .getOne();
  }

  public async findByIdToAuth(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async findByIdWithPasswordSelected(id: string) {
    return await this.ormRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :param', { param: id })
      .getOne();
  }

  public async remove(entity: User) {
    entity.deleted_at = new Date();
    await this.ormRepository.save(entity);
  }
}
