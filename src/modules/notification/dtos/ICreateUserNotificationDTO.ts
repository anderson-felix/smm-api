import { NotificationPriorityEnum } from '../enums/NotificationPriorityEnum';

export default interface ICreateUserNotificationDTO {
  user_id: string;
  order_id: string | null;
  display_name: string;
  text: string | null;
  priority: NotificationPriorityEnum;
}
