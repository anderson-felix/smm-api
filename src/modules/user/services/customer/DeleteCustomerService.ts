import { injectable, inject } from 'tsyringe';

import User from '@modules/user/infra/typeorm/entities/User';
import { logger } from '@shared/utils';
import { LocaleError } from '@shared/errors/LocaleError';
import ICustomerRepository from '@modules/customer/repositories/ICustomerRepository';

interface IRequest {
  id: string;
  user: User;
}

@injectable()
export default class DeleteCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ user, id }: IRequest): Promise<void> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new LocaleError('customerNotFound');

    await this.customerRepository.remove(customer);

    logger.info(
      `CUSTOMER DELETED BY - ${user.email} : ${JSON.stringify(
        customer,
        null,
        4,
      )}`,
    );
  }
}
