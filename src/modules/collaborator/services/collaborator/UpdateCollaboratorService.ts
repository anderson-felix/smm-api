import { injectable, inject } from 'tsyringe';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import { LocaleError } from '@shared/errors/LocaleError';
import ICollaboratorRepository from '@modules/collaborator/repositories/ICollaboratorRepository';
import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

interface IRequest {
  collaborator: Collaborator;
  password: string;
  old_password: string;
}

@injectable()
export default class UpdateCollaboratorService {
  constructor(
    @inject('CollaboratorRepository')
    private collaboratorRepository: ICollaboratorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    collaborator: _collaborator,
    ...params
  }: IRequest): Promise<void> {
    const collaborator =
      (await this.collaboratorRepository.findByIdWithPasswordSelected(
        _collaborator.id,
      )) as Collaborator;

    await this.updatePassword({ collaborator, ...params });

    await this.collaboratorRepository.save(collaborator);
  }

  private async updatePassword({ collaborator, ...params }: IRequest) {
    const isValid = await this.hashProvider.compareHash(
      params.old_password,
      collaborator.password,
    );
    if (!isValid) throw new LocaleError('passwordsNotMatch');

    collaborator.password = await this.hashProvider.generateHash(
      params.password,
    );
  }
}
