import { Request, Response } from 'express';
import { container } from 'tsyringe';

import populateConfig from '@config/populate';
import UploadService from '@modules/dev/services/upload/UploadService';
import PopulateService from '@modules/dev/services/populate/PopulateService';

export default class DevController {
  public static async upload(req: Request, res: Response): Promise<any> {
    const uploadHandler = new UploadService();

    await uploadHandler.upload(req);

    return res.status(200).send();
  }

  public static async populate(req: Request, res: Response): Promise<Response> {
    const populate = container.resolve(PopulateService);

    await populate.execute({
      user_dto: populateConfig.dtos.user,
    });

    return res.status(204).send();
  }
}
