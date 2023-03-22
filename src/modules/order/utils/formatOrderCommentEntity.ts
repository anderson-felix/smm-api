import OrderComment from '../infra/typeorm/entities/OrderComment';

export interface IFormattedOrderComment {
  comment_id: string;
  text: string;
  sender: { id: string; name: string };
}

type FuncType = (comment: OrderComment) => IFormattedOrderComment;

export const formatOrderCommentEntity: FuncType = comment => {
  const sender = comment.user || comment.collaborator || {};
  return {
    comment_id: comment.id,
    text: comment.text,
    sender: {
      id: sender.id,
      name: sender.name,
    },
  };
};
