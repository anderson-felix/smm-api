import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import { OrderStatusEnum } from '@modules/order/enums/OrderStatusEnum';
import { File, Flag } from '@shared/interfaces';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import CollaboratorNotification from '@modules/notification/infra/typeorm/entities/CollaboratorNotification';
import UserNotification from '@modules/notification/infra/typeorm/entities/UserNotification';
import OrderSectorRelation from './OrderSectorRelation';
import OrderCollaboratorRelation from './OrderCollaboratorRelation';
import OrderComment from './OrderComment';

@Entity('order')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  created_by: string;

  @Column({ type: 'uuid' })
  customer_id: string | null;

  @Column()
  display_name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: OrderStatusEnum })
  status: OrderStatusEnum;

  @Column({ type: 'json' })
  files: File[];

  @Column({ type: 'json' })
  flags: Flag[];

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.created_orders)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user_creator: User;

  @ManyToOne(() => Customer, customer => customer.orders)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @OneToMany(() => OrderSectorRelation, relation => relation.order)
  sector_relations: OrderSectorRelation[];

  @OneToMany(() => OrderCollaboratorRelation, relation => relation.order)
  collaborator_relations: OrderCollaboratorRelation[];

  @OneToMany(() => CollaboratorNotification, notification => notification.order)
  collaborator_notifications: CollaboratorNotification[];

  @OneToMany(() => UserNotification, notification => notification.order)
  user_notifications: UserNotification[];

  @OneToMany(() => OrderComment, comment => comment.order)
  comments: OrderComment[];
}
