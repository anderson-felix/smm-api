import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import { userRoleArrayWithoutOwner } from '@modules/user/enums/RoleEnum';
import { joiNameValidator, joiPasswordValidator } from '@shared/utils';
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

collaboratorRouter.post(
  '/create',
  auth.owner,
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator.required(),
      email: Joi.string().email().required(),
      password: joiPasswordValidator.required(),
      role: Joi.string()
        .valid(...userRoleArrayWithoutOwner)
        .required(),
    },
  }),
  CollaboratorController.create,
);

collaboratorRouter.get(
  '/list',
  auth.admin,
  getPagingHandler(),
  CollaboratorController.list,
);

collaboratorRouter.get('/profile', auth, CollaboratorController.profile);

collaboratorRouter.patch(
  '/update',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator,
      email: Joi.string().email(),
      password: joiPasswordValidator,
      old_password: Joi.string(),
    },
  }),
  CollaboratorController.update,
);

collaboratorRouter.delete('/delete', auth, CollaboratorController.delete);

export default collaboratorRouter;
