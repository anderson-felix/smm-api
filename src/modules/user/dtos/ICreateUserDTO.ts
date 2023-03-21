import { UserRoleEnum } from '../enums/RoleEnum';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}
