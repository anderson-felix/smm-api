declare namespace Express {
  export interface Request {
    user: import('@modules/user/infra/typeorm/entities/User').default;
    paging: import('@shared/infra/http/middlewares/getPagingHandler').IPagingTypeORM;
  }
}
