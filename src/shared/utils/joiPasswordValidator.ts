import { Joi } from 'celebrate';

const passwordValidator =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,64}$/;

export const joiPasswordValidator = Joi.string()
  .min(8)
  .custom((value, helper) => {
    if (!passwordValidator.test(value)) {
      return helper.message({
        custom: 'Senha inválida, insira uma senha mais forte.',
      });
    }

    return value;
  });
