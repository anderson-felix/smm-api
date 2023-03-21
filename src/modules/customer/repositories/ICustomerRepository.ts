import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

export default interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  save(entity: Customer): Promise<Customer>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Customer>>;
  findByEmail(email: string): Promise<Customer | undefined>;
  findByFederalDocument(document: string): Promise<Customer | undefined>;
  findById(id: string): Promise<Customer | undefined>;
  remove(user: Customer): Promise<void>;
}
