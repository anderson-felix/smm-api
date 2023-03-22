import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import User from '@modules/user/infra/typeorm/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Order from './Order';

@Entity('order_comment')
export default class OrderComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column({ type: 'uuid' })
  collaborator_id: string | null;

  @Column({ type: 'uuid' })
  user_id: string | null;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Collaborator, collaborator => collaborator.comments)
  @JoinColumn({ name: 'collaborator_id', referencedColumnName: 'id' })
  collaborator: Collaborator;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Order, order => order.comments)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
