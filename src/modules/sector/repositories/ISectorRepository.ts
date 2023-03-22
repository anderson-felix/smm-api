import Sector from '@modules/sector/infra/typeorm/entities/Sector';
import { IPagingResponse } from '@shared/utils';
import { IPagingTypeORM } from '@shared/infra/http/middlewares/getPagingHandler';
import ICreateSectorDTO from '../dtos/ICreateSectorDTO';

export default interface ISectorRepository {
  create(data: ICreateSectorDTO): Promise<Sector>;
  save(entity: Sector): Promise<Sector>;
  find(paging: IPagingTypeORM): Promise<IPagingResponse<Sector>>;
  findById(id: string): Promise<Sector | undefined>;
  findByIds(ids: string[]): Promise<Sector[]>;
  remove(entity: Sector): Promise<void>;
}
