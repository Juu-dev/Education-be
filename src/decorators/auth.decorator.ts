import { AuthGuard } from '@n-guards/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function AuthToken() {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard));
}
