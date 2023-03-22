import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CommentController from '../controllers/CommentController';
import auth from '../middlewares/auth';

const commentRouter = Router();

commentRouter.post(
  '/submit',
  auth,
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.string().uuid().required(),
      text: Joi.string().required(),
    },
  }),
  CommentController.submit,
);

commentRouter.delete(
  '/delete/:id',
  auth,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  CommentController.delete,
);

export default commentRouter;
