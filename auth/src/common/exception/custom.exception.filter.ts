import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import { Response } from 'express';

@Catch(MongoServerError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Duplicate key error code
    if (exception.code === 11000) {
      return response
        .status(400)
        .json({ message: '이미 존재하는 값입니다.', error: exception.message });
    }

    // 기본 처리
    return response
      .status(500)
      .json({ message: '서버 에러', error: exception.message });
  }
}