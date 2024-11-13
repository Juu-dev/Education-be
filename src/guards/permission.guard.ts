import { Reflector } from '@nestjs/core';
import {
  Injectable, CanActivate, ExecutionContext, Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { PrismaService } from '@n-database/prisma/prisma.service';
import { PermissionType, Errors } from '@n-constants';
import { BaseException } from '@n-exceptions/all.exceptions.filter';
import { Cache } from 'cache-manager';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<PermissionType[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const userId = user.id;

    return this.matchPermissions(userId, requiredPermissions);
  }

  private async matchPermissions(
    userid: string,
    permissionToCheck: PermissionType[],
  ): Promise<boolean> {
    const cacheKey = `user-permissions:${userId}`;
    let userPermissions = await this.cacheManager.get<string[]>(cacheKey);

    if (!userPermissions) {
      const userWithRoles = await this.prisma.authServiceUser.findUnique({
        where: { id: userId },
        include: {
          userRoles: {
            include: {
              role: {
                include: {
                  rolePermissions: {
                    include: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const permissions = userWithRoles.userRoles.map((userRole) =>
        userRole.role.rolePermissions.map(
          (rolePermission) => rolePermission.permission.name,
        ));

      userPermissions = permissions.flat(1);
      await this.cacheManager.set(cacheKey, userPermissions, { ttl: 3600 });
    }

    const hasPermission = permissionToCheck.every((permission) =>
      userPermissions.includes(permission));

    if (!hasPermission) {
      throw new BaseException(Errors.AUTH.ROLE_NOT_PERMIT);
    }

    return hasPermission;
  }
}
