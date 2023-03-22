import { Router } from 'express';

import collaboratorRouter from './collaborator.routes';
import orderRouter from './order.routes';
import commentRouter from './comment.routes';

const collaboratorRoutes = Router();

collaboratorRoutes.use(collaboratorRouter);
collaboratorRoutes.use('/order', orderRouter);
collaboratorRoutes.use('/comment', commentRouter);

export default collaboratorRoutes;
