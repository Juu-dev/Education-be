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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersController = void 0;
const openapi = require("@nestjs/swagger");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const answers_service_1 = require("./answers.service");
const create_answer_dto_1 = require("./dto/create-answer.dto");
const update_answer_dto_1 = require("./dto/update-answer.dto");
let AnswersController = class AnswersController {
    constructor(answersService) {
        this.answersService = answersService;
    }
    create(createAnswerDto) {
        return this.answersService.createAnswer(createAnswerDto);
    }
    findAll({ page, pageSize, }) {
        return this.answersService.getListAnswer(page, pageSize);
    }
    findOne(id) {
        return this.answersService.getAnswerById(id);
    }
    update(id, updateAnswerDto) {
        return this.answersService.updateAnswer(id, updateAnswerDto);
    }
    remove(id) {
        return this.answersService.deleteAnswer(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, _n_decorators_1.AuthClaims)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_answer_dto_1.UpdateAnswerDto]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnswersController.prototype, "remove", null);
AnswersController = __decorate([
    (0, common_1.Controller)('answers'),
    (0, swagger_1.ApiTags)('Answers'),
    __metadata("design:paramtypes", [answers_service_1.AnswersService])
], AnswersController);
exports.AnswersController = AnswersController;
//# sourceMappingURL=answers.controller.js.map