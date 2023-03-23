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
  display_name: string;
  customer_id: string | null;
  description: string | null;
  status: OrderStatusEnum;
  files: File[];
  flags: Flag[];
  collaborators: IFormattedCollaborator[];
  sectors: (IFormattedSector & { estimated_hours: string | null })[];
  comments: IFormattedOrderComment[];
  customer: { name: string; id: string } | null;
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
  sectors: order.sector_relations.map(r => ({
    ...formatSectorEntity(r.sector),
    estimated_hours: r.estimated_hours,
  })),
  comments:
    order.comments
      ?.map(formatOrderCommentEntity)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ) || [],
  customer: order.customer,
});
