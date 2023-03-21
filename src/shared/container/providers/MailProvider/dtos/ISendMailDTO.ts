import { MailContact } from '../interfaces';

export default interface ISendMailDTO {
  destination: MailContact;
  subject: string;
  message: string;
}
