import {
  formatCollaboratorEntity,
  IFormattedCollaborator,
} from '@modules/collaborator/utils';
import Sector from '../infra/typeorm/entities/Sector';

export interface IFormattedSector {
  id: string;
  created_by: string;
  display_name: string;
  description: string | null;
  color: string | null;
  collaborators: IFormattedCollaborator[];
}

type FuncType = (sector: Sector) => IFormattedSector;

export const formatSectorEntity: FuncType = sector => ({
  id: sector.id,
  created_by: sector.created_by,
  display_name: sector.display_name,
  description: sector.description,
  color: sector.color,
  collaborators: sector.collaborator_relations?.map(
    r =>
      formatCollaboratorEntity({ ...r.collaborator, sector_relations: [] }) ||
      [],
  ),
});
