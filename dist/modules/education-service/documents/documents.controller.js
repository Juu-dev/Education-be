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
exports.DocumentsController = void 0;
const openapi = require("@nestjs/swagger");
const _n_constants_1 = require("../../../constants/index");
const _n_decorators_1 = require("../../../decorators/index");
const _n_dtos_1 = require("../../../dtos/index");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./dto");
const documents_service_1 = require("./documents.service");
const api_file_decorator_1 = require("../../../decorators/api-file.decorator");
let DocumentsController = class DocumentsController {
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    create(createDocumentDto, files) {
        return this.documentsService.createDocument(createDocumentDto, files);
    }
    findAll({ page, pageSize, }, filter, { search }) {
        return this.documentsService.getListDocument({
            page,
            pageSize,
            filter,
            search
        });
    }
    findAllByTeacherId({ page, pageSize, }, filter, { search }, userId) {
        return this.documentsService.getListDocument({
            page,
            pageSize,
            userId,
            filter,
            search
        });
    }
    findOne(id) {
        return this.documentsService.getDocumentById(id);
    }
    update(id, updateCategoryDto) {
        return this.documentsService.updateDocument(id, updateCategoryDto);
    }
    remove(id) {
        return this.documentsService.deleteById(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, api_file_decorator_1.ApiFile)({ name: 'files', isArray: true }),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.CREATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Upload document thành công.' }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateDocumentDto, Array]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORIES]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto,
        dto_1.FilterDocumentDto,
        dto_1.SearchDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('pagination/:userId'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORIES]),
    (0, _n_decorators_1.AuthClaims)(),
    (0, swagger_1.ApiOkResponse)({
        isArray: true,
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [_n_dtos_1.PaginationParamsDto,
        dto_1.FilterDocumentDto,
        dto_1.SearchDocumentDto, String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findAllByTeacherId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.GET_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.UPDATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateDocumentDto]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, _n_decorators_1.Roles)([_n_constants_1.Permission.UPDATE_CATEGORY]),
    (0, _n_decorators_1.AuthClaims)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "remove", null);
DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    (0, swagger_1.ApiTags)('Document'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
exports.DocumentsController = DocumentsController;
//# sourceMappingURL=documents.controller.js.map