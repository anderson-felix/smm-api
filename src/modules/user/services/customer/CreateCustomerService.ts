import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import User from '@modules/user/infra/typeorm/entities/User';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';
import ICreateCustomerDTO from '@modules/customer/dtos/ICreateCustomerDTO';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import { LocaleError } from '@shared/errors/LocaleError';

interface IRequest extends Omit<ICreateCustomerDTO, 'created_by'> {
  user: User;
}

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ user, ...data }: IRequest): Promise<Customer> {
    const [customerWithSameMail, customerWithSameDocument] = await Promise.all([
      this.customerRepository.findByEmail(data.email),
      this.customerRepository.findByFederalDocument(data.federal_document),
    ]);

    if (customerWithSameMail) throw new LocaleError('emailAlreadyExists');
    if (customerWithSameDocument)
      throw new LocaleError('documentAlreadyExists');

    const customer = await this.customerRepository.create({
      ...data,
      created_by: user.id,
    });

    logger.info(
      `CUSTOMER CREATED BY - ${user.email} : ${JSON.stringify(
        customer,
        null,
        4,
      )}`,
    );

    return customer;
  }
}
