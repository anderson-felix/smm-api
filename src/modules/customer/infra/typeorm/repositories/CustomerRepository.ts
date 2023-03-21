import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import Customer from '../entities/Customer';

export default class CustomerRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create(data: ICreateCustomerDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: Customer) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findByEmail(email: string) {
    return await this.ormRepository
      .createQueryBuilder('customer')
      .addSelect('customer.password')
      .where('customer.email = :param', { param: email })
      .getOne();
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async remove(entity: Customer) {
    entity.deleted_at = new Date();
    await this.ormRepository.save(entity);
  }
}
