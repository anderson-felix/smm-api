import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import DevController from '@modules/dev/infra/http/controllers/DevController';
import authSecretKey from '../middlewares/authSecretKey';
import checkPopulateToken from '../middlewares/checkPopulateToken';

const devRouter = Router();

devRouter.put(
  '/upload/:secret',
  authSecretKey,
  celebrate({
    [Segments.QUERY]: {
      filename: Joi.string().required(),
    },
  }),
  DevController.upload,
);

devRouter.post('/populate/:token', checkPopulateToken, DevController.populate);

export default devRouter;
