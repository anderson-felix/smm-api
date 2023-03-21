import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { NotificationPriorityEnum } from '@modules/notification/enums/NotificationPriorityEnum';
import User from '@modules/user/infra/typeorm/entities/User';
import Order from '@modules/order/infra/typeorm/entities/Order';

@Entity('user_notification')
export default class UserNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ type: 'uuid' })
  order_id: string | null;

  @Column()
  display_name: string;

  @Column({ type: 'text' })
  text: string | null;

  @Column({ type: 'enum', enum: NotificationPriorityEnum })
  priority: NotificationPriorityEnum;

  @Column()
  read: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.notifications)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Order, order => order.user_notifications)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
