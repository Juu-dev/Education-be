"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClaims = void 0;
const auth_guard_1 = require("../guards/auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../guards/role.guard");
function AuthClaims() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, role_guard_1.RoleGuard));
}
exports.AuthClaims = AuthClaims;
//# sourceMappingURL=claims-auth.decorator.js.map