import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetUserDto } from '@n-dtos';

export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): GetUserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
