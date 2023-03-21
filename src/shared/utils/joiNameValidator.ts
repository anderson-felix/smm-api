import { Joi } from 'celebrate';

const removeUnnecessarySpaces = (name: string) =>
  name
    .split(' ')
    .filter(e => e)
    .join(' ');

const nameValidator = /^[a-zA-ZãÃâÂáÁàÀêÊéÉèÈíÍìÌôÔóÓòÒôÔõôúÚùÙçÇ ]{0,}$/;

export const validateName = (name: string, minLength = 0) =>
  nameValidator.test(name) && removeUnnecessarySpaces(name).length >= minLength;

export const joiNameValidator = Joi.string()
  .min(4)
  .custom((value, helper) => {
    if (!validateName(value)) {
      return helper.message({ custom: 'Nome inválido' });
    }

    return removeUnnecessarySpaces(value);
  });
