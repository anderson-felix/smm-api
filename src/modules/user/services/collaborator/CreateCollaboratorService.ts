import { injectable, inject } from 'tsyringe';

import { logger } from '@shared/utils';
import User from '@modules/user/infra/typeorm/entities/User';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';
import ICreateCollaboratorDTO from '@modules/collaborator/dtos/ICreateCollaboratorDTO';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { LocaleError } from '@shared/errors/LocaleError';

interface IRequest extends Omit<ICreateCollaboratorDTO, 'created_by'> {
  user: User;
}

@injectable()
export default class CreateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user,
    password,
    ...data
  }: IRequest): Promise<Collaborator> {
    const [collaboratorWithSameMail, collaboratorWithSameDocument] =
      await Promise.all([
        this.collaboratorRepository.findByEmail(data.email),
        this.collaboratorRepository.findByFederalDocument(
          data.federal_document,
        ),
      ]);

    if (collaboratorWithSameMail) throw new LocaleError('emailAlreadyExists');
    if (collaboratorWithSameDocument)
      throw new LocaleError('documentAlreadyExists');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const collaborator = await this.collaboratorRepository.create({
      ...data,
      created_by: user.id,
      password: hashedPassword,
    });

    logger.info(
      `COLLABORATOR CREATED BY - ${user.email} : ${JSON.stringify(
        collaborator,
        null,
        4,
      )}`,
    );

    return collaborator;
  }
}
