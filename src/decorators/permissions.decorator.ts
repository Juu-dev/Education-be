import { PermissionType } from '@n-constants';
import { SetMetadata } from '@nestjs/common';

export const Permissions = (permissions: PermissionType[]) => SetMetadata('permissions', permissions);
