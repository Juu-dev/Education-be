"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const auth_service_1 = require("./permissions/auth-service");
const category_service_1 = require("./permissions/category-service");
const customer_service_1 = require("./permissions/customer-service");
const product_service_1 = require("./permissions/product-service");
const schedule_service_1 = require("./permissions/schedule-service");
exports.Permission = {
    ...auth_service_1.AuthServicePermission,
    ...customer_service_1.CustomerServicePermission,
    ...schedule_service_1.ScheduleServicePermission,
    ...category_service_1.CategoryServicePermission,
    ...product_service_1.ProductServicePermission,
};
//# sourceMappingURL=permission.type.js.map