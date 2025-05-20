import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();
      return response.status(status).json({
        message,
      });
    }

    if (exception instanceof MongoServerError && exception.code === 11000) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: '이미 존재하는 값입니다.',
        error: exception.message,
      });
    }

    if (exception instanceof Error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: '서버 내부 오류가 발생했습니다.',
        error: exception.message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: '알 수 없는 오류가 발생했습니다.',
      error: String(exception),
    });
  }
}
