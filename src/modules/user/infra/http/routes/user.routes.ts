import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import { getPagingHandler } from '@shared/infra/http/middlewares/getPagingHandler';
import { userRoleArrayWithoutOwner } from '@modules/user/enums/RoleEnum';
import { joiNameValidator, joiPasswordValidator } from '@shared/utils';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';

const userRouter = Router();

userRouter.post(
  '/session',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UserController.session,
);

userRouter.post(
  '/create',
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
  UserController.create,
);

userRouter.get('/list', auth, getPagingHandler(), UserController.list);

userRouter.get('/profile', auth, UserController.profile);

userRouter.patch(
  '/update',
  auth,
  celebrate({
    [Segments.BODY]: {
      name: joiNameValidator,
      email: Joi.string().email(),
      password: joiPasswordValidator,
      old_password: Joi.string().trim(),
    },
  }),
  UserController.update,
);

userRouter.delete('/delete', auth, UserController.delete);

export default userRouter;
