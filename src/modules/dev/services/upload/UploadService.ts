import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';
import mime from 'mime-types';

import { Request } from 'express';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', '..', '..', 'tmp');

export default class UploadService {
  private pipelineAsync: any;

  constructor() {
    this.pipelineAsync = promisify(pipeline);
  }

  public async upload(request: Request) {
    const filename = String(request.query.filename);
    const location = path.resolve(tmpFolder, filename);

    const mimetype = mime.contentType(filename).toString().split('/')[0];

    if (mimetype === 'video')
      await this.pipelineAsync(request, fs.createWriteStream(location));
    else await fs.promises.writeFile(location, request.body);
  }
}
