import 'reflect-metadata';

import http from 'http';
import express from 'express';

import CONFIG from './config';
import { banner } from './lib/banner';
import bootstrapLoaders from './loaders';
import logger from './loaders/logger';

async function startServer() {
  const app = express();
  app.set('port', CONFIG.server.port);
  const server = http.createServer(app);

  await bootstrapLoaders(server, app);

  server.listen(CONFIG.server.port, async () => {
    banner(logger);
  });

  // Graceful shutdown on error
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // Close server gracefully
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Close server gracefully
    server.close(() => {
      process.exit(1);
    });
  });

  // Graceful shutdown for SIGINT (Ctrl+C)
  process.on('SIGINT', () => {
    console.log('Received SIGINT. Closing server gracefully');
    server.close(() => {
      process.exit(0);
    });
  });

  // Graceful shutdown for SIGTERM (Ctrl+C)
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Closing server gracefully');
    server.close(() => {
      process.exit(0);
    });
  });
}

startServer();
