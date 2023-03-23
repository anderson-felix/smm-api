import { Address, Flag } from '@shared/interfaces';

export default interface ICreateCollaboratorDTO {
  created_by: string;
  name: string;
  description: string | null;
  password: string;
  federal_document: string;
  email: string;
  phone: string;
  hourly_price: string | null;
  address: Address | null;
  recent_flags: Flag[];
}
