import { Joi } from 'celebrate';

export const fileJoiSchema = Joi.object().keys({
  link: Joi.string().required(),
  title: Joi.string(),
});

export const flagJoiSchema = Joi.object().keys({
  display_name: Joi.string().required(),
  color: Joi.string(),
});
