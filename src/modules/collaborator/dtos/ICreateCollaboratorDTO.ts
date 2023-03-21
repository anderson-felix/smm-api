import { Address } from '@shared/interfaces';

export default interface ICreateCollaboratorDTO {
  created_by: string;
  name: string;
  description: string;
  password: string;
  federal_document: string;
  email: string;
  phone: string;
  hourly_price: string | null;
  address: Address;
}
