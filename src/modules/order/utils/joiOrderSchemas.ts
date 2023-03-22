import { Joi } from 'celebrate';

export const joiOrderSectorSchema = Joi.object().keys({
  sector_id: Joi.string().uuid().required(),
  estimated_hours: Joi.string().allow(null),
});
