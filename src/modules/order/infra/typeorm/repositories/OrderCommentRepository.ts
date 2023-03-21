import { getRepository, Repository } from 'typeorm';

import { formatPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import IOrderCommentRepository from '@modules/order/repositories/IOrderCommentRepository';
import ICreateOrderCommentDTO from '@modules/order/dtos/ICreateOrderCommentDTO';
import OrderComment from '../entities/OrderComment';

export default class OrderCommentRepository implements IOrderCommentRepository {
  private ormRepository: Repository<OrderComment>;

  constructor() {
    this.ormRepository = getRepository(OrderComment);
  }

  public async create(data: ICreateOrderCommentDTO) {
    const entity = this.ormRepository.create(data);

    return await this.ormRepository.save(entity);
  }

  public async save(entity: OrderComment) {
    return await this.ormRepository.save(entity);
  }

  public async find(paging: IPagingTypeORM) {
    const response = await this.ormRepository.findAndCount(paging);

    return formatPagingResponse(paging, response);
  }

  public async findById(id: string) {
    return await this.ormRepository.findOne({ where: { id } });
  }

  public async remove(entity: OrderComment) {
    await this.ormRepository.remove(entity);
  }
}
