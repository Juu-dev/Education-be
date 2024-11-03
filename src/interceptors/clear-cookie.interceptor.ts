import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ClearCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.clearCookie(
      'refreshToken',
      {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      },
    );
    return next.handle().pipe();
  }
}
