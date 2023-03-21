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

import { Address, Flag } from '@shared/interfaces';
import User from '@modules/user/infra/typeorm/entities/User';
import CollaboratorNotification from '@modules/notification/infra/typeorm/entities/CollaboratorNotification';
import OrderCollaboratorRelation from '@modules/order/infra/typeorm/entities/OrderCollaboratorRelation';
import OrderComment from '@modules/order/infra/typeorm/entities/OrderComment';
import CollaboratorSectorRelation from './CollaboratorSectorRelation';

@Entity('collaborator')
export default class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created_by: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string | null;

  @Column({ select: false })
  password: string;

  @Column()
  federal_document: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'text' })
  hourly_price: string | null;

  @Column({ type: 'json' })
  address: Address | null;

  @Column({ type: 'json' })
  recent_flags: Flag[];

  @DeleteDateColumn()
  deleted_at: Date | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.created_collaborators)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  user_creator: User;

  @OneToMany(() => OrderComment, comment => comment.collaborator)
  comments: OrderComment[];

  @OneToMany(() => OrderCollaboratorRelation, relation => relation.collaborator)
  order_relations: OrderCollaboratorRelation[];

  @OneToMany(
    () => CollaboratorSectorRelation,
    relation => relation.collaborator,
  )
  sector_relations: CollaboratorSectorRelation[];

  @OneToMany(
    () => CollaboratorNotification,
    notification => notification.collaborator,
  )
  notifications: CollaboratorNotification[];
}
