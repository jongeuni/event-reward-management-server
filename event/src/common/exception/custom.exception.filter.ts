import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';

@Catch(MongoServerError, mongoose.Error.ValidationError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(
    exception: MongoServerError | mongoose.Error.ValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // MongoDB Duplicate Key Error
    if (exception instanceof MongoServerError && exception.code === 11000) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: '이미 존재하는 값입니다.',
        error: exception.message,
      });
    }

    // Mongoose Validation Error
    if (exception instanceof mongoose.Error.ValidationError) {
      const errors = Object.values(exception.errors).map((err) => err.message);
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: '유효성 검사 오류가 발생했습니다.',
        errors,
      });
    }

    // 기타 서버 오류
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: '서버 에러',
      error: exception.message,
    });
  }
}
