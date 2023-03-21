import { Router } from 'express';

import userRouter from './user.routes';
import orderRouter from './order.routes';

const routes = Router();

routes.use(userRouter);
routes.use('/order', orderRouter);

export default routes;
