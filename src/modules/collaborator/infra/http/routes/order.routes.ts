import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { fileJoiSchema, flagJoiSchema } from '@shared/utils';
import { orderStatusArray } from '@modules/order/enums/OrderStatusEnum';
import OrderController from '../controllers/OrderController';
import auth from '../middlewares/auth';

const orderRouter = Router();

orderRouter.get('/list', auth, OrderController.list);

orderRouter.patch(
  '/update/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      accept: Joi.boolean(),
      description: Joi.string().allow(null),
      status: Joi.string().valid(...orderStatusArray),
      files: Joi.array().items(fileJoiSchema),
      flags: Joi.array().items(flagJoiSchema),
    },
  }),
  OrderController.update,
);

export default orderRouter;
