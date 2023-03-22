import { Router } from 'express';

import userRoutes from '@modules/user/infra/http/routes';
import devRoutes from '@modules/dev/infra/http/routes';
import collaboratorRoutes from '@modules/collaborator/infra/http/routes';

const router = Router();

router.use('/dev', devRoutes);
router.use('/user', userRoutes);
router.use('/collaborator', collaboratorRoutes);

export default router;
