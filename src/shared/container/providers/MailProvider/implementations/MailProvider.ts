import mailConfig from '@config/mail';
import SESProvider from './SESProvider';
import NodemailerProvider from './NodeMailerProvider';

const MailProvider =
  mailConfig.driver === 'SES' ? SESProvider : NodemailerProvider;

export default MailProvider;
