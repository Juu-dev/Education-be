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
exports.StudentsController = void 0;
const openapi = require("@nestjs/swagger");
const _n_constants_1 = require("../../../constants/index");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const students_service_1 = require("./students.service");
let StudentsController = class StudentsController {
    constructor(studentsService) {
        this.studentsService = studentsService;
    }
    create(createCategoryDto) {
        return this.studentsService.createStudent(createCategoryDto);
    }
    findAll({ page, pageSize, }) {
        return this.studentsService.getListStudent(page, pageSize);
    }
    findOne(id) {
        return this.studentsService.getStudentById(id);
    }
    findByClassId(id, { page, pageSize, }) {
        return this.studentsService.getStudentsByClassId(id, page, pageSize);
    }
    update(id, updateCategoryDto) {
        return this.studentsService.updateStudent(id, updateCategoryDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.CREATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORIES]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('class/:id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, _n_dtos_1.PaginationParamsDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "findByClassId", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.UPDATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], StudentsController.prototype, "update", null);
StudentsController = __decorate([
    (0, common_1.Controller)('students'),
    (0, swagger_1.ApiTags)('Student'),
    __metadata("design:paramtypes", [students_service_1.StudentsService])
], StudentsController);
exports.StudentsController = StudentsController;
//# sourceMappingURL=students.controller.js.map