import mailConfig from '@config/mail';
import { SES } from 'aws-sdk';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import ISendRecoveryCodeDTO from '../dtos/ISendRecoveryCodeDTO';

export default class SESProvider implements IMailProvider {
  private client: SES;

  constructor() {
    this.client = new SES({
      region: process.env.AWS_REGION,
    });
  }

  public async sendRecoveryCode({
    destination,
  }: ISendRecoveryCodeDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const destName = destination.name.split(' ')[0];

    await this.client
      .sendTemplatedEmail({
        Source: `${name} < ${email} >`,
        Destination: {
          ToAddresses: [`${destination.name} < ${destination.email} >`],
        },
        Template: 'RecoveryCodeTemplate',
        TemplateData: `{"name":"${destName}","code":"${destination.code}"}`,
        ConfigurationSetName: 'DarkLabs',
      })
      .promise();
  }

  public async sendMail({
    subject,
    destination,
    message,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const destName = destination.name.split(' ')[0];

    await this.client
      .sendEmail({
        Source: `${name} < ${email} >`,
        Destination: {
          ToAddresses: [`${destName} < ${destination.email} >`],
        },
        Message: {
          Body: {
            Text: {
              Data: message,
              Charset: 'utf8',
            },
          },
          Subject: {
            Data: subject || 'sem assunto',
            Charset: 'utf8',
          },
        },
        ConfigurationSetName: 'DarkLabs',
      })
      .promise();
  }
}
