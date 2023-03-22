import {
  formatCollaboratorEntity,
  IFormattedCollaborator,
} from '@modules/collaborator/utils';
import { formatSectorEntity, IFormattedSector } from '@modules/sector/utils';
import { File, Flag } from '@shared/interfaces';
import { OrderStatusEnum } from '../enums/OrderStatusEnum';
import Order from '../infra/typeorm/entities/Order';
import { formatOrderCommentEntity, IFormattedOrderComment } from '.';

export interface IFormattedOrder {
  id: string;
  created_by: string;
  customer_id: string | null;
  display_name: string;
  description: string | null;
  status: OrderStatusEnum;
  files: File[];
  flags: Flag[];
  collaborators: IFormattedCollaborator[];
  sectors: IFormattedSector[];
  comments: IFormattedOrderComment[];
}

type FuncType = (order: Order) => IFormattedOrder;

export const formatOrderEntity: FuncType = order => ({
  id: order.id,
  created_by: order.created_by,
  customer_id: order.customer_id,
  display_name: order.display_name,
  description: order.description,
  status: order.status,
  files: order.files,
  flags: order.flags,
  collaborators: order.collaborator_relations.map(r =>
    formatCollaboratorEntity({ ...r.collaborator, sector_relations: [] }),
  ),
  sectors: order.sector_relations.map(r => formatSectorEntity(r.sector)),
  comments: order.comments?.map(formatOrderCommentEntity) || [],
});
