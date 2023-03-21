export default interface ICreateOrderCommentDTO {
  order_id: string;
  collaborator_id?: string | null;
  user_id?: string | null;
  text: string;
}
