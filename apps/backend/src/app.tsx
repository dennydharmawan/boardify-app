import 'reflect-metadata';

import http from 'http';
import express from 'express';

import CONFIG from './config';
import bootstrapLoaders from './loaders';

async function startServer() {
  const app = express();
  app.set('port', CONFIG.app.port);
  const server = http.createServer(app);

  await bootstrapLoaders(server, app);

  // // // const serverService = Container.get(ServerService);
  // server.listen(CONFIG.server.port, async () => {
  //   banner(logger);
  // });
}

startServer();
