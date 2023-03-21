import ISendMailDTO from '../dtos/ISendMailDTO';
import ISendRecoveryCodeDTO from '../dtos/ISendRecoveryCodeDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
  sendRecoveryCode(data: ISendRecoveryCodeDTO): Promise<void>;
}
