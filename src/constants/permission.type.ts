import { AuthServicePermission, AuthServicePermissionType } from '@n-constants/permissions/auth-service';
import { CategoryServicePermission, CategoryServicePermissionType } from '@n-constants/permissions/category-service';
import { CustomerServicePermission, CustomerServicePermissionType } from '@n-constants/permissions/customer-service';
import { ProductServicePermission, ProductServicePermissionType } from '@n-constants/permissions/product-service';
import { ScheduleServicePermission, ScheduleServicePermissionType } from '@n-constants/permissions/schedule-service';

export const Permission = {
  ...AuthServicePermission,
  ...CustomerServicePermission,
  ...ScheduleServicePermission,
  ...CategoryServicePermission,
  ...ProductServicePermission,
};

export type PermissionType =
  | AuthServicePermissionType
  | CustomerServicePermissionType
  | ScheduleServicePermissionType
  | CategoryServicePermissionType
  | ProductServicePermissionType;
