import { MailContact } from './MailContact';

export interface MailRecovery extends MailContact {
  code: string;
}
