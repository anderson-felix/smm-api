import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

export interface IPopulateConfig {
  dtos: {
    user: ICreateUserDTO;
  };
}

export default {
  dtos: {
    user: {
      email: 'owner@smm.com',
      name: 'Owner',
      password: 'Senha123@@',
      role: 'owner',
    },
  },
} as IPopulateConfig;
