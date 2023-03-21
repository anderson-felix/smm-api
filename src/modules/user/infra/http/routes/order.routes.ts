import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import { fileJoiSchema, flagJoiSchema } from '@shared/utils';
import { orderStatusArray } from '@modules/order/enums/OrderStatusEnum';
import OrderController from '../controllers/OrderController';
import auth from '../middlewares/auth';

const orderRouter = Router();

orderRouter.post(
  '/create',
  auth.admin,
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().allow(null).default(null),
      display_name: Joi.string().required(),
      description: Joi.string().allow(null).default(null),
      status: Joi.string()
        .valid(...orderStatusArray)
        .default('todo'),
      files: Joi.array().items(fileJoiSchema).default([]),
      flags: Joi.array().items(flagJoiSchema).default([]),
    },
  }),
  OrderController.create,
);

orderRouter.get('/list', auth, getPagingHandler(), OrderController.list);

orderRouter.get(
  '/show/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  OrderController.show,
);

orderRouter.patch(
  '/update/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().allow(null),
      display_name: Joi.string(),
      description: Joi.string().allow(null),
      status: Joi.string().valid(...orderStatusArray),
      files: Joi.array().items(fileJoiSchema),
      flags: Joi.array().items(flagJoiSchema),
    },
  }),
  OrderController.update,
);

orderRouter.delete(
  '/delete/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  OrderController.delete,
);

export default orderRouter;
