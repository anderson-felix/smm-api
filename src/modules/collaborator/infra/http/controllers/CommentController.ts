import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SubmitCommentService from '@modules/collaborator/services/comment/SubmitCommentService';
import DeleteCommentService from '@modules/collaborator/services/comment/DeleteCommentService';

export default class CommentController {
  public static async submit(req: Request, res: Response): Promise<Response> {
    const submitComment = container.resolve(SubmitCommentService);

    await submitComment.execute({
      collaborator: req.collaborator,
      ...req.body,
    });

    return res.sendStatus(201);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteComment = container.resolve(DeleteCommentService);

    await deleteComment.execute(req.params.id);

    return res.sendStatus(204);
  }
}
