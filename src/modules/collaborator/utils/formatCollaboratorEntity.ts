import { formatSectorEntity, IFormattedSector } from '@modules/sector/utils';
import { Address, Flag } from '@shared/interfaces';
import Collaborator from '../infra/typeorm/entities/Collaborator';

export interface IFormattedCollaborator {
  id: string;
  created_by: string;
  name: string;
  description: string | null;
  federal_document: string;
  email: string;
  phone: string;
  hourly_price: string | null;
  address: Address | null;
  recent_flags: Flag[];
  sectors: IFormattedSector[];
}

type FuncType = (collaborator: Collaborator) => IFormattedCollaborator;

export const formatCollaboratorEntity: FuncType = collaborator => ({
  id: collaborator.id,
  created_by: collaborator.created_by,
  name: collaborator.name,
  description: collaborator.description,
  federal_document: collaborator.federal_document,
  email: collaborator.email,
  phone: collaborator.phone,
  hourly_price: collaborator.hourly_price,
  address: collaborator.address,
  recent_flags: collaborator.recent_flags,
  sectors: collaborator.sector_relations.map(relation =>
    formatSectorEntity(relation.sector),
  ),
});
