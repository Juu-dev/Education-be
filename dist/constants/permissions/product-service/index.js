"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServicePermission = void 0;
const product_category_enum_1 = __importDefault(require("./product-category.enum"));
const product_permission_enum_1 = __importDefault(require("./product-permission.enum"));
const vat_permission_enum_1 = __importDefault(require("./vat-permission.enum"));
const product_price_permission_enum_1 = __importDefault(require("./product-price-permission.enum"));
exports.ProductServicePermission = {
    ...product_permission_enum_1.default,
    ...product_category_enum_1.default,
    ...vat_permission_enum_1.default,
    ...product_price_permission_enum_1.default,
};
//# sourceMappingURL=index.js.map