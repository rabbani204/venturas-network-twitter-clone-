import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { GlobalResponseError } from '../response';

@Catch()
export class GlobalExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    let message = (exception as any).message.message;

    const request = ctx.getRequest<Request>();
    let code = '500';

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        message = (exception as HttpException).message;
        break;
      case QueryFailedError: // this is a TypeOrm error
        console.log(exception);
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as any).detail.replace(
          /[&\/\\,+()$~%.'":*?<>{}]/g,
          '',
        );
        code = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as HttpException).message;
        code = (exception as any).code;
        break;
      default:
        const exceptionResponse: any = exception.getResponse();
        message =
          typeof exceptionResponse.message === 'string'
            ? exceptionResponse.message
            : exceptionResponse;
        status = exception.getStatus();
        code = (exception as any).code;
    }

    if (process.env.APP_ENV === 'development') {
      const logger = new Logger('GlobalExceptionFilter');
      logger.error(
        message,
        (exception as any).stack,
        `${request.method} ${request.url}`,
      );
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request, true));
  }
}
