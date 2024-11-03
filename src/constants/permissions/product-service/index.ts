import ProductCategoriesPermission from './product-category.enum';
import ProductsPermission from './product-permission.enum';
import VatPermission from './vat-permission.enum';
import ProductPricesPermission from './product-price-permission.enum';

export const ProductServicePermission = {
  ...ProductsPermission,
  ...ProductCategoriesPermission,
  ...VatPermission,
  ...ProductPricesPermission,
};

export type ProductServicePermissionType =
  | ProductsPermission
  | ProductCategoriesPermission
  | VatPermission
  | ProductPricesPermission;
