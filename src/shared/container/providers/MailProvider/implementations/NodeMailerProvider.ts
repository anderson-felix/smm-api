import nodemailer, { Transporter } from 'nodemailer';

import mailConfig from '@config/mail';

import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import ISendRecoveryCodeDTO from '../dtos/ISendRecoveryCodeDTO';

export default class NodeMailerProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS,
        accessToken: 'eb8ece2704a57b6de2c3f1036c7950be',
      },
    });
  }

  public async sendRecoveryCode({
    destination,
  }: ISendRecoveryCodeDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    const destName = destination.name.split(' ')[0];

    await this.client.sendMail({
      from: `${name} < ${email} >`,
      to: destination.email,
      subject: 'Recuperação de senha',
      text: `Olá ${destName}. Foi solicitado uma recuperação de senha neste email, caso você não tenha feito nenhuma solicitação desconsidere essa mensagem. Código de recuperação de senha: ${destination.code}`,
    });
  }

  public async sendMail({
    subject,
    destination,
    message,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.client.sendMail({
      from: `${name} < ${email} >`,
      to: destination.email,
      subject,
      text: message,
    });
  }
}
