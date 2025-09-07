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
exports.CreateAnswerDto = exports.AnswerDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AnswerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { questionId: { required: true, type: () => String }, optionId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao task' }),
    __metadata("design:type", String)
], AnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của người nhận task' }),
    __metadata("design:type", String)
], AnswerDto.prototype, "optionId", void 0);
exports.AnswerDto = AnswerDto;
class CreateAnswerDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { studentId: { required: true, type: () => String }, exerciseId: { required: true, type: () => String }, answers: { required: true, type: () => [require("./create-answer.dto").AnswerDto] } };
    }
}
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao task' }),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "studentId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của người nhận task' }),
    __metadata("design:type", String)
], CreateAnswerDto.prototype, "exerciseId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AnswerDto),
    __metadata("design:type", Array)
], CreateAnswerDto.prototype, "answers", void 0);
exports.CreateAnswerDto = CreateAnswerDto;
//# sourceMappingURL=create-answer.dto.js.map