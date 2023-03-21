import { enumToArray } from '@shared/utils';

export enum UserRoleEnum {
  owner = 'owner',
  admin = 'admin',
  manager = 'manager',
}

export const userRoleArray = enumToArray(UserRoleEnum);

export const userRoleArrayWithoutOwner = userRoleArray.slice(1);
