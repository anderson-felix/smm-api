import { Router } from 'express';

import userRouter from './user.routes';
import orderRouter from './order.routes';
import customerRouter from './customer.routes';
import collaboratorRouter from './collaborator.routes';
import sectorRouter from './sector.routes';
import commentRouter from './comment.routes';

const userRoutes = Router();

userRoutes.use(userRouter);
userRoutes.use('/order', orderRouter);
userRoutes.use('/customer', customerRouter);
userRoutes.use('/collaborator', collaboratorRouter);
userRoutes.use('/sector', sectorRouter);
userRoutes.use('/comment', commentRouter);

export default userRoutes;
