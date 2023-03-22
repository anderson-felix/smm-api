import OrderComment from '../infra/typeorm/entities/OrderComment';

export interface IFormattedOrderComment {
  sender: { id: string; name: string };
  text: string;
}

type FuncType = (comment: OrderComment) => IFormattedOrderComment;

export const formatOrderCommentEntity: FuncType = comment => {
  const sender = comment.user || comment.collaborator || {};
  return {
    sender: {
      id: sender.id,
      name: sender.name,
    },
    text: comment.text,
  };
};
