import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomValidationExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const errorResponse = exception.getResponse() as any;

    if (errorResponse.message && Array.isArray(errorResponse.message)) {
      const formattedErrors: Record<string, string[]> = {};

      errorResponse.message.forEach((message: string) => {
        const [property, errorMessage] = message.split(' ', 2);
        if (!formattedErrors[property]) {
          formattedErrors[property] = [];
        }
        formattedErrors[property].push(errorMessage);
      });

      response.status(400).json({
        errors: formattedErrors,
        statusCode: 400,
        message: 'Bad Request',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(400).json(errorResponse);
    }
  }
}
