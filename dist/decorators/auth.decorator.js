"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthToken = void 0;
const auth_guard_1 = require("../guards/auth.guard");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function AuthToken() {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(auth_guard_1.AuthGuard));
}
exports.AuthToken = AuthToken;
//# sourceMappingURL=auth.decorator.js.map