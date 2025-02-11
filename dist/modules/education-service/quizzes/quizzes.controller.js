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
exports.QuizzesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const _n_constants_1 = require("../../../constants/index");
const swagger_1 = require("@nestjs/swagger");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const quizzes_service_1 = require("./quizzes.service");
const dtos_1 = require("./dtos");
let QuizzesController = class QuizzesController {
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    create(user, createQuizDto) {
        return this.quizzesService.createQuiz({
            ...createQuizDto,
            creatorId: user?.id
        });
    }
    findAllByPagination(user, { page, pageSize }) {
        return this.quizzesService.getListPaginatedQuiz(page, pageSize, user?.id);
    }
    findAll(user) {
        return this.quizzesService.getListQuiz(user?.id);
    }
    findOne(id) {
        return this.quizzesService.getQuizById(id);
    }
    update(id, updateQuizDto) {
        return this.quizzesService.updateQuiz(id, updateQuizDto);
    }
    remove(id) {
        return this.quizzesService.deleteQuizById(id);
    }
    removeRelatedQuestions(quizId, questionIdsDto) {
        const { questionIds } = questionIdsDto;
        return this.quizzesService.deleteQuestionsWithCascade(quizId, questionIds);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.CREATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dtos_1.CreateQuizDto]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _n_dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findAllByPagination", null);
__decorate([
    (0, common_1.Get)(''),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.UPDATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateQuizDto]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.DELETE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/questions'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.DELETE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "removeRelatedQuestions", null);
QuizzesController = __decorate([
    (0, common_1.Controller)('quizzes'),
    (0, swagger_1.ApiTags)('Quiz'),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
exports.QuizzesController = QuizzesController;
//# sourceMappingURL=quizzes.controller.js.map