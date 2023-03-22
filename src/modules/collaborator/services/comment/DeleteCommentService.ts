import { injectable, inject } from 'tsyringe';

import { LocaleError } from '@shared/errors/LocaleError';
import IOrderCommentRepository from '@modules/order/repositories/IOrderCommentRepository';

@injectable()
export default class DeleteCommentService {
  constructor(
    @inject('OrderCommentRepository')
    private orderCommentRepository: IOrderCommentRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const comment = await this.orderCommentRepository.findById(id);
    if (!comment) throw new LocaleError('commentNotFound');
    await this.orderCommentRepository.remove(comment);
  }
}
