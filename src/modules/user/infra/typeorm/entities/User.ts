import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { UserRoleEnum } from '@modules/user/enums/RoleEnum';
import { Flag } from '@shared/interfaces';
import Order from '@modules/order/infra/typeorm/entities/Order';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import Customer from '@modules/customer/infra/typeorm/entities/Customer';
import UserNotification from '@modules/notification/infra/typeorm/entities/UserNotification';
import OrderComment from '@modules/order/infra/typeorm/entities/OrderComment';
import Sector from './Sector';

@Entity('user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: UserRoleEnum;

  @Column({ type: 'json' })
  recent_flags: Flag[];

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, order => order.user_creator)
  created_orders: Order[];

  @OneToMany(() => Collaborator, collaborator => collaborator.user_creator)
  created_collaborators: Collaborator[];

  @OneToMany(() => Customer, customer => customer.user_creator)
  created_customers: Customer[];

  @OneToMany(() => Sector, sector => sector.user_creator)
  created_sectors: Sector[];

  @OneToMany(() => UserNotification, notification => notification.user)
  notifications: UserNotification[];

  @OneToMany(() => OrderComment, comment => comment.user)
  comments: OrderComment[];
}
