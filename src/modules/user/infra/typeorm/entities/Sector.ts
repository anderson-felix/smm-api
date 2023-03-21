import CollaboratorSectorRelation from '@modules/collaborator/infra/typeorm/entities/CollaboratorSectorRelation';
import OrderSectorRelation from '@modules/order/infra/typeorm/entities/OrderSectorRelation';
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
import User from './User';

@Entity('sector')
export default class Sector {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_by: string;

  @Column()
  display_name: string;

  @Column({ type: 'text' })
  description: string | null;

  @Column({ type: 'text' })
  color: string | null;

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.created_sectors)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user_creator: User;

  @OneToMany(() => CollaboratorSectorRelation, relation => relation.sector)
  collaborator_relations: CollaboratorSectorRelation[];

  @OneToMany(() => OrderSectorRelation, relation => relation.sector)
  order_relations: OrderSectorRelation[];
}
