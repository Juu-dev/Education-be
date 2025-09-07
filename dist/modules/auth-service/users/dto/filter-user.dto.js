"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FilterUserDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { categoryIds: { required: true, type: () => [Number] }, isActive: { required: false, type: () => [Boolean] } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        example: [1, 2, 3],
        type: [Number],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value)) {
            return [Number(value)];
        }
        return value.map(Number);
    }),
    __metadata("design:type", Array)
], FilterUserDto.prototype, "categoryIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['true', 'false'],
        description: 'Filter by isActive. Accepts true or false as strings.',
        required: false,
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!Array.isArray(value)) {
            return [value === 'true'];
        }
        return value.map((item) => {
            if (item === 'true') {
                return true;
            }
            if (item === 'false') {
                return false;
            }
            return item;
        });
    }),
    __metadata("design:type", Array)
], FilterUserDto.prototype, "isActive", void 0);
exports.FilterUserDto = FilterUserDto;
//# sourceMappingURL=filter-user.dto.js.map