import { container } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '@config/auth';
import { LocaleError } from '@shared/errors/LocaleError';
import AuthenticateCollaboratorService from '@modules/collaborator/services/collaborator/AuthenticateCollaboratorService';

interface TokenPayload {
  int: number;
  exp: number;
  sub: string;
}

const authenticateCollaborator = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new LocaleError('missingToken');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub: id } = decoded as TokenPayload;
    const authService = container.resolve(AuthenticateCollaboratorService);
    req.collaborator = await authService.execute(id);
  } catch {
    throw new LocaleError('invalidToken');
  }
};

export default async function auth(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  await authenticateCollaborator(req);

  next();
}
