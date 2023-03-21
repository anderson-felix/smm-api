import { inject, injectable } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new LocaleError('customerNotFound');

    return customer;
  }
}
