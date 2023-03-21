import Sector from '@modules/sector/infra/typeorm/entities/Sector';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Collaborator from './Collaborator';

@Entity('collaborator_sector_relation')
export default class CollaboratorSectorRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collaborator_id: string;

  @Column()
  sector_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Collaborator, collaborator => collaborator.sector_relations)
  @JoinColumn({ name: 'collaborator_id', referencedColumnName: 'id' })
  collaborator: Collaborator;

  @ManyToOne(() => Sector, sector => sector.collaborator_relations)
  @JoinColumn({ name: 'sector_id', referencedColumnName: 'id' })
  sector: Sector;
}
