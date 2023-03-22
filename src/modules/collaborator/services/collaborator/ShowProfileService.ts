import Collaborator from '@modules/collaborator/infra/typeorm/entities/Collaborator';

export default class ShowProfileService {
  public async execute(collaborator: Collaborator): Promise<Collaborator> {
    return collaborator;
  }
}
