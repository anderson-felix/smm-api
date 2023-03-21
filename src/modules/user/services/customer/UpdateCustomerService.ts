import { injectable, inject } from 'tsyringe';

import { logger, updateEntity } from '@shared/utils';
import User from '@modules/user/infra/typeorm/entities/User';
import { Address } from '@shared/interfaces';
import { LocaleError } from '@shared/errors/LocaleError';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';

interface IRequest {
  user: User;
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: Address | null;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ user, id, ...params }: IRequest): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new LocaleError('customerNotFound');

    if (params.email && params.email !== customer.email) {
      const customerWithSameMail = await this.customerRepository.findByEmail(
        params.email,
      );

      if (customerWithSameMail) throw new LocaleError('emailAlreadyExists');
    }

    updateEntity(customer, params);

    await this.customerRepository.save(customer);

    logger.info(
      `CUSTOMER UPDATED BY - ${user.email} : ${JSON.stringify(
        customer,
        null,
        4,
      )}`,
    );

    return customer;
  }
}
