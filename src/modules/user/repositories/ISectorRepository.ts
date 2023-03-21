import Sector from '@modules/user/infra/typeorm/entities/Sector';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

export default interface ISectorRepository {
  create(data: ICreateSectorDTO): Promise<Sector>;
  save(entity: Sector): Promise<Sector>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Sector>>;
  findById(id: string): Promise<Sector | undefined>;
  remove(entity: Sector): Promise<void>;
}
