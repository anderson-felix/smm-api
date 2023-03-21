import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import {
  addressJoiSchema,
  joiNameValidator,
  joiPasswordValidator,
} from '@shared/utils';
import CollaboratorController from '../controllers/CollaboratorController';
import auth from '../middlewares/auth';

const collaboratorRouter = Router();

collaboratorRouter.post(
  '/create',
  auth.admin,
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator.required(),
      email: Joi.string().email().required(),
      password: joiPasswordValidator.required(),
      description: Joi.string().allow(null).default(null),
      federal_document: Joi.string().required(),
      phone: Joi.string().required(),
      address: addressJoiSchema.allow(null).default(null),
      hourly_price: Joi.string().allow(null).default(null),
    },
  }),
  CollaboratorController.create,
);

collaboratorRouter.get(
  '/list',
  auth,
  getPagingHandler(),
  CollaboratorController.list,
);

collaboratorRouter.get(
  '/show/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CollaboratorController.show,
);

collaboratorRouter.patch(
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
      password: joiPasswordValidator,
      old_password: Joi.string(),
      description: Joi.string(),
      phone: Joi.string(),
      address: addressJoiSchema.allow(null),
      hourly_price: Joi.string(),
    },
  }),
  CollaboratorController.update,
);

collaboratorRouter.delete(
  '/delete/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CollaboratorController.delete,
);

export default collaboratorRouter;
