import { File, Flag } from '@shared/interfaces';

export default interface ICreateOrderDTO {
  created_by: string;
  customer_id?: string | null;
  display_name: string;
  description: string;
  files: File[];
  flags: Flag[];
}
