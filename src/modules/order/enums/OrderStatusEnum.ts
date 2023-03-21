import { enumToArray } from '@shared/utils';

export enum OrderStatusEnum {
  todo = 'todo',
  doing = 'doing',
  review = 'review',
  done = 'done',
}

export const orderStatusArray = enumToArray(OrderStatusEnum);
