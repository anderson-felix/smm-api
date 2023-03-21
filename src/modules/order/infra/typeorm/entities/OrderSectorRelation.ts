import Sector from '@modules/sector/infra/typeorm/entities/Sector';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Order from './Order';

@Entity('order_sector_relation')
export default class OrderSectorRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column()
  sector_id: string;

  @Column({ type: 'text' })
  estimated_hours: string | null;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Sector, sector => sector.order_relations)
  @JoinColumn({ name: 'sector_id', referencedColumnName: 'id' })
  sector: Sector;

  @ManyToOne(() => Order, order => order.sector_relations)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  order: Order;
}
