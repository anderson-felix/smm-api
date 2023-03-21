import { Request, Response, NextFunction } from 'express';

import { LocaleError } from '@shared/errors/LocaleError';

export default async function checkPopulateToken(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  if (request.params.token !== process.env.POPULATE_SECRET)
    throw new LocaleError('populateTokenInvalid');

  return next();
}
