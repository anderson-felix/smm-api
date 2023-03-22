import OrderCollaboratorRelation from '@modules/order/infra/typeorm/entities/OrderCollaboratorRelation';
import { formatOrderEntity, IFormattedOrder } from '@modules/order/utils';

export interface IFormattedOrderRelation extends IFormattedOrder {
  accepted_at: Date | null;
}

type FuncType = (
  relation: OrderCollaboratorRelation,
) => IFormattedOrderRelation;

export const formatOrderRelationEntity: FuncType = relation => {
  relation.order.collaborator_relations.forEach(
    r => (r.collaborator.sector_relations = []),
  );
  return {
    accepted_at: relation.accepted_at,
    ...formatOrderEntity(relation.order),
  };
};
