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
exports.ClassesController = void 0;
const openapi = require("@nestjs/swagger");
const _n_constants_1 = require("../../../constants/index");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const classes_service_1 = require("./classes.service");
let ClassesController = class ClassesController {
    constructor(classesService) {
        this.classesService = classesService;
    }
    create(createCategoryDto) {
        return this.classesService.createClass(createCategoryDto);
    }
    findAll() {
        return this.classesService.getAllClass();
    }
    findAllPagination({ page, pageSize, }, { search }) {
        return this.classesService.getListClass(page, pageSize, search);
    }
    findOne(id) {
        return this.classesService.getClassById(id);
    }
    countStudent(id) {
        return this.classesService.getCountStudentByClassId(id);
    }
    update(id, updateCategoryDto) {
        return this.classesService.updateClass(id, updateCategoryDto);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.CREATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateClassDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto,
        dto_1.SearchClassDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "findAllPagination", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/count-student'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "countStudent", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.UPDATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateClassDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "update", null);
ClassesController = __decorate([
    (0, common_1.Controller)('classes'),
    (0, swagger_1.ApiTags)('Class'),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
exports.ClassesController = ClassesController;
//# sourceMappingURL=classes.controller.js.map