import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SessionCollaboratorService from '@modules/collaborator/services/collaborator/SessionCollaboratorService';
import ShowProfileService from '@modules/collaborator/services/collaborator/ShowProfileService';
import UpdateCollaboratorService from '@modules/collaborator/services/collaborator/UpdateCollaboratorService';

export default class CollaboratorController {
  public static async session(req: Request, res: Response): Promise<Response> {
    const authenticateAdmin = container.resolve(SessionCollaboratorService);

    const response = await authenticateAdmin.execute(req.body);

    return res.json(response);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateCollaborator = container.resolve(UpdateCollaboratorService);

    const collaborator = await updateCollaborator.execute({
      collaborator: req.collaborator,
      ...req.body,
    });

    return res.json(collaborator);
  }

  public static async profile(req: Request, res: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService);

    const collaborator = await showProfile.execute(req.collaborator);
    return res.json(collaborator);
  }
}
