import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOrdersService from '@modules/collaborator/services/order/ListOrdersService';
import UpdateOrderService from '@modules/collaborator/services/order/UpdateOrderService';

export default class OrderController {
  public static async list(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersService);

    const order = await listOrders.execute(req.collaborator);

    return res.json(order);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      collaborator: req.collaborator,
      id: req.params.id,
      ...req.body,
    });

    return res.json(order);
  }
}
