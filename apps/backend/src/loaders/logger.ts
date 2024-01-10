import { type NextFunction, type Request, type Response } from 'express';
import httpContext from 'express-http-context';
import pino from 'pino';

const testenv = process.env.NODE_ENV === 'test';

const logger = pino({
  level: 'debug',
  enabled: !testenv,
  redact: [],
  serializers: { error: pino.stdSerializers.err }
});

const proxifiedLogger = new Proxy(logger, {
  get(target, property, receiver) {
    target = httpContext.get('logger') || target;

    return Reflect.get(target, property, receiver);
  }
});

export default proxifiedLogger;

export const loggerContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const loggerWithContext = logger.child({
    ['request-id']: httpContext.get('rid')
  });

  httpContext.set('logger', loggerWithContext);

  next();
};
