import { injectable, inject } from 'tsyringe';

import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import { IPagingResponse } from '@shared/utils';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';

@injectable()
export default class ListCustomersService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(
    paging: IPagingTypeORM,
  ): Promise<IPagingResponse<Customer>> {
    return await this.customerRepository.find(paging);
  }
}
