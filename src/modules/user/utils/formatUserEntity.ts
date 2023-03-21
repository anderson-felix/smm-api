import User from '../infra/typeorm/entities/User';
import { UserRoleEnum } from '../enums/RoleEnum';

export interface IFormattedUser {
  id: string;
  name: string;
  role: UserRoleEnum;
  email: string;
}

type FuncType = (user: User) => IFormattedUser;

export const formatUserEntity: FuncType = user => ({
  id: user.id,
  name: user.name,
  role: user.role,
  email: user.email,
});
