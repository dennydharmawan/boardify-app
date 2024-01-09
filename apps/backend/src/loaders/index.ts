import { Application } from 'express';
import type http from 'http';
import expressLoader from './express';
import Logger from './logger';

export default async function bootstrapLoaders(
  server: http.Server,
  app: Application
) {
  Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app });

  Logger.info('✌️ Express loaded');
}
