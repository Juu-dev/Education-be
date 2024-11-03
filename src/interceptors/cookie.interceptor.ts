import { COMMON_CONSTANT } from '@n-constants';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.cookie('refreshToken', data.refreshToken, {
          expires: new Date(Date.now() + COMMON_CONSTANT.COOKIE_EXPIRES_IN),
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        });

        delete data.refreshToken;
      }),
    );
  }
}
