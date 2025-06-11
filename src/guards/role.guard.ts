import { Reflector } from '@nestjs/core';
import {
  Injectable, CanActivate, ExecutionContext,
} from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '@n-database/prisma/prisma.service';
// import { Cache } from 'cache-manager';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
  }
}
