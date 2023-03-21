import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCollaboratorService from '@modules/user/services/collaborator/CreateCollaboratorService';
import ListCollaboratorsService from '@modules/user/services/collaborator/ListCollaboratorsService';
import DeleteCollaboratorService from '@modules/user/services/collaborator/DeleteCollaboratorService';
import ShowCollaboratorService from '@modules/user/services/collaborator/ShowCollaboratorService';
import UpdateCollaboratorService from '@modules/user/services/collaborator/UpdateCollaboratorService';

export default class CollaboratorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const createCollaborator = container.resolve(CreateCollaboratorService);

    const collaborator = await createCollaborator.execute({
      user: req.user,
      ...req.body,
    });

    return res.json(collaborator);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const showCollaborator = container.resolve(ShowCollaboratorService);

    const collaborator = await showCollaborator.execute(req.params.id);
    return res.json(collaborator);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listCollaborators = container.resolve(ListCollaboratorsService);

    const collaborator = await listCollaborators.execute(req.paging);

    return res.json(collaborator);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateCollaborator = container.resolve(UpdateCollaboratorService);

    const collaborator = await updateCollaborator.execute({
      user: req.user,
      id: req.params.id,
      ...req.body,
    });

    return res.json(collaborator);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteCollaborator = container.resolve(DeleteCollaboratorService);

    await deleteCollaborator.execute({ user: req.user, id: req.params.id });

    return res.sendStatus(204);
  }
}
