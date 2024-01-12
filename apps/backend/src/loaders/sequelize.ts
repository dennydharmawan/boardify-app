import { emojify } from 'node-emoji';
import { Sequelize } from 'sequelize';

import CONFIG from '@/config';

import logger from './logger';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: CONFIG.database.host,
  port: CONFIG.database.port,
  database: CONFIG.database.name,
  username: CONFIG.database.username,
  password: CONFIG.database.password,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  },
  query: {
    raw: true
  },
  logging: (sql) => {
    if (CONFIG.isDevelopment) {
      logger.debug(emojify(`:floppy_disk: SQL: ${sql}`));

      return true;
    }

    return false;
  }
});

export default sequelize;
