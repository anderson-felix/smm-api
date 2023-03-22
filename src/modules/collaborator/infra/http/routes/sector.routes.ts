import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import SectorController from '../controllers/SectorController';
import auth from '../middlewares/auth';

const sectorRouter = Router();

sectorRouter.post(
  '/create',
  auth.admin,
  celebrate({
    [Segments.BODY]: {
      display_name: Joi.string().required(),
      description: Joi.string().allow(null).default(null),
      color: Joi.string().allow(null).default(null),
    },
  }),
  SectorController.create,
);

sectorRouter.get('/list', auth, getPagingHandler(), SectorController.list);

sectorRouter.get(
  '/show/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  SectorController.show,
);

sectorRouter.patch(
  '/update/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  celebrate({
    [Segments.BODY]: {
      display_name: Joi.string(),
      description: Joi.string().allow(null),
      color: Joi.string().allow(null),
    },
  }),
  SectorController.update,
);

sectorRouter.delete(
  '/delete/:id',
  auth.admin,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  SectorController.delete,
);

export default sectorRouter;
