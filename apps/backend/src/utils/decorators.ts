import { emojify } from 'node-emoji';

import logger from '@/loaders/logger';

export function TryCatchController(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
) {
  const fn = descriptor.value!;

  descriptor.value = async function decorator(this: any, ...args) {
    try {
      const result = await fn.apply(this, args);

      return result;
    } catch (error) {
      const [, , next] = args;

      next(error);
    }
  };
}

export function LoggedMethod(logLevel = 'debug', headMessage = 'Log:') {
  return function TryCatchController(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>
  ) {
    const fn = descriptor.value!;
    const methodName = propertyKey;

    descriptor.value = async function decorator(this: any, ...args) {
      logger[logLevel](emojify(`:arrow_down: ${headMessage} Entering method '${methodName}'.`));

      const result = await fn.apply(this, args);

      logger[logLevel](emojify(`:arrow_up: ${headMessage} Exiting method '${methodName}'.`));

      return result;
    };
  };
}
