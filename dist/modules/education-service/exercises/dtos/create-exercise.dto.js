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
exports.CreateExerciseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateExerciseDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: true, type: () => String }, timeOut: { required: true, type: () => Number }, assignerId: { required: true, type: () => String }, classAssigneeId: { required: true, type: () => String }, quizId: { required: true, type: () => String } };
    }
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'Trung tam 5F' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'Mô tả ở đây nhé' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 60 }),
    __metadata("design:type", Number)
], CreateExerciseDto.prototype, "timeOut", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: '429860cf-d4c7-4439-b94e-def5bec2179f', description: 'ID của người giao exercise' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "assignerId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của lớp nhận exercise' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "classAssigneeId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ example: 'eee47eda-75bc-4c6b-8937-511a20fbe863', description: 'ID của quiz' }),
    __metadata("design:type", String)
], CreateExerciseDto.prototype, "quizId", void 0);
exports.CreateExerciseDto = CreateExerciseDto;
//# sourceMappingURL=create-exercise.dto.js.map