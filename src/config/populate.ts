import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import { Flag } from '@shared/interfaces';

const DEFAULT_FLAGS: Flag[] = [
  {
    color: 'magenta',
    display_name: 'magenta',
  },
  {
    color: 'red',
    display_name: 'red',
  },
  {
    color: 'volcano',
    display_name: 'volcano',
  },
  {
    color: 'orange',
    display_name: 'orange',
  },
  {
    color: 'gold',
    display_name: 'gold',
  },
  {
    color: 'lime',
    display_name: 'lime',
  },
  {
    color: 'green',
    display_name: 'green',
  },
  {
    color: 'cyan',
    display_name: 'cyan',
  },
  {
    color: 'blue',
    display_name: 'blue',
  },
  {
    color: 'geekblue',
    display_name: 'geekblue',
  },
  {
    color: 'purple',
    display_name: 'purple',
  },
];

export interface IPopulateConfig {
  dtos: {
    user: ICreateUserDTO;
  };
  defaultFlags: Flag[];
}

export default {
  dtos: {
    user: {
      email: 'owner@smm.com',
      name: 'Owner',
      password: 'Senha123@@',
      role: 'owner',
      recent_flags: DEFAULT_FLAGS,
    },
  },
  defaultFlags: DEFAULT_FLAGS,
} as IPopulateConfig;
