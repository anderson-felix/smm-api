import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSectorService from '@modules/user/services/sector/CreateSectorService';
import ListSectorsService from '@modules/user/services/sector/ListSectorsService';
import DeleteSectorService from '@modules/user/services/sector/DeleteSectorService';
import ShowSectorService from '@modules/user/services/sector/ShowSectorService';
import UpdateSectorService from '@modules/user/services/sector/UpdateSectorService';

export default class SectorController {
  public static async create(req: Request, res: Response): Promise<Response> {
    const createSector = container.resolve(CreateSectorService);

    const sector = await createSector.execute({
      user: req.user,
      ...req.body,
    });

    return res.json(sector);
  }

  public static async show(req: Request, res: Response): Promise<Response> {
    const showSector = container.resolve(ShowSectorService);

    const sector = await showSector.execute(req.params.id);
    return res.json(sector);
  }

  public static async list(req: Request, res: Response): Promise<Response> {
    const listSectors = container.resolve(ListSectorsService);

    const sector = await listSectors.execute(req.paging);

    return res.json(sector);
  }

  public static async update(req: Request, res: Response): Promise<Response> {
    const updateSector = container.resolve(UpdateSectorService);

    const sector = await updateSector.execute({
      user: req.user,
      id: req.params.id,
      ...req.body,
    });

    return res.json(sector);
  }

  public static async delete(req: Request, res: Response): Promise<Response> {
    const deleteSector = container.resolve(DeleteSectorService);

    await deleteSector.execute({ user: req.user, id: req.params.id });

    return res.sendStatus(204);
  }
}
