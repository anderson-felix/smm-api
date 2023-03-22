import { Router } from 'express';

import collaboratorRouter from './collaborator.routes';
import orderRouter from './order.routes';
import commentRouter from './comment.routes';

const routes = Router();

routes.use(collaboratorRouter);
routes.use('/order', orderRouter);
routes.use('/comment', commentRouter);

export default routes;
