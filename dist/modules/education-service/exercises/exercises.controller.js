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
exports.ExercisesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const _n_constants_1 = require("../../../constants/index");
const swagger_1 = require("@nestjs/swagger");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const exercises_service_1 = require("./exercises.service");
const dtos_1 = require("./dtos");
let ExercisesController = class ExercisesController {
    constructor(exerciseService) {
        this.exerciseService = exerciseService;
    }
    create(createExerciseDto) {
        return this.exerciseService.createExercise(createExerciseDto);
    }
    findAllByPagination(user, { page, pageSize }) {
        return this.exerciseService.getListPaginatedExercise(page, pageSize, user?.id);
    }
    findAllByPaginationModeStudent(user, { page, pageSize }) {
        return this.exerciseService.getListPaginatedExerciseModeStudent(page, pageSize, user?.classId);
    }
    findAllByPaginationAndTeacherId({ page, pageSize }, classId) {
        return this.exerciseService.getListPaginatedExerciseModeStudent(page, pageSize, classId);
    }
    findAll() {
        return this.exerciseService.getListExercise();
    }
    findOne(id) {
        return this.exerciseService.getExerciseById(id);
    }
    findStudentsByExerciseId(id) {
        return this.exerciseService.getStudentsByExerciseId(id);
    }
    update(id, updateExerciseDto) {
        return this.exerciseService.updateExercise(id, updateExerciseDto);
    }
    remove(id) {
        return this.exerciseService.deleteExerciseById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.CREATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiCreatedResponse)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dtos_1.CreateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
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
], ExercisesController.prototype, "findAllByPagination", null);
__decorate([
    (0, common_1.Get)('pagination/class'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _n_dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAllByPaginationModeStudent", null);
__decorate([
    (0, common_1.Get)('pagination/:classId'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAllByPaginationAndTeacherId", null);
__decorate([
    (0, common_1.Get)(''),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('student/:id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findStudentsByExerciseId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.UPDATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dtos_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.DELETE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "remove", null);
ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, swagger_1.ApiTags)('Exercise'),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
exports.ExercisesController = ExercisesController;
//# sourceMappingURL=exercises.controller.js.map