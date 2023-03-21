import { Router } from 'express';

import userRouter from './user.routes';
import orderRouter from './order.routes';
import customerRouter from './customer.routes';
import collaboratorRouter from './collaborator.routes';

const routes = Router();

routes.use(userRouter);
routes.use('/order', orderRouter);
routes.use('/customer', customerRouter);
routes.use('/collaborator', collaboratorRouter);

export default routes;
