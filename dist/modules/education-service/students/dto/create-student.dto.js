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
exports.CreateStudentDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateStudentDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: false, type: () => String }, userId: { required: false, type: () => String }, classId: { required: false, type: () => String }, metadataUrl: { required: false, type: () => String }, name: { required: true, type: () => String }, birthDate: { required: false, type: () => Date }, parentName: { required: false, type: () => String }, level: { required: false, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
        description: 'ID của học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        description: 'ID của người dùng liên quan đến học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
        description: 'ID của lớp liên quan đến học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: 'https://example.com/metadata.json',
        description: 'URL của metadata liên quan đến học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "metadataUrl", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: 'Nguyen Van B',
        description: 'Tên của học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '2005-01-01T00:00:00Z',
        description: 'Ngày sinh của học sinh',
        type: String,
    }),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], CreateStudentDto.prototype, "birthDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: 'Nguyen Van A',
        description: 'Tên phụ huynh của học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "parentName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: 'Cấp 10',
        description: 'Cấp học của học sinh',
    }),
    __metadata("design:type", String)
], CreateStudentDto.prototype, "level", void 0);
exports.CreateStudentDto = CreateStudentDto;
//# sourceMappingURL=create-student.dto.js.map