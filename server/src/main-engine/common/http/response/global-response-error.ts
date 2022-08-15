import { Request } from 'express';
import { IResponseError } from './interfaces';

export const GlobalResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
  error: boolean,
) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
  error: boolean,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
    error,
  };
};
