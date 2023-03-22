import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { joiPasswordValidator } from '@shared/utils';
import CollaboratorController from '../controllers/CollaboratorController';
import auth from '../middlewares/auth';

const collaboratorRouter = Router();

collaboratorRouter.post(
  '/session',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  CollaboratorController.session,
);

collaboratorRouter.get('/profile', auth, CollaboratorController.profile);

collaboratorRouter.patch(
  '/update',
  auth,
  celebrate({
    [Segments.BODY]: {
      password: joiPasswordValidator.required(),
      old_password: Joi.string().required(),
    },
  }),
  CollaboratorController.update,
);

export default collaboratorRouter;
