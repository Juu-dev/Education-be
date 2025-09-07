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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const _n_exceptions_1 = require("../../../filter-exceptions/index");
const _n_constants_1 = require("../../../constants/index");
const documents_repository_1 = require("./documents.repository");
const file_upload_service_1 = require("../../file-upload/file-upload.service");
let DocumentsService = class DocumentsService {
    constructor(documentsRepository, fileUploadService) {
        this.documentsRepository = documentsRepository;
        this.fileUploadService = fileUploadService;
    }
    async createDocument(createDocumentDto, files) {
        const file = await this.fileUploadService.uploadFile(files[0]);
        const uploadData = {
            ...createDocumentDto,
            url: file.Location,
        };
        return this.documentsRepository.createDocument(uploadData);
    }
    async getListDocument(props) {
        const { pageSize, page } = props;
        const count = props?.userId
            ? await this.documentsRepository.countByUserId(props.userId)
            : await this.documentsRepository.count();
        const items = props?.userId
            ? await this.documentsRepository.findAllPaginationByTeacherId(props)
            : await this.documentsRepository.findAllPaginationWithFilter(props);
        return {
            pagination: {
                page,
                pageSize,
                totalPage: Math.ceil(count / pageSize),
            },
            count,
            data: items,
        };
    }
    async getDocumentById(id) {
        const document = await this.documentsRepository.findById(id);
        if (!document) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
        }
        return document;
    }
    async updateDocument(id, updateDocumentDto) {
        const document = await this.documentsRepository.findById(id);
        if (!document) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
        }
        return this.documentsRepository.updateById(id, updateDocumentDto);
    }
    async deleteById(id) {
        const document = await this.documentsRepository.findById(id);
        if (!document) {
            throw new _n_exceptions_1.BaseException(_n_constants_1.Errors.DOCUMENT.DOCUMENT_NOT_FOUND);
        }
        return this.documentsRepository.hardDeleteById(id);
    }
};
DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [documents_repository_1.DocumentsRepository,
        file_upload_service_1.FileUploadService])
], DocumentsService);
exports.DocumentsService = DocumentsService;
//# sourceMappingURL=documents.service.js.map