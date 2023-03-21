import { Address } from '@shared/interfaces';

export default interface ICreateCustomerDTO {
  created_by: string;
  name: string;
  federal_document: string;
  description: string | null;
  email: string;
  phone: string;
  address: Address | null;
}
