import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { AxiosError } from 'axios';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // axios 에러인지 체크
    if (exception instanceof AxiosError) {
      const status = exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data: any = exception.response?.data || { message: exception.message };

      return response.status(status).json(data);
    }

    // NestJS HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(res);
    }

    // 그 외 내부 서버 에러
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }
}
