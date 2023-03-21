import { Router } from 'express';

import userRoutes from '@modules/user/infra/http/routes';
import devRoutes from '@modules/dev/infra/http/routes';

const router = Router();

router.use('/user', userRoutes);
router.use('/dev', devRoutes);

export default router;
