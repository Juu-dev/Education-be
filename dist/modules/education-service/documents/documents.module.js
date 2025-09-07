"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../../database/prisma/prisma.module");
const file_upload_service_1 = require("../../file-upload/file-upload.service");
const documents_service_1 = require("./documents.service");
const documents_controller_1 = require("./documents.controller");
const documents_repository_1 = require("./documents.repository");
let DocumentsModule = class DocumentsModule {
};
DocumentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [documents_controller_1.DocumentsController],
        providers: [documents_service_1.DocumentsService, documents_repository_1.DocumentsRepository, file_upload_service_1.FileUploadService],
        imports: [prisma_module_1.PrismaModule],
    })
], DocumentsModule);
exports.DocumentsModule = DocumentsModule;
//# sourceMappingURL=documents.module.js.map