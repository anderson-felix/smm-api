import { enumToArray } from '@shared/utils';

export enum NotificationPriorityEnum {
  low = 'low',
  medium = 'medium',
  important = 'important',
  urgent = 'urgent',
}

export const notificationPriorityArray = enumToArray(NotificationPriorityEnum);
