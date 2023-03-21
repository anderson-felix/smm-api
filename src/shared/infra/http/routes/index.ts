import { Router } from 'express';

import userRoutes from '@modules/user/infra/http/routes';

const routes = Router();

routes.use('/user', userRoutes);

export default routes;
