import { Router, type NextFunction, type Request, type Response } from 'express';

import { type POSTAL_CODE } from './my-type';

// import { POSTAL_CODE } from './my-type';

// import { type POSTAL_CODE } from './my-type';

// import { type POSTAL_CODE } from './my-type';

// import { POSTAL_CODE } from './my-type';

// import { SERVER } from '@/modules/server/server.service';
// import { POSTAL_CODE } from './my-type';

// import { POSTAL_CODE } from './my-type';

// import { type KeeperV2 } from '@finaccel/zookeeper-auth';

// import AuthController from './auth.controller';
// import { authenticateWithKeeper } from './auth.middleware';

export default (router: Router) => {
  const a: POSTAL_CODE = '';
  // const keeperMiddleware = Container.get<KeeperV2>('keeperMiddleware');
  // const authController = Container.get(AuthController);
  const route = Router();
  router.use('/auth', route);

  route.get('/login', (req: Request, res: Response, next: NextFunction) => {
    return { success: true };
  });
};
