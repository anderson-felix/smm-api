import { Joi } from 'celebrate';

export const fileJoiSchema = Joi.object().keys({
  link: Joi.string().required(),
  title: Joi.string(),
});

export const flagJoiSchema = Joi.object().keys({
  display_name: Joi.string().required(),
  color: Joi.string(),
});

export const addressJoiSchema = Joi.object().keys({
  address: Joi.string().required(),
  number: Joi.string().required(),
  complement: Joi.string().allow(null),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required(),
  zip_code: Joi.string().required(),
});
