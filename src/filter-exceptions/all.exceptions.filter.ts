import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { COMMON_CONSTANT, Errors } from '@n-constants';
import { LoggingModel } from '@n-models';
import { logger, transformObject } from '@n-utils';

export interface BaseErrorFormat {
  message: string;
  statusCode: number;
  errorCode: string;
}

export class BaseException extends HttpException {
  constructor(response: BaseErrorFormat, cause?: any) {
    super(response, response.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = cause;
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  private readonly loggerTerminal = new Logger('😟😕 HttpExceptionFilter');

  private readonly logger = logger({
    infoFile: 'access-info.log',
    errorFile: 'access-error.log',
  });

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const stacktraceEnable: number = parseInt(
      this.configService.get('STACKTRACE_ENABLE'),
      COMMON_CONSTANT.RADIX_BASE,
    );

    if (exception instanceof InternalServerErrorException) {
      exception = new BaseException(Errors.DEFAULT, exception.stack);
    } else if (!(exception instanceof BaseException)) {
      exception = new BaseException(Errors.DEFAULT);
    }

    const detailError = exception.getResponse() as BaseErrorFormat;
    const response = ctx.getResponse<Response>();
    const rawReqBody = request.body;
    const requestBody = transformObject(rawReqBody, 'request');

    const responsePayload = {
      errorCode: detailError.errorCode,
      message: detailError.message,
      statusCode: detailError.statusCode,
    };

    const errorLog: LoggingModel = {
      timestamp: moment().format(COMMON_CONSTANT.LOG_TIMESTAMP_FORMAT),
      id: uuidv4(),
      request: {
        type: 'http',
        method: request.method,
        path: request.path,
        ip: request.ip,
        userAgent: request.get('user-agent'),
        body: requestBody,
        params: request.params,
      },
      response: {
        body: stacktraceEnable
          ? {
            ...detailError,
            stacktrace: exception.stack,
          }
          : detailError,
      },
    };

    response
      .status(exception.getStatus() || HttpStatus.BAD_REQUEST)
      .json(responsePayload);

    this.loggerTerminal.error(JSON.stringify(errorLog));
    this.logger.error(JSON.stringify(errorLog));
    return exception;
  }
}
