import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import { addressJoiSchema, joiNameValidator } from '@shared/utils';
import CustomerController from '../controllers/CustomerController';
import auth from '../middlewares/auth';

const customerRouter = Router();

customerRouter.post(
  '/create',
  auth.admin,
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator.required(),
      email: Joi.string().email().required(),
      description: Joi.string().allow(null).default(null),
      federal_document: Joi.string().required(),
      phone: Joi.string().required(),
      address: addressJoiSchema.allow(null).default(null),
    },
  }),
  CustomerController.create,
);

customerRouter.get('/list', auth, getPagingHandler(), CustomerController.list);

customerRouter.get(
  '/show/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.show,
);

customerRouter.patch(
  '/update/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator,
      email: Joi.string().email(),
      description: Joi.string().allow(null),
      phone: Joi.string(),
      address: addressJoiSchema.allow(null),
    },
  }),
  CustomerController.update,
);

customerRouter.delete(
  '/delete/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CustomerController.delete,
);

export default customerRouter;
