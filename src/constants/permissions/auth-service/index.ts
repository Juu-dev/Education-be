import PermissionsPermission from './permissions-permission.enum';
import RolesPermission from './roles-permission.enum';
import UsersPermission from './users-permission.enum';
import PlatformPermission from './platform-permission.enum';

export const AuthServicePermission = {
  ...UsersPermission,
  ...RolesPermission,
  ...PermissionsPermission,
  ...PlatformPermission,
};

export type AuthServicePermissionType =
  | UsersPermission
  | RolesPermission
  | PermissionsPermission
  | PlatformPermission;
