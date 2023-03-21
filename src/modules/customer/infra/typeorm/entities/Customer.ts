import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Address } from '@shared/interfaces';
import User from '@modules/user/infra/typeorm/entities/User';
import Order from '@modules/order/infra/typeorm/entities/Order';

@Entity('customer')
export default class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_by: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string | null;

  @Column()
  federal_document: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'json' })
  address: Address | null;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.created_customers)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user_creator: User;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];
}
