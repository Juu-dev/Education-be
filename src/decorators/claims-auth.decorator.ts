import { AuthGuard } from '@n-guards/auth.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from "@n-guards/role.guard";

export function AuthClaims() {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(AuthGuard, RoleGuard),
  );
}
