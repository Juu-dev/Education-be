import CategoriesPermission from './category-permission.enum';

export const CategoryServicePermission = {
  ...CategoriesPermission,
};

export type CategoryServicePermissionType =
  | CategoriesPermission;
