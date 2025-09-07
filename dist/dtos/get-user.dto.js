"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserDto = void 0;
const openapi = require("@nestjs/swagger");
class GetUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, platformid: { required: true, type: () => String }, phone: { required: true, type: () => String }, branchIds: { required: true, type: () => [Number] }, name: { required: true, type: () => String }, avatarUrl: { required: true, type: () => String }, titleid: { required: true, type: () => String } };
    }
}
exports.GetUserDto = GetUserDto;
//# sourceMappingURL=get-user.dto.js.map