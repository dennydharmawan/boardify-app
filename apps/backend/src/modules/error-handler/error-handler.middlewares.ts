import { type NextFunction, type Request, type Response } from 'express';
import { type HttpError } from 'http-errors';
import jsend from 'jsend';

import { ApiError, ApiInternalServerError, ApiNotFoundError } from './error-handler.service';
import { logError } from './error-handler.utils';

export function notFoundHandler(req: Request, res: Response) {
  throw new ApiNotFoundError({
    detail: 'API not found',
    // {
    //   method: req.method,
    //   url: req.originalUrl,
    //   ns: 'error',
    //   interpolation: { escapeValue: false }
    // }),
    instance: req.originalUrl,
    traceId: req.requestId
  });
}

export function errorHandler(error: HttpError, req: any, res: Response, next: NextFunction) {
  logError(error);

  if (error instanceof ApiError) {
    return res
      .setHeader('content-type', 'application/problem+json')
      .status(error.statusCode)
      .send(jsend.fail(error));
  }

  const unexpectedError = new ApiInternalServerError({
    detail: error.message,
    instance: req.originalUrl,
    traceId: req.requestId
  });

  return res
    .setHeader('content-type', 'application/problem+json')
    .status(500)
    .send(
      jsend.error({
        message: 'An unexpected error occurred.',
        data: unexpectedError
      })
    );
}
