import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Order from './Order';

@Entity('order_collaborator_relation')
export default class OrderCollaboratorRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  collaborator_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Collaborator, collaborator => collaborator.order_relations)
  @JoinColumn({ name: 'collaborator_id', referencedColumnName: 'id' })
  collaborator: Collaborator;

  @ManyToOne(() => Order, order => order.collaborator_relations)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
