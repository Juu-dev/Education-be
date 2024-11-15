import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { BaseException } from '@n-exceptions/all.exceptions.filter';
import { Errors } from '@n-constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new BaseException(Errors.AUTH.INVALID_TOKEN);
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('app.jwtSecret'),
      });
      request.user = payload;
    } catch (err) {
      throw new BaseException(Errors.AUTH.INVALID_TOKEN);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
