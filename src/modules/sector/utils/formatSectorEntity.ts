import Sector from '../infra/typeorm/entities/Sector';

export interface IFormattedSector {
  id: string;
  created_by: string;
  display_name: string;
  description: string | null;
  color: string | null;
}

export const formatSectorEntity = (sector: Sector) => ({
  id: sector.id,
  created_by: sector.created_by,
  display_name: sector.display_name,
  description: sector.description,
  color: sector.color,
});
