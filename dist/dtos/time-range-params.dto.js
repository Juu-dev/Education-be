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
exports.WorkShiftDTO = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class WorkShiftDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { start: { required: true, type: () => Date }, end: { required: true, type: () => Date } };
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => new Date(`1970-01-01T${value}`)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ type: String, example: '08:00' }),
    __metadata("design:type", Date)
], WorkShiftDTO.prototype, "start", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => new Date(`1970-01-01T${value}`)),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, swagger_1.ApiProperty)({ type: String, example: '09:00' }),
    __metadata("design:type", Date)
], WorkShiftDTO.prototype, "end", void 0);
exports.WorkShiftDTO = WorkShiftDTO;
//# sourceMappingURL=time-range-params.dto.js.map