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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const _n_decorators_1 = require("../../../decorators/index");
const _n_constants_1 = require("../../../constants/index");
const _n_dtos_1 = require("../../../dtos/index");
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const dto_1 = require("./dto");
const create_student_dto_1 = require("./dto/create-student.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    assignTeacher(assignTeacher) {
        return this.usersService.assignTeacher(assignTeacher.school);
    }
    findAll(request, { page, pageSize, }, filter, search) {
        return this.usersService.getListUser(page, pageSize);
    }
    findAllNotPagination(filter, search) {
        return this.usersService.getListUserNotPagination();
    }
    findAllUserExceptStudent(user) {
        return this.usersService.getListUserExceptStudent(user?.id);
    }
    findAllLibrarianAndTeacher() {
        return this.usersService.getListLibrarianAndTeacher();
    }
    findAllTeacher() {
        return this.usersService.getListTeacher();
    }
    findOne(id) {
        return this.usersService.getUserById(id);
    }
    updateProfile(user, updateUserDto) {
        return this.usersService.updateUserById(user?.id, updateUserDto);
    }
    update(id, updateUserDto) {
        return this.usersService.updateUserById(id, updateUserDto);
    }
    updateStudent(id, updateStudentDto) {
        return this.usersService.updateStudentById(id, updateStudentDto);
    }
    delete(id) {
        return this.usersService.deleteStudentById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.CREATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)("assign-teacher"),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.CREATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.TeacherAssignmentDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "assignTeacher", null);
__decorate([
    (0, common_1.Get)(),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _n_dtos_1.PaginationParamsDto,
        dto_1.FilterUserDto,
        dto_1.SearchUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.EXPORT_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FilterUserDto,
        dto_1.SearchUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllNotPagination", null);
__decorate([
    (0, common_1.Get)('except-student'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.EXPORT_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUserExceptStudent", null);
__decorate([
    (0, common_1.Get)('librarian-and-teacher'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.EXPORT_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllLibrarianAndTeacher", null);
__decorate([
    (0, common_1.Get)('teacher'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.EXPORT_USERS]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllTeacher", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.GET_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.UPDATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, _n_decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.UPDATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('student/:id'),
    (0, _n_decorators_1.Permissions)([_n_constants_1.Permission.UPDATE_USER]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.UPDATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('User'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map