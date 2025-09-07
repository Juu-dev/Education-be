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
exports.CreateBookImportDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateBookImportDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: false, type: () => String }, yearOfPublication: { required: false, type: () => String }, borrowedAmount: { required: false, type: () => Number }, amount: { required: false, type: () => Number } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: 'Thế giới động vật',
        description: 'Tên của sách',
    }),
    __metadata("design:type", String)
], CreateBookImportDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, swagger_1.ApiProperty)({
        example: '2023',
        description: 'năm xuất bản',
    }),
    __metadata("design:type", String)
], CreateBookImportDto.prototype, "yearOfPublication", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Số sách đã cho mượn',
    }),
    __metadata("design:type", Number)
], CreateBookImportDto.prototype, "borrowedAmount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: 'Tổng số sách',
    }),
    __metadata("design:type", Number)
], CreateBookImportDto.prototype, "amount", void 0);
exports.CreateBookImportDto = CreateBookImportDto;
//# sourceMappingURL=create-book-import.dto.js.map