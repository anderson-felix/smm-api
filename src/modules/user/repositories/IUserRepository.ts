import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<User>>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByIdToAuth(id: string): Promise<User | undefined>;
  findByIdWithPasswordSelected(email: string): Promise<User | undefined>;
  remove(user: User): Promise<void>;
}
