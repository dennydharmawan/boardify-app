import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type express from 'express';
import httpContext from 'express-http-context';
import ruid from 'express-ruid';
import helmet from 'helmet';
import pinoHTTP from 'pino-http';

import { default as CONFIG, default as config } from '@/config';

import apiRoutesLoader from './api-routes';
import logger, { loggerContextMiddleware } from './logger';

export default ({ app }: { app: express.Application }) => {
  app.use(httpContext.middleware);
  app.use(ruid({ setInContext: true, attribute: 'requestId' }));
  app.use(loggerContextMiddleware);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors({ origin: CONFIG.client.host, credentials: true }));

  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false
    })
  );

  if (CONFIG.log.enable) {
    app.use(
      pinoHTTP({
        logger
      })
    );
  }

  // Load API routes
  app.use(config.api.prefix, apiRoutesLoader());

  // Generic error handler
  // app.use(notFoundHandler);
  // app.use(errorHandler);
};
