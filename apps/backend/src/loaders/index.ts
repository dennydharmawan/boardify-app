import type http from 'http';
import { type Application } from 'express';
import Container from 'typedi';

import { initModels } from '@/models/init-models';

import expressLoader from './express';
import logger from './logger';
import sequelizeConnection from './sequelize';

export default async function bootstrapLoaders(server: http.Server, app: Application) {
  logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app });
  const models = initModels(sequelizeConnection);

  Container.set('logger', logger);
  Container.set('server', server);
  Container.set('sequelizeConnection', sequelizeConnection);
  Container.set<typeof models>('models', models);

  logger.info('✌️ Express loaded');
}
