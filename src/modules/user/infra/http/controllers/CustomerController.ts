import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/user/services/customer/CreateCustomerService';
import ListCustomersService from '@modules/user/services/customer/ListCustomersService';
import DeleteCustomerService from '@modules/user/services/customer/DeleteCustomerService';
import ShowCustomerService from '@modules/user/services/customer/ShowCustomerService';
import UpdateCustomerService from '@modules/user/services/customer/UpdateCustomerService';

export default class CustomerController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      user: req.user,
      ...req.body,
    });

    return res.json(customer);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute(req.params.id);
    return res.json(customer);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomersService);

    const customer = await listCustomers.execute(req.paging);

    return res.json(customer);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      user: req.user,
      id: req.params.id,
      ...req.body,
    });

    return res.json(customer);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ user: req.user, id: req.params.id });

    return res.sendStatus(204);
  }
}
