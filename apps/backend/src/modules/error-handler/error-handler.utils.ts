import { emojify } from 'node-emoji';

import logger from '@/loaders/logger';

import { ApiError } from './error-handler.service';

export function isOperationalError(error: Error | ApiError) {
  if (error instanceof ApiError) {
    return true;
  }

  return false;
}

export function logError(error: Error, description = 'Unexpected Error') {
  logger.error(error, emojify(`:fire: ${description} :fire:`));
}
