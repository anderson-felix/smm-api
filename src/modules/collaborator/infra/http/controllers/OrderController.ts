import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/collaborator/services/order/CreateOrderService';
import ListOrdersService from '@modules/collaborator/services/order/ListOrdersService';
import DeleteOrderService from '@modules/collaborator/services/order/DeleteOrderService';
import ShowOrderService from '@modules/collaborator/services/order/ShowOrderService';
import UpdateOrderService from '@modules/collaborator/services/order/UpdateOrderService';

export default class OrderController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ user: req.user, ...req.body });

    return res.json(order);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute(req.params.id);
    return res.json(order);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);

    const order = await listOrders.execute(req.paging);

    return res.json(order);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      collaborator: req.user,
      id: req.params.id,
      ...req.body,
    });

    return res.json(order);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute({ user: req.user, id: req.params.id });

    return res.sendStatus(204);
  }
}
