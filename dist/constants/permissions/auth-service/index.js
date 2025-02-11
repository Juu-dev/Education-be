"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServicePermission = void 0;
const permissions_permission_enum_1 = __importDefault(require("./permissions-permission.enum"));
const roles_permission_enum_1 = __importDefault(require("./roles-permission.enum"));
const users_permission_enum_1 = __importDefault(require("./users-permission.enum"));
const platform_permission_enum_1 = __importDefault(require("./platform-permission.enum"));
exports.AuthServicePermission = {
    ...users_permission_enum_1.default,
    ...roles_permission_enum_1.default,
    ...permissions_permission_enum_1.default,
    ...platform_permission_enum_1.default,
};
//# sourceMappingURL=index.js.map