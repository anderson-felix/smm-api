declare namespace Express {
  export interface Request {
    user: import('@modules/user/infra/typeorm/entities/User').default;
    collaborator: import('@modules/collaborator/infra/typeorm/entities/Collaborator').default;
    paging: import('@shared/infra/http/middlewares/getPagingHandler').IPagingTypeORM;
  }
}
