import { StatusCodes } from 'http-status-codes';
import type Zod from 'zod';

export enum customErrorType {
  VALIDATION_ERROR = '/problems/validation-error'
}

export enum genericErrorType {
  BAD_REQUEST = 'https://datatracker.ietf.org/doc/html/rfc9110#name-400-bad-request',
  UNAUTHORIZED = 'https://datatracker.ietf.org/doc/html/rfc9110#name-401-unauthorized',
  FORBIDDEN = 'https://datatracker.ietf.org/doc/html/rfc9110#name-403-forbidden',
  NOT_FOUND = 'https://datatracker.ietf.org/doc/html/rfc9110#name-404-not-found',
  INTERNAL_SERVER_ERROR = 'https://datatracker.ietf.org/doc/html/rfc9110#name-500-internal-server-error'
}

type ProblemDetails = {
  type?: string;
  statusCode?: StatusCodes;
  detail?: string;
  instance?: string;
  traceId?: string;
};

export class ApiError extends Error {
  type: string;
  statusCode: StatusCodes;
  detail: string;
  instance: string;
  traceId?: string;
  context?: object;

  constructor({ type, statusCode, detail, instance, traceId, ...context }: ProblemDetails) {
    super(detail);

    Object.setPrototypeOf(this, new.target.prototype);

    this.type = type || 'about:blank';
    this.statusCode = statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    this.detail =
      detail ||
      'Sorry, an unexpected error occurred. Please try again. if the problem persists, please contact your system administrator.';
    this.instance = instance || '';
    this.traceId = traceId;
    this.context = Object.keys(context).length !== 0 ? context : undefined;

    Error.captureStackTrace(this, this.constructor);
  }

  // toJSON() {
  //   return {
  //     type: this.type,
  //     statusCode: this.statusCode,
  //     detail: this.detail,
  //     instance: this.instance
  //   };
  // }
}

type ErrorDetails = { detail: string; instance: string; traceId?: string };

export class ApiBadRequestError extends ApiError {
  constructor(
    props: ErrorDetails & {
      invalidParams?: Zod.ZodIssue[];
    }
  ) {
    super({
      type: genericErrorType.BAD_REQUEST,
      statusCode: StatusCodes.BAD_REQUEST,
      ...props
    });
  }
}

export class ApiNotFoundError extends ApiError {
  constructor(props: ErrorDetails) {
    super({
      type: genericErrorType.NOT_FOUND,
      statusCode: StatusCodes.NOT_FOUND,
      ...props
    });
  }
}

export class ApiUnauthorizedError extends ApiError {
  constructor(props: ErrorDetails) {
    super({
      type: genericErrorType.UNAUTHORIZED,
      statusCode: StatusCodes.UNAUTHORIZED,
      ...props
    });
  }
}

export class ApiForbiddenError extends ApiError {
  constructor(props: ErrorDetails) {
    super({
      type: genericErrorType.FORBIDDEN,
      statusCode: StatusCodes.FORBIDDEN,
      ...props
    });
  }
}

export class ApiInternalServerError extends ApiError {
  constructor(props: ErrorDetails) {
    super({
      type: genericErrorType.INTERNAL_SERVER_ERROR,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      ...props
    });
  }
}
