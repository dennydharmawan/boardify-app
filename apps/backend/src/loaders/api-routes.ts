import { Router } from 'express';

import authRoutes from '@/modules/api/auth/auth.routes';

export default function apiRoutesLoader() {
  const router = Router();

  authRoutes(router);

  return router;
}
