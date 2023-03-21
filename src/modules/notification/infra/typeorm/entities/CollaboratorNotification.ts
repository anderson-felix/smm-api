import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { NotificationPriorityEnum } from '@modules/notification/enums/NotificationPriorityEnum';
import Order from '@modules/order/infra/typeorm/entities/Order';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

@Entity('collaborator_notification')
export default class CollaboratorNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collaborator_id: string;

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

  @ManyToOne(() => Collaborator, collaborator => collaborator.notifications)
  @JoinColumn({ name: 'collaborator_id', referencedColumnName: 'id' })
  collaborator: Collaborator;

  @ManyToOne(() => Order, order => order.collaborator_notifications)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
